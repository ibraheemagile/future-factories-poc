"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Boxes,
  Factory,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  ShieldCheck,
  Store,
} from "lucide-react";
import { useApp } from "@/lib/context";
import { VISION, initiatives, portalStats } from "@/lib/mock-data";
import { Button, Card, CardBody } from "@/components/ui";
import { JourneyMap } from "@/components/JourneyMap";

const initiativeIcons: Record<string, ReactNode> = {
  transformation: <Factory className="size-5" aria-hidden />,
  innovation: <Lightbulb className="size-5" aria-hidden />,
  training: <GraduationCap className="size-5" aria-hidden />,
  marketplace: <Store className="size-5" aria-hidden />,
  operations: <LayoutDashboard className="size-5" aria-hidden />,
};

const initiativeAccent: Record<string, string> = {
  transformation: "text-primary bg-success-bg",
  innovation: "text-gold bg-gold-light",
  training: "text-info bg-info-bg",
  marketplace: "text-navy bg-border-subtle",
  operations: "text-secondary bg-border-subtle",
};

export default function HomePage() {
  const { t, lang } = useApp();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const pillars = [
    {
      icon: <Boxes className="size-5" aria-hidden />,
      titleAr: "توحيد المبادرات",
      titleEn: "Consolidate",
      descAr: "كل برامج المركز — التحول، الابتكار، التدريب، والسوق — في منصة واحدة.",
      descEn: "Every center program — transformation, innovation, training, marketplace — in one platform.",
    },
    {
      icon: <Bot className="size-5" aria-hidden />,
      titleAr: "أتمتة كاملة",
      titleEn: "Automate",
      descAr: "تحقق إلكتروني وربط حكومي يقلّل التدخل البشري والأخطاء والتأخير.",
      descEn: "Electronic verification and government integration cut human intervention, errors, and delays.",
    },
    {
      icon: <Gauge className="size-5" aria-hidden />,
      titleAr: "رحلة مخصّصة",
      titleEn: "Personalize",
      descAr: "توجيه ذكي يرسم رحلة كل منشأة حسب قطاعها ونضجها الرقمي وأهليتها.",
      descEn: "Smart routing tailors each entity's journey by sector, digital maturity, and eligibility.",
    },
  ];

  const stats = [
    { label: t("مصانع مسجّلة", "Registered Factories"), value: portalStats.registeredFactories.toLocaleString() },
    { label: t("مقدمو خدمات", "Providers"), value: String(portalStats.activeProviders) },
    { label: t("مشاريع تحول", "Transformation Projects"), value: "300+" },
    { label: t("بانتظار المراجعة", "Pending Review"), value: String(portalStats.pendingReviews), highlight: true },
  ];

  return (
    <div>
      {/* ——— Hero ——— */}
      <section className="hero-surface">
        <div className="hero-surface__bg" aria-hidden />
        <div className="hero-surface__content mx-auto max-w-7xl px-4 pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                {t(VISION.planningNoteAr, VISION.planningNoteEn)}
              </div>
              <h1 className="mt-6 text-[2.1rem] font-bold leading-[1.12] tracking-tight text-white md:text-[3rem]">
                {t("منصة واحدة", "One platform")}{" "}
                <span className="bg-gradient-to-l from-primary to-[#2fb56a] bg-clip-text text-transparent">
                  {t("لكل رحلة صناعية", "for every industrial journey")}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                {t(
                  "نوحّد مبادرات مركز القدرات الصناعية ونُؤتمت رحلة المستثمر بالكامل — من التقييم الذاتي إلى المنحة والتنفيذ والمنارة الصناعية.",
                  "We unify the Industrial Capabilities Center's initiatives and automate the full investor journey — from self-assessment to grant, implementation, and Industrial Lighthouse."
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/advisor">
                  <Button variant="primary" className="min-h-12 px-6 text-[15px]">
                    {t("ابدأ رحلتك", "Start Your Journey")}
                    <Arrow className="size-4" aria-hidden />
                  </Button>
                </Link>
                <Link href="/factory">
                  <Button
                    variant="outline"
                    className="min-h-12 border-white/25 bg-white/5 px-6 text-[15px] text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10"
                  >
                    {t("استعراض ملف مصنع", "View a Factory Profile")}
                  </Button>
                </Link>
              </div>
              {/* Trust line */}
              <div className="mt-8 flex items-center gap-2 text-xs text-white/45">
                <ShieldCheck className="size-4 text-primary" aria-hidden />
                {t(
                  "وزارة الصناعة والثروة المعدنية — برنامج مصانع المستقبل",
                  "Ministry of Industry and Mineral Resources — Future Factories Program"
                )}
              </div>
            </div>

            {/* Hero stat panel */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm md:p-5"
                  >
                    <p className="text-[11px] font-medium leading-snug text-white/50">{s.label}</p>
                    <p
                      className={`mt-2 text-2xl font-bold leading-none tabular-nums tracking-tight md:text-[2rem] ${
                        s.highlight ? "text-gold" : "text-white"
                      }`}
                    >
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-accent-bar" aria-hidden />
      </section>

      {/* ——— Signature: The Journey ——— */}
      <section className="bg-navy-deep">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              {t("جوهر المنصة", "The Core")}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              {t("رحلة واحدة متصلة — وليست نموذجاً حكومياً", "One continuous journey — not a government form")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
              {t(
                "اضغط على أي مرحلة لاستكشافها. كل خطوة مؤتمتة ومخصّصة، مع نظام نقاط يحفّز التقدم.",
                "Tap any stage to explore it. Every step is automated and personalized, with points that reward progress."
              )}
            </p>
          </div>
          <JourneyMap />
        </div>
      </section>

      {/* ——— Pillars ——— */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            {t("لماذا المنصة", "Why This Platform")}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
            {t("ثلاث ركائز للتحول", "Three pillars of transformation")}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.titleEn} className="transition-shadow duration-200 hover:shadow-md">
              <CardBody className="flex flex-col gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-white">
                  {p.icon}
                </span>
                <h3 className="text-lg font-semibold text-navy">{t(p.titleAr, p.titleEn)}</h3>
                <p className="text-sm leading-relaxed text-muted">{t(p.descAr, p.descEn)}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* ——— Initiative tracks ——— */}
      <section className="border-y border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <div className="mb-8 flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              {t("منظومة المركز", "Center Ecosystem")}
            </p>
            <h2 className="text-2xl font-bold text-navy md:text-3xl">
              {t("خمسة مسارات موحّدة", "Five unified tracks")}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {initiatives.map((init, i) => (
              <Card key={init.id} className="group transition-shadow duration-200 hover:shadow-md">
                <CardBody className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex size-11 items-center justify-center rounded-xl ${
                        initiativeAccent[init.id] ?? "bg-border-subtle text-navy"
                      }`}
                    >
                      {initiativeIcons[init.id]}
                    </span>
                    <span className="text-xs font-bold tabular-nums text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-semibold leading-snug text-navy">{t(init.titleAr, init.titleEn)}</h3>
                  <p className="text-xs leading-relaxed text-muted">
                    {t(init.descriptionAr, init.descriptionEn)}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CTA band ——— */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-l from-navy to-navy-light px-6 py-10 shadow-md md:px-12 md:py-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {t("جاهز لاكتشاف مسارك؟", "Ready to discover your path?")}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
                {t(
                  "أجب عن بضعة أسئلة، وسيحدّد النظام البرنامج الأنسب لمنشأتك خلال دقيقة.",
                  "Answer a few questions and the system maps the best program for your entity in under a minute."
                )}
              </p>
            </div>
            <Link href="/advisor" className="shrink-0">
              <Button variant="primary" className="min-h-12 px-7 text-[15px]">
                {t("بدء تحديد المسار", "Start Assessment")}
                <Arrow className="size-4" aria-hidden />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
