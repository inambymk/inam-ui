import { ComponentConfig } from "../types";

export const alertConfig: ComponentConfig = {
  slug: "alert",
  name: "Alert",
  description: "Alert component for notifications with multiple variants and auto-dismiss.",
  category: "Feedback",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "variant",
      type: "'primary' | 'info' | 'success' | 'warning' | 'destructive'",
      defaultValue: "'primary'",
      description: "Visual style of the alert.",
    },
    {
      name: "title",
      type: "string",
      description: "Title text for the alert.",
    },
    {
      name: "description",
      type: "string",
      description: "Description/message text.",
    },
    {
      name: "closable",
      type: "boolean",
      defaultValue: "true",
      description: "Whether the alert can be dismissed.",
    },
    {
      name: "autoClose",
      type: "number",
      defaultValue: "0",
      description: "Auto-dismiss timeout in milliseconds (0 = no auto-dismiss).",
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Callback when alert is closed.",
    },
  ],
  variants: [
    { value: "primary" },
    { value: "info" },
    { value: "success" },
    { value: "warning" },
    { value: "destructive" },
  ],
  defaultProps: {
    title: "Alert Title",
    description: "This is an alert message.",
  },
  usageExamples: [
    {
      title: "Success Alert",
      description: "Show a success message",
      code: `<Alert
  variant="success"
  title="Success"
  description="Your changes have been saved."
/>`,
    },
    {
      title: "Auto-dismiss",
      description: "Alert that auto-closes after 3 seconds",
      code: `<Alert
  variant="info"
  title="Tip"
  description="This will auto-close in 3 seconds"
  autoClose={3000}
/>`,
    },
  ],
  accessibility: {
    ariaLabels: ["role='alert'"],
    screenReader: "Alerts are announced immediately when they appear.",
  },
  relatedComponents: ["card"],
};
