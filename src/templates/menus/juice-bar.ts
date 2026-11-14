import { citrusSlice, dotField, doubleFrame } from "../../lib/motifs/index.ts";
import { g, scene } from "../../lib/scene.ts";
import { priced, tf } from "../fields.ts";
import { dims, inks, line, pal, priceList, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "menus-juice-bar",
  category: "menus",
  lang: "ar",
  title: { ar: "منيو عصائر طولي", en: "Tall juice bar menu" },
  note: { ar: "منيو طولي ضيّق بحجم DL تتدحرج فيه شرائح البرتقال والليمون من الأعلى، بألوان حامضة. لمحلات العصير والكوكتيل.", en: "A narrow DL menu with orange and lemon slices tumbling in from the top, in sharp citrus colours. For juice and smoothie bars." },
  tags: ["منيو", "عصير", "كوكتيل", "برتقال", "ليمون", "طولي", "juice"],
  sizes: [sizes.dl, sizes.a5],
  palettes: [
    pal("citrus", "حمضيات", "Citrus", inks.ivory, inks.oliveDark, inks.orange, inks.olive, inks.mustard),
    pal("lime", "ليموني", "Lime", inks.sage, inks.oliveDark, inks.mustard, inks.oliveDark, inks.ivory),
    pal("berry", "توت", "Berry", inks.blush, inks.burgundy, inks.rose, inks.burgundy, inks.orange),
  ],
  fonts: ["marhey", "lalezar", "rakkas"],
  fields: [
    tf("name", "اسم المحل", "Shop name", "عصير الريف", 18),
    tf("tagline", "الشعار", "Tagline", "طبيعي ١٠٠٪ · بدون سكر مضاف"),
    priced("list", "العصائر", "Juices", [["برتقال طازج", "١٠"], ["ليمون ونعناع", "١٠"], ["جزر وبرتقال", "١٢"], ["رمان", "١٥"], ["أفوكادو بالعسل", "١٨"], ["كوكتيل فواكه", "١٦"], ["فراولة وموز", "١٤"], ["خرّوب بارد", "٨"]], 10),
    tf("footer", "التذييل", "Footer", "سوق رام الله · ٠٥٦٨ ٧٧٧ ٦٦٦"),
  ],
  safeMm: 6,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 99, 210), R = W - 9 * s, L = 9 * s, top = 72 * s;
    const z = Math.min(W, H) / 99;
    return scene(W, H, p.paper,
      dotField(0, H * 0.3, W, H * 0.7, 4 * z, 0.3 * z, p.accent2, { fade: "up", opacity: 0.15 }),
      g({ x: W * 0.12, y: 8 * s }, citrusSlice(18 * s, p.accent, p.accent2 === inks.olive ? inks.mustard : p.accent2, p.paper)),
      g({ x: W * 0.92, y: 22 * s }, citrusSlice(12 * s, p.accent2, p.soft, p.paper, 8)),
      g({ x: W * 0.5, y: -2 * s }, citrusSlice(9 * s, p.soft === inks.ivory ? p.accent : p.soft, p.accent, p.paper, 8)),
      line(val(ctx, "name"), cx, 46 * s, 14 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 18 * s }),
      line(val(ctx, "tagline"), cx, 56 * s, 4.2 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: W - 18 * s }),
      priceList(ctx, "list", { nameX: R, priceX: L, top, pitch: Math.min(12.5 * s, (H - top - 22 * s) / 10), size: 5.6 * s, max: 10, ink: p.ink, priceInk: p.accent, rule: p.accent2, font: "tajawal" }),
      line(val(ctx, "footer"), cx, H - 9 * s, 3.8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: W - 18 * s }),
      doubleFrame(4 * z, H * 0.3, W - 8 * z, H * 0.7 - 4 * z, p.accent, p.paper, { gap: 1.4 * z, heavy: 0.3 * z, thin: 0.12 * z, corner: "dot", r: 1.4 * z }),
    );
  },
};
export default t;
