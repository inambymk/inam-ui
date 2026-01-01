import fs from "fs";
import path from "path";
import chalk from "chalk";
import { ensureDirectoryExists, logErrorAndExit } from "./helper";
import {
  ComponentName,
  getComponentName,
  getComponentTemplatePath,
  findSimilarComponents,
  componentNames,
} from "./componentRegistry";
import { FILE_HEADER } from "./lib/fileHeader";

interface GenerateComponentOptions {
  /**
   * The name of the component to generate
   */
  componentName: ComponentName;
  /**
   * The target directory path where the component should be generated
   */
  targetPath: string;
  /**
   * If true, will overwrite existing files without prompting
   * @default false
   */
  force?: boolean;
}

/**
 * Generates a UI component in the specified directory
 *
 * @param options - Options for component generation
 * @returns The path to the generated component or null if generation failed
 */
export const generateComponent = (options: GenerateComponentOptions): string | null => {
  const { componentName, targetPath, force = false } = options;

  const validComponentName = getComponentName(componentName);
  if (!validComponentName) {
    const similar = findSimilarComponents(componentName);
    let errorMessage = `"${componentName}" is not a valid component.`;

    if (similar.length > 0) {
      errorMessage += `\n\nDid you mean one of these?\n${similar.map((c) => `- ${c}`).join("\n")}`;
    } else {
      errorMessage += `\n\nAvailable components:\n${componentNames
        .map((c) => `- ${c}`)
        .join("\n")}`;
    }

    logErrorAndExit(errorMessage);
    return null;
  }

  let templatePath: string;
  try {
    templatePath = getComponentTemplatePath(validComponentName);
    console.log(chalk.blue(`Using template at: ${templatePath}`));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logErrorAndExit(`Failed to locate template for ${validComponentName}: ${errorMessage}`);
    return null;
  }

  try {
    // Resolve paths
    const absoluteTemplatePath = path.resolve(__dirname, templatePath);
    const absoluteTargetDir = path.resolve(process.cwd(), targetPath);
    const destinationPath = path.join(absoluteTargetDir, `${validComponentName}.tsx`);

    // Check if template exists
    if (!fs.existsSync(absoluteTemplatePath)) {
      logErrorAndExit(
        `Template for "${validComponentName}" not found at ${absoluteTemplatePath}\n` +
          `Current working directory: ${process.cwd()}\n` +
          `__dirname: ${__dirname}`
      );
      return null;
    }

    // Check if target file already exists
    if (fs.existsSync(destinationPath) && !force) {
      console.error(
        chalk.yellow(`Component "${validComponentName}" already exists at ${destinationPath}.`)
      );
      return null;
    }

    // Read template content and add branding
    let templateContent = fs.readFileSync(absoluteTemplatePath, "utf-8");

    // Add file header if not already present
    if (!templateContent.startsWith("/**")) {
      templateContent =
        FILE_HEADER.replace("{{componentName}}", validComponentName) + templateContent;
    }

    // Ensure target directory exists
    ensureDirectoryExists(absoluteTargetDir);

    // Write component file
    fs.writeFileSync(destinationPath, templateContent);

    // Log success
    console.log(
      chalk.green(
        `✓ Successfully generated "${componentName}" at ${chalk.underline(destinationPath)}`
      )
    );

    return destinationPath;
  } catch (error) {
    console.error(chalk.red(`Error generating component "${componentName}":`), error);
    return null;
  }
};

/**
 * Validates if a component name is valid and exists in the registry
 */
export const isValidComponent = (name: string): name is ComponentName => {
  return getComponentName(name) !== null;
};
