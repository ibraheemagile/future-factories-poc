"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { assessmentQuestions } from "@/lib/mock-data";
import { analyzeAssessment } from "@/lib/ai-engine";
import type { AssessmentAnswer, InitiativePath } from "@/lib/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DecisionCard,
  PageShell,
  ProgressLine,
  SelectableCard,
  StatusBadge,
} from "@/components/ui";

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

function previewPath(answers: AssessmentAnswer[]): InitiativePath | null {
  const primary = answers.find((a) => a.questionId === "primary_need")?.value;
  const trl = Number(answers.find((a) => a.questionId === "trl_level")?.value || 0);
  const hasProto = answers.find((a) => a.questionId === "has_prototype")?.value === "yes";
  if (primary === "innovation" || (trl >= 4 && trl <= 7 && hasProto)) return "innovation";
  if (primary === "training") return "training";
  if (primary === "provider") return "marketplace";
  if (answers.length >= 2) return "transformation";
  return null;
}

export default function AdvisorPage() {
  const { t } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentQ = assessmentQuestions[step];
  const progress = Math.round(((step + (showResult ? 1 : 0)) / assessmentQuestions.length) * 100);
  const recommendation = showResult ? analyzeAssessment(answers) : null;
  const livePreview = useMemo(() => previewPath(answers), [answers]);
  const currentAnswer = answers.find((a) => a.questionId === currentQ?.id)?.value;

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
    <PageShell
      eyebrow={t("الاستبيان", "Survey")}
      title={t("تحديد المسار — استبيان أولي", "Path Assessment — Initial Survey")}
      subtitle={t(
        "نموذج FF-INT-001 — يُستخدم لتحديد البرنامج والمسار المناسب",
        "Form FF-INT-001 — used to determine the appropriate program and path"
      )}
    >
      {/* Journey tracker */}
      <Card className="mb-6">
        <CardBody>
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
            <div className="mt-4 flex flex-wrap gap-2">
              {stepLabels.map((label, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <StatusBadge
                    key={label}
                    tone={done ? "success" : active ? "info" : "neutral"}
                  >
                    {label}
                  </StatusBadge>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>

      {!showResult ? (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Question card */}
          <Card className="lg:col-span-3">
            <CardHeader
              title={t(currentQ.questionAr, currentQ.questionEn)}
              subtitle={t(`الخطوة ${step + 1}`, `Step ${step + 1}`)}
            />
            <CardBody>
              <fieldset className="flex flex-col gap-3">
                <legend className="sr-only">{t(currentQ.questionAr, currentQ.questionEn)}</legend>
                {currentQ.options.map((opt) => (
                  <SelectableCard
                    key={opt.value}
                    selected={currentAnswer === opt.value}
                    onClick={() => handleAnswer(opt.value)}
                  >
                    {t(opt.labelAr, opt.labelEn)}
                  </SelectableCard>
                ))}
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
            </CardBody>
          </Card>

          {/* Live routing preview */}
          <Card className="lg:col-span-2">
            <CardHeader
              title={t("معاينة التوجيه", "Routing Preview")}
              subtitle={t("تتحدث مع كل إجابة", "Updates with each answer")}
            />
            <CardBody>
              {livePreview ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      {t("المسار المتوقع", "Expected Path")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-navy">
                      {t(pathLabels[livePreview].ar, pathLabels[livePreview].en)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      {t("الإجابات المُدخلة", "Answers Provided")}
                    </p>
                    <ul className="mt-2 flex flex-col gap-2">
                      {answers.map((a) => {
                        const q = assessmentQuestions.find((q) => q.id === a.questionId);
                        const opt = q?.options.find((o) => o.value === a.value);
                        return (
                          <li key={a.questionId} className="text-xs text-secondary">
                            <span className="font-medium text-navy">
                              {q ? t(q.shortAr, q.shortEn) : a.questionId}:
                            </span>{" "}
                            {opt ? t(opt.labelAr, opt.labelEn) : String(a.value)}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <StatusBadge tone="info">
                    {t("توصية أولية — تُؤكد بعد الاكتمال", "Preliminary — confirmed on completion")}
                  </StatusBadge>
                </div>
              ) : (
                <p className="text-sm text-muted">
                  {t(
                    "أجب على سؤالين على الأقل لعرض المسار المتوقع",
                    "Answer at least two questions to preview the expected path"
                  )}
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      ) : (
        recommendation && (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="flex flex-col gap-4 lg:col-span-3">
              <DecisionCard
                title={t("مذكرة التوجيه الرسمية", "Official Routing Memo")}
                tone="success"
              >
                <p className="mb-4 text-base font-semibold text-navy">
                  {t(pathLabels[recommendation.path].ar, pathLabels[recommendation.path].en)}
                </p>
                <p className="text-xs text-muted">
                  {t("درجة الثقة في التوجيه", "Routing confidence")}:{" "}
                  <span className="font-semibold tabular-nums text-navy">
                    {recommendation.confidence}%
                  </span>
                </p>
              </DecisionCard>

              {recommendation.eligibleForGrant && (
                <DecisionCard title={t("أهلية المنحة", "Grant Eligibility")} tone="warning">
                  {t(
                    `مؤهل لمنحة المصانع الابتكارية — TRL ${recommendation.trlLevel} — تمويل حتى 70% (حد أقصى 2,000,000 ريال)`,
                    `Eligible for Innovation Factory Grant — TRL ${recommendation.trlLevel} — up to 70% (max SAR 2,000,000)`
                  )}
                </DecisionCard>
              )}

              <Card>
                <CardHeader title={t("مبررات التوجيه", "Routing Rationale")} />
                <CardBody>
                  <ol className="flex list-decimal flex-col gap-2 ps-5 text-sm text-secondary">
                    {recommendation.reasons.map((r, i) => (
                      <li key={i}>{t(r.ar, r.en)}</li>
                    ))}
                  </ol>
                </CardBody>
              </Card>

              <Card>
                <CardHeader title={t("الإجراءات المطلوبة", "Required Actions")} />
                <CardBody>
                  <ol className="flex list-decimal flex-col gap-2 ps-5 text-sm text-secondary">
                    {recommendation.nextSteps.map((s, i) => (
                      <li key={i}>{t(s.ar, s.en)}</li>
                    ))}
                  </ol>
                </CardBody>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Link href={pathLinks[recommendation.path] || "/factory"}>
                  <Button variant="primary">{t("متابعة إلى الملف", "Continue to Profile")}</Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(0);
                    setAnswers([]);
                    setShowResult(false);
                  }}
                >
                  {t("إعادة الاستبيان", "Retake Survey")}
                </Button>
              </div>
            </div>

            <Card className="lg:col-span-2">
              <CardHeader title={t("ملخص القرار", "Decision Summary")} />
              <CardBody className="flex flex-col gap-4">
                <div>
                  <p className="text-xs text-muted">{t("المسار", "Path")}</p>
                  <p className="mt-1 text-sm font-semibold text-navy">
                    {t(pathLabels[recommendation.path].ar, pathLabels[recommendation.path].en)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted">{t("الثقة", "Confidence")}</p>
                  <ProgressLine value={recommendation.confidence} />
                </div>
                <StatusBadge tone="success">
                  {t("توصية النظام — جاهزة للمتابعة", "System recommendation — ready to proceed")}
                </StatusBadge>
              </CardBody>
            </Card>
          </div>
        )
      )}
    </PageShell>
  );
}
