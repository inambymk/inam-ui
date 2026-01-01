import { ComponentApiData } from "./types";

export const buttonApi: ComponentApiData = {
  slug: "button",
  name: "Button",
  props: [
    {
      name: "variant",
      type: "'primary' | 'secondary'| 'outline' | 'ghost' | 'link'",
      defaultValue: "'primary'",
      description: "The visual style of the button.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the button should take up the full width of its container.",
    },
    {
      name: "isLoading",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show a loading spinner inside the button.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "The content to be rendered inside the button.",
      required: true,
    },
  ],
  examples: [
    {
      title: "Basic Usage",
      description: "The default button style.",
      code: `<Button>Click me</Button>`,
    },
    {
      title: "Variants",
      description: "Different button styles.",
      code: `<div className="flex gap-2">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
</div>`,
    },
    {
      title: "Loading State",
      description: "Button with loading spinner.",
      code: `<Button isLoading>Loading...</Button>`,
    },
  ],
};
