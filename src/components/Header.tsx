"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/context";
import { cn } from "@/lib/cn";
import { BrandMark } from "@/components/BrandMark";

const navItems = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
  { href: "/advisor", labelAr: "تحديد المسار", labelEn: "Path Assessment" },
  { href: "/factory", labelAr: "ملف المصنع", labelEn: "Factory Profile" },
  { href: "/provider", labelAr: "اعتماد مقدم الخدمة", labelEn: "Provider Registration" },
  { href: "/operator", labelAr: "لوحة المتابعة", labelEn: "Operations" },
];

const pathLabels: Record<string, { ar: string; en: string }> = {
  "/": { ar: "الرئيسية", en: "Home" },
  "/advisor": { ar: "تحديد المسار", en: "Path Assessment" },
  "/factory": { ar: "ملف المصنع", en: "Factory Profile" },
  "/provider": { ar: "اعتماد مقدم الخدمة", en: "Provider Registration" },
  "/operator": { ar: "لوحة المتابعة", en: "Operations" },
};

export function Header() {
  const { lang, setLang, t } = useApp();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPage = pathLabels[pathname];

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm">
      {/* Government identity bar */}
      <div className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <p className="truncate text-[11px] font-medium tracking-wide text-white/80 sm:text-xs">
            {t("وزارة الصناعة والثروة المعدنية", "Ministry of Industry and Mineral Resources")}
          </p>
          <p className="hidden shrink-0 text-[11px] text-white/50 sm:block sm:text-xs">
            {t("المملكة العربية السعودية", "Kingdom of Saudi Arabia")}
          </p>
        </div>
        {/* National accent strip */}
        <div className="flex h-1">
          <div className="flex-[2] bg-primary" />
          <div className="flex-1 bg-gold" />
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:py-3.5">
          <Link
            href="/"
            className="flex min-w-0 cursor-pointer items-center gap-3 transition-opacity duration-200 hover:opacity-90"
          >
            <BrandMark />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight text-navy md:text-[15px]">
                {t("مركز القدرات الصناعية", "Industrial Capabilities Center")}
              </p>
              <p className="truncate text-[11px] text-muted md:text-xs">
                {t("بوابة المبادرات الصناعية", "Industrial Initiatives Portal")}
              </p>
            </div>
          </Link>

          <nav className="hidden items-stretch lg:flex" aria-label="Main">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex cursor-pointer items-center px-4 py-2 text-sm font-medium transition-colors duration-200",
                    active ? "text-navy" : "text-muted hover:text-navy"
                  )}
                >
                  {t(item.labelAr, item.labelEn)}
                  {active && (
                    <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gold" aria-hidden />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs font-semibold text-navy transition-colors duration-200 hover:border-navy/20 hover:bg-background"
              aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Globe className="size-3.5 text-primary" aria-hidden />
              {lang === "ar" ? "EN" : "ع"}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md border border-border text-navy transition-colors duration-200 hover:bg-background lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Page context strip — inner pages only */}
      {pathname !== "/" && currentPage && (
        <div className="border-b border-border-subtle bg-background">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 text-xs">
            <Link href="/" className="text-muted transition-colors duration-200 hover:text-navy">
              {t("الرئيسية", "Home")}
            </Link>
            <span className="text-faint" aria-hidden>/</span>
            <span className="font-medium text-navy">{t(currentPage.ar, currentPage.en)}</span>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          className="border-b border-border bg-surface px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center rounded-md px-3 text-sm font-medium transition-colors duration-200",
                      active
                        ? "border-s-2 border-gold bg-gold-light/50 text-navy"
                        : "text-muted hover:bg-background hover:text-navy"
                    )}
                  >
                    {t(item.labelAr, item.labelEn)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
