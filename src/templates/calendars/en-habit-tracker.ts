import { beadRule, dotField, doubleFrame, starTile } from "../../lib/motifs/index.ts";
import { circle, rect, scene, type SceneNode, text } from "../../lib/scene.ts";
import { lf, tf } from "../fields.ts";
import { dims, inks, line, pal, rows, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "calendars-en-habit-tracker",
  category: "calendars",
  lang: "en",
  title: { ar: "متتبّع العادات الشهري بالإنجليزية", en: "Monthly habit tracker" },
  note: { ar: "ورقة إنجليزية لمتابعة العادات: كل عادة في صفّ وأمامها واحد وثلاثون دائرة لأيام الشهر تُلوّن يوماً بيوم.", en: "An English sheet for tracking habits: each habit on a row with thirty-one circles for the days of the month, filled in day by day." },
  tags: ["habit tracker", "english", "planner", "month", "routine", "عادات", "إنجليزي", "مخطط"],
  sizes: [sizes.a4l],
  palettes: [
    pal("calm", "هادئ", "Calm", inks.white, inks.navy, inks.teal, inks.sky, inks.grey),
    pal("warm", "دافئ", "Warm", inks.ivory, inks.black, inks.terracotta, inks.mustard, inks.grey),
    pal("sage", "مريمي", "Sage", inks.ivory, inks.oliveDark, inks.olive, inks.sage, inks.grey),
  ],
  fonts: ["playfairdisplay", "inter"],
  fields: [
    tf("title", "العنوان", "Title", "Habit tracker", 22),
    tf("month", "الشهر", "Month", "March 2028", 20),
    lf("habits", "العادات", "Habits", [["العادة", "Habit"]], [["Read 20 pages"], ["Walk 30 minutes"], ["Drink 8 glasses of water"], ["No phone after 10 pm"], ["Call family"], ["Practise Arabic calligraphy"]], 10),
  ],
  safeMm: 8,
  render(ctx) {
    const { W, H, p, s } = dims(ctx, 297, 210), L = 14 * s, nameW = 64 * s, gx = L + nameW, cw = (W - gx - 12 * s) / 31, list = rows(ctx, "habits", 10), top = 50 * s, rh = Math.min(14 * s, (H - top - 12 * s) / Math.max(list.length, 1));
    const ltr = { align: "start" as const, dir: "ltr" as const };
    const nodes: (SceneNode | null)[] = [];
    for (let d = 0; d < 31; d++) nodes.push(text(String(d + 1), { font: "inter", weight: 600, size: 2.6 * s, x: gx + (d + 0.5) * cw, y: top - 3 * s, align: "center", fill: p.ink }));
    list.forEach(([habit = ""], i) => {
      const y = top + i * rh;
      if (i % 2 === 0) nodes.push(rect(L - 2 * s, y, W - L - 10 * s, rh, { fill: p.accent2, opacity: 0.18 }));
      nodes.push(line(habit, L, y + rh * 0.62, 4 * s, { ...ltr, font: "inter", weight: 500, fill: p.ink, maxWidth: nameW - 4 * s }));
      for (let d = 0; d < 31; d++) nodes.push(circle(gx + (d + 0.5) * cw, y + rh / 2, Math.min(cw, rh) * 0.32, { fill: null, stroke: p.accent, strokeWidth: 0.3 * s }));
    });
    return scene(W, H, p.paper,
      dotField(W * 0.55, 0, W * 0.45, 44 * s, 4 * s, 0.5 * s, p.accent, { fade: "left", opacity: 0.3 }),
      starTile(0, H - 14 * s, W, 14 * s, 9 * s, 1.2 * s, p.accent, 0.06),
      line(val(ctx, "title"), L, 28 * s, 13 * s, { ...ltr, font: ctx.font, weight: 700, fill: p.ink, maxWidth: W * 0.5 }),
      line(val(ctx, "month"), W - 14 * s, 28 * s, 6 * s, { align: "end", dir: "ltr", font: "inter", weight: 600, fill: p.accent, maxWidth: W * 0.3 }),
      nodes,
      beadRule(L, W - 12 * s, 38 * s, p.accent, s, { bead: "dot", pitch: 3 }),
      doubleFrame(5 * s, 5 * s, W - 10 * s, H - 10 * s, p.accent, p.paper, { gap: 1.8 * s, heavy: 0.5 * s, thin: 0.2 * s, corner: "bracket", r: 3 * s }),
    );
  },
};
export default t;
