"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Layers,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useApp } from "@/lib/context";
import { VISION } from "@/lib/mock-data";
import { Card, SectionTitle } from "@/components/ui";

export default function PitchPage() {
  const { t, lang } = useApp();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const pillars = [
    {
      icon: Layers,
      titleAr: "التوحيد",
      titleEn: "Consolidation",
      descAr: "منصة واحدة لكل مبادرات المركز: التحول الصناعي، الابتكار، التدريب، ومقدمي الخدمات",
      descEn: "One platform for all center initiatives: transformation, innovation, training, and service providers",
    },
    {
      icon: Zap,
      titleAr: "الأتمتة",
      titleEn: "Automation",
      descAr: "تحقق آلي من المستندات، مطابقة ذكية، ومراجعة استثنائية فقط — تقليل الأخطاء والتدخل البشري",
      descEn: "Auto document verification, smart matching, exception-only review — reduce errors and human intervention",
    },
    {
      icon: Sparkles,
      titleAr: "الذكاء الاصطناعي",
      titleEn: "Artificial Intelligence",
      descAr: "توجيه المستخدم، تصنيف الأهلية، مطابقة مقدمي الخدمات، وملخصات تلقائية لفريق التشغيل",
      descEn: "User guidance, eligibility classification, provider matching, and auto-summaries for operations team",
    },
    {
      icon: Target,
      titleAr: "التفاعل (Gamification)",
      titleEn: "Gamification",
      descAr: "نقاط جاهزية، شارات، خريطة رحلة، ومراحل واضحة — تجربة تفاعلية بدل النماذج التقليدية",
      descEn: "Readiness scores, badges, journey maps, clear milestones — interactive experience instead of traditional forms",
    },
  ];

  const mvpPhases = [
    {
      phase: "Phase 1",
      titleAr: "البوابة الموحدة + التقييم الذاتي",
      titleEn: "Unified Gateway + Self-Assessment",
      itemsAr: [
        "تسجيل المستخدمين والمصانع",
        "بوابة المبادرات",
        "التقييم الذاتي والمستشار الذكي",
        "لوحة تقدم أساسية",
      ],
      itemsEn: [
        "User & factory registration",
        "Initiative gateway",
        "Self-assessment & AI advisor",
        "Basic progress dashboard",
      ],
    },
    {
      phase: "Phase 2",
      titleAr: "السوق + التحقق الآلي",
      titleEn: "Marketplace + Auto-Verification",
      itemsAr: [
        "تسجيل مقدمي الخدمات",
        "التحقق الآلي من المستندات",
        "مطابقة AI بين المصانع والمزودين",
        "تكامل مع أنظمة حكومية (السجل التجاري)",
      ],
      itemsEn: [
        "Service provider registration",
        "Automated document verification",
        "AI factory-provider matching",
        "Government system integration (CR)",
      ],
    },
    {
      phase: "Phase 3",
      titleAr: "المنح + التشغيل الكامل",
      titleEn: "Grants + Full Operations",
      itemsAr: [
        "مسار منح الابتكار (TRL 4-7)",
        "إدارة المراحل والدفعات",
        "لوحة تشغيل استثنائية",
        "تكامل مع هيئة الابتكار ومنصة صناعي",
      ],
      itemsEn: [
        "Innovation grant path (TRL 4-7)",
        "Milestone & disbursement management",
        "Exception-based operations dashboard",
        "Integration with Innovation Authority & Sinaee platform",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <SectionTitle
        title={t("عرض الرؤية — POC", "Vision Pitch — POC")}
        subtitle={t(
          "منصة المبادرات الصناعية الذكية — عرض توضيحي لمرحلة التخطيط",
          "AI-Guided Industrial Initiatives Platform — planning phase concept demo"
        )}
      />

      {/* Vision Statement */}
      <Card className="mb-8 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
        <h3 className="text-2xl font-bold text-emerald-900">
          {t(VISION.titleAr, VISION.titleEn)}
        </h3>
        <p className="mt-2 text-slate-600">
          {t(VISION.subtitleAr, VISION.subtitleEn)}
        </p>
        <p className="mt-4 rounded-lg bg-white/60 p-3 text-sm italic text-slate-500">
          {t(VISION.planningNoteAr, VISION.planningNoteEn)}
        </p>
      </Card>

      {/* Four Pillars */}
      <h3 className="mb-4 text-xl font-bold text-slate-900">
        {t("الركائز الأربع", "Four Pillars")}
      </h3>
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.titleEn}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900">
                {t(p.titleAr, p.titleEn)}
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                {t(p.descAr, p.descEn)}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Success Criteria */}
      <Card className="mb-10">
        <h3 className="mb-4 text-xl font-bold text-slate-900">
          {t("معايير النجاح", "Success Criteria")}
        </h3>
        <ul className="space-y-2">
          {[
            {
              ar: "توحيد كل المبادرات في منصة واحدة",
              en: "Consolidate all initiatives in one platform",
            },
            {
              ar: "تقليل المراجعة اليدوية ومعالجة المستندات",
              en: "Reduce manual review and document handling",
            },
            {
              ar: "مطابقة أفضل بين المصانع ومقدمي الخدمات",
              en: "Better matching between factories and service providers",
            },
            {
              ar: "تجربة أوضح وأبسط للمستثمر/المصنع",
              en: "Clearer, simpler experience for investors/factories",
            },
            {
              ar: "استخدام عملي للذكاء الاصطناعي والتفاعل — ليس زينة",
              en: "Practical AI and gamification — not decorative",
            },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {t(item.ar, item.en)}
            </li>
          ))}
        </ul>
      </Card>

      {/* MVP Roadmap */}
      <h3 className="mb-4 text-xl font-bold text-slate-900">
        {t("خارطة طريق MVP", "MVP Roadmap")}
      </h3>
      <div className="mb-10 space-y-4">
        {mvpPhases.map((phase) => (
          <Card key={phase.phase}>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
                {phase.phase}
              </span>
              <h4 className="font-bold text-slate-900">
                {t(phase.titleAr, phase.titleEn)}
              </h4>
            </div>
            <ul className="mt-3 space-y-1">
              {(lang === "ar" ? phase.itemsAr : phase.itemsEn).map(
                (item, i) => (
                  <li key={i} className="text-sm text-slate-600">
                    • {item}
                  </li>
                )
              )}
            </ul>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/advisor"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          {t("جرّب المستشار الذكي", "Try AI Advisor")}
          <Arrow className="h-5 w-5" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          {t("العودة للرئيسية", "Back to Home")}
        </Link>
      </div>
    </div>
  );
}
