import { starPath } from "../../lib/motifs/index.ts";
import { g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import { tearLine } from "../ticket-kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tickets-raffle",
  category: "tickets",
  lang: "ar",
  title: { ar: "ورقة سحب خيري (يانصيب) مرقّمة", en: "Numbered charity raffle ticket" },
  note: { ar: "ورقة سحب برقم كبير يتكرّر على الكعب، وفي الكعب سطور فارغة لاسم المشتري ورقمه، والجائزة في نجمة. لسحوبات المدارس والجمعيات الخيرية.", en: "A raffle ticket with a big number repeated on the stub, blank lines on the stub for the buyer's name and phone, and the prize in a star. For school and charity draws." },
  tags: ["سحب", "يانصيب", "خيري", "جائزة", "تبرع", "raffle"],
  sizes: [more.ticketS, more.ticket],
  palettes: [
    pal("sunny", "مشمس", "Sunny", inks.mustard, inks.black, inks.red, inks.ivory, inks.black),
    pal("teal", "فيروزي", "Teal", inks.teal, inks.ivory, inks.mustard, inks.ivory, inks.ivory),
    pal("pink", "زهري", "Pink", inks.blush, inks.burgundy, inks.red, inks.white, inks.burgundy),
  ],
  fonts: ["lalezar", "jomhuria", "kufam"],
  fields: [
    tf("title", "العنوان", "Title", "السحب الخيري الكبير", 24),
    tf("prize", "الجائزة", "Prize", "دراجة هوائية"),
    tf("cause", "لصالح", "In aid of", "لصالح مكتبة مدرسة البنات"),
    tf("draw", "موعد السحب", "Draw", "السحب في ١ أيلول · الورقة بـ ١٠ شيكل"),
    tf("number", "الرقم", "Number", "٠٠٥٨", 6),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 140, 50), stub = W * 0.3, R = W - 5 * s, tw = W - stub - 32 * s, ink2 = p.paper === inks.teal ? inks.ivory : p.ink;
    return scene(W, H, p.paper,
      tearLine(stub, H, ink2, p.soft === p.ink ? inks.ivory : p.soft, s),
      g({ x: stub + 15 * s, y: H * 0.5 }, path(starPath(12, 13 * s, 10 * s), { fill: p.accent })),
      line(val(ctx, "number"), stub + 15 * s, H * 0.5 + 2.4 * s, 7 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: 18 * s }),
      line(val(ctx, "title"), R, 14 * s, 7.6 * s, { font: ctx.font, weight: 700, fill: ink2, align: "start", maxWidth: tw }),
      line(val(ctx, "prize") ? "الجائزة: " + val(ctx, "prize") : "", R, 24 * s, 4.6 * s, { font: "tajawal", weight: 800, fill: p.accent, align: "start", maxWidth: tw }),
      line(val(ctx, "cause"), R, 32 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: ink2, align: "start", maxWidth: tw }),
      line(val(ctx, "draw"), R, 40 * s, 2.9 * s, { font: "tajawal", weight: 500, fill: ink2, align: "start", maxWidth: tw }),
      line(val(ctx, "number"), stub / 2, 13 * s, 7 * s, { font: ctx.font, weight: 700, fill: ink2, maxWidth: stub - 10 * s }),
      [24, 33, 42].map((y, i) => [rect(5 * s, y * s, stub - 10 * s, 0.25 * s, { fill: ink2 }), line(["الاسم", "الهاتف", "البلد"][i], stub - 5 * s, y * s - 1 * s, 2.2 * s, { font: "tajawal", fill: ink2, align: "start", safe: false })]),
    );
  },
};
export default t;
