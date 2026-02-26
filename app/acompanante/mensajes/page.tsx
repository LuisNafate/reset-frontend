"use client";

import { useMensajes } from "@/hooks/useMensajes";

export default function MensajesPage() {
  const { messages, library, text, isLoading, isSending, error, setText, handleSend } = useMensajes();

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="text-slate-400 text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Cargando mensajes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="max-w-2xl mx-auto px-10 py-12">
        {/* Header */}
        <p
          className="text-[9px] tracking-[2px] uppercase italic text-slate-400 mb-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          — Canal de Aliento —
        </p>
        <h1
          className="text-[44px] font-normal text-slate-800 leading-none mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Mensajes de Aliento
        </h1>
        <p
          className="text-[9px] tracking-[1.5px] uppercase text-slate-400 mb-10"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Conversación con Alex — Privado
        </p>

        <div className="grid grid-cols-[1fr_220px] gap-5">
          {/* Chat area */}
          <div className="flex flex-col gap-4">
            <div className="border border-slate-200 bg-white rounded-sm p-6 flex flex-col gap-3 min-h-[320px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-xl ${
                      msg.fromMe
                        ? "bg-teal-600 text-white"
                        : "bg-slate-50 border border-slate-100 text-slate-700"
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
                      className={`text-[8px] mt-1 ${msg.fromMe ? "text-teal-200" : "text-slate-300"}`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <textarea
                rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
                placeholder="Escribe un mensaje de aliento..."
                className="flex-1 border border-slate-200 rounded-lg px-4 py-3 text-slate-700 text-[13px] outline-none resize-none focus:border-teal-300 focus:ring-1 focus:ring-teal-100 transition-all"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                onClick={handleSend}
                disabled={!text.trim() || isSending}
                className="px-5 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-lg transition-colors flex items-center gap-2 self-end"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
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

          {/* Sidebar: library */}
          <div className="flex flex-col gap-4">
            <div className="border border-slate-200 bg-white rounded-sm p-5">
              <p
                className="text-[8px] tracking-[1.5px] uppercase text-teal-600 mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Biblioteca de Aliento
              </p>
              <div className="flex flex-col gap-2">
                {error && (
                  <p className="text-[10px] text-red-400 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{error}</p>
                )}
                {library.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setText(item.text)}
                    className="text-left text-[11px] italic text-slate-500 hover:text-teal-600 py-2 px-3 rounded-lg hover:bg-teal-50 transition-colors border border-transparent hover:border-teal-100"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-teal-100 bg-teal-50 rounded-sm p-4">
              <p
                className="text-[8px] tracking-[1.5px] uppercase text-teal-600 mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ¿Por qué enviar mensajes?
              </p>
              <p
                className="text-[11px] italic text-teal-700 leading-relaxed"
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
