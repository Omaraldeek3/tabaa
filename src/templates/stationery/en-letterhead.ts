import { beadRule, dotField, khatamPath, ringsNode, rosetteLines, starTile } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "stationery-en-letterhead",
  category: "stationery",
  lang: "en",
  title: { ar: "ورق رسمي إنجليزي بعمود ألوان", en: "Letterhead with a colour column" },
  note: { ar: "ورق مراسلات إنجليزي حديث: عمود لون عريض على اليسار يحمل الحرف الأول كبيراً، والاسم والبيانات في الرأس، والصفحة فارغة للكتابة. للشركات والمنظمات التي تراسل بالإنجليزية.", en: "Modern English letter paper: a wide colour column on the left carrying a large initial, the name and details at the head, the page left clear to write on. For firms and NGOs that write in English." },
  tags: ["letterhead", "english", "company", "ngo", "stationery", "ورق رسمي", "إنجليزي"],
  sizes: [sizes.a4],
  palettes: [
    pal("teal", "فيروزي", "Teal", inks.white, inks.black, inks.teal, inks.mustard, inks.grey),
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.navy, inks.orange, inks.grey),
    pal("terracotta", "فخّار", "Clay", inks.white, inks.black, inks.terracotta, inks.sand, inks.grey),
  ],
  fonts: ["inter", "playfairdisplay"],
  fields: [
    tf("initial", "الحرف", "Initial", "O", 2),
    tf("name", "الاسم", "Name", "Olive Tree Consulting", 32),
    tf("tagline", "الوصف", "Tagline", "Research · Evaluation · Training"),
    tf("address", "العنوان", "Address", "Al-Irsal Street, Ramallah, Palestine"),
    tf("contact", "التواصل", "Contact", "+970 2 000 0000 · hello@example.org"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 210, 297), col = 40 * s, L = col + 14 * s, ltr = { align: "start" as const, dir: "ltr" as const };
    return scene(W, H, p.paper,
      rect(-b, -b, col + b, H + 2 * b, { fill: p.accent }),
      starTile(-b, -b, col + b, H + 2 * b, 12 * s, 3 * s, inks.white, 0.08),
      g({ x: col / 2, y: 36 * s }, ringsNode(14 * s, 18 * s, 3, inks.white, 0.25 * s, 0.6), rosetteLines(12 * s, inks.white, { rings: 3, lobes: 10, width: 0.2 * s, opacity: 0.3 })),
      dotField(-b, H - 60 * s, col + b, 60 * s + b, 4 * s, 0.7 * s, p.accent2, { fade: "up", opacity: 0.8 }),
      rect(col, -b, 2 * s, H + 2 * b, { fill: p.accent2 }),
      rect(col + 3 * s, -b, 0.4 * s, H + 2 * b, { fill: p.accent }),
      rect(L, 44 * s, 24 * s, 1.2 * s, { fill: p.accent2 }),
      g({ x: W - 22 * s, y: 26 * s }, path(khatamPath(6 * s), { fill: p.accent }), path(khatamPath(3.2 * s), { fill: p.paper })),
      beadRule(L, W - 14 * s, H - 30 * s, p.accent, s, { bead: "dot", pitch: 3 }),
      g({ x: W - 70 * s, y: H * 0.55, opacity: 0.05 }, path(khatamPath(50 * s), { fill: p.accent })),
      line(val(ctx, "initial"), col / 2 + 1, 46 * s, 30 * s, { font: "playfairdisplay", weight: 700, fill: inks.white, maxWidth: col - 20 * s }),
      line(val(ctx, "name"), L, 30 * s, 9 * s, { ...ltr, font: ctx.font, weight: 800, fill: p.ink, maxWidth: W - L - 14 * s }),
      line(val(ctx, "tagline"), L, 38 * s, 3.8 * s, { ...ltr, font: "inter", weight: 500, fill: p.accent, maxWidth: W - L - 14 * s, tracking: 0.4 * s }),
      rect(L, 44 * s, W - L - 14 * s, 0.3 * s, { fill: p.soft }),
      line(val(ctx, "address"), L, H - 22 * s, 3.2 * s, { ...ltr, font: "inter", fill: p.ink, maxWidth: W - L - 14 * s }),
      line(val(ctx, "contact"), L, H - 16 * s, 3.2 * s, { ...ltr, font: "inter", weight: 600, fill: p.ink, maxWidth: W - L - 14 * s }),
    );
  },
};
export default t;
