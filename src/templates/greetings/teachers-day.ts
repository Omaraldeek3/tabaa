import { apple, doubleFrame, ringsNode } from "../../lib/motifs/index.ts";
import { g, path, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "greetings-teachers-day",
  category: "greetings",
  lang: "ar",
  title: { ar: "بطاقة شكر للمعلّم", en: "Thank-you card for a teacher" },
  note: { ar: "تفاحة حمراء على ورقة مربّعات كدفتر الرياضيات، وقلم رصاص يسطّر تحت «شكراً». ليوم المعلّم وآخر يوم في السنة الدراسية.", en: "A red apple on squared paper like a maths exercise book, with a pencil line under the thanks. For Teachers' Day and the last day of school." },
  tags: ["معلم", "معلمة", "يوم المعلم", "شكر", "مدرسة", "تفاحة", "teacher"],
  sizes: [sizes.a6, sizes.a6l],
  palettes: [
    pal("graph", "دفتر", "Exercise book", inks.white, inks.navy, inks.red, inks.olive, inks.sky),
    pal("cream", "قشدي", "Cream", inks.ivory, inks.black, inks.red, inks.oliveDark, inks.sand),
    pal("green", "أخضر", "Green", inks.white, inks.oliveDark, inks.mustard, inks.olive, inks.sage),
  ],
  fonts: ["marhey", "lalezar", "arefruqaa"],
  fields: [
    tf("title", "العنوان", "Title", "شكراً معلّمتي", 18),
    tf("message", "الرسالة", "Message", "علّمتِني الحروف، وعلّمتِني أن أحبّ المدرسة"),
    tf("from", "من", "From", "طالبتك ريم · الصف الثالث"),
  ],
  render(ctx) {
    const { W, H, p, b, s, cx } = dims(ctx, 105, 148), gs = 5 * s, grid: string[] = [], land = W > H, max = W - 16 * s;
    for (let x = -b; x < W + b; x += gs) grid.push(`M${x} ${-b} V${H + b}`);
    for (let y = -b; y < H + b; y += gs) grid.push(`M${-b} ${y} H${W + b}`);
    const ar = Math.min(W, H) * 0.2, ax = land ? W * 0.24 : cx, ay = land ? H * 0.5 : H * 0.34, tx = land ? W * 0.64 : cx, tw = land ? W * 0.58 : max;
    const ty = land ? H * 0.38 : H * 0.6;
    const z = Math.min(W, H) / 105;
    return scene(W, H, p.paper,
      g({ x: W / 2, y: H * 0.23, opacity: 0.2 }, ringsNode(22 * z, 36 * z, 4, p.accent, 0.3 * z)),
      path(grid.join(" "), { fill: null, stroke: p.soft, strokeWidth: 0.15 * s }),
      g({ x: ax, y: ay }, apple(ar, p.accent, p.accent2, p.ink)),
      line(val(ctx, "title"), tx, ty, 11 * s, { font: ctx.font, weight: 700, fill: p.ink, maxWidth: tw }),
      path(`M${tx - tw * 0.36} ${ty + 4 * s} q${tw * 0.2} ${2 * s} ${tw * 0.72} ${-1 * s}`, { fill: null, stroke: p.accent, strokeWidth: 0.8 * s }),
      line(val(ctx, "message"), tx, ty + 14 * s, 4.2 * s, { font: ctx.font, fill: p.ink, maxWidth: tw }),
      line(val(ctx, "from"), tx, Math.min(H - 7 - 3 * s, ty + 26 * s), 3.8 * s, { font: "tajawal", weight: 700, fill: p.accent, maxWidth: tw }),
      doubleFrame(5 * z, 5 * z, W - 10 * z, H - 10 * z, p.accent, p.paper, { gap: 1.6 * z, heavy: 0.4 * z, thin: 0.15 * z, corner: "bracket", r: 2 * z }),
    );
  },
};
export default t;
