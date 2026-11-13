import assert from "node:assert/strict";
import { test } from "node:test";
import { ink } from "../src/lib/color.ts";
import { fonts } from "../src/lib/fonts.ts";
import { tatreezBand, tatreezFrame, tatreezUnit } from "../src/lib/motifs/index.ts";
import { pathBounds } from "../src/lib/pathdata.ts";
import { renderPdf } from "../src/lib/render-pdf.ts";
import { type ResolvedPath, resolveScene } from "../src/lib/resolve.ts";
import { type Scene, type SceneNode, nodesBounds, walk } from "../src/lib/scene.ts";
import { defaultContext, sampleValues, templates } from "../src/templates/registry.ts";
import { categories, type Template, type Values } from "../src/templates/types.ts";
import { useDiskFonts } from "./setup.ts";

useDiskFonts();
const fontIds = new Set(fonts.map(f => f.id));

/** Every text line that claimed to be safe, with its bounds in page millimetres. */
function safeTexts(resolved: Scene): { text: string; minX: number; minY: number; maxX: number; maxY: number }[] {
  const out: ReturnType<typeof safeTexts> = [];
  const visit = (nodes: SceneNode[], dx: number, dy: number) => {
    for (const n of nodes) {
      if (n.type === "group") {
        // Templates only place safe text at the top level or under plain translations.
        if (n.rotate || n.scale || n.scaleX || n.scaleY) continue;
        visit(n.children, dx + (n.x ?? 0), dy + (n.y ?? 0));
      } else if (n.type === "path" && (n as ResolvedPath).safe) {
        const b = pathBounds(n.d);
        out.push({ text: (n as ResolvedPath).fromText ?? "", minX: b.minX + dx, maxX: b.maxX + dx, minY: b.minY + dy, maxY: b.maxY + dy });
      }
    }
  };
  visit(resolved.children, 0, 0);
  return out;
}

function assertSafe(t: Template, resolved: Scene, label: string) {
  const safe = t.safeMm ?? 5, tol = 0.6; // marks above a letter may poke a hair past the line
  for (const s of safeTexts(resolved)) {
    const ok = s.minX >= safe - tol && s.maxX <= resolved.widthMm - safe + tol && s.minY >= safe - tol && s.maxY <= resolved.heightMm - safe + tol;
    assert.ok(ok, `${label}: "${s.text}" leaves the safe area (${s.minX.toFixed(1)}..${s.maxX.toFixed(1)} x ${s.minY.toFixed(1)}..${s.maxY.toFixed(1)} on ${resolved.widthMm}x${resolved.heightMm})`);
  }
}

test("template ids are unique, kebab-case and start with their category", () => {
  const seen = new Set<string>();
  for (const t of templates) {
    assert.match(t.id, /^[a-z0-9]+(-[a-z0-9]+)+$/, t.id);
    assert.ok(t.id.startsWith(`${t.category}-`), t.id);
    assert.ok(!seen.has(t.id), `duplicate ${t.id}`);
    seen.add(t.id);
    assert.ok(categories.some(c => c.id === t.category), t.id);
    assert.ok(t.title.ar && t.title.en && t.note.ar && t.note.en, t.id);
    assert.ok(t.sizes.length && t.palettes.length && t.fonts.length && t.fields.length, t.id);
    for (const f of t.fonts) assert.ok(fontIds.has(f), `${t.id}: unknown font ${f}`);
    assert.equal(new Set(t.fields.map(f => f.id)).size, t.fields.length, `${t.id}: duplicate field id`);
    assert.equal(new Set(t.palettes.map(p => p.id)).size, t.palettes.length, `${t.id}: duplicate palette id`);
  }
});

test("no two templates share a title", () => {
  assert.equal(new Set(templates.map(t => t.title.ar)).size, templates.length);
  assert.equal(new Set(templates.map(t => t.title.en)).size, templates.length);
});

for (const t of templates) {
  test(`${t.id}: every size, palette and font renders inside the safe area`, async () => {
    for (const size of t.sizes) {
      // Palettes change colour only and fonts change metrics only, so sweep each once per size.
      for (const palette of t.palettes) {
        const s = await resolveScene(t.render(defaultContext(t, { size, palette })));
        assert.equal(s.widthMm, size.widthMm); assert.equal(s.heightMm, size.heightMm);
      }
      for (const font of t.fonts) assertSafe(t, await resolveScene(t.render(defaultContext(t, { size, font }))), `${size.id}/${font}`);
    }
  });

  test(`${t.id}: long input still fits and empty input leaves nothing behind`, async () => {
    const long: Values = {}, empty: Values = {};
    for (const f of t.fields) {
      if (f.kind === "list") { long[f.id] = Array.from({ length: f.maxRows + 4 }, () => f.columns.map((_, i) => (i ? "١٢٣٤٥٦" : "صنف طويل جداً باسم لا ينتهي أبداً أبداً"))); empty[f.id] = []; }
      else if (f.kind === "multiline") { long[f.id] = Array.from({ length: f.maxLines + 3 }, () => `${f.sample.split("\n")[0]} ${f.sample.split("\n")[0]} ${f.sample.split("\n")[0]}`).join("\n"); empty[f.id] = ""; }
      else { long[f.id] = `${f.sample} ${f.sample} ${f.sample}`; empty[f.id] = "  "; }
    }
    for (const size of t.sizes) {
      assertSafe(t, await resolveScene(t.render(defaultContext(t, { size, values: long }))), `${size.id}/long`);
      const bare = await resolveScene(t.render(defaultContext(t, { size, values: empty })));
      const texts: string[] = [];
      walk(bare.children, n => { const from = (n as ResolvedPath).fromText; if (from && (n as ResolvedPath).safe) texts.push(from); });
      assert.deepEqual(texts, [], `${t.id}: text printed with every field empty`);
    }
  });

  test(`${t.id}: exports a PDF`, async () => {
    const bytes = await renderPdf(await resolveScene(t.render(defaultContext(t))), { bleedMm: 3, cropMarks: true });
    assert.ok(bytes.length > 2000);
  });
}

test("sampleValues gives every field a value of its kind", () => {
  for (const t of templates) {
    const v = sampleValues(t);
    for (const f of t.fields) assert.equal(Array.isArray(v[f.id]), f.kind === "list", `${t.id}.${f.id}`);
  }
});

test("tatreez stays inside its box", () => {
  const a = ink("#b3261e"), b = ink("#000000");
  const inBox = (node: SceneNode, w: number, h: number) => {
    const bb = nodesBounds([node]);
    assert.ok(bb.minX >= -0.01 && bb.minY >= -0.01 && bb.maxX <= w + 0.01 && bb.maxY <= h + 0.01, JSON.stringify(bb));
  };
  for (const style of ["lattice", "chain", "stars"] as const) inBox(tatreezFrame(134, 196, 8.4, [a, b], { style }), 134, 196);
  for (const name of ["chain", "zigzag", "trees", "lattice", "dots"] as const) inBox(tatreezBand(name, 60, 5, [a, b]), 60, 5);
  for (const name of ["star", "rose", "cypress", "diamond"] as const) inBox(tatreezUnit(name, 20, [a, b]), 20, 20);
});
