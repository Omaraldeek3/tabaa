import { path, rect, scene } from "../../lib/scene.ts";
import { cardAr } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-architect-blueprint",
  category: "cards",
  lang: "ar",
  title: { ar: "كرت مهندس بورق المخطّطات الأزرق", en: "Architect's card on blueprint" },
  note: { ar: "ورق مخطّطات أزرق بشبكة رفيعة، وخط قياس بأسهم تحت الاسم كأنه بُعد على المخطّط. للمهندسين المعماريين والمدنيين والمقاولين.", en: "Blueprint blue with a fine grid and a dimension line with ticks under the name. For architects, civil engineers and contractors." },
  tags: ["كرت", "مهندس", "معماري", "مخطط", "مقاول", "تصميم", "architect"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("blueprint", "مخطط", "Blueprint", inks.navy, inks.ivory, inks.sky, inks.mustard, inks.sky),
    pal("white", "أبيض", "Drafting", inks.white, inks.navy, inks.sky, inks.red, inks.grey),
    pal("graphite", "غرافيت", "Graphite", inks.charcoal, inks.ivory, inks.grey, inks.orange, inks.grey),
  ],
  fonts: ["reemkufi", "kufam", "cairo"],
  fields: cardAr({ name: "م. يزن الشريف", role: "مهندس معماري · تصميم وإشراف", phone: "٠٥٩٥ ٨٨٨ ٩٩٩", email: "yazan@example.ps", address: "مكتب ٤، عمارة الماسيون، رام الله" }),
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 85, 55), gs = 2.5 * s, grid: string[] = [], max = W - 12 * s;
    for (let x = -b; x < W + b; x += gs) grid.push(`M${x} ${-b} V${H + b}`);
    for (let y = -b; y < H + b; y += gs) grid.push(`M${-b} ${y} H${W + b}`);
    const y = 24 * s, x0 = 10 * s, x1 = W - 10 * s, tick = (x: number) => `M${x} ${y - 2 * s} V${y + 2 * s} M${x - 1.2 * s} ${y + 1.2 * s} L${x + 1.2 * s} ${y - 1.2 * s}`;
    return scene(W, H, p.paper,
      path(grid.join(" "), { fill: null, stroke: p.accent, strokeWidth: 0.08 * s, opacity: 0.6 }),
      rect(4 * s, 4 * s, W - 8 * s, H - 8 * s, { fill: null, stroke: p.accent, strokeWidth: 0.3 * s }),
      line(val(ctx, "name"), cx, 18 * s, 6.6 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: max }),
      path(`M${x0} ${y} H${x1} ${tick(x0)} ${tick(x1)}`, { fill: null, stroke: p.accent2, strokeWidth: 0.3 * s }),
      line(val(ctx, "role"), cx, 30.4 * s, 3 * s, { font: "tajawal", weight: 700, fill: p.accent2, maxWidth: max }),
      line(val(ctx, "phone"), cx, 38.4 * s, 3.6 * s, { font: "tajawal", weight: 800, fill: p.ink, maxWidth: max }),
      line(val(ctx, "email"), cx, 43.4 * s, 2.7 * s, { font: "inter", fill: p.ink, maxWidth: max }),
      line(val(ctx, "address"), cx, 47.8 * s, 2.4 * s, { font: "tajawal", fill: p.ink, maxWidth: max }),
    );
  },
};
export default t;
