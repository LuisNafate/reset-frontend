// lib/api/forum.ts
// Foro comunitario — posts, reacciones y comentarios.

import { apiRequest } from './client';
import type { ForoPost, ForoCategory, ForoComment, CreateForoPostData } from '@/types';

// ─── Helpers de normalización ────────────────────────────────────────────────

/** Convierte un post raw de la API al tipo ForoPost del UI. */
function normalizePost(raw: any): ForoPost {
  // La API devuelve: authorName, isAnonymous, reactionUps, commentCount
  const isAnon = raw.isAnonymous ?? raw.is_anonymous ?? false;
  return {
    id: raw.id ?? raw._id ?? String(Date.now()),
    title: raw.title ?? '',
    author: isAnon
      ? 'Anónimo'
      : (raw.authorName ?? raw.user?.name ?? raw.author ?? 'Usuario'),
    timeAgo: raw.createdAt
      ? new Date(raw.createdAt).toLocaleDateString('es')
      : 'Reciente',
    tags: raw.tags ?? [],
    tagVariants: (raw.tags ?? []).map(() => 'default' as const),
    content: raw.content ?? '',
    likes: raw.reactionUps ?? raw.likes_count ?? raw.likes ?? 0,
    comments: raw.commentCount ?? raw.comments_count ?? raw.comments ?? 0,
    liked: raw.liked ?? false,
    bookmarked: raw.bookmarked ?? false,
    authorId: raw.authorId ?? '',
  };
}

/** Convierte un comentario raw al tipo ForoComment del UI. */
function normalizeComment(raw: any, currentUserId?: string): ForoComment {
  const isAnon = raw.isAnonymous ?? raw.is_anonymous ?? false;
  const isMine = !!currentUserId && raw.authorId === currentUserId;
  return {
    id: raw.id ?? raw._id ?? String(Date.now()),
    postId: raw.postId ?? '',
    authorId: raw.authorId ?? '',
    author: isAnon
      ? 'Anónimo'
      : isMine
      ? 'Tú'
      : (raw.authorName ?? 'Miembro de la comunidad'),
    content: raw.content ?? '',
    isAnonymous: isAnon,
    likes: raw.reactionUps ?? 0,
    timeAgo: raw.createdAt
      ? timeAgoFromDate(raw.createdAt)
      : 'Reciente',
    isMine,
  };
}

function timeAgoFromDate(isoDate: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Ahora';
    if (mins < 60) return `Hace ${mins} min`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Hace ${hrs} h`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return 'Ayer';
    return `Hace ${days} días`;
  } catch {
    return 'Reciente';
  }
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Obtiene posts paginados del foro. */
export async function getForoPosts(
  page = 1,
  limit = 10
): Promise<ForoPost[]> {
  const res: any = await apiRequest(
    `/forum/posts?page=${page}&limit=${limit}`
  );
  const list: any[] = res?.data ?? res ?? [];
  return Array.isArray(list) ? list.map(normalizePost) : [];
}

/**
 * Publica un nuevo post en el foro.
 * El hook actualiza la lista localmente tras llamar esta función.
 */
export async function createForoPost(
  data: CreateForoPostData
): Promise<ForoPost> {
  const res: any = await apiRequest('/forum/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      is_anonymous: data.isAnonymous,
    }),
  });
  return normalizePost(res?.data ?? res);
}

/** Reacciona (like) o quita la reacción de un post. El toggle lo gestiona el backend por JWT. */
export async function toggleLikePost(
  postId: string
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(
    `/forum/posts/${postId}/react`,
    { method: 'POST', body: JSON.stringify({}) }
  );
}

/** Obtiene los comentarios de un post. */
export async function getPostComments(
  postId: string,
  currentUserId?: string
): Promise<ForoComment[]> {
  const res: any = await apiRequest(`/forum/posts/${postId}/comments`);
  const list: any[] = res?.data ?? res ?? [];
  return Array.isArray(list)
    ? list.map((c) => normalizeComment(c, currentUserId))
    : [];
}

/** Comenta en un post. */
export async function commentPost(
  postId: string,
  content: string,
  is_anonymous = false,
  currentUserId?: string
): Promise<ForoComment> {
  const res: any = await apiRequest(`/forum/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content, is_anonymous }),

  });
  return normalizeComment(res?.data ?? res, currentUserId);
}

/**
 * Elimina un comentario (puede ser 404 si el backend no lo soporta).
 * Lanza error que el hook debe capturar y mostrar al usuario.
 */
export async function deleteComment(
  _postId: string,
  commentId: string
): Promise<void> {
  await apiRequest(`/forum/comments/${commentId}`, {
    method: 'DELETE',
  });
}

/** Reacciona (like) o quita la reacción de un comentario. El toggle lo gestiona el backend por JWT. */
export async function toggleLikeComment(
  commentId: string
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(
    `/forum/comments/${commentId}/react`,
    { method: 'POST', body: JSON.stringify({}) }
  );
}

/** Elimina un post (solo autor o admin). */
export async function deletePost(postId: string): Promise<void> {
  await apiRequest(`/forum/posts/${postId}`, { method: 'DELETE' });
}

/**
 * No existe endpoint de categorías en la API — devuelve lista vacía
 * para mantener compatibilidad con el hook existente sin romper la UI.
 */
export async function getForoCategories(): Promise<ForoCategory[]> {
  return [];
}
