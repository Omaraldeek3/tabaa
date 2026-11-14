import { dotField, doubleFrame, iceCream, starPath } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { priced, tf } from "../fields.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "menus-ice-cream-parlour",
  category: "menus",
  lang: "ar",
  title: { ar: "منيو بوظة بالكوز", en: "Ice cream parlour menu" },
  note: { ar: "كوز بوظة بثلاث طابات ملوّنة يقف في زاوية المنيو ونقاط سكاكر حوله، بألوان الحلوى. لمحلات البوظة العربية والجيلاتي.", en: "A cone with three coloured scoops stands in the menu's corner with sprinkles round it, in sweet-shop colours. For Arabic ice cream and gelato shops." },
  tags: ["منيو", "بوظة", "آيس كريم", "جيلاتي", "حلويات", "صيف", "ice cream"],
  sizes: [sizes.a5, sizes.a4],
  palettes: [
    pal("pastel", "باستيل", "Pastel", inks.blush, inks.burgundy, inks.rose, inks.sky, inks.mustard),
    pal("mint", "نعناع", "Mint", inks.sage, inks.oliveDark, inks.ivory, inks.rose, inks.mustard),
    pal("cream", "قشدي", "Cream", inks.ivory, inks.navy, inks.sky, inks.rose, inks.mustard),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("name", "اسم المحل", "Shop name", "بوظة ركب", 16),
    tf("tagline", "الشعار", "Tagline", "بوظة عربية بالمستكة والسحلب"),
    priced("list", "النكهات", "Flavours", [["قشطة بالفستق", "٨"], ["مستكة", "٨"], ["شوكولاتة", "٨"], ["فراولة", "٨"], ["مانجا", "٩"], ["كاسة عائلية", "٢٥"], ["كيلو", "٤٥"]], 9),
    tf("footer", "التذييل", "Footer", "شارع ركب، رام الله · حتى منتصف الليل"),
  ],
  safeMm: 7,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 148, 210), top = 64 * s, R = W - 14 * s;
    const sprinkles = Array.from({ length: 14 }, (_, i) => circle(W * (0.05 + ((i * 37) % 30) / 100), H * (0.5 + ((i * 53) % 44) / 100), 0.9 * s, { fill: [p.accent, p.accent2, p.soft][i % 3] }));
    const z = Math.min(W, H) / 148;
    return scene(W, H, p.paper,
      dotField(0, 0, W, H, 5 * z, 0.5 * z, p.paper, { opacity: 0.45 }),
      [[0.08, 0.1], [0.92, 0.88], [0.05, 0.9]].map(([x, y], i) => g({ x: W * x, y: H * y }, path(starPath(5, 2.4 * z, 1 * z), { fill: i % 2 ? p.accent2 : p.accent, opacity: 0.6 }))),
      sprinkles,
      g({ x: W * 0.17, y: H - 12 * s }, iceCream(H * 0.42, inks.goldDeep, inks.sand, [p.accent2, p.soft, p.accent === inks.ivory ? inks.rose : p.accent])),
      line(val(ctx, "name"), cx, 28 * s, 17 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 24 * s }),
      line(val(ctx, "tagline"), cx, 40 * s, 5 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 24 * s }),
      priceList(ctx, "list", { nameX: R, priceX: W * 0.4, top, pitch: Math.min(13 * s, (H - top - 24 * s) / 9), size: 6.2 * s, max: 9, ink: p.ink, priceInk: p.ink, rule: p.accent2 }),
      line(val(ctx, "footer"), R, H - 10 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.6 }),
      doubleFrame(5 * z, 5 * z, W - 10 * z, H - 10 * z, p.accent, p.paper, { gap: 1.6 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "dot", r: 2 * z }),
    );
  },
};
export default t;
