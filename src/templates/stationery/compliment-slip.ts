import { oliveBranch } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stationery-compliment-slip",
  category: "stationery",
  lang: "ar",
  title: { ar: "قصاصة «مع التحيّات»", en: "With compliments slip" },
  note: { ar: "قصاصة عرضية بحجم DL تُرفق مع العيّنات والكتالوجات والهدايا: «مع أطيب التحيّات» بخط جميل وغصن زيتون، وبيانات الشركة في عمود جانبي.", en: "A DL landscape slip sent with samples, catalogues and gifts: the compliments in fine lettering with an olive branch, and the company details in a side column." },
  tags: ["مع التحيات", "قصاصة", "شركة", "مراسلات", "هدايا", "compliment slip"],
  sizes: [more.dlL],
  palettes: [
    pal("olive", "زيتي", "Olive", inks.ivory, inks.oliveDark, inks.olive, inks.goldDeep, inks.grey),
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.sky, inks.goldDeep, inks.grey),
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.terracotta, inks.olive, inks.grey),
  ],
  fonts: ["arefruqaa", "amiri", "katibeh"],
  fields: [
    tf("words", "العبارة", "Words", "مع أطيب التحيّات", 22),
    tf("company", "الشركة", "Company", "معصرة الشيخ للزيوت", 26),
    tf("address", "العنوان", "Address", "عرّابة · جنين"),
    tf("phone", "الهاتف", "Phone", "٠٤ ٢٤٦ ٠٠٠٠"),
    tf("web", "الموقع", "Web", "www.example.ps"),
  ],
  safeMm: 7,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 210, 99), side = 62 * s;
    return scene(W, H, p.paper,
      rect(-b, -b, side + b, H + 2 * b, { fill: p.accent }),
      line(val(ctx, "company"), side / 2, 40 * s, 6.4 * s, { font: "amiri", weight: 700, fill: p.paper === inks.white ? inks.navy : inks.white, maxWidth: side - 14 * s }),
      line(joined(ctx, ["address"]), side / 2, 52 * s, 3.4 * s, { font: "tajawal", weight: 500, fill: p.paper === inks.white ? inks.navy : inks.white, maxWidth: side - 14 * s }),
      line(val(ctx, "phone"), side / 2, 59 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.paper === inks.white ? inks.navy : inks.white, maxWidth: side - 14 * s }),
      line(val(ctx, "web"), side / 2, 66 * s, 3.2 * s, { font: "inter", weight: 500, fill: p.paper === inks.white ? inks.navy : inks.white, maxWidth: side - 14 * s }),
      g({ x: side + (W - side) / 2 - 22 * s, y: 30 * s, rotate: -4 }, oliveBranch(44 * s, p.accent, p.accent2, { leaves: 9, olives: 3 })),
      line(val(ctx, "words"), side + (W - side) / 2, 62 * s, 16 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - side - 24 * s }),
    );
  },
};
export default t;
