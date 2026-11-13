import { plane } from "../../lib/motifs/index.ts";
import { circle, g, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "occasions-farewell",
  category: "occasions",
  lang: "ar",
  title: { ar: "دعوة سهرة وداع مسافر", en: "Travel farewell invitation" },
  note: { ar: "طائرة في آخر مسار منقّط يصعد من زاوية الورقة. لوداع من يسافر للدراسة أو العمل.", en: "A plane at the end of a dotted path climbing from the corner of the card. To see off someone leaving to study or work." },
  tags: ["وداع", "سفر", "مسافر", "غربة", "دراسة", "farewell"],
  sizes: [sizes.a6, sizes.a6l],
  palettes: [
    pal("sky", "سماء", "Sky", inks.sky, inks.navy, inks.white, inks.navy, inks.ivory),
    pal("dusk", "غروب", "Dusk", inks.orange, inks.black, inks.ivory, inks.burgundy, inks.ivory),
    pal("paper", "ورق", "Paper", inks.ivory, inks.navy, inks.red, inks.navy, inks.sand),
  ],
  fonts: ["lalezar", "marhey", "arefruqaa"],
  fields: [
    tf("title", "العنوان", "Title", "رافقتك السلامة", 20),
    tf("name", "المسافر", "Traveller", "رامي", 18),
    tf("to", "الوجهة", "Destination", "مسافر إلى ألمانيا لدراسة الطب"),
    tf("invite", "الدعوة", "Invitation", "تعالوا نودّعه بسهرة على قدّ المحبّة"),
    tf("date", "التاريخ", "Date", "الجمعة ٣٠ آب"),
    tf("place", "المكان", "Place", "سطوح دار أبو رامي، بيرزيت"),
  ],
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 105, 148), max = W - 16 * s, land = W > H;
    const P = (k: number) => land ? [W * (0.05 + 0.36 * k), H * 0.92 - Math.sin(k * Math.PI * 0.55) * H * 0.74] as const : [W * (0.06 + 0.82 * k), H * 0.42 - Math.sin(k * Math.PI * 0.62) * H * 0.34] as const;
    const dots = Array.from({ length: 26 }, (_, i) => { const [x, y] = P(i / 26); return circle(x, y, 0.55 * s, { fill: p.accent2 }); });
    const [px, py] = P(1), [qx, qy] = P(0.97), ang = (Math.atan2(py - qy, px - qx) * 180) / Math.PI;
    const tx = land ? W * 0.71 : cx, al = "center" as const, tw = land ? W * 0.48 : max, top = land ? 18 * s : H * 0.5;
    return scene(W, H, p.paper,
      dots, g({ x: px, y: py, rotate: ang }, plane(16 * s, p.accent2)),
      line(val(ctx, "title"), tx, land ? top : top + 4 * s, 9.5 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: tw, align: al }),
      line(val(ctx, "name"), tx, land ? top + 20 * s : top + 20 * s, 13 * s, { font: ctx.font, weight: 700, fill: p.accent2, maxWidth: tw, align: al }),
      line(val(ctx, "to"), tx, land ? top + 31 * s : top + 30 * s, 4 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: tw, align: al }),
      line(val(ctx, "invite"), tx, land ? top + 39 * s : top + 38 * s, 3.8 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: tw, align: al }),
      line(joined(ctx, ["date", "place"]), tx, land ? top + 48 * s : Math.min(H - 7 - 2 * s, top + 47 * s), 4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: tw, align: al }),
    );
  },
};
export default t;
