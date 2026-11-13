import { archPath, starPath } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-arch-tall",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت أعمال طولي بقوس", en: "Tall business card with an arch" },
  note: { ar: "كرت طولي: قوس ملوّن يحمل الاسم كباب محل، والتفاصيل تحته. للمقاهي والمحلات الصغيرة والمصوّرين.", en: "A tall card: a colour arch carries the name like a shop door, with the details below. For cafés, small shops and photographers." },
  tags: ["كرت", "أعمال", "طولي", "قوس", "مقهى", "محل", "business card", "vertical"],
  sizes: [more.cardV],
  palettes: [
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.terracotta, inks.mustard, inks.grey),
    pal("teal", "فيروزي", "Teal", inks.ivory, inks.navy, inks.teal, inks.mustard, inks.grey),
    pal("olive", "زيتون", "Olive", inks.sand, inks.oliveDark, inks.olive, inks.ivory, inks.black),
    pal("ink", "حبر", "Ink", inks.white, inks.black, inks.black, inks.red, inks.grey),
  ],
  fonts: ["lalezar", "rakkas", "kufam", "arefruqaa"],
  fields: [
    { id: "name", kind: "multiline", label: { ar: "الاسم", en: "Name" }, sample: "مقهى\nالياسمين", maxLines: 2 },
    { id: "role", kind: "text", label: { ar: "الوصف", en: "Description" }, sample: "قهوة مختصّة وحلويات بيتية" },
    { id: "phone", kind: "text", label: { ar: "الهاتف", en: "Phone" }, sample: "٠٥٩٢ ١٢١ ٢١٢" },
    { id: "address", kind: "text", label: { ar: "العنوان", en: "Address" }, sample: "شارع ركب، رام الله" },
    { id: "hours", kind: "text", label: { ar: "الدوام", en: "Hours" }, sample: "يومياً ٨ ص – ١١ م" },
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, cx } = dims(ctx, 55, 85), s = W / 55, aw = W - 12 * s, ah = 50 * s, max = aw - 9 * s;
    const lines = (typeof ctx.values.name === "string" ? ctx.values.name : "").split(/\r?\n/).map(l => l.trim()).filter(Boolean).slice(0, 2);
    return scene(W, H, p.paper,
      g({ x: 6 * s, y: 6 * s }, path(archPath(aw, ah, 0.56), { fill: p.accent })),
      g({ x: cx, y: 17 * s }, path(starPath(8, 2.6 * s, 1.2 * s), { fill: p.accent2 })),
      lines.map((l, i) => line(l, cx, (lines.length === 1 ? 40 : 33) * s + i * 12 * s, 11 * s, { font: ctx.font, weight: 700, fill: inks.ivory, maxWidth: max })),
      line(val(ctx, "role"), cx, 63 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.accent2 === inks.ivory || p.accent2 === inks.mustard ? p.ink : p.accent2, maxWidth: W - 10 * s }),
      line(val(ctx, "phone"), cx, 70 * s, 3.4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: W - 10 * s }),
      line(val(ctx, "address"), cx, 75 * s, 2.8 * s, { font: "tajawal", fill: p.ink, maxWidth: W - 10 * s }),
      line(val(ctx, "hours"), cx, 79.6 * s, 2.6 * s, { font: "tajawal", fill: p.soft, maxWidth: W - 10 * s }),
    );
  },
};
export default t;
