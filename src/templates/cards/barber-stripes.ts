import { path, rect, scene } from "../../lib/scene.ts";
import { cardAr, tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-barber-stripes",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت صالون حلاقة بخطوط العمود", en: "Barber's card with pole stripes" },
  note: { ar: "خطوط مائلة كعمود الحلّاق الدوّار تنزل على طرف الكرت، والاسم بخط عريض. لصالونات الحلاقة الرجالية.", en: "Slanted stripes like a barber's pole run down one edge of the card, with the name in heavy type. For men's barbershops." },
  tags: ["كرت", "حلاق", "صالون", "حلاقة", "رجالي", "barber"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("classic", "كلاسيكي", "Classic", inks.ivory, inks.black, inks.red, inks.navy, inks.grey),
    pal("black", "أسود", "Black", inks.charcoal, inks.ivory, inks.red, inks.ivory, inks.grey),
    pal("mint", "نعناعي", "Mint", inks.sage, inks.black, inks.black, inks.red, inks.black),
  ],
  fonts: ["lalezar", "rakkas", "jomhuria"],
  fields: cardAr({ name: "صالون أبو العبد", role: "حلاقة · ذقن · عناية بالبشرة", phone: "٠٥٦٧ ٠٠٠ ١١١", address: "دوّار المنارة، رام الله" }, [tf("hours", "الدوام", "Hours", "١٠ صباحاً – ١٠ مساءً · الجمعة بعد الصلاة")]),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 85, 55), pw = W * 0.18, st = 5 * s, red: string[] = [], blue: string[] = [];
    for (let i = -6; i * st < H + 2 * b + pw; i++) {
      const y = -b + i * st * 1.5, d = `M${-b} ${y} L${pw} ${y - pw * 0.7} L${pw} ${y - pw * 0.7 + st / 2} L${-b} ${y + st / 2} Z`;
      (i % 2 ? blue : red).push(d);
    }
    const R = W - 6 * s, max = W - pw - 12 * s;
    return scene(W, H, p.paper,
      rect(-b, -b, pw + b, H + 2 * b, { fill: p.paper === inks.charcoal ? inks.ivory : inks.white }),
      path(red.join(" "), { fill: p.accent }), path(blue.join(" "), { fill: p.accent2 }),
      rect(pw, -b, 1 * s, H + 2 * b, { fill: p.ink }),
      line(val(ctx, "name"), R, 19 * s, 9 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "role"), R, 26.5 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.accent, align: "start", maxWidth: max }),
      line(val(ctx, "phone"), R, 37 * s, 4.6 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "address"), R, 43 * s, 2.7 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "hours"), R, 47.8 * s, 2.4 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: max }),
    );
  },
};
export default t;
