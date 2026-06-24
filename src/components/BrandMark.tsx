import { cn } from "@/lib/cn";

export function BrandMark({ className, variant = "default" }: { className?: string; variant?: "default" | "inverse" }) {
  const stroke = variant === "inverse" ? "#c9a84c" : "#9a7b2f";
  const fill = variant === "inverse" ? "#ffffff" : "#0c2340";
  const accent = variant === "inverse" ? "#006c35" : "#006c35";

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-11 shrink-0", className)}
      aria-hidden
    >
      <rect x="1" y="1" width="46" height="46" rx="4" stroke={stroke} strokeWidth="1.5" fill={variant === "inverse" ? "#0c2340" : "#ffffff"} />
      <path
        d="M24 8L38 16V32L24 40L10 32V16L24 8Z"
        stroke={accent}
        strokeWidth="1.25"
        fill={variant === "inverse" ? "rgba(0,108,53,0.15)" : "rgba(0,108,53,0.08)"}
      />
      <path d="M24 14V34M17 20H31M17 28H31" stroke={fill} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2.5" fill={stroke} />
    </svg>
  );
}
