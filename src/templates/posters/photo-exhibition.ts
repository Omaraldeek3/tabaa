import { dotField } from "../../lib/motifs/index.ts";
import { circle, g, path, rect, scene, type SceneNode } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, joined, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-photo-exhibition",
  category: "posters",
  lang: "ar",
  title: { ar: "بوستر معرض تصوير فوتوغرافي", en: "Photography exhibition poster" },
  note: { ar: "شرائط فيلم بثقوبها وإطاراتها الفارغة تملأ البوستر كورقة تحميض، وإطار واحد فيها ملوّن كأنه الصورة المختارة.", en: "Strips of film with their sprocket holes and empty frames fill the poster like a contact sheet, with one frame picked out in colour." },
  tags: ["تصوير", "معرض", "فوتوغرافي", "فيلم", "فن", "photography", "exhibition"],
  sizes: [sizes.a3, sizes.a4, sizes.poster5070],
  palettes: [
    pal("film", "فيلم", "Film", inks.ivory, inks.black, inks.red, inks.charcoal, inks.sand),
    pal("amber", "كهرماني", "Amber", inks.charcoal, inks.ivory, inks.orange, inks.black, inks.grey),
    pal("cyan", "سماوي", "Cyan", inks.white, inks.black, inks.teal, inks.charcoal, inks.sky),
  ],
  fonts: ["reemkufi", "kufam", "lalezar"],
  fields: [
    tf("title", "العنوان", "Title", "وجوه المخيّم", 18),
    tf("artist", "المصوّر", "Photographer", "معرض فردي للمصوّر أحمد عيسى"),
    tf("dates", "المدة", "Dates", "١–١٥ أيار"),
    tf("opening", "الافتتاح", "Opening", "الافتتاح الخميس ١ أيار · السادسة مساءً"),
    tf("venue", "المكان", "Venue", "غاليري المحطة، بيت لحم"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 297, 420), sh = 54 * s, gap = 6 * s, fw = 52 * s, strips = 4, top = 22 * s, hi = 2, hj = 2;
    const nodes: SceneNode[] = [];
    for (let j = 0; j < strips; j++) {
      const y = top + j * (sh + gap), off = (j % 2) * fw * 0.4;
      nodes.push(rect(-b, y, W + 2 * b, sh, { fill: p.accent2 }));
      for (let k = -1; k * 6 * s < W + 2 * b; k++) { nodes.push(rect(-b + k * 6 * s + off * 0.1, y + 2 * s, 3 * s, 3.2 * s, { fill: p.paper, r: 0.6 * s })); nodes.push(rect(-b + k * 6 * s + off * 0.1, y + sh - 5.2 * s, 3 * s, 3.2 * s, { fill: p.paper, r: 0.6 * s })); }
      for (let i = -1; i * (fw + 3 * s) < W + b; i++) nodes.push(rect(-off + i * (fw + 3 * s), y + 8 * s, fw, sh - 16 * s, { fill: j === hj && i === hi ? p.accent : p.soft, opacity: j === hj && i === hi ? 1 : 0.85 }));
    }
    const ty = top + strips * (sh + gap) + 30 * s, max = W - 40 * s;
    const z = Math.min(W, H) / 297;
    return scene(W, H, p.paper,
      dotField(0, H * 0.6, W, H * 0.4, 7 * z, 0.8 * z, p.ink, { fade: "up", opacity: 0.1 }),
      nodes,
      line(val(ctx, "title"), cx, ty, 30 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "artist"), cx, ty + 22 * s, 9 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: max }),
      line(joined(ctx, ["dates"]), cx, ty + 44 * s, 14 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      line(val(ctx, "opening"), cx, ty + 60 * s, 7.4 * s, { font: "tajawal", weight: 500, fill: p.ink, maxWidth: max }),
      line(val(ctx, "venue"), cx, Math.min(H - 16 * s, ty + 74 * s), 7.4 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      [[W * 0.2, H * 0.62], [W * 0.8, H * 0.62]].map(([x, y]) => g({ x, y }, path(`M${-6 * z} 0 H${6 * z} M0 ${-6 * z} V${6 * z}`, { fill: null, stroke: p.accent, strokeWidth: 0.5 * z }), circle(0, 0, 3 * z, { fill: null, stroke: p.accent, strokeWidth: 0.4 * z }))),
    );
  },
};
export default t;
