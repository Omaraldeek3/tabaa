import { poppy } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-thank-you",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة «شكراً» بثلاث حنّونات", en: "Thank-you card with three poppies" },
  note: { ar: "بطاقة شكر عرضية هادئة: ثلاث حنّونات على جانب، وكلمة «شكراً» كبيرة وسطران لكلامك. تُرفق مع الطلبيات والهدايا.", en: "A calm landscape thank-you card: three poppies at one side, the word large, and two lines for your own words. Tuck it in with orders and gifts." },
  tags: ["شكراً", "شكر", "امتنان", "حنون", "طلبية", "هدية", "thank you"],
  sizes: [sizes.a6l, sizes.card, sizes.square12],
  palettes: [
    pal("paper", "ورق", "Paper", inks.ivory, inks.black, inks.red, inks.olive, inks.grey),
    pal("blush", "خوخ", "Blush", inks.blush, inks.burgundy, inks.red, inks.oliveDark, inks.burgundy),
    pal("night", "ليل", "Night", inks.navy, inks.ivory, inks.rose, inks.sage, inks.sky),
  ],
  fonts: ["arefruqaa", "rakkas", "lalezar", "amiri"],
  fields: [
    { id: "title", kind: "text", label: { ar: "الكلمة", en: "Word" }, sample: "شكراً", maxLength: 16 },
    { id: "body", kind: "multiline", label: { ar: "النص", en: "Text" }, sample: "على ثقتكم بنا\nنتمنى أن تعجبكم الطلبية", maxLines: 2 },
    { id: "from", kind: "text", label: { ar: "التوقيع", en: "Signature" }, sample: "مشغل أم خليل" },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, cx } = dims(ctx, 148, 105), s = Math.min(W / 148, H / 105), tall = H >= W, side = tall ? 0 : W * 0.34, right = W - 9 * s, max = tall ? W - 18 * s : W - side - 16 * s;
    const heart = p.ink === inks.ivory ? inks.night : inks.black, ax = tall ? cx : right, align = tall ? "center" as const : "start" as const, top = tall ? H * 0.5 : H * 0.3;
    const flowers = tall
      ? [[0.3, 0.16, 15], [0.52, 0.1, 19], [0.72, 0.18, 13]].map(([x, yy, d]) => g({ x: x * W, y: yy * H + 10 * s }, poppy(d * s, p.accent, heart, { stem: p.accent2, stemLength: H * 0.4 - yy * H - 6 * s })))
      : [[0.3, 0.42, 17], [0.55, 0.24, 23], [0.8, 0.5, 14]].map(([x, yy, d]) => g({ x: x * side, y: yy * H }, poppy(d * s, p.accent, heart, { stem: p.accent2, stemLength: H - yy * H + b })));
    return scene(W, H, p.paper,
      flowers,
      tall ? rect(cx - 10 * s, H * 0.4, 20 * s, 0.4 * s, { fill: p.accent2 }) : rect(side + 2 * s, 12 * s, 0.4 * s, H - 24 * s, { fill: p.accent2 }),
      line(val(ctx, "title"), ax, top + 18 * s, 30 * s, { font: ctx.font, weight: 700, fill: p.accent, align, maxWidth: max }),
      stack(linesOf(val(ctx, "body"), 2), ax, top + 32 * s, 5.4 * s, 8 * s, { font: "amiri", fill: p.ink, align, maxWidth: max }),
      line(val(ctx, "from"), ax, top + 54 * s, 4.6 * s, { font: "amiri", weight: 700, fill: p.soft === inks.grey ? p.ink : p.soft, align, maxWidth: max }),
    );
  },
};
export default t;
