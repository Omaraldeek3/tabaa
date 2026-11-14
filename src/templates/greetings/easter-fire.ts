import { burstLines, candleBundle, dotField, doubleFrame } from "../../lib/motifs/index.ts";
import { circle, g, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-easter-fire",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة عيد الفصح بشموع النور", en: "Easter card with the Holy Fire candles" },
  note: { ar: "حزمة الشموع الثلاث والثلاثين التي يُحمل بها النور المقدّس من كنيسة القيامة، مضاءة وسط هالة. للفصح المجيد و«المسيح قام».", en: "The bundle of thirty-three candles that carries the Holy Fire from the Church of the Holy Sepulchre, lit inside a halo. For Easter greetings." },
  tags: ["فصح", "عيد الفصح", "سبت النور", "القيامة", "شموع", "مسيحي", "easter"],
  sizes: [sizes.a6, sizes.square12],
  palettes: [
    pal("dawn", "فجر", "Dawn", inks.ivory, inks.burgundy, inks.orange, inks.mustard, inks.sand),
    pal("night", "ليل", "Night", inks.night, inks.ivory, inks.orange, inks.gold, inks.navy),
    pal("white", "أبيض", "White", inks.white, inks.navy, inks.orange, inks.goldDeep, inks.sky),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  fields: [
    tf("title", "العنوان", "Title", "المسيح قام", 16),
    tf("reply", "الرد", "Reply", "حقاً قام"),
    tf("line", "التهنئة", "Wish", "فصح مجيد وكل عام وأنتم بخير"),
    tf("from", "من", "From", "عائلة صبّاغ · القدس"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, bh = Math.min(H * 0.36, W * 0.6), by = 10 * s + bh, ty = by + bh * 0.25 + 12 * s;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      g({ x: W / 2, y: H * 0.15, opacity: 0.25 }, burstLines(48, 22 * z, 40 * z, p.accent, 0.3 * z)),
      dotField(0, H * 0.8, W, H * 0.2, 4 * z, 0.35 * z, p.accent, { fade: "up", opacity: 0.2 }),
      circle(cx, by - bh * 0.85, bh * 0.42, { fill: p.accent2, opacity: 0.22 }),
      circle(cx, by - bh * 0.85, bh * 0.28, { fill: p.accent2, opacity: 0.25 }),
      g({ x: cx, y: by }, candleBundle(bh, 11, p.paper === inks.night ? inks.ivory : inks.sand, p.accent, p.ink)),
      line(val(ctx, "title"), cx, ty, 14 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "reply"), cx, ty + 9 * s, 6 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "line"), cx, ty + 17 * s, 4 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "from"), cx, H - 7 - 3 * s, 3.8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      doubleFrame(5 * z, 5 * z, W - 10 * z, H - 10 * z, p.accent, p.paper, { gap: 1.6 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "dot", r: 2 * z }),
    );
  },
};
export default t;
