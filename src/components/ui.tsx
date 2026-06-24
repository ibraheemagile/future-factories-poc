import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
  title,
  subtitle,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className={`border border-[var(--border)] bg-white ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-[var(--navy)]">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-sm text-[var(--muted)]">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="border border-[var(--border)] bg-white px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-[var(--navy)]">
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-[var(--muted)]">{sub}</p>}
    </div>
  );
}

export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "amber" | "red" | "blue";
}) {
  const tones = {
    neutral: "bg-[#eef0f4] text-[var(--muted)]",
    green: "bg-[#e8f3ec] text-[#1e6b3a]",
    amber: "bg-[var(--gold-light)] text-[#7a6530]",
    red: "bg-[#fce8e8] text-[#9b2c2c]",
    blue: "bg-[#e8eef5] text-[#1e4a7a]",
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function ProgressLine({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="text-[var(--muted)]">{label}</span>
          <span className="font-semibold tabular-nums text-[var(--navy)]">{value}%</span>
        </div>
      )}
      <div className="h-1.5 w-full bg-[#eef0f4]">
        <div
          className="h-full bg-[var(--navy)] transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[#f8f9fb]">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-start text-xs font-semibold uppercase tracking-wide text-[var(--muted)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[var(--border)] hover:bg-[#fafbfc]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[var(--foreground)]">
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

export function StepBar({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-7 w-7 items-center justify-center text-xs font-bold ${
                i < current
                  ? "bg-[var(--navy)] text-white"
                  : i === current
                    ? "border-2 border-[var(--navy)] bg-white text-[var(--navy)]"
                    : "border border-[var(--border)] bg-white text-[var(--muted)]"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span className="mt-1 hidden text-[10px] text-[var(--muted)] sm:block">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`mx-1 h-px flex-1 ${i < current ? "bg-[var(--navy)]" : "bg-[var(--border)]"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export const Card = Panel;
export const Badge = Tag;
export const ProgressBar = ProgressLine;

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold text-[var(--navy)]">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>}
    </div>
  );
}
