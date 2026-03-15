"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getContacts, addContact } from "@/lib/api/emergency";
import { requestSponsorship, terminateSponsorship } from "@/lib/api/sponsorship";
import { useAuth } from "@/context/AuthContext";
import { deleteAccount, relapse, getProfile } from "@/lib/api/auth";
import type { SupportPeer } from "@/types";

// Estado del sponsorship del adicto (PENDING | ACTIVE | NONE)
export type SponsorshipStatus = 'NONE' | 'PENDING' | 'ACTIVE';
export interface SponsorshipState {
  status: SponsorshipStatus;
  sponsorshipId?: string;
}

type ContactApi = {
  id?: string;
  _id?: string;
  contactName?: string;
  contact_name?: string;
  name?: string;
  email?: string;
};

function normalizeContacts(input: unknown): SupportPeer[] {
  const payload = input as { data?: unknown };
  const maybeList = payload?.data ?? input;
  if (!Array.isArray(maybeList)) return [];

  return maybeList.map((raw, index) => {
    const c = raw as ContactApi;
    return {
      id: c.id ?? c._id ?? `contact-${index}-${Date.now()}`,
      // La API puede devolver contactName (camelCase) o contact_name (snake_case)
      name: c.contactName ?? c.contact_name ?? c.name ?? "",
      email: c.email ?? "",
    };
  });
}

export function useConfiguracion() {
  const { user, updateUser, clearAuth } = useAuth();
  const router = useRouter();

  const username = user?.name ?? "";
  const [addictionType, setAddictionType] = useState(user?.addiction?.custom_name ?? "");
  const [emergencyNotifs, setEmergencyNotifs] = useState(true);
  const [peers, setPeers] = useState<SupportPeer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Error exclusivo del formulario de añadir par de apoyo — no contamina el área de perfil. */
  const [peerError, setPeerError] = useState<string | null>(null);

  // ── Sponsorship (solo ADICTO) ────────────────────────────────────────────
  const [sponsorCode, setSponsorCode] = useState("");
  const [sponsorshipState, setSponsorshipState] = useState<SponsorshipState>({ status: 'NONE' });
  const [isSponsorshipLoading, setIsSponsorshipLoading] = useState(false);
  const [sponsorshipError, setSponsorshipError] = useState<string | null>(null);

  // Sincronizar tipo de adicción cuando el usuario se carga desde storage
  useEffect(() => {
    if (user?.addiction?.custom_name) setAddictionType(user.addiction.custom_name);
  }, [user?.addiction?.custom_name]);

  // Sincronizar estado de apadrinamiento con el perfil del usuario
  useEffect(() => {
    if (user?.sponsor) {
      // Mapear el status del backend (que ahora devolvemos si es ACTIVE o PENDING)
      const apiStatus = (user.sponsor as { status?: SponsorshipStatus }).status ?? 'ACTIVE';
      setSponsorshipState({
        status: apiStatus as SponsorshipStatus,
        sponsorshipId: user.sponsor.sponsorshipId,
      });
      // Si el estado es PENDING o ACTIVE, podemos inferir el código o simplemente vaciar el input
      if (apiStatus === 'PENDING' || apiStatus === 'ACTIVE') {
        setSponsorCode("");
      }
    } else {
      setSponsorshipState((prev) => (prev.status === 'ACTIVE' || prev.status === 'PENDING' ? { status: 'NONE' } : prev));
    }
  }, [user?.sponsor]);

  // Cargar contactos de emergencia (= pares de apoyo en la UI)
  useEffect(() => {
    getContacts()
      .then((res: unknown) => {
        setPeers(normalizeContacts(res));
      })
      .catch(() => setError("Error al cargar los contactos de emergencia"))
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Añade un nuevo contacto de emergencia (par de apoyo).
   * Devuelve true si tuvo éxito, false si falló (para que la página decida si cerrar el form).
   */
  const handleAddPeer = async (data: {
    contactName: string;
    relationship: string;
    email?: string;
  }): Promise<boolean> => {
    setPeerError(null);
    try {
      await addContact({
        contactName: data.contactName,
        relationship: data.relationship,
        email: data.email,
        priorityOrder: 1,
      });
      // Recargar lista
      const res: unknown = await getContacts();
      setPeers(normalizeContacts(res));
      return true;
    } catch (err) {
      setPeerError(err instanceof Error ? err.message : 'No se pudo agregar el contacto. Intenta de nuevo.');
      return false;
    }
  };

  const handleToggleEmergencyNotifs = (value: boolean) => {
    setEmergencyNotifs(value);
  };

  // ── Solicitar apadrinamiento (ADICTO) ─────────────────────────────────────
  const handleRequestSponsorship = async () => {
    const code = sponsorCode.trim();
    if (!code) {
      setSponsorshipError("Ingresa el código de tu padrino.");
      return;
    }
    setIsSponsorshipLoading(true);
    setSponsorshipError(null);
    try {
      const res = await requestSponsorship(code);
      setSponsorshipState({
        status: 'PENDING',
        sponsorshipId: res.sponsorship?.id,
      });
      setSponsorCode("");
    } catch (err) {
      setSponsorshipError(err instanceof Error ? err.message : "No se pudo enviar la solicitud.");
    } finally {
      setIsSponsorshipLoading(false);
    }
  };

  // ── Terminar apadrinamiento activo ────────────────────────────────────────
  const handleTerminateSponsorship = async () => {
    if (!sponsorshipState.sponsorshipId) return;
    setIsSponsorshipLoading(true);
    setSponsorshipError(null);
    try {
      await terminateSponsorship(sponsorshipState.sponsorshipId);
      setSponsorshipState({ status: 'NONE' });
    } catch (err) {
      setSponsorshipError(err instanceof Error ? err.message : "No se pudo terminar el apadrinamiento.");
    } finally {
      setIsSponsorshipLoading(false);
    }
  };

  // ── Borrado de cuenta ──────────────────────────────────────────────────
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      clearAuth();
      router.push("/login?deleted=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo borrar la cuenta.");
      setIsDeleting(false);
    }
  };

  // ── Relapso (PADRINO vuelve a ser ADICTO) ───────────────────────────────
  const handleRelapse = async (addictionName: string, classification?: string) => {
    setIsSaving(true);
    setError(null);
    try {
      await relapse(addictionName, classification);
      // Refrescar perfil completo para cambiar de modo PADRINO -> ADICTO
      const freshProfile = await getProfile();
      updateUser(freshProfile);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar el relapso");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    username,
    addictionType,
    emergencyNotifs,
    peers,
    isLoading,
    isSaving,
    isDeleting,
    error,
    /** Error exclusivo del formulario de añadir contacto. */
    peerError,
    // Sponsorship
    sponsorCode,
    setSponsorCode,
    sponsorshipState,
    isSponsorshipLoading,
    sponsorshipError,
    handleRequestSponsorship,
    handleTerminateSponsorship,
    handleDeleteAccount,
    handleAddPeer,
    handleToggleEmergencyNotifs,
    handleRelapse,
  };
}
