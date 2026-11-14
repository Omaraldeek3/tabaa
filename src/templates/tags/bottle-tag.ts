import { dotField, doubleFrame, oliveBranch, ringsNode, rosetteLines, starTile } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "tags-bottle-tag",
  category: "tags",
  lang: "ar",
  title: { ar: "طوق رقبة قنينة الزيت", en: "Olive oil bottle neck tag" },
  note: { ar: "طوق يُلبَس على رقبة القنينة: فتحة دائرية كبيرة بشقّ، وغصن زيتون، واسم العائلة والموسم. لزيت الزيتون والدبس وماء الزهر كهدايا.", en: "A collar that slips over the bottle neck: a large round hole with a slit, an olive branch, the family name and the season. For olive oil, molasses and orange-blossom water as gifts." },
  tags: ["قنينة", "زيت", "طوق", "هدية", "زيتون", "bottle tag"],
  sizes: [{ id: "60x110", label: { ar: "طوق ٦٠×١١٠ ملم", en: "Collar 60×110 mm" }, widthMm: 60, heightMm: 110 }],
  palettes: [
    pal("olive", "زيتي", "Olive", inks.oliveDark, inks.ivory, inks.sage, inks.gold, inks.olive),
    pal("ivory", "عاجي", "Ivory", inks.ivory, inks.oliveDark, inks.olive, inks.goldDeep, inks.sand),
    pal("black", "أسود", "Black", inks.charcoal, inks.gold, inks.sage, inks.gold, inks.grey),
  ],
  fonts: ["arefruqaa", "rakkas", "amiri"],
  fields: [
    tf("kind", "المنتج", "Product", "زيت زيتون بكر", 16),
    tf("family", "العائلة", "Family", "من كروم آل عودة", 22),
    tf("place", "المكان", "Place", "دير استيا", 18),
    tf("season", "الموسم", "Season", "موسم ٢٠٢٧", 12),
  ],
  safeMm: 5,
  render(ctx) {
    const { W, H, p, s, cx } = dims(ctx, 60, 110), hr = 13 * s, hy = 18 * s;
    return scene(W, H, p.paper,
      starTile(0, 0, W, H, 8 * s, 1.2 * s, p.accent, 0.08),
      dotField(0, H * 0.72, W, H * 0.28, 3 * s, 0.45 * s, p.accent, { fade: "up", opacity: 0.5 }),
      g({ x: cx, y: hy }, ringsNode(hr + 1.6 * s, hr + 3.6 * s, 3, p.accent, 0.25 * s, 0.7), rosetteLines(hr + 6 * s, p.accent, { rings: 2, lobes: 16, width: 0.2 * s, opacity: 0.6 })),
      circle(cx, hy, hr, { fill: inks.white }), circle(cx, hy, hr, { fill: null, stroke: p.soft, strokeWidth: 0.4 * s }),
      path(`M${cx} ${hy + hr} L${cx} ${hy + hr + 6 * s}`, { fill: null, stroke: p.soft, strokeWidth: 0.4 * s }),
      g({ x: cx - 13 * s, y: 46 * s, rotate: -6 }, oliveBranch(26 * s, p.accent, p.accent2, { leaves: 7, olives: 3 })),
      line(val(ctx, "kind"), cx, 62 * s, 6.6 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: W - 12 * s }),
      rect(cx - 8 * s, 66 * s, 16 * s, 0.4 * s, { fill: p.accent2 }),
      line(val(ctx, "family"), cx, 74 * s, 3.8 * s, { font: "amiri", weight: 700, fill: p.ink, maxWidth: W - 12 * s }),
      line(val(ctx, "place"), cx, 81 * s, 3.4 * s, { font: "amiri", fill: p.ink, maxWidth: W - 12 * s }),
      line(val(ctx, "season"), cx, 96 * s, 3.4 * s, { font: "tajawal", weight: 800, fill: p.accent2, maxWidth: W - 12 * s }),
      doubleFrame(3 * s, 3 * s, W - 6 * s, H - 6 * s, p.accent, p.paper, { gap: 1.6 * s, heavy: 0.4 * s, thin: 0.15 * s, corner: "khatam", r: 1.8 * s }),
    );
  },
};
export default t;
