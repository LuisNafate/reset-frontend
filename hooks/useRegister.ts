"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/auth";
import { ADDICTION_TYPES } from "@/lib/constants";
import type { AddictionTypeId } from "@/types";

interface RegisterFormStep1 {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<"user" | "companion">("user");
  const [form, setForm] = useState<RegisterFormStep1>({ name: "", email: "", password: "", confirmPassword: "" });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [selectedAddiction, setSelectedAddiction] = useState<AddictionTypeId | "">("");
  const [otherDescription, setOtherDescription] = useState("");
  const [addictionClassification, setAddictionClassification] = useState<"conductual" | "sustancia" | "">("")
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setProfilePhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePhotoPreview(ev.target?.result as string ?? null);
      reader.readAsDataURL(file);
    } else {
      setProfilePhotoPreview(null);
    }
  };

  const handleNextStep = () => {
    if (!form.name.trim()) {
      setError('Ingresa tu nombre completo.');
      return;
    }
    if (!form.email.trim()) {
      setError('Ingresa tu correo electrónico.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('El correo electrónico no tiene un formato válido.');
      return;
    }
    if (!form.password) {
      setError('Elige una contraseña.');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
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
      if (selectedAddiction === "otros" && !addictionClassification) {
        setError("Indica si tu adicción es conductual o de sustancia.");
        return;
      }
    }
    setIsLoading(true);
    setError(null);
    try {
      // Determinar el nombre legible de la adicción para el backend
      const addictionLabel =
        selectedAddiction === "otros"
          ? otherDescription.trim()
          : ADDICTION_TYPES.find((a) => a.id === selectedAddiction)?.label ?? selectedAddiction;

      // Mapear clasificación al formato del contrato
      const classificationLabel =
        addictionClassification === "conductual"
          ? "Conductual"
          : addictionClassification === "sustancia"
          ? "Sustancias"
          : undefined;

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: role === "companion" ? "PADRINO" : "ADICTO",
        ...(role === "user" && addictionLabel ? { addictionName: addictionLabel } : {}),
        ...(role === "user" && classificationLabel ? { classification: classificationLabel } : {}),
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
    addictionClassification,
    isLoading,
    error,
    setStep,
    setRole,
    setSelectedAddiction,
    setOtherDescription,
    setAddictionClassification,
    showConfirmPassword,
    setShowConfirmPassword,
    profilePhoto,
    profilePhotoPreview,
    handlePhotoChange,
    handleChange,
    handleNextStep,
    handleSubmit,
  };
}

