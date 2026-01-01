import { ComponentApiData } from "./types";

export const checkboxApi: ComponentApiData = {
  slug: "checkbox",
  name: "Checkbox",
  props: [
    {
      name: "label",
      type: "string",
      description: "Label for the checkbox.",
    },
    {
      name: "checked",
      type: "boolean",
      description: "Whether the checkbox is checked.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the checkbox is disabled.",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Callback fired when the checkbox state changes.",
    },
  ],
  examples: [
    {
      title: "Basic Checkbox",
      description: "Standard checkbox with label.",
      code: `<Checkbox label="Accept terms and conditions" />`,
    },
    {
      title: "Checked State",
      description: "Pre-checked checkbox.",
      code: `<Checkbox label="Subscribe to newsletter" checked />`,
    },
    {
      title: "Disabled State",
      description: "Disabled checkbox.",
      code: `<Checkbox label="Option (disabled)" disabled />`,
    },
  ],
};
