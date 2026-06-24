import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ——— Layout ——— */

export function PageShell({
  children,
  title,
  subtitle,
  actions,
  eyebrow,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      {(title || actions) && (
        <div className="mb-8 flex flex-col gap-4 border-b border-border-subtle pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className="text-2xl font-bold tracking-tight text-navy md:text-[2rem]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ——— Surfaces ——— */

export function Card({
  children,
  className,
  elevated,
}: {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface",
        elevated && "shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info" | "gold";
type LegacyTone = "green" | "amber" | "red" | "blue";

function normalizeTone(tone: BadgeTone | LegacyTone): BadgeTone {
  const map: Record<LegacyTone, BadgeTone> = {
    green: "success",
    amber: "warning",
    red: "danger",
    blue: "info",
  };
  return (map as Record<string, BadgeTone>)[tone] ?? (tone as BadgeTone);
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border-subtle px-5 py-4">
      <div>
        <h2 className="text-sm font-semibold text-navy">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function Panel({
  children,
  title,
  subtitle,
  className,
  elevated,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  elevated?: boolean;
}) {
  return (
    <Card className={className} elevated={elevated}>
      {title ? (
        <>
          <CardHeader title={title} subtitle={subtitle} />
          <CardBody>{children}</CardBody>
        </>
      ) : (
        children
      )}
    </Card>
  );
}

/* ——— Buttons ——— */

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const styles: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary-hover border border-transparent",
    secondary: "bg-navy text-white hover:bg-navy-light border border-transparent",
    ghost: "bg-transparent text-navy hover:bg-border-subtle border border-transparent",
    outline: "bg-surface text-navy border border-border hover:bg-border-subtle",
  };
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ——— Metrics & Status ——— */

export function MetricCard({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: string | number;
  sub?: string;
  trend?: "up" | "down" | "neutral";
}) {
  return (
    <Card className="p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-navy">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
      {trend && trend !== "neutral" && (
        <p
          className={cn(
            "mt-2 text-xs font-medium",
            trend === "up" ? "text-success" : "text-danger"
          )}
        >
          {trend === "up" ? "↑" : "↓"}
        </p>
      )}
    </Card>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: BadgeTone | LegacyTone;
}) {
  const resolved = normalizeTone(tone);
  const tones: Record<BadgeTone, string> = {
    neutral: "bg-border-subtle text-secondary",
    success: "bg-success-bg text-success",
    warning: "bg-warning-bg text-warning",
    danger: "bg-danger-bg text-danger",
    info: "bg-info-bg text-info",
    gold: "bg-gold-light text-gold",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
        tones[resolved]
      )}
    >
      {children}
    </span>
  );
}

export const Tag = StatusBadge;
export const Badge = StatusBadge;

/* ——— Progress ——— */

export function ProgressLine({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted">{label}</span>
          <span className="font-medium tabular-nums text-navy">{value}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-border-subtle">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export const ProgressBar = ProgressLine;

/* ——— Timeline ——— */

export function Timeline({
  steps,
  currentIndex,
  currentLabel,
}: {
  steps: { id: string; title: string; date?: string }[];
  currentIndex: number;
  currentLabel?: string;
}) {
  return (
    <div className="relative">
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        const last = i === steps.length - 1;
        return (
          <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
            {!last && (
              <div
                className={cn(
                  "absolute start-[11px] top-6 h-[calc(100%-12px)] w-0.5",
                  done ? "bg-primary" : "bg-border"
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                done && "bg-primary text-white",
                current && "border-2 border-primary bg-surface text-primary",
                !done && !current && "border border-border bg-surface text-faint"
              )}
            >
              {done ? "✓" : i + 1}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p
                className={cn(
                  "text-sm font-medium",
                  current ? "text-navy" : done ? "text-secondary" : "text-muted"
                )}
              >
                {step.title}
              </p>
              {step.date && (
                <p className="mt-0.5 text-xs tabular-nums text-faint">{step.date}</p>
              )}
              {current && currentLabel && (
                <span className="mt-2 inline-block">
                  <StatusBadge tone="info">{currentLabel}</StatusBadge>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ——— Selectable option ——— */

export function SelectableCard({
  selected,
  onClick,
  children,
  className,
}: {
  selected?: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full min-h-11 cursor-pointer items-start gap-3 rounded-lg border p-4 text-start transition-colors duration-200",
        selected
          ? "border-primary bg-success-bg/40 ring-1 ring-primary"
          : "border-border bg-surface hover:border-navy/30 hover:bg-border-subtle",
        className
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-primary bg-primary" : "border-faint bg-surface"
        )}
      >
        {selected && <span className="size-1.5 rounded-full bg-white" />}
      </span>
      <span className="flex-1 text-sm font-medium text-foreground">{children}</span>
    </button>
  );
}

/* ——— Decision memo ——— */

export function DecisionCard({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: ReactNode;
  tone?: "default" | "success" | "warning";
}) {
  const borders = {
    default: "border-s-4 border-s-navy",
    success: "border-s-4 border-s-primary",
    warning: "border-s-4 border-s-gold",
  };
  return (
    <Card className={cn("overflow-hidden", borders[tone])}>
      <CardBody>
        <h3 className="text-sm font-semibold text-navy">{title}</h3>
        <div className="mt-3 text-sm leading-relaxed text-secondary">{children}</div>
      </CardBody>
    </Card>
  );
}

/* ——— Checklist ——— */

export function RequirementChecklist({
  items,
}: {
  items: { label: string; status: "done" | "pending" | "warning" }[];
}) {
  const icon = {
    done: { mark: "✓", class: "text-success" },
    pending: { mark: "○", class: "text-faint" },
    warning: { mark: "!", class: "text-warning" },
  };
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-3 text-sm">
          <span className={cn("mt-0.5 font-bold", icon[item.status].class)}>
            {icon[item.status].mark}
          </span>
          <span className="text-secondary">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

/* ——— Table ——— */

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-border bg-border-subtle">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border-subtle last:border-0 hover:bg-border-subtle/50"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-secondary">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold text-navy">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}

export const Stat = MetricCard;
