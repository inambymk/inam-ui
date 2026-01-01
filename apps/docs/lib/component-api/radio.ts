import { ComponentApiData } from "./types";

export const radioApi: ComponentApiData = {
  slug: "radio",
  name: "Radio",
  props: [
    {
      name: "label",
      type: "string",
      description: "Label for the radio button.",
    },
    {
      name: "name",
      type: "string",
      description: "Radio group name.",
    },
    {
      name: "value",
      type: "string",
      description: "Radio value.",
    },
    {
      name: "checked",
      type: "boolean",
      description: "Whether the radio is checked.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the radio is disabled.",
    },
  ],
  examples: [
    {
      title: "Basic Radio",
      description: "Standard radio button.",
      code: `<Radio label="Option 1" name="group" value="1" />`,
    },
    {
      title: "Radio Group",
      description: "Group of radio buttons.",
      code: `<div className="space-y-2">
  <Radio label="Small" name="size" value="sm" />
  <Radio label="Medium" name="size" value="md" checked />
  <Radio label="Large" name="size" value="lg" />
</div>`,
    },
  ],
};
