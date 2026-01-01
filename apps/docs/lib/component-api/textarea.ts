import { ComponentApiData } from "./types";

export const textareaApi: ComponentApiData = {
  slug: "textarea",
  name: "Textarea",
  props: [
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the textarea.",
    },
    {
      name: "helperText",
      type: "string",
      description: "Helper text displayed below the textarea for additional guidance.",
    },
    {
      name: "error",
      type: "string",
      description: "Error message to display below the textarea, also styles it with error colors.",
    },
    {
      name: "resize",
      type: "'none' | 'vertical' | 'horizontal' | 'both'",
      defaultValue: "'vertical'",
      description: "CSS resize behavior for the textarea.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the textarea should take up the full width of its container.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the textarea is disabled and non-interactive.",
    },
    {
      name: "required",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the textarea is required (shows asterisk next to label).",
    },
    {
      name: "rows",
      type: "number",
      defaultValue: "3",
      description: "Number of visible text rows.",
    },
  ],
  examples: [
    {
      title: "Basic Textarea",
      description: "Simple textarea with label and helper text.",
      code: `<Textarea
  label="Message"
  placeholder="Enter your message"
  helperText="We'll get back to you soon"
/>`,
    },
    {
      title: "With Error",
      description: "Textarea with error state.",
      code: `<Textarea
  label="Description"
  error="This field is required"
  required
/>`,
    },
    {
      title: "Custom Rows",
      description: "Textarea with custom height.",
      code: `<Textarea
  label="Bio"
  placeholder="Tell us about yourself"
  rows={6}
/>`,
    },
  ],
};
