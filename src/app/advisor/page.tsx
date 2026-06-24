"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { assessmentQuestions } from "@/lib/mock-data";
import { analyzeAssessment } from "@/lib/ai-engine";
import type { AssessmentAnswer, InitiativePath } from "@/lib/types";
import { Panel, ProgressLine, SectionTitle, StepBar, Tag } from "@/components/ui";

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
  const { t, lang } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);

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

  const stepLabels = assessmentQuestions.map((q) =>
    t(q.questionAr.slice(0, 12) + "…", q.questionEn.slice(0, 12) + "…")
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SectionTitle
        title={t("تحديد المسار — استبيان أولي", "Path Assessment — Initial Survey")}
        subtitle={t(
          "نموذج FF-INT-001 — يُستخدم لتحديد البرنامج والمسار المناسب",
          "Form FF-INT-001 — used to determine the appropriate program and path"
        )}
      />

      <Panel className="mb-6">
        <StepBar steps={stepLabels.slice(0, 4)} current={Math.min(step, 3)} />
        <div className="mt-4">
          <ProgressLine value={progress} label={t("اكتمال الاستبيان", "Survey Completion")} />
        </div>
      </Panel>

      {!showResult ? (
        <Panel className="animate-fade-in">
          <p className="text-xs font-medium text-[var(--muted)]">
            {t(`السؤال ${step + 1} من ${assessmentQuestions.length}`, `Question ${step + 1} of ${assessmentQuestions.length}`)}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--navy)]">
            {t(currentQ.questionAr, currentQ.questionEn)}
          </h3>
          <div className="mt-5 space-y-2">
            {currentQ.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="block w-full border border-[var(--border)] px-4 py-3 text-start text-sm transition hover:border-[var(--navy)] hover:bg-[#fafbfc]"
              >
                {t(opt.labelAr, opt.labelEn)}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 text-sm text-[var(--muted)] hover:text-[var(--navy)]"
            >
              {t("السابق", "Previous")}
            </button>
          )}
        </Panel>
      ) : (
        recommendation && (
          <div className="animate-fade-in space-y-4">
            <Panel title={t("نتيجة التقييم", "Assessment Result")}>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[var(--muted)]">{t("المسار المقترح", "Recommended Path")}</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--navy)]">
                    {t(pathLabels[recommendation.path].ar, pathLabels[recommendation.path].en)}
                  </p>
                </div>

                {recommendation.eligibleForGrant && (
                  <div className="border-r-4 border-[var(--gold)] bg-[var(--gold-light)] px-4 py-3 text-sm">
                    {t(
                      `مؤهل لمنحة المصانع الابتكارية — TRL ${recommendation.trlLevel} — تمويل حتى 70% (حد أقصى 2,000,000 ريال)`,
                      `Eligible for Innovation Factory Grant — TRL ${recommendation.trlLevel} — up to 70% (max SAR 2,000,000)`
                    )}
                  </div>
                )}

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-[var(--muted)]">
                    {t("مبررات التوجيه", "Routing Rationale")}
                  </p>
                  <ul className="space-y-1.5 text-sm text-[var(--foreground)]">
                    {recommendation.reasons.map((r, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[var(--muted)]">{i + 1}.</span>
                        {t(r.ar, r.en)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-[var(--muted)]">
                    {t("الإجراءات المطلوبة", "Required Actions")}
                  </p>
                  <ol className="space-y-1.5 text-sm">
                    {recommendation.nextSteps.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-medium text-[var(--navy)]">{i + 1}.</span>
                        {t(s.ar, s.en)}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Panel>

            <Link
              href={pathLinks[recommendation.path] || "/factory"}
              className="block bg-[var(--navy)] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--navy-light)]"
            >
              {t("متابعة إلى الملف", "Continue to Profile")}
            </Link>

            <button
              onClick={() => { setStep(0); setAnswers([]); setShowResult(false); }}
              className="w-full py-2 text-center text-sm text-[var(--muted)] hover:text-[var(--navy)]"
            >
              {t("إعادة الاستبيان", "Retake Survey")}
            </button>
          </div>
        )
      )}
    </div>
  );
}
