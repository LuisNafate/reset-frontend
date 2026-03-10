"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, rightElement, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-[12px] tracking-[1px] uppercase"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--ui-text-muted)",
            }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--ui-text-caption)" }}
            >
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full h-13 rounded-xl border px-4 text-[13px] transition-all outline-none
              focus:ring-2
              ${icon ? "pl-12" : "pl-4"}
              ${rightElement ? "pr-12" : "pr-4"}
              ${error ? "border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-600 dark:focus:ring-red-900/30" : ""}
              ${className}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              backgroundColor: "var(--surface-input)",
              color: "var(--ui-text-body)",
              borderColor: error ? undefined : "var(--ui-border)",
              /* placeholder se controla via CSS variable abajo */
            } as React.CSSProperties}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p
            className="text-[11px] text-red-500 dark:text-red-400"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
