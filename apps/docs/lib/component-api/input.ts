import { ComponentApiData } from "./types";

export const inputApi: ComponentApiData = {
  slug: "input",
  name: "Input",
  props: [
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the input field.",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text displayed below the input for additional guidance.",
    },
    {
      name: "error",
      type: "string",
      description:
        "Error message to display below the input, also styles the input with error colors.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input should take up the full width of its container.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is disabled and non-interactive.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the input is required (shows asterisk next to label).",
    },
  ],
  examples: [
    {
      title: "Basic Input",
      description: "A simple text input with a label.",
      code: `<Input label="Username" placeholder="Enter your username" />`,
    },
    {
      title: "With Helper Text",
      description: "Input with additional helper information.",
      code: `<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>`,
    },
    {
      title: "With Error",
      description: "Input displaying an error state.",
      code: `<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
  required
/>`,
    },
  ],
};
