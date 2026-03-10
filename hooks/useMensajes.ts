"use client";

import { useState, useEffect, useCallback } from "react";
import type { Message, MessageLibraryItem } from "@/types";
import { getGodchildProfile } from "@/lib/api/sponsorship";
import { sendEncouragement } from "@/lib/api/encouragement";

const FALLBACK_LIBRARY: MessageLibraryItem[] = [
  { id: "f1", text: "Cada día que pasa es una victoria. Estoy orgulloso/a de ti." },
  { id: "f2", text: "Recuerda por qué empezaste este camino. Eres más fuerte de lo que crees." },
  { id: "f3", text: "Hoy puede ser difícil, pero mañana agradecerás haber seguido adelante." },
  { id: "f4", text: "No estás solo/a en esto. Aquí estoy para lo que necesites." },
  { id: "f5", text: "¡Tu valentía me inspira cada día. ¡Sigue adelante!" },
  { id: "f6", text: "Los momentos difíciles son temporales. Tu fortaleza es permanente." },
  { id: "f7", text: "Un paso a la vez. Hoy es suficiente con seguir." },
  { id: "f8", text: "Me alegra saber que estás trabajando en ti mismo. Eso importa mucho." },
];

export function useMensajes() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [library] = useState<MessageLibraryItem[]>(FALLBACK_LIBRARY);
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);

  // Cargar el ID del ahijado al montar
  useEffect(() => {
    getGodchildProfile()
      .then((data) => {
        setReceiverId(data.godchild.id);
        setError(null);
      })
      .catch(() => {
        setError("No se encontró un ahijado activo. Vincula tu código primero.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed || !receiverId || isSending) return;

    setIsSending(true);
    try {
      await sendEncouragement(receiverId, trimmed);
      // Añadir a la lista local con ID temporal
      const newMsg: Message = {
        id: `local-${Date.now()}`,
        text: trimmed,
        time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
        fromMe: true,
      };
      setMessages((prev) => [...prev, newMsg]);
      setText("");
    } catch {
      setError("No se pudo enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setIsSending(false);
    }
  }, [text, receiverId, isSending]);

  return {
    messages,
    library,
    text,
    isLoading,
    isSending,
    sendDisabled: !receiverId || isSending,
    error,
    setText,
    handleSend,
  };
}

