import { dotField, dotRing, leafPath, rosetteLines, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stickers-en-plastic-free",
  category: "stickers",
  lang: "en",
  title: { ar: "ستيكر «بلا بلاستيك» بالإنجليزية", en: "Plastic-free sticker" },
  note: { ar: "ستيكر إنجليزي للتغليف الصديق للبيئة: ورقتان متقابلتان داخل دائرة كسهم إعادة التدوير، و«Plastic free». للمتاجر التي تغلّف بالورق والقماش.", en: "An English sticker for eco packaging: two leaves turning round inside a circle like a recycling loop, with the words plastic free. For shops that wrap in paper and cloth." },
  tags: ["plastic free", "english", "eco", "packaging", "sticker", "بيئة", "إنجليزي"],
  sizes: [sizes.round50, sizes.round70],
  shape: "round",
  palettes: [
    pal("leaf", "ورق", "Leaf", inks.ivory, inks.oliveDark, inks.olive, inks.sage, inks.sand),
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.oliveDark, inks.olive, inks.ivory),
    pal("teal", "فيروزي", "Teal", inks.teal, inks.ivory, inks.ivory, inks.sage, inks.ivory),
  ],
  fonts: ["inter", "playfairdisplay"],
  fields: [
    tf("title", "العبارة", "Words", "Plastic free", 14),
    tf("sub", "سطر", "Line", "reuse · recycle · compost", 26),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, cx } = dims(ctx, 50, 50), k = W / 50, c = W / 2;
    return scene(W, W, p.paper,
      g({ x: c, y: c }, circle(0, 0, W / 2 - 4.6 * k, { fill: p.accent2, opacity: 0.12 }), rosetteLines(W / 2 - 5 * k, p.accent, { rings: 3, lobes: 18, width: 0.15 * k, opacity: 0.35 })),
      dotField(c - 14 * k, 41 * k, 28 * k, 4 * k, 1.6 * k, 0.25 * k, p.accent, { opacity: 0.6 }),
      circle(c, c, W / 2 - 3 * k, { fill: null, stroke: p.accent, strokeWidth: 0.6 * k }),
      g({ x: c, y: 18 * k }, g({ rotate: -140, x: 1 * k }, path(leafPath(10 * k, 3.4 * k), { fill: p.accent })), g({ rotate: 40, x: -1 * k }, path(leafPath(10 * k, 3.4 * k), { fill: p.accent2 }))),
      line(val(ctx, "title"), cx, 33 * k, 5.6 * k, { font: ctx.font, weight: 800, fill: p.ink, maxWidth: 34 * k }),
      line(val(ctx, "sub"), cx, 38.4 * k, 2.4 * k, { font: "inter", weight: 500, fill: p.ink, maxWidth: 28 * k }),
      g({ x: c, y: c }, dotRing(W / 2 - 1.6 * k, 48, 0.3 * k, p.accent2)),
      [c - 13 * k, c + 13 * k].map(x => g({ x, y: 33 * k - 2 * k }, path(starPath(4, 1.2 * k, 0.35 * k), { fill: p.accent2 }))),
    );
  },
};
export default t;
