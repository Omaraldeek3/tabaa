import { ringsNode, starTile } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stickers-favour-names",
  category: "stickers",
  lang: "ar",
  title: { ar: "ستيكر توزيعات العرس بالاسمين", en: "Wedding favour sticker with both names" },
  note: { ar: "ستيكر صغير لعلب الملبّس والتوزيعات: الاسمان بينهما قلبان، في حلقة من حبّات اللؤلؤ، والتاريخ تحتهما.", en: "A small sticker for sugared-almond boxes and favours: the two names with two hearts between, inside a ring of pearls, the date below." },
  tags: ["توزيعات", "عرس", "ملبس", "ستيكر", "خطوبة", "favours"],
  sizes: [more.round40, sizes.round50],
  shape: "round",
  palettes: [
    pal("pearl", "لؤلؤ", "Pearl", inks.ivory, inks.burgundy, inks.goldDeep, inks.rose, inks.sand),
    pal("sage", "مريمي", "Sage", inks.white, inks.oliveDark, inks.goldDeep, inks.sage, inks.sage),
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.gold, inks.blush, inks.sky),
  ],
  fonts: ["arefruqaa", "amiri", "marhey"],
  fields: [
    tf("first", "الاسم الأول", "First name", "يوسف", 10),
    tf("second", "الاسم الثاني", "Second name", "سلمى", 10),
    tf("date", "التاريخ", "Date", "٢٠٢٧/٦/١٨", 12),
  ],
  safeMm: 3,
  render(ctx) {
    const { W, p, cx } = dims(ctx, 40, 40), k = W / 40, c = W / 2, r = W / 2 - 2.6 * k;
    const pearls = Array.from({ length: 30 }, (_, i) => { const a = (i / 30) * Math.PI * 2; return circle(c + Math.cos(a) * r, c + Math.sin(a) * r, 0.75 * k, { fill: p.accent }); });
    const heart = (x: number, sz: number) => g({ x, y: c - 0.6 * k }, path(`M0 ${sz} C${-1.8 * sz} ${-0.3 * sz} ${-1.2 * sz} ${-1.8 * sz} 0 ${-0.9 * sz} C${1.2 * sz} ${-1.8 * sz} ${1.8 * sz} ${-0.3 * sz} 0 ${sz} Z`, { fill: p.accent2 }));
    return scene(W, W, p.paper,
      g({ x: c, y: c }, circle(0, 0, r - 1.4 * k, { fill: p.accent2, opacity: 0.15 }), ringsNode(r - 3 * k, r - 2 * k, 2, p.accent, 0.12 * k, 0.6)),
      starTile(c - 14 * k, c - 3.4 * k, 28 * k, 6 * k, 3.6 * k, 0.45 * k, p.accent, 0.25),
      pearls, heart(c - 1.2 * k, 1.2 * k), heart(c + 1.4 * k, 0.9 * k),
      line(val(ctx, "first"), cx, 14.6 * k, 6 * k, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 24 * k }),
      line(val(ctx, "second"), cx, 28 * k, 6 * k, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 24 * k }),
      line(val(ctx, "date"), cx, 33.2 * k, 2.2 * k, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: 16 * k }),
    );
  },
};
export default t;
