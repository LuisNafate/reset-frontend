"use client";

import { useState } from "react";
import type { Message, MessageLibraryItem } from "@/types";

// El módulo de mensajería no está documentado en la API actual.
// Se usa biblioteca local como contenido de muestra.

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
  const [messages] = useState<Message[]>([]);
  const [library] = useState<MessageLibraryItem[]>(FALLBACK_LIBRARY);
  const [text, setText] = useState("");
  const [isSending] = useState(false);
  const [error] = useState<string | null>(
    "El servicio de mensajería no está disponible en la API actual."
  );

  // No-op: endpoint no existe en la API
  const handleSend = async () => { void 0; };

  return {
    messages,
    library,
    text,
    isLoading: false,
    isSending,
    sendDisabled: true,
    error,
    setText,
    handleSend,
  };
}

