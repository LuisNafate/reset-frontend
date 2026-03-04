// lib/api/forum.ts
// Foro comunitario — posts, reacciones y comentarios.

import { apiRequest } from './client';
import type { ForoPost, ForoCategory, CreateForoPostData } from '@/types';

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
  };
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

/** Reacciona (like) o quita la reacción de un post. */
export async function toggleLikePost(
  postId: string
): Promise<{ liked: boolean; likes: number }> {
  const res: any = await apiRequest(
    `/forum/posts/${postId}/react`,
    { method: 'POST' }
  );
  return { liked: res?.liked ?? true, likes: res?.likes ?? 0 };
}

/** Comenta en un post. */
export async function commentPost(
  postId: string,
  content: string,
  is_anonymous = false
): Promise<any> {
  return apiRequest(`/forum/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content, is_anonymous }),
  });
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
