/**
 * Component metadata for CLI and documentation
 * This is the source of truth for component information
 */

export interface ComponentMetadata {
  slug: string;
  name: string;
  description: string;
  category: "Form" | "Layout" | "Overlay" | "Feedback" | "Progress";
}

export const componentsMetadata: ComponentMetadata[] = [
  {
    slug: "button",
    name: "Button",
    description: "A customizable button component with multiple variants and sizes",
    category: "Form",
  },
  {
    slug: "input",
    name: "Input",
    description: "A flexible input field with label, validation states, and icon support",
    category: "Form",
  },
  {
    slug: "textarea",
    name: "Textarea",
    description: "A simple textarea component with label and validation states",
    category: "Form",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description: "Checkbox component with checked and disabled states",
    category: "Form",
  },
  {
    slug: "radio",
    name: "Radio",
    description: "Radio button component with group functionality",
    category: "Form",
  },
  {
    slug: "switch",
    name: "Switch",
    description: "Toggle switch component with smooth animations",
    category: "Form",
  },
  {
    slug: "card",
    name: "Card",
    description: "A flexible card with header, content, and footer sections",
    category: "Layout",
  },
  {
    slug: "alert",
    name: "Alert",
    description: "Alert component with multiple variants and auto-dismiss",
    category: "Feedback",
  },
  {
    slug: "badge",
    name: "Badge",
    description: "Small status indicators and labels with variants",
    category: "Feedback",
  },
  {
    slug: "spinner",
    name: "Spinner",
    description: "Loading spinner component with multiple visual styles",
    category: "Progress",
  },
];
