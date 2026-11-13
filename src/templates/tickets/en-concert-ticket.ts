import { rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import { barcode, tearLine } from "../ticket-kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tickets-en-concert-ticket",
  category: "tickets",
  lang: "en",
  title: { ar: "تذكرة حفلة إنجليزية بباركود", en: "Concert ticket with barcode" },
  note: { ar: "تذكرة إنجليزية حديثة: خطوط ألوان متدرّجة على الطرف، اسم الفنان كبير، والكعب يحمل باركوداً ورقماً. للحفلات الموسيقية والمهرجانات.", en: "A modern English ticket: stepped colour bars on one edge, the artist's name large, and a stub with a barcode and number. For gigs and festivals." },
  tags: ["concert", "english", "ticket", "barcode", "gig", "حفلة", "إنجليزي", "تذكرة"],
  sizes: [more.ticket, more.ticketS],
  palettes: [
    pal("sunset", "غروب", "Sunset", inks.night, inks.ivory, inks.orange, inks.rose, inks.mustard),
    pal("mono", "أبيض", "Mono", inks.white, inks.black, inks.red, inks.black, inks.grey),
    pal("lime", "حيوي", "Lively", inks.charcoal, inks.ivory, inks.mustard, inks.teal, inks.sage),
  ],
  fonts: ["inter", "playfairdisplay"],
  fields: [
    tf("artist", "الفنان", "Artist", "NOUR TRIO", 18),
    tf("tour", "الجولة", "Tour", "Live in Amman"),
    tf("date", "التاريخ", "Date", "FRI 19 SEP 2027 · 21:00"),
    tf("venue", "المكان", "Venue", "Roman Amphitheatre"),
    tf("seat", "المقعد", "Seat", "GA · Standing"),
    tf("number", "الرقم", "Number", "No. 004718", 12),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 160, 60), stub = W * 0.72, L = 14 * s, tw = stub - L - 6 * s, ltr = { align: "start" as const, dir: "ltr" as const };
    return scene(W, H, p.paper,
      [p.accent, p.accent2, p.soft].map((c, i) => rect(-4, i * H / 3 - 1, 8 * s + 4, H / 3 + 2, { fill: c })),
      tearLine(stub, H, p.ink, p.soft, s),
      line(val(ctx, "tour"), L, 15 * s, 3.4 * s, { ...ltr, font: "inter", weight: 600, fill: p.accent, maxWidth: tw }),
      line(val(ctx, "artist"), L, 30 * s, 13 * s, { ...ltr, font: ctx.font, weight: 800, fill: p.ink, maxWidth: tw }),
      line(val(ctx, "date"), L, 41 * s, 3.6 * s, { ...ltr, font: "inter", weight: 700, fill: p.ink, maxWidth: tw }),
      line([val(ctx, "venue"), val(ctx, "seat")].filter(Boolean).join("  ·  "), L, 47.6 * s, 3 * s, { ...ltr, font: "inter", fill: p.ink, maxWidth: tw }),
      val(ctx, "number") ? barcode(stub + 6 * s, 12 * s, W - stub - 12 * s, 26 * s, val(ctx, "number"), p.ink) : [],
      line(val(ctx, "number"), stub + 6 * s, 46 * s, 3 * s, { ...ltr, font: "inter", weight: 600, fill: p.ink, maxWidth: W - stub - 12 * s }),
    );
  },
};
export default t;
