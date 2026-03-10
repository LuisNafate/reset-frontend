interface BadgeProps {
  label: string;
  variant?: "default" | "blue" | "green" | "red" | "yellow";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:
    "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-700/60 dark:text-slate-200 dark:border-slate-600",
  blue:
    "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:border-sky-700",
  green:
    "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-700",
  red:
    "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700",
  yellow:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700",
};

export default function Badge({ label, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] tracking-widest uppercase ${variantStyles[variant]} ${className}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {label}
    </span>
  );
}
