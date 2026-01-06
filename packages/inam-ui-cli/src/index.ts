#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { generateComponent, isValidComponent } from "./generator";
import { WELCOME_MESSAGE } from "./lib/inamWelcom";
import { componentNames } from "./componentRegistry";
import { loadConfig } from "./config";
import { checkDependencies } from "./dependencyChecker";
import { listComponents } from "./listCommand";
import { trackEvent, shutdownTelemetry } from "./telemetry";
import { TELEMETRY_EVENTS } from "./telemetry-constants";

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error(chalk.red("An unhandled rejection occurred:"));
  console.error(error);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error(chalk.red("An uncaught exception occurred:"));
  console.error(error);
  process.exit(1);
});

/**
 * Main CLI function
 */
async function run() {
  console.log(chalk.blue(WELCOME_MESSAGE));
  console.log();

  try {
    // Load configuration
    const config = loadConfig();

    // Get command line arguments
    const args = process.argv.slice(2);

    // Check for commands first
    const command = args[0]?.toLowerCase();

    // Handle 'list' command
    if (command === "list") {
      let category: string | undefined;
      let search: string | undefined;

      for (let i = 1; i < args.length; i++) {
        const arg = args[i];
        if (arg === "--category" || arg === "-c") {
          category = args[++i];
        } else if (arg === "--search" || arg === "-s") {
          search = args[++i];
        }
      }

      await trackEvent(TELEMETRY_EVENTS.CLI_COMMAND_LIST, { category, search });
      listComponents({ category, search });
      await shutdownTelemetry();
      return;
    }

    // Handle 'add' command (alias for direct component name)
    let componentName: string | null = null;
    let targetPath: string = config.defaultPath;
    let force = false;
    let skipDependencyCheck = false;

    // Parse command line arguments
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (arg === "--help" || arg === "-h") {
        await trackEvent(TELEMETRY_EVENTS.CLI_COMMAND_HELP);
        showHelp();
        await shutdownTelemetry();
        return;
      } else if (arg === "--version" || arg === "-v") {
        await trackEvent(TELEMETRY_EVENTS.CLI_COMMAND_VERSION);
        showVersion();
        await shutdownTelemetry();
        return;
      } else if (arg === "--force" || arg === "-f") {
        force = true;
      } else if (arg === "--path" || arg === "-p") {
        targetPath = args[++i] || targetPath;
      } else if (arg === "--skip-checks") {
        skipDependencyCheck = true;
      } else if (arg === "--no-telemetry") {
        process.env.INAM_UI_TELEMETRY_DISABLED = "1";
      } else if (arg === "add") {
        // Skip 'add' command, next arg is component name
        continue;
      } else if (!componentName && !arg.startsWith("-")) {
        componentName = arg;
      }
    }

    // Check dependencies (unless skipped)
    if (config.checkDependencies && !skipDependencyCheck) {
      checkDependencies();
    }

    // If no component name provided in args, prompt the user
    if (!componentName) {
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "component",
          message: "Which component would you like to generate?",
          choices: componentNames,
          pageSize: 10,
        },
        {
          type: "input",
          name: "path",
          message: "Where would you like to place the component?",
          default: targetPath,
          validate: (input: string) => {
            if (!input.trim()) {
              return "Please enter a valid path";
            }
            return true;
          },
        },
      ]);

      componentName = answers.component;
      targetPath = answers.path;
    }

    // Ensure componentName is a string (should never be null at this point)
    const safeComponentName = componentName as string;

    // Validate component name
    if (!isValidComponent(safeComponentName)) {
      console.error(chalk.red(`Error: "${safeComponentName}" is not a valid component.`));
      console.log(chalk.blue("\nRun 'inam-ui list' to see all available components."));
      process.exit(1);
    }

    // Generate the component
    const result = generateComponent({
      componentName: safeComponentName,
      targetPath,
      force,
    });

    if (!result) {
      await shutdownTelemetry();
      process.exit(1);
    }

    await trackEvent(TELEMETRY_EVENTS.CLI_COMMAND_ADD, {
      component: safeComponentName,
      force,
    });

    await shutdownTelemetry();
  } catch (error) {
    console.error(chalk.red("An error occurred:"));
    console.error(error);
    await shutdownTelemetry();
    process.exit(1);
  }
}

/**
 * Display help information
 */
function showHelp() {
  console.log(chalk.blue("Inam UI - Generate React components with ease\n"));
  console.log(chalk.bold("Usage:"));
  console.log("  inam-ui <component> [options]");
  console.log("  inam-ui add <component> [options]");
  console.log("  inam-ui list [options]\n");

  console.log(chalk.bold("Commands:"));
  console.log("  add <component>     Generate a component (default if component name given)");
  console.log("  list                List all available components\n");

  console.log(chalk.bold("Options:"));
  console.log("  -h, --help          Show help");
  console.log("  -v, --version       Show version");
  console.log("  -p, --path <path>   Specify target directory (default: src/components/ui)");
  console.log("  -f, --force         Overwrite existing files without prompting");
  console.log("  --skip-checks       Skip dependency checks");
  console.log("  --no-telemetry      Disable anonymous usage analytics\n");

  console.log(chalk.bold("List Options:"));
  console.log("  -c, --category <name>   Filter by category (Form, Layout, Overlay, etc.)");
  console.log("  -s, --search <term>     Search components by name or description\n");

  console.log(chalk.bold("Examples:"));
  console.log("  $ inam-ui button");
  console.log("  $ inam-ui add button --path src/components/forms");
  console.log("  $ inam-ui list --category Form");
  console.log("  $ inam-ui list --search input\n");

  console.log(chalk.bold("Configuration:"));
  console.log("  Create a .inamrc file in your project root to customize defaults.");
  console.log("  See: https://github.com/inambymk/inam-ui#configuration\n");

  console.log(chalk.bold("Telemetry:"));
  console.log("  Inam UI collects anonymous usage data to improve the CLI.");
  console.log("  Data collected: CLI version, Node version, OS, commands used");
  console.log("  No personal information or code is collected.");
  console.log("  Opt out: Set INAM_UI_TELEMETRY_DISABLED=1 or use --no-telemetry\n");
}

/**
 * Display version information
 */
function showVersion() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require("../package.json");
  console.log(chalk.blue(`Inam UI v${pkg.version}`));
}

// Run the CLI
if (require.main === module) {
  run();
}
