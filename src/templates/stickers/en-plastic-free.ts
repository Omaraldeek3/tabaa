import { leafPath } from "../../lib/motifs/index.ts";
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
      circle(c, c, W / 2 - 3 * k, { fill: null, stroke: p.accent, strokeWidth: 0.6 * k }),
      g({ x: c, y: 18 * k }, g({ rotate: -140, x: 1 * k }, path(leafPath(10 * k, 3.4 * k), { fill: p.accent })), g({ rotate: 40, x: -1 * k }, path(leafPath(10 * k, 3.4 * k), { fill: p.accent2 }))),
      line(val(ctx, "title"), cx, 33 * k, 5.6 * k, { font: ctx.font, weight: 800, fill: p.ink, maxWidth: 34 * k }),
      line(val(ctx, "sub"), cx, 38.4 * k, 2.4 * k, { font: "inter", weight: 500, fill: p.ink, maxWidth: 28 * k }),
    );
  },
};
export default t;
