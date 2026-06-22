"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Factory,
  LayoutDashboard,
  Sparkles,
  Store,
  Presentation,
} from "lucide-react";
import { useApp } from "@/lib/context";
import { VISION } from "@/lib/mock-data";

const navItems = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home", icon: Building2 },
  { href: "/advisor", labelAr: "المستشار الذكي", labelEn: "AI Advisor", icon: Sparkles },
  { href: "/factory", labelAr: "رحلة المصنع", labelEn: "Factory Journey", icon: Factory },
  { href: "/provider", labelAr: "مقدم الخدمات", labelEn: "Service Provider", icon: Store },
  { href: "/operator", labelAr: "لوحة التشغيل", labelEn: "Operations", icon: LayoutDashboard },
  { href: "/pitch", labelAr: "العرض التقديمي", labelEn: "Pitch", icon: Presentation },
];

export function Header() {
  const { lang, setLang, t } = useApp();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-emerald-900">
              {t(VISION.titleAr, VISION.titleEn)}
            </p>
            <p className="text-xs text-slate-500">POC · Planning Phase</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(item.labelAr, item.labelEn)}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
        >
          {lang === "ar" ? "EN" : "عربي"}
        </button>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
                active
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t(item.labelAr, item.labelEn)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
