import { incenseBurner, khatamPath, ringsNode, starTile } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-oud-perfume",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق عطر ودهن عود", en: "Oud perfume label" },
  note: { ar: "ملصق صغير فاخر لزجاجة عطر أو علبة بخور: مبخرة يتصاعد منها الدخان، ونجمة ثمانية، أسود وذهبي. للعطور الشرقية ودهن العود.", en: "A small luxurious label for a perfume bottle or incense box: a burner with rising smoke and an eight-point star, in black and gold. For oriental perfumes and oud oil." },
  tags: ["عطر", "عود", "بخور", "دهن عود", "مسك", "فاخر", "perfume"],
  sizes: [sizes.card, sizes.round50],
  palettes: [
    pal("black", "أسود", "Black", inks.charcoal, inks.gold, inks.gold, inks.goldDeep, inks.grey),
    pal("wine", "نبيذي", "Wine", inks.burgundy, inks.gold, inks.gold, inks.blush, inks.blush),
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.black, inks.goldDeep, inks.burgundy, inks.grey),
  ],
  fonts: ["arefruqaa", "amiri", "reemkufi"],
  fields: [
    tf("name", "اسم العطر", "Perfume", "عود ملكي", 14),
    tf("kind", "النوع", "Kind", "دهن عود كمبودي"),
    tf("volume", "الحجم", "Volume", "١٢ مل"),
    tf("maker", "الصانع", "Maker", "عطارة الحاج سعيد · نابلس"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 85, 55), round = W === H, k = round ? W / 50 : s;
    if (round) return scene(W, H, p.paper,
      g({ x: cx, y: 22 * k }, incenseBurner(15 * k, p.accent, p.accent2)),
      line(val(ctx, "name"), cx, 32 * k, 6.6 * k, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 32 * k }),
      line(val(ctx, "kind"), cx, 37 * k, 2.4 * k, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: 30 * k }),
      line(val(ctx, "volume"), cx, 41.6 * k, 2.4 * k, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: 20 * k }),
    );
    const R = W - 8 * s;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H, 6 * z, 0.6 * z, p.accent, 0.06),
      g({ x: W * 0.22, y: H * 0.42, opacity: 0.25 }, ringsNode(8 * z, 16 * z, 4, p.accent, 0.15 * z)),
      rect(3 * s, 3 * s, W - 6 * s, H - 6 * s, { fill: null, stroke: p.accent, strokeWidth: 0.35 * s }),
      g({ x: W * 0.22, y: H * 0.78 }, incenseBurner(H * 0.6, p.accent, p.accent2)),
      g({ x: R - 4 * s, y: 11 * s }, path(khatamPath(3 * s), { fill: p.accent })),
      line(val(ctx, "name"), R, 27 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: W * 0.54 }),
      line(val(ctx, "kind"), R, 34 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: W * 0.54 }),
      line(val(ctx, "volume"), R, 41 * s, 3.4 * s, { font: "tajawal", weight: 800, fill: p.accent, align: "start", maxWidth: W * 0.4 }),
      line(val(ctx, "maker"), R, 47 * s, 2.5 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: W * 0.54 }),
    );
  },
};
export default t;
