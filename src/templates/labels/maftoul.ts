import { dotField, doubleFrame } from "../../lib/motifs/index.ts";
import { circle, rect, scene, type SceneNode } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-maftoul",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق مفتول مفتول باليد", en: "Hand-rolled maftoul label" },
  note: { ar: "شريط علوي من مئات الحبّات الصغيرة المكدّسة كالمفتول على الصينية، والاسم على أرضية سادة تحته. للمفتول والكسكس ومنتجات التعاونيات.", en: "A top band of hundreds of little grains heaped like maftoul on the tray, with the name on plain ground below. For maftoul, couscous and co-op goods." },
  tags: ["مفتول", "مونة", "تعاونية", "حبوب", "مطبخ فلسطيني", "maftoul"],
  sizes: [more.label10070, more.sq60],
  palettes: [
    pal("wheat", "قمح", "Wheat", inks.ivory, inks.black, inks.goldDeep, inks.mustard, inks.terracotta),
    pal("clay", "فخّار", "Clay", inks.terracotta, inks.ivory, inks.sand, inks.paper, inks.ivory),
    pal("olive", "زيتي", "Olive", inks.paper, inks.oliveDark, inks.goldDeep, inks.sand, inks.olive),
  ],
  fonts: ["arefruqaa", "rakkas", "lalezar"],
  fields: [
    tf("name", "اسم المنتج", "Product", "مفتول", 12),
    tf("note", "الوصف", "Description", "مفتول باليد من قمح بلدي"),
    tf("maker", "الصانع", "Maker", "جمعية سيدات بيت لاهيا"),
    tf("weight", "الوزن", "Weight", "٥٠٠ غم"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 100, 70), band = H * 0.36, grains: SceneNode[] = [];
    for (let i = 0; i < 420; i++) {
      const x = -b + ((i * 61) % 997) / 997 * (W + 2 * b), y = -b + ((i * 113) % 991) / 991 * (band + b - 1.4 * s);
      grains.push(circle(x, y, (0.55 + (i % 4) * 0.15) * s, { fill: i % 3 ? p.accent : p.soft }));
    }
    const max = W - 14 * s;
    const z = Math.min(W, H) / 70;
    return scene(W, H, p.paper,
      dotField(0, H * 0.4, W, H * 0.6, 3 * z, 0.3 * z, p.accent, { fade: "down", opacity: 0.12 }),
      rect(-b, -b, W + 2 * b, band + b, { fill: p.accent2 }),
      grains,
      rect(-b, band, W + 2 * b, 0.8 * s, { fill: p.ink }),
      line(val(ctx, "name"), cx, band + 16 * s, 12 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "note"), cx, band + 23 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: max }),
      line([val(ctx, "maker"), val(ctx, "weight")].filter(Boolean).join("  ·  "), cx, H - 5 - 1.6 * s, 3 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      doubleFrame(2.6 * z, 2.6 * z, W - 5.2 * z, H - 5.2 * z, p.accent, p.paper, { gap: 1 * z, heavy: 0.3 * z, thin: 0.12 * z, corner: "bracket", r: 1.4 * z }),
    );
  },
};
export default t;
