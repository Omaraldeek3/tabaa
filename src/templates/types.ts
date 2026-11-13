import type { Ink } from "../lib/color.ts";
import type { L10n } from "../lib/fonts.ts";
import type { Scene } from "../lib/scene.ts";

export type { L10n };
export type Category = "wedding" | "occasions" | "posters" | "cards" | "menus" | "labels" | "greetings" | "certificates";

/** A named set of colours a template can be printed in. */
export type Palette = { id: string; name: L10n; paper: Ink; ink: Ink; accent: Ink; accent2: Ink; soft: Ink };

export type TextField = { id: string; kind: "text"; label: L10n; sample: string; maxLength?: number };
export type MultilineField = { id: string; kind: "multiline"; label: L10n; sample: string; maxLines: number; maxLength?: number };
export type ListField = { id: string; kind: "list"; label: L10n; columns: L10n[]; sample: string[][]; maxRows: number };
export type Field = TextField | MultilineField | ListField;

export type Size = { id: string; label: L10n; widthMm: number; heightMm: number };
export type Values = Record<string, string | string[][]>;
export type RenderContext = { values: Values; palette: Palette; font: string; size: Size; safeMm: number; bleedMm: number };

export type Template = {
  id: string;
  category: Category;
  lang: "ar" | "en";
  title: L10n;
  /** One line on what it is for; shown on the template page. */
  note: L10n;
  tags: string[];
  sizes: Size[];
  palettes: Palette[];
  /** Headline faces this design is tuned for; the first is the default. */
  fonts: string[];
  fields: Field[];
  /** Distance from the trim edge that text must keep. Defaults to 5 mm. */
  safeMm?: number;
  /** Die-cut shape, for the preview and the guide. Defaults to a rectangle. */
  shape?: "rect" | "round";
  render(ctx: RenderContext): Scene;
};

export const categories: { id: Category; name: L10n }[] = [
  { id: "wedding", name: { ar: "دعوات أعراس", en: "Wedding invitations" } },
  { id: "occasions", name: { ar: "مناسبات", en: "Occasions" } },
  { id: "posters", name: { ar: "بوسترات", en: "Posters" } },
  { id: "cards", name: { ar: "كروت أعمال", en: "Business cards" } },
  { id: "menus", name: { ar: "قوائم طعام", en: "Menus" } },
  { id: "labels", name: { ar: "ملصقات منتجات", en: "Product labels" } },
  { id: "greetings", name: { ar: "تهاني", en: "Greetings" } },
  { id: "certificates", name: { ar: "شهادات", en: "Certificates" } },
];
