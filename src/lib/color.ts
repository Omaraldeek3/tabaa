/** A colour carried in both spaces: sRGB for the screen, CMYK for the press. */
export type Cmyk = [number, number, number, number];
export type Ink = { hex: string; cmyk: Cmyk };

export function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`Bad colour: ${hex}`);
  const n = parseInt(m[1], 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const round = (n: number) => Math.round(n * 1000) / 1000;

/** Plain conversion with full black generation. Palettes that care pass their own CMYK. */
export function hexToCmyk(hex: string): Cmyk {
  const [r, g, b] = hexToRgb(hex);
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) return [0, 0, 0, 1];
  return [round((1 - r - k) / (1 - k)), round((1 - g - k) / (1 - k)), round((1 - b - k) / (1 - k)), round(k)];
}

export function ink(hex: string, cmyk?: Cmyk): Ink {
  return { hex: hex.toLowerCase(), cmyk: cmyk ?? hexToCmyk(hex) };
}
