import { ComponentConfig } from "../types";

export const switchConfig: ComponentConfig = {
  slug: "switch",
  name: "Switch",
  description: "A toggle switch component for binary choices.",
  category: "Form",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "label",
      type: "string",
      description: "Label text for the switch.",
    },
    {
      name: "checked",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the switch is on.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the switch is disabled.",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Callback when switch state changes.",
    },
  ],
  defaultProps: { label: "Toggle setting" },
  usageExamples: [
    {
      title: "Settings Toggle",
      description: "Use for binary on/off settings",
      code: `<Switch 
  label="Enable Notifications" 
  checked={enabled} 
  onChange={setEnabled} 
/>`,
    },
  ],
  accessibility: {
    keyboard: ["Space or Enter - Toggle switch state", "Tab - Move focus"],
    ariaLabels: ["role='switch'", "aria-checked"],
    screenReader: "Announces as 'switch' with label and state.",
  },
  relatedComponents: ["checkbox"],
};
