"use client";

import { useApp } from "@/lib/context";
import { operatorCases } from "@/lib/mock-data";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  MetricCard,
  PageShell,
  StatusBadge,
} from "@/components/ui";

const typeLabels = {
  exception: { ar: "استثناء", en: "Exception" },
  verification: { ar: "تحقق", en: "Verification" },
  grant_review: { ar: "منحة", en: "Grant" },
  milestone: { ar: "مرحلة", en: "Milestone" },
};

const priorityTone = {
  high: "danger" as const,
  medium: "warning" as const,
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
    grants: operatorCases.filter((c) => c.type === "grant_review").length,
    milestones: operatorCases.filter((c) => c.type === "milestone").length,
    exceptions: operatorCases.filter((c) => c.type === "exception").length,
  };

  const rows = operatorCases.map((c) => [
    <span key={`e-${c.id}`} className="font-mono text-xs">{c.entity}</span>,
    <StatusBadge key={`t-${c.id}`} tone={c.type === "exception" ? "danger" : "neutral"}>
      {t(typeLabels[c.type].ar, typeLabels[c.type].en)}
    </StatusBadge>,
    <span key={`d-${c.id}`} className="font-medium text-navy">
      {t(c.titleAr, c.titleEn)}
    </span>,
    <StatusBadge key={`p-${c.id}`} tone={priorityTone[c.priority]}>
      {c.priority === "high"
        ? t("عاجل", "Urgent")
        : c.priority === "medium"
          ? t("متوسط", "Medium")
          : t("منخفض", "Low")}
    </StatusBadge>,
    <StatusBadge
      key={`s-${c.id}`}
      tone={c.status === "pending" ? "warning" : c.status === "in_review" ? "info" : "success"}
    >
      {t(statusLabels[c.status].ar, statusLabels[c.status].en)}
    </StatusBadge>,
    <Button key={`a-${c.id}`} variant="ghost" className="min-h-8 px-2 py-1 text-xs">
      {t("مراجعة", "Review")}
    </Button>,
  ]);

  return (
    <PageShell
      title={t("لوحة متابعة التشغيل", "Operations Control Room")}
      subtitle={t(
        "مراجعة الطلبات التي تتطلب إجراء — باقي الطلبات تُعالج تلقائياً",
        "Applications requiring action — remaining requests processed automatically"
      )}
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard label={t("معلق", "Pending")} value={stats.pending} />
        <MetricCard label={t("قيد المراجعة", "In Review")} value={stats.inReview} />
        <MetricCard label={t("منح", "Grants")} value={stats.grants} />
        <MetricCard label={t("مراحل", "Milestones")} value={stats.milestones} />
        <MetricCard label={t("استثناءات", "Exceptions")} value={stats.exceptions} />
      </div>

      <Card className="mb-8">
        <CardHeader title={t("قائمة الإجراءات", "Action Queue")} />
        <CardBody className="p-0">
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
        </CardBody>
      </Card>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-navy">
          {t("بطاقات الحالات", "Case Cards")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {operatorCases.map((c) => (
            <Card key={c.id}>
              <CardBody>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-muted">{c.entity}</span>
                  <StatusBadge tone={priorityTone[c.priority]}>
                    {c.priority === "high" ? t("عاجل", "Urgent") : c.priority}
                  </StatusBadge>
                  <StatusBadge tone={c.type === "exception" ? "danger" : "info"}>
                    {t(typeLabels[c.type].ar, typeLabels[c.type].en)}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm font-semibold text-navy">
                  {t(c.titleAr, c.titleEn)}
                </p>
                <p className="mt-2 text-sm text-secondary">
                  {t(c.systemSummary.ar, c.systemSummary.en)}
                </p>
                {c.recommendedAction && (
                  <div className="mt-4 rounded-md bg-info-bg px-3 py-2">
                    <p className="text-xs font-medium text-info">
                      {t("الإجراء المقترح", "Recommended Action")}
                    </p>
                    <p className="mt-0.5 text-sm text-secondary">
                      {t(c.recommendedAction.ar, c.recommendedAction.en)}
                    </p>
                  </div>
                )}
                {c.riskReason && (
                  <div className="mt-2 rounded-md bg-warning-bg px-3 py-2">
                    <p className="text-xs font-medium text-warning">
                      {t("سبب المخاطرة", "Risk Reason")}
                    </p>
                    <p className="mt-0.5 text-sm text-secondary">
                      {t(c.riskReason.ar, c.riskReason.en)}
                    </p>
                  </div>
                )}
                <Button variant="outline" className="mt-4">
                  {t("فتح الحالة", "Open Case")}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
