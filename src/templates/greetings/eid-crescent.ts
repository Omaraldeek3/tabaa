import { crescentPath, jerusalem, lantern, starPath } from "../../lib/motifs/index.ts";
import { type SceneNode, g, path, rect, scene } from "../../lib/scene.ts";
import { inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const eidCrescent: Template = {
  id: "greetings-eid-crescent",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة عيد بهلال وفوانيس", en: "Eid card with crescent and lanterns" },
  note: { ar: "بطاقة تهنئة ليلية: هلال وفوانيس معلّقة فوق أفق القدس. تصلح لعيد الفطر والأضحى ورمضان بتغيير العنوان.", en: "A night greeting card: a crescent and hanging lanterns over the Jerusalem skyline. Change the title for Eid or Ramadan." },
  tags: ["عيد", "رمضان", "تهنئة", "هلال", "فانوس", "القدس", "eid", "ramadan"],
  sizes: [sizes.a6l, sizes.square12, sizes.a5],
  palettes: [
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.gold, inks.navy, inks.goldDeep),
    pal("dusk", "غسق", "Dusk", inks.burgundy, inks.paper, inks.mustard, inks.black, inks.gold),
    pal("dawn", "فجر", "Dawn", inks.paper, inks.navy, inks.goldDeep, inks.teal, inks.gold),
  ],
  fonts: ["arefruqaa", "rakkas", "amiri", "reemkufi"],
  fields: [
    { id: "title", kind: "text", label: { ar: "التهنئة", en: "Greeting" }, sample: "عيد مبارك", maxLength: 22 },
    { id: "message", kind: "text", label: { ar: "الرسالة", en: "Message" }, sample: "كل عام وأنتم بخير، أعاده الله عليكم بالفرح والسلام" },
    { id: "from", kind: "text", label: { ar: "من", en: "From" }, sample: "مع محبة عائلة الحسيني" },
  ],
  render(ctx) {
    const { widthMm: W, heightMm: H } = ctx.size, p = ctx.palette, b = ctx.bleedMm + 0.5;
    const s = Math.min(W / 148, H / 105), cx = W / 2, max = W - 24 * s, skyH = Math.min(H * 0.26, W * 0.2);
    const stars: SceneNode[] = [[0.12, 0.3, 1.1], [0.2, 0.52, 0.7], [0.33, 0.16, 0.8], [0.44, 0.34, 0.6], [0.58, 0.14, 0.9], [0.9, 0.5, 0.7], [0.07, 0.62, 0.6], [0.94, 0.2, 0.8]]
      .map(([x, y, r]) => g({ x: x * W, y: y * (H - skyH) }, path(starPath(4, r * 1.5 * s, r * 0.45 * s), { fill: p.accent, opacity: 0.75 })));
    const lamps = [[0.1, 0.34], [0.2, 0.2], [0.9, 0.3]] as const;
    const mid = (H - skyH) * 0.52;
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      stars,
      g({ x: W * 0.82, y: (H - skyH) * 0.24, rotate: 200 }, path(crescentPath(10.5 * s, 0.5), { fill: p.accent })),
      lamps.map(([x, h]) => g({ x: x * W, y: -b }, path(`M0 0 L0 ${h * H * 0.5 + b}`, { fill: null, stroke: p.soft, strokeWidth: 0.25 * s }), g({ y: h * H * 0.5 + b }, lantern(22 * s, p.soft, p.accent)))),
      g({ x: -b, y: H - skyH + 0.5 }, jerusalem(W + 2 * b, skyH + b, p.accent2, p.accent, p.paper)),
      rect(-b, H - 0.2, W + 2 * b, b + 0.2, { fill: p.accent2 }),
      line(val(ctx, "title"), cx, mid + 4 * s, 25 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: W * 0.5 }),
      line(val(ctx, "message"), cx, mid + 17 * s, 5.2 * s, { font: "amiri", fill: p.ink, maxWidth: max * 0.86 }),
      line(val(ctx, "from"), cx, mid + 26 * s, 4.4 * s, { font: "amiri", weight: 700, fill: p.soft === inks.goldDeep ? p.accent : p.ink, maxWidth: max * 0.7 }),
    );
  },
};

export default eidCrescent;
