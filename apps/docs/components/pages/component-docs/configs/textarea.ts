import { ComponentConfig } from "../types";

export const textareaConfig: ComponentConfig = {
  slug: "textarea",
  name: "Textarea",
  description: "Multi-line text input component with auto-resize and validation support.",
  category: "Form",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text.",
    },
    {
      name: "rows",
      type: "number",
      defaultValue: "3",
      description: "Initial number of rows.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the textarea is disabled.",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display.",
    },
  ],
  defaultProps: { placeholder: "Write something..." },
  usageExamples: [
    {
      title: "Basic Textarea",
      description: "Standard multi-line input",
      code: `<Textarea placeholder="Describe your issue" />`,
    },
    {
      title: "With Initial Rows",
      description: "Larger initial height",
      code: `<Textarea rows={6} placeholder="Extended content" />`,
    },
  ],
  accessibility: {
    keyboard: ["Tab - Move focus"],
    screenReader: "Ensure it has a visible label or an aria-label.",
  },
  relatedComponents: ["input"],
};
