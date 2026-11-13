import { dotRing, figHalf } from "../../lib/motifs/index.ts";
import { circle, g, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "labels-fig-jam",
  category: "labels",
  lang: "ar",
  title: { ar: "ملصق غطاء مربّى التين", en: "Fig jam lid label" },
  note: { ar: "ملصق دائري لغطاء المرطبان: تينة مشقوقة ببذورها في الوسط، وحلقة نقاط، والاسم فوقها والوزن تحتها. لمربّيات البيت.", en: "A round lid label: a halved fig with its seeds in the centre, a ring of dots, the name above and the weight below. For home-made jams." },
  tags: ["مربى", "تين", "مرطبان", "ملصق", "بيتي", "غطاء", "jam"],
  sizes: [sizes.round70, sizes.round50, sizes.round90],
  shape: "round",
  palettes: [
    pal("plum", "برقوقي", "Plum", inks.blush, inks.burgundy, inks.burgundy, inks.rose, inks.olive),
    pal("kraft", "كرافت", "Kraft", inks.sand, inks.black, inks.burgundy, inks.rose, inks.oliveDark),
    pal("green", "أخضر", "Green", inks.oliveDark, inks.ivory, inks.burgundy, inks.rose, inks.sage),
  ],
  fonts: ["marhey", "arefruqaa", "rakkas"],
  fields: [
    tf("name", "اسم المنتج", "Product", "مربّى تين", 14),
    tf("maker", "الصانع", "Maker", "من مطبخ ستّي", 22),
    tf("weight", "الوزن", "Weight", "٤٥٠ غم", 10),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, p, s, cx } = dims(ctx, 70, 70), c = W / 2;
    return scene(W, W, p.paper,
      circle(c, c, W / 2 - 3 * s, { fill: null, stroke: p.accent, strokeWidth: 0.5 * s }),
      g({ x: c, y: c }, dotRing(W / 2 - 5 * s, 48, 0.35 * s, p.soft)),
      g({ x: c, y: c + 2 * s }, figHalf(26 * s, p.accent, p.accent2, p.paper === inks.oliveDark ? inks.ivory : p.ink)),
      line(val(ctx, "name"), cx, 18 * s, 7.6 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: 38 * s }),
      line(val(ctx, "maker"), cx, 54 * s, 3.2 * s, { font: "tajawal", weight: 700, fill: p.ink, maxWidth: 36 * s }),
      line(val(ctx, "weight"), cx, 59.4 * s, 3 * s, { font: "tajawal", weight: 800, fill: p.accent, maxWidth: 20 * s }),
    );
  },
};
export default t;
