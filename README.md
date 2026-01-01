# Inam UI

<div align="center">

![Inam UI Logo](apps/docs/public/inam.svg)

**A powerful, zero-dependency CLI for generating premium React components**

[![npm version](https://img.shields.io/npm/v/inam-ui.svg)](https://www.npmjs.com/package/inam-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

<p align="center">
  <a href="https://inam-ui.vercel.app">Documentation</a>
  ·
  <a href="https://inam-ui.vercel.app/components">Components</a>
  ·
  <a href="https://github.com/inambymk/inam-ui/issues/new?template=bug_report.yml">Report Bug</a>
  ·
  <a href="https://github.com/inambymk/inam-ui/issues/new?template=component_request.yml">Request Component</a>
</p>

</div>

---

## ✨ Features

- **Zero Dependencies** - Components have no external runtime dependencies
- **TypeScript First** - Full TypeScript support with comprehensive types
- **Tailwind CSS** - Built for the latest Tailwind CSS
- **Copy & Own** - Components live in your codebase, fully customizable
- **Accessible** - Built with accessibility in mind
- **10 Core Components** - Production-ready foundation components for v0.1

## 🚀 Quick Start

```bash
# Generate a component
npx inam-ui button

# Generate to custom path
npx inam-ui button --path src/components/forms

# List all available components
npx inam-ui list

# Filter by category
npx inam-ui list --category Form
```

## 📦 Available Components

| Category     | Components                                       |
| ------------ | ------------------------------------------------ |
| **Form**     | Button, Input, Textarea, Checkbox, Radio, Switch |
| **Layout**   | Card                                             |
| **Feedback** | Alert, Badge                                     |
| **Progress** | Spinner                                          |

## 🛠 Installation

### Prerequisites

- Node.js >= 18.0.0
- React >= 18
- Tailwind CSS

### Usage

```bash
# Interactive mode
npx inam-ui

# Direct generation
npx inam-ui <component-name>

# With options
npx inam-ui button --path src/ui --force
```

### CLI Options

| Option          | Alias | Description                                     |
| --------------- | ----- | ----------------------------------------------- |
| `--help`        | `-h`  | Show help                                       |
| `--version`     | `-v`  | Show version                                    |
| `--path <path>` | `-p`  | Target directory (default: `src/components/ui`) |
| `--force`       | `-f`  | Overwrite existing files                        |
| `--skip-checks` |       | Skip dependency checks                          |

## ⚙️ Configuration

Create a `.inamrc` file in your project root (optional):

```json
{
  "defaultPath": "src/components/ui",
  "addFileHeader": true,
  "checkDependencies": true,
  "confirmBeforeOverwrite": true,
  "tailwindVersion": 4
}
```

## 🏗 Project Structure

```
inam-ui/
├── apps/
│   └── docs/          # Documentation website (Next.js)
├── packages/
│   └── inam-ui-cli/   # CLI package
├── .github/
│   ├── workflows/     # CI/CD workflows
│   └── ISSUE_TEMPLATE/ # Issue templates
└── package.json       # Monorepo root
```

---

## 🗺️ Roadmap

### v0.1 (Current) - Core Foundation

**10 Components**: Button, Input, Textarea, Checkbox, Radio, Switch, Card, Alert, Badge, Spinner

### v0.2 (Next - 3-4 months)

- Add Tooltip component
- Add Progress bar component
- Add Modal component
- Enhance Card with advanced variants (elevated, gradient, interactive, image support)
- Enhance Textarea with variants, auto-resize, and character counter
- Add size variants to Switch
- Add indeterminate state to Checkbox

### v0.3 (Future - 6+ months)

- Add Dropdown with full keyboard navigation
- Add Select with search and multi-select
- Add Accordion component
- Add Skeleton loading component
- Additional components based on user feedback

---

# 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Development Setup

```bash
# Clone the repository
git clone https://github.com/inambymk/inam-ui.git
cd inam-ui

# Install dependencies
npm install

# Start development
npm run dev:docs  # Documentation site
npm run dev:cli   # CLI development
```

## Adding a New Component

Follow this checklist when adding a new component:

### ✅ Component Checklist

#### 1️⃣ Create the Component Template

- [ ] Create `packages/inam-ui-cli/src/templates/<ComponentName>.tsx`
- [ ] Include TypeScript interfaces with JSDoc comments
- [ ] Use Tailwind CSS classes (v4 compatible)
- [ ] No external dependencies
- [ ] Include usage examples in comments

#### 2️⃣ Register the Component

- [ ] Add to `packages/inam-ui-cli/src/componentRegistry.ts`
- [ ] Add to `packages/inam-ui-cli/src/componentsMetadata.ts`

#### 3️⃣ Documentation Website Updates

- [ ] Add to `apps/docs/lib/components-data.ts`
- [ ] Add API data to `apps/docs/lib/component-api-data.ts`
- [ ] Create component display in `apps/docs/components/ui/<ComponentName>Demo.tsx`

#### 4️⃣ Testing

- [ ] Run `npm run build:cli` - CLI builds successfully
- [ ] Run `npm run build:docs` - Docs build successfully
- [ ] Test generation: `node packages/inam-ui-cli/dist/index.js <component>`
- [ ] Verify component appears in docs at `/components/<slug>`

#### 5️⃣ Final Checks

- [ ] Run `npm run lint` - No linting errors
- [ ] Run `npm run format:check` - Code is formatted
- [ ] Update CHANGELOG.md if applicable

### Pull Request Requirements

All PRs must pass:

- ✅ CLI Build
- ✅ Docs Build
- ✅ Lint Check
- ✅ Type Check

PRs are automatically validated by GitHub Actions.

---

## 📝 Scripts

| Script               | Description                   |
| -------------------- | ----------------------------- |
| `npm run dev:docs`   | Start docs development server |
| `npm run dev:cli`    | Start CLI in development mode |
| `npm run build`      | Build all packages            |
| `npm run build:cli`  | Build CLI only                |
| `npm run build:docs` | Build docs only               |
| `npm run lint`       | Run linting                   |
| `npm run format`     | Format code with Prettier     |

## 🐛 Found a Bug?

[Report it here](https://github.com/inambymk/inam-ui/issues/new?template=bug_report.yml)

## 💡 Have a Feature Idea?

[Request it here](https://github.com/inambymk/inam-ui/issues/new?template=feature_request.yml)

## 🎨 Want a New Component?

[Request it here](https://github.com/inambymk/inam-ui/issues/new?template=component_request.yml)

---

## 📄 License

MIT © [Inam](https://github.com/inambymk)

---

<div align="center">
  <sub>Built with ❤️ for developers</sub>
</div>
