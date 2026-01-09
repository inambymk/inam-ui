import { ComponentConfig } from "../types";

export const cardConfig: ComponentConfig = {
  slug: "card",
  name: "Card",
  description: "A flexible container component for grouping related content.",
  category: "Layout",
  metadata: {
    version: "1.0.0",
    status: "stable",
  },
  props: [
    {
      name: "variant",
      type: "'default' | 'outline'",
      defaultValue: "'default'",
      description: "Visual style variant.",
    },
    {
      name: "padding",
      type: "'none' | 'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Internal padding size.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Card content.",
      required: true,
    },
  ],
  variants: [{ value: "default" }, { value: "outline" }],
  defaultProps: {},
  usageExamples: [
    {
      title: "Pricing Card",
      description: "Card with header, features list, and action button",
      code: `<Card>
  <CardHeader>
    <CardTitle>Premium Features</CardTitle>
    <CardDescription>Unlock the full potential</CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li>✓ Unlimited projects</li>
      <li>✓ Advanced analytics</li>
      <li>✓ Priority support</li>
    </ul>
  </CardContent>
  <CardFooter>
    <span className="text-sm">$29/month</span>
    <Button>Get Started</Button>
  </CardFooter>
</Card>`,
    },
    {
      title: "Outline Card with Custom Padding",
      description: "Card with outline variant and larger padding",
      code: `<Card variant="outline" padding="lg">
  <CardHeader>
    <CardTitle>Team Collaboration</CardTitle>
    <CardDescription>Work together seamlessly</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Real-time collaboration tools for your team.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Learn More</Button>
  </CardFooter>
</Card>`,
    },
  ],
  accessibility: {
    screenReader: "Use appropriate heading structure within cards for better navigation.",
  },
  relatedComponents: ["alert"],
};
