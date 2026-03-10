"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/context/AuthContext";

export function useLogin() {
  const router = useRouter();
  const { saveAuth } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validaciones de cliente antes de llamar a la API
    if (!form.email.trim()) {
      setError('Ingresa tu correo electrónico.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('El correo electrónico no tiene un formato válido.');
      return;
    }
    if (!form.password) {
      setError('Ingresa tu contraseña.');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { accessToken, user } = await login({
        email: form.email,
        password: form.password,
      });
      saveAuth(accessToken, user);
      router.push(user.role === "PADRINO" ? "/acompanante" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Correo o contraseña incorrectos.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    showPassword,
    isLoading,
    error,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}
