"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/auth";
import type { AddictionTypeId } from "@/types";

interface RegisterFormStep1 {
  name: string;
  email: string;
  password: string;
}

export function useRegister() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<"user" | "companion">("user");
  const [form, setForm] = useState<RegisterFormStep1>({ name: "", email: "", password: "" });
  const [selectedAddiction, setSelectedAddiction] = useState<AddictionTypeId | "">("");
  const [otherDescription, setOtherDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleNextStep = () => {
    if (!form.name || !form.email || !form.password) {
      setError("Completa todos los campos antes de continuar.");
      return;
    }
    setStep(2);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Completa todos los campos de cuenta.");
      return;
    }
    if (role === "user") {
      if (!selectedAddiction) {
        setError("Selecciona un tipo de adicción.");
        return;
      }
      if (selectedAddiction === "otros" && !otherDescription.trim()) {
        setError("Describe tu situación en el campo de texto.");
        return;
      }
    }
    setIsLoading(true);
    setError(null);
    try {
      const apiRole = role === "companion" ? "PADRINO" : "ADICTO";
      const addictionName =
        role === "companion"
          ? undefined
          : selectedAddiction === "otros"
          ? otherDescription
          : selectedAddiction;

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: apiRole,
        addictionName,
        classification: role === "user" ? "Sustancia" : undefined,
      });
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    role,
    form,
    selectedAddiction,
    otherDescription,
    isLoading,
    error,
    setStep,
    setRole,
    setSelectedAddiction,
    setOtherDescription,
    handleChange,
    handleNextStep,
    handleSubmit,
  };
}
