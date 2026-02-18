import type { ForoPost, ForoCategory, CreateForoPostData } from "@/types";
import { MOCK_FORO_POSTS, MOCK_FORO_CATEGORIES } from "@/lib/mock/data";
import { authHeaders } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getForoPosts(): Promise<ForoPost[]> {
  // --- MOCK ---
  void authHeaders;
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_FORO_POSTS;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/forum/posts`, { headers: authHeaders() });
  // if (!res.ok) throw new Error("Error al obtener los posts");
  // return res.json();
}

export async function createForoPost(data: CreateForoPostData): Promise<ForoPost> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 400));
  const newPost: ForoPost = {
    id: Date.now(),
    title: "Nueva publicación",
    author: data.isAnon ? "Anónimo" : "Tú",
    timeAgo: "Ahora",
    tags: [],
    tagVariants: [],
    content: data.content,
    likes: 0,
    comments: 0,
    liked: false,
    bookmarked: false,
  };
  return newPost;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/forum/posts`, {
  //   method: "POST",
  //   headers: authHeaders(),
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Error al publicar");
  // return res.json();
}

export async function toggleLikePost(postId: number): Promise<{ liked: boolean; likes: number }> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 200));
  return { liked: true, likes: 1 }; // page optimistically updates state
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/forum/posts/${postId}/like`, {
  //   method: "POST",
  //   headers: authHeaders(),
  // });
  // if (!res.ok) throw new Error("Error al reaccionar");
  // return res.json();
}

export async function getForoCategories(): Promise<ForoCategory[]> {
  // --- MOCK ---
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_FORO_CATEGORIES;
  // --- END MOCK ---

  // REAL IMPLEMENTATION:
  // const res = await fetch(`${BASE_URL}/forum/categories`, { headers: authHeaders() });
  // if (!res.ok) throw new Error("Error al obtener categorías");
  // return res.json();
}
