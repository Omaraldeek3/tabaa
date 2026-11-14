import { archPath, beadRule, khatamPath, rosetteLines, starTile } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { ml, tf } from "../fields.ts";
import { dims, inks, line, linesOf, more, pal, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "bookmarks-ayah",
  category: "bookmarks",
  lang: "ar",
  title: { ar: "فاصل مصحف بآية داخل محراب", en: "Quran bookmark with a verse in a mihrab" },
  note: { ar: "فاصل للمصحف: الآية داخل محراب مقوّس بخطّين، ونجمة ثمانية في رأسه، واسم السورة في الأسفل. هدية لحلقات التحفيظ والختمات.", en: "A bookmark for the Quran: the verse inside an arched mihrab of two lines, an eight-point star at its head, the surah name below. A gift for memorisation circles." },
  tags: ["فاصل", "مصحف", "آية", "قرآن", "محراب", "تحفيظ", "bookmark"],
  sizes: [more.bookmark, more.bookmarkW],
  palettes: [
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.gold, inks.sage, inks.olive),
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.navy, inks.goldDeep, inks.teal, inks.sand),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.sky, inks.navy),
  ],
  fonts: ["amiri", "arefruqaa"],
  fields: [
    ml("verse", "الآية", "Verse", "أَلَا بِذِكْرِ اللَّهِ\nتَطْمَئِنُّ\nالْقُلُوبُ", 5),
    tf("surah", "السورة", "Surah", "سورة الرعد · ٢٨", 18),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, u, cx } = dims(ctx, 50, 150), s = u, m = 5 * s, lines = linesOf(val(ctx, "verse"), 5);
    return scene(W, H, p.paper,
      starTile(0, 0, W, H, 7 * s, 1 * s, p.accent, 0.08),
      g({ x: cx, y: H * 0.8, opacity: 0.25 }, rosetteLines(14 * s, p.accent, { rings: 4, lobes: 12, width: 0.2 * s })),
      g({ x: m, y: m }, path(archPath(W - 2 * m, H - 2 * m, 0.72), { fill: null, stroke: p.accent, strokeWidth: 0.6 * s })),
      g({ x: m + 2 * s, y: m + 3 * s }, path(archPath(W - 2 * m - 4 * s, H - 2 * m - 5 * s, 0.72), { fill: null, stroke: p.accent, strokeWidth: 0.2 * s })),
      g({ x: cx, y: 30 * s }, path(khatamPath(4 * s), { fill: p.accent }), path(khatamPath(1.6 * s), { fill: p.paper })),
      stack(lines, cx, 58 * s, 6 * s, Math.min(14 * s, 64 * s / Math.max(lines.length, 1)), { font: ctx.font, fill: p.ink, maxWidth: W - 16 * s }),
      line(val(ctx, "surah"), cx, 134 * s, 3.4 * s, { font: "amiri", fill: p.accent2, maxWidth: W - 16 * s }),
      beadRule(m + 6 * s, W - m - 6 * s, H * 0.62, p.accent, s, { bead: "diamond", pitch: 3, centre: true }),
    );
  },
};
export default t;
