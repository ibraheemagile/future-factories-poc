"use client";

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileSearch,
  Flag,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/lib/context";
import { operatorCases } from "@/lib/mock-data";
import { Card, Badge, SectionTitle } from "@/components/ui";

const typeIcons = {
  exception: Flag,
  verification: FileSearch,
  grant_review: Sparkles,
  milestone: CheckCircle,
};

const priorityVariant = {
  high: "error" as const,
  medium: "warning" as const,
  low: "default" as const,
};

const statusLabels = {
  pending: { ar: "معلق", en: "Pending" },
  in_review: { ar: "قيد المراجعة", en: "In Review" },
  resolved: { ar: "تم الحل", en: "Resolved" },
};

export default function OperatorPage() {
  const { t } = useApp();

  const stats = {
    exceptions: operatorCases.filter((c) => c.type === "exception").length,
    pending: operatorCases.filter((c) => c.status === "pending").length,
    inReview: operatorCases.filter((c) => c.status === "in_review").length,
    high: operatorCases.filter((c) => c.priority === "high").length,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle
        title={t("لوحة التشغيل", "Operations Dashboard")}
        subtitle={t(
          "مراجعة استثنائية فقط — تقليل التدخل البشري والتركيز على الحالات التي تحتاج قرار",
          "Exception-based review only — minimize human intervention, focus on cases needing decisions"
        )}
      />

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            labelAr: "استثناءات",
            labelEn: "Exceptions",
            value: stats.exceptions,
            icon: AlertTriangle,
            color: "text-red-600 bg-red-50",
          },
          {
            labelAr: "معلق",
            labelEn: "Pending",
            value: stats.pending,
            icon: Clock,
            color: "text-amber-600 bg-amber-50",
          },
          {
            labelAr: "قيد المراجعة",
            labelEn: "In Review",
            value: stats.inReview,
            icon: FileSearch,
            color: "text-blue-600 bg-blue-50",
          },
          {
            labelAr: "أولوية عالية",
            labelEn: "High Priority",
            value: stats.high,
            icon: Flag,
            color: "text-red-600 bg-red-50",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.labelEn} className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500">
                  {t(s.labelAr, s.labelEn)}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Philosophy Banner */}
      <Card className="mb-8 border-emerald-200 bg-emerald-50/40">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-semibold text-emerald-800">
              {t("فلسفة التشغيل", "Operations Philosophy")}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {t(
                "الذكاء الاصطناعي يعالج 90% من الطلبات تلقائياً. فريق التشغيل يراجع فقط: الاستثناءات، عدم تطابق البيانات، والحالات التي تحتاج قرار بشري.",
                "AI handles 90% of requests automatically. Operations team reviews only: exceptions, data mismatches, and cases requiring human decisions."
              )}
            </p>
          </div>
        </div>
      </Card>

      {/* Cases */}
      <div className="space-y-4">
        {operatorCases.map((c) => {
          const Icon = typeIcons[c.type];
          return (
            <Card
              key={c.id}
              className="transition hover:border-emerald-200 hover:shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {t(c.titleAr, c.titleEn)}
                    </h3>
                    <p className="text-sm text-slate-500">{c.entity}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={priorityVariant[c.priority]}>
                    {c.priority}
                  </Badge>
                  <Badge variant="info">
                    {t(
                      statusLabels[c.status].ar,
                      statusLabels[c.status].en
                    )}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <p className="text-sm text-slate-600">
                  {t(c.aiSummary.ar, c.aiSummary.en)}
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="rounded-lg bg-emerald-700 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-800">
                  {t("مراجعة", "Review")}
                </button>
                <button className="rounded-lg border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50">
                  {t("تفاصيل", "Details")}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
