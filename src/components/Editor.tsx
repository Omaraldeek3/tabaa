"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getFont } from "../lib/fonts";
import { asset } from "../lib/paths";
import { renderSvg } from "../lib/render-svg";
import type { Scene } from "../lib/scene";
import { getTemplate, sampleValues, templates } from "../templates/registry";
import similarData from "../templates/similar.json";
import { type Field, type Template, type Values, categories } from "../templates/types";
import { useLang } from "./Lang";
import { TemplateCard } from "./Sheet";

type Saved = { values: Values; palette: string; font: string; size: string };
const storeKey = (id: string) => `tabaa:v1:${id}`;

function load(t: Template): Saved {
  const fresh: Saved = { values: sampleValues(t), palette: t.palettes[0].id, font: t.fonts[0], size: t.sizes[0].id };
  try {
    const raw = localStorage.getItem(storeKey(t.id));
    if (!raw) return fresh;
    const saved = JSON.parse(raw) as Partial<Saved>;
    const values = { ...fresh.values };
    // Only keep saved values whose field still exists with the same kind.
    for (const f of t.fields) {
      const v = saved.values?.[f.id];
      if (f.kind === "list" ? Array.isArray(v) : typeof v === "string") values[f.id] = v as Values[string];
    }
    return {
      values,
      palette: t.palettes.some(p => p.id === saved.palette) ? saved.palette! : fresh.palette,
      font: t.fonts.includes(saved.font ?? "") ? saved.font! : fresh.font,
      size: t.sizes.some(s => s.id === saved.size) ? saved.size! : fresh.size,
    };
  } catch { return fresh; }
}

function FieldInput({ field, value, onChange }: { field: Field; value: Values[string]; onChange: (v: Values[string]) => void }) {
  const { pick, t } = useLang();
  const id = `f-${field.id}`;
  if (field.kind === "list") {
    const list = Array.isArray(value) ? value : [];
    const set = (r: number, c: number, v: string) => onChange(list.map((row, i) => (i === r ? row.map((cell, j) => (j === c ? v : cell)) : row)));
    return (
      <fieldset className="field field-list">
        <legend>{pick(field.label)}</legend>
        {list.map((row, r) => (
          <div className="list-row" key={r}>
            {field.columns.map((col, c) => <input key={c} className={c ? "input input-narrow" : "input"} value={row[c] ?? ""} onChange={e => set(r, c, e.target.value)} aria-label={`${pick(col)} ${r + 1}`} placeholder={pick(col)} />)}
            <button type="button" className="icon-btn" onClick={() => onChange(list.filter((_, i) => i !== r))} aria-label={t("edRemoveRow")} title={t("edRemoveRow")}>×</button>
          </div>
        ))}
        {list.length < field.maxRows ? <button type="button" className="link-btn" onClick={() => onChange([...list, field.columns.map(() => "")])}>+ {t("edAddRow")}</button> : null}
      </fieldset>
    );
  }
  const text = typeof value === "string" ? value : "";
  return (
    <div className="field">
      <label htmlFor={id}>{pick(field.label)}</label>
      {field.kind === "multiline"
        ? <textarea id={id} className="input" rows={Math.min(4, field.maxLines)} value={text} onChange={e => onChange(e.target.value)} dir="auto" />
        : <input id={id} className="input" value={text} maxLength={field.maxLength ?? 120} onChange={e => onChange(e.target.value)} dir="auto" />}
    </div>
  );
}

