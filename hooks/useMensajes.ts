"use client";

import { useState, useEffect } from "react";
import { getMessages, sendMessage, getMessageLibrary } from "@/lib/api/companion";
import type { Message, MessageLibraryItem } from "@/types";

// ─── Biblioteca de aliento local (respaldo cuando el API no está disponible) ──

const FALLBACK_LIBRARY: MessageLibraryItem[] = [
  { id: "f1", text: "Cada día que pasa es una victoria. Estoy orgulloso/a de ti." },
  { id: "f2", text: "Recuerda por qué empezaste este camino. Eres más fuerte de lo que crees." },
  { id: "f3", text: "Hoy puede ser difícil, pero mañana agradecerás haber seguido adelante." },
  { id: "f4", text: "No estás solo/a en esto. Aquí estoy para lo que necesites." },
  { id: "f5", text: "Tu valentía me inspira cada día. ¡Sigue adelante!" },
  { id: "f6", text: "Los momentos difíciles son temporales. Tu fortaleza es permanente." },
  { id: "f7", text: "Un paso a la vez. Hoy es suficiente con seguir." },
  { id: "f8", text: "Me alegra saber que estás trabajando en ti mismo. Eso importa mucho." },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useMensajes() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [library, setLibrary] = useState<MessageLibraryItem[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Indica si el endpoint de envío está disponible o no
  const [sendDisabled, setSendDisabled] = useState(false);

  useEffect(() => {
    async function load() {
      // Carga mensajes: 404 es silencioso (lista vacía)
      try {
        const msgs = await getMessages();
        setMessages(msgs);
      } catch {
        setMessages([]);     // 404 expected → lista vacía sin error UI
        setSendDisabled(true); // si /messages falla, el envío tampoco funcionará
      }

      // Carga biblioteca: si falla usa la de respaldo local
      try {
        const lib = await getMessageLibrary();
        setLibrary(lib.length > 0 ? lib : FALLBACK_LIBRARY);
      } catch {
        setLibrary(FALLBACK_LIBRARY);
      }

      setIsLoading(false);
    }

    load();
  }, []);

  const handleSend = async () => {
    if (!text.trim() || sendDisabled) return;
    const optimistic: Message = { id: `opt_${Date.now()}`, text, time: "Enviando...", fromMe: true };
    setMessages((prev) => [...prev, optimistic]);
    setText("");
    setIsSending(true);
    setError(null);
    try {
      const sent = await sendMessage(optimistic.text);
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? sent : m))
      );
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setText(optimistic.text); // devolver el texto para que no lo pierda el usuario
      setError("El servicio de mensajería no está disponible aún. Tu mensaje no fue enviado.");
      setSendDisabled(true);
    } finally {
      setIsSending(false);
    }
  };

  return {
    messages,
    library,
    text,
    isLoading,
    isSending,
    sendDisabled,
    error,
    setText,
    handleSend,
  };
}

