/** Turns every text node into an outlined path, so renderers only see shapes. */
import type { PathNode, Scene, SceneNode } from "./scene.ts";
import { textToPath } from "./shaping.ts";

export type ResolvedPath = PathNode & { safe?: boolean; fromText?: string };

async function resolveNodes(nodes: SceneNode[]): Promise<SceneNode[]> {
  const out = await Promise.all(nodes.map(async (node): Promise<SceneNode | null> => {
    if (node.type === "group") return { ...node, children: await resolveNodes(node.children) };
    if (node.type !== "text") return node;
    const outline = await textToPath(node);
    if (!outline.d) return null;
    const resolved: ResolvedPath = {
      type: "path", d: outline.d, fill: node.fill, stroke: node.stroke, strokeWidth: node.strokeWidth,
      opacity: node.opacity, safe: node.safe, fromText: node.value,
    };
    return resolved;
  }));
  return out.filter((n): n is SceneNode => n !== null);
}

export async function resolveScene(scene: Scene): Promise<Scene> {
  return { ...scene, children: await resolveNodes(scene.children) };
}
