"use client";

import { useState, useEffect } from "react";
import { getForoPosts, createForoPost, toggleLikePost, getForoCategories } from "@/lib/api/forum";
import type { ForoPost, ForoCategory } from "@/types";

export function useForo() {
  const [posts, setPosts] = useState<ForoPost[]>([]);
  const [categories, setCategories] = useState<ForoCategory[]>([]);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnon, setIsAnon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getForoPosts(), getForoCategories()])
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
      const newPost = await createForoPost({
        title: postTitle,
        content: postText,
        isAnon,
        tags: selectedTags,
      });
      setPosts((prev) => [newPost, ...prev]);
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
      // Revert on error
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
    isAnon,
    isLoading,
    isSubmitting,
    error,
    setPostText,
    setPostTitle,
    setSelectedTags,
    setIsModalOpen,
    setIsAnon,
    toggleTag,
    handlePublish,
    handleToggleLike,
    handleToggleBookmark,
  };
}
