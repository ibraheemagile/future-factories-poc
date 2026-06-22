"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useApp } from "@/lib/context";
import { assessmentQuestions } from "@/lib/mock-data";
import { analyzeAssessment } from "@/lib/ai-engine";
import type { AssessmentAnswer } from "@/lib/types";
import { Card, Badge, ProgressBar, SectionTitle } from "@/components/ui";

export default function AdvisorPage() {
  const { t, lang } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const currentQ = assessmentQuestions[step];
  const progress = Math.round(((step + (showResult ? 1 : 0)) / assessmentQuestions.length) * 100);

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

  const recommendation = showResult ? analyzeAssessment(answers) : null;

  const pathLinks: Record<string, string> = {
    transformation: "/factory",
    innovation: "/factory",
    training: "/factory",
    marketplace: "/provider",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <SectionTitle
        title={t("المستشار الذكي", "AI Journey Advisor")}
        subtitle={t(
          "أجب على الأسئلة وسيوجّهك الذكاء الاصطناعي للمسار المناسب",
          "Answer questions and AI will guide you to the right initiative path"
        )}
      />

      <ProgressBar value={progress} label={t("التقدم", "Progress")} />

      <div className="mt-8">
        {!showResult ? (
          <Card className="animate-fade-in">
            <div className="mb-4 flex items-center gap-2 text-emerald-700">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">
                {t(`سؤال ${step + 1} من ${assessmentQuestions.length}`, `Question ${step + 1} of ${assessmentQuestions.length}`)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {t(currentQ.questionAr, currentQ.questionEn)}
            </h3>
            <div className="mt-6 grid gap-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-start text-sm font-medium text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {t(opt.labelAr, opt.labelEn)}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-4 text-sm text-slate-500 hover:text-emerald-700"
              >
                {t("← السابق", "← Previous")}
              </button>
            )}
          </Card>
        ) : (
          recommendation && (
            <div className="animate-fade-in space-y-6">
              <Card className="border-emerald-200 bg-emerald-50/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-600">
                      {t("توصية الذكاء الاصطناعي", "AI Recommendation")}
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {t("ثقة", "Confidence")}: {recommendation.confidence}%
                    </p>
                  </div>
                </div>

                {recommendation.eligibleForGrant && (
                  <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                    {t(
                      `مؤهل لمنحة الابتكار — TRL ${recommendation.trlLevel} — تمويل حتى 70% بحد أقصى 2M ريال`,
                      `Eligible for innovation grant — TRL ${recommendation.trlLevel} — up to 70% funding capped at SAR 2M`
                    )}
                  </div>
                )}

                <div className="mt-4">
                  <h4 className="mb-2 font-semibold text-slate-800">
                    {t("الأسباب", "Reasons")}
                  </h4>
                  <ul className="space-y-1">
                    {recommendation.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {t(r.ar, r.en)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="mb-2 font-semibold text-slate-800">
                    {t("الخطوات التالية", "Next Steps")}
                  </h4>
                  <ul className="space-y-1">
                    {recommendation.nextSteps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                          {i + 1}
                        </span>
                        {t(s.ar, s.en)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Link
                href={pathLinks[recommendation.path] || "/factory"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                {t("متابعة الرحلة", "Continue Journey")}
                <Arrow className="h-5 w-5" />
              </Link>

              <button
                onClick={() => {
                  setStep(0);
                  setAnswers([]);
                  setShowResult(false);
                }}
                className="w-full text-center text-sm text-slate-500 hover:text-emerald-700"
              >
                {t("إعادة التقييم", "Retake Assessment")}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
