/**
 * Merges class names together, filtering out falsy values
 * @param classes Array of class names
 * @returns Merged class names string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
