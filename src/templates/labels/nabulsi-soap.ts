import { guillocheNode, khatamPath, oliveBranch } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-nabulsi-soap",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق صابون نابلسي", en: "Nabulsi soap label" },
  note: { ar: "ملصق مربع كختم الصبّانات القديمة: إطاران ونجمة مثمّنة في الوسط واسم المصبنة حولها. يلفّ قالب الصابون أو يُلصق على علبته.", en: "A square label like the stamp of the old soap works: two frames, an eight-pointed star in the middle and the maker's name round it. Wraps the bar or seals its box." },
  tags: ["صابون", "نابلسي", "زيت زيتون", "ملصق", "مصبنة", "طبيعي", "label", "soap"],
  sizes: [more.sq60],
  palettes: [
    pal("stamp", "ختم", "Stamp", inks.ivory, inks.navy, inks.navy, inks.red, inks.sky),
    pal("olive", "زيتون", "Olive", inks.paper, inks.oliveDark, inks.olive, inks.goldDeep, inks.sage),
    pal("kraft", "كرتون", "Kraft", inks.sand, inks.black, inks.black, inks.red, inks.paper),
  ],
  fonts: ["reemkufi", "kufam", "arefruqaa", "rakkas"],
  fields: [
    { id: "top", kind: "text", label: { ar: "السطر العلوي", en: "Top line" }, sample: "صابون نابلسي", maxLength: 20 },
    { id: "name", kind: "text", label: { ar: "اسم المصبنة", en: "Maker" }, sample: "مصبنة الجمل", maxLength: 20 },
    { id: "detail", kind: "text", label: { ar: "الوصف", en: "Description" }, sample: "زيت زيتون بكر ١٠٠٪", maxLength: 26 },
    { id: "weight", kind: "text", label: { ar: "الوزن", en: "Weight" }, sample: "١٥٠ غم", maxLength: 12 },
    { id: "since", kind: "text", label: { ar: "منذ", en: "Since" }, sample: "منذ ١٩٢٠", maxLength: 14 },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, cx } = dims(ctx, 60, 60), s = W / 60, max = W - 16 * s;
    const z = W / 60;
    return scene(W, W, p.paper,
      guillocheNode(4 * z, 4 * z, W - 8 * z, W - 8 * z, p.accent, { waves: 8, amp: 0.6 * z, period: 9 * z, width: 0.1 * z, opacity: 0.15 }),
      rect(3.4 * s, 3.4 * s, W - 6.8 * s, W - 6.8 * s, { fill: null, stroke: p.accent, strokeWidth: 0.9 * s }),
      rect(5.4 * s, 5.4 * s, W - 10.8 * s, W - 10.8 * s, { fill: null, stroke: p.accent, strokeWidth: 0.2 * s }),
      [[1, 1], [-1, 1], [1, -1], [-1, -1]].map(([x, y]) => g({ x: cx + x * (W / 2 - 5.4 * s), y: cx + y * (W / 2 - 5.4 * s) }, path(khatamPath(1.5 * s), { fill: p.accent2 }))),
      line(val(ctx, "top"), cx, 15.6 * s, 5.4 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: max }),
      g({ x: cx, y: 24.4 * s }, path(khatamPath(5.6 * s), { fill: p.accent }), path(khatamPath(2.6 * s), { fill: p.paper }), path(khatamPath(1.2 * s), { fill: p.accent2 })),
      g({ x: cx + 8 * s, y: 24.4 * s }, oliveBranch(10 * s, p.accent, null, { leaves: 5, bend: 0.05 })),
      g({ x: cx - 8 * s, y: 24.4 * s, scaleX: -1 }, oliveBranch(10 * s, p.accent, null, { leaves: 5, bend: 0.05 })),
      line(val(ctx, "name"), cx, 39.4 * s, 8.4 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "detail"), cx, 45.6 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["weight", "since"]), cx, 51.4 * s, 2.9 * s, { font: "tajawal", weight: 800, fill: p.accent2 === inks.goldDeep ? p.accent : p.accent2, maxWidth: max }),
    );
  },
};
export default t;
