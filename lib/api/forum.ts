// lib/api/forum.ts
// Foro comunitario — posts, reacciones y comentarios.

import { apiRequest } from './client';
import type { ForoPost, ForoCategory, ForoComment, CreateForoPostData } from '@/types';

// ─── Helpers de normalización ────────────────────────────────────────────────

type ApiRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ApiRecord {
  return typeof value === 'object' && value !== null;
}

function unwrapData(value: unknown): unknown {
  if (!isRecord(value) || !('data' in value)) return value;
  const data = (value as { data?: unknown }).data;
  return data ?? value;
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

/** Convierte un post raw de la API al tipo ForoPost del UI. */
function normalizePost(raw: unknown): ForoPost {
  const post = isRecord(raw) ? raw : {};
  const user = isRecord(post.user) ? post.user : {};
  const tags = asStringArray(post.tags);
  const isAnon = asBoolean(post.isAnonymous, asBoolean(post.is_anonymous));

  return {
    id: asString(post.id, asString(post._id, String(Date.now()))),
    title: asString(post.title),
    author: isAnon
      ? 'Anónimo'
      : asString(post.authorName, asString(user.name, asString(post.author, 'Usuario'))),
    timeAgo: asString(post.createdAt)
      ? new Date(asString(post.createdAt)).toLocaleDateString('es')
      : 'Reciente',
    tags,
    tagVariants: tags.map(() => 'default' as const),
    content: asString(post.content),
    likes: asNumber(post.reactionUps, asNumber(post.likes_count, asNumber(post.likes))),
    comments: asNumber(post.commentCount, asNumber(post.comments_count, asNumber(post.comments))),
    liked: asBoolean(post.liked),
    bookmarked: asBoolean(post.bookmarked),
    authorId: asString(post.authorId),
  };
}

/** Convierte un comentario raw al tipo ForoComment del UI. */
function normalizeComment(raw: unknown, currentUserId?: string): ForoComment {
  const comment = isRecord(raw) ? raw : {};
  const isAnon = asBoolean(comment.isAnonymous, asBoolean(comment.is_anonymous));
  const authorId = asString(comment.authorId);
  const isMine = !!currentUserId && authorId === currentUserId;

  return {
    id: asString(comment.id, asString(comment._id, String(Date.now()))),
    postId: asString(comment.postId),
    authorId,
    author: isAnon
      ? 'Anónimo'
      : isMine
      ? 'Tú'
      : asString(comment.authorName, 'Miembro de la comunidad'),
    content: asString(comment.content),
    isAnonymous: isAnon,
    likes: asNumber(comment.reactionUps),
    timeAgo: asString(comment.createdAt)
      ? timeAgoFromDate(asString(comment.createdAt))
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
  const res = await apiRequest<unknown>(
    `/forum/posts?page=${page}&limit=${limit}`
  );
  const payload = unwrapData(res);
  return Array.isArray(payload) ? payload.map(normalizePost) : [];
}

/**
 * Publica un nuevo post en el foro.
 * El hook actualiza la lista localmente tras llamar esta función.
 */
export async function createForoPost(
  data: CreateForoPostData
): Promise<ForoPost> {
  const res = await apiRequest<unknown>('/forum/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      is_anonymous: data.isAnonymous,
    }),
  });
  return normalizePost(unwrapData(res));
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
  const res = await apiRequest<unknown>(`/forum/posts/${postId}/comments`);
  const payload = unwrapData(res);
  return Array.isArray(payload)
    ? payload.map((comment) => normalizeComment(comment, currentUserId))
    : [];
}

/** Comenta en un post. */
export async function commentPost(
  postId: string,
  content: string,
  is_anonymous = false,
  currentUserId?: string
): Promise<ForoComment> {
  const res = await apiRequest<unknown>(`/forum/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content, is_anonymous }),
  });
  return normalizeComment(unwrapData(res), currentUserId);
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
