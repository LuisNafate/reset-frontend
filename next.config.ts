import type { NextConfig } from "next";

/**
 * next.config.ts
 * ────────────────────────────────────────────────────────────────────────────
 * Para el deploy web (next start) NO se usa output:export.
 * Para Capacitor se usa el script `build:mobile` que define CAPACITOR=1,
 * lo que activa output:export y genera la carpeta `out/` estática.
 */
const isCapacitor = process.env.CAPACITOR === "1";

const nextConfig: NextConfig = {
  // Solo activo para build de Capacitor (CAPACITOR=1 next build)
  ...(isCapacitor && {
    output: "export",
    // Genera /ruta/index.html — requerido para el router de Capacitor
    trailingSlash: true,
  }),

  // next/image en modo export requiere sin optimización
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
