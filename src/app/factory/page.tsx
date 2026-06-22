"use client";

import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Circle,
  Factory,
  Lightbulb,
  GraduationCap,
  Users,
} from "lucide-react";
import { useApp } from "@/lib/context";
import {
  demoFactory,
  journeyStages,
  serviceProviders,
  trainingPrograms,
  badges,
} from "@/lib/mock-data";
import { matchProviders } from "@/lib/ai-engine";
import { Card, Badge, ProgressBar, SectionTitle } from "@/components/ui";

export default function FactoryPage() {
  const { t } = useApp();
  const matches = matchProviders("plastics", ["transformation", "erp", "ot"]);
  const currentStageIndex = journeyStages.findIndex(
    (s) => s.id === demoFactory.currentStage
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle
        title={t("رحلة المصنع", "Factory Journey")}
        subtitle={t(
          "رحلة متصلة من التقييم الذاتي إلى المنارة الصناعية",
          "Continuous journey from self-assessment to Industrial Lighthouse"
        )}
      />

      {/* Factory Profile */}
      <Card className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Factory className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {t(demoFactory.nameAr, demoFactory.name)}
              </h3>
              <p className="text-sm text-slate-500">
                {demoFactory.sector} · {demoFactory.size}
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-700">
              {demoFactory.readinessScore}%
            </p>
            <p className="text-xs text-slate-500">
              {t("جاهزية التحول", "Transformation Readiness")}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar
            value={demoFactory.readinessScore}
            label={t("نقاط التقدم", "Progress Score")}
          />
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Journey Map */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Award className="h-5 w-5 text-emerald-600" />
              {t("خريطة الرحلة", "Journey Map")}
            </h3>
            <div className="space-y-3">
              {journeyStages.map((stage, i) => {
                const isComplete = i < currentStageIndex;
                const isCurrent = i === currentStageIndex;
                return (
                  <div
                    key={stage.id}
                    className={`flex items-center gap-3 rounded-xl p-3 transition ${
                      isCurrent
                        ? "border border-emerald-300 bg-emerald-50"
                        : isComplete
                          ? "bg-slate-50"
                          : "opacity-50"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
                    ) : isCurrent ? (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                        {i + 1}
                      </div>
                    ) : (
                      <Circle className="h-6 w-6 shrink-0 text-slate-300" />
                    )}
                    <div>
                      <p className="font-medium text-slate-800">
                        {t(stage.titleAr, stage.titleEn)}
                      </p>
                      {isCurrent && (
                        <Badge variant="success">
                          {t("المرحلة الحالية", "Current Stage")}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Provider Matching */}
          <Card className="mt-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Users className="h-5 w-5 text-emerald-600" />
              {t("مطابقة مقدمي الخدمات (AI)", "AI Service Provider Matching")}
            </h3>
            <div className="space-y-4">
              {matches.map((match) => {
                const provider = serviceProviders.find(
                  (p) => p.id === match.providerId
                );
                if (!provider) return null;
                return (
                  <div
                    key={match.providerId}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">
                        {t(provider.nameAr, provider.name)}
                      </h4>
                      <Badge variant="success">{match.score}% match</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {provider.solutions.map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </div>
                    <ul className="mt-2 space-y-0.5 text-xs text-slate-500">
                      {match.reasons.map((r, i) => (
                        <li key={i}>• {r}</li>
                      ))}
                    </ul>
                    <div className="mt-2 flex gap-4 text-xs text-slate-500">
                      <span>IRR: {provider.avgROI}%</span>
                      <span>
                        {t("الاسترداد", "Payback")}: {provider.paybackMonths}{" "}
                        {t("شهر", "mo")}
                      </span>
                      <span>
                        {t("جاهزية", "Readiness")}: {provider.readinessScore}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar: Badges + Innovation + Training */}
        <div className="space-y-6">
          <Card>
            <h3 className="mb-3 text-lg font-bold text-slate-900">
              {t("الشارات", "Badges")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {demoFactory.badges.map((bId) => {
                const b = badges.find((bd) => bd.id === bId);
                return b ? (
                  <Badge key={bId} variant="success">
                    {t(b.labelAr, b.labelEn)}
                  </Badge>
                ) : null;
              })}
            </div>
          </Card>

          <Card className="border-amber-200 bg-amber-50/30">
            <div className="mb-2 flex items-center gap-2 text-amber-700">
              <Lightbulb className="h-5 w-5" />
              <h3 className="font-bold">
                {t("مسار الابتكار", "Innovation Path")}
              </h3>
            </div>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>{t("• TRL 4-7 مؤهل", "• TRL 4-7 eligible")}</li>
              <li>{t("• تمويل 70% — حد أقصى 2M ريال", "• 70% funding — SAR 2M cap")}</li>
              <li>{t("• مراجعة + تحكيم + صرف دفعات", "• Review + judging + disbursement")}</li>
            </ul>
          </Card>

          <Card>
            <div className="mb-2 flex items-center gap-2 text-blue-700">
              <GraduationCap className="h-5 w-5" />
              <h3 className="font-bold">
                {t("الدورات والورش", "Training & Workshops")}
              </h3>
            </div>
            <div className="space-y-2">
              {trainingPrograms.map((tp) => (
                <div
                  key={tp.id}
                  className="rounded-lg bg-slate-50 p-2 text-sm"
                >
                  <p className="font-medium text-slate-800">
                    {t(tp.titleAr, tp.titleEn)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {tp.duration} · {tp.format}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Link
            href="/advisor"
            className="block rounded-xl bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            {t("إعادة التقييم مع المستشار الذكي", "Re-assess with AI Advisor")}
          </Link>
        </div>
      </div>
    </div>
  );
}
