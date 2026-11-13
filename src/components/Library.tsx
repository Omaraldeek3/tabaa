"use client";

import { useEffect, useMemo, useState } from "react";
import { templates } from "../templates/registry";
import { type Category, categories } from "../templates/types";
import { TatreezRule } from "./Chrome";
import { useLang } from "./Lang";
import { TemplateCard } from "./Sheet";

/** Arabic search should not care about hamza seats, ta marbuta or marks. */
const fold = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[ً-ْٰـ]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");

export function Library() {
  const { t, pick, num } = useLang();
  const [cat, setCat] = useState<Category | "all">("all");
  const [lang, setLang] = useState<"all" | "ar" | "en">("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    if (c && categories.some(x => x.id === c)) setCat(c as Category);
  }, []);

  const pickCat = (c: Category | "all") => {
    setCat(c);
    const url = new URL(window.location.href);
    if (c === "all") url.searchParams.delete("c"); else url.searchParams.set("c", c);
    window.history.replaceState(null, "", url);
  };

  const index = useMemo(() => templates.map(tpl => ({ tpl, hay: fold([tpl.title.ar, tpl.title.en, tpl.note.ar, tpl.note.en, ...tpl.tags].join(" ")) })), []);
  const words = fold(query).split(/\s+/).filter(Boolean);
  const matches = index.filter(({ tpl, hay }) => (lang === "all" || tpl.lang === lang) && words.every(w => hay.includes(w)));
  const shown = matches.filter(({ tpl }) => cat === "all" || tpl.category === cat);
  const count = (c: Category | "all") => (c === "all" ? matches.length : matches.filter(m => m.tpl.category === c).length);
  const filtered = cat !== "all" || lang !== "all" || query;

  return (
    <main className="paper library">
      <div className="wrap library-head">
        <h1 className="page-title">{t("libTitle")}</h1>
        <p className="section-lead">{t("libLead")}</p>
      </div>
      <div className="filters">
        <div className="wrap filters-row">
          <div className="chips" role="group" aria-label={t("libTitle")}>
            {(["all", ...categories.map(c => c.id)] as (Category | "all")[]).map(c => {
              const n = count(c);
              if (c !== "all" && !templates.some(x => x.category === c)) return null;
              return (
                <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => pickCat(c)}>
                  {c === "all" ? t("all") : pick(categories.find(x => x.id === c)!.name)} <span className="chip-n">{num(n)}</span>
                </button>
              );
            })}
          </div>
          <div className="filters-side">
            <input className="search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t("search")} aria-label={t("search")} />
            <select className="select" value={lang} onChange={e => setLang(e.target.value as typeof lang)} aria-label={t("langAll")}>
              <option value="all">{t("langAll")}</option><option value="ar">{t("langAr")}</option><option value="en">{t("langEn")}</option>
            </select>
          </div>
        </div>
        <TatreezRule height={10} color="var(--ink)" />
      </div>
      <div className="wrap">
        {shown.length ? (
          <div className="grid">{shown.map(({ tpl }, i) => <TemplateCard key={tpl.id} template={tpl} eager={i < 4} />)}</div>
        ) : (
          <div className="empty">
            <p>{t("noResults")}</p>
            {filtered ? <button type="button" className="btn btn-ink" onClick={() => { pickCat("all"); setLang("all"); setQuery(""); }}>{t("clear")}</button> : null}
          </div>
        )}
      </div>
    </main>
  );
}
