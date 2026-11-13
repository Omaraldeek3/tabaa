/** Static files live under the site's base path, when one is set. */
export const asset = (file: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${file.replace(/^\//, "")}`;
