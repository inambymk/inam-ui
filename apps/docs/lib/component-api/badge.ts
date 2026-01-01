import { ComponentApiData } from "./types";

export const badgeApi: ComponentApiData = {
  slug: "badge",
  name: "Badge",
  props: [
    {
      name: "variant",
      type: "'primary' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'",
      defaultValue: "'primary'",
      description: "The visual style of the badge.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "The size of the badge.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "The content of the badge.",
      required: true,
    },
  ],
  examples: [
    {
      title: "Badge Variants",
      description: "Different badge styles.",
      code: `<div className="flex gap-2">
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
</div>`,
    },
    {
      title: "Badge Sizes",
      description: "Different badge sizes.",
      code: `<div className="flex gap-2 items-center">
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
  <Badge size="lg">Large</Badge>
</div>`,
    },
  ],
};
