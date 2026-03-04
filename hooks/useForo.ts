"use client";

import { useState, useEffect } from "react";
import {
  getForoPosts,
  createForoPost,
  toggleLikePost,
  getForoCategories,
} from "@/lib/api/forum";
import type { ForoPost, ForoCategory } from "@/types";

export function useForo() {
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

  useEffect(() => {
    Promise.all([getForoPosts(1, 10), getForoCategories()])
      .then(([p, c]) => {
        setPosts(p);
        setCategories(c);
      })
      .catch(() => setError("Error al cargar el foro"))
      .finally(() => setIsLoading(false));
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

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
      // Recargar lista desde la API
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

  const handleToggleLike = async (id: string) => {
    // Optimistic update
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
    try {
      await toggleLikePost(id);
    } catch {
      // Revertir si falla
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
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

  return {
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
  };
}
