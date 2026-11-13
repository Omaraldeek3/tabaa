import { pickledVeg } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, more, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-pickles",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق مرطبان مخلّل بيتي", en: "Home pickles jar label" },
  note: { ar: "خيار وفلفل حار وجزر واقفين جنباً إلى جنب على يسار الملصق كأنهم في المرطبان، والاسم بخط عريض. للمخللات البيتية والتعاونيات.", en: "A cucumber, a chilli and a carrot stand side by side as if in the jar, beside the name in heavy type. For home pickles and co-ops." },
  tags: ["مخلل", "كبيس", "مرطبان", "ملصق", "خيار", "بيتي", "pickles"],
  sizes: [more.label10070, sizes.label9060],
  palettes: [
    pal("brine", "محلول", "Brine", inks.ivory, inks.oliveDark, inks.olive, inks.red, inks.orange),
    pal("red", "أحمر", "Red", inks.red, inks.ivory, inks.sage, inks.ivory, inks.orange),
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.olive, inks.red, inks.orange),
  ],
  fonts: ["lalezar", "rakkas", "marhey"],
  fields: [
    tf("name", "اسم المنتج", "Product", "كبيس مشكّل", 16),
    tf("kind", "النوع", "Kind", "خيار · فلفل حار · جزر · لفت"),
    tf("maker", "الصانع", "Maker", "تعاونية نساء عرّابة"),
    tf("weight", "الوزن", "Weight", "الوزن الصافي ١ كغم"),
    tf("date", "التاريخ", "Date", "كُبس في تشرين ٢٠٢٧"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 100, 70), R = W - 7 * s, max = W * 0.58;
    return scene(W, H, p.paper,
      rect(-b, H - 9 * s, W + 2 * b, 9 * s + b, { fill: p.accent }),
      g({ x: W * 0.2, y: H * 0.46 }, pickledVeg(W * 0.34, p.accent, p.accent2, p.soft, p.ink)),
      line(val(ctx, "name"), R, 22 * s, 11 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "kind"), R, 31 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "maker"), R, 40 * s, 3.6 * s, { font: "tajawal", weight: 800, fill: p.accent2 === inks.ivory ? p.ink : p.accent2, align: "start", maxWidth: max }),
      line(val(ctx, "date"), R, 47 * s, 3 * s, { font: "tajawal", fill: p.ink, align: "start", maxWidth: max }),
      line(joined(ctx, ["weight"]), W / 2, H - 3.4 * s - 2, 3 * s, { font: "tajawal", weight: 800, fill: p.paper === inks.red ? inks.red : inks.ivory, maxWidth: W - 14 * s }),
    );
  },
};
export default t;
