# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-01

### 🎉 Initial Release

The first production release of Inam UI - a powerful CLI for generating premium React components with zero dependencies.

### ✨ Features

#### CLI Tool

- **Component Generation**: Generate components with a single command
- **Interactive Mode**: User-friendly prompts for component selection
- **List Command**: Browse all available components grouped by category
- **Custom Paths**: Generate components to any directory with `--path` option
- **Force Overwrite**: Skip prompts with `--force` flag
- **Dependency Checks**: Automatic validation of React and Tailwind CSS installation
- **Skip Checks Option**: Bypass dependency validation with `--skip-checks`
- **Configuration Support**: Optional `.inamrc` file for project-level defaults
- **Smart Error Messages**: Helpful suggestions when components aren't found

#### Components (10 Total)

**Form Components (6)**

- **Button**: Customizable button with multiple variants (primary, secondary, outline, ghost, danger) and sizes (sm, md, lg)
- **Input**: Flexible input field with label, validation states (error, success), and icon support
- **Textarea**: Simple textarea with label and validation states
- **Checkbox**: Checkbox component with checked and disabled states
- **Radio**: Radio button component with group functionality
- **Switch**: Toggle switch with smooth animations and disabled state

**Layout Components (1)**

- **Card**: Flexible card container with header, content, and footer sections

**Feedback Components (2)**

- **Alert**: Alert component with variants (info, success, warning, error) and auto-dismiss functionality
- **Badge**: Small status indicators with variants (default, primary, success, warning, error)

**Progress Components (1)**

- **Spinner**: Loading spinner with multiple visual styles (border, dots, pulse)

#### Documentation Website

- **Component Showcase**: Interactive previews for all components
- **API Documentation**: Comprehensive prop tables for each component
- **Code Examples**: Copy-paste ready code snippets
- **Theme Support**: Light and dark mode with multiple theme presets (zinc, slate, stone, gray, neutral)
- **Responsive Design**: Mobile-friendly documentation
- **Search Functionality**: Quick component search with keyboard shortcuts (⌘K)
- **SEO Optimized**: Proper meta tags and Open Graph images

#### Developer Experience

- **Zero Dependencies**: All components have no runtime dependencies
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Tailwind CSS v4**: Built for the latest Tailwind CSS
- **Copy & Own**: Components are copied to your codebase for full customization
- **Accessibility**: Built with accessibility best practices
- **Mobile Responsive**: All components work seamlessly on mobile devices

### 📚 Documentation

- Comprehensive README with quick start guide
- Contributing guide with step-by-step instructions
- Deployment guide for npm and Vercel
- GitHub issue templates for bugs, features, and component requests

### 🛠 Infrastructure

- **CI/CD Pipeline**: Automated testing with GitHub Actions
  - CLI build validation
  - Documentation build validation
  - Code quality checks (ESLint, Prettier, TypeScript)
  - Smoke tests for CLI functionality
- **Monorepo Structure**: Organized workspace with npm workspaces
- **Build Scripts**: Automated build processes for CLI and docs
- **Code Quality**: ESLint, Prettier, and TypeScript configuration

### 📦 Package Information

- **Package Name**: `inam-ui`
- **License**: MIT
- **Node Version**: >=18.0.0
- **Repository**: https://github.com/inambymk/inam-ui

### 🎯 Component Categories

- **Form**: 6 components (60%)
- **Feedback**: 2 components (20%)
- **Layout**: 1 component (10%)
- **Progress**: 1 component (10%)

---

[0.1.0]: https://github.com/inambymk/inam-ui/releases/tag/v0.1.0
