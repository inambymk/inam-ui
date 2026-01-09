import { ComponentConfig } from "../types";

export const radioConfig: ComponentConfig = {
  slug: "radio",
  name: "Radio",
  description: "Radio button component for selecting a single option from a set.",
  category: "Form",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "label",
      type: "string",
      description: "Label text for the radio button.",
    },
    {
      name: "checked",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the radio is selected.",
    },
    {
      name: "value",
      type: "string",
      description: "Value of the radio button.",
    },
    {
      name: "name",
      type: "string",
      description: "Name of the radio group.",
    },
  ],
  defaultProps: { label: "Radio option", value: "option1" },
  usageExamples: [
    {
      title: "Radio Group",
      description: "Selection within a group of options",
      code: `<Radio name="choice" label="Option A" value="a" />
<Radio name="choice" label="Option B" value="b" />`,
    },
  ],
  accessibility: {
    keyboard: [
      "Arrow Keys - Move focus and select between radio buttons in a group",
      "Space - Select focused radio button",
    ],
    ariaLabels: ["role='radio'", "aria-checked"],
  },
  relatedComponents: ["checkbox", "switch"],
};
