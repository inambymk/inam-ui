/**
 * Modular component API data exports
 * Each component has its own file for easy maintenance and scalability
 */

export * from "./types";
export { buttonApi } from "./button";
export { inputApi } from "./input";
export { textareaApi } from "./textarea";
export { checkboxApi } from "./checkbox";
export { radioApi } from "./radio";
export { switchApi } from "./switch";
export { cardApi } from "./card";
export { alertApi } from "./alert";
export { badgeApi } from "./badge";
export { spinnerApi } from "./spinner";

import { ComponentApiData } from "./types";
import { buttonApi } from "./button";
import { inputApi } from "./input";
import { textareaApi } from "./textarea";
import { checkboxApi } from "./checkbox";
import { radioApi } from "./radio";
import { switchApi } from "./switch";
import { cardApi } from "./card";
import { alertApi } from "./alert";
import { badgeApi } from "./badge";
import { spinnerApi } from "./spinner";

/**
 * Centralized component API data registry
 * Add new components here in alphabetical order for easy reference
 */
export const componentApiData: Record<string, ComponentApiData> = {
  alert: alertApi,
  badge: badgeApi,
  button: buttonApi,
  card: cardApi,
  checkbox: checkboxApi,
  input: inputApi,
  radio: radioApi,
  spinner: spinnerApi,
  switch: switchApi,
  textarea: textareaApi,
};
