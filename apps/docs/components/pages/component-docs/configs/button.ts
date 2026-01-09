import { ComponentConfig } from "../types";

export const buttonConfig: ComponentConfig = {
  slug: "button",
  name: "Button",
  description: "A customizable button component with multiple variants and states.",
  category: "Form",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "variant",
      type: "'primary' | 'secondary' | 'success' | 'destructive' | 'outline' | 'ghost' | 'link'",
      defaultValue: "'primary'",
      description: "Visual style of the button.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the button takes full container width.",
    },
    {
      name: "isLoading",
      type: "boolean",
      defaultValue: "false",
      description: "Shows a spinner and disables the button.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the button.",
    },
  ],
  variants: [
    { value: "primary" },
    { value: "secondary" },
    { value: "success" },
    { value: "destructive" },
    { value: "outline" },
    { value: "ghost" },
    { value: "link" },
  ],
  defaultProps: { children: "Button" },
  usageExamples: [
    {
      title: "Basic Usage",
      description: "Simple button with default styling",
      code: `<Button>Click me</Button>`,
    },
    {
      title: "With Variants",
      description: "Different visual styles for various actions",
      code: `<Button variant="primary">Primary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>`,
    },
    {
      title: "Loading State",
      description: "Show loading spinner during async operations",
      code: `<Button isLoading>Saving...</Button>`,
    },
  ],
  accessibility: {
    keyboard: ["Enter or Space - Activates the button", "Tab - Moves focus to/from button"],
    ariaLabels: ["aria-label", "aria-busy (when loading)"],
    screenReader: "Announced as 'button' with its text content. Loading state announced as 'busy'.",
  },
  relatedComponents: ["badge", "spinner"],
};
