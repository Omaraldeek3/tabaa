import { dotRing, khatamPath, poppy, rosetteLines, starTile, tatreezBand, tatreezUnit } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const hennaNight: Template = {
  id: "occasions-henna-night",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة ليلة الحنّاء", en: "Henna night invitation" },
  note: { ar: "دعوة داكنة دافئة لسهرة الحنّاء، بنجمة مثمّنة وشريطي تطريز وشقائق النعمان.", en: "A warm, dark invitation for the henna evening, with a khatam star, tatreez bands and poppies." },
  tags: ["حناء", "سهرة", "عروس", "تطريز", "henna"],
  sizes: [sizes.a5, sizes.invite, sizes.square15],
  palettes: [
    pal("henna", "حنّاء", "Henna", inks.burgundy, inks.paper, inks.gold, inks.red, inks.goldDeep),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.rose, inks.goldDeep),
    pal("olive", "زيتون", "Olive", inks.oliveDark, inks.ivory, inks.mustard, inks.terracotta, inks.sage),
  ],
  fonts: ["rakkas", "arefruqaa", "lalezar", "amiri"],
  fields: [
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "ليلة الحنّاء", maxLength: 20 },
    { id: "intro", kind: "text", label: { ar: "نص الدعوة", en: "Invitation line" }, sample: "ندعوكنّ لمشاركتنا فرحة عروستنا" },
    { id: "bride", kind: "text", label: { ar: "العروس", en: "Bride" }, sample: "ريم", maxLength: 24 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "الأربعاء ١٠ حزيران ٢٠٢٧" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "من الثامنة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "بيت العائلة، رام الله" },
    { id: "note", kind: "text", label: { ar: "ملاحظة", en: "Note" }, sample: "السهرة للسيدات فقط" },
  ],
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette;
    const u = W / 148, v = H / 210, s = Math.min(u, v), cx = W / 2, max = W - 30 * s;
    const bandH = 7 * s, cy = 70 * v, r = 34 * s;
    const flowers = [[-0.33, 0.2, 13], [0.33, 0.2, 13], [-0.22, -0.05, 9], [0.22, -0.05, 9]] as const;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      starTile(0, H * 0.08, W, H * 0.84, 9 * z, 1 * z, p.accent, 0.07),
      g({ x: W / 2, y: H * 0.33, opacity: 0.3 }, rosetteLines(34 * z, p.accent, { rings: 3, lobes: 16, width: 0.2 * z })),
      g({ x: -3, y: 12 * v }, tatreezBand("chain", W + 6, bandH, [p.accent, p.accent2])),
      g({ x: -3, y: H - 12 * v - bandH }, tatreezBand("chain", W + 6, bandH, [p.accent, p.accent2])),
      g({ x: cx, y: cy },
        path(khatamPath(r), { fill: p.accent }),
        path(khatamPath(r * 0.93), { fill: p.paper }),
        g({ rotate: 22.5 }, path(khatamPath(r * 0.86), { fill: null, stroke: p.accent, strokeWidth: 0.35 * s })),
        dotRing(r * 1.12, 32, 0.55 * s, p.accent),
      ),
      line(val(ctx, "title"), cx, cy + 6.5 * s, 17 * s, { font: ctx.font, fill: p.accent, maxWidth: r * 1.35 }),
      flowers.map(([fx, fy, fs]) => g({ x: cx + fx * W, y: cy + r + fy * r + 12 * s }, poppy(fs * s, p.accent2, p.paper))),
      g({ x: cx - 4.5 * s, y: cy + r + 4 * s }, tatreezUnit("diamond", 9 * s, [p.accent, p.accent2])),
      line(val(ctx, "intro"), cx, 132 * v, 5.4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "bride"), cx, 153 * v, 24 * s, { font: ctx.font, fill: p.ink, maxWidth: max }),
      rect(cx - 20 * s, 158 * v, 40 * s, 0.35 * s, { fill: p.accent }),
      circle(cx, 158 * v + 0.17 * s, 1.1 * s, { fill: p.accent }),
      line(val(ctx, "date"), cx, 169 * v, 6 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: max }),
      line([val(ctx, "time"), val(ctx, "venue")].filter(Boolean).join("  ·  "), cx, 178 * v, 5 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "note"), cx, 187 * v, 4.2 * s, { font: "amiri", fill: p.accent, maxWidth: max }),
    );
  },
};

export default hennaNight;
