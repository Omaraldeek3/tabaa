import { crescentPath, starPath } from "../../lib/motifs/index.ts";
import { type SceneNode, circle, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-newborn",
  category: "occasions",
  lang: "ar",
  title: { ar: "بطاقة مولود جديد", en: "New baby announcement" },
  note: { ar: "هلال ونجوم معلّقة بخيوط كلعبة فوق السرير. بطاقة إعلان مولود أو دعوة عقيقة.", en: "A crescent and stars hanging on threads like a cot mobile. A birth announcement or an aqiqa invitation." },
  tags: ["مولود", "مولودة", "عقيقة", "بيبي", "أطفال", "baby", "newborn"],
  sizes: [sizes.a6, sizes.square12, sizes.a5],
  palettes: [
    pal("sky", "سماوي", "Sky", inks.sky, inks.navy, inks.ivory, inks.mustard, inks.navy),
    pal("blush", "وردي", "Blush", inks.blush, inks.burgundy, inks.ivory, inks.rose, inks.burgundy),
    pal("mint", "نعنعي", "Mint", inks.sage, inks.oliveDark, inks.ivory, inks.terracotta, inks.oliveDark),
  ],
  fonts: ["marhey", "lalezar", "arefruqaa", "kufam"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "السطر العلوي", en: "Kicker" }, sample: "رُزقنا بحمد الله بمولودنا" },
    { id: "name", kind: "text", label: { ar: "اسم المولود", en: "Baby's name" }, sample: "آدم", maxLength: 16 },
    { id: "born", kind: "text", label: { ar: "تاريخ الميلاد", en: "Date of birth" }, sample: "٣ آذار ٢٠٢٧" },
    { id: "weight", kind: "text", label: { ar: "الوزن", en: "Weight" }, sample: "٣٫٤ كغم" },
    { id: "message", kind: "text", label: { ar: "الرسالة", en: "Message" }, sample: "جعله الله من الصالحين وأنبته نباتاً حسناً" },
    { id: "from", kind: "text", label: { ar: "من", en: "From" }, sample: "بابا وماما: محمد وهديل" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), max = W - 20 * s, drop = H * 0.3;
    const hang = (x: number, len: number, node: SceneNode) => g({ x: x * W, y: -b }, path(`M0 0 L0 ${len + b}`, { fill: null, stroke: p.soft, strokeWidth: 0.25 * s, opacity: 0.6 }), g({ y: len + b }, node));
    const star = (r: number) => path(starPath(5, r * s, r * 0.45 * s), { fill: p.accent2 });
    const y = (k: number) => drop + 8 * s + (H - drop - 8 * s) * k;
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      hang(0.16, drop * 0.5, star(4)), hang(0.32, drop * 0.82, star(3)), hang(0.7, drop * 0.72, star(3.4)), hang(0.86, drop * 0.42, star(4.4)),
      hang(0.5, drop * 0.3, g({ y: 9 * s, rotate: 205 }, path(crescentPath(10 * s, 0.5), { fill: p.accent }))),
      [[0.1, 0.9], [0.9, 0.86], [0.2, 0.96], [0.8, 0.95]].map(([x, yy]) => circle(x * W, yy * H, 0.7 * s, { fill: p.accent })),
      line(val(ctx, "kicker"), cx, y(0.12), 4.6 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, y(0.4), 26 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(joined(ctx, ["born", "weight"]), cx, y(0.55), 5 * s, { font: "tajawal", weight: 800, fill: p.accent2 === inks.mustard ? p.ink : p.accent2, maxWidth: max }),
      rect(cx - 9 * s, y(0.6), 18 * s, 0.35 * s, { fill: p.ink }),
      line(val(ctx, "message"), cx, y(0.72), 4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, y(0.84), 4.2 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
    );
  },
};
export default t;
