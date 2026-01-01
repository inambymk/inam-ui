import { ComponentApiData } from "./types";

export const alertApi: ComponentApiData = {
  slug: "alert",
  name: "Alert",
  props: [
    {
      name: "variant",
      type: "'info' | 'success' | 'warning' | 'error'",
      defaultValue: "'info'",
      description: "The visual style of the alert.",
    },
    {
      name: "title",
      type: "string",
      description: "The title of the alert.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "The content of the alert.",
      required: true,
    },
    {
      name: "onClose",
      type: "() => void",
      description: "Callback when the alert is closed (shows close button when provided).",
    },
  ],
  examples: [
    {
      title: "Basic Alerts",
      description: "Different alert variants.",
      code: `<div className="space-y-4">
  <Alert variant="info" title="Info">This is an informational message.</Alert>
  <Alert variant="success" title="Success">Your changes have been saved.</Alert>
  <Alert variant="warning" title="Warning">Please review the changes.</Alert>
  <Alert variant="error" title="Error">An error occurred.</Alert>
</div>`,
    },
    {
      title: "Dismissible Alert",
      description: "Alert with close button.",
      code: `<Alert 
  variant="success" 
  title="Success" 
  onClose={() => alert('Alert closed!')}
>
  Your message has been sent successfully.
</Alert>`,
    },
  ],
};
