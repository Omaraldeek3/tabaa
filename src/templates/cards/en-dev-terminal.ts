import { circle, rect, scene } from "../../lib/scene.ts";
import { tf } from "../fields.ts";
import { dims, inks, line, pal, sizes, val } from "../kit.ts";
import type { Template } from "../types.ts";

const t: Template = {
  id: "cards-en-dev-terminal",
  category: "cards",
  lang: "en",
  title: { ar: "كرت مبرمج بنافذة الطرفية", en: "Developer card as a terminal window" },
  note: { ar: "الكرت نافذة طرفية بثلاث نقاط ملوّنة، والبيانات أوامر وإجابات بخط ثابت. للمبرمجين ومصمّمي المواقع.", en: "The card is a terminal window with its three dots, the details written as commands and replies. For developers and web designers." },
  tags: ["developer", "english", "terminal", "code", "card", "مبرمج", "إنجليزي", "كرت"],
  sizes: [sizes.card, sizes.card90],
  palettes: [
    pal("dark", "داكن", "Dark", inks.night, inks.ivory, inks.teal, inks.mustard, inks.grey),
    pal("light", "فاتح", "Light", inks.white, inks.black, inks.teal, inks.red, inks.grey),
    pal("olive", "زيتي", "Olive", inks.charcoal, inks.ivory, inks.sage, inks.orange, inks.grey),
  ],
  fonts: ["inter"],
  fields: [
    tf("name", "الاسم", "Name", "Omar Haddad", 28),
    tf("role", "المهنة", "Role", "full-stack developer"),
    tf("email", "البريد", "Email", "omar@example.dev"),
    tf("phone", "الهاتف", "Phone", "+970 59 000 0000"),
    tf("site", "الموقع", "Site", "github.com/omar-dev"),
  ],
  safeMm: 4,
  render(ctx) {
    const { W, H, p, b, s } = dims(ctx, 85, 55), L = 6 * s, max = W - 12 * s, ltr = { align: "start" as const, dir: "ltr" as const, font: "inter" };
    const row = (y: number, cmd: string, out: string) => cmd && out ? [line("$ " + cmd, L, y, 2.4 * s, { ...ltr, weight: 600, fill: p.accent, maxWidth: max }), line(out, L, y + 4 * s, 3 * s, { ...ltr, weight: 500, fill: p.ink, maxWidth: max })] : [];
    return scene(W, H, p.paper,
      rect(-b, -b, W + 2 * b, 7 * s + b, { fill: p.soft, opacity: 0.35 }),
      [inks.red, inks.mustard, inks.olive].map((c, i) => circle(L + i * 3.6 * s, 3.6 * s, 1.1 * s, { fill: c })),
      line(val(ctx, "name"), L, 17 * s, 6.2 * s, { ...ltr, weight: 800, fill: p.ink, maxWidth: max }),
      line(val(ctx, "role") ? "// " + val(ctx, "role") : "", L, 22 * s, 2.8 * s, { ...ltr, weight: 500, fill: p.accent2, maxWidth: max }),
      row(30 * s, "mail", val(ctx, "email")),
      row(39 * s, "call", val(ctx, "phone")),
      line(val(ctx, "site"), L, 50 * s, 2.6 * s, { ...ltr, weight: 500, fill: p.accent, maxWidth: max }),
    );
  },
};
export default t;
