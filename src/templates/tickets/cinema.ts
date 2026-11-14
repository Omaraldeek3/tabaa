import { burstLines, ringsNode, starPath, starTile } from "../../lib/motifs/index.ts";
import { g, path, rect, scene, type SceneNode } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, more, pal, val } from "../kit.ts";
import { tearLine } from "../ticket-kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tickets-cinema",
  category: "tickets",
  lang: "ar",
  title: { ar: "تذكرة سينما بحواف الفيلم", en: "Cinema ticket with film edges" },
  note: { ar: "تذكرة سينما بحافّتين من ثقوب الفيلم أعلى وأسفل، واسم الفيلم كبير، ومربّعات للقاعة والصف والمقعد. لعروض السينما والنوادي السينمائية.", en: "A cinema ticket with film sprocket holes along top and bottom, the film title large, and boxes for hall, row and seat. For screenings and film clubs." },
  tags: ["سينما", "فيلم", "تذكرة", "عرض", "مقعد", "cinema"],
  sizes: [more.ticket, more.ticketS],
  palettes: [
    pal("velvet", "مخمل", "Velvet", inks.burgundy, inks.ivory, inks.mustard, inks.black, inks.blush),
    pal("noir", "أسود", "Noir", inks.charcoal, inks.ivory, inks.red, inks.black, inks.grey),
    pal("retro", "قديم", "Retro", inks.mustard, inks.black, inks.red, inks.black, inks.ivory),
  ],
  fonts: ["reemkufi", "lalezar", "kufam"],
  fields: [
    tf("kicker", "سطر علوي", "Kicker", "نادي سينما القصبة يقدّم"),
    tf("title", "الفيلم", "Film", "عُرس الجليل", 22),
    tf("time", "الموعد", "When", "السبت ١٢ نيسان · ٧:٣٠ مساءً"),
    tf("hall", "القاعة", "Hall", "٢", 4),
    tf("row", "الصف", "Row", "هـ", 4),
    tf("seat", "المقعد", "Seat", "١٤", 4),
  ],
  safeMm: 5,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 160, 60), stub = W * 0.26, R = W - 6 * s, tw = W - stub - 12 * s, holes: SceneNode[] = [];
    for (let i = 0; i * 4 * s < W + 2 * b; i++) holes.push(rect(-b + i * 4 * s, 1.2 * s, 2 * s, 2.2 * s, { fill: p.accent2, r: 0.4 * s }), rect(-b + i * 4 * s, H - 3.4 * s, 2 * s, 2.2 * s, { fill: p.accent2, r: 0.4 * s }));
    const box = (label: string, v: string, x: number) => v ? [rect(x - 8 * s, 28 * s, 16 * s, 18 * s, { fill: null, stroke: p.ink, strokeWidth: 0.35 * s }), line(label, x, 33 * s, 2.6 * s, { font: "tajawal", fill: p.ink, safe: false }), line(v, x, 42.4 * s, 7 * s, { font: ctx.font, weight: 700, fill: p.accent, maxWidth: 14 * s })] : [];
    return scene(W, H, p.paper,
      g({ x: stub, y: 0, opacity: 0.1 }, burstLines(28, 4 * s, W, inks.white, 0.5 * s)),
      starTile(stub + 4 * s, 8 * s, W - stub - 8 * s, H - 16 * s, 9 * s, 1.4 * s, inks.white, 0.05),
      g({ x: stub / 2, y: 13 * s, opacity: 0.25 }, ringsNode(5 * s, 9 * s, 3, p.accent2, 0.3 * s)),
      holes, tearLine(stub, H, p.ink, p.soft, s),
      line(val(ctx, "kicker"), R, 12.4 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.accent, align: "start", maxWidth: tw }),
      line(val(ctx, "title"), R, 26 * s, 11 * s, { font: ctx.font, weight: 700, fill: p.ink, align: "start", maxWidth: tw }),
      line(val(ctx, "time"), R, 46 * s, 4 * s, { font: "tajawal", weight: 800, fill: p.ink, align: "start", maxWidth: tw * 0.6 }),
      box("الصف", val(ctx, "row"), stub * 0.3), box("المقعد", val(ctx, "seat"), stub * 0.72),
      line(val(ctx, "hall") ? "قاعة " + val(ctx, "hall") : "", stub / 2, 18 * s, 4.4 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: stub - 8 * s }),
      [0.32, 0.5, 0.68].map(k => g({ x: stub + (W - stub) * k, y: H - 9.5 * s }, path(starPath(5, 1.2 * s, 0.5 * s), { fill: p.accent }))),
      
    );
  },
};
export default t;
