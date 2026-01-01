import path from "path";
import fs from "fs";

/**
 * Registry of available components and their template file names
 */
const componentsMap = {
  Alert: "Alert.tsx",
  Badge: "Badge.tsx",
  Button: "Button.tsx",
  Card: "Card.tsx",
  Checkbox: "Checkbox.tsx",
  Input: "Input.tsx",
  Radio: "Radio.tsx",
  Spinner: "Spinner.tsx",
  Switch: "Switch.tsx",
  Textarea: "Textarea.tsx",
} as const;

export type ComponentName = keyof typeof componentsMap;

export const componentNames = Object.keys(componentsMap) as ComponentName[];

/**
 * Gets the correct component name (case-insensitive)
 */
export const getComponentName = (name: string): ComponentName | null => {
  const normalized = name.toLowerCase();
  const found = componentNames.find((comp) => comp.toLowerCase() === normalized);
  return found || null;
};

/**
 * Gets the template path for a component
 * Tries multiple possible locations to support both dev and prod environments
 */
export const getComponentTemplatePath = (name: ComponentName): string => {
  const possiblePaths = [
    // Development path (when running with ts-node)
    path.join(__dirname, "templates", componentsMap[name]),
    // Production path (when running from dist)
    path.join(__dirname, "..", "templates", componentsMap[name]),
    // Fallback path (for some build setups)
    path.join(process.cwd(), "templates", componentsMap[name]),
  ];

  // Find the first path that exists
  const validPath = possiblePaths.find((p) => fs.existsSync(p));

  if (!validPath) {
    throw new Error(
      `Could not find template for ${name}. Tried:\n` +
        possiblePaths.map((p) => `- ${p}`).join("\n")
    );
  }

  return validPath;
};

/**
 * Finds similar component names for better error messages
 */
export const findSimilarComponents = (name: string): string[] => {
  const normalized = name.toLowerCase();
  return componentNames
    .filter(
      (comp) => comp.toLowerCase().includes(normalized) || normalized.includes(comp.toLowerCase())
    )
    .slice(0, 3); // Return max 3 similar components
};
