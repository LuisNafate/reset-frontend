"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { reactivate } from "@/lib/api/auth";

export default function ReactivatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await reactivate({ email, password });
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err?.message || "Error al reactivar la cuenta. Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden safe-top-padding login-bg text-white">
        <div className="relative z-10 w-full max-w-105 px-4 py-8 animate-fade-in-up">
          <div className="rounded-2xl overflow-hidden login-card p-10 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500/20 text-green-400 border border-green-500/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-2xl italic font-playfair mb-4">¡Bienvenido de vuelta!</h2>
            <p className="text-[13px] font-jetbrains rs-text-muted mb-6">
              Tu cuenta ha sido reactivada con éxito. Serás redirigido al inicio de sesión en unos segundos...
            </p>
            <Link href="/login" className="text-sky-400 font-jetbrains text-[11px] uppercase tracking-widest hover:underline">
              Ir al login ahora →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden safe-top-padding login-bg text-white">
      <div className="relative z-10 w-full max-w-105 px-4 py-8 animate-fade-in-up">
        <div className="rounded-2xl overflow-hidden login-card">
          <div
            aria-hidden="true"
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent 0%, #7dd3fc 35%, #0ea5e9 50%, #7dd3fc 65%, transparent 100%)",
            }}
          />
          <form onSubmit={handleSubmit} className="px-6 py-10 sm:px-9">
            <h1 className="text-[32px] font-normal font-playfair leading-tight mb-2">Reactivar Cuenta</h1>
            <p className="text-[13px] rs-text-muted font-jetbrains mb-8">
              Ingresa tus credenciales para recuperar tu progreso y volver a ReSet.
            </p>

            <div className="flex flex-col gap-5 mb-8">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[1.5px] uppercase text-muted font-jetbrains">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="font-jetbrains input-line w-full border-0 border-b bg-transparent py-2 min-h-11 outline-none focus:border-sky-400 transition-colors text-[14px]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[1.5px] uppercase text-muted font-jetbrains">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="font-jetbrains input-line w-full border-0 border-b bg-transparent py-2 min-h-11 outline-none focus:border-sky-400 transition-colors text-[14px]"
                />
              </div>
            </div>

            {error && (
              <p className="text-[11px] text-red-400 mb-6 font-jetbrains">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="futuristic-btn w-full h-13 text-white rounded-xl flex items-center justify-center gap-3 font-jetbrains disabled:opacity-50"
              style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase" }}
            >
              {isLoading ? "Procesando..." : "Reactivar Mi Cuenta"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="mt-8 text-center">
              <Link href="/login" className="text-[11px] rs-text-muted font-jetbrains uppercase tracking-widest hover:text-white transition-colors">
                ¿Recordaste tu cuenta? Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
