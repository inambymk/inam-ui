import { ComponentApiData } from "./types";

export const switchApi: ComponentApiData = {
  slug: "switch",
  name: "Switch",
  props: [
    {
      name: "label",
      type: "string",
      description: "Label for the switch.",
    },
    {
      name: "checked",
      type: "boolean",
      description: "Whether the switch is checked/on.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the switch is disabled.",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Callback fired when the switch state changes.",
    },
  ],
  examples: [
    {
      title: "Basic Switch",
      description: "Standard toggle switch.",
      code: `<Switch label="Enable notifications" />`,
    },
    {
      title: "Checked State",
      description: "Pre-enabled switch.",
      code: `<Switch label="Dark mode" checked />`,
    },
    {
      title: "Disabled State",
      description: "Disabled switch.",
      code: `<Switch label="Premium feature" disabled />`,
    },
  ],
};
