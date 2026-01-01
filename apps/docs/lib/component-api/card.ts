import { ComponentApiData } from "./types";

export const cardApi: ComponentApiData = {
  slug: "card",
  name: "Card",
  props: [
    {
      name: "variant",
      type: "'default' | 'outlined'",
      defaultValue: "'default'",
      description: "Visual style variant of the card.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Card content including sub-components (Header, Content, Footer, Title, Description).",
      required: true,
    },
  ],
  examples: [
    {
      title: "Basic Card",
      description: "Simple card with header, content, and footer.",
      code: `<Card variant="outlined">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>A short description of the card content.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here with all the details.</p>
  </CardContent>
  <CardFooter>
    <button>Action</button>
  </CardFooter>
</Card>`,
    },
    {
      title: "Simple Card",
      description: "Card with just content.",
      code: `<Card>
  <CardContent>
    <p>A simple card with just content.</p>
  </CardContent>
</Card>`,
    },
  ],
};
