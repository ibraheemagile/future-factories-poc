"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";
import { VISION, initiatives, portalStats } from "@/lib/mock-data";
import { Panel, Stat, Tag } from "@/components/ui";

export default function HomePage() {
  const { t, lang } = useApp();

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

  return (
    <div>
      {/* Portal header */}
      <section className="hero-pattern px-4 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <Tag tone="amber">
            <span className="text-[#7a6530]">{t(VISION.planningNoteAr, VISION.planningNoteEn)}</span>
          </Tag>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            {t(VISION.titleAr, VISION.titleEn)}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/75">
            {t(VISION.subtitleAr, VISION.subtitleEn)}
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="mx-auto max-w-6xl px-4 -mt-6">
        <div className="grid grid-cols-2 gap-px bg-[var(--border)] md:grid-cols-4">
          <Stat
            label={t("مصانع مسجّلة", "Registered Factories")}
            value={portalStats.registeredFactories.toLocaleString()}
          />
          <Stat
            label={t("مقدمو خدمات معتمدون", "Approved Providers")}
            value={portalStats.activeProviders}
          />
          <Stat
            label={t("مشاريع تحول نشطة", "Active Projects")}
            value={portalStats.transformationProjects}
          />
          <Stat
            label={t("بانتظار المراجعة", "Pending Review")}
            value={portalStats.pendingReviews}
            sub={t("يتطلب إجراء", "Action required")}
          />
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-4 text-base font-semibold text-[var(--navy)]">
          {t("برامج ومبادرات المركز", "Center Programs & Initiatives")}
        </h2>
        <div className="grid gap-px bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
          {initiatives.map((init) => (
            <div key={init.id} className="bg-white p-5">
              <h3 className="font-semibold text-[var(--navy)]">
                {t(init.titleAr, init.titleEn)}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                {t(init.descriptionAr, init.descriptionEn)}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {init.programs.map((p) => (
                  <Tag key={p}>{p}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Entry points */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <Panel title={t("الدخول للنظام", "System Access")}>
          <div className="divide-y divide-[var(--border)]">
            {entryPoints.map((ep) => (
              <Link
                key={ep.href}
                href={ep.href}
                className="flex items-center justify-between gap-4 py-4 transition hover:bg-[#fafbfc] -mx-5 px-5 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-[var(--navy)]">
                    {t(ep.titleAr, ep.titleEn)}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">
                    {t(ep.descAr, ep.descEn)}
                  </p>
                </div>
                <div className="shrink-0 text-start">
                  <Tag tone="blue">{ep.ref}</Tag>
                  <p className="mt-1 text-xs text-[var(--gold)]">
                    {lang === "ar" ? "← فتح" : "Open →"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
