import { crescentPath, khatamPath } from "../../lib/motifs/index.ts";
import { type SceneNode, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-en-eid",
  category: "greetings",
  lang: "en",
  title: { ar: "بطاقة عيد بالإنجليزية", en: "English Eid Mubarak card" },
  note: { ar: "بطاقة عيد بالإنجليزية للأهل والأصدقاء في الخارج: هلال في وسط بلاط من النجوم المثمّنة، والتهنئة تحته بحروف سيريف.", en: "An English Eid card for family and friends abroad: a crescent set in a floor of eight-pointed stars, with the greeting below in serif." },
  tags: ["eid", "english", "greeting", "mubarak", "ramadan", "عيد", "إنجليزي", "تهنئة"],
  sizes: [sizes.a6, sizes.square12, sizes.a5],
  palettes: [
    pal("teal", "فيروزي", "Teal", inks.ivory, inks.navy, inks.teal, inks.mustard, inks.grey),
    pal("plum", "برقوقي", "Plum", inks.paper, inks.burgundy, inks.burgundy, inks.gold, inks.grey),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.navy, inks.gold, inks.sky),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    { id: "title", kind: "text", label: { ar: "التهنئة", en: "Greeting" }, sample: "Eid Mubarak", maxLength: 20 },
    { id: "message", kind: "text", label: { ar: "الرسالة", en: "Message" }, sample: "Wishing you peace, joy and a full table" },
    { id: "from", kind: "text", label: { ar: "من", en: "From" }, sample: "WITH LOVE FROM THE HADDADS" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), top = H * 0.56, cols = 5, cell = (W + 2 * b) / cols, max = W - 22 * s;
    const tiles: SceneNode[] = [];
    for (let r = 0; r * cell < top + cell; r++) for (let c = 0; c < cols; c++)
      tiles.push(g({ x: -b + (c + 0.5) * cell, y: -b + (r + 0.5) * cell }, path(khatamPath(cell * 0.44), { fill: null, stroke: p.accent2, strokeWidth: 0.3 * s, opacity: 0.7 }), path(khatamPath(cell * 0.14), { fill: p.accent2, opacity: 0.8 })));
    const y = (k: number) => top + (H - top) * k;
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, top + b, { fill: p.accent }), tiles,
      rect(-b, top, W + 2 * b, H - top + b, { fill: p.paper }),
      g({ x: cx, y: top * 0.5 }, path(khatamPath(top * 0.36), { fill: p.accent }), path(khatamPath(top * 0.33), { fill: null, stroke: p.accent2, strokeWidth: 0.4 * s }), g({ rotate: 200 }, path(crescentPath(top * 0.17, 0.5), { fill: p.accent2 }))),
      line(val(ctx, "title"), cx, y(0.36), 14.5 * s, { font: ctx.font, weight: 600, fill: p.ink, maxWidth: max }),
      rect(cx - 9 * s, y(0.46), 18 * s, 0.4 * s, { fill: p.accent2 }),
      line(val(ctx, "message"), cx, y(0.62), 4.2 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, y(0.8), 2.6 * s, { font: "inter", weight: 700, fill: p.soft === inks.sky ? inks.sky : p.accent, tracking: 0.5 * s, maxWidth: max }),
    );
  },
};
export default t;
