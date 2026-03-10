"use client";

import { useState, useEffect } from "react";
import { getGodchildProfile, acceptSponsorship, rejectSponsorship, terminateSponsorship } from "@/lib/api/sponsorship";
import { useAuth } from "@/context/AuthContext";
import type { CompanionProfile, SupportedUser } from "@/types";

export function useMiCuenta() {
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState<CompanionProfile>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    emailAlerts: false,
    smsAlerts: false,
  });
  const [supportedUsers, setSupportedUsers] = useState<SupportedUser[]>([]);
  const [activeSponsorshipId, setActiveSponsorshipId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [sponsorshipActionError, setSponsorshipActionError] = useState<string | null>(null);

  useEffect(() => {
    // Rellenar datos básicos del perfil desde el contexto de auth
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }

    // Solo los PADRINO tienen ahijados. Evitar llamada innecesaria para ADICTO.
    if (user?.role !== 'PADRINO') {
      setIsLoading(false);
      return;
    }

    getGodchildProfile()
      .then((data) => {
        const g = data.godchild;
        setActiveSponsorshipId(data.sponsorship.id);
        setSupportedUsers([
          {
            id: g.id,
            displayName: g.name,
            addictionType: g.addiction?.custom_name ?? '',
            sobrietyDays: data.statistics.dayCounter,
            status: data.sponsorship.status === 'ACTIVE' ? 'Activo' : 'Inactivo',
          },
        ]);
      })
      .catch(() => {
        // Sin ahijado activo — no es un error que el usuario deba ver en esta pantalla
        setSupportedUsers([]);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  const handleChange = (field: keyof CompanionProfile, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const trimmedName = profile.name.trim();
      if (trimmedName) {
        updateUser({ name: trimmedName });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Terminar apadrinamiento activo (desde la cuenta del padrino) ──────────
  const handleTerminateSponsorship = async () => {
    if (!activeSponsorshipId) return;
    setSponsorshipActionError(null);
    try {
      await terminateSponsorship(activeSponsorshipId);
      setActiveSponsorshipId(null);
      setSupportedUsers([]);
    } catch (err) {
      setSponsorshipActionError(err instanceof Error ? err.message : "No se pudo terminar el apadrinamiento.");
    }
  };

  return {
    profile,
    supportedUsers,
    activeSponsorshipId,
    isLoading,
    isSaving,
    error,
    saved,
    sponsorshipActionError,
    handleChange,
    handleSave,
    handleTerminateSponsorship,
  };
}

