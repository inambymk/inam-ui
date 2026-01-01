import chalk from "chalk";
import { componentNames, ComponentName } from "./componentRegistry";
import { componentsMetadata } from "./componentsMetadata";

/**
 * Component metadata for display
 */
interface ComponentInfo {
  name: ComponentName;
  description: string;
  category: string;
}

/**
 * Get all components with their metadata
 */
function getComponentsWithMetadata(): ComponentInfo[] {
  return componentNames.map((name) => {
    const meta = componentsMetadata.find((m) => m.name.toLowerCase() === name.toLowerCase());
    return {
      name,
      description: meta?.description || "A reusable UI component",
      category: meta?.category || "Other",
    };
  });
}

/**
 * Group components by category
 */
function groupByCategory(components: ComponentInfo[]): Record<string, ComponentInfo[]> {
  const groups: Record<string, ComponentInfo[]> = {};

  for (const comp of components) {
    if (!groups[comp.category]) {
      groups[comp.category] = [];
    }
    groups[comp.category].push(comp);
  }

  return groups;
}

/**
 * Display all available components
 */
export function listComponents(options: { category?: string; search?: string } = {}): void {
  const allComponents = getComponentsWithMetadata();
  let components = allComponents;

  // Filter by category
  if (options.category) {
    components = components.filter(
      (c) => c.category.toLowerCase() === options.category?.toLowerCase()
    );

    if (components.length === 0) {
      console.log(chalk.yellow(`\nNo components found in category "${options.category}"`));
      console.log(chalk.gray("Available categories: Form, Layout, Overlay, Feedback, Progress\n"));
      return;
    }
  }

  // Filter by search term
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    components = components.filter(
      (c) =>
        c.name.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower)
    );

    if (components.length === 0) {
      console.log(chalk.yellow(`\nNo components found matching "${options.search}"`));
      return;
    }
  }

  // Group and display
  const grouped = groupByCategory(components);
  const categories = Object.keys(grouped).sort();

  console.log(chalk.blue(`\n📦 Available Components (${components.length}):\n`));

  for (const category of categories) {
    const categoryComponents = grouped[category];
    console.log(chalk.bold.white(`${category} (${categoryComponents.length}):`));

    for (const comp of categoryComponents) {
      console.log(
        `  ${chalk.cyan("•")} ${chalk.bold(comp.name)} ${chalk.gray("-")} ${chalk.gray(comp.description)}`
      );
    }
    console.log();
  }

  // Usage hint
  console.log(chalk.gray("Usage: npx inam-ui <component-name>"));
  console.log(chalk.gray("Example: npx inam-ui button\n"));
}

/**
 * Show component count summary
 */
export function showComponentCount(): void {
  console.log(chalk.blue(`\n${componentNames.length} components available`));
}
