import { aperture } from "../../lib/motifs/index.ts";
import { g, scene } from "../../lib/scene.ts";
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
    return scene(W, H, p.paper,
      g({ x: W * 0.1, y: H * 0.5, rotate: 12 }, aperture(H * 0.46, p.accent)),
      line(val(ctx, "name"), R, 17 * s, 6.6 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "role"), R, 24 * s, 2.9 * s, { font: "tajawal", weight: 700, fill: p.accent2, align: "start", maxWidth: max }),
      line(val(ctx, "phone"), R, 35 * s, 3.8 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "social"), R, 41 * s, 2.9 * s, { font: "inter", weight: 600, fill: p.ink, align: "start", dir: "rtl", maxWidth: max }),
      line(val(ctx, "address"), R, 46.6 * s, 2.5 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: max }),
    );
  },
};
export default t;
