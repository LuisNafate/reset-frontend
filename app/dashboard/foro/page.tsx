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
    isAnonymous,
    isLoading,
    isSubmitting,
    error,
    publishError,
    setPostText,
    setPostTitle,
    setIsModalOpen,
    setIsAnonymous,
    toggleTag,
    handlePublish,
    handleToggleLike,
    handleToggleBookmark,
    handleDeletePost,
    loadPosts,
    // Detalle
    openPost,
    comments,
    isCommentsLoading,
    commentText,
    isCommentAnonymous,
    isCommentSubmitting,
    commentError,
    commentFeedback,
    currentUserId,
    setCommentText,
    setIsCommentAnonymous,
    handleOpenPost,
    handleClosePost,
    handleSendComment,
    handleDeleteComment,
    handleReportPost,
    isReported,
  } = useForo();

  return (
    <div className="min-h-full">
      {/* Contenido con padding responsivo */}
      <div className="px-4 sm:px-10 py-6 sm:py-10 max-w-[1100px] mx-auto">
        {/* Top label */}
        <p
          className="text-[11px] tracking-[1.8px] uppercase rs-text-caption mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Comunidad ReSet
        </p>

        {/* Grid: columna única en móvil, 2 columnas en lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Main column */}
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <p
                  className="text-[11px] tracking-[1.8px] uppercase rs-text-caption italic"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  — Espacio Seguro —
                </p>
              </div>
            </div>

            {/* Título + botón nuevo post */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3 sm:gap-0">
              <h1
                className="text-[44px] font-normal rs-text-heading leading-none"
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
              {/* Estado de carga */}
              {isLoading && (
                <div className="flex items-center justify-center py-16">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
                    <p
                      className="text-[11px] uppercase tracking-[1.5px] rs-text-caption"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Cargando publicaciones…
                    </p>
                  </div>
                </div>
              )}

              {/* Estado de error */}
              {!isLoading && error && (
                <div className="flex flex-col items-center gap-3 py-12 border border-red-100 bg-red-50 rounded-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                    <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p
                    className="text-[11px] uppercase tracking-[1px] text-red-500 text-center"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {error}
                  </p>
                  <button
                    onClick={loadPosts}
                    className="mt-1 px-5 py-1.5 bg-slate-800 text-white rounded-sm hover:bg-slate-700 transition-colors"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase" }}
                  >
                    Reintentar
                  </button>
                </div>
              )}

              {/* Lista vacía */}
              {!isLoading && !error && posts.length === 0 && (
                <div className="flex flex-col items-center gap-3 py-14">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1">
                    <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p
                    className="text-[11px] uppercase tracking-[1px] rs-text-caption italic"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Aún no hay publicaciones. ¡Sé el primero!
                  </p>
                </div>
              )}

              {/* Posts reales */}
              {!isLoading && !error && posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[var(--surface-card)] border border-slate-100 dark:border-slate-700/40 rounded-sm p-6"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
                >
                  {/* Post header \u2014 wrap en m\u00f3vil para evitar desbordamiento de tags */}
                  <div className="flex flex-wrap items-start justify-between mb-3 gap-2">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                          <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                        <div className="min-w-0">
                          <h3
                            className="text-[18px] italic rs-text-body leading-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {post.title}
                          </h3>
                        <p
                          className="text-[11px] tracking-[0.6px] uppercase rs-text-caption mt-0.5"
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
                    className="text-[14px] rs-text-muted leading-relaxed mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {post.content}
                  </p>

                  {/* Post footer */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-4">
                      {/* Like */}
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
                          <span className="text-[11px] tracking-[0.5px] uppercase rs-text-caption" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {post.likes} likes
                        </span>
                      </button>
                      {/* Ver comentarios */}
                      <button
                        className="flex items-center gap-1.5 hover:text-sky-500 transition-colors group"
                        onClick={() => handleOpenPost(post)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" className="group-hover:stroke-sky-400 transition-colors">
                          <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                          <span className="text-[11px] tracking-[0.5px] uppercase rs-text-caption group-hover:text-sky-400 transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {post.comments} comentarios
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Denunciar (solo si no es mío y no fue reportado) */}
                      {post.authorId !== currentUserId && !isReported(post.id) && (
                        <button
                          className="flex items-center gap-1 rs-text-caption hover:text-red-400 transition-colors"
                          title="Denunciar publicación"
                          onClick={() => handleReportPost(post.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7.5m11.5-7.5l1.5 7.5M9 21h6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-[11px] uppercase tracking-[0.5px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Denunciar</span>
                        </button>
                      )}
                      {/* Confirmación de reporte enviado */}
                      {isReported(post.id) && (
                          <span className="text-[11px] uppercase tracking-[0.5px] rs-text-caption" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Reportado</span>
                      )}
                      {/* Feedback de reporte */}
                      {commentFeedback[`report_${post.id}`] && (
                        <span className="text-[11px] text-sky-400 italic" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{commentFeedback[`report_${post.id}`]}</span>
                      )}
                      {/* Borrar (solo si es mío) */}
                      {post.authorId === currentUserId && (
                        <button
                          className="flex items-center gap-1 rs-text-caption hover:text-red-400 transition-colors"
                          title="Eliminar publicación"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-[11px] uppercase tracking-[0.5px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Eliminar</span>
                        </button>
                      )}
                      {/* Guardar */}
                      <button className="transition-colors" onClick={() => handleToggleBookmark(post.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={post.bookmarked ? "#0ea5e9" : "none"} stroke={post.bookmarked ? "#0ea5e9" : "#cbd5e1"} strokeWidth="1.5">
                          <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
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
                className="text-[11px] tracking-[1.8px] uppercase rs-text-caption mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Categorías Populares
              </p>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    className="flex items-center justify-between w-full py-2.5 border-b border-slate-100 dark:border-slate-700/30 hover:text-sky-500 transition-colors group text-left"
                  >
                    <span
                      className="text-[13px] italic rs-text-muted group-hover:text-sky-500 transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {cat.name}
                    </span>
                    <span
                      className="text-[11px] uppercase rs-text-caption"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Normas del Oasis */}
              <div className="bg-[var(--surface-card)] border border-slate-100 dark:border-slate-700/40 rounded-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p
                  className="text-[11px] tracking-[1.5px] uppercase text-sky-500"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Normas del Oasis
                </p>
              </div>
              <p
                className="text-[13px] italic rs-text-muted leading-relaxed mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Recuerda que este es un espacio de respeto mutuo. No juzgamos, acompañamos el crecimiento de cada semilla.
              </p>
              <a
                href="#"
                className="text-[11px] tracking-[1px] uppercase text-sky-500 hover:underline"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Leer Manual de Comunidad
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ═══════════════════════════════════════════════════════════════
           Modal de detalle del post — comentarios, responder, denunciar
      ═══════════════════════════════════════════════════════════════ */}
      {openPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(15,23,42,0.3)", backdropFilter: "blur(2px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClosePost(); }}
        >
          <div
            className="bg-[var(--surface-card)] border border-slate-100 dark:border-slate-700/40 rounded-sm w-full max-w-[680px] max-h-[90vh] flex flex-col"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.10)" }}
          >
            {/* Cabecera del post */}
              <div className="flex items-start justify-between p-7 pb-5 border-b border-slate-50 dark:border-slate-700/30">
              <div className="flex-1 min-w-0 pr-6">
                <p className="text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Publicado por {openPost.author} · {openPost.timeAgo}
                </p>
                  <h2 className="text-[22px] italic rs-text-heading leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {openPost.title}
                </h2>
                  <p className="text-[14px] rs-text-muted leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {openPost.content}
                </p>
                {/* Tags */}
                {openPost.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                    {openPost.tags.map((tag) => (
                      <span key={tag} className="text-[7px] tracking-[1px] uppercase text-sky-400 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/40 px-2 py-0.5 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleClosePost}
                className="rs-text-caption hover:text-slate-500 transition-colors flex-shrink-0"
                aria-label="Cerrar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Cuerpo scrolleable: lista de comentarios */}
            <div className="flex-1 overflow-y-auto px-7 py-4">
              <p className="text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {openPost.comments === 0 ? 'Sin comentarios aún' : `${openPost.comments} comentario${openPost.comments !== 1 ? 's' : ''}`}
              </p>

              {/* Cargando comentarios */}
              {isCommentsLoading && (
                <div className="flex justify-center py-8">
                  <div className="w-5 h-5 border-2 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
                </div>
              )}

              {/* Error al cargar */}
              {!isCommentsLoading && commentError && comments.length === 0 && (
                <p className="text-[11px] text-red-400 italic py-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{commentError}</p>
              )}

              {/* Lista vacía */}
              {!isCommentsLoading && !commentError && comments.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="1">
                    <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-[11px] uppercase tracking-[1px] rs-text-caption italic" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Sé el primero en comentar</p>
                </div>
              )}

              {/* Comentarios */}
              {!isCommentsLoading && comments.map((comment, idx) => (
                <div
                  key={comment.id}
                  className={`py-4 ${idx > 0 ? 'border-t border-slate-50 dark:border-slate-700/20' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                      <div className="w-7 h-7 rounded-full bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {comment.isAnonymous ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                          <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                          <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[11px] uppercase tracking-[0.8px] font-medium"
                          style={{ fontFamily: "'JetBrains Mono', monospace", color: comment.isMine ? '#0ea5e9' : '#64748b' }}
                        >
                          {comment.author}
                        </span>
                        <span className="text-[11px] rs-text-caption" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{comment.timeAgo}</span>
                        {comment.isAnonymous && (
                          <span className="text-[7px] uppercase tracking-[0.8px] rs-text-caption bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/40 px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Anónimo</span>
                        )}
                      </div>
                      <p className="text-[13px] italic rs-text-muted leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {comment.content}
                      </p>
                      {/* Feedback inline */}
                      {commentFeedback[comment.id] && (
                        <p className="text-[11px] text-amber-500 mt-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {commentFeedback[comment.id]}
                        </p>
                      )}
                    </div>
                    {/* Acciones del comentario */}
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {/* Borrar (solo si es mío) */}
                      {comment.isMine && (
                        <button
                          className="rs-text-caption hover:text-red-400 transition-colors"
                          title="Eliminar comentario"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )}
                      {/* Denunciar (solo si no es mío) */}
                      {!comment.isMine && (
                        <button
                          className="rs-text-caption hover:text-red-400 transition-colors"
                          title="Denunciar comentario"
                          onClick={() => handleReportPost(comment.id)}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7.5m11.5-7.5l1.5 7.5M9 21h6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Feedback de denuncia de comentario */}
                  {commentFeedback[`report_${comment.id}`] && (
                    <p className="text-[11px] text-sky-400 mt-2 ml-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {commentFeedback[`report_${comment.id}`]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Footer: input para responder */}
            <div className="border-t border-slate-100 dark:border-slate-700/30 px-7 py-5">
              {/* Error de envío */}
              {commentError && comments.length > 0 && (
                <p className="text-[11px] text-red-400 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{commentError}</p>
              )}

              {/* Toggle anónimo */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] tracking-[1px] uppercase rs-text-caption flex-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Comentar como anónimo
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isCommentAnonymous}
                  onClick={() => setIsCommentAnonymous(!isCommentAnonymous)}
                  className="relative rounded-full transition-colors duration-200 flex-shrink-0"
                  style={{ width: 36, height: 20, backgroundColor: isCommentAnonymous ? '#0ea5e9' : '#e2e8f0' }}
                >
                  <span
                    className="absolute rounded-full bg-white shadow-sm transition-transform duration-200"
                    style={{ width: 14, height: 14, top: 3, left: 3, transform: isCommentAnonymous ? 'translateX(16px)' : 'translateX(0)' }}
                  />
                </button>
                <span className="text-[11px] uppercase min-w-[28px] text-right" style={{ fontFamily: "'JetBrains Mono', monospace", color: isCommentAnonymous ? '#0ea5e9' : '#94a3b8' }}>
                  {isCommentAnonymous ? 'Sí' : 'No'}
                </span>
              </div>

              {/* Caja de texto */}
              <div className="flex gap-3">
                <textarea
                  rows={2}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escribe un comentario de apoyo..."
                  className="flex-1 border border-[var(--ui-border)] dark:bg-[#070f1a] dark:text-slate-200 dark:placeholder-slate-600 rounded-lg px-4 py-3 rs-text-body text-[13px] outline-none resize-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendComment();
                    }
                  }}
                />
                <button
                  onClick={handleSendComment}
                  disabled={!commentText.trim() || isCommentSubmitting}
                  className="px-5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-1.5 self-end"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', height: 68 }}
                >
                  {isCommentSubmitting ? (
                    <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 3v3m0 12v3M3 12h3m12 0h3" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de nuevo post */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(15,23,42,0.25)", backdropFilter: "blur(2px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div
            className="bg-[var(--surface-card)] border border-slate-100 dark:border-slate-700/40 rounded-sm p-8 w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.10)" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <p
                className="text-[11px] tracking-[1.8px] uppercase rs-text-caption"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Nueva Publicación
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rs-text-caption hover:text-slate-500 transition-colors"
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
                className="text-[11px] tracking-[1px] uppercase rs-text-caption mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Título
              </p>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Dale un título a tu publicación..."
                  className="w-full bg-[var(--surface-input)] border border-[var(--ui-border)] rounded-lg px-4 py-2.5 rs-text-body placeholder-slate-300 dark:placeholder-slate-600 outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 transition-all"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontStyle: "italic" }}
              />
            </div>

            {/* Contenido */}
            <div className="mb-5">
              <p
                className="text-[11px] tracking-[1px] uppercase rs-text-caption mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Contenido
              </p>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="¿Qué tienes en mente hoy? Comparte con la comunidad..."
                rows={4}
                  className="w-full bg-[var(--surface-input)] border border-[var(--ui-border)] rounded-lg p-4 rs-text-caption placeholder-slate-300 dark:placeholder-slate-600 outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-100 resize-none transition-all"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontStyle: "italic" }}
              />
            </div>

            {/* Etiquetas */}
            <div className="mb-5">
              <p
                className="text-[11px] tracking-[1px] uppercase rs-text-caption mb-3"
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
                        fontSize: 11,
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
              <div className="flex items-center gap-3 mb-6 py-3 border-t border-b border-slate-100 dark:border-slate-700/30">
              <span
                className="text-[11px] tracking-[1px] uppercase rs-text-caption flex-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Publicar como anónimo
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isAnonymous}
                onClick={() => setIsAnonymous(!isAnonymous)}
                className="relative rounded-full transition-colors duration-200 flex-shrink-0"
                style={{
                  width: 40,
                  height: 22,
                  backgroundColor: isAnonymous ? "#0ea5e9" : "#e2e8f0",
                }}
              >
                <span
                  className="absolute rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    width: 16,
                    height: 16,
                    top: 3,
                    left: 3,
                    transform: isAnonymous ? "translateX(18px)" : "translateX(0)",
                  }}
                />
              </button>
              <span
                className="text-[11px] uppercase min-w-[40px] text-right"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: isAnonymous ? "#0ea5e9" : "#94a3b8",
                }}
              >
                {isAnonymous ? "Sí" : "No"}
              </span>
            </div>

            {/* Error de publicación */}
            {publishError && (
              <p
                className="mb-4 text-[11px] text-red-400"
                role="alert"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {publishError}
              </p>
            )}

            {/* Acciones */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-[42px] px-5 border border-[var(--ui-border)] rs-text-caption hover:border-slate-300 hover:rs-text-body rounded-xl transition-colors"
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
                disabled={!postTitle.trim() || !postText.trim() || isSubmitting}
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
