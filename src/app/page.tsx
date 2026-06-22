"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Factory,
  GraduationCap,
  Lightbulb,
  Sparkles,
  Store,
  AlertCircle,
} from "lucide-react";
import { useApp } from "@/lib/context";
import { VISION, initiatives } from "@/lib/mock-data";
import { Card, Badge } from "@/components/ui";

const iconMap: Record<string, React.ElementType> = {
  factory: Factory,
  lightbulb: Lightbulb,
  graduation: GraduationCap,
  store: Store,
};

const personas = [
  {
    href: "/factory",
    icon: Factory,
    titleAr: "مصنع / مستثمر",
    titleEn: "Factory / Investor",
    descAr: "ابدأ التقييم الذاتي، احصل على المنح، وطابق مع مقدمي الخدمات",
    descEn: "Start self-assessment, access grants, and match with service providers",
    color: "emerald",
  },
  {
    href: "/provider",
    icon: Store,
    titleAr: "مقدم خدمات",
    titleEn: "Service Provider",
    descAr: "سجّل حلولك، أكمل التحقق، وانضم لسوق المصانع",
    descEn: "Register solutions, complete verification, join the factory marketplace",
    color: "blue",
  },
  {
    href: "/operator",
    icon: Sparkles,
    titleAr: "فريق التشغيل",
    titleEn: "Program Operator",
    descAr: "راجع الاستثناءات، تتبع المراحل، وأدر المنح والتحقق",
    descEn: "Review exceptions, track milestones, manage grants and verification",
    color: "amber",
  },
];

export default function HomePage() {
  const { t, lang } = useApp();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 px-4 py-16 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white/10" />
        </div>
        <div className="relative mx-auto max-w-5xl text-center">
          <Badge variant="info">
            <span className="text-blue-800">
              {t(VISION.planningNoteAr, VISION.planningNoteEn)}
            </span>
          </Badge>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            {t(VISION.titleAr, VISION.titleEn)}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-emerald-100">
            {t(VISION.subtitleAr, VISION.subtitleEn)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/advisor"
              className="pulse-glow inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              <Sparkles className="h-5 w-5" />
              {t("ابدأ مع المستشار الذكي", "Start with AI Advisor")}
            </Link>
            <Link
              href="/pitch"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {t("عرض الرؤية", "View Vision")}
            </Link>
          </div>
        </div>
      </section>

      {/* Problem → Promise */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-red-100 bg-red-50/50">
            <div className="mb-3 flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-bold">{t("المشكلة الحالية", "Current Problem")}</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>{t("• مبادرات وبرامج متفرقة في أنظمة مختلفة", "• Fragmented initiatives across different systems")}</li>
              <li>{t("• عمليات يدوية: استبيانات، إيميلات، مراجعة مستندات", "• Manual processes: surveys, emails, document review")}</li>
              <li>{t("• تدخل بشري عالي → أخطاء وتأخير", "• High human intervention → errors and delays")}</li>
              <li>{t("• صعوبة مطابقة المصانع مع مقدمي الخدمات", "• Difficulty matching factories with service providers")}</li>
            </ul>
          </Card>
          <Card className="border-emerald-100 bg-emerald-50/50">
            <div className="mb-3 flex items-center gap-2 text-emerald-700">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-bold">{t("الوعد", "The Promise")}</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>{t("• منصة واحدة لكل مبادرات المركز", "• One platform for all center initiatives")}</li>
              <li>{t("• رحلة ذكية من التقييم إلى التنفيذ والمنارة", "• Smart journey from assessment to implementation and Lighthouse")}</li>
              <li>{t("• تحقق آلي + مطابقة AI + مراجعة استثنائية فقط", "• Auto-verification + AI matching + exception-only review")}</li>
              <li>{t("• تجربة تفاعلية (Gamification) بدل النماذج التقليدية", "• Interactive gamified experience instead of traditional forms")}</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Initiatives Gateway */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
          {t("بوابة المبادرات الموحدة", "Unified Initiative Gateway")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {initiatives.map((init) => {
            const Icon = iconMap[init.icon] || Factory;
            return (
              <Card
                key={init.id}
                className="group transition hover:border-emerald-300 hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900">
                  {t(init.titleAr, init.titleEn)}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {t(init.descriptionAr, init.descriptionEn)}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {init.programs.map((p) => (
                    <Badge key={p} variant="default">
                      {p}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Persona Selection */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
          {t("اختر رحلتك", "Choose Your Journey")}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <Link key={p.href} href={p.href} className="group">
                <Card className="h-full transition group-hover:border-emerald-400 group-hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t(p.titleAr, p.titleEn)}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {t(p.descAr, p.descEn)}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald-700">
                    {t("ابدأ", "Start")}
                    <Arrow className="h-4 w-4" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
