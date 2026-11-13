"use client";

import Link from "next/link";
import { useLang } from "./Lang";

/** The printer's registration target, used as the site's mark. */
export function RegMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="12" cy="12" r="6.5" /><path d="M12 1v22M1 12h22" /><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A cross-stitch chain rule, drawn as a repeating SVG pattern. */
export function TatreezRule({ color = "var(--red)", height = 14, className = "" }: { color?: string; height?: number; className?: string }) {
  const cells = [[0, 0], [0, 6], [1, 1], [1, 5], [2, 2], [2, 4], [3, 3], [4, 2], [4, 4], [5, 1], [5, 5]];
  const id = `tz-${height}-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg className={`tatreez-rule ${className}`} height={height} width="100%" aria-hidden="true" style={{ color }}>
      <defs>
        <pattern id={id} width={(height * 6) / 7} height={height} patternUnits="userSpaceOnUse" viewBox="0 0 6 7">
          {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill="currentColor" />)}
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

/** Four crop marks pinned to the corners of the nearest positioned parent. */
export function CropCorners() {
  return <>{["tl", "tr", "bl", "br"].map(c => <span key={c} className={`crop crop-${c}`} aria-hidden="true" />)}</>;
}

export function Header() {
  const { t, lang, setLang } = useLang();
  return (
    <header className="site-header">
      <div className="cmyk-strip" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="header-row wrap">
        <Link href="/" className="wordmark" aria-label={t("brand")}>
          <RegMark />
          <span className="wordmark-ar">طبعة</span>
          <span className="wordmark-en">TABAA</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/library/">{t("navLibrary")}</Link>
          <Link href="/guide/">{t("navGuide")}</Link>
          <button type="button" className="lang-btn" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>{t("langSwitch")}</button>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <TatreezRule color="var(--red)" height={18} />
      <div className="wrap footer-grid">
        <div>
          <div className="footer-word">طبعة</div>
          <p>{t("footLine")}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/library/">{t("navLibrary")}</Link>
          <Link href="/guide/">{t("navGuide")}</Link>
          <a href="https://omardeek.tech" rel="noopener">{t("footMade")}</a>
        </nav>
      </div>
      <div className="wrap footer-small"><span>{t("footFonts")}</span><span dir="ltr">tabaa · CMYK · 3 mm</span></div>
    </footer>
  );
}
