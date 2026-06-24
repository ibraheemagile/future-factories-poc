"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Factory,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Store,
} from "lucide-react";
import { useApp } from "@/lib/context";
import { VISION, initiatives, portalStats } from "@/lib/mock-data";
import { Button, Card, CardBody, PageShell, StatusBadge } from "@/components/ui";

const initiativeIcons: Record<string, ReactNode> = {
  transformation: <Factory className="size-5 text-primary" aria-hidden />,
  innovation: <Lightbulb className="size-5 text-gold" aria-hidden />,
  training: <GraduationCap className="size-5 text-info" aria-hidden />,
  marketplace: <Store className="size-5 text-navy" aria-hidden />,
  operations: <LayoutDashboard className="size-5 text-secondary" aria-hidden />,
};

export default function HomePage() {
  const { t, lang } = useApp();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  const entryPoints = [
    {
      href: "/advisor",
      titleAr: "تحديد المسار",
      titleEn: "Path Assessment",
      descAr: "استبيان أولي لتحديد البرنامج المناسب لمنشأتك",
      descEn: "Initial assessment to determine the right program for your entity",
      ref: "FF-INT-001",
      tone: "border-s-primary bg-success-bg/30",
    },
    {
      href: "/factory",
      titleAr: "ملف المصنع",
      titleEn: "Factory Profile",
      descAr: "متابعة طلب FF-2025-0847 — مسار الرقمنة الأساسية",
      descEn: "Track application FF-2025-0847 — basic digitization path",
      ref: "FF-2025-0847",
      tone: "border-s-navy",
    },
    {
      href: "/provider",
      titleAr: "اعتماد مقدم خدمة",
      titleEn: "Provider Registration",
      descAr: "تسجيل واعتماد حسب متطلبات مصانع المستقبل",
      descEn: "Register and approve per Future Factories requirements",
      ref: "SP-REG",
      tone: "border-s-gold bg-gold-light/40",
    },
    {
      href: "/operator",
      titleAr: "لوحة المتابعة",
      titleEn: "Operations",
      descAr: "مراجعة الطلبات والاستثناءات والمنح",
      descEn: "Review applications, exceptions, and grants",
      ref: "OPS",
      tone: "border-s-info bg-info-bg/40",
    },
  ];

  const pocProofPoints = [
    {
      ar: "بوابة موحدة لجميع مبادرات مركز القدرات الصناعية",
      en: "Unified gateway for all Industrial Capabilities Center initiatives",
    },
    {
      ar: "مسار استثماري من التقييم إلى مطابقة مقدمي الخدمات",
      en: "Investor journey from assessment to provider matching",
    },
    {
      ar: "تحقق إلكتروني من متطلبات مقدمي الخدمات حسب البريد الرسمي",
      en: "Electronic verification of provider requirements per official guidelines",
    },
    {
      ar: "لوحة تشغيل تعرض الاستثناءات والمنح والمراحل فقط",
      en: "Operations dashboard surfacing exceptions, grants, and milestones only",
    },
  ];

  const stats = [
    { label: t("مصانع مسجّلة", "Registered Factories"), value: portalStats.registeredFactories.toLocaleString() },
    { label: t("مقدمو خدمات", "Providers"), value: String(portalStats.activeProviders) },
    { label: t("مشاريع نشطة", "Active Projects"), value: String(portalStats.transformationProjects) },
    { label: t("بانتظار المراجعة", "Pending Review"), value: String(portalStats.pendingReviews), highlight: true },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="hero-surface">
        <div className="hero-surface__bg" aria-hidden />
        <div className="hero-surface__content mx-auto max-w-7xl px-4 pb-28 pt-12 md:pb-32 md:pt-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {t(VISION.planningNoteAr, VISION.planningNoteEn)}
            </div>
            <h1 className="mt-6 text-[2rem] font-bold leading-[1.15] tracking-tight text-white md:text-[2.75rem]">
              {t(VISION.titleAr, VISION.titleEn)}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              {t(VISION.subtitleAr, VISION.subtitleEn)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/advisor">
                <Button variant="primary" className="min-h-12 px-6 text-[15px] shadow-md">
                  {t("بدء تحديد المسار", "Start Path Assessment")}
                </Button>
              </Link>
              <Link href="/factory">
                <Button
                  variant="outline"
                  className="min-h-12 border-white/25 bg-white/5 px-6 text-[15px] text-white backdrop-blur-sm hover:bg-white/10"
                >
                  {t("عرض ملف مصنع", "View Factory Profile")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-accent-bar" aria-hidden />
      </section>

      {/* Stats — outside hero so nothing clips or covers them */}
      <div className="hero-stats mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="min-h-[88px] rounded-lg border border-border bg-surface px-4 py-4 shadow-md md:min-h-[96px] md:px-5 md:py-5"
            >
              <p className="text-[11px] font-medium leading-snug text-muted">{s.label}</p>
              <p
                className={`mt-2 text-2xl font-bold leading-none tabular-nums tracking-tight md:text-3xl ${
                  s.highlight ? "text-primary" : "text-navy"
                }`}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <PageShell>
        <div>
          {/* Initiative map */}
          <section className="mb-12">
            <div className="mb-6 flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                {t("منظومة المركز", "Center Ecosystem")}
              </p>
              <h2 className="text-xl font-bold text-navy md:text-2xl">
                {t("خريطة المبادرات", "Initiative Map")}
              </h2>
              <p className="max-w-xl text-sm text-muted">
                {t(
                  "مسارات المركز الخمسة — تحول، ابتكار، تدريب، سوق، وتشغيل",
                  "Five center tracks — transformation, innovation, training, marketplace, and operations"
                )}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {initiatives.map((init, i) => (
                <Card
                  key={init.id}
                  className="group transition-shadow duration-200 hover:shadow-md"
                >
                  <CardBody className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-md border border-border-subtle bg-background transition-colors duration-200 group-hover:border-primary/20 group-hover:bg-success-bg/30">
                        {initiativeIcons[init.id]}
                      </div>
                      <span className="text-xs font-bold tabular-nums text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-semibold leading-snug text-navy">
                      {t(init.titleAr, init.titleEn)}
                    </h3>
                    <p className="flex-1 text-xs leading-relaxed text-muted">
                      {t(init.descriptionAr, init.descriptionEn)}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>

          {/* Executive summary */}
          <section className="mb-12">
            <Card elevated className="overflow-hidden">
              <div className="grid md:grid-cols-5">
                <div className="border-b border-border-subtle bg-navy px-6 py-8 text-white md:col-span-2 md:border-b-0 md:border-e">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                    {t("الملخص التنفيذي", "Executive Summary")}
                  </p>
                  <h2 className="mt-3 text-xl font-bold leading-snug">
                    {t("ما يثبته هذا النموذج الأولي", "What This POC Demonstrates")}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {t(
                      "مفهوم منتج قابل للنقر — وليس نظاماً تشغيلياً كاملاً.",
                      "A clickable product concept — not a fully operational system."
                    )}
                  </p>
                </div>
                <CardBody className="md:col-span-3">
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {pocProofPoints.map((point) => (
                      <li key={point.en} className="flex gap-3 text-sm leading-relaxed text-secondary">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        {t(point.ar, point.en)}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </div>
            </Card>
          </section>

          {/* System access — card grid, not table */}
          <section>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                {t("الدخول", "Access")}
              </p>
              <h2 className="mt-1 text-xl font-bold text-navy md:text-2xl">
                {t("الدخول للنظام", "System Access")}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {entryPoints.map((ep) => (
                <Link
                  key={ep.href}
                  href={ep.href}
                  className={`group flex cursor-pointer flex-col rounded-lg border border-border border-s-4 bg-surface p-5 shadow-sm transition-all duration-200 hover:border-navy/20 hover:shadow-md ${ep.tone}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <StatusBadge tone="gold">{ep.ref}</StatusBadge>
                      <h3 className="mt-3 text-base font-semibold text-navy group-hover:text-primary">
                        {t(ep.titleAr, ep.titleEn)}
                      </h3>
                    </div>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors duration-200 group-hover:border-primary group-hover:bg-success-bg group-hover:text-primary">
                      <Chevron className="size-4" aria-hidden />
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {t(ep.descAr, ep.descEn)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    {t("فتح", "Open")}
                    <Arrow className="size-3.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </PageShell>
    </div>
  );
}
