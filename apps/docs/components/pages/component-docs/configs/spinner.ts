import { ComponentConfig } from "../types";

export const spinnerConfig: ComponentConfig = {
  slug: "spinner",
  name: "Spinner",
  description: "A loading indicator for async operations and data fetching.",
  category: "Progress",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "size",
      type: "'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: "Size of the spinner.",
    },
    {
      name: "variant",
      type: "'primary' | 'secondary' | 'white'",
      defaultValue: "'primary'",
      description: "Color variant of the spinner.",
    },
  ],
  variants: [{ value: "primary" }, { value: "secondary" }, { value: "white" }],
  sizes: [{ value: "sm" }, { value: "md" }, { value: "lg" }, { value: "xl" }],
  defaultProps: {},
  usageExamples: [
    {
      title: "Default Spinner",
      description: "Medium primary spinner",
      code: `<Spinner />`,
    },
    {
      title: "Sizes",
      description: "Different spinner sizes",
      code: `<Spinner size="sm" />
<Spinner size="lg" />
<Spinner size="xl" />`,
    },
  ],
  accessibility: {
    ariaLabels: ["role='status'", "aria-label='Loading'"],
    screenReader: "Spinners should have an aria-label to indicate the loading state.",
  },
  relatedComponents: ["button"],
};
