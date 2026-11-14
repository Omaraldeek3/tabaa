import { aperture, dotField } from "../../lib/motifs/index.ts";
import { circle, g, path, scene } from "../../lib/scene.ts";
import { cardAr, tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-photographer-aperture",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت مصوّر بفتحة العدسة", en: "Photographer's card with an aperture" },
  note: { ar: "شفرات فتحة عدسة الكاميرا كدائرة كبيرة نصفها خارج الكرت، على أرضية داكنة. للمصوّرين واستوديوهات الأعراس وصنّاع الفيديو.", en: "The blades of a camera aperture as a big circle half off the card, on dark ground. For photographers, wedding studios and video makers." },
  tags: ["كرت", "مصور", "تصوير", "استوديو", "كاميرا", "فيديو", "photographer"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("dark", "داكن", "Dark", inks.charcoal, inks.ivory, inks.orange, inks.orange, inks.grey),
    pal("navy", "كحلي", "Navy", inks.night, inks.ivory, inks.sky, inks.mustard, inks.sky),
    pal("light", "فاتح", "Light", inks.white, inks.black, inks.black, inks.red, inks.grey),
  ],
  fonts: ["kufam", "reemkufi", "lalezar"],
  fields: cardAr({ name: "عدسة رنا", role: "تصوير أعراس ومناسبات · فيديو", phone: "٠٥٩٢ ٥٥٥ ٦٦٦", address: "استوديو في شارع القدس، البيرة" }, [tf("social", "الحساب", "Social", "@rana.lens")]),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 85, 55), R = W - 6 * s, max = W * 0.56;
    const z = Math.min(W, H) / 55;
    return scene(W, H, p.paper,
      dotField(W * 0.5, 0, W * 0.5, H, 2.6 * z, 0.22 * z, p.accent, { fade: "left", opacity: 0.18 }),
      g({ x: W * 0.1, y: H * 0.5, rotate: 12 }, aperture(H * 0.46, p.accent)),
      line(val(ctx, "name"), R, 17 * s, 6.6 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "role"), R, 24 * s, 2.9 * s, { font: "tajawal", weight: 700, fill: p.accent2, align: "start", maxWidth: max }),
      line(val(ctx, "phone"), R, 35 * s, 3.8 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "social"), R, 41 * s, 2.9 * s, { font: "inter", weight: 600, fill: p.ink, align: "start", dir: "rtl", maxWidth: max }),
      line(val(ctx, "address"), R, 46.6 * s, 2.5 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: max }),
      [[W - 3 * z, 3 * z, -1, 1], [W - 3 * z, H - 3 * z, -1, -1]].map(([x, y, sx, sy]) => path(`M${x + sx * 4 * z} ${y} H${x} V${y + sy * 4 * z}`, { fill: null, stroke: p.accent, strokeWidth: 0.35 * z })),
    );
  },
};
export default t;
