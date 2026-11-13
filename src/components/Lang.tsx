"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { type Lang, type StringKey, strings } from "../content/strings";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: StringKey) => string; pick: (v: { ar: string; en: string }) => string; num: (n: number) => string };
const LangContext = createContext<Ctx | null>(null);
const KEY = "tabaa:lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  useEffect(() => {
    try { const saved = localStorage.getItem(KEY); if (saved === "en" || saved === "ar") setLangState(saved); } catch { /* storage blocked: stay Arabic */ }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* not saved; still switches */ }
  }, []);
  const value = useMemo<Ctx>(() => ({
    lang, setLang,
    t: k => strings[k][lang],
    pick: v => v[lang],
    num: n => n.toLocaleString(lang === "ar" ? "ar-EG" : "en-US"),
  }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang needs LangProvider");
  return ctx;
}
