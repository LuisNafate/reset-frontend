"use client";

import { useState } from "react";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Ingresa tu correo electrónico.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("El correo electrónico no tiene un formato válido.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implementar cuando el backend tenga endpoint de recuperación.
      // await apiRequest('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
      //
      // Por ahora simulamos el envío con un delay para dar feedback al usuario.
      await new Promise((r) => setTimeout(r, 1000));
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el correo. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return { email, isLoading, error, sent, handleChange, handleSubmit };
}
