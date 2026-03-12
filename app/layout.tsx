import type { Metadata, Viewport } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import CapacitorProvider from "@/components/CapacitorProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReSet — Tu espacio de recuperación",
  description: "Un espacio seguro para sanar, reconectar y florecer en libertad.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/logo.png",
    apple: [
      { url: "/logo.png", type: "image/png", sizes: "180x180" },
    ],
  },
};

/**
 * viewport-fit=cover es OBLIGATORIO para que los safe-area-inset de iOS
 * funcionen correctamente (notch, dynamic island, home bar).
 * Sin esto, env(safe-area-inset-*) devuelve siempre 0.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,   // evita el zoom accidental en inputs (UX móvil)
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        {/*
         * Script anti-flash de tema oscuro.
         * Se ejecuta de forma SÍNCRONA antes de que React hidrate la página,
         * evitando el destello de modo claro cuando el usuario tenía dark mode guardado.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("reset_theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");}catch(e){}`,
          }}
        />
        <ThemeProvider>
          <AuthProvider>
            <CapacitorProvider>
              {children}
            </CapacitorProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
