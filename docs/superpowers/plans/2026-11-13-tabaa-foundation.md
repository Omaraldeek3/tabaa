# Tabaa Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A working Tabaa site: engine (scene, shaping, PDF with bleed and crop marks), the full site design, and the first 8 templates (one per category), end to end.

**Architecture:** Templates are pure functions that return a scene in millimetres. One resolver turns text nodes into outlined paths with harfbuzzjs; two renderers turn a resolved scene into SVG markup or a pdf-lib PDF. The site is a Next 16 static export that lists the registry and hosts one editor page per template.

**Tech Stack:** Next 16.3.5 (static export), React 19.3.0, TypeScript 6, pdf-lib 1.17.1, harfbuzzjs 1.6.2, bidi-js 1.1.0, node test runner, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-13-tabaa-design.md`

**Scope note:** The spec's 60 templates are split. This plan ships the engine, the site and 8 templates. A second plan (`tabaa-templates`) adds the remaining ~52 in category batches; each is "one file plus one registry line", proven by this plan's registry test.

## Global Constraints

- Read `node_modules/next/dist/docs/` for static export, `generateStaticParams`, fonts and metadata before writing any Next code.
- Scene model is flat: solid fills, strokes, opacity. No gradients, filters, masks or raster images (keeps PDF CMYK exact and vector).
- All scene units are millimetres. Origin is the trim box top-left; bleed extends to negative coordinates.
- Every template: unique id, renders with its sample values for every palette, font and size; nothing with `safe: true` leaves the safe area.
- No account, no network calls other than the site's own static files.
- Arabic first, RTL; English toggle. UI strings live in `src/content/strings.ts`.
- Motifs are original and code-drawn. Fonts are OFL, copied from `D:\work\harf\public\fonts\<id>\` with their `OFL.txt`.
- `prefers-reduced-motion` disables decorative motion.
- No GitHub repo or Vercel deploy in this plan; that needs Omar's go-ahead.

## File Structure

```
package.json, tsconfig.json, next.config.ts, playwright.config.ts
public/fonts/<id>/*.ttf + OFL.txt
src/lib/scene.ts            scene node types + builders + bounds helpers
src/lib/color.ts            Ink type {hex, cmyk}, hex->cmyk fallback
src/lib/pathdata.ts         parse/transform/serialise SVG path data
src/lib/fonts.ts            font catalogue, byte loading (browser + node)
src/lib/shaping.ts          visualRuns, shapeLine, textToPath (fit, align)
src/lib/resolve.ts          resolveScene: text nodes -> path nodes
src/lib/render-svg.ts       resolved scene -> SVG string (with bleed/marks)
src/lib/render-pdf.ts       resolved scene -> PDF bytes (CMYK, boxes, marks)
src/lib/export.ts           browser downloads: PDF, PNG, SVG
src/lib/motifs/*.ts         tatreez, olive, keffiyeh, arches, poppy, orange, borders
src/templates/types.ts      Template contract
src/templates/registry.ts   all templates
src/templates/<category>/<id>.ts
src/content/strings.ts      ar/en UI strings
src/components/*            Shell, Hero, LibraryGrid, Filters, Sheet, Editor, ...
src/app/layout.tsx, page.tsx, library/page.tsx, t/[id]/page.tsx, guide/page.tsx, globals.css
tests/*.test.ts             unit tests
tests/e2e/flow.spec.ts      Playwright
```

---

### Task 1: Scaffold and CMYK spike

**Files:** `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `tests/spike-cmyk.test.ts`

**Produces:** `npm run dev` (port 3016), `npm run build`, `npm test` (`node --experimental-strip-types --test tests/*.test.ts`), `npm run typecheck`.

- [ ] Create package.json with the stack above and scripts mirroring `D:\work\naqsh\package.json`; `npm install`.
- [ ] Read the Next docs listed in Global Constraints.
- [ ] Spike test: with pdf-lib draw `drawSvgPath("M0 0 L10 0 L10 10 Z", {color: cmyk(0,1,1,0)})`, save, assert the uncompressed content stream contains the `k` operator (`0 1 1 0 k`). Save with `useObjectStreams:false` and inflate the stream to check.
- [ ] If it passes, CMYK is the PDF colour path. If not, record it in the spec and use `rgb()`.
- [ ] Minimal layout/page so `npm run build` succeeds. Commit.

### Task 2: Scene, colour, path data

**Files:** `src/lib/scene.ts`, `src/lib/color.ts`, `src/lib/pathdata.ts`, `tests/scene.test.ts`, `tests/pathdata.test.ts`

**Produces:**

```ts
// color.ts
export type Ink = { hex: string; cmyk: [number, number, number, number] };
export function ink(hex: string, cmyk?: [number, number, number, number]): Ink; // derives cmyk when omitted

// scene.ts
export type Transform = { x?: number; y?: number; rotate?: number; scale?: number; scaleX?: number; scaleY?: number };
export type Paint = { fill?: Ink | null; stroke?: Ink | null; strokeWidth?: number; opacity?: number };
export type PathNode = { type: "path"; d: string; evenOdd?: boolean } & Paint;
export type RectNode = { type: "rect"; x: number; y: number; w: number; h: number; r?: number } & Paint;
export type CircleNode = { type: "circle"; cx: number; cy: number; r: number } & Paint;
export type TextNode = {
  type: "text"; value: string; font: string; weight?: number; size: number;
  x: number; y: number;                 // anchor; y is the baseline
  align: "start" | "center" | "end";    // start = right edge in rtl
  dir?: "rtl" | "ltr"; maxWidth?: number; // shrink to fit when wider
  tracking?: number; safe?: boolean;
} & Paint;
export type GroupNode = { type: "group"; children: SceneNode[]; opacity?: number } & Transform;
export type SceneNode = PathNode | RectNode | CircleNode | TextNode | GroupNode;
export type Scene = { widthMm: number; heightMm: number; background: Ink; children: SceneNode[] };
export const g, path, rect, circle, text;   // builders
export function flatten(scene: Scene): FlatShape[]; // applies transforms, rect/circle -> path d; throws on unresolved text

// pathdata.ts
export type Matrix = [number, number, number, number, number, number];
export function transformPath(d: string, m: Matrix): string; // supports M L H V C Q Z absolute + relative, A via cubic approximation
export function pathBounds(d: string): { minX: number; minY: number; maxX: number; maxY: number };
```

- [ ] Tests first: `transformPath("M0 0 L10 0", translate(5,5))` gives `M5 5 L15 5`; rotation by 90; relative commands normalised; `pathBounds` of a cubic; `flatten` composes nested group transforms; `ink("#ff0000").cmyk` equals `[0,1,1,0]`.
- [ ] Implement, run tests, commit.

### Task 3: Fonts and shaping

**Files:** `public/fonts/*`, `src/lib/fonts.ts`, `src/lib/shaping.ts`, `src/lib/resolve.ts`, `tests/shaping.test.ts`

**Consumes:** scene types, `transformPath`.

**Produces:**

```ts
// fonts.ts
export type FontDef = { id: string; family: L10n; style: "naskh" | "kufi" | "display" | "sans" | "ruqaa" | "latin";
  files: { weight: number; path: string; variable?: boolean }[]; scripts: ("ar" | "en")[] };
export const fonts: FontDef[];
export function getFont(id: string): FontDef;
export function setFontLoader(load: (path: string) => Promise<ArrayBuffer>): void; // browser: fetch; tests: fs
export async function fontBytes(id: string, weight?: number): Promise<{ bytes: ArrayBuffer; weight: number }>;

// shaping.ts
export function visualRuns(text: string, dir: "rtl" | "ltr"): { text: string; direction: "rtl" | "ltr" }[];
export async function textToPath(node: TextNode): Promise<{ d: string; width: number; size: number }>; // mm, y down, anchored

// resolve.ts
export async function resolveScene(scene: Scene): Promise<Scene>; // no text nodes remain; empty text is dropped
```

- [ ] Copy fonts from Harf (ids confirmed at execution; target: amiri, lateef, cairo, tajawal, almarai, kufam, rakkas, lalezar, katibeh, jomhuria, marhey, an available kufi and ruqaa face, inter, a Latin serif).
- [ ] Port `visualRuns` and the shaping loop from `D:\work\harf\src\lib\vector.ts`; cache `hb.Face` per font file.
- [ ] Tests first: «سلام» in Amiri gives non-empty `d`, width > 0; `maxWidth` half the natural width gives `size` about half; `align:"center"` bounds are centred on `x` within 0.5 mm; mixed «عرس 2026» keeps digits left-to-right (bounds order); `resolveScene` leaves no text nodes and drops empty text.
- [ ] Implement, run tests, commit.

### Task 4: Renderers and export

**Files:** `src/lib/render-svg.ts`, `src/lib/render-pdf.ts`, `src/lib/export.ts`, `tests/render.test.ts`

**Produces:**

```ts
export type PrintOptions = { bleedMm: number; cropMarks: boolean };
export function renderSvg(resolved: Scene, opts?: Partial<PrintOptions> & { showSafe?: boolean; safeMm?: number }): string;
export function renderPreviewSvg(scene: Scene): string; // unresolved ok: text as <text> with CSS font, textLength for fit
export async function renderPdf(resolved: Scene, opts: PrintOptions): Promise<Uint8Array>;
export async function downloadPdf / downloadPng(dpi) / downloadSvg(scene, name, opts);
```

PDF geometry: margin `M = cropMarks ? bleed + 6 : bleed` mm. Media box = trim + 2M. TrimBox inset M; BleedBox inset M - bleed. Crop marks: 4 mm long, 0.25 pt, registration colour `cmyk(1,1,1,1)`, starting bleed + 1 mm outside trim. Content clipped to the bleed box. 1 mm = 72/25.4 pt.

- [ ] Tests first: A6 scene (105 x 148) with bleed 3 and marks gives media box (105+18) x (148+18) mm in points within 0.01; TrimBox and BleedBox values; without marks margin equals bleed; output starts with `%PDF`; `renderSvg` viewBox includes bleed; `renderSvg` of a resolved scene contains no `<text`.
- [ ] Implement (flatten -> `drawSvgPath` per shape with cmyk fill/stroke and opacity; even-odd handled by path operators), run tests, commit.

### Task 5: Motifs

**Files:** `src/lib/motifs/{tatreez,olive,keffiyeh,arches,poppy,orange,borders,index}.ts`, `tests/motifs.test.ts`

**Produces:** each motif `(opts: { size: number; ink: Ink; ink2?: Ink }) => SceneNode` drawn in a `size x size` box at the origin; `tatreezUnit(name, cell, inks)` from stitch grids (`string[]` of `x`/`o`/`.` rows) with units `cypress`, `star8`, `moon`, `rose`, `palm`, `sarw`, `zigzag`, `chain`; `border(kind, w, h, thickness, inks)` and `band(kind, length, height, inks)` for frames and strips.

- [ ] Tests: every motif returns nodes whose flattened bounds sit inside its box (0.01 tolerance); a border of w x h stays inside w x h; stitch grids are rectangular.
- [ ] Implement, eyeball each motif in a scratch SVG contact sheet, commit.

### Task 6: Template contract, registry, first 8 templates

**Files:** `src/templates/types.ts`, `src/templates/registry.ts`, `src/templates/helpers.ts`, 8 template files, `tests/templates.test.ts`

**Produces:**

```ts
export type L10n = { ar: string; en: string };
export type Category = "wedding" | "occasions" | "posters" | "cards" | "menus" | "labels" | "greetings" | "certificates";
export type Palette = { id: string; name: L10n; paper: Ink; ink: Ink; accent: Ink; accent2: Ink; soft: Ink };
export type Field =
  | { id: string; kind: "text" | "multiline"; label: L10n; sample: string; maxLength?: number }
  | { id: string; kind: "list"; label: L10n; sample: string[][]; columns: L10n[]; maxRows: number };
export type Size = { id: string; label: L10n; widthMm: number; heightMm: number };
export type RenderContext = { values: Record<string, string | string[][]>; palette: Palette; font: string; size: Size; safeMm: number; bleedMm: number };
export type Template = { id: string; category: Category; lang: "ar" | "en"; title: L10n; tags: string[];
  sizes: Size[]; palettes: Palette[]; fonts: string[]; fields: Field[]; render(ctx: RenderContext): Scene };
export const templates: Template[]; export function getTemplate(id: string): Template | undefined;
export function sampleValues(t: Template): RenderContext["values"];
```

First 8: `wedding/tatreez-frame` (A5 invitation, tatreez border), `occasions/henna-night`, `posters/olive-harvest` (A3/A4), `cards/kufi-monogram` (85 x 55), `menus/falafel-shop` (A4, list field), `labels/olive-oil` (round 70 mm + rect), `greetings/eid-crescent`, `certificates/tatreez-honor` (A4 landscape).

- [ ] Registry test first: ids unique and kebab-case; for every template x palette x font x size, `render` then `resolveScene` succeeds; every `safe` text's bounds are inside the safe area; background fills the bleed; a 3x-long value in every text field still fits; an empty value removes its text.
- [ ] Build templates one at a time, checking each in a contact sheet (SVG to PNG via Playwright screenshot) before the next. Commit per template.

### Task 7: Site shell and design system

**Files:** `src/app/globals.css`, `src/app/layout.tsx`, `src/content/strings.ts`, `src/components/{Shell,LangToggle,CropMarks,TatreezRule,Sheet}.tsx`

- [ ] Tokens: paper `#f4ecdc`, ink `#16130f`, tatreez red `#b3261e`, olive `#5b6b2f`, gold `#c9a24b`, charcoal `#141210`; CMYK strip colours. Display face Rakkas/Lalezar for giant headings, Tajawal/Almarai for text, loaded as local `@font-face` from `public/fonts`.
- [ ] `Sheet`: shows a template as paper at true aspect ratio, soft layered shadow, slight tilt on hover; renders `renderPreviewSvg` first and swaps to the resolved SVG when ready.
- [ ] Shell: header with wordmark, nav, language toggle (sets `lang`/`dir`, persisted in localStorage inside try/catch); footer with open-source note.
- [ ] Verify in the browser pane at desktop and mobile widths. Commit.

### Task 8: Home, library, guide

**Files:** `src/app/page.tsx`, `src/app/library/page.tsx`, `src/app/guide/page.tsx`, `src/components/{Hero,CategoryBand,WeddingGallery,LibraryGrid,Filters}.tsx`

- [ ] Hero (bold poster): giant «طبعة», flat colour blocks, registration marks, live template sheets drifting; CTA to the library.
- [ ] Category bands on paper with tatreez rules; dark gold `WeddingGallery` band.
- [ ] Library: category chips, language filter, search over title and tags; counts come from the registry (never hard-coded).
- [ ] Guide: bleed, safe margin, paper weights, what to tell the print shop, colour note matching Task 1's result.
- [ ] Verify in the browser pane, both languages, mobile width, reduced motion. Commit.

### Task 9: Template editor page

**Files:** `src/app/t/[id]/page.tsx` (`generateStaticParams` from the registry), `src/components/{Editor,FieldForm,ListField,Chips,DownloadBar}.tsx`, `src/lib/storage.ts`

- [ ] Large live preview, fields beside it; palette, font and size chips; safe-area toggle; bleed (0 to 5) and crop-mark toggles; PDF, PNG (300 dpi), SVG buttons.
- [ ] Preview debounced 120 ms; stale resolves discarded; engine load failure shows a message with retry and keeps the CSS preview.
- [ ] Values saved per template id in localStorage (try/catch); "reset to sample" button.
- [ ] Exports omit empty fields; never export sample text the visitor cleared.
- [ ] Verify in the browser pane: edit, switch palette/font/size, download each format. Commit.

### Task 10: End-to-end test and final check

**Files:** `playwright.config.ts`, `tests/e2e/flow.spec.ts`, `README.md`, `LICENSE`, `ASSET-LICENSE.md`

- [ ] Playwright: home -> library -> filter weddings -> open a template -> change a name -> download PDF -> file starts with `%PDF` and is over 5 KB.
- [ ] `npm test`, `npm run typecheck`, `npm run build` all pass; open one exported PDF and check the boxes with pdf-lib.
- [ ] README (what it is, how to add a template), licences (MIT code, CC0 designs, OFL fonts). Commit.

---

## Self-review

- Spec coverage: architecture units (Tasks 2-6), print output and colour spike (1, 4), fonts (3), site design (7-9), error handling (9), testing (2-6, 10). Remaining templates and the portfolio card are deferred to the second plan and to launch, as the scope note says. Imposition is out of scope per the spec.
- Types: `Ink`, `Scene`, `TextNode`, `Palette`, `RenderContext`, `PrintOptions` are defined once and reused by name.
