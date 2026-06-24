"use client";

import Link from "next/link";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { useApp } from "@/lib/context";
import { BrandMark } from "@/components/BrandMark";
import { VISION } from "@/lib/mock-data";

const programLinks = [
  { ar: "مصانع المستقبل", en: "Future Factories" },
  { ar: "منح الابتكار", en: "Innovation Grants" },
  { ar: "مؤشر سيري", en: "SERI Index" },
  { ar: "سوق مقدمي الخدمات", en: "Provider Marketplace" },
];

const portalLinks = [
  { href: "/advisor", labelAr: "تحديد المسار", labelEn: "Path Assessment" },
  { href: "/factory", labelAr: "ملف المصنع", labelEn: "Factory Profile" },
  { href: "/provider", labelAr: "اعتماد مقدم خدمة", labelEn: "Provider Registration" },
  { href: "/operator", labelAr: "لوحة المتابعة", labelEn: "Operations" },
];

export function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-4 border-gold bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-start gap-4">
              <BrandMark variant="inverse" />
              <div>
                <p className="text-base font-semibold leading-snug">
                  {t("مركز القدرات الصناعية", "Industrial Capabilities Center")}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  {t("بوابة المبادرات الصناعية", "Industrial Initiatives Portal")}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {t(
                "منصة موحدة لبرامج التحول الصناعي — مصانع المستقبل، منح الابتكار، التدريب، ومقدمي الحلول.",
                "Unified platform for industrial transformation programs — Future Factories, innovation grants, training, and solution providers."
              )}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-medium text-white/85">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {t(VISION.planningNoteAr, VISION.planningNoteEn)}
            </div>
          </div>

          {/* Programs */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gold">
              {t("البرامج", "Programs")}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {programLinks.map((item) => (
                <li key={item.en}>
                  <span className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                    {t(item.ar, item.en)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Portal links */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gold">
              {t("البوابة", "Portal")}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {portalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {t(item.labelAr, item.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Ministry */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gold">
              {t("التواصل", "Contact")}
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <p>{t("وزارة الصناعة والثروة المعدنية", "Ministry of Industry and Mineral Resources")}</p>
              <a
                href="mailto:icc@mim.gov.sa"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-gold" aria-hidden />
                icc@mim.gov.sa
              </a>
              <a
                href="tel:199001"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                199001
              </a>
              <a
                href="https://mim.gov.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-white"
              >
                <ExternalLink className="size-4 shrink-0 text-gold" aria-hidden />
                mim.gov.sa
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-white/45 sm:flex-row">
          <p>
            © {year}{" "}
            {t(
              "وزارة الصناعة والثروة المعدنية — جميع الحقوق محفوظة",
              "Ministry of Industry and Mineral Resources — All rights reserved"
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>{t("سياسة الخصوصية", "Privacy Policy")}</span>
            <span className="hidden text-white/20 sm:inline" aria-hidden>·</span>
            <span>{t("شروط الاستخدام", "Terms of Use")}</span>
            <span className="hidden text-white/20 sm:inline" aria-hidden>·</span>
            <span>{t("إمكانية الوصول", "Accessibility")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
