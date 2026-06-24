"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context";

const navItems = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
  { href: "/advisor", labelAr: "تحديد المسار", labelEn: "Path Assessment" },
  { href: "/factory", labelAr: "ملف المصنع", labelEn: "Factory Profile" },
  { href: "/provider", labelAr: "اعتماد مقدم الخدمة", labelEn: "Provider Registration" },
  { href: "/operator", labelAr: "لوحة المتابعة", labelEn: "Operations" },
];

export function Header() {
  const { lang, setLang, t } = useApp();
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--border)] bg-white">
      <div className="bg-[var(--navy)] px-4 py-2 text-xs text-white/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span>{t("وزارة الصناعة والثروة المعدنية", "Ministry of Industry and Mineral Resources")}</span>
          <span className="hidden sm:inline">{t("المملكة العربية السعودية", "Kingdom of Saudi Arabia")}</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border border-[var(--gold)] bg-[var(--navy)] text-sm font-bold text-[var(--gold)]">
            MIM
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--navy)]">
              {t("مركز القدرات الصناعية", "Industrial Capabilities Center")}
            </p>
            <p className="text-xs text-[var(--muted)]">
              {t("بوابة المبادرات الصناعية", "Industrial Initiatives Portal")}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-b-2 border-[var(--gold)] text-[var(--navy)]"
                    : "text-[var(--muted)] hover:text-[var(--navy)]"
                }`}
              >
                {t(item.labelAr, item.labelEn)}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--navy)] hover:bg-[var(--gold-light)]"
        >
          {lang === "ar" ? "English" : "عربي"}
        </button>
      </div>

      <nav className="flex gap-0 overflow-x-auto border-t border-[var(--border)] px-4 md:hidden">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-3 py-2 text-xs font-medium ${
                active
                  ? "border-b-2 border-[var(--gold)] text-[var(--navy)]"
                  : "text-[var(--muted)]"
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