export function Editor({ id }: { id: string }) {
  const { t, pick, num } = useLang();
  const template = getTemplate(id);
  const [state, setState] = useState<Saved | null>(null);
  const [bleed, setBleed] = useState(3);
  const [marks, setMarks] = useState(true);
  const [guides, setGuides] = useState(false);
  const [resolved, setResolved] = useState<Scene | null>(null);
  const [engineError, setEngineError] = useState(false);
  const [busy, setBusy] = useState<"" | "pdf" | "png" | "svg">("");
  const [exportError, setExportError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const run = useRef(0);

  useEffect(() => { if (template) setState(load(template)); }, [template]);

  useEffect(() => {
    if (!template || !state) return;
    try { localStorage.setItem(storeKey(template.id), JSON.stringify(state)); } catch { /* private mode: edits last for this visit */ }
  }, [template, state]);

  const palette = template?.palettes.find(p => p.id === state?.palette) ?? template?.palettes[0];
  const size = template?.sizes.find(s => s.id === state?.size) ?? template?.sizes[0];
  const safeMm = template?.safeMm ?? 5;

  useEffect(() => {
    if (!template || !state || !palette || !size) return;
    const mine = ++run.current;
    const timer = setTimeout(async () => {
      try {
        const { resolveScene } = await import("../lib/resolve");
        const scene = template.render({ values: state.values, palette, font: state.font, size, safeMm, bleedMm: Math.max(bleed, 3) });
        const out = await resolveScene(scene);
        if (mine === run.current) { setResolved(out); setEngineError(false); }
      } catch (e) {
        console.error(e);
        if (mine === run.current) setEngineError(true);
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [template, state, palette, size, safeMm, bleed, attempt]);

  const previewSvg = useMemo(() => {
    if (!resolved) return "";
    return renderSvg(resolved, { bleedMm: guides ? bleed : 0, showSafe: guides, showTrim: guides, safeMm, idPrefix: "preview" }).replace(/ width="[^"]+" height="[^"]+"/, "");
  }, [resolved, guides, bleed, safeMm]);

  const download = useCallback(async (kind: "pdf" | "png" | "svg") => {
    if (!resolved || !template) return;
    setBusy(kind); setExportError(false);
    try {
      const io = await import("../lib/export");
      const name = `tabaa-${template.id}`;
      if (kind === "pdf") await io.downloadPdf(resolved, name, { bleedMm: bleed, cropMarks: marks }, template.title.en);
      else if (kind === "png") await io.downloadPng(resolved, name);
      else io.downloadSvg(resolved, name, { bleedMm: bleed, cropMarks: marks });
    } catch (e) { console.error(e); setExportError(true); }
    setBusy("");
  }, [resolved, template, bleed, marks]);

  if (!template) return <main className="paper"><div className="wrap empty"><p>{t("notFound")}</p><Link className="btn btn-ink" href="/library/">{t("edBack")}</Link></div></main>;

  const patch = (p: Partial<Saved>) => setState(s => (s ? { ...s, ...p } : s));
  const category = categories.find(c => c.id === template.category)!;
  const similar = ((similarData.near as Record<string, string[]>)[template.id] ?? []).slice(0, 6).map((id: string) => getTemplate(id)).filter((x): x is Template => !!x);
  const more = templates.filter(x => x.category === template.category && x.id !== template.id && !similar.includes(x)).slice(0, 4);
  const round = template.shape === "round";

  return (
    <main className="paper editor-page">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/library/">{t("navLibrary")}</Link><span aria-hidden="true">/</span>
          <Link href={`/library/?c=${template.category}`}>{pick(category.name)}</Link>
        </nav>
        <div className="editor">
          <section className="stage" aria-label={pick(template.title)}>
            <div className={`stage-sheet ${round && !guides ? "stage-round" : ""}`} style={{ aspectRatio: `${size!.widthMm} / ${size!.heightMm}`, maxWidth: `min(100%, calc(72vh * ${size!.widthMm / size!.heightMm}))` }}>
              {previewSvg
                ? <div className="stage-svg" dangerouslySetInnerHTML={{ __html: previewSvg }} />
                : <img src={asset(`thumbs/${template.id}.svg`)} alt="" />}
            </div>
            <div className="stage-bar">
              <label className="check"><input type="checkbox" checked={guides} onChange={e => setGuides(e.target.checked)} /> {t("edGuides")}</label>
              <span className="stage-size" dir="ltr">{size!.widthMm} × {size!.heightMm} mm</span>
            </div>
            {engineError ? <p className="notice notice-error" role="alert">{t("edEngineError")} <button type="button" className="link-btn" onClick={() => setAttempt(a => a + 1)}>{t("edRetry")}</button></p> : null}
            {!previewSvg && !engineError ? <p className="notice" role="status">{t("edPreparing")}</p> : null}
          </section>

          <section className="panel">
            <h1 className="panel-title">{pick(template.title)}</h1>
            <p className="panel-note">{pick(template.note)}</p>

            {similar.length ? (
              <div className="similar">
                <h2>{t("edSimilar")}</h2>
                <div className="similar-row">
                  {similar.map(s => (
                    <Link key={s.id} href={`/t/${s.id}/`} className="similar-item" title={pick(s.title)}>
                      <img src={asset(`thumbs/${s.id}.svg`)} alt={pick(s.title)} loading="lazy" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {state ? <>
              <div className="group">
                <h2>{t("edColours")}</h2>
                <div className="swatches">
                  {template.palettes.map(p => (
                    <button key={p.id} type="button" className="swatch" aria-pressed={p.id === state.palette} onClick={() => patch({ palette: p.id })} title={pick(p.name)}>
                      <span className="swatch-dots" aria-hidden="true">{[p.paper, p.accent, p.ink, p.accent2].map((c, i) => <i key={i} style={{ background: c.hex }} />)}</span>
                      <span>{pick(p.name)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {template.fonts.length > 1 ? (
                <div className="group">
                  <h2>{t("edFont")}</h2>
                  <div className="chips">
                    {template.fonts.map(f => { const def = getFont(f); return <button key={f} type="button" className="chip chip-font" aria-pressed={f === state.font} onClick={() => patch({ font: f })} style={{ fontFamily: `'${def.family}', var(--font-body)` }}>{pick(def.name)}</button>; })}
                  </div>
                </div>
              ) : null}

              {template.sizes.length > 1 ? (
                <div className="group">
                  <h2>{t("edSize")}</h2>
                  <div className="chips">
                    {template.sizes.map(s => <button key={s.id} type="button" className="chip" aria-pressed={s.id === state.size} onClick={() => patch({ size: s.id })}>{pick(s.label)}</button>)}
                  </div>
                </div>
              ) : null}

              <div className="group">
                <div className="group-head"><h2>{t("edText")}</h2><button type="button" className="link-btn" onClick={() => patch({ values: sampleValues(template) })}>{t("edReset")}</button></div>
                {template.fields.map(f => <FieldInput key={f.id} field={f} value={state.values[f.id]} onChange={v => patch({ values: { ...state.values, [f.id]: v } })} />)}
                <p className="hint">{t("edSaved")}</p>
              </div>
            </> : null}

            <div className="download">
              <h2>{t("edDownload")}</h2>
              <div className="download-opts">
                <label className="opt">{t("edBleed")}
                  <select className="select" value={bleed} onChange={e => setBleed(Number(e.target.value))}>{[0, 2, 3, 5].map(b => <option key={b} value={b}>{num(b)} {t("edMm")}</option>)}</select>
                </label>
                <label className="check"><input type="checkbox" checked={marks} onChange={e => setMarks(e.target.checked)} /> {t("edMarks")}</label>
              </div>
              <button type="button" className="btn btn-red btn-wide" disabled={!resolved || !!busy} onClick={() => download("pdf")}>{busy === "pdf" ? t("edWorking") : t("edPdf")}</button>
              <div className="download-more">
                <button type="button" className="btn btn-line" disabled={!resolved || !!busy} onClick={() => download("png")}>{busy === "png" ? t("edWorking") : t("edPng")}</button>
                <button type="button" className="btn btn-line" disabled={!resolved || !!busy} onClick={() => download("svg")}>{t("edSvg")}</button>
              </div>
              {exportError ? <p className="notice notice-error" role="alert">{t("edExportError")}</p> : null}
              <p className="hint">{t("edPdfNote")} <Link href="/guide/">{t("navGuide")}</Link></p>
            </div>
          </section>
        </div>

        {more.length ? <section className="more"><h2 className="section-title">{t("edMore")}</h2><div className="grid">{more.map(m => <TemplateCard key={m.id} template={m} />)}</div></section> : null}
      </div>
    </main>
  );
}
