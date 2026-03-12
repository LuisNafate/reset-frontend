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
    // true = MIXED_CONTENT_ALWAYS_ALLOW en el WebView.
    // Necesario porque el webDir se sirve como https://localhost pero la API
    // es HTTP puro. En producción cambiar la API a HTTPS y poner esto en false.
    allowMixedContent: true,
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
    CapacitorHttp: {
      // Redirige todas las llamadas fetch/XHR a la capa nativa de Android/iOS.
      // Esto elimina los errores CORS porque las peticiones ya no pasan por el
      // WebView — el backend no ve una "Origin" bloqueada, la petición llega
      // como si fuera una llamada nativa directa.
      // CORS solo aplica en el WebView; en la capa nativa no existe esa restricción.
      enabled: true,
    },
    SplashScreen: {
      // Sin pantalla de splash por ahora; se puede añadir después
      launchShowDuration: 0,
      backgroundColor: "#f8fafc",
    },
    StatusBar: {
      // El WebView NO dibuja detrás de la barra de estado del sistema.
      // El contenido comienza debajo de ella → no se necesita safe-area CSS.
      // Con 'overlaysWebView: false' el color de la barra lo controla Android.
      overlaysWebView: false,
      style: "DARK",          // iconos de la barra en color oscuro (app clara)
      backgroundColor: "#e6edf5", // coincide con --surface-main en modo claro
    },
  },
};

export default config;
