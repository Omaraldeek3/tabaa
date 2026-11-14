import { doubleFrame, flourishRule, rosetteLines, starTile } from "../../lib/motifs/index.ts";
import { g, rect, scene, type SceneNode, text } from "../../lib/scene.ts";
import { daysAr, monthCells, monthsAr, parseYear, toArabicDigits } from "../calendar-kit.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "calendars-year-calendar",
  category: "calendars",
  lang: "ar",
  title: { ar: "تقويم سنوي حائطي", en: "Wall year calendar" },
  note: { ar: "تقويم السنة كاملة في ورقة واحدة: اكتب السنة فتُحسب الأشهر الاثنا عشر وأيامها تلقائياً، والأسبوع يبدأ بالسبت والجمعة ملوّنة. للمكاتب والمحلات كهدية آخر السنة.", en: "The whole year on one sheet: type the year and all twelve months are worked out for you, weeks starting on Saturday with Fridays in colour. For offices and shops as a year-end gift." },
  tags: ["تقويم", "رزنامة", "سنة", "حائط", "مكتب", "calendar"],
  sizes: [sizes.a3, sizes.a4],
  palettes: [
    pal("classic", "كلاسيكي", "Classic", inks.white, inks.black, inks.red, inks.olive, inks.grey),
    pal("navy", "كحلي", "Navy", inks.ivory, inks.navy, inks.orange, inks.teal, inks.grey),
    pal("olive", "زيتي", "Olive", inks.paper, inks.oliveDark, inks.terracotta, inks.olive, inks.grey),
  ],
  fonts: ["reemkufi", "lalezar", "kufam"],
  fields: [
    tf("year", "السنة", "Year", "٢٠٢٨", 4),
    tf("name", "اسم المحل", "Business", "مطبعة الأمل · نابلس", 30),
    tf("contact", "التواصل", "Contact", "٠٩ ٢٣٨ ٠٠٠٠ · شارع حطين"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 420), year = parseYear(val(ctx, "year")), mx = 18 * s, gx = 8 * s, mw = (W - 2 * mx - 2 * gx) / 3, cw = mw / 7, top = 68 * s, mh = 76 * s;
    const nodes: SceneNode[] = [];
    for (let m = 0; m < 12; m++) {
      const col = 2 - (m % 3), row = Math.floor(m / 3), x0 = mx + col * (mw + gx), y0 = top + row * mh;
      nodes.push(rect(x0, y0, mw, 8 * s, { fill: m % 2 ? p.accent2 : p.accent }));
      nodes.push(text(monthsAr[m], { font: ctx.font, weight: 700, size: 5 * s, x: x0 + mw / 2, y: y0 + 6 * s, align: "center", fill: inks.white }));
      daysAr.forEach((d, i) => nodes.push(text(d, { font: "tajawal", weight: 700, size: 2.4 * s, x: x0 + mw - (i + 0.5) * cw, y: y0 + 13 * s, align: "center", fill: i === 6 ? p.accent : p.ink, maxWidth: cw * 0.95 })));
      for (const [c, r, d] of monthCells(year, m)) nodes.push(text(toArabicDigits(d), { font: "tajawal", weight: c === 6 ? 800 : 500, size: 3.6 * s, x: x0 + mw - (c + 0.5) * cw, y: y0 + 20 * s + r * 8.4 * s, align: "center", fill: c === 6 ? p.accent : p.ink }));
    }
    return scene(W, H, p.paper,
      starTile(0, 0, W, 60 * s, 12 * s, 1.6 * s, p.accent, 0.06),
      g({ x: cx, y: 36 * s, opacity: 0.15 }, rosetteLines(28 * s, p.accent, { rings: 5, lobes: 16, width: 0.3 * s })),
      line(toArabicDigits(year), cx, 44 * s, 34 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W * 0.5, safe: false }),
      nodes,
      rect(-b, H - 30 * s, W + 2 * b, 30 * s + b, { fill: p.ink }),
      line(val(ctx, "name"), cx, H - 14 - 10 * s, 8 * s, { font: ctx.font, weight: 700, fill: p.paper, maxWidth: W - 40 * s }),
      line(val(ctx, "contact"), cx, H - 12 - 3 * s, 4.4 * s, { font: "tajawal", weight: 500, fill: p.paper, maxWidth: W - 40 * s }),
      flourishRule(cx, 56 * s, W * 0.5, p.accent, s),
      doubleFrame(7 * s, 7 * s, W - 14 * s, H - 14 * s - 30 * s, p.accent, p.paper, { gap: 2.4 * s, heavy: 0.6 * s, thin: 0.2 * s, corner: "bracket", r: 4 * s }),
    );
  },
};
export default t;
