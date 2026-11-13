import { manousheh } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { priced, tf } from "../fields.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "menus-manaqeesh-bakery",
  category: "menus",
  lang: "ar",
  title: { ar: "منيو فرن مناقيش بالطابون", en: "Manaqeesh bakery menu" },
  note: { ar: "فتحة طابون مقوّسة في أعلى المنيو تخرج منها منقوشة زعتر مدوّرة، والأصناف تحتها. للأفران ومحلات المناقيش والفطائر.", en: "An arched taboon mouth at the head of the menu with a round za'atar manousheh coming out of it, the items below. For bakeries and manaqeesh shops." },
  tags: ["منيو", "فرن", "مناقيش", "زعتر", "طابون", "فطائر", "bakery"],
  sizes: [sizes.a4, sizes.a5],
  palettes: [
    pal("clay", "طين", "Clay", inks.paper, inks.black, inks.terracotta, inks.oliveDark, inks.sand),
    pal("night", "ليل", "Night", inks.charcoal, inks.ivory, inks.terracotta, inks.sage, inks.grey),
    pal("wheat", "قمح", "Wheat", inks.sand, inks.black, inks.burgundy, inks.oliveDark, inks.ivory),
  ],
  fonts: ["rakkas", "lalezar", "arefruqaa"],
  fields: [
    tf("name", "اسم الفرن", "Bakery name", "فرن الطابون", 18),
    tf("tagline", "الشعار", "Tagline", "خبز وفطائر على الحطب من الفجر"),
    priced("list", "الأصناف", "Items", [["منقوشة زعتر وزيت", "٤"], ["جبنة عكاوي", "٨"], ["زعتر وجبنة", "٧"], ["لحمة بعجين", "١٠"], ["سبانخ", "٥"], ["محمّرة", "٦"], ["كعك بالسمسم", "٣"], ["خبز طابون (ربطة)", "٦"]], 10),
    tf("footer", "التذييل", "Footer", "حارة الياسمينة، نابلس · من ٥ صباحاً حتى الظهر"),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, b, u, v, cx } = dims(ctx, 210, 297), s = u, aw = W * 0.56, ah = 66 * v, ty = ah + 28 * v + aw * 0.36, top = ty + 16 * v;
    const mouth = `M${cx - aw / 2} ${ah + 20 * v} V${50 * v} A${aw / 2} ${aw / 2 * 0.6} 0 0 1 ${cx + aw / 2} ${50 * v} V${ah + 20 * v} Z`;
    return scene(W, H, p.paper,
      path(`M${-b} ${-b} H${W + b} V${ah + 26 * v} H${-b} Z`, { fill: p.accent }),
      path(mouth, { fill: inks.black }),
      g({ x: cx, y: ah + 18 * v }, manousheh(aw * 0.36, inks.sand, p.accent2, inks.goldDeep)),
      line(val(ctx, "name"), cx, 26 * v, 15 * s, { font: ctx.font, weight: 700, fill: inks.ivory, maxWidth: W - 30 * s }),
      line(val(ctx, "tagline"), cx, ty, 7 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: W - 30 * s }),
      priceList(ctx, "list", { nameX: W - 26 * s, priceX: 26 * s, top, pitch: Math.min(15 * v, (H - top - 30 * v) / 10), size: 8.4 * s, max: 10, ink: p.ink, priceInk: p.accent, rule: p.accent2 }),
      line(val(ctx, "footer"), cx, H - 16 * v, 5.6 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 30 * s }),
    );
  },
};
export default t;
