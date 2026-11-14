import { coffeeBean, doubleFrame, hatch, ringsNode } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-en-coffee-bag",
  category: "labels",
  lang: "en",
  title: { ar: "ملصق كيس قهوة بالإنجليزية", en: "Coffee bag label" },
  note: { ar: "ملصق إنجليزي لكيس قهوة محمّصة: حبوب بن مائلة متناثرة على نصف الملصق، والاسم والتحميص والطحنة في أعمدة. للمحامص الصغيرة.", en: "An English label for a bag of roasted coffee: tilted beans scattered over one half, with name, roast and grind in columns. For small roasters." },
  tags: ["coffee", "english", "roaster", "beans", "bag", "قهوة", "إنجليزي", "محمصة"],
  sizes: [more.label10070, { id: "70x100", label: { ar: "طولي ٧٠×١٠٠ ملم", en: "Tall 70×100 mm" }, widthMm: 70, heightMm: 100 }],
  palettes: [
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.charcoal, inks.terracotta, inks.ivory),
    pal("black", "أسود", "Black", inks.charcoal, inks.ivory, inks.goldDeep, inks.orange, inks.grey),
    pal("teal", "فيروزي", "Teal", inks.teal, inks.ivory, inks.charcoal, inks.mustard, inks.sand),
  ],
  fonts: ["inter", "playfairdisplay"],
  fields: [
    tf("name", "الاسم", "Name", "Old City Roast", 18),
    tf("blend", "الخلطة", "Blend", "with cardamom"),
    tf("roast", "التحميص", "Roast", "Medium-dark"),
    tf("grind", "الطحنة", "Grind", "Extra fine (Turkish)"),
    tf("weight", "الوزن", "Weight", "250 g"),
    tf("maker", "المحمصة", "Roaster", "Bab al-Amud Roasters, Jerusalem"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 100, 70), tall = H > W, L = 6 * s, ltr = { align: "start" as const, dir: "ltr" as const };
    const fieldW = tall ? W - 12 * s : W * 0.5, x0 = tall ? L : W * 0.46, y0 = tall ? H * 0.46 : 16 * s;
    const beans = Array.from({ length: 14 }, (_, i) => g({ x: (tall ? W : W * 0.4) * (((i * 37) % 100) / 100) , y: (tall ? H * 0.38 : H) * (((i * 61) % 100) / 100) }, coffeeBean(7 * s, p.accent, p.paper, (i * 47) % 180)));
    const z = Math.min(W, H) / 70;
    return scene(W, H, p.paper,
      g({ x: W * 0.2, y: H * 0.5, opacity: 0.12 }, ringsNode(6 * z, 30 * z, 7, p.ink, 0.2 * z)),
      hatch(W * 0.4, 0, W * 0.6, H, 2.4 * z, p.ink, 0.1 * z, 0.05),
      rect(-b, -b, tall ? W + 2 * b : W * 0.4 + b, tall ? H * 0.38 + b : H + 2 * b, { fill: p.soft }),
      beans,
      line(val(ctx, "name"), x0, y0, 7.4 * s, { ...ltr, font: ctx.font, weight: 800, fill: p.ink, maxWidth: fieldW }),
      line(val(ctx, "blend"), x0, y0 + 6 * s, 3.4 * s, { ...ltr, font: "playfairdisplay", fill: p.accent2, maxWidth: fieldW }),
      line(val(ctx, "roast") ? "ROAST  " + val(ctx, "roast") : "", x0, y0 + 16 * s, 2.8 * s, { ...ltr, font: "inter", weight: 600, fill: p.ink, maxWidth: fieldW }),
      line(val(ctx, "grind") ? "GRIND  " + val(ctx, "grind") : "", x0, y0 + 21 * s, 2.8 * s, { ...ltr, font: "inter", weight: 600, fill: p.ink, maxWidth: fieldW }),
      line(val(ctx, "weight"), x0, y0 + 31 * s, 5 * s, { ...ltr, font: "inter", weight: 800, fill: p.ink, maxWidth: fieldW }),
      line(val(ctx, "maker"), x0, y0 + 38 * s, 2.5 * s, { ...ltr, font: "inter", fill: p.ink, maxWidth: fieldW }),
      doubleFrame(2.4 * z, 2.4 * z, W - 4.8 * z, H - 4.8 * z, p.ink, p.paper, { gap: 1 * z, heavy: 0.3 * z, thin: 0.12 * z, corner: "bracket", r: 1.4 * z }),
    );
  },
};
export default t;
