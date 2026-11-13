import { tatreezBand } from "../../lib/motifs/index.ts";
import { g, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, more, pal, val } from "../kit.ts";
import { tearLine } from "../ticket-kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tickets-event-stub",
  category: "tickets",
  lang: "ar",
  title: { ar: "تذكرة حفلة بكعب مقطوع", en: "Event ticket with a tear-off stub" },
  note: { ar: "تذكرة كلاسيكية: الجسم بعنوان الحفلة وتفاصيلها تحت شريط تطريز، وكعب يُقطع على الباب برقم التذكرة. للحفلات والمهرجانات والأمسيات.", en: "A classic ticket: the event and its details under a tatreez strip, and a stub with the ticket number torn off at the door. For concerts, festivals and evenings." },
  tags: ["تذكرة", "حفلة", "دخول", "مهرجان", "كعب", "ticket", "event"],
  sizes: [more.ticket, more.ticketS],
  palettes: [
    pal("red", "أحمر", "Red", inks.ivory, inks.black, inks.red, inks.black, inks.sand),
    pal("navy", "كحلي", "Navy", inks.navy, inks.ivory, inks.mustard, inks.red, inks.night),
    pal("olive", "زيتي", "Olive", inks.paper, inks.oliveDark, inks.olive, inks.red, inks.sand),
  ],
  fonts: ["lalezar", "rakkas", "reemkufi"],
  fields: [
    tf("title", "اسم الحفلة", "Event", "ليلة الطرب الأصيل", 22),
    tf("by", "المقدّم", "Presented by", "فرقة الفنون الشعبية"),
    tf("date", "التاريخ", "Date", "الجمعة ٧ آب · ٨ مساءً"),
    tf("venue", "المكان", "Venue", "مسرح البلدية، جنين"),
    tf("price", "السعر", "Price", "٤٠ شيكل"),
    tf("number", "رقم التذكرة", "Ticket no.", "٠٢٤٧", 8),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 160, 60), stub = W * 0.24, R = W - 6 * s, tw = W - stub - 14 * s;
    return scene(W, H, p.paper,
      g({ x: stub, y: -b }, tatreezBand("zigzag", W - stub + b, 7 * s + b, [p.accent, p.accent2])),
      tearLine(stub, H, p.ink, p.soft, s),
      line(val(ctx, "title"), R, 23 * s, 10 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "by"), R, 30 * s, 3.4 * s, { font: "tajawal", weight: 700, fill: p.accent, align: "start", maxWidth: tw }),
      line(val(ctx, "date"), R, 40 * s, 4.2 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: tw }),
      line(joined(ctx, ["venue", "price"]), R, 47 * s, 3.4 * s, { font: "tajawal", weight: 500, fill: p.ink, align: "start", maxWidth: tw }),
      rect(4 * s, 6 * s, stub - 8 * s, H - 12 * s, { fill: p.accent, r: 1.4 * s }),
      line(val(ctx, "number") ? "رقم" : "", stub / 2, 22 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.paper === inks.navy ? inks.navy : inks.ivory, safe: false }),
      line(val(ctx, "number"), stub / 2, 36 * s, 8 * s, { font: ctx.font, weight: 700, fill: p.paper === inks.navy ? inks.navy : inks.ivory, maxWidth: stub - 12 * s }),
    );
  },
};
export default t;
