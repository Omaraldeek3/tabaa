/** Stands in for Node's `module` in the browser bundle. HarfBuzz's loader
 *  imports it behind a Node-only check, so this is never called. */
export function createRequire(): never {
  throw new Error("createRequire is not available in the browser");
}
