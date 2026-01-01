# Contributing to Inam UI

Thank you for your interest in contributing to Inam UI! This document provides guidelines and steps for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Adding a New Component](#adding-a-new-component)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

By participating in this project, you agree to maintain a welcoming and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/inambymk/inam-ui.git
   cd inam-ui
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Locally

```bash
# Start documentation site
npm run dev:docs

# Run CLI in development
npm run dev:cli

# Build everything
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

### Testing Your Changes

Before submitting a PR, ensure:

```bash
# CLI builds successfully
npm run build:cli

# Docs build successfully
npm run build:docs

# No lint errors
npm run lint

# Code is formatted
npm run format:check
```

## Adding a New Component

Follow this step-by-step guide:

### Step 1: Create the Template

Create `packages/inam-ui-cli/src/templates/<ComponentName>.tsx`:

````tsx
import React from "react";

interface ComponentNameProps {
  /** Description of the prop */
  variant?: "default" | "primary";
  /** Children content */
  children: React.ReactNode;
}

/**
 * ComponentName - Brief description
 *
 * @example
 * ```tsx
 * <ComponentName variant="primary">
 *   Content
 * </ComponentName>
 * ```
 */
const ComponentName: React.FC<ComponentNameProps> = ({ variant = "default", children }) => {
  return <div className="your-tailwind-classes">{children}</div>;
};

export default ComponentName;
````

### Step 2: Register in CLI

Add to `packages/inam-ui-cli/src/componentRegistry.ts`:

```typescript
const componentsMap = {
  // ... existing components
  ComponentName: "ComponentName.tsx",
};
```

Add to `packages/inam-ui-cli/src/componentsMetadata.ts`:

```typescript
{
  slug: "componentname",
  name: "ComponentName",
  description: "Brief description of what the component does",
  category: "Form", // or Layout, Overlay, Feedback, Progress
}
```

### Step 3: Update Documentation

Add to `apps/docs/lib/components-data.ts`:

```typescript
{
  slug: "componentname",
  name: "ComponentName",
  description: "Brief description",
  category: "Form",
}
```

Add API documentation to `apps/docs/lib/component-api-data.ts`.

### Step 4: Create Demo

Create `apps/docs/components/ui/ComponentNameDemo.tsx` for the interactive preview.

### Step 5: Test

```bash
# Build CLI
npm run build:cli

# Test generation
node packages/inam-ui-cli/dist/index.js componentname --path test-output

# Verify the generated file
cat test-output/ComponentName.tsx

# Build docs
npm run build:docs
```

## Pull Request Process

> **Note:** Open PRs against `dev` for staging. When the changes are verified in staging, a PR will be opened from `dev` to `main` for production release.

1. **Create a descriptive PR title**
   - ✅ `feat: add DatePicker component`
   - ✅ `fix: resolve Button loading state issue`
   - ❌ `Update code`

2. **Fill out the PR template**

3. **Ensure all checks pass**
   - CLI Build ✅
   - Docs Build ✅
   - Lint ✅
   - Type Check ✅

4. **Request review** when ready

5. **Address feedback** promptly

## Style Guidelines

### TypeScript

- Use interfaces over types where possible
- Include JSDoc comments for public APIs
- Avoid `any` types

### Components

- Zero external dependencies
- Use Tailwind CSS classes
- Mobile-first responsive design
- Include accessibility attributes
- TypeScript strict mode compatible

### Git Commits

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

---

Thank you for contributing! 🎉
