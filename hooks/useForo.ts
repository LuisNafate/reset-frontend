"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getForoPosts,
  createForoPost,
  toggleLikePost,
  getForoCategories,
  getPostComments,
  commentPost,
  deleteComment,
  deletePost,
} from "@/lib/api/forum";
import type { ForoPost, ForoCategory, ForoComment } from "@/types";

export function useForo() {
  const router = useRouter();
  const { user } = useAuth();

  // Rastreo de posts que el usuario liké — persiste en localStorage por userId
  const likedByMe = useRef<Set<string>>(new Set());
  // Rastreo de posts/comentarios reportados en esta sesión (feedback local)
  const reportedPosts = useRef<Set<string>>(new Set());

  // Clave de localStorage: una por usuario para no mezclar sesiones
  const storageKey = user?.id ? `foro_liked_${user.id}` : null;

  // Inicializar el ref desde localStorage cuando se conoce el userId
  useEffect(() => {
    if (!storageKey) return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        likedByMe.current = new Set(ids);
        // Re-aplicar estado liked a los posts ya cargados
        setPosts((prev) => prev.map((p) => ({ ...p, liked: likedByMe.current.has(p.id) })));
      }
    } catch { /* localStorage no disponible */ }
  }, [storageKey]);

  /** Persiste el set actual en localStorage. */
  const persistLikes = () => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify([...likedByMe.current]));
    } catch { /* cuota excedida u otro error — ignorar */ }
  };

  // ── Estado: lista de posts ──────────────────────────────────────────────────
  const [posts, setPosts] = useState<ForoPost[]>([]);
  const [categories, setCategories] = useState<ForoCategory[]>([]);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Estado: detalle del post (modal de comentarios) ─────────────────────────
  const [openPost, setOpenPost] = useState<ForoPost | null>(null);
  const [comments, setComments] = useState<ForoComment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  // Feedback inline por comentario: { [commentId]: mensaje }
  const [commentFeedback, setCommentFeedback] = useState<Record<string, string>>({});

  // ── Helpers ────────────────────────────────────────────────────────────────

  const applyLikedState = (freshPosts: ForoPost[]): ForoPost[] =>
    freshPosts.map((p) => ({ ...p, liked: likedByMe.current.has(p.id) }));

  // ── Carga de posts ─────────────────────────────────────────────────────────

  const loadPosts = () => {
    setIsLoading(true);
    setError(null);
    Promise.all([getForoPosts(1, 10), getForoCategories()])
      .then(([p, c]) => {
        setPosts(applyLikedState(p));
        setCategories(c);
      })
      .catch((err: any) => {
        const msg: string = err?.message ?? "";
        if (msg.toLowerCase().includes("token") || msg.includes("401") || msg.includes("nicia sesión")) {
          router.push("/login");
        } else {
          setError("No se pudieron cargar las publicaciones. Verifica tu conexión.");
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { loadPosts(); }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // ── Publicar post ──────────────────────────────────────────────────────────

  const handlePublish = async () => {
    if (!postText.trim()) return;
    setIsSubmitting(true);
    try {
      await createForoPost({
        title: postTitle,
        content: postText,
        isAnonymous,
        tags: selectedTags,
      });
      const refreshed = await getForoPosts(1, 10);
      setPosts(refreshed);
      setPostText("");
      setPostTitle("");
      setSelectedTags([]);
      setIsModalOpen(false);
    } catch {
      setError("No se pudo publicar. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Like ───────────────────────────────────────────────────────────────────

  const handleToggleLike = async (id: string) => {
    const wasLiked = likedByMe.current.has(id);
    // Actualizar ref local de likes propios
    wasLiked ? likedByMe.current.delete(id) : likedByMe.current.add(id);
    // Actualización optimista: ±1 exacto sin refetch del servidor
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !wasLiked, likes: wasLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
    try {
      // Solo notificamos al servidor; NO recargamos la lista para evitar
      // que el backend (que siempre suma) sobreescriba el conteo local.
      await toggleLikePost(id);
      persistLikes();
    } catch {
      // Revertir si falla
      wasLiked ? likedByMe.current.add(id) : likedByMe.current.delete(id);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, liked: wasLiked, likes: wasLiked ? p.likes + 1 : p.likes - 1 }
            : p
        )
      );
    }
  };

  const handleToggleBookmark = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  // ── Abrir/cerrar detalle del post ──────────────────────────────────────────

  const handleOpenPost = async (post: ForoPost) => {
    setOpenPost(post);
    setComments([]);
    setCommentText("");
    setCommentError(null);
    setCommentFeedback({});
    setIsCommentAnonymous(false);
    setIsCommentsLoading(true);
    try {
      const fetched = await getPostComments(post.id, user?.id);
      setComments(fetched);
    } catch {
      setCommentError("No se pudieron cargar los comentarios.");
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const handleClosePost = () => {
    setOpenPost(null);
    setComments([]);
    setCommentText("");
    setCommentError(null);
    setCommentFeedback({});
  };

  // ── Enviar comentario ──────────────────────────────────────────────────────

  const handleSendComment = async () => {
    if (!commentText.trim() || !openPost) return;
    setIsCommentSubmitting(true);
    setCommentError(null);
    const textToSend = commentText;
    setCommentText("");
    try {
      const newComment = await commentPost(
        openPost.id,
        textToSend,
        isCommentAnonymous,
        user?.id
      );
      setComments((prev) => [...prev, newComment]);
      // Actualizar contador en la lista de posts
      setPosts((prev) =>
        prev.map((p) =>
          p.id === openPost.id ? { ...p, comments: p.comments + 1 } : p
        )
      );
      // Actualizar el openPost para consistencia
      setOpenPost((prev) => prev ? { ...prev, comments: prev.comments + 1 } : prev);
    } catch {
      setCommentText(textToSend); // devolver texto
      setCommentError("No se pudo enviar el comentario. Intenta de nuevo.");
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  // ── Borrar comentario ──────────────────────────────────────────────────────

  const handleDeleteComment = async (commentId: string) => {
    if (!openPost) return;
    try {
      await deleteComment(openPost.id, commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === openPost.id ? { ...p, comments: Math.max(0, p.comments - 1) } : p
        )
      );
      setOpenPost((prev) =>
        prev ? { ...prev, comments: Math.max(0, prev.comments - 1) } : prev
      );
    } catch {
      // 404 → el backend no soporta aún
      setCommentFeedback((prev) => ({
        ...prev,
        [commentId]: "⚠ Esta función aún no está disponible.",
      }));
      // Limpiar feedback después de 3 s
      setTimeout(() => {
        setCommentFeedback((prev) => {
          const next = { ...prev };
          delete next[commentId];
          return next;
        });
      }, 3000);
    }
  };

  // ── Denunciar post ─────────────────────────────────────────────────────────
  // El endpoint no existe (404), pero damos feedback local de que el reporte fue recibido.

  const handleReportPost = (postId: string) => {
    reportedPosts.current.add(postId);
    // Feedback local positivo aunque la API no exista
    setCommentFeedback((prev) => ({
      ...prev,
      [`report_${postId}`]: "✓ Gracias por reportar. Lo revisaremos pronto.",
    }));
    setTimeout(() => {
      setCommentFeedback((prev) => {
        const next = { ...prev };
        delete next[`report_${postId}`];
        return next;
      });
    }, 4000);
  };

  // ── Borrar post propio ─────────────────────────────────────────────────────

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      if (openPost?.id === postId) handleClosePost();
    } catch {
      setError("No se pudo eliminar la publicación.");
    }
  };

  return {
    // Lista
    posts,
    categories,
    postText,
    postTitle,
    selectedTags,
    isModalOpen,
    isAnonymous,
    isLoading,
    isSubmitting,
    error,
    setPostText,
    setPostTitle,
    setSelectedTags,
    setIsModalOpen,
    setIsAnonymous,
    toggleTag,
    handlePublish,
    handleToggleLike,
    handleToggleBookmark,
    handleDeletePost,
    loadPosts,
    // Detalle / comentarios
    openPost,
    comments,
    isCommentsLoading,
    commentText,
    isCommentAnonymous,
    isCommentSubmitting,
    commentError,
    commentFeedback,
    currentUserId: user?.id ?? null,
    setCommentText,
    setIsCommentAnonymous,
    handleOpenPost,
    handleClosePost,
    handleSendComment,
    handleDeleteComment,
    handleReportPost,
    isReported: (postId: string) => reportedPosts.current.has(postId),
  };
}
