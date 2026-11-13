import { friedEgg } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { priced, tf } from "../fields.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "menus-en-brunch",
  category: "menus",
  lang: "en",
  title: { ar: "منيو فطور متأخر بالإنجليزية", en: "Brunch menu" },
  note: { ar: "منيو إنجليزي هادئ: بيضة مقلية كبيرة كشمس الصباح في أعلاه، والأصناف بحروف سيريف مع وصف قصير. للمقاهي ومطاعم الفطور.", en: "A calm English menu: a big fried egg like a morning sun at the top, then dishes in serif type with short descriptions. For cafés and breakfast spots." },
  tags: ["brunch", "english", "breakfast", "cafe", "menu", "فطور", "إنجليزي", "منيو"],
  sizes: [sizes.a4, sizes.a5],
  palettes: [
    pal("morning", "صباح", "Morning", inks.ivory, inks.black, inks.white, inks.mustard, inks.sand),
    pal("sage", "مريمي", "Sage", inks.sage, inks.oliveDark, inks.ivory, inks.orange, inks.olive),
    pal("blue", "أزرق", "Blue", inks.sky, inks.navy, inks.white, inks.mustard, inks.navy),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    tf("name", "الاسم", "Name", "Sunny Side", 18),
    tf("tagline", "الشعار", "Tagline", "Brunch served all day"),
    priced("list", "الأصناف", "Dishes", [["Shakshuka, za'atar bread", "38"], ["Labneh plate, olives, mint", "32"], ["Ful with lemon & chilli", "28"], ["Halloumi & tomato toast", "34"], ["Knafeh pancakes", "36"], ["Fresh orange juice", "14"], ["Cardamom coffee", "10"]], 9),
    tf("footer", "التذييل", "Footer", "Open 8–3 · Jaffa Street, Haifa"),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, u, v, cx } = dims(ctx, 210, 297), s = u, top = 128 * v, L = 22 * s, R = W - 22 * s;
    return scene(W, H, p.paper,
      g({ x: cx, y: 46 * v }, friedEgg(30 * s, p.accent, p.accent2)),
      line(val(ctx, "name"), cx, 96 * v, 20 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 40 * s }),
      line(val(ctx, "tagline"), cx, 108 * v, 6 * s, { font: "inter", weight: 500, fill: p.ink, maxWidth: W - 40 * s, tracking: 0.5 * s }),
      priceList(ctx, "list", { nameX: L, priceX: R, top, pitch: Math.min(17 * v, (H - top - 30 * v) / 9), size: 7.4 * s, max: 9, ink: p.ink, priceInk: p.ink, rule: p.soft, font: "playfairdisplay", priceFont: "inter", dir: "ltr" }),
      rect(cx - 10 * s, H - 26 * v, 20 * s, 0.4 * s, { fill: p.ink }),
      line(val(ctx, "footer"), cx, H - 15 * v, 5 * s, { font: "inter", weight: 500, fill: p.ink, maxWidth: W - 40 * s }),
    );
  },
};
export default t;
