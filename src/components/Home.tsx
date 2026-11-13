"use client";

import Link from "next/link";
import { templates } from "../templates/registry";
import { categories } from "../templates/types";
import { CropCorners, RegMark, TatreezRule } from "./Chrome";
import { useLang } from "./Lang";
import { Sheet } from "./Sheet";

const byId = (id: string) => templates.find(t => t.id === id) ?? templates[0];

function Hero() {
  const { t } = useLang();
  // The fan of sheets: one from each of five sections, so the range shows at a glance.
  const fan = ["posters", "wedding", "greetings", "menus", "labels"].map(c => templates.find(x => x.category === c)).filter((x): x is NonNullable<typeof x> => !!x);
  return (
    <section className="hero">
      <div className="hero-rays" aria-hidden="true" />
      <CropCorners />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker"><RegMark size={18} /> {t("heroKicker")}</p>
          <h1 className="hero-word" aria-label={t("brand")}><span aria-hidden="true">طبعة</span></h1>
          <p className="hero-lead">{t("heroLead")}</p>
          <div className="hero-actions">
            <Link href="/library/" className="btn btn-paper">{t("heroCta")}</Link>
            <Link href="/guide/" className="btn btn-ghost">{t("heroCta2")}</Link>
          </div>
        </div>
        <div className="hero-fan" aria-hidden="true">
          {fan.map((tpl, i) => <Link key={tpl.id} href={`/t/${tpl.id}/`} tabIndex={-1} className={`fan-item fan-${i}`}><Sheet template={tpl} eager /></Link>)}
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">{[0, 1, 2, 3].map(i => <span key={i}>{t("marquee")} ✦ </span>)}</div>
      </div>
    </section>
  );
}

function Steps() {
  const { t, num } = useLang();
  const steps = [["step1", "step1Text"], ["step2", "step2Text"], ["step3", "step3Text"]] as const;
  return (
    <section className="steps paper">
      <div className="wrap">
        <h2 className="section-title">{t("stepsTitle")}</h2>
        <ol className="steps-grid">
          {steps.map(([title, text], i) => (
            <li key={title} className="step">
              <span className="step-num" aria-hidden="true">{num(i + 1)}</span>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Categories() {
  const { t, pick, num } = useLang();
  return (
    <section className="cats paper">
      <TatreezRule height={16} />
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">{t("catsTitle")}</h2>
          <p className="section-lead">{t("catsLead")}</p>
        </div>
        <div className="cats-grid">
          {categories.map((c, i) => {
            const list = templates.filter(x => x.category === c.id);
            if (!list.length) return null;
            return (
              <Link key={c.id} href={`/library/?c=${c.id}`} className={`cat cat-${i % 4}`}>
                <span className="cat-sheet"><Sheet template={list[0]} /></span>
                <span className="cat-name">{pick(c.name)}</span>
                <span className="cat-count">{num(list.length)} {list.length === 1 ? t("templateCount1") : t("templatesCount")}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { t, pick } = useLang();
  const items = templates.filter(x => x.category === "wedding" || x.category === "occasions" || x.category === "greetings").slice(0, 8);
  return (
    <section className="gallery">
      <div className="gallery-arches" aria-hidden="true" />
      <div className="wrap gallery-head">
        <p className="gallery-kicker">{t("galleryKicker")}</p>
        <h2>{t("galleryTitle")}</h2>
        <p>{t("galleryLead")}</p>
      </div>
      <div className="gallery-rail" tabIndex={0} role="group" aria-label={t("galleryTitle")}>
        {items.map(tpl => (
          <Link key={tpl.id} href={`/t/${tpl.id}/`} className="gallery-item">
            <span className="gallery-spot"><Sheet template={tpl} /></span>
            <span className="gallery-name">{pick(tpl.title)}</span>
          </Link>
        ))}
      </div>
      <div className="wrap gallery-foot"><Link href="/library/?c=wedding" className="btn btn-gold">{t("galleryCta")}</Link></div>
    </section>
  );
}

function Anatomy() {
  const { t } = useLang();
  const tpl = byId("cards-kufi-monogram");
  return (
    <section className="anatomy">
      <div className="wrap anatomy-grid">
        <div>
          <h2 className="section-title">{t("anatomyTitle")}</h2>
          <p className="section-lead">{t("anatomyLead")}</p>
          <ul className="anatomy-list">
            <li><i className="dot dot-m" />{t("anatomyBleed")}</li>
            <li><i className="dot dot-k" />{t("anatomyTrim")}</li>
            <li><i className="dot dot-c" />{t("anatomySafe")}</li>
            <li><i className="dot dot-y" />{t("anatomyCmyk")}</li>
          </ul>
        </div>
        <div className="anatomy-figure" aria-hidden="true">
          <div className="anatomy-bleed"><span className="anatomy-tag tag-m">{t("labelBleed")}</span>
            <div className="anatomy-trim"><CropCorners /><span className="anatomy-tag tag-k">{t("labelTrim")}</span>
              <Sheet template={tpl} eager className="anatomy-sheet" />
              <div className="anatomy-safe"><span className="anatomy-tag tag-c">{t("labelSafe")}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return <main><Hero /><Steps /><Categories /><Gallery /><Anatomy /></main>;
}
