# Component Documentation Flow Guide

This guide explains how the component documentation system works and how to add new components.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Component Documentation Flow                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. User visits /components/button                                   │
│                    ↓                                                 │
│  2. [slug]/page.tsx loads                                           │
│                    ↓                                                 │
│  3. Gets config from registry.ts (buttonConfig)                     │
│                    ↓                                                 │
│  4. Gets component from componentLoader.ts (Button)                 │
│                    ↓                                                 │
│  5. Renders using VariantGrid + PropsTable                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
components/pages/component-docs/
├── index.ts            # Main exports
├── types.ts            # TypeScript interfaces
├── registry.ts         # Maps slug → config
├── componentLoader.ts  # Maps slug → React component
│
├── shared/             # Reusable UI components
│   ├── VariantGrid.tsx # Renders variant previews
│   ├── PropsTable.tsx  # Renders props documentation
│   └── CodeBlock.tsx   # Renders code snippets
│
└── configs/            # One config file per component
    ├── button.ts
    ├── badge.ts
    └── ...
```

---

## Adding a New Component

### Step 1: Create the Config File

Create `configs/newcomponent.ts`:

```typescript
import { ComponentConfig } from "../types";

export const newComponentConfig: ComponentConfig = {
  slug: "newcomponent",
  name: "New Component",
  description: "Description of what this component does.",
  props: [
    {
      name: "variant",
      type: "'default' | 'primary'",
      defaultValue: "'default'",
      description: "Visual style.",
    },
    // ... more props
  ],
  variants: [{ value: "default" }, { value: "primary" }],
  defaultProps: {
    /* props for preview */
  },
};
```

### Step 2: Export from configs/index.ts

```typescript
export { newComponentConfig } from "./newcomponent";
```

### Step 3: Add to Registry

In `registry.ts`:

```typescript
import { newComponentConfig } from "./configs";

export const componentConfigs: Record<string, ComponentConfig> = {
  // ... existing
  newcomponent: newComponentConfig, // ← Add this
};
```

### Step 4: Add to Component Loader

In `componentLoader.ts`:

```typescript
import { NewComponent } from "@/../../../packages/inam-ui-cli/src/templates/NewComponent";

export const componentMap: Record<string, React.ComponentType<any>> = {
  // ... existing
  newcomponent: NewComponent, // ← Add this
};
```

### Step 5: Add to components-data.ts

In `lib/components-data.ts`:

```typescript
{
  slug: "newcomponent",
  name: "New Component",
  description: "Description for the components list page.",
  category: "Form",  // or Layout, Feedback, Progress
},
```

---

## Quick Reference

| Task                                 | File to Edit             |
| ------------------------------------ | ------------------------ |
| Change component props documentation | `configs/<component>.ts` |
| Change variant preview styling       | `shared/VariantGrid.tsx` |
| Change props table styling           | `shared/PropsTable.tsx`  |
| Add new component                    | See steps above          |
| Change component categories          | `lib/components-data.ts` |

---

## Styling Guidelines

All styling uses **theme CSS variables** - no hardcoded colors:

✅ **Correct:**

```css
bg-primary text-primary-foreground
border-border bg-muted/30
text-muted-foreground
```

❌ **Incorrect:**

```css
bg-blue-500 text-white
border-gray-200 bg-gray-100
text-gray-600
```

This ensures components inherit the current theme correctly.
