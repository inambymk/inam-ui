# Inam UI CLI

A powerful, zero-dependency CLI for generating premium React components with TypeScript and Tailwind CSS.

## ✨ Features

- **Zero Dependencies** - Generated components have no external runtime dependencies.
- **TypeScript First** - Full TypeScript support with comprehensive types.
- **Tailwind CSS** - Built for the latest Tailwind CSS (v4 compatible).
- **Copy & Own** - Components are generated directly into your codebase, making them fully customizable.
- **Accessible** - Built with accessibility best practices.

## 🚀 Quick Start

Ensure you have a React project with Tailwind CSS set up.

```bash
# Generate a component interactively
npx inam-ui

# Generate a specific component
npx inam-ui add button

# List all available components
npx inam-ui list
```

## 🛠 Usage

### Commands

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `add <component>` | Generate a component (default command) |
| `list`            | List all available components          |

### Options

| Option          | Alias | Description                                     |
| --------------- | ----- | ----------------------------------------------- |
| `--help`        | `-h`  | Show help                                       |
| `--version`     | `-v`  | Show version                                    |
| `--path <path>` | `-p`  | Target directory (default: `src/components/ui`) |
| `--force`       | `-f`  | Overwrite existing files without prompting      |
| `--skip-checks` |       | Skip dependency checks                          |

## ⚙️ Configuration

You can customize the CLI by creating an `.inamrc` file in your project root:

```json
{
  "defaultPath": "src/components/ui",
  "addFileHeader": true,
  "checkDependencies": true,
  "confirmBeforeOverwrite": true,
  "tailwindVersion": 4
}
```

## 📄 License

MIT © [Inam](https://github.com/manimkk)
