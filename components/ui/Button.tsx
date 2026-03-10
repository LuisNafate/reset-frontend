"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "blue";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

const variants: Record<string, string> = {
  primary:
    "bg-[#1e293b] hover:bg-slate-700 dark:bg-slate-200 dark:hover:bg-white dark:text-slate-900 text-white shadow-[0px_10px_15px_-3px_rgba(30,41,59,0.1),0px_4px_6px_-4px_rgba(30,41,59,0.1)]",
  blue:
    "bg-[#3b82f6] hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400 text-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
  secondary:
    "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 dark:border-slate-600",
  ghost:
    "bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-slate-100",
  danger:
    "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white",
};

const sizes: Record<string, string> = {
  sm: "h-9 px-4 text-[11px] tracking-[1.4px]",
  md: "h-[52px] px-6 text-[12px] tracking-[2.4px]",
  lg: "h-[68px] px-8 text-[13px] tracking-[1.4px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-normal uppercase transition-all
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
