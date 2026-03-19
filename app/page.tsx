"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { isNativePlatform } from "@/lib/platform";

/* ─── Smooth Scroll (lento y fluido) ────────────────────────────────────── */
function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const navH = 60;
  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + window.scrollY - navH;
  const duration = 1200;
  const t0 = performance.now();
  // easeInOutCubic
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const animate = (now: number) => {
    const p = Math.min((now - t0) / duration, 1);
    window.scrollTo(0, start + (target - start) * ease(p));
    if (p < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

/* ─────────────────────────────────────────────────────────────────────────────
   SVG Icons (inline, sin librerías externas)
───────────────────────────────────────────────────────────────────────────── */
function IconJournal() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="16" height="22" rx="2" stroke="#0d9488" strokeWidth="1.5" fill="none" />
      <line x1="9" y1="9" x2="19" y2="9" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="13" x2="19" y2="13" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="17" x2="14" y2="17" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconNetwork() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="3.5" stroke="#0ea5e9" strokeWidth="1.5" />
      <circle cx="5" cy="10" r="2.5" stroke="#0ea5e9" strokeWidth="1.5" />
      <circle cx="23" cy="10" r="2.5" stroke="#0ea5e9" strokeWidth="1.5" />
      <circle cx="5" cy="20" r="2.5" stroke="#0ea5e9" strokeWidth="1.5" />
      <circle cx="23" cy="20" r="2.5" stroke="#0ea5e9" strokeWidth="1.5" />
      <line x1="10.5" y1="12.5" x2="7" y2="11.5" stroke="#0ea5e9" strokeWidth="1" />
      <line x1="17.5" y1="12.5" x2="21" y2="11.5" stroke="#0ea5e9" strokeWidth="1" />
      <line x1="10.5" y1="15.5" x2="7" y2="18.5" stroke="#0ea5e9" strokeWidth="1" />
      <line x1="17.5" y1="15.5" x2="21" y2="18.5" stroke="#0ea5e9" strokeWidth="1" />
    </svg>
  );
}

function IconCommunity() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3.5" stroke="#1a365d" strokeWidth="1.5" />
      <circle cx="19" cy="10" r="3.5" stroke="#1a365d" strokeWidth="1.5" />
      <path d="M4 22c0-3.314 2.686-5.5 6-5.5s6 2.186 6 5.5" stroke="#1a365d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 22c0-3.314 1.686-5.5 6-5.5" stroke="#1a365d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7.25" stroke="#0d9488" strokeWidth="1.5" />
      <polyline points="5,8.5 7,10.5 11,6" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden="true">
      <path d="M1 1.5L7 5L1 8.5V1.5Z" fill="#0f172a" stroke="#0f172a" strokeWidth="0.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   App Mockup — Hero decorativo (web + móvil)
