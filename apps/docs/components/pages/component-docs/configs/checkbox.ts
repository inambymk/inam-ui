import { ComponentConfig } from "../types";

export const checkboxConfig: ComponentConfig = {
  slug: "checkbox",
  name: "Checkbox",
  description: "Checkbox component with checked and disabled states.",
  category: "Form",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "label",
      type: "string",
      description: "Label text for the checkbox.",
    },
    {
      name: "checked",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the checkbox is checked.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the checkbox is disabled.",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Callback when checkbox state changes.",
    },
  ],
  defaultProps: { label: "Checkbox option" },
  usageExamples: [
    {
      title: "Controlled Checkbox",
      description: "Manage checkbox state with React state",
      code: `const [checked, setChecked] = useState(false);

<Checkbox
  label="Accept terms"
  checked={checked}
  onChange={setChecked}
/>`,
    },
  ],
  accessibility: {
    keyboard: ["Space - Toggle checked/unchecked", "Tab - Move focus"],
    ariaLabels: ["aria-checked", "aria-disabled"],
    screenReader: "Announced as 'checkbox' with label and checked state.",
  },
  relatedComponents: ["radio", "switch"],
};
