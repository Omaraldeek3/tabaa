import { doubleFrame, rays, starPath, starTile, wheat } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-graduation",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة حفل تخرّج", en: "Graduation party invitation" },
  note: { ar: "نجمة داخل شمس بين سنبلتي قمح: دعوة تخرّج من التوجيهي أو الجامعة.", en: "A star in a sun between two ears of wheat: an invitation for a tawjihi or university graduation." },
  tags: ["تخرج", "توجيهي", "جامعة", "نجاح", "مبروك", "graduation"],
  sizes: [sizes.a6, sizes.a5, sizes.square12],
  palettes: [
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.gold, inks.mustard, inks.night),
    pal("olive", "زيتون", "Olive", inks.paper, inks.oliveDark, inks.olive, inks.goldDeep, inks.sand),
    pal("wine", "نبيذي", "Wine", inks.burgundy, inks.paper, inks.gold, inks.mustard, inks.black),
  ],
  fonts: ["lalezar", "rakkas", "kufam", "arefruqaa"],
  fields: [
    { id: "kicker", kind: "text", label: { ar: "السطر العلوي", en: "Kicker" }, sample: "الحمد لله الذي بنعمته تتم الصالحات" },
    { id: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, sample: "مبروك التخرّج", maxLength: 22 },
    { id: "name", kind: "text", label: { ar: "اسم الخرّيج", en: "Graduate" }, sample: "المهندسة سارة أبو زيد", maxLength: 34 },
    { id: "detail", kind: "text", label: { ar: "التخصص", en: "Degree" }, sample: "بكالوريوس هندسة مدنية · جامعة بيرزيت" },
    { id: "date", kind: "text", label: { ar: "التاريخ", en: "Date" }, sample: "السبت ٢٦ حزيران" },
    { id: "time", kind: "text", label: { ar: "الوقت", en: "Time" }, sample: "السابعة مساءً" },
    { id: "venue", kind: "text", label: { ar: "المكان", en: "Venue" }, sample: "منزل العائلة" },
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), max = W - 20 * s, cy = H * 0.25, r = 13 * s, y = (k: number) => cy + r + (H - cy - r) * k;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H, 9 * z, 1.1 * z, p.accent, 0.08),
      rect(-b, -b, W + 2 * b, H + 2 * b, { fill: p.paper }),
      g({ x: cx, y: cy }, g({ opacity: 0.5 }, rays(20, r * 1.25, r * 1.95, p.accent, 0.45)), circle(0, 0, r, { fill: p.accent }), path(starPath(5, r * 0.62, r * 0.26), { fill: p.paper })),
      g({ x: cx - r * 2.9, y: cy + r * 1.6, rotate: -16 }, wheat(r * 3, p.accent2)), g({ x: cx + r * 2.9, y: cy + r * 1.6, rotate: 16 }, wheat(r * 3, p.accent2)),
      line(val(ctx, "kicker"), cx, y(0.16), 3.8 * s, { font: "amiri", fill: p.ink, maxWidth: max }),
      line(val(ctx, "title"), cx, y(0.36), 15 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: max }),
      line(val(ctx, "name"), cx, y(0.52), 7 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      line(val(ctx, "detail"), cx, y(0.61), 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      rect(cx - 10 * s, y(0.67), 20 * s, 0.35 * s, { fill: p.accent2 }),
      line(val(ctx, "date"), cx, y(0.79), 5.4 * s, { font: "tajawal", weight: 800, fill: p.accent2 === inks.goldDeep ? p.ink : p.accent2, maxWidth: max }),
      line(joined(ctx, ["time", "venue"]), cx, y(0.88), 4.2 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
doubleFrame(5 * z, 5 * z, W - 10 * z, H - 10 * z, p.accent, p.paper, { gap: 1.6 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "star", r: 2.2 * z }),
    );
  },
};
export default t;
