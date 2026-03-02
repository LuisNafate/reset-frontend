"use client";

import Badge from "@/components/ui/Badge";
import { useForo } from "@/hooks/useForo";
import { FORO_TAGS } from "@/lib/constants";

export default function ForoPage() {
  const {
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
    setIsModalOpen,
    setIsAnon,
    toggleTag,
    handlePublish,
    handleToggleLike,
    handleToggleBookmark,
  } = useForo();

  return (
    <div className="min-h-full">
      {/* Contenido con padding responsivo */}
      <div className="px-4 sm:px-10 py-6 sm:py-10 max-w-[1100px] mx-auto">
        {/* Top label */}
        <p
          className="text-[9px] tracking-[1.8px] uppercase text-slate-400 mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Comunidad Oasis
        </p>

        {/* Grid: columna única en móvil, 2 columnas en lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Main column */}
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <p
                  className="text-[9px] tracking-[1.8px] uppercase text-slate-400 italic"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  — Espacio Seguro —
                </p>
              </div>
            </div>

            {/* Título + botón nuevo post */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3 sm:gap-0">
              <h1
                className="text-[44px] font-normal text-slate-800 leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Foro Comunitario
              </h1>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 h-[42px] px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors mb-1"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Nuevo post
              </button>
            </div>



            {/* Posts */}
            <div className="flex flex-col gap-5">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-slate-100 rounded-sm p-6"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
                >
                  {/* Post header \u2014 wrap en m\u00f3vil para evitar desbordamiento de tags */}
                  <div className="flex flex-wrap items-start justify-between mb-3 gap-2">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                          <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                        <div className="min-w-0">
                          <h3
                            className="text-[18px] italic text-slate-700 leading-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {post.title}
                          </h3>
                        <p
                          className="text-[9px] tracking-[0.6px] uppercase text-slate-400 mt-0.5"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          Publicado por {post.author} · {post.timeAgo}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {post.tags.map((tag, idx) => (
                        <Badge
                          key={tag}
                          label={tag}
                          variant={post.tagVariants[idx] || "default"}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <p
                    className="text-[14px] text-slate-600 leading-relaxed mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {post.content}
                  </p>

                  {/* Post footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <button
                        className="flex items-center gap-1.5 transition-colors"
                        onClick={() => handleToggleLike(post.id)}
                      >
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill={post.liked ? "#0ea5e9" : "none"}
                          stroke={post.liked ? "#0ea5e9" : "#94a3b8"} strokeWidth="1.5"
                        >
                          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span
                          className="text-[9px] tracking-[0.5px] uppercase text-slate-400"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {post.likes} likes
                        </span>
                      </button>
                      <button className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                          <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span
                          className="text-[9px] tracking-[0.5px] uppercase text-slate-400"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {post.comments} comentarios
                        </span>
                      </button>
                    </div>
                    <button
                      className="transition-colors"
                      onClick={() => handleToggleBookmark(post.id)}
                    >
                      <svg
                        width="16" height="16" viewBox="0 0 24 24"
                        fill={post.bookmarked ? "#0ea5e9" : "none"}
                        stroke={post.bookmarked ? "#0ea5e9" : "#cbd5e1"} strokeWidth="1.5"
                      >
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5">
            {/* Categories */}
            <div>
              <p
                className="text-[9px] tracking-[1.8px] uppercase text-slate-400 mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Categorías Populares
              </p>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    className="flex items-center justify-between w-full py-2.5 border-b border-slate-100 hover:text-sky-500 transition-colors group text-left"
                  >
                    <span
                      className="text-[13px] italic text-slate-600 group-hover:text-sky-500 transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {cat.name}
                    </span>
                    <span
                      className="text-[9px] uppercase text-slate-300"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Normas del Oasis */}
            <div className="bg-white border border-slate-100 rounded-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p
                  className="text-[9px] tracking-[1.5px] uppercase text-sky-500"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Normas del Oasis
                </p>
              </div>
              <p
                className="text-[13px] italic text-slate-600 leading-relaxed mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Recuerda que este es un espacio de respeto mutuo. No juzgamos, acompañamos el crecimiento de cada semilla.
              </p>
              <a
                href="#"
                className="text-[9px] tracking-[1px] uppercase text-sky-500 hover:underline"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Leer Manual de Comunidad
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de nuevo post */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(15,23,42,0.25)", backdropFilter: "blur(2px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div
            className="bg-white border border-slate-100 rounded-sm p-8 w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.10)" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <p
                className="text-[9px] tracking-[1.8px] uppercase text-slate-400"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Nueva Publicación
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-300 hover:text-slate-500 transition-colors"
                aria-label="Cerrar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Título del post */}
            <div className="mb-4">
              <p
                className="text-[9px] tracking-[1px] uppercase text-slate-400 mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Título
              </p>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Dale un título a tu publicación..."
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 placeholder-slate-300 outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontStyle: "italic" }}
              />
            </div>

            {/* Contenido */}
            <div className="mb-5">
              <p
                className="text-[9px] tracking-[1px] uppercase text-slate-400 mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Contenido
              </p>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="¿Qué tienes en mente hoy? Comparte con la comunidad..."
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-lg p-4 text-slate-500 placeholder-slate-300 outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 resize-none transition-all"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontStyle: "italic" }}
              />
            </div>

            {/* Etiquetas */}
            <div className="mb-5">
              <p
                className="text-[9px] tracking-[1px] uppercase text-slate-400 mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Etiquetas
              </p>
              <div className="flex flex-wrap gap-2">
                {FORO_TAGS.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="transition-all border rounded-full px-3 py-1"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        backgroundColor: active ? "#0f172a" : "#f8fafc",
                        borderColor: active ? "#0f172a" : "#e2e8f0",
                        color: active ? "#ffffff" : "#94a3b8",
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggle anónimo */}
            <div className="flex items-center gap-3 mb-6 py-3 border-t border-b border-slate-100">
              <span
                className="text-[9px] tracking-[1px] uppercase text-slate-400 flex-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Publicar como anónimo
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isAnon}
                onClick={() => setIsAnon(!isAnon)}
                className="relative rounded-full transition-colors duration-200 flex-shrink-0"
                style={{
                  width: 40,
                  height: 22,
                  backgroundColor: isAnon ? "#0ea5e9" : "#e2e8f0",
                }}
              >
                <span
                  className="absolute rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    width: 16,
                    height: 16,
                    top: 3,
                    left: 3,
                    transform: isAnon ? "translateX(18px)" : "translateX(0)",
                  }}
                />
              </button>
              <span
                className="text-[9px] uppercase min-w-[40px] text-right"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: isAnon ? "#0ea5e9" : "#94a3b8",
                }}
              >
                {isAnon ? "Sí" : "No"}
              </span>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-[42px] px-5 border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 rounded-xl transition-colors"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handlePublish}
                disabled={!postText.trim() || isSubmitting}
                className="flex items-center gap-2 h-[42px] px-6 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl transition-colors"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {isSubmitting ? (
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v3m0 12v3M3 12h3m12 0h3" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {isSubmitting ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
