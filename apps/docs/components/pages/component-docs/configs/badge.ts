import { ComponentConfig } from "../types";

export const badgeConfig: ComponentConfig = {
  slug: "badge",
  name: "Badge",
  description: "A small visual indicator for status, count, or category.",
  category: "Feedback",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "variant",
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' | 'ghost'",
      defaultValue: "'primary'",
      description: "Visual style of the badge.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Size of the badge.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Badge content.",
      required: true,
    },
  ],
  variants: [
    { value: "primary" },
    { value: "secondary" },
    { value: "success" },
    { value: "warning" },
    { value: "destructive" },
    { value: "outline" },
    { value: "ghost" },
  ],
  sizes: [{ value: "sm" }, { value: "md" }, { value: "lg" }],
  defaultProps: { children: "Badge" },
  usageExamples: [
    {
      title: "Status Indicator",
      description: "Use badges to show status messages",
      code: `<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Error</Badge>`,
    },
  ],
  accessibility: {
    screenReader:
      "Badges are used for visual information. Ensure they are meaningful to screen readers or supplemented with text.",
  },
  relatedComponents: ["button"],
};
