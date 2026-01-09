// Component Registry
// Maps each component slug to its React component and config
// To add a new component: import config, import component, add to registry

import { ComponentConfig } from "./types";

// Import all configs
import {
  buttonConfig,
  badgeConfig,
  alertConfig,
  cardConfig,
  spinnerConfig,
  checkboxConfig,
  inputConfig,
  radioConfig,
  switchConfig,
  textareaConfig,
} from "./configs";

// Import components from CLI templates
// Note: These are imported dynamically in the page to avoid bundling issues
export const componentConfigs: Record<string, ComponentConfig> = {
  button: buttonConfig,
  badge: badgeConfig,
  alert: alertConfig,
  card: cardConfig,
  spinner: spinnerConfig,
  checkbox: checkboxConfig,
  input: inputConfig,
  radio: radioConfig,
  switch: switchConfig,
  textarea: textareaConfig,
};

export function getConfigBySlug(slug: string): ComponentConfig | null {
  return componentConfigs[slug] || null;
}

export function getAllSlugs(): string[] {
  return Object.keys(componentConfigs).sort(); // Sort alphabetically
}
