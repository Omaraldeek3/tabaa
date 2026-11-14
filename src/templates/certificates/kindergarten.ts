import { dotField, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { certAr } from "../fields.ts";
import { dims, inks, line, linesOf, pal, sizes, stack, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "certificates-kindergarten",
  category: "certificates",
  lang: "ar",
  title: { ar: "شهادة تخرّج روضة بالألوان", en: "Kindergarten graduation certificate" },
  note: { ar: "إطار من أقلام التلوين الملوّنة حول الشهادة، وشمس ونجوم في الزوايا، واسم الطفل بخط مرح كبير. لحفلات تخرّج الروضات والبستان.", en: "A frame of coloured crayons round the certificate, a sun and stars in the corners, and the child's name in large playful type. For kindergarten graduations." },
  tags: ["روضة", "تخرج", "أطفال", "بستان", "شهادة", "kindergarten"],
  sizes: [sizes.a4l],
  palettes: [
    pal("rainbow", "قوس قزح", "Rainbow", inks.white, inks.navy, inks.red, inks.teal, inks.mustard),
    pal("soft", "ناعم", "Soft", inks.ivory, inks.burgundy, inks.rose, inks.sky, inks.mustard),
    pal("green", "أخضر", "Green", inks.white, inks.oliveDark, inks.orange, inks.olive, inks.sky),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: certAr({ org: "روضة براعم الأقصى", title: "مبروك التخرّج", lead: "تشهد الروضة بأن البطل", name: "يامن", reason: "أنهى مرحلة البستان بنجاح وتفوّق\nوهو جاهز للصف الأول", date: "حزيران ٢٠٢٧", sign1: "مديرة الروضة", sign2: "المعلّمة" }),
  safeMm: 16,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 210), cw = 7 * s, max = W - 70 * s, cols = [p.accent, p.accent2, p.soft, p.ink];
    const crayon = (x: number, y: number, len: number, rot: number, c: typeof p.ink) => g({ x, y, rotate: rot }, rect(0, -cw / 2, len - cw, cw, { fill: c, r: 0.8 * s }), path(`M${len - cw} ${-cw / 2} L${len} 0 L${len - cw} ${cw / 2} Z`, { fill: c }), rect(len * 0.2, -cw / 2, len * 0.1, cw, { fill: inks.white, opacity: 0.5 }));
    const nx = Math.floor((W + 2 * b) / 46 / s), ny = Math.floor(H / 46 / s);
    const frame = [
      ...Array.from({ length: nx }, (_, i) => crayon(-b + i * 46 * s, 5 * s, 44 * s, 0, cols[i % 4])),
      ...Array.from({ length: nx }, (_, i) => crayon(-b + i * 46 * s + 44 * s, H - 5 * s, 44 * s, 180, cols[(i + 2) % 4])),
      ...Array.from({ length: ny }, (_, i) => crayon(5 * s, 14 * s + i * 46 * s + 44 * s, 44 * s, -90, cols[(i + 1) % 4])),
      ...Array.from({ length: ny }, (_, i) => crayon(W - 5 * s, 14 * s + i * 46 * s, 44 * s, 90, cols[(i + 3) % 4])),
    ];
    const sign = (label: string, x: number) => label ? [rect(x - 24 * s, 160 * s, 48 * s, 0.5 * s, { fill: p.ink }), line(label, x, 168 * s, 5 * s, { font: ctx.font, fill: p.ink, maxWidth: 48 * s })] : [];
    const z = Math.min(W, H) / 210;
    return scene(W, H, p.paper,
      dotField(16 * z, 16 * z, W - 32 * z, H - 32 * z, 6 * z, 0.5 * z, p.accent2, { opacity: 0.12 }),
      frame,
      g({ x: 34 * s, y: 34 * s }, circle(0, 0, 9 * s, { fill: p.soft }), path(Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return `M${Math.cos(a) * 11 * s} ${Math.sin(a) * 11 * s} L${Math.cos(a) * 15 * s} ${Math.sin(a) * 15 * s}`; }).join(" "), { fill: null, stroke: p.soft, strokeWidth: 1.4 * s })),
      [[W - 34 * s, 32 * s, 7], [W - 52 * s, 46 * s, 4], [36 * s, H - 40 * s, 5]].map(([x, y, r], i) => g({ x, y, rotate: i * 14 }, path(starPath(5, r * s, r * 0.45 * s), { fill: cols[i] }))),
      line(val(ctx, "org"), cx, 40 * s, 7 * s, { font: ctx.font, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "title"), cx, 66 * s, 20 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "lead"), cx, 82 * s, 6.4 * s, { font: ctx.font, fill: p.ink, maxWidth: max }),
      line(val(ctx, "name"), cx, 110 * s, 26 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: max }),
      stack(linesOf(val(ctx, "reason"), 3), cx, 128 * s, 6 * s, 9 * s, { font: ctx.font, fill: p.ink, maxWidth: max }),
      line(val(ctx, "date"), cx, 166 * s, 5 * s, { font: ctx.font, fill: p.ink, maxWidth: 50 * s }),
      sign(val(ctx, "sign1"), W - 66 * s), sign(val(ctx, "sign2"), 66 * s),
    );
  },
};
export default t;
