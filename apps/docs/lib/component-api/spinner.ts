import { ComponentApiData } from "./types";

export const spinnerApi: ComponentApiData = {
  slug: "spinner",
  name: "Spinner",
  props: [
    {
      name: "width",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "The size of the spinner.",
    },
    {
      name: "variant",
      type: "'default' | 'primary'",
      defaultValue: "'default'",
      description: "The color variant of the spinner.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
    {
      name: "label",
      type: "string",
      defaultValue: "'Loading...'",
      description: "Accessible label for screen readers.",
    },
  ],
  examples: [
    {
      title: "Default Spinner",
      description: "The standard loading spinner.",
      code: `<Spinner />`,
    },
    {
      title: "Sizes",
      description: "Different spinner sizes.",
      code: `<div className="flex gap-4 items-center">
  <Spinner width="sm" />
  <Spinner width="md" />
  <Spinner width="lg" />
</div>`,
    },
    {
      title: "Variants",
      description: "Different spinner colors.",
      code: `<div className="flex gap-4">
  <Spinner variant="default" />
  <Spinner variant="primary" />
</div>`,
    },
  ],
};
