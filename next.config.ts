import type { NextConfig } from "next";

/**
 * next.config.ts
 * ────────────────────────────────────────────────────────────────────────────
 * `output: 'export'` genera la carpeta `out/` con HTML/CSS/JS estáticos —
 * es el artefacto que Capacitor empaqueta en el WebView nativo.
 *
 * Restricciones que acepta `output: 'export'`:
 *  ✓ Páginas 100% "use client"  (todas las páginas de esta app)
 *  ✓ next/font/google            (fonts se descargan en build-time)
 *  ✓ next/link + useRouter       (navegación client-side)
 *  ✗ API Routes                  (no usadas en este proyecto)
 *  ✗ Server Actions              (no usadas en este proyecto)
 *  ✗ next/image con optimización (no usada — images.unoptimized: true)
 */
const nextConfig: NextConfig = {
  // Exportación estática: genera `out/` para Capacitor
  output: "export",

  // Genera /ruta/index.html en lugar de /ruta.html
  // Requerido para que el router de archivo de Capacitor encuentre las páginas
  trailingSlash: true,

  // next/image con export estático requiere modo sin optimización
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
