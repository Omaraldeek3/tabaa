import { burstLines, doubleFrame, starTile } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "programmes-welcome-sign",
  category: "programmes",
  lang: "ar",
  title: { ar: "لوحة «أهلاً وسهلاً» على مدخل الحفل", en: "Welcome sign for the party entrance" },
  note: { ar: "لوحة كبيرة تقف على حامل عند المدخل: حبال من الأضواء المعلّقة تتدلّى من أعلاها، و«أهلاً وسهلاً» بخط عريض، واسم المناسبة. للأعراس والخطوبات والسهرات.", en: "A large sign on an easel at the door: strings of hanging lights drape from the top, the welcome in heavy lettering, and the occasion. For weddings, engagements and evenings." },
  tags: ["أهلا وسهلا", "لوحة ترحيب", "مدخل", "عرس", "حفل", "welcome sign"],
  sizes: [sizes.poster5070, sizes.a3],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.mustard, inks.sky),
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.black, inks.goldDeep, inks.terracotta, inks.sand),
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.gold, inks.mustard, inks.sage),
  ],
  fonts: ["arefruqaa", "rakkas", "lalezar"],
  fields: [
    tf("title", "الترحيب", "Welcome", "أهلاً وسهلاً", 14),
    tf("lead", "السطر", "Line", "بكم في حفل خطوبة"),
    tf("names", "الاسمان", "Names", "رامي و ليلى", 24),
    tf("date", "التاريخ", "Date", "٢٢ · ٨ · ٢٠٢٧", 16),
  ],
  safeMm: 16,
  render(ctx) {
    const { W, H, p, b, u, cx } = dims(ctx, 500, 700), s = u;
    const strings = [0, 1, 2].map(k => { const y0 = -b, sag = (90 + k * 50) * s, x0 = -b + k * 30 * s, x1 = W + b - k * 30 * s; return { d: `M${x0} ${y0} Q${cx} ${y0 + sag * 2} ${x1} ${y0}`, x0, x1, y0, sag }; });
    const bulbs = strings.flatMap(({ x0, x1, y0, sag }, k) => Array.from({ length: 16 }, (_, i) => { const t = (i + 0.5) / 16, x = x0 + (x1 - x0) * t, y = y0 + 2 * (1 - t) * t * sag * 2; return [circle(x, y, 9 * s, { fill: [p.accent, p.accent2, p.soft][(i + k) % 3], opacity: 0.25 }), circle(x, y, 4.4 * s, { fill: [p.accent, p.accent2, p.soft][(i + k) % 3] })]; }));
    return scene(W, H, p.paper,
      g({ x: cx, y: H * 0.5, opacity: 0.08 }, burstLines(72, 40 * s, W, p.accent, 1.2 * s)),
      starTile(0, H * 0.82, W, H * 0.18, 34 * s, 5 * s, p.accent, 0.1),
      strings.map(st => path(st.d, { fill: null, stroke: p.ink, strokeWidth: 1.2 * s, opacity: 0.6 })), bulbs,
      line(val(ctx, "title"), cx, H * 0.5, 96 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: W - 90 * s }),
      line(val(ctx, "lead"), cx, H * 0.5 + 66 * s, 26 * s, { font: "amiri", fill: p.ink, maxWidth: W - 90 * s }),
      line(val(ctx, "names"), cx, H * 0.5 + 150 * s, 62 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 90 * s }),
      line(val(ctx, "date"), cx, H - 70 * s, 20 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: W - 90 * s }),
      doubleFrame(16 * s, 16 * s, W - 32 * s, H - 32 * s, p.accent, p.paper, { gap: 7 * s, heavy: 2 * s, thin: 0.8 * s, corner: "khatam", r: 9 * s }),
    );
  },
};
export default t;
