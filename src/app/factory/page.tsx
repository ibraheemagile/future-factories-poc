"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";
import {
  demoFactory,
  factoryDetails,
  journeyStages,
  serviceProviders,
  trainingPrograms,
} from "@/lib/mock-data";
import { matchProviders } from "@/lib/ai-engine";
import { Panel, Tag, ProgressLine, SectionTitle, DataTable } from "@/components/ui";

export default function FactoryPage() {
  const { t } = useApp();
  const matches = matchProviders("plastics", ["transformation", "erp", "ot"]);
  const currentStageIndex = journeyStages.findIndex(
    (s) => s.id === demoFactory.currentStage
  );

  const providerRows = matches.map((match) => {
    const p = serviceProviders.find((sp) => sp.id === match.providerId);
    if (!p) return [];
    return [
      t(p.nameAr, p.name),
      p.solutions.slice(0, 3).join(", "),
      `${p.avgROI}%`,
      `${p.paybackMonths} ${t("شهر", "mo")}`,
      <Tag key={p.id} tone="green">{t("معتمد", "Approved")}</Tag>,
      <button key={`btn-${p.id}`} className="text-xs font-medium text-[var(--navy)] underline">
        {t("طلب عرض", "Request Quote")}
      </button>,
    ];
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SectionTitle
        title={t("ملف المصنع", "Factory Profile")}
        subtitle={`${factoryDetails.applicationRef} — ${t(factoryDetails.program, factoryDetails.program)}`}
      />

      {/* Factory header */}
      <div className="mb-6 grid gap-px bg-[var(--border)] md:grid-cols-4">
        <div className="bg-white px-5 py-4 md:col-span-2">
          <p className="text-xs text-[var(--muted)]">{t("اسم المنشأة", "Entity Name")}</p>
          <p className="mt-1 font-semibold text-[var(--navy)]">
            {t(demoFactory.nameAr, demoFactory.name)}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {t("س.ت", "CR")}: {factoryDetails.crNumber} · {factoryDetails.city}
          </p>
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-xs text-[var(--muted)]">{t("مؤشر سيري", "SERI Index")}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-[var(--navy)]">
            {factoryDetails.seriLevel}
          </p>
          <p className="text-xs text-[var(--muted)]">{factoryDetails.monshaatSize}</p>
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-xs text-[var(--muted)]">{t("جاهزية التحول", "Readiness")}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-[var(--navy)]">
            {demoFactory.readinessScore}%
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Journey timeline - horizontal on desktop */}
          <Panel title={t("مسار الطلب", "Application Track")}>
            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-max gap-0">
                {journeyStages.map((stage, i) => {
                  const done = i < currentStageIndex;
                  const current = i === currentStageIndex;
                  return (
                    <div key={stage.id} className="flex items-start">
                      <div className="flex w-28 flex-col items-center px-1">
                        <div
                          className={`flex h-8 w-8 items-center justify-center text-xs font-bold ${
                            done
                              ? "bg-[var(--navy)] text-white"
                              : current
                                ? "border-2 border-[var(--navy)] text-[var(--navy)]"
                                : "border border-[var(--border)] text-[var(--muted)]"
                          }`}
                        >
                          {done ? "✓" : i + 1}
                        </div>
                        <p
                          className={`mt-2 text-center text-[10px] leading-tight ${
                            current ? "font-semibold text-[var(--navy)]" : "text-[var(--muted)]"
                          }`}
                        >
                          {t(stage.titleAr, stage.titleEn)}
                        </p>
                      </div>
                      {i < journeyStages.length - 1 && (
                        <div
                          className={`mt-4 h-px w-4 shrink-0 ${done ? "bg-[var(--navy)]" : "bg-[var(--border)]"}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 border-t border-[var(--border)] pt-4">
              <ProgressLine
                value={demoFactory.readinessScore}
                label={t("نسبة إنجاز المسار", "Track Completion")}
              />
            </div>
          </Panel>

          {/* Provider matching table */}
          <Panel
            title={t("مقدمو الحلول المطابقون", "Matched Solution Providers")}
            subtitle={t(
              "بناءً على تقييم سيري ومتطلبات مسار الرقمنة الأساسية",
              "Based on SERI assessment and basic digitization path requirements"
            )}
          >
            <DataTable
              headers={[
                t("مقدم الخدمة", "Provider"),
                t("الحلول", "Solutions"),
                "IRR",
                t("الاسترداد", "Payback"),
                t("الحالة", "Status"),
                "",
              ]}
              rows={providerRows}
            />
          </Panel>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Panel title={t("بيانات الطلب", "Application Details")}>
            <dl className="space-y-3 text-sm">
              {[
                [t("رقم الطلب", "Ref"), factoryDetails.applicationRef],
                [t("البرنامج", "Program"), factoryDetails.program],
                [t("المستشار", "Consultant"), factoryDetails.consultant],
                [t("المرحلة الحالية", "Current Stage"), t("مطابقة مقدمي الخدمات", "Provider Matching")],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex justify-between gap-4 border-b border-[var(--border)] pb-2">
                  <dt className="text-[var(--muted)]">{label}</dt>
                  <dd className="text-end font-medium text-[var(--navy)]">{value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel title={t("إنجازات مكتملة", "Completed Steps")}>
            <ul className="space-y-2 text-sm">
              {[
                t("التحقق من بيانات المنشأة", "Entity data verified"),
                t("التقييم الذاتي — مؤشر سيري", "Self-assessment — SERI"),
                t("تعيين مستشار معتمد", "Consultant assigned"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[var(--foreground)]">
                  <span className="text-[var(--navy)]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={t("دورات متاحة", "Available Training")}>
            <div className="space-y-3">
              {trainingPrograms.map((tp) => (
                <div key={tp.id} className="border-b border-[var(--border)] pb-2 last:border-0">
                  <p className="text-sm font-medium">{t(tp.titleAr, tp.titleEn)}</p>
                  <p className="text-xs text-[var(--muted)]">{tp.duration}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Link
            href="/advisor"
            className="block border border-[var(--border)] bg-white px-4 py-2.5 text-center text-sm text-[var(--navy)] hover:bg-[#fafbfc]"
          >
            {t("تحديث التقييم الأولي", "Update Initial Assessment")}
          </Link>
        </div>
      </div>
    </div>
  );
}
