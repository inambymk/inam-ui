// Get component code for each variant/size
export const getComponentCode = (slug: string, variant?: string, size?: string): string => {
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  const props: string[] = [];

  if (variant && variant !== "default") props.push(`variant="${variant}"`);
  if (size && size !== "default" && size !== "md" && slug !== "button") {
    props.push(`size="${size}"`);
  }

  const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";

  switch (slug) {
    case "button":
      return `<Button${propsStr}>Click me</Button>`;
    case "badge":
      return `<Badge${propsStr}>Badge</Badge>`;
    case "alert":
      return `<Alert${propsStr} title="Alert Title">Alert message</Alert>`;
    case "spinner":
      return `<Spinner${propsStr} />`;
    case "progress":
      return `<Progress${propsStr} value={60} />`;
    case "input":
      return `<Input${propsStr} placeholder="Enter text..." />`;
    case "textarea":
      return `<Textarea${propsStr} placeholder="Enter text..." />`;
    case "checkbox":
      return `<Checkbox${propsStr} label="Checkbox label" />`;
    case "radio":
      return `<Radio${propsStr} label="Radio option" name="group" value="1" />`;
    case "switch":
      return `<Switch${propsStr} label="Toggle switch" />`;
    case "card":
      return `<Card${propsStr} title="Card Title">Card content</Card>`;
    case "accordion":
      return `<Accordion${propsStr}>
  <AccordionItem id="item-1" title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem id="item-2" title="Section 2">
    Content for section 2
  </AccordionItem>
</Accordion>`;
    case "skeleton":
      return `<Skeleton${propsStr} />`;
    default:
      return `<${name}${propsStr} />`;
  }
};
