import { wheat } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-freekeh",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق كيس فريكة مدخّنة", en: "Smoked freekeh bag label" },
  note: { ar: "ملصق كيس بطابع شوال: ثلاث سنابل قمح أخضر يتصاعد منها دخان الشَّوي، وخطوط خياطة على الحواف. للفريكة والبرغل والقمح البلدي.", en: "A sack-style bag label: three green wheat ears with roasting smoke curling up, and stitch lines at the edges. For freekeh, bulgur and local wheat." },
  tags: ["فريكة", "قمح", "برغل", "مونة", "كيس", "بلدي", "freekeh"],
  sizes: [sizes.label9060, sizes.card90],
  palettes: [
    pal("sack", "خيش", "Sack", inks.sand, inks.black, inks.olive, inks.grey, inks.terracotta),
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.sage, inks.ivory, inks.mustard),
    pal("white", "أبيض", "White", inks.ivory, inks.oliveDark, inks.olive, inks.grey, inks.terracotta),
  ],
  fonts: ["rakkas", "lalezar", "reemkufi"],
  fields: [
    tf("name", "اسم المنتج", "Product", "فريكة بلدية", 14),
    tf("kind", "النوع", "Kind", "حبّ كامل · مدخّنة على الحطب"),
    tf("origin", "المنشأ", "Origin", "من سهل مرج ابن عامر"),
    tf("weight", "الوزن", "Weight", "١ كغم"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 90, 60), R = W - 7 * s, max = W * 0.56, st = 2.6 * s;
    const stitch = (y: number) => Array.from({ length: Math.ceil((W + 2 * b) / (2 * st)) }, (_, i) => `M${-b + i * 2 * st} ${y} h${st}`).join(" ");
    return scene(W, H, p.paper,
      path(`${stitch(3 * s)} ${stitch(H - 3 * s)}`, { fill: null, stroke: p.ink, strokeWidth: 0.35 * s, opacity: 0.6 }),
      path(`M${W * 0.18} ${H * 0.24} c${-3 * s} ${-4 * s} ${3 * s} ${-6 * s} 0 ${-10 * s} M${W * 0.26} ${H * 0.2} c${3 * s} ${-4 * s} ${-3 * s} ${-6 * s} 0 ${-9 * s}`, { fill: null, stroke: p.accent2, strokeWidth: 0.6 * s, opacity: 0.7 }),
      [-1, 0, 1].map(k => g({ x: W * 0.22 + k * 6 * s, y: H - 7 * s, rotate: k * 14 }, wheat(H * 0.62, p.accent))),
      line(val(ctx, "name"), R, 20 * s, 10 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "kind"), R, 29 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "origin"), R, 35.6 * s, 3.2 * s, { font: "tajawal", fill: p.ink, align: "start", maxWidth: max }),
      val(ctx, "weight") ? rect(R - 22 * s, 40.6 * s, 22 * s, 8 * s, { fill: p.soft, r: 1 * s }) : null,
      line(val(ctx, "weight"), R - 11 * s, 46.4 * s, 4 * s, { font: "tajawal", weight: 800, fill: p.paper, maxWidth: 19 * s }),
    );
  },
};
export default t;
