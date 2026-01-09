# Contributing to Inam UI

Thank you for your interest in contributing to Inam UI! This guide will help you get started with the development workflow.

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/inambymk/inam-ui.git
cd inam-ui
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies for the monorepo, including the docs app and CLI package.

### 3. Start Development Server

```bash
npm run dev
```

This starts the Next.js documentation site at `http://localhost:3000`.

## 📁 Project Structure

```
inam-ui/
├── apps/
│   └── docs/              # Documentation website (Next.js)
│       ├── app/           # Next.js app directory
│       ├── components/    # Doc-specific components
│       │   ├── pages/
│       │   │   ├── landing/           # Landing page sections
│       │   │   └── component-docs/    # Component documentation system
│       │   │       ├── configs/       # Component metadata
│       │   │       ├── shared/        # Shared UI components
│       │   │       └── types.ts       # TypeScript types
│       │   └── ui/        # Auto-synced components from CLI templates
│       └── scripts/
│           └── sync-templates.js      # Auto-sync script
└── packages/
    └── inam-ui-cli/       # CLI tool package
        └── src/
            └── templates/ # Source component templates
```

## 🔧 Development Workflows

### Adding a New Component

#### 1. Create the Component Template

Create your component in `packages/inam-ui-cli/src/templates/YourComponent.tsx`:

```tsx
import React from "react";

export interface YourComponentProps {
  variant?: "default" | "primary";
  children: React.ReactNode;
}

export const YourComponent: React.FC<YourComponentProps> = ({
  variant = "default",
  children,
  ...props
}) => {
  // Use theme variables, not hard-coded colors
  const variants = {
    default: "bg-card text-foreground",
    primary: "bg-primary text-primary-foreground",
  };

  return (
    <div className={`p-4 rounded-lg ${variants[variant]}`} {...props}>
      {children}
    </div>
  );
};
```

**Important Guidelines:**

- Use theme variables (`bg-card`, `text-foreground`, `border-border`, etc.)
- NO hard-coded colors
- Export both the component and its TypeScript interface
- Follow the brutalist design system (clean, minimal, precise)

#### 2. Sync to Documentation

From the `apps/docs` directory:

```bash
cd apps/docs
npm run sync:templates
```

This automatically:

- Copies the component to `apps/docs/components/ui/`
- Updates `componentLoader.ts` with the import
- Makes it available for documentation

For **live development** with auto-reload:

```bash
npm run sync:templates:watch
```

#### 3. Create Component Configuration

Create `apps/docs/components/pages/component-docs/configs/yourcomponent.ts`:

```typescript
import { ComponentConfig } from "../types";

export const yourComponentConfig: ComponentConfig = {
  slug: "yourcomponent",
  name: "YourComponent",
  description: "Brief description of what it does.",
  category: "Layout", // or "Form", "Feedback", "Progress", "Data"
  metadata: {
    version: "1.0.0",
    status: "stable", // or "beta", "experimental"
  },
  props: [
    {
      name: "variant",
      type: "'default' | 'primary'",
      defaultValue: "'default'",
      description: "Visual style variant.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Component content.",
      required: true,
    },
  ],
  variants: [{ value: "default" }, { value: "primary" }],
  defaultProps: {
    children: "Example content",
  },
  usageExamples: [
    {
      title: "Basic Usage",
      description: "Simple example",
      code: `<YourComponent>Content</YourComponent>`,
    },
  ],
  accessibility: {
    keyboard: ["Tab - Move focus"],
    ariaLabels: ["aria-label"],
    screenReader: "Describe how screen readers announce this.",
  },
  relatedComponents: ["button", "card"],
};
```

#### 4. Register the Configuration

**Export in** `configs/index.ts`:

```typescript
export { yourComponentConfig } from "./yourcomponent";
```

**Add to** `registry.ts`:

```typescript
import { yourComponentConfig } from "./configs";

export const componentConfigs: Record<string, ComponentConfig> = {
  // ... existing configs
  yourcomponent: yourComponentConfig,
};
```

#### 5. View Your Component

Navigate to `http://localhost:3000/components/yourcomponent`

You should see:

- Component metadata (category, version, status)
- Variant previews
- Usage examples with code snippets
- Accessibility information
- Props table
- Related components
- CLI installation command

## 🎨 Design System Guidelines

### Theme Variables (Use These!)

```css
/* Colors */
background, foreground
card, card-foreground
popover, popover-foreground
primary, primary-foreground
secondary, secondary-foreground
muted, muted-foreground
accent, accent-foreground
destructive, destructive-foreground
border, input, ring

/* Usage */
bg-background
text-foreground
border-border
bg-card
text-primary
```

### DO NOT Use:

- Hard-coded colors: `bg-purple-500`, `text-blue-600`
- Fixed rgba values: `rgba(123, 45, 67, 0.5)`

### DO Use:

- Theme variables: `bg-primary`, `text-foreground`
- Opacity modifiers: `bg-primary/10`, `border-border/40`
- Tailwind utilities: `rounded-lg`, `p-4`, `transition-all`

## 🧪 Testing Components

### Visual Testing

1. Check all variants render correctly
2. Test light/dark mode switching
3. Verify hover/focus states
4. Test on mobile viewport
5. Ensure accessibility (keyboard navigation)

### Interactive Components

For components that need state (Checkbox, Radio, Switch):

1. Create wrapper in `shared/ComponentWrappers.tsx`:

```tsx
export function YourComponentWrapper({ component: Component, ...props }: any) {
  const [value, setValue] = useState(false);
  return <Component {...props} value={value} onChange={setValue} />;
}
```

2. Add to `INTERACTIVE_WRAPPERS` in `ComponentPageClient.tsx`

## 📝 Landing Page Updates

### Adding a New Section

Create your section in `apps/docs/components/pages/landing/YourSection.tsx`:

```tsx
"use client";

export default function YourSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden px-4 md:px-0">
      {/* Decorative lines (matching other sections) */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-border/20 -translate-x-1/2 hidden lg:block" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Your content - follow the brutalist design patterns */}
      </div>
    </section>
  );
}
```

**Add to** `apps/docs/components/pages/landing/index.tsx`:

```tsx
const YourSection = dynamic(() => import("@/components/pages/landing/YourSection"));

export default function LandingPage({ featuredComponents }: LandingPageProps) {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <YourSection /> {/* Add here */}
      {/* ... other sections */}
    </div>
  );
}
```

## 🔍 Code Quality

### Before Committing

1. **Run type checking:**

   ```bash
   npm run typecheck
   ```

2. **Format code:**

   ```bash
   npm run format
   ```

3. **Check linting:**
   ```bash
   npm run lint
   ```

## 🚢 Publishing Updates

### CLI Package

When updating components in `packages/inam-ui-cli/src/templates/`:

1. Update version in `packages/inam-ui-cli/package.json`
2. Build the CLI:
   ```bash
   cd packages/inam-ui-cli
   npm run build
   ```
3. Publish (maintainers only):
   ```bash
   npm publish
   ```

### Documentation Site

The docs are automatically deployed on push to `main` (if using Vercel/Netlify).

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💡 Tips

- **Live preview:** Use `npm run sync:templates:watch` when building new components
- **Theme testing:** Toggle between light/dark mode to ensure colors work
- **Component isolation:** Each component should be self-contained with no external dependencies
- **Documentation first:** Write configs before implementing complex features

## 🤝 Getting Help

- Check existing components in `packages/inam-ui-cli/src/templates/` for patterns and examples
- Look at component configs in `apps/docs/components/pages/component-docs/configs/` to understand the structure
- Open an issue on GitHub for questions

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to Inam UI!** 🎉
