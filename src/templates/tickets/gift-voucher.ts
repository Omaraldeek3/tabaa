import { dotField, doubleFrame, rosetteLines, starTile } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tickets-gift-voucher",
  category: "tickets",
  lang: "ar",
  title: { ar: "قسيمة هدية بشريط وفيونكة", en: "Gift voucher with ribbon and bow" },
  note: { ar: "قسيمة هدية عرضية يلفّها شريط عمودي بفيونكة كأنها علبة، والقيمة كبيرة، وسطور للمُهدي والمُهدى إليه. للمحلات والصالونات والمطاعم.", en: "A landscape gift voucher wrapped by a vertical ribbon with a bow like a present, the value large, and lines for who it is from and to. For shops, salons and restaurants." },
  tags: ["قسيمة", "هدية", "فاوتشر", "فيونكة", "بطاقة هدية", "gift voucher"],
  sizes: [more.dlL],
  palettes: [
    pal("blush", "وردي", "Blush", inks.blush, inks.burgundy, inks.burgundy, inks.gold, inks.burgundy),
    pal("black", "أسود", "Black", inks.charcoal, inks.ivory, inks.gold, inks.red, inks.grey),
    pal("mint", "نعناعي", "Mint", inks.sage, inks.oliveDark, inks.red, inks.white, inks.oliveDark),
  ],
  fonts: ["arefruqaa", "lalezar", "marhey"],
  fields: [
    tf("title", "العنوان", "Title", "قسيمة هدية", 16),
    tf("value", "القيمة", "Value", "٢٠٠ شيكل", 12),
    tf("shop", "المحل", "Shop", "صالون لمسة · رام الله"),
    tf("to", "إلى", "To", ""),
    tf("from", "من", "From", ""),
    tf("valid", "الصلاحية", "Valid", "صالحة لمدة ستة أشهر من تاريخ الإصدار"),
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 210, 99), rx = W * 0.3, rw = 12 * s, R = W - 12 * s, tw = W - rx - rw / 2 - 22 * s;
    const bow = g({ x: rx, y: 26 * s },
      path(`M0 0 C${-14 * s} ${-14 * s} ${-26 * s} ${-2 * s} ${-16 * s} ${8 * s} C${-10 * s} ${12 * s} ${-4 * s} ${4 * s} 0 0 Z M0 0 C${14 * s} ${-14 * s} ${26 * s} ${-2 * s} ${16 * s} ${8 * s} C${10 * s} ${12 * s} ${4 * s} ${4 * s} 0 0 Z`, { fill: p.accent }),
      path(`M${-2 * s} ${2 * s} L${-10 * s} ${22 * s} L${-6 * s} ${20 * s} L${-3 * s} ${24 * s} Z M${2 * s} ${2 * s} L${10 * s} ${22 * s} L${6 * s} ${20 * s} L${3 * s} ${24 * s} Z`, { fill: p.accent }),
      rect(-3.4 * s, -3.4 * s, 6.8 * s, 6.8 * s, { fill: p.accent2, r: 1.4 * s }));
    const fill = (label: string, v: string, y: number) => [rect(R - tw, y, tw * 0.86, 0.3 * s, { fill: p.ink }), line(label, R, y - 0.4 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", safe: false }), line(v, R - 12 * s, y - 1.4 * s, 4.4 * s, { font: ctx.font, fill: p.ink, align: "start", maxWidth: tw * 0.7 })];
    return scene(W, H, p.paper,
      dotField(rx + rw, 0, W - rx - rw, H, 4 * s, 0.6 * s, p.paper, { fade: "left", opacity: 0.6 }),
      g({ x: rx, y: H * 0.62, opacity: 0.25 }, rosetteLines(22 * s, p.accent, { rings: 5, lobes: 14, width: 0.25 * s })),
      starTile(0, 0, rx - rw / 2 - 2 * s, H, 10 * s, 1.6 * s, p.accent, 0.08),
      rect(rx - rw / 2, -b, rw, H + 2 * b, { fill: p.accent }),
      bow,
      line(val(ctx, "title"), R, 22 * s, 13 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "value"), R, 44 * s, 15 * s, { font: ctx.font, weight: 700, fill: p.accent, align: "start", maxWidth: tw }),
      line(val(ctx, "shop"), R, 54 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      fill("إلى:", val(ctx, "to"), 68 * s), fill("من:", val(ctx, "from"), 79 * s),
      line(val(ctx, "valid"), R, 90 * s, 3 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: tw }),
      doubleFrame(4 * s, 4 * s, W - 8 * s, H - 8 * s, p.accent, p.paper, { gap: 2 * s, heavy: 0.5 * s, thin: 0.2 * s, corner: "diamond", r: 2 * s }),
    );
  },
};
export default t;
