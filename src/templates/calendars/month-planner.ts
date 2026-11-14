import { type SceneNode, rect, scene, text } from "../../lib/scene.ts";
import { daysAr, monthCells, monthsAr, parseYear, toArabicDigits, toLatinDigits } from "../calendar-kit.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "calendars-month-planner",
  category: "calendars",
  lang: "ar",
  title: { ar: "مخطّط شهري بمربّعات كبيرة", en: "Monthly planner with big boxes" },
  note: { ar: "شهر واحد بمربّعات واسعة للكتابة فيها، يُحسب من رقم الشهر والسنة، وعمود ملاحظات جانبي. يطبع على A4 عرضي ويُعلّق على الثلاجة أو المكتب.", en: "One month in roomy boxes to write in, worked out from the month and year you type, with a notes column at the side. Prints on A4 landscape for the fridge or the desk." },
  tags: ["مخطط", "شهر", "تقويم", "مواعيد", "تنظيم", "planner"],
  sizes: [sizes.a4l],
  palettes: [
    pal("calm", "هادئ", "Calm", inks.white, inks.navy, inks.teal, inks.sky, inks.grey),
    pal("warm", "دافئ", "Warm", inks.ivory, inks.black, inks.terracotta, inks.sand, inks.grey),
    pal("rose", "وردي", "Rose", inks.white, inks.burgundy, inks.rose, inks.blush, inks.grey),
  ],
  fonts: ["marhey", "reemkufi", "lalezar"],
  fields: [
    tf("month", "رقم الشهر", "Month number", "٩", 2),
    tf("year", "السنة", "Year", "٢٠٢٨", 4),
    tf("notes", "عنوان الملاحظات", "Notes heading", "ملاحظات وأهداف الشهر", 26),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 297, 210), year = parseYear(val(ctx, "year")), mRaw = Number.parseInt(toLatinDigits(val(ctx, "month")), 10), month = Number.isFinite(mRaw) && mRaw >= 1 && mRaw <= 12 ? mRaw - 1 : 8;
    const side = 62 * s, gx = 12 * s, gw = W - side - 2 * gx - 6 * s, cw = gw / 7, top = 40 * s, cells = monthCells(year, month), weeks = Math.max(...cells.map(c => c[1])) + 1, ch = (H - top - 12 * s) / weeks;
    const nodes: SceneNode[] = [];
    daysAr.forEach((d, i) => nodes.push(rect(W - gx - (i + 1) * cw, top - 8 * s, cw - 0.6 * s, 7 * s, { fill: i === 6 ? p.accent : p.ink }), text(d, { font: "tajawal", weight: 700, size: 3.6 * s, x: W - gx - (i + 0.5) * cw, y: top - 3 * s, align: "center", fill: p.paper })));
    for (let r = 0; r < weeks; r++) for (let c = 0; c < 7; c++) nodes.push(rect(W - gx - (c + 1) * cw, top + r * ch, cw - 0.6 * s, ch - 0.6 * s, { fill: null, stroke: p.soft, strokeWidth: 0.25 * s }));
    for (const [c, r, d] of cells) nodes.push(text(toArabicDigits(d), { font: ctx.font, weight: 700, size: 5 * s, x: W - gx - c * cw - 2 * s, y: top + r * ch + 6 * s, align: "start", fill: c === 6 ? p.accent : p.ink }));
    const lines = Array.from({ length: 14 }, (_, i) => rect(gx, top + 4 * s + i * 11 * s, side - 4 * s, 0.25 * s, { fill: p.soft }));
    return scene(W, H, p.paper,
      line(`${monthsAr[month]} ${toArabicDigits(year)}`, W - gx, 26 * s, 14 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: gw, safe: false }),
      nodes,
      rect(gx, top - 8 * s, side - 4 * s, 7 * s, { fill: p.accent2 }),
      line(val(ctx, "notes"), gx + (side - 4 * s) / 2, top - 3 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: side - 8 * s }),
      lines,
    );
  },
};
export default t;
