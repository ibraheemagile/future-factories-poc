"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";
import {
  demoFactory,
  factoryDetails,
  factoryMilestones,
  factoryQuotations,
  journeyStages,
  serviceProviders,
  trainingPrograms,
} from "@/lib/mock-data";
import { matchProviders } from "@/lib/ai-engine";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  MetricCard,
  PageShell,
  ProgressLine,
  StatusBadge,
  Timeline,
} from "@/components/ui";

export default function FactoryPage() {
  const { t } = useApp();
  const matches = matchProviders("plastics", ["transformation", "erp", "ot"]);
  const currentStageIndex = journeyStages.findIndex((s) => s.id === demoFactory.currentStage);

  const timelineSteps = journeyStages.map((stage) => ({
    id: stage.id,
    title: t(stage.titleAr, stage.titleEn),
    date: stage.order <= currentStageIndex + 1 ? `2025-0${Math.min(stage.order, 6)}` : undefined,
  }));

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(amount);

  return (
    <PageShell
      title={t("ملف المصنع", "Factory Profile")}
      subtitle={`${factoryDetails.applicationRef} — ${factoryDetails.program}`}
      actions={
        <Link href="/advisor">
          <Button variant="outline">{t("تحديث التقييم", "Update Assessment")}</Button>
        </Link>
      }
    >
      {/* Factory header metrics */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="sm:col-span-2">
          <CardBody>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {t("اسم المنشأة", "Entity Name")}
            </p>
            <p className="mt-1 text-lg font-semibold text-navy">
              {t(demoFactory.nameAr, demoFactory.name)}
            </p>
            <p className="mt-1 text-sm text-muted">
              {t("س.ت", "CR")}: {factoryDetails.crNumber} · {factoryDetails.city}
            </p>
          </CardBody>
        </Card>
        <MetricCard
          label={t("مؤشر سيري", "SERI Index")}
          value={factoryDetails.seriLevel}
          sub={factoryDetails.monshaatSize}
        />
        <MetricCard
          label={t("جاهزية التحول", "Readiness")}
          value={`${demoFactory.readinessScore}%`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Journey timeline */}
          <Card>
            <CardHeader
              title={t("مسار الطلب", "Application Track")}
              subtitle={t("المرحلة الحالية: مطابقة مقدمي الخدمات", "Current stage: Provider Matching")}
            />
            <CardBody>
              <Timeline
                steps={timelineSteps.slice(0, 5)}
                currentIndex={currentStageIndex}
                currentLabel={t("المرحلة الحالية", "Current Stage")}
              />
              <div className="mt-6 border-t border-border-subtle pt-6">
                <ProgressLine
                  value={demoFactory.readinessScore}
                  label={t("نسبة إنجاز المسار", "Track Completion")}
                />
              </div>
            </CardBody>
          </Card>

          {/* Provider matching cards */}
          <Card>
            <CardHeader
              title={t("مقدمو الحلول المطابقون", "Matched Solution Providers")}
              subtitle={t(
                "بناءً على تقييم سيري ومتطلبات مسار الرقمنة الأساسية",
                "Based on SERI assessment and basic digitization path requirements"
              )}
            />
            <CardBody className="flex flex-col gap-4">
              {matches.slice(0, 2).map((match) => {
                const p = serviceProviders.find((sp) => sp.id === match.providerId);
                if (!p) return null;
                return (
                  <div
                    key={p.id}
                    className="rounded-lg border border-border p-4 transition-colors duration-200 hover:border-navy/20"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-navy">{t(p.nameAr, p.name)}</p>
                        <p className="mt-1 text-xs text-muted">
                          {p.solutions.join(" · ")}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <StatusBadge tone="success">
                          {t("معتمد", "Approved")}
                        </StatusBadge>
                        <StatusBadge tone="gold">
                          {match.score}% {t("تطابق", "match")}
                        </StatusBadge>
                      </div>
                    </div>
                    <ul className="mt-3 flex flex-col gap-1">
                      {match.reasons.map((r, i) => (
                        <li key={i} className="text-xs text-secondary">
                          · {t(r.ar, r.en)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs tabular-nums text-muted">
                      <span>IRR: {p.avgROI}%</span>
                      <span>
                        {t("الاسترداد", "Payback")}: {p.paybackMonths} {t("شهر", "mo")}
                      </span>
                      <span>
                        {t("مصانع", "Factories")}: {p.factoriesServed}
                      </span>
                    </div>
                    <Button variant="outline" className="mt-4">
                      {t("طلب عرض سعر", "Request Quotation")}
                    </Button>
                  </div>
                );
              })}
            </CardBody>
          </Card>

          {/* Quotations */}
          <Card>
            <CardHeader
              title={t("عروض الأسعار المستلمة", "Received Quotations")}
              subtitle={t("FF-2025-0847", "FF-2025-0847")}
            />
            <CardBody className="flex flex-col gap-4">
              {factoryQuotations.map((qt) => {
                const p = serviceProviders.find((sp) => sp.id === qt.providerId);
                return (
                  <div key={qt.id} className="flex flex-col gap-2 border-b border-border-subtle pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-navy">
                        {p ? t(p.nameAr, p.name) : qt.providerId}
                      </p>
                      <StatusBadge tone={qt.status === "submitted" ? "info" : "neutral"}>
                        {t("مُقدّم", "Submitted")}
                      </StatusBadge>
                    </div>
                    <p className="text-sm text-secondary">{t(qt.scope.ar, qt.scope.en)}</p>
                    <div className="flex flex-wrap gap-4 text-sm tabular-nums">
                      <span className="font-semibold text-navy">{formatCurrency(qt.amount)}</span>
                      <span className="text-muted">
                        {qt.timelineMonths} {t("شهر", "months")}
                      </span>
                      {qt.submittedAt && (
                        <span className="text-muted">{qt.submittedAt}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader title={t("مراحل التنفيذ", "Implementation Milestones")} />
            <CardBody className="flex flex-col gap-4">
              {factoryMilestones.map((ms) => (
                <div key={ms.id} className="rounded-lg border border-border-subtle p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-navy">
                      {t(ms.titleAr, ms.titleEn)}
                    </p>
                    <StatusBadge
                      tone={
                        ms.status === "completed"
                          ? "success"
                          : ms.status === "in_progress"
                            ? "info"
                            : "neutral"
                      }
                    >
                      {ms.status === "completed"
                        ? t("مكتمل", "Completed")
                        : ms.status === "in_progress"
                          ? t("قيد التنفيذ", "In Progress")
                          : t("قادم", "Upcoming")}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 text-xs tabular-nums text-muted">{ms.dueDate}</p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {ms.deliverables.map((d) => (
                      <li key={d.en} className="text-xs text-secondary">
                        · {t(d.ar, d.en)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title={t("بيانات الطلب", "Application Details")} />
            <CardBody>
              <dl className="flex flex-col gap-3 text-sm">
                {[
                  [t("رقم الطلب", "Ref"), factoryDetails.applicationRef],
                  [t("البرنامج", "Program"), factoryDetails.program],
                  [t("المستشار", "Consultant"), factoryDetails.consultant],
                  [
                    t("المرحلة الحالية", "Current Stage"),
                    t("مطابقة مقدمي الخدمات", "Provider Matching"),
                  ],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="flex justify-between gap-4 border-b border-border-subtle pb-2 last:border-0"
                  >
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-end font-medium text-navy">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title={t("إنجازات مكتملة", "Completed Steps")} />
            <CardBody>
              <ul className="flex flex-col gap-2 text-sm">
                {[
                  t("التحقق من بيانات المنشأة", "Entity data verified"),
                  t("التقييم الذاتي — مؤشر سيري", "Self-assessment — SERI"),
                  t("تعيين مستشار معتمد", "Consultant assigned"),
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-secondary">
                    <span className="font-bold text-success">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title={t("دورات متاحة", "Available Training")} />
            <CardBody className="flex flex-col gap-3">
              {trainingPrograms.map((tp) => (
                <div key={tp.id} className="border-b border-border-subtle pb-3 last:border-0">
                  <p className="text-sm font-medium text-navy">
                    {t(tp.titleAr, tp.titleEn)}
                  </p>
                  <p className="text-xs text-muted">{tp.duration}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
