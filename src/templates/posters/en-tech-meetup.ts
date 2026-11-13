import { circle, g, path, rect, scene } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "posters-en-tech-meetup",
  category: "posters",
  lang: "en",
  title: { ar: "بوستر لقاء تقني بالإنجليزية", en: "Tech meetup poster" },
  note: { ar: "بوستر إنجليزي للقاءات المبرمجين: خطوط دارة إلكترونية تتفرّع من قوسي كود كبيرين، وجدول الفقرات بخط ثابت العرض.", en: "An English poster for developer meetups: circuit traces branch out of a pair of big code brackets, with the agenda set like code." },
  tags: ["tech", "meetup", "english", "code", "developers", "تقنية", "برمجة", "إنجليزي"],
  sizes: [sizes.a3, sizes.a4],
  palettes: [
    pal("terminal", "طرفية", "Terminal", inks.night, inks.ivory, inks.teal, inks.mustard, inks.navy),
    pal("paper", "ورق", "Paper", inks.white, inks.black, inks.teal, inks.orange, inks.sky),
    pal("olive", "زيتي", "Olive", inks.oliveDark, inks.ivory, inks.mustard, inks.sage, inks.olive),
  ],
  fonts: ["inter", "playfairdisplay"],
  fields: [
    tf("kicker", "سطر علوي", "Kicker", "Gaza Sky Devs · Meetup #12"),
    tf("title", "العنوان", "Title", "Shipping with AI", 22),
    tf("sub", "الوصف", "Subtitle", "Talks, demos and knafeh"),
    lf("agenda", "البرنامج", "Agenda", [["الوقت", "Time"], ["الفقرة", "Item"]], [["18:00", "Doors & coffee"], ["18:30", "Agents in production"], ["19:15", "Lightning demos"], ["20:00", "Networking"]], 6),
    tf("where", "المكان", "Where", "Thursday 4 Sept · Ramallah Tech Hub"),
    tf("link", "التسجيل", "Register", "meetup.example.ps/12"),
  ],
  safeMm: 10,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 297, 420), L = 22 * s, list = rows(ctx, "agenda", 6), mid = 120 * s;
    const traces = [0, 1, 2, 3, 4, 5].map(i => `M${W * 0.5 + (i - 2.5) * 12 * s} ${mid + 40 * s} V${mid + 60 * s + i * 4 * s} L${-b + i * 26 * s} ${mid + 110 * s + i * 4 * s}`).join(" ")
      + " " + [0, 1, 2, 3].map(i => `M${W * 0.62} ${mid - 30 * s + i * 14 * s} H${W * 0.8 + i * 6 * s} L${W + b} ${mid - 60 * s + i * 14 * s}`).join(" ");
    const pads = [0, 1, 2, 3, 4, 5].map(i => circle(-b + i * 26 * s, mid + 110 * s + i * 4 * s, 2.4 * s, { fill: p.accent2 }));
    const ltr = { align: "start" as const, dir: "ltr" as const };
    return scene(W, H, p.paper,
      path(traces, { fill: null, stroke: p.accent, strokeWidth: 1.2 * s, opacity: 0.8 }), pads,
      g({ x: W * 0.5, y: mid }, rect(-46 * s, -42 * s, 92 * s, 84 * s, { fill: p.soft, r: 6 * s })),
      line("{ }", W * 0.5, mid + 22 * s, 56 * s, { font: "inter", weight: 800, fill: p.accent, safe: false }),
      line(val(ctx, "kicker"), L, 34 * s, 7 * s, { font: "inter", weight: 600, fill: p.accent, ...ltr, maxWidth: W - 2 * L }),
      line(val(ctx, "title"), L, 252 * s, 30 * s, { font: ctx.font, weight: 800, fill: p.ink, ...ltr, maxWidth: W - 2 * L }),
      line(val(ctx, "sub"), L, 272 * s, 9 * s, { font: "inter", weight: 500, fill: p.ink, ...ltr, maxWidth: W - 2 * L }),
      list.flatMap(([time = "", item = ""], i) => [
        line(time, L, 300 * s + i * 13 * s, 7 * s, { font: "inter", weight: 800, fill: p.accent2, ...ltr, maxWidth: 40 * s }),
        line(item, L + 44 * s, 300 * s + i * 13 * s, 7 * s, { font: "inter", weight: 500, fill: p.ink, ...ltr, maxWidth: W - 2 * L - 44 * s }),
      ]),
      line(val(ctx, "where"), L, H - 30 * s, 7.4 * s, { font: "inter", weight: 700, fill: p.ink, ...ltr, maxWidth: W - 2 * L }),
      line(val(ctx, "link"), L, H - 17 * s, 6.4 * s, { font: "inter", weight: 500, fill: p.accent, ...ltr, maxWidth: W - 2 * L }),
    );
  },
};
export default t;
