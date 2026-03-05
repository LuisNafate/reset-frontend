import type { CapacitorConfig } from "@capacitor/cli";

/**
 * capacitor.config.ts
 * ────────────────────────────────────────────────────────────────────────────
 * Configuración principal de Capacitor.
 *
 * FLUJO DE BUILD:
 *   1. npm run build        → genera `out/` (static export de Next.js)
 *   2. npx cap sync         → copia `out/` al WebView de Android/iOS
 *   3. npx cap open android → abre Android Studio para compilar/probar
 *   4. npx cap open ios     → abre Xcode para compilar/probar
 *
 * IMPORTANTE — API sobre HTTP:
 *   El .env.local apunta a http:// (no https://).
 *   Android 9+ bloquea conexiones en texto claro por defecto.
 *   Ver android/app/src/main/res/xml/network_security_config.xml
 *   y android/app/src/main/AndroidManifest.xml para la excepción.
 *   Antes de enviar a la Play Store, la API DEBE estar en HTTPS.
 */
const config: CapacitorConfig = {
  appId: "tech.resetapp.app",
  appName: "ReSet",

  // Carpeta de salida del `next build` con output:'export'
  webDir: "out",

  server: {
    // En producción, NO descomentar `url`. Dejar vacío para usar los archivos locales.
    // Solo se usa para hot-reload en desarrollo con un servidor Next.js corriendo:
    //   url: "http://192.168.X.X:3000",
    //   cleartext: true,

    // Capacitor usa https:// como esquema incluso para archivos locales —
    // esto evita problemas de CORS y restricciones de cookies en iOS WebKit.
    androidScheme: "https",

    // ⚠️  Solo para desarrollo con servidor local sobre IP:
    // hostname: "localhost",
    // cleartext: true,
  },

  android: {
    // Mantener false en producción.
    // Para probar con una API HTTP local, solo es necesario el
    // network_security_config.xml (no esta bandera global)
    allowMixedContent: false,
    backgroundColor: "#f8fafc",
  },

  ios: {
    // Respeta automáticamente los safe-area-insets del notch y home bar
    contentInset: "automatic",
    backgroundColor: "#f8fafc",
    // Limita el scroll bounce para que la app se sienta nativa
    scrollEnabled: false,
  },

  plugins: {
    SplashScreen: {
      // Sin pantalla de splash por ahora; se puede añadir después
      launchShowDuration: 0,
      backgroundColor: "#f8fafc",
    },
  },
};

export default config;
