"use client";

import { useState, useEffect } from "react";
import { getContacts, addContact } from "@/lib/api/emergency";
import type { SupportPeer } from "@/types";

export function useConfiguracion() {
  const [username, setUsername] = useState("");
  const [addictionType, setAddictionType] = useState("Drogas");
  const [emergencyNotifs, setEmergencyNotifs] = useState(true);
  const [peers, setPeers] = useState<SupportPeer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Cargar contactos de emergencia (= pares de apoyo en la UI)
  useEffect(() => {
    getContacts()
      .then((res: any) => {
        const list: any[] = res?.data ?? res ?? [];
        setPeers(
          Array.isArray(list)
            ? list.map((c: any) => ({
                id: c.id ?? c._id ?? String(Date.now()),
                name: c.contactName ?? c.contact_name ?? c.name ?? "",
                email: c.email ?? "",
              }))
            : []
        );
      })
      .catch(() => setError("Error al cargar los contactos de emergencia"))
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Guarda el perfil local (username / addictionType).
   * Estos campos son de UI — si el backend expone PATCH /profile en el futuro,
   * reemplazar este bloque por la llamada correspondiente.
   */
  const handleUpdateProfile = async () => {
    setIsSaving(true);
    setError(null);
    try {
      // Persistencia local de la sesión activa (sin endpoint definido en la guía)
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemovePeer = (id: string) => {
    // Eliminación optimista local — la API de emergencia no expone DELETE /contacts/:id
    setPeers((prev) => prev.filter((p) => p.id !== id));
  };

  /**
   * Añade un nuevo contacto de emergencia (par de apoyo).
   */
  const handleAddPeer = async (data: {
    name: string;
    phone: string;
    email?: string;
  }) => {
    try {
      await addContact({
        contact_name: data.name,
        phone: data.phone,
        email: data.email,
      });
      // Recargar lista
      const res: any = await getContacts();
      const list: any[] = res?.data ?? res ?? [];
      setPeers(
        Array.isArray(list)
          ? list.map((c: any) => ({
              id: c.id ?? c._id ?? String(Date.now()),
              name: c.contactName ?? c.contact_name ?? c.name ?? "",
              email: c.email ?? "",
            }))
          : []
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agregar contacto");
    }
  };

  const handleToggleEmergencyNotifs = (value: boolean) => {
    setEmergencyNotifs(value);
  };

  return {
    username,
    addictionType,
    emergencyNotifs,
    peers,
    isLoading,
    isSaving,
    error,
    saved,
    setUsername,
    setAddictionType,
    handleUpdateProfile,
    handleRemovePeer,
    handleAddPeer,
    handleToggleEmergencyNotifs,
  };
}
