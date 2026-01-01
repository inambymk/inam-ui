// Component-specific default props for preview
export const getDefaultProps = (
  slug: string,
  variant?: string,
  size?: string
): Record<string, unknown> => {
  const baseProps: Record<string, unknown> = {};

  switch (slug) {
    case "button":
      baseProps.children = "Click me";
      if (variant) baseProps.variant = variant;
      break;
    case "badge":
      baseProps.children = "Badge";
      if (variant) baseProps.variant = variant;
      if (size) baseProps.width = size;
      break;
    case "spinner":
      if (variant) baseProps.variant = variant;
      if (size) baseProps.width = size;
      break;
    case "alert":
      baseProps.children = "This is an alert message";
      baseProps.title = "Alert Title";
      if (variant) baseProps.variant = variant;
      break;
    case "progress":
      baseProps.value = 60;
      if (variant) baseProps.variant = variant;
      if (size) baseProps.width = size;
      break;
    case "input":
      baseProps.placeholder = "Enter text...";
      break;
    case "textarea":
      baseProps.placeholder = "Enter text...";
      break;
    case "checkbox":
      baseProps.label = "Checkbox label";
      if (size) baseProps.width = size;
      break;
    case "radio":
      baseProps.label = "Radio option";
      baseProps.name = "demo-radio";
      baseProps.value = "option1";
      if (size) baseProps.width = size;
      break;
    case "switch":
      baseProps.label = "Toggle switch";
      if (size) baseProps.width = size;
      break;
    case "card":
      baseProps.title = "Card Title";
      baseProps.description = "Card description";
      baseProps.children = "Card content goes here";
      break;
    default:
      break;
  }

  return baseProps;
};
