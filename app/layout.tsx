import type { Metadata, Viewport } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
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
    <html lang="es" className={`${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          <CapacitorProvider>
            {children}
          </CapacitorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
