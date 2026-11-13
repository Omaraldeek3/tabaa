import { archPath, starPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "wedding-en-arch",
  category: "wedding",
  lang: "en",
  title: { ar: "دعوة زفاف إنجليزية بقوس ملوّن", en: "English wedding invitation with a colour arch" },
  note: { ar: "دعوة إنجليزية عصرية: قوس ممتلئ باللون يحمل الاسمين، والتفاصيل تحته بحروف صغيرة متباعدة.", en: "A modern English invitation: a solid colour arch carries the names, with the details below in small spaced capitals." },
  tags: ["wedding", "english", "arch", "modern", "زفاف", "إنجليزي", "قوس"],
  sizes: [sizes.a5, sizes.invite, sizes.a6],
  palettes: [
    pal("clay", "فخّار", "Clay", inks.paper, inks.black, inks.terracotta, inks.mustard, inks.grey),
    pal("sage", "مريمية", "Sage", inks.ivory, inks.oliveDark, inks.olive, inks.gold, inks.grey),
    pal("navy", "كحلي", "Navy", inks.white, inks.navy, inks.navy, inks.gold, inks.grey),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    { id: "lead", kind: "text", label: { ar: "السطر الأول", en: "Lead line" }, sample: "WE ARE GETTING MARRIED" },
    { id: "first", kind: "text", label: { ar: "الاسم الأول", en: "First name" }, sample: "Noor", maxLength: 16 },
    { id: "second", kind: "text", label: { ar: "الاسم الثاني", en: "Second name" }, sample: "Ahmad", maxLength: 16 },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "05 · 08 · 2027" },
    { id: "day", kind: "text", label: { ar: "اليوم والوقت", en: "Day and time" }, sample: "THURSDAY AT 8 PM" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "Al-Qasr Hall, Bethlehem" },
    { id: "rsvp", kind: "text", label: { ar: "تأكيد الحضور", en: "RSVP" }, sample: "Kindly reply by 1 July" },
  ],
  render(ctx) {
    const { W, H, p, v, s, cx } = dims(ctx, 148, 210), aw = W * 0.62, ah = 118 * v, ax = cx - aw / 2, ay = 16 * v, max = aw - 18 * s, wide = W - 30 * s;
    return scene(W, H, p.paper,
      g({ x: ax, y: ay }, path(archPath(aw, ah, 0.5), { fill: p.accent })),
      g({ x: ax - 3.5 * s, y: ay - 3.5 * s }, path(archPath(aw + 7 * s, ah + 3.5 * s, 0.5), { fill: null, stroke: p.accent, strokeWidth: 0.3 * s })),
      g({ x: cx, y: ay + 24 * v }, path(starPath(8, 3.4 * s, 1.6 * s), { fill: p.accent2 })),
      line(val(ctx, "lead"), cx, ay + 42 * v, 2.9 * s, { font: "inter", weight: 600, fill: inks.ivory, tracking: 0.7 * s, maxWidth: max }),
      line(val(ctx, "first"), cx, ay + 66 * v, 17 * s, { font: ctx.font, weight: 500, fill: inks.ivory, maxWidth: max }),
      line("&", cx, ay + 79 * v, 8 * s, { font: "playfairdisplay", fill: p.accent2, safe: false }),
      line(val(ctx, "second"), cx, ay + 98 * v, 17 * s, { font: ctx.font, weight: 500, fill: inks.ivory, maxWidth: max }),
      line(val(ctx, "date"), cx, ay + ah + 20 * v, 11 * s, { font: "playfairdisplay", weight: 500, fill: p.ink, maxWidth: wide }),
      rect(cx - 10 * s, ay + ah + 26 * v, 20 * s, 0.4 * s, { fill: p.accent }),
      line(val(ctx, "day"), cx, ay + ah + 37 * v, 3.4 * s, { font: "inter", weight: 700, fill: p.ink, tracking: 0.8 * s, maxWidth: wide }),
      line(val(ctx, "venue"), cx, ay + ah + 46 * v, 4.6 * s, { font: "playfairdisplay", fill: p.ink, maxWidth: wide }),
      line(val(ctx, "rsvp"), cx, ay + ah + 57 * v, 3 * s, { font: "inter", weight: 500, fill: p.soft, maxWidth: wide }),
    );
  },
};
export default t;
