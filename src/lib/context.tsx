"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "ar" | "en";

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (ar: string, en: string) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);

  return (
    <AppContext.Provider value={{ lang, setLang, t }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>{children}</div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
