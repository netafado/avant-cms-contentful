/**
 * URL-safe id from a display label, used to pair the Work Experience rail
 * links with their card anchors (`Bold Commerce` -> `bold-commerce`).
 */
const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default slugify;
