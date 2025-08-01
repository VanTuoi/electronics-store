/**
 * Converts a string into a slug format (lowercase, hyphen-separated, URI-decoded).
 *
 * @param input - The original string to slugify
 * @returns The slugified string
 */
export function slugify(input: string): string {
  return decodeURI(input.toLowerCase().trim().replace(/\s+/g, "-"));
}
