import { dotField, doubleFrame, rays, ribbon, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-mabrouk",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة «ألف مبروك»", en: "Alf mabrouk congratulations card" },
  note: { ar: "بطاقة تهنئة عامة صاخبة: «ألف مبروك» فوق شمس من الأشعة وشريط يحمل المناسبة. للنجاح والترقية والبيت والسيارة.", en: "A loud all-purpose card: the greeting over a sunburst with a ribbon naming the occasion. For exam results, promotions, a new home or car." },
  tags: ["مبروك", "تهنئة", "نجاح", "ترقية", "ألف مبروك", "congratulations"],
  sizes: [sizes.a6, sizes.square12, sizes.a6l],
  palettes: [
    pal("sun", "شمس", "Sun", inks.mustard, inks.black, inks.red, inks.black, inks.ivory),
    pal("sea", "بحر", "Sea", inks.teal, inks.ivory, inks.mustard, inks.navy, inks.ivory),
    pal("rose", "ورد", "Rose", inks.blush, inks.burgundy, inks.rose, inks.burgundy, inks.ivory),
  ],
  fonts: ["lalezar", "rakkas", "marhey", "kufam"],
  fields: [
    { id: "title", kind: "text", label: { ar: "التهنئة", en: "Greeting" }, sample: "ألف مبروك", maxLength: 16 },
    { id: "occasion", kind: "text", label: { ar: "المناسبة", en: "Occasion" }, sample: "النجاح في التوجيهي", maxLength: 30 },
    { id: "name", kind: "text", label: { ar: "إلى", en: "To" }, sample: "يا أحمد", maxLength: 24 },
    { id: "message", kind: "text", label: { ar: "الرسالة", en: "Message" }, sample: "تعبك أثمر، وإلى الأعلى دائماً" },
    { id: "from", kind: "text", label: { ar: "من", en: "From" }, sample: "خالك وعيلته" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), max = W - 20 * s, cy = H * 0.36, r = Math.min(30 * s, H * 0.2), rw = Math.min(max * 0.9, 76 * s);
    const y = (k: number) => cy + r + (H - cy - r) * k;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      dotField(0, 0, W, H, 4 * z, 0.4 * z, p.paper, { opacity: 0.12 }),
      g({ x: cx, y: cy, opacity: 0.22 }, rays(20, r * 0.6, Math.hypot(W, H), p.ink, 0.5)),
      g({ x: cx, y: cy }, circle(0, 0, r, { fill: p.accent }), circle(0, 0, r * 0.9, { fill: null, stroke: p.soft, strokeWidth: 0.4 * s })),
      [[-1.3, -0.8, 3.4], [1.3, -0.7, 2.6], [-1.45, 0.3, 2], [1.4, 0.5, 3]].map(([x, yy, k]) => g({ x: cx + x * r, y: cy + yy * r, rotate: x * 20 }, path(starPath(5, k * s, k * 0.42 * s), { fill: p.accent2 }))),
      line(val(ctx, "title"), cx, cy + r * 0.16, r * 0.62, { font: ctx.font, weight: 800, fill: p.soft, maxWidth: r * 1.66 }),
      g({ x: cx, y: y(0.14) }, ribbon(rw, 9 * s, p.accent2, p.accent)),
      line(val(ctx, "occasion"), cx, y(0.14) + 1.9 * s, 5 * s, { font: "tajawal", weight: 800, fill: p.accent2 === inks.black || p.accent2 === inks.navy || p.accent2 === inks.burgundy ? inks.ivory : p.ink, maxWidth: rw * 0.9 }),
      line(val(ctx, "name"), cx, y(0.44), 11 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "message"), cx, y(0.6), 4.6 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      rect(cx - 8 * s, y(0.67), 16 * s, 0.4 * s, { fill: p.ink }),
      line(val(ctx, "from"), cx, y(0.8), 4.4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      doubleFrame(5 * z, 5 * z, W - 10 * z, H - 10 * z, p.ink, p.paper, { gap: 1.6 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "star", r: 2 * z }),
    );
  },
};
export default t;
