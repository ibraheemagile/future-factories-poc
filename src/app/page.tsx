"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Factory, GraduationCap, LayoutDashboard, Lightbulb, Store } from "lucide-react";
import { useApp } from "@/lib/context";
import { VISION, initiatives, portalStats } from "@/lib/mock-data";
import {
  Button,
  Card,
  CardBody,
  DataTable,
  MetricCard,
  PageShell,
  StatusBadge,
} from "@/components/ui";

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

  const entryPoints = [
    {
      href: "/advisor",
      titleAr: "تحديد المسار",
      titleEn: "Path Assessment",
      descAr: "استبيان أولي لتحديد البرنامج المناسب",
      descEn: "Initial assessment to determine the right program",
      ref: "FF-INT-001",
    },
    {
      href: "/factory",
      titleAr: "ملف المصنع",
      titleEn: "Factory Profile",
      descAr: "متابعة طلب FF-2025-0847 — مسار الرقمنة",
      descEn: "Track application FF-2025-0847 — digitization path",
      ref: "FF-2025-0847",
    },
    {
      href: "/provider",
      titleAr: "اعتماد مقدم خدمة",
      titleEn: "Provider Registration",
      descAr: "تسجيل واعتماد حسب متطلبات مصانع المستقبل",
      descEn: "Register per Future Factories requirements",
      ref: "SP-REG",
    },
    {
      href: "/operator",
      titleAr: "لوحة المتابعة",
      titleEn: "Operations",
      descAr: "مراجعة الطلبات والاستثناءات",
      descEn: "Review applications and exceptions",
      ref: "OPS",
    },
  ];

  const pocProofPoints = [
    {
      ar: "بوابة موحدة لجميع مبادرات مركز القدرات الصناعية",
      en: "Unified gateway for all Industrial Capabilities Center initiatives",
    },
    {
      ar: "مسار استثماري آلي من التقييم إلى مطابقة مقدمي الخدمات",
      en: "Automated investor journey from assessment to provider matching",
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

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-navy/10 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <StatusBadge tone="gold">
            <span className="text-gold">{t(VISION.planningNoteAr, VISION.planningNoteEn)}</span>
          </StatusBadge>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            {t(VISION.titleAr, VISION.titleEn)}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {t(VISION.subtitleAr, VISION.subtitleEn)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/advisor">
              <Button variant="primary">{t("بدء تحديد المسار", "Start Path Assessment")}</Button>
            </Link>
            <Link href="/factory">
              <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                {t("عرض ملف مصنع", "View Factory Profile")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PageShell>
        {/* Metrics */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label={t("مصانع مسجّلة", "Registered Factories")}
            value={portalStats.registeredFactories.toLocaleString()}
          />
          <MetricCard
            label={t("مقدمو خدمات معتمدون", "Approved Providers")}
            value={portalStats.activeProviders}
          />
          <MetricCard
            label={t("مشاريع تحول نشطة", "Active Projects")}
            value={portalStats.transformationProjects}
          />
          <MetricCard
            label={t("بانتظار المراجعة", "Pending Review")}
            value={portalStats.pendingReviews}
            sub={t("يتطلب إجراء", "Action required")}
          />
        </div>

        {/* Initiative map */}
        <section className="mb-10">
          <h2 className="mb-1 text-lg font-semibold text-navy">
            {t("خريطة المبادرات", "Initiative Map")}
          </h2>
          <p className="mb-6 text-sm text-muted">
            {t(
              "مسارات المركز الخمسة — تحول، ابتكار، تدريب، سوق، وتشغيل",
              "Five center tracks — transformation, innovation, training, marketplace, and operations"
            )}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {initiatives.map((init) => (
              <Card key={init.id} className="flex flex-col">
                <CardBody className="flex flex-1 flex-col gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-border-subtle">
                    {initiativeIcons[init.id]}
                  </div>
                  <h3 className="font-semibold text-navy">{t(init.titleAr, init.titleEn)}</h3>
                  <p className="flex-1 text-xs leading-relaxed text-muted">
                    {t(init.descriptionAr, init.descriptionEn)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {init.programs.slice(0, 2).map((p) => (
                      <StatusBadge key={p} tone="neutral">
                        {p}
                      </StatusBadge>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Executive summary */}
        <section className="mb-10">
          <Card elevated>
            <CardBody>
              <h2 className="text-lg font-semibold text-navy">
                {t("ما يثبته هذا النموذج الأولي", "What This POC Demonstrates")}
              </h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {pocProofPoints.map((point) => (
                  <li key={point.en} className="flex gap-3 text-sm text-secondary">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                    {t(point.ar, point.en)}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </section>

        {/* System access */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-navy">
            {t("الدخول للنظام", "System Access")}
          </h2>
          <DataTable
            headers={[
              t("الخدمة", "Service"),
              t("الوصف", "Description"),
              t("المرجع", "Reference"),
              "",
            ]}
            rows={entryPoints.map((ep) => [
              <span key={`t-${ep.href}`} className="font-medium text-navy">
                {t(ep.titleAr, ep.titleEn)}
              </span>,
              t(ep.descAr, ep.descEn),
              <StatusBadge key={`r-${ep.href}`} tone="gold">
                {ep.ref}
              </StatusBadge>,
              <Link
                key={`l-${ep.href}`}
                href={ep.href}
                className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-primary transition-colors duration-200 hover:text-primary-hover"
              >
                {t("فتح", "Open")}
                <Arrow className="size-3.5" aria-hidden />
              </Link>,
            ])}
          />
        </section>
      </PageShell>
    </div>
  );
}
