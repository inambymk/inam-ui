/**
 * Component API Data
 *
 * This file now re-exports from the modular component-api structure.
 * Each component has its own file in ./component-api/ for better maintainability.
 *
 * To add a new component:
 * 1. Create a new file in ./component-api/<component-name>.ts
 * 2. Export it in ./component-api/index.ts
 * 3. The componentApiData registry will automatically include it
 */

export * from "./component-api";
import { componentApiData, ComponentApiData } from "./component-api";

/**
 * Helper function to get component API data by slug
 * @param slug - Component slug (e.g., "button", "input")
 * @returns Component API data or undefined if not found
 */
export function getComponentApi(slug: string): ComponentApiData | undefined {
  return componentApiData[slug];
}
