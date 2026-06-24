"use client";

import { useApp } from "@/lib/context";
import { operatorCases } from "@/lib/mock-data";
import { Panel, Tag, Stat, SectionTitle, DataTable } from "@/components/ui";

const typeLabels = {
  exception: { ar: "استثناء", en: "Exception" },
  verification: { ar: "تحقق", en: "Verification" },
  grant_review: { ar: "منحة", en: "Grant" },
  milestone: { ar: "مرحلة", en: "Milestone" },
};

const priorityTone = {
  high: "red" as const,
  medium: "amber" as const,
  low: "neutral" as const,
};

const statusLabels = {
  pending: { ar: "معلق", en: "Pending" },
  in_review: { ar: "قيد المراجعة", en: "In Review" },
  resolved: { ar: "مغلق", en: "Closed" },
};

export default function OperatorPage() {
  const { t } = useApp();

  const stats = {
    pending: operatorCases.filter((c) => c.status === "pending").length,
    inReview: operatorCases.filter((c) => c.status === "in_review").length,
    high: operatorCases.filter((c) => c.priority === "high").length,
    exceptions: operatorCases.filter((c) => c.type === "exception").length,
  };

  const rows = operatorCases.map((c) => [
    c.entity,
    t(typeLabels[c.type].ar, typeLabels[c.type].en),
    <span key={`t-${c.id}`} className="font-medium">{t(c.titleAr, c.titleEn)}</span>,
    <Tag key={`p-${c.id}`} tone={priorityTone[c.priority]}>
      {c.priority === "high" ? t("عاجل", "Urgent") : c.priority === "medium" ? t("متوسط", "Medium") : t("منخفض", "Low")}
    </Tag>,
    <Tag key={`s-${c.id}`} tone={c.status === "pending" ? "amber" : c.status === "in_review" ? "blue" : "green"}>
      {t(statusLabels[c.status].ar, statusLabels[c.status].en)}
    </Tag>,
    <button key={`a-${c.id}`} className="text-xs font-medium text-[var(--navy)] underline">
      {t("مراجعة", "Review")}
    </button>,
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SectionTitle
        title={t("لوحة متابعة التشغيل", "Operations Monitoring")}
        subtitle={t(
          "مراجعة الطلبات التي تتطلب إجراء — باقي الطلبات تُعالج تلقائياً",
          "Applications requiring action — remaining requests processed automatically"
        )}
      />

      <div className="mb-6 grid grid-cols-2 gap-px bg-[var(--border)] md:grid-cols-4">
        <Stat label={t("معلق", "Pending")} value={stats.pending} />
        <Stat label={t("قيد المراجعة", "In Review")} value={stats.inReview} />
        <Stat label={t("عاجل", "Urgent")} value={stats.high} />
        <Stat label={t("استثناءات", "Exceptions")} value={stats.exceptions} />
      </div>

      <Panel title={t("قائمة المتابعة", "Action Queue")}>
        <DataTable
          headers={[
            t("رقم الطلب", "Ref"),
            t("النوع", "Type"),
            t("الوصف", "Description"),
            t("الأولوية", "Priority"),
            t("الحالة", "Status"),
            "",
          ]}
          rows={rows}
        />
      </Panel>

      <div className="mt-6 space-y-3">
        {operatorCases.map((c) => (
          <Panel key={c.id} className="!p-0">
            <div className="px-5 py-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                <span>{c.entity}</span>
                <span>·</span>
                <span>{t(typeLabels[c.type].ar, typeLabels[c.type].en)}</span>
              </div>
              <p className="mt-1 text-sm text-[var(--foreground)]">
                {t(c.aiSummary.ar, c.aiSummary.en)}
              </p>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
