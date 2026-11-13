import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-labneh-jar",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق لبنة مكعزلة بالزيت", en: "Labneh balls in oil label" },
  note: { ar: "ملصق دائري: كرات لبنة بيضاء مكدّسة في بحيرة زيت ذهبية داخل حلقة، والاسم يلتفّ بخط عريض فوقها. للّبنة المدحبرة ومنتجات الألبان البيتية.", en: "A round label: white labneh balls piled in a golden pool of oil inside a ring, the name in heavy type above. For labneh balls and home dairy." },
  tags: ["لبنة", "مكعزلة", "زيت", "ألبان", "مرطبان", "بيتي", "labneh"],
  sizes: [sizes.round70, sizes.round90],
  shape: "round",
  palettes: [
    pal("olive", "زيتي", "Olive", inks.olive, inks.ivory, inks.mustard, inks.white, inks.oliveDark),
    pal("blue", "أزرق", "Blue", inks.navy, inks.ivory, inks.gold, inks.white, inks.sky),
    pal("cream", "قشدي", "Cream", inks.ivory, inks.oliveDark, inks.mustard, inks.white, inks.olive),
  ],
  fonts: ["lalezar", "rakkas", "marhey"],
  fields: [
    tf("name", "اسم المنتج", "Product", "لبنة مكعزلة", 14),
    tf("note", "الوصف", "Description", "من حليب الماعز · بزيت الزيتون"),
    tf("weight", "الوزن", "Weight", "٦٠٠ غم", 10),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, s, cx } = dims(ctx, 70, 70), c = W / 2, pool = 15 * s;
    const balls = [[-6, 2], [0, 3], [6, 2], [-3, -2.5], [3, -2.5], [0, -7]].map(([x, y]) => g({}, circle(c + x * s, c + 4 * s + y * s, 3.6 * s, { fill: p.accent2 }), circle(c + x * s - 1.1 * s, c + 4 * s + y * s - 1.1 * s, 0.9 * s, { fill: p.accent, opacity: 0.5 })));
    return scene(W, W, p.paper,
      circle(c, c, W / 2 - 3.2 * s, { fill: null, stroke: p.ink, strokeWidth: 0.4 * s }),
      path(`M${c - pool} ${c + 4 * s} a${pool} ${pool * 0.62} 0 1 0 ${2 * pool} 0 a${pool} ${pool * 0.62} 0 1 0 ${-2 * pool} 0 Z`, { fill: p.accent }),
      balls,
      line(val(ctx, "name"), cx, 18 * s, 7.4 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 40 * s }),
      line(val(ctx, "note"), cx, 52 * s, 2.8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: 40 * s }),
      line(val(ctx, "weight"), cx, 58 * s, 3.2 * s, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: 20 * s }),
    );
  },
};
export default t;
