# Component API Structure

This directory contains the modular component API documentation.

## Structure

```
component-api/
├── types.ts           # Shared TypeScript interfaces
├── index.ts           # Central registry and exports
├── button.ts          # Button component API
├── input.ts           # Input component API
├── textarea.ts        # Textarea component API
├── checkbox.ts        # Checkbox component API
├── radio.ts           # Radio component API
├── switch.ts          # Switch component API
├── card.ts            # Card component API
├── alert.ts           # Alert component API
├── badge.ts           # Badge component API
└── spinner.ts         # Spinner component API
```

## Adding a New Component

1. **Create a new file**: `component-api/<component-name>.ts`
2. **Import types**: `import { ComponentApiData } from "./types";`
3. **Export API data**: `export const <componentName>Api: ComponentApiData = { ... }`
4. **Register in index.ts**:
   - Add to imports
   - Add to named exports
   - Add to `componentApiData` registry object

## Example

```typescript
// component-api/mycomponent.ts
import { ComponentApiData } from "./types";

export const mycomponentApi: ComponentApiData = {
  slug: "mycomponent",
  name: "MyComponent",
  props: [
    // ... props
  ],
  examples: [
    // ... examples
  ],
};
```

Then in `index.ts`:

```typescript
export { mycomponentApi } from "./mycomponent";
import { mycomponentApi } from "./mycomponent";

export const componentApiData: Record<string, ComponentApiData> = {
  // ... other components
  mycomponent: mycomponentApi,
};
```

## Benefits

- **Maintainability**: Each component has its own file (~50-100 lines)
- **Scalability**: Easy to add new components without modifying large files
- **Readability**: Clear structure, easy to find and update component documentation
- **Version Control**: Smaller diffs, easier code reviews
