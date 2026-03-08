"use client";

import { useMensajes } from "@/hooks/useMensajes";

export default function MensajesPage() {
  const { messages, library, text, isLoading, isSending, sendDisabled, error, setText, handleSend } = useMensajes();

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
          <p className="text-[11px] rs-text-caption tracking-[1px] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Cargando mensajes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">
        {/* Header */}
        <p
          className="text-[11px] tracking-[2px] uppercase italic rs-text-caption mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          — Canal de Aliento —
        </p>
        <h1
          className="text-[44px] font-normal rs-text-heading leading-none mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Mensajes de Aliento
        </h1>
        <p
          className="text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-6"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Mensajes de aliento para quien acompañas
        </p>

        {/* Aviso si mensajería no está disponible */}
        {sendDisabled && (
          <div className="border border-amber-100 dark:border-amber-800/30 bg-amber-50 dark:bg-amber-900/10 rounded-sm px-5 py-3 mb-6 flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" className="flex-shrink-0 mt-0.5">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-[11px] italic text-amber-700 dark:text-amber-400 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
              El servicio de mensajería está en desarrollo. Por ahora, usa la biblioteca de abajo para copiar frases de aliento y enviárselas por otro medio.
            </p>
          </div>
        )}

        {/* Grid: columna única en móvil, chat + biblioteca en sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-5">
          {/* Chat area */}
          <div className="flex flex-col gap-4">
            <div className="border border-[var(--ui-border)] bg-[var(--surface-card)] rounded-sm p-6 flex flex-col gap-3 min-h-[320px]">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-10">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1">
                    <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[12px] italic rs-text-caption" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Aún no hay mensajes.
                  </p>
                  <p className="text-[11px] rs-text-caption leading-relaxed max-w-[180px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Selecciona una frase de aliento de la biblioteca →
                  </p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-xl ${
                        msg.fromMe
                          ? "bg-teal-600 text-white"
                          : "bg-slate-50 dark:bg-[#0a1628] border border-slate-100 dark:border-slate-700/30 rs-text-body"
                      }`}
                    >
                      <p
                        className="text-[13px] leading-relaxed"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontStyle: "italic",
                          color: msg.fromMe ? "white" : undefined,
                        }}
                      >
                        {msg.text}
                      </p>
                      <p
                        className={`text-[11px] mt-1 ${msg.fromMe ? "text-teal-200" : "text-slate-300"}`}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Error de envío */}
            {error && (
              <p className="text-[11px] text-red-400 px-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {error}
              </p>
            )}

            {/* Input de mensaje */}
            <div className="flex gap-2">
              <textarea
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={sendDisabled ? "Mensajería en desarrollo..." : "Escribe un mensaje de aliento..."}
                disabled={sendDisabled}
                className="flex-1 border border-[var(--ui-border)] dark:bg-[#070f1a] dark:text-slate-200 dark:placeholder-slate-600 rounded-lg px-4 py-3 rs-text-body text-[13px] outline-none resize-none focus:border-teal-300 focus:ring-1 focus:ring-teal-100 transition-all disabled:bg-slate-50 dark:disabled:bg-[#0a1628] disabled:text-slate-300 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !sendDisabled) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                onClick={handleSend}
                disabled={!text.trim() || isSending || sendDisabled}
                className="px-5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 self-end"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  height: 72,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Enviar
              </button>
            </div>
          </div>

          {/* Sidebar: biblioteca */}
          <div className="flex flex-col gap-4">
            <div className="border border-[var(--ui-border)] bg-[var(--surface-card)] rounded-sm p-5">
              <p
                className="text-[11px] tracking-[1.5px] uppercase text-teal-600 mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Biblioteca de Aliento
              </p>
              <div className="flex flex-col gap-2">
                {library.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setText(item.text)}
                    className="text-left text-[11px] italic rs-text-caption hover:text-teal-600 py-2 px-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors border border-transparent hover:border-teal-100 dark:hover:border-teal-800/40"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-teal-100 dark:border-teal-800/30 bg-teal-50 dark:bg-teal-900/20 rounded-sm p-4">
              <p
                className="text-[11px] tracking-[1.5px] uppercase text-teal-600 mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ¿Por qué enviar mensajes?
              </p>
              <p
                className="text-[11px] italic text-teal-700 dark:text-teal-300 leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Los mensajes de apoyo aumentan la motivación y reducen la sensación de soledad en la recuperación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
