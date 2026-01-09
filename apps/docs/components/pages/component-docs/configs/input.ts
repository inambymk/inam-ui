import { ComponentConfig } from "../types";

export const inputConfig: ComponentConfig = {
  slug: "input",
  name: "Input",
  description: "Standard text input component with support for multiple types and states.",
  category: "Form",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "type",
      type: "string",
      defaultValue: "'text'",
      description: "HTML input type.",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is disabled.",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display.",
    },
  ],
  defaultProps: { placeholder: "Enter text..." },
  usageExamples: [
    {
      title: "Text Input",
      description: "Basic text field",
      code: `<Input placeholder="Your name" />`,
    },
    {
      title: "With Error",
      description: "Input showing validation error",
      code: `<Input 
  error="Email is required" 
  placeholder="email@example.com" 
/>`,
    },
  ],
  accessibility: {
    keyboard: ["Tab - Move focus"],
    ariaLabels: ["aria-invalid", "aria-describedby"],
    screenReader: "Inputs should always be paired with a label for accessibility.",
  },
  relatedComponents: ["textarea", "checkbox"],
};
