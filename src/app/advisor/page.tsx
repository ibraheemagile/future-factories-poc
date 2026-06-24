"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { assessmentQuestions } from "@/lib/mock-data";
import { analyzeAssessment } from "@/lib/ai-engine";
import type { AssessmentAnswer, InitiativePath } from "@/lib/types";
import { Panel, ProgressLine, SectionTitle, Tag } from "@/components/ui";

const pathLabels: Record<InitiativePath, { ar: string; en: string }> = {
  transformation: { ar: "مسار التحول الصناعي — مصانع المستقبل", en: "Industrial Transformation — Future Factories" },
  innovation: { ar: "مسار الابتكار — منح المصانع الابتكارية", en: "Innovation — Factory Innovation Grants" },
  training: { ar: "الدورات وورش العمل", en: "Training & Workshops" },
  marketplace: { ar: "اعتماد مقدم خدمة", en: "Service Provider Registration" },
};

const pathLinks: Record<string, string> = {
  transformation: "/factory",
  innovation: "/factory",
  training: "/factory",
  marketplace: "/provider",
};

export default function AdvisorPage() {
  const { t } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const currentQ = assessmentQuestions[step];
  const progress = Math.round(((step + (showResult ? 1 : 0)) / assessmentQuestions.length) * 100);
  const recommendation = showResult ? analyzeAssessment(answers) : null;

  const handleAnswer = (value: string) => {
    const updated = [
      ...answers.filter((a) => a.questionId !== currentQ.id),
      { questionId: currentQ.id, value },
    ];
    setAnswers(updated);
    if (step < assessmentQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const stepLabels = assessmentQuestions.map((q) => t(q.shortAr, q.shortEn));

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <SectionTitle
        title={t("تحديد المسار — استبيان أولي", "Path Assessment — Initial Survey")}
        subtitle={t(
          "نموذج FF-INT-001 — يُستخدم لتحديد البرنامج والمسار المناسب",
          "Form FF-INT-001 — used to determine the appropriate program and path"
        )}
      />

      {/* Progress header */}
      <div className="mb-6 border border-border bg-white p-5">
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="font-medium text-navy">
            {showResult
              ? t("اكتمل الاستبيان", "Survey Complete")
              : t(`الخطوة ${step + 1} من ${assessmentQuestions.length}`, `Step ${step + 1} of ${assessmentQuestions.length}`)}
          </span>
          <span className="tabular-nums text-muted">{progress}%</span>
        </div>
        <ProgressLine value={progress} />
        {!showResult && (
          <p className="mt-3 text-xs text-muted">
            {t("الخطوة الحالية:", "Current step:")}{" "}
            <span className="font-medium text-foreground">{stepLabels[step]}</span>
          </p>
        )}
        {/* Mini step dots */}
        <div className="mt-4 flex flex-wrap gap-2">
          {stepLabels.map((label, i) => {
            const done = i < step || showResult;
            const active = i === step && !showResult;
            return (
              <span
                key={label}
                className={`px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                  done
                    ? "bg-navy text-white"
                    : active
                      ? "border-2 border-navy bg-white text-navy"
                      : "border border-border bg-white text-muted"
                }`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {!showResult ? (
        <Panel className="animate-fade-in">
          <h3 className="text-base font-semibold text-navy">
            {t(currentQ.questionAr, currentQ.questionEn)}
          </h3>
          <fieldset className="mt-5 space-y-3">
            <legend className="sr-only">{t(currentQ.questionAr, currentQ.questionEn)}</legend>
            {currentQ.options.map((opt) => {
              const label = t(opt.labelAr, opt.labelEn);
              const isHovered = hovered === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleAnswer(opt.value)}
                  onMouseEnter={() => setHovered(opt.value)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex w-full cursor-pointer items-center gap-3 border px-4 py-3.5 text-start transition-colors duration-200 ${
                    isHovered
                      ? "border-navy bg-slate-50"
                      : "border-border bg-white hover:border-navy hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                      isHovered ? "border-navy" : "border-slate-300"
                    }`}
                  >
                    {isHovered && <span className="h-2 w-2 rounded-full bg-navy" />}
                  </span>
                  <span className="text-sm font-medium text-slate-900">{label}</span>
                </button>
              );
            })}
          </fieldset>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="mt-5 cursor-pointer text-sm font-medium text-muted transition-colors duration-200 hover:text-navy"
            >
              {t("← السابق", "← Previous")}
            </button>
          )}
        </Panel>
      ) : (
        recommendation && (
          <div className="animate-fade-in space-y-4">
            <Panel title={t("نتيجة التقييم", "Assessment Result")}>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    {t("المسار المقترح", "Recommended Path")}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-navy">
                    {t(pathLabels[recommendation.path].ar, pathLabels[recommendation.path].en)}
                  </p>
                </div>

                {recommendation.eligibleForGrant && (
                  <div className="border-s-4 border-gold bg-gold-light px-4 py-3 text-sm text-slate-800">
                    {t(
                      `مؤهل لمنحة المصانع الابتكارية — TRL ${recommendation.trlLevel} — تمويل حتى 70% (حد أقصى 2,000,000 ريال)`,
                      `Eligible for Innovation Factory Grant — TRL ${recommendation.trlLevel} — up to 70% (max SAR 2,000,000)`
                    )}
                  </div>
                )}

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    {t("مبررات التوجيه", "Routing Rationale")}
                  </p>
                  <ul className="space-y-1.5 text-sm text-slate-800">
                    {recommendation.reasons.map((r, i) => (
                      <li key={i}>{i + 1}. {t(r.ar, r.en)}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    {t("الإجراءات المطلوبة", "Required Actions")}
                  </p>
                  <ol className="list-decimal space-y-1.5 ps-5 text-sm text-slate-800">
                    {recommendation.nextSteps.map((s, i) => (
                      <li key={i}>{t(s.ar, s.en)}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </Panel>

            <Link
              href={pathLinks[recommendation.path] || "/factory"}
              className="block cursor-pointer bg-navy px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-navy-light"
            >
              {t("متابعة إلى الملف", "Continue to Profile")}
            </Link>

            <button
              type="button"
              onClick={() => { setStep(0); setAnswers([]); setShowResult(false); }}
              className="w-full cursor-pointer py-2 text-center text-sm text-muted transition-colors duration-200 hover:text-navy"
            >
              {t("إعادة الاستبيان", "Retake Survey")}
            </button>
          </div>
        )
      )}
    </div>
  );
}
