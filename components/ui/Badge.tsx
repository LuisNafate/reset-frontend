interface BadgeProps {
  label: string;
  variant?: "default" | "blue" | "green" | "red" | "yellow";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "rs-badge-default",
  blue: "rs-badge-blue",
  green: "rs-badge-green",
  red: "rs-badge-red",
  yellow: "rs-badge-yellow",
};

export default function Badge({ label, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`rs-badge ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
