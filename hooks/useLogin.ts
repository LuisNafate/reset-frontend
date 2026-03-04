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
    setIsLoading(true);
    setError(null);
    try {
      const { accessToken, user } = await login({
        email: form.email,
        password: form.password,
      });
      saveAuth(accessToken, user);
      // Redirigir según rol del backend
      router.push(user.role === "PADRINO" ? "/acompanante" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Credenciales incorrectas");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (role: "user" | "companion") => {
    setForm(
      role === "companion"
        ? { email: "padrino@correo.com", password: "demo1234" }
        : { email: "alex@correo.com", password: "demo1234" }
    );
    setError(null);
  };

  return {
    form,
    showPassword,
    isLoading,
    error,
    setShowPassword,
    handleChange,
    handleSubmit,
    fillDemo,
  };
}
