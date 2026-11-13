"use client";

import Link from "next/link";
import { asset } from "../lib/paths";
import type { Template } from "../templates/types";
import { useLang } from "./Lang";

/** A template shown as a sheet of paper, from its pre-rendered thumbnail. */
export function Sheet({ template, eager = false, className = "" }: { template: Template; eager?: boolean; className?: string }) {
  const { pick } = useLang();
  const size = template.sizes[0];
  return (
    <span className={`sheet ${template.shape === "round" ? "sheet-round" : ""} ${className}`} style={{ aspectRatio: `${size.widthMm} / ${size.heightMm}`, "--ar": size.widthMm / size.heightMm } as React.CSSProperties}>
      <img src={asset(`thumbs/${template.id}.svg`)} alt={pick(template.title)} width={size.widthMm * 4} height={size.heightMm * 4} loading={eager ? "eager" : "lazy"} decoding="async" />
    </span>
  );
}

/** A library card: the sheet on its table, with title and size underneath. */
export function TemplateCard({ template, eager }: { template: Template; eager?: boolean }) {
  const { pick, t } = useLang();
  const size = template.sizes[0];
  return (
    <Link href={`/t/${template.id}/`} className="card" aria-label={`${t("open")}: ${pick(template.title)}`}>
      <span className="card-stage"><Sheet template={template} eager={eager} /></span>
      <span className="card-title">{pick(template.title)}</span>
      <span className="card-meta"><span>{pick(size.label)}</span>{template.lang === "en" ? <span className="tag">EN</span> : null}</span>
    </Link>
  );
}