───────────────────────────────────────────────────────────────────────────── */
function AppMockup() {
  return (
    <div
      className="relative select-none pointer-events-none w-full max-w-[560px]"
      aria-hidden="true"
      style={{ paddingBottom: "32px", paddingRight: "72px" }}
    >
      {/* ── Ventana web (principal) ── */}
      <div
        className="landing-hero-mockup relative bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_30px_60px_-30px_rgba(0,0,0,0.15)]"
        style={{ aspectRatio: "16/10" }}
      >
        {/* Chrome bar */}
        <div className="flex gap-2 items-center h-8 px-4 bg-[#f8fafc] border-b border-[#e2e8f0]">
          <span className="size-2.5 rounded-full bg-[#fca5a5]" />
          <span className="size-2.5 rounded-full bg-[#fcd34d]" />
          <span className="size-2.5 rounded-full bg-[#6ee7b7]" />
          <span className="flex-1 text-center font-jetbrains text-[11px] text-[#94a3b8]">
            reset-app.tech/dashboard
          </span>
        </div>
        {/* Layout */}
        <div className="flex gap-4 p-5 h-[calc(100%-32px)]">
          {/* Sidebar */}
          <div className="flex flex-col gap-3 w-[90px] shrink-0">
            <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded h-[66px]" />
            <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded flex-1" />
          </div>
          {/* Main content */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-jetbrains text-[11px] text-[#0d9488] tracking-widest uppercase leading-none mb-1">
                  Mi Espacio ReSet
                </p>
                <p className="font-playfair text-[18px] text-[#0f172a] italic leading-none">
                  Tu momento de ReSet
                </p>
              </div>
              <div className="size-8 rounded-full bg-[#f1f5f9]" />
            </div>
            {/* Planta card */}
            <div className="flex-1 bg-[#f8fafc] border border-[#f1f5f9] rounded flex items-center justify-center relative overflow-hidden">
              <svg width="60" height="64" viewBox="0 0 56 60" fill="none" className="opacity-80">
                <path d="M28 52 Q28 36 28 24" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
                <path d="M28 36 Q20 30 16 22 Q24 22 28 32" fill="#0d9488" opacity="0.6" />
                <path d="M28 32 Q36 26 40 18 Q32 20 28 30" fill="#0d9488" opacity="0.6" />
                <path d="M28 42 Q22 38 18 32" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                <ellipse cx="28" cy="54" rx="10" ry="3" fill="#e2e8f0" />
              </svg>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="font-jetbrains text-[11px] text-[#64748b]">PROGRESO: 84%</span>
                <div className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-[#0d9488]" />
                  <span className="size-1.5 rounded-full bg-[#0d9488]" />
                  <span className="size-1.5 rounded-full bg-[#e2e8f0]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Teléfono móvil (secundario, superpuesto abajo-derecha) ── */}
      <div
        className="landing-hero-mockup-mobile absolute right-0 bottom-0 bg-white border border-[#e2e8f0] rounded-[18px] overflow-hidden shadow-[0_20px_48px_-8px_rgba(0,0,0,0.18)]"
        style={{ width: "88px", aspectRatio: "9/19" }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-2 pb-1 bg-[#f8fafc] border-b border-[#f1f5f9]">
          <div className="w-[28px] h-[5px] bg-[#e2e8f0] rounded-full" />
        </div>
        {/* Screen */}
        <div className="flex flex-col gap-1.5 p-2 bg-white h-[calc(100%-24px)]">
          <div className="flex items-center gap-1 mb-0.5">
            <div className="size-4 rounded-full bg-[#f1f5f9] shrink-0" />
            <div className="flex flex-col gap-0.5 flex-1">
              <div className="h-1.5 w-full bg-[#f1f5f9] rounded" />
              <div className="h-1.5 w-2/3 bg-[#f1f5f9] rounded" />
            </div>
          </div>
          <div className="flex-1 bg-[#f8fafc] border border-[#f1f5f9] rounded-md flex flex-col items-center justify-center gap-1">
            <svg width="18" height="20" viewBox="0 0 56 60" fill="none">
              <path d="M28 52 Q28 36 28 24" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
              <path d="M28 36 Q20 30 16 22 Q24 22 28 32" fill="#0d9488" opacity="0.7" />
              <path d="M28 32 Q36 26 40 18 Q32 20 28 30" fill="#0d9488" opacity="0.7" />
              <ellipse cx="28" cy="54" rx="10" ry="3" fill="#e2e8f0" />
            </svg>
            <div className="h-1 w-8 bg-[#0d9488] rounded opacity-60" />
          </div>
          <div className="flex gap-1">
            <div className="flex-1 h-[18px] bg-[#f8fafc] border border-[#f1f5f9] rounded" />
            <div className="flex-1 h-[18px] bg-[#f8fafc] border border-[#f1f5f9] rounded" />
          </div>
          {/* Bottom nav */}
          <div className="flex justify-around pt-1 border-t border-[#f1f5f9]">
            {["#0d9488", "#cbd5e1", "#cbd5e1"].map((c, i) => (
              <div key={i} className="size-2 rounded-sm" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Badge flotante — días ── */}
      <div className="landing-hero-badge absolute -bottom-2 left-0 bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.1)] flex items-center gap-3">
        <div className="flex flex-col items-center">
          <span className="font-playfair text-2xl text-[#0f172a] leading-none">47</span>
          <span className="font-jetbrains text-[11px] text-[#94a3b8] tracking-widest uppercase mt-0.5">días</span>
        </div>
        <div className="w-px h-8 bg-[#e2e8f0]" />
        <div>
          <p className="font-jetbrains text-[11px] text-[#0d9488] tracking-widest uppercase leading-none mb-0.5">
            Calma Ra...
          </p>
          <p className="font-jetbrains text-[11px] text-[#64748b] leading-none">Planta Joven</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Community Mockup
───────────────────────────────────────────────────────────────────────────── */
function CommunityMockup() {
  return (
    <div
      className="reveal-left bg-white border border-[#e2e8f0] rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)] w-full max-w-[460px] select-none pointer-events-none"
      aria-hidden="true"
    >
      <div className="p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#f8fafc] mb-6">
          <h4 className="font-playfair text-[20px] text-[#0f172a]">Comunidad ReSet</h4>
          <span className="font-jetbrains text-[11px] text-[#94a3b8]">En línea: 1,402</span>
        </div>
        {/* Mensaje */}
        <div className="flex gap-4 mb-6">
          <div className="size-10 rounded-full bg-[#f1f5f9] shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-[12px] text-[#0f172a]" style={{ fontFamily: "Inter, sans-serif" }}>
                Anónimo_08
              </span>
              <span className="font-jetbrains text-[11px] text-[#cbd5e1]">Hace 12m</span>
            </div>
            <p className="text-[14px] text-[#64748b] leading-[1.625]" style={{ fontFamily: "Inter, sans-serif" }}>
              Hoy cumplo mi primer mes. ReSet ha sido mi mayor apoyo en los momentos más difíciles.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-jetbrains text-[11px] text-[#0d9488]">❤ 24</span>
              <span className="font-jetbrains text-[11px] text-[#94a3b8]">💬 8</span>
            </div>
          </div>
        </div>
        {/* Input reply mockup */}
        <div className="flex gap-4 bg-[rgba(248,250,252,0.3)] border-l-2 border-[#0d9488] pl-4 pr-4 py-4">
          <div className="size-10 rounded-full bg-[#f1f5f9] shrink-0" />
          <div className="flex-1">
            <div className="h-3 w-24 bg-[#e2e8f0] rounded mb-2" />
            <div className="h-10 w-full bg-white border border-[#f1f5f9] rounded mb-2" />
            <div className="flex justify-end">
              <div className="h-6 w-20 bg-[#0f172a] rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hook: Reveal on Scroll (Intersection Observer)
───────────────────────────────────────────────────────────────────────────── */
function useRevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────────────────────────────────────
   Navbar (con sidebar mobile)
───────────────────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Pilares",       href: "#pilares" },
  { label: "Herramientas", href: "#herramientas" },
  { label: "Móvil",        href: "#movil" },
  { label: "Comunidad",    href: "#comunidad" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#f1f5f9] safe-top-bar">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[60px] flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="ReSet logo"
              width={32}
              height={32}
              className="rounded-sm"
              priority
            />
            <span className="font-playfair italic text-[22px] text-[#0f172a] tracking-tight">
              ReSet
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNav(e, href)}
                className="nav-link font-jetbrains text-[11px] uppercase tracking-[1.5px] text-[#64748b] hover:text-[#0f172a] transition-colors cursor-pointer"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="landing-btn-primary font-jetbrains text-[11px] uppercase tracking-[1.5px] px-5 py-2.5 rounded-sm"
            >
              Entrar
            </Link>
            {/* Hamburger — solo mobile */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 ml-1"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
            >
              <span className="block w-5 h-[1.5px] bg-[#64748b] rounded-full transition-all" />
              <span className="block w-5 h-[1.5px] bg-[#64748b] rounded-full transition-all" />
              <span className="block w-3 h-[1.5px] bg-[#64748b] rounded-full transition-all" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className="md:hidden fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-400"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />

      {/* Sidebar drawer */}
      <aside
        className="md:hidden fixed top-0 right-0 h-full w-72 z-[70] bg-white shadow-2xl flex flex-col"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
        aria-label="Menú de navegación"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 h-[60px] border-b border-[#f1f5f9] shrink-0">
          <span className="font-playfair italic text-[20px] text-[#0f172a]">ReSet</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="text-[#94a3b8] hover:text-[#0f172a] transition-colors p-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col flex-1 py-4 px-4 overflow-y-auto">
          {NAV_ITEMS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNav(e, href)}
              className="flex items-center justify-between px-2 py-4 border-b border-[#f8fafc] font-jetbrains text-[12px] uppercase tracking-[2px] text-[#0f172a] hover:text-[#0d9488] hover:pl-4 transition-all cursor-pointer"
              style={{
                transitionDuration: "0.3s",
                transitionDelay: open ? `${i * 60}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(16px)",
              }}
            >
              {label}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-6 py-6 border-t border-[#f1f5f9] shrink-0">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="landing-btn-primary font-jetbrains text-[11px] uppercase tracking-[1.5px] py-3.5 rounded-sm w-full flex items-center justify-center gap-2"
          >
            Entrar a ReSet
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="font-jetbrains text-[11px] uppercase tracking-[1px] text-[#94a3b8] text-center mt-3">
            cada paso, un día a la paz.
          </p>
        </div>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Back To Top Button
───────────────────────────────────────────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      setVisible(scrolled > total * 0.72);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 1400;
    const t0 = performance.now();
    // easeOutQuart — desacelera suavemente al llegar al top
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const animate = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      window.scrollTo(0, start * (1 - ease(p)));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver al inicio de la página"
      className="fixed bottom-8 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
      style={{
        background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
        boxShadow: "0 4px 18px rgba(13,148,136,0.35)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
        <path d="M4.5 15.75l7.5-7.5 7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      className="min-h-screen pt-[calc(60px+var(--safe-inset-top))] flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 100% 0%, rgba(241,245,249,1) 0%, rgba(255,255,255,1) 60%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12 sm:py-24 flex items-center gap-16 w-full">
        {/* Copy */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <p className="landing-hero-label font-jetbrains text-[12px] uppercase tracking-[5px] text-[#0d9488]">
            — Tu espacio de acompañamiento
          </p>
          <h1 className="landing-hero-h1 font-playfair text-[clamp(48px,8vw,108px)] leading-[1] text-[#0f172a]">
            Tu momento
            <br />
            <em>de ReSet</em>
          </h1>
          <p
            className="landing-hero-desc text-[20px] text-[#64748b] leading-[1.65] max-w-[460px]"
            style={{ fontWeight: 300, fontFamily: "Inter, sans-serif" }}
          >
            ReSet es tu espacio digital de apoyo para el proceso de recuperación. Un lugar tranquilo para registrar tu avance, mantener el contacto con tu red y acceder a herramientas pensadas para cada etapa del camino.
          </p>
          <div className="landing-hero-ctas flex flex-wrap items-center gap-5 pt-2">
            <Link
              href="/login"
              className="landing-btn-primary font-jetbrains text-[12px] uppercase tracking-[1.2px] px-8 py-4 rounded-sm inline-flex items-center gap-2"
            >
              Comenzar mi ReSet
            </Link>
            <Link
              href="/register"
              className="landing-btn-ghost font-jetbrains text-[12px] uppercase tracking-[1.2px] inline-flex items-center gap-3 group"
            >
              <span className="size-10 rounded-full border border-[#e2e8f0] flex items-center justify-center group-hover:border-[#0d9488] transition-colors">
                <IconPlay />
              </span>
              <span>Crear cuenta</span>
            </Link>
          </div>
          {/* Indicador multiplataforma */}
          <div className="landing-hero-ctas flex items-center gap-3 pt-1">
            <span className="font-jetbrains text-[11px] text-[#94a3b8] uppercase tracking-[2px]">
              Disponible en web y móvil
            </span>
            <a
              href="#movil"
              className="font-jetbrains text-[11px] uppercase tracking-[2px] text-[#0d9488] border-b border-[#0d9488] pb-px hover:opacity-70 transition-opacity"
            >
              Ver más →
            </a>
          </div>
        </div>

        {/* Mockup visual */}
        <div className="hidden lg:flex flex-1 justify-end items-center min-w-0">
          <AppMockup />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Pilares Section
───────────────────────────────────────────────────────────────────────────── */
function PilaresSection() {
  const pillars = [
    {
      icon: <IconJournal />,
      accentColor: "#0d9488",
      tag: "AUTOREGISTRO DIARIO",
      title: "Bitácora Personal",
      desc: "Un registro introspectivo donde cada pensamiento se convierte en un nutriente de tu jardín. Registra estados de ánimo y pequeños hitos diarios.",
      linkText: "Autoregistro activo →",
    },
    {
      icon: <IconNetwork />,
      accentColor: "#0ea5e9",
      tag: "SEGURIDAD ACTIVA",
      title: "Red de Apoyo",
      desc: "Conexión directa con tus seres queridos. Cuando más los necesitas, tus Pares de Apoyo reciben una notificación y un correo de alerta de tu parte.",
      linkText: "Seguridad activa →",
    },
    {
      icon: <IconCommunity />,
      accentColor: "#1a365d",
      tag: "VÍNCULOS LIBRES",
      title: "Comunidad Segura",
      desc: "Un foro anónimo y moderado donde la empatía todo lo puede. Comparte experiencias y fortalezas con otros en tu misma etapa.",
      linkText: "Vínculos libres →",
    },
  ];

  return (
    <section id="pilares" className="py-16 sm:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-16 reveal">
          <p className="font-jetbrains text-[12px] uppercase tracking-[5px] text-[#0d9488] mb-4">
            — Metodología ReSet
          </p>
          <h2 className="font-playfair text-[clamp(38px,5vw,68px)] text-[#0f172a]">
            Los tres pilares de tu calma
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map(({ icon, accentColor, tag, title, desc, linkText }, i) => (
            <div
              key={title}
              className="reveal feature-card bg-white border border-[#e2e8f0] rounded-sm p-6 sm:p-8 flex flex-col gap-5"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="size-12 rounded-full flex items-center justify-center"
                style={{ background: `${accentColor}14` }}
              >
                {icon}
              </div>
              <div>
                <p
                  className="font-jetbrains text-[11px] uppercase tracking-[3px] mb-3"
                  style={{ color: accentColor }}
                >
                  {tag}
                </p>
                <h3 className="font-playfair text-[22px] text-[#0f172a] mb-3 italic">{title}</h3>
                <p
                  className="text-[14px] text-[#64748b] leading-[1.65]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {desc}
                </p>
              </div>
              <a
                href="/login"
                className="mt-auto font-jetbrains text-[11px] uppercase tracking-[2px] border-b border-current pb-1 inline-block transition-colors hover:opacity-70"
                style={{ color: accentColor, width: "fit-content" }}
              >
                {linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ReSet — Kit de herramientas
───────────────────────────────────────────────────────────────────────────── */
function HerbarioSection() {
  const tools = [
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <line x1="18" y1="32" x2="18" y2="14" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 24 Q12 20 9 13 Q17 13 18 22" fill="#0d9488" opacity="0.75" />
          <path d="M18 20 Q24 16 27 9 Q19 11 18 20" fill="#0d9488" opacity="0.75" />
          <ellipse cx="18" cy="33" rx="7" ry="2.5" fill="#1e293b" />
        </svg>
      ),
      title: "Racha de hábitos",
      desc: "Cada día que eliges avanzar queda grabado en tu jardín. Tu planta crece con cada jornada de compromiso contigo mismo.",
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="14" r="8" stroke="#0ea5e9" strokeWidth="1.8" fill="none" />
          <path d="M15 11 Q18 8 21 11 Q22 13 18 16 Q14 13 15 11Z" fill="#0ea5e9" opacity="0.5" />
          <line x1="18" y1="22" x2="18" y2="26" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="26" x2="22" y2="26" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: "Técnicas de acompañamiento",
      desc: "Recursos diferenciados según tu rol: técnicas de autoregistro y manejo de cravings si estás en recuperación, o guías de acompañamiento si eres padrino o apoyo de alguien.",
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <rect x="7" y="5" width="20" height="26" rx="2" stroke="#f1c40f" strokeWidth="1.8" fill="none" />
          <line x1="12" y1="13" x2="24" y2="13" stroke="#f1c40f" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="18" x2="24" y2="18" stroke="#f1c40f" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="23" x2="18" y2="23" stroke="#f1c40f" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="7" cy="13" r="3" fill="#f1c40f" opacity="0.5" />
          <circle cx="7" cy="18" r="3" fill="#f1c40f" opacity="0.5" />
        </svg>
      ),
      title: "Bitácora de estados",
      desc: "Escribe lo que sientes cuando lo sientes: estado de ánimo, nivel de craving, reflexiones cortas. Un espejo honesto sin juicio.",
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="4" stroke="#a78bfa" strokeWidth="1.8" fill="none" />
          <circle cx="7" cy="10" r="3" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
          <circle cx="29" cy="10" r="3" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
          <circle cx="7" cy="26" r="3" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
          <circle cx="29" cy="26" r="3" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
          <line x1="14.5" y1="16" x2="10" y2="12" stroke="#a78bfa" strokeWidth="1" opacity="0.7" />
          <line x1="21.5" y1="16" x2="27" y2="12" stroke="#a78bfa" strokeWidth="1" opacity="0.7" />
          <line x1="14.5" y1="20" x2="10" y2="24" stroke="#a78bfa" strokeWidth="1" opacity="0.7" />
          <line x1="21.5" y1="20" x2="27" y2="24" stroke="#a78bfa" strokeWidth="1" opacity="0.7" />
        </svg>
      ),
      title: "Red de confianza",
      desc: "Designa personas de tu círculo cercano. Cuando lo necesites, recibirán una notificación y un correo de alerta con un mensaje tuyo.",
    },
  ];

  return (
    <section id="herramientas" className="py-24 bg-[#0f172a] overflow-hidden relative">
      {/* Formas decorativas */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-8 left-12 w-32 h-32 border border-white rounded-full" />
        <div className="absolute bottom-8 right-24 w-48 h-48 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rotate-45" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-16 reveal">
          <p className="font-jetbrains text-[12px] uppercase tracking-[5px] text-[#0d9488] mb-4">
            — Herramientas para cada etapa
          </p>
          <h2 className="font-playfair text-[clamp(38px,5vw,64px)] text-white">
            Tu kit de{" "}
            <em>recuperación</em>
          </h2>
          <p
            className="mt-6 text-[18px] text-[#64748b] max-w-[520px] mx-auto leading-relaxed"
            style={{ fontWeight: 300, fontFamily: "Inter, sans-serif" }}
          >
            Un lugar para respirar, registrar y empezar de nuevo. Cada herramienta en ReSet está pensada para acompañarte, sin prisa y sin juicio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-white/10 reveal">
          {tools.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className={`flex flex-col gap-4 p-5 sm:p-8 ${
                i < 3 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""
              } hover:bg-white/5 transition-colors`}
            >
              <span>{icon}</span>
              <h3 className="font-playfair text-[18px] text-white italic">{title}</h3>
              <p
                className="text-[13px] text-[#64748b] leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Link
            href="/login"
            className="landing-btn-primary font-jetbrains text-[11px] uppercase tracking-[1.5px] px-8 py-4 rounded-sm inline-flex items-center gap-2"
          >
            Acceder a mis herramientas
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Mobile Access Section
───────────────────────────────────────────────────────────────────────────── */
function MobileSection() {
  return (
    <section
      id="movil"
      className="py-12 sm:py-20 bg-white border-y border-[#f1f5f9] overflow-hidden relative"
    >
      {/* Fondo decorativo sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(13,148,136,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

          {/* Ícono de teléfono SVG */}
          <div className="reveal shrink-0 flex items-center justify-center">
            <div className="relative">
              {/* Teléfono grande decorativo */}
              <svg
                width="120"
                height="200"
                viewBox="0 0 120 200"
                fill="none"
                aria-hidden="true"
                className="animate-float"
              >
                <rect x="4" y="4" width="112" height="192" rx="20" fill="white" stroke="#e2e8f0" strokeWidth="2" />
                <rect x="4" y="4" width="112" height="192" rx="20" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                <rect x="12" y="28" width="96" height="144" rx="4" fill="#f8fafc" />
                {/* Planta */}
                <line x1="60" y1="140" x2="60" y2="100" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M60 122 Q50 115 45 105 Q53 104 60 116" fill="#0d9488" opacity="0.7" />
                <path d="M60 116 Q70 109 75 99 Q67 100 60 112" fill="#0d9488" opacity="0.7" />
                <ellipse cx="60" cy="143" rx="12" ry="4" fill="#e2e8f0" />
                {/* Barra de progreso */}
                <rect x="20" y="156" width="80" height="4" rx="2" fill="#e2e8f0" />
                <rect x="20" y="156" width="60" height="4" rx="2" fill="#0d9488" />
                {/* Notch */}
                <rect x="44" y="10" width="32" height="6" rx="3" fill="#e2e8f0" />
                {/* Home indicator */}
                <rect x="48" y="186" width="24" height="3" rx="1.5" fill="#e2e8f0" />
              </svg>
              {/* Pulso animado */}
              <div
                className="absolute inset-[-8px] rounded-[28px] border border-[#0d9488] opacity-20 animate-pulse"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="flex-1 flex flex-col gap-5 reveal-right text-center lg:text-left">
            <p className="font-jetbrains text-[12px] uppercase tracking-[5px] text-[#0d9488]">
              — Acceso multiplataforma
            </p>
            <h2 className="font-playfair text-[clamp(34px,4vw,56px)] text-[#0f172a] leading-tight">
              Lleva tu recuperación
              <br />
              <em>en el bolsillo</em>
            </h2>
            <p
              className="text-[18px] text-[#64748b] leading-relaxed max-w-[480px] mx-auto lg:mx-0"
              style={{ fontWeight: 300, fontFamily: "Inter, sans-serif" }}
            >
              ReSet funciona en cualquier dispositivo: accede a tus herramientas, escribe en tu bitácora o contacta a tu red de apoyo desde el móvil, la tablet o la web, sin instalar nada adicional.
            </p>
            <ul className="flex flex-col gap-3 items-center lg:items-start">
              {[
                "Interfaz optimizada para pantallas táctiles",
                "Notificaciones de racha y recordatorios",
                "Herramientas de calma disponibles cuando más las necesitas",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <IconCheck />
                  <span
                    className="text-[14px] text-[#0f172a]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs móvil */}
            <div className="flex flex-wrap items-center gap-4 pt-2 justify-center lg:justify-start">
              <Link
                href="/download"
                className="landing-btn-primary font-jetbrains text-[12px] uppercase tracking-[1.2px] px-8 py-4 rounded-sm inline-flex items-center gap-3"
              >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="12" height="14" rx="2" stroke="white" strokeWidth="1.5" />
                  <line x1="5" y1="8" x2="7" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="9" y1="8" x2="7" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="7" y1="5" x2="7" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Usar en mi celular
              </Link>
              <Link
                href="/login"
                className="landing-btn-ghost font-jetbrains text-[12px] uppercase tracking-[1.2px] border border-[#e2e8f0] px-8 py-4 rounded-sm hover:border-[#0d9488] transition-colors"
              >
                Entrar desde la web
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Comunidad Section
───────────────────────────────────────────────────────────────────────────── */
function ComunidadSection() {
  return (
    <section
      id="comunidad"
      className="py-16 sm:py-32"
      style={{ background: "rgba(248,250,252,0.5)" }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center gap-10 lg:gap-16 flex-col lg:flex-row">
        {/* Mockup */}
        <div className="flex-1 min-w-0 flex justify-center">
          <CommunityMockup />
        </div>

        {/* Texto */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 reveal-right">
          <p className="font-jetbrains text-[12px] uppercase tracking-[5px] text-[#0d9488]">
            — Espacios de encuentro
          </p>
          <h2 className="font-playfair text-[clamp(40px,5vw,64px)] leading-[1.1] text-[#0f172a]">
            Nunca camines
            <br />
            <em>en soledad</em>
          </h2>
          <p
            className="text-[18px] text-[#64748b] leading-[1.625] pt-2"
            style={{ fontWeight: 300, fontFamily: "Inter, sans-serif" }}
          >
            ReSet crea espacios para que el acompañamiento sea real: foros moderados y grupos de afinidad donde compartir experiencias sin sentirte solo en el proceso.
          </p>
          <ul className="flex flex-col gap-4 py-4">
            {[
              "Moderación activa por profesionales",
              "Identidad anónima protegida",
              "Grupos de afinidad por etapas",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <IconCheck />
                <span
                  className="text-[14px] text-[#0f172a]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/login"
            className="font-jetbrains text-[11px] uppercase tracking-[3px] border-b border-[#0f172a] pb-2 inline-block hover:text-[#0d9488] hover:border-[#0d9488] transition-colors"
            style={{ width: "fit-content" }}
          >
            Unirme a la comunidad
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-white border-t border-[#f1f5f9] pt-12 sm:pt-24 pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <div>
              <p className="font-playfair italic text-[24px] text-[#0f172a] leading-none">ReSet</p>
              <p className="font-jetbrains text-[11px] text-[#94a3b8] tracking-[2px] uppercase mt-1">
                by Hanging Lines
              </p>
            </div>
            <p
              className="text-[14px] text-[#64748b] leading-[1.625] max-w-[280px]"
              style={{ fontWeight: 300, fontFamily: "Inter, sans-serif" }}
            >
              Tecnología humanista para la recuperación. Cultivando espacios de paz y resiliencia en la era digital.
            </p>
            <a
              href="https://reset-app.tech"
              className="font-jetbrains text-[11px] text-[#94a3b8] hover:text-[#0d9488] transition-colors w-fit"
            >
              reset-app.tech
            </a>
            
            {/* Social Icons */}
            <div className="flex gap-3 flex-wrap mt-2 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/resetapp.tech?igsh=MWFyMzYxOXZkM2IxYg=="
                className="size-9 rounded-full border border-[#e2e8f0] text-[#94a3b8] hover:border-[#0d9488] hover:text-[#0d9488] transition-colors flex items-center justify-center"
                aria-label="Síguenos en Instagram"
              >
                <FaInstagram size={18} aria-hidden="true" />
              </a>

              <a
                href="https://www.facebook.com/share/1ED17Hcj2J/"
                className="size-9 rounded-full border border-[#e2e8f0] text-[#94a3b8] hover:border-[#0d9488] hover:text-[#0d9488] transition-colors flex items-center justify-center"
                aria-label="Síguenos en Facebook"
              >
                <FaFacebookF size={18} aria-hidden="true" />
              </a>

              <a
                href="https://www.tiktok.com/@resetapp.tech"
                className="size-9 rounded-full border border-[#e2e8f0] text-[#94a3b8] hover:border-[#0d9488] hover:text-[#0d9488] transition-colors flex items-center justify-center"
                aria-label="Síguenos en TikTok"
              >
                <FaTiktok size={18} aria-hidden="true" />
              </a>

              <a
                href="https://twitter.com/resetapp"
                className="size-9 rounded-full border border-[#e2e8f0] text-[#94a3b8] hover:border-[#0d9488] hover:text-[#0d9488] transition-colors flex items-center justify-center"
                aria-label="Síguenos en X (Twitter)"
              >
                <FaXTwitter size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Producto */}
          <div>
            <h5 className="font-jetbrains text-[11px] uppercase tracking-[1px] text-[#0f172a] mb-6">
              Producto
            </h5>
            <ul className="flex flex-col gap-4">
              {["Herramientas ReSet", "Pares de Apoyo", "Comunidad"].map((item) => (
                <li key={item}>
                  <a
                    href="/login"
                    className="text-[12px] text-[#64748b] hover:text-[#0f172a] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compañía */}
          <div>
            <h5 className="font-jetbrains text-[11px] uppercase tracking-[1px] text-[#0f172a] mb-6">
              Compañía
            </h5>
            <ul className="flex flex-col gap-4">
              {["Nosotros", "Impacto", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[12px] text-[#64748b] hover:text-[#0f172a] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-[#f8fafc] pt-8 sm:pt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-jetbrains text-[11px] uppercase tracking-[1px] text-[#94a3b8]">
            © 2026 Hanging Lines. Todos los derechos reservados.
          </p>
          <div className="flex gap-8">
            <a
              href="/terms"
              className="font-jetbrains text-[11px] uppercase tracking-[1px] text-[#94a3b8] hover:text-[#0f172a] transition-colors"
            >
              Privacidad &amp; Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT PAGE — Landing
───────────────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const router = useRouter();
  useRevealOnScroll();

  // En plataforma nativa (Android/iOS) redirigir al login directamente.
  // En web se muestra la landing page normal sin cambios.
  useEffect(() => {
    if (isNativePlatform()) {
      router.replace("/login");
    }
  }, [router]);

  // Mientras se espera la redirección en móvil, no renderizar nada
  if (typeof window !== "undefined" && isNativePlatform()) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PilaresSection />
        <MobileSection />
        <HerbarioSection />
        <ComunidadSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
