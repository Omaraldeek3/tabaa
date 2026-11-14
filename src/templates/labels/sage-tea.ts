import { dotField, doubleFrame, sageSprig } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-sage-tea",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق طولي لميرمية مجفّفة", en: "Tall dried sage label" },
  note: { ar: "ملصق طولي ضيّق لعلبة أو كيس: غصن ميرمية بأوراقه الفضّية يصعد الملصق كلّه، والاسم بالعرض فوقه. للأعشاب المجفّفة والشاي.", en: "A tall narrow label for a tin or bag: a sprig of silvery sage climbs its full height with the name across the top. For dried herbs and teas." },
  tags: ["ميرمية", "شاي", "أعشاب", "مجففة", "علبة", "ملصق", "sage"],
  sizes: [more.cardV, { id: "50x120", label: { ar: "طولي ٥٠×١٢٠ ملم", en: "Tall 50×120 mm" }, widthMm: 50, heightMm: 120 }],
  palettes: [
    pal("sage", "ميرمية", "Sage", inks.ivory, inks.oliveDark, inks.sage, inks.olive, inks.oliveDark),
    pal("dark", "داكن", "Dark", inks.oliveDark, inks.ivory, inks.sage, inks.sand, inks.ivory),
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.sage, inks.terracotta, inks.olive),
  ],
  fonts: ["arefruqaa", "rakkas", "amiri"],
  fields: [
    tf("name", "اسم المنتج", "Product", "ميرمية", 10),
    tf("note", "الوصف", "Description", "قطف جبال الخليل"),
    tf("weight", "الوزن", "Weight", "٥٠ غم"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, u, cx } = dims(ctx, 55, 85), s = u, top = 24 * s;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      dotField(0, H * 0.3, W, H * 0.7, 2.6 * z, 0.25 * z, p.accent, { fade: "up", opacity: 0.15 }),
      rect(-b, -b, W + 2 * b, top + b, { fill: p.accent2 }),
      line(val(ctx, "name"), cx, 14 * s, 10 * s, { font: ctx.font, weight: 700, fill: p.paper, maxWidth: W - 10 * s }),
      line(val(ctx, "note"), cx, 20.5 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.paper, maxWidth: W - 10 * s }),
      g({ x: cx, y: H - 10 * s }, sageSprig(H - top - 18 * s, p.accent, p.soft)),
      line(val(ctx, "weight"), cx, H - 5 - 1.2 * s, 3 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: W - 10 * s }),
      doubleFrame(2.4 * z, H * 0.3, W - 4.8 * z, H * 0.7 - 2.4 * z, p.accent, p.paper, { gap: 1 * z, heavy: 0.25 * z, thin: 0.1 * z, corner: "dot", r: 1 * z }),
    );
  },
};
export default t;
