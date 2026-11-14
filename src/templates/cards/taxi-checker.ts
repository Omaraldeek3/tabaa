import { dotField, starPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { cardAr } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-taxi-checker",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت تكسي بشريط المربّعات", en: "Taxi card with a chequer strip" },
  note: { ar: "أصفر التكسي مع شريط مربّعات أبيض وأسود في المنتصف، ورقم الهاتف بأكبر حجم ممكن ليُقرأ من بعيد. للسائقين ومكاتب التكسي والتوصيل.", en: "Taxi yellow with a black-and-white chequer strip through the middle and the phone number as big as it will go. For drivers, cab offices and delivery." },
  tags: ["كرت", "تكسي", "سائق", "مكتب تكسي", "توصيل", "مواصلات", "taxi"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("taxi", "تكسي", "Taxi", inks.mustard, inks.black, inks.black, inks.white, inks.black),
    pal("black", "أسود", "Black", inks.charcoal, inks.mustard, inks.mustard, inks.charcoal, inks.ivory),
    pal("white", "أبيض", "White", inks.white, inks.black, inks.black, inks.mustard, inks.black),
  ],
  fonts: ["lalezar", "kufam", "jomhuria"],
  fields: cardAr({ name: "مكتب تكسي النجمة", role: "داخل المدينة وخارجها · ٢٤ ساعة", phone: "٠٥٩٩ ٩٩٩ ٠٠٠", address: "موقف الباصات الجديد، قلقيلية" }),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 85, 55), cy = H * 0.5, c = 3 * s, sq: string[] = [];
    for (let i = 0; i * c < W + 2 * b; i++) for (let j = 0; j < 2; j++) if ((i + j) % 2) sq.push(`M${-b + i * c} ${cy - c + j * c} h${c} v${c} h${-c} Z`);
    const max = W - 12 * s;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      dotField(0, 0, W, H * 0.3, 2.6 * z, 0.25 * z, p.ink, { fade: "down", opacity: 0.12 }),
      rect(-b, cy - c, W + 2 * b, 2 * c, { fill: p.accent2 }),
      path(sq.join(" "), { fill: p.accent }),
      line(val(ctx, "name"), cx, 13 * s, 6.4 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "role"), cx, 19.4 * s, 2.8 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "phone"), cx, 42 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "address"), cx, 48.4 * s, 2.5 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      [[3, 3], [W / z - 3, 3]].map(([x, y]) => g({ x: x * z, y: y * z }, path(starPath(5, 1.1 * z, 0.45 * z), { fill: p.ink }))),
    );
  },
};
export default t;
