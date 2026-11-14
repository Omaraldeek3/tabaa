import { beadRule, crescentPath, dotField, doubleFrame, lantern, starTile } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const sample = Array.from({ length: 30 }, (_, i) => {
  const d = (n: number | string) => String(n).replace(/\d/g, x => "٠١٢٣٤٥٦٧٨٩"[+x]);
  const fajr = 4 * 60 + 32 - Math.round(i * 0.9), magh = 18 * 60 + 41 + Math.round(i * 0.6);
  const hm = (m: number) => `${d(Math.floor(m / 60) % 12 || 12)}:${d(String(m % 60).padStart(2, "0"))}`;
  return [d(i + 1), hm(fajr), hm(magh)];
});

const t: Template = {
  id: "calendars-imsakiya",
  category: "calendars",
  lang: "ar",
  title: { ar: "إمساكية رمضان", en: "Ramadan imsakiya" },
  note: { ar: "جدول مواعيد الإمساك والإفطار لأيام رمضان الثلاثين في عمودين، تحت هلال وفانوس، واسم المسجد أو المحل الذي يوزّعها في الأسفل.", en: "The table of dawn and sunset times for the thirty days of Ramadan in two columns, under a crescent and a lantern, with the mosque or shop that hands it out at the foot." },
  tags: ["إمساكية", "رمضان", "مواعيد", "إفطار", "سحور", "imsakiya"],
  sizes: [sizes.a4, sizes.a3],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.navy, inks.sky),
    pal("green", "أخضر", "Green", inks.ivory, inks.oliveDark, inks.goldDeep, inks.sage, inks.olive),
    pal("purple", "خمري", "Wine", inks.ivory, inks.burgundy, inks.goldDeep, inks.blush, inks.rose),
  ],
  fonts: ["arefruqaa", "reemkufi", "lalezar"],
  fields: [
    tf("title", "العنوان", "Title", "إمساكية رمضان ١٤٥٠ هـ", 26),
    tf("city", "المدينة", "City", "حسب توقيت مدينة نابلس"),
    lf("days", "الأيام", "Days", [["اليوم", "Day"], ["الإمساك", "Imsak"], ["الإفطار", "Iftar"]], sample, 30),
    tf("by", "مقدّمة من", "Courtesy of", "مع تحيات مخبز الأمانة · رمضان كريم"),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, u, v, cx } = dims(ctx, 210, 297), s = u, list = rows(ctx, "days", 30), top = 74 * v, half = Math.ceil(list.length / 2), pitch = Math.min(12.4 * v, (H - top - 34 * v) / Math.max(half, 1));
    const colW = (W - 36 * s) / 2, hdr = p.paper === inks.night ? inks.navy : p.accent2;
    const table = [0, 1].flatMap(k => {
      const right = W - 14 * s - k * (colW + 8 * s), cells = list.slice(k * half, (k + 1) * half);
      return [
        rect(right - colW, top - 9 * v, colW, 8 * v, { fill: hdr }),
        ...["اليوم", "الإمساك", "الإفطار"].map((h, j) => line(h, right - colW * (j + 0.5) / 3, top - 3.4 * v, 3.6 * s, { font: "tajawal", weight: 800, fill: p.ink, safe: false })),
        ...cells.flatMap(([day = "", imsak = "", iftar = ""], i) => [
          i % 2 ? null : rect(right - colW, top + i * pitch, colW, pitch, { fill: p.soft, opacity: 0.18 }),
          line(day, right - colW / 6, top + i * pitch + pitch * 0.68, 3.8 * s, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: colW / 3.4 }),
          line(imsak, right - colW / 2, top + i * pitch + pitch * 0.68, 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: colW / 3.4 }),
          line(iftar, right - colW * 5 / 6, top + i * pitch + pitch * 0.68, 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: colW / 3.4 }),
        ]),
      ];
    });
    return scene(W, H, p.paper,
      starTile(0, 0, W, H, 14 * s, 2 * s, p.accent, 0.06),
      dotField(0, H - 40 * v, W, 40 * v, 5 * s, 0.6 * s, p.accent, { fade: "up", opacity: 0.35 }),
      g({ x: W * 0.16, y: -b }, rect(-0.2 * s, 0, 0.4 * s, 14 * s + b, { fill: p.accent }), g({ y: 14 * s + b }, lantern(28 * s, p.accent, p.soft))),
      g({ x: W * 0.84, y: 26 * v, rotate: -30 }, path(crescentPath(12 * s, 0.4), { fill: p.accent })),
      line(val(ctx, "title"), cx, 38 * v, 13 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W * 0.5 }),
      line(val(ctx, "city"), cx, 50 * v, 4.6 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: W * 0.5 }),
      table,
      line(val(ctx, "by"), cx, H - 14 * v, 5 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 30 * s }),
      doubleFrame(7 * s, 7 * s, W - 14 * s, H - 14 * s, p.accent, p.paper, { gap: 2.4 * s, heavy: 0.6 * s, thin: 0.2 * s, corner: "khatam", r: 3 * s }),
      beadRule(20 * s, W - 20 * s, top - 10 * v, p.accent, s, { bead: "diamond", pitch: 4, centre: true }),
    );
  },
};
export default t;
