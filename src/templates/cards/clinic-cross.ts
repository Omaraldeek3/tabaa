import { g, path, scene } from "../../lib/scene.ts";
import { cardAr, tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-clinic-cross",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت عيادة بالصليب الطبي", en: "Clinic card with a medical cross" },
  note: { ar: "علامة زائد طبية ضخمة بزوايا مدوّرة تخرج من حافة الكرت، والبيانات في المساحة البيضاء الباقية. للعيادات والصيدليات ومراكز العلاج.", en: "A huge round-cornered medical plus runs off the edge of the card, with the details in the white space left. For clinics, pharmacies and therapy centres." },
  tags: ["كرت", "عيادة", "طبيب", "صيدلية", "طبي", "صحة", "clinic"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("teal", "فيروزي", "Teal", inks.white, inks.black, inks.teal, inks.teal, inks.grey),
    pal("green", "أخضر", "Green", inks.white, inks.oliveDark, inks.olive, inks.olive, inks.grey),
    pal("red", "أحمر", "Red", inks.white, inks.black, inks.red, inks.red, inks.grey),
  ],
  fonts: ["cairo", "kufam", "tajawal"],
  fields: cardAr({ name: "د. هالة البيطار", role: "طب الأسرة والأطفال", phone: "٠٥٦٨ ١١١ ٢٢٢", address: "مركز الأمل الطبي، الطابق الأول، طولكرم" }, [tf("hours", "الدوام", "Hours", "يومياً ٩ صباحاً – ٥ مساءً عدا الجمعة")]),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 85, 55), a = H * 0.26, r = a * 0.3, R = W - 6 * s, max = W - 44 * s;
    const plus = `M${-a / 2 + r} ${-a * 1.5} H${a / 2 - r} Q${a / 2} ${-a * 1.5} ${a / 2} ${-a * 1.5 + r} V${-a / 2} H${a * 1.5 - r} Q${a * 1.5} ${-a / 2} ${a * 1.5} ${-a / 2 + r} V${a / 2 - r} Q${a * 1.5} ${a / 2} ${a * 1.5 - r} ${a / 2} H${a / 2} V${a * 1.5 - r} Q${a / 2} ${a * 1.5} ${a / 2 - r} ${a * 1.5} H${-a / 2 + r} Q${-a / 2} ${a * 1.5} ${-a / 2} ${a * 1.5 - r} V${a / 2} H${-a * 1.5 + r} Q${-a * 1.5} ${a / 2} ${-a * 1.5} ${a / 2 - r} V${-a / 2 + r} Q${-a * 1.5} ${-a / 2} ${-a * 1.5 + r} ${-a / 2} H${-a / 2} V${-a * 1.5 + r} Q${-a / 2} ${-a * 1.5} ${-a / 2 + r} ${-a * 1.5} Z`;
    return scene(W, H, p.paper,
      g({ x: W * 0.17, y: H * 0.5 }, path(plus, { fill: p.accent })),
      line(val(ctx, "name"), R, 15 * s, 6 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "role"), R, 21.5 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.accent2, align: "start", maxWidth: max }),
      line(val(ctx, "phone"), R, 33 * s, 4 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: max }),
      line(joined(ctx, ["address"]), R, 40 * s, 2.6 * s, { font: "tajawal", fill: p.ink, align: "start", maxWidth: max }),
      line(val(ctx, "hours"), R, 45.4 * s, 2.5 * s, { font: "tajawal", fill: p.soft, align: "start", maxWidth: max }),
    );
  },
};
export default t;
