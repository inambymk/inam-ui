import fs from "fs";
import chalk from "chalk";

/**
 * Ensures that a directory exists. If it doesn't exist, it will be created.
 * @param dir The directory path to check/create
 */
export const ensureDirectoryExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * Checks if a file or directory exists
 * @param path The path to check
 * @returns boolean indicating if the path exists
 */
export const pathExists = (path: string): boolean => {
  return fs.existsSync(path);
};

/**
 * Checks if a path is a directory
 * @param path The path to check
 * @returns boolean indicating if the path is a directory
 */
export const isDirectory = (path: string): boolean => {
  try {
    return fs.statSync(path).isDirectory();
  } catch (error) {
    return false;
  }
};

/**
 * Validates if a path is writable
 * @param path The path to validate
 * @returns boolean indicating if the path is writable
 */
export const isWritable = (path: string): boolean => {
  try {
    fs.accessSync(path, fs.constants.W_OK);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Formats a path for consistent display
 * @param path The path to format
 * @returns The formatted path
 */
export const formatPath = (path: string): string => {
  return path.replace(process.cwd(), ".").replace(/\\/g, "/");
};

/**
 * Logs an error message and exits the process
 * @param message The error message
 * @param error Optional error object
 */
export const logErrorAndExit = (message: string, error?: unknown): never => {
  console.error(chalk.red(`❌ ${message}`));
  if (error) {
    console.error(chalk.gray(String(error)));
  }
  process.exit(1);
};

/**
 * Logs a success message
 * @param message The success message
 */
export const logSuccess = (message: string): void => {
  console.log(chalk.green(`✅ ${message}`));
};

/**
 * Logs an info message
 * @param message The info message
 */
export const logInfo = (message: string): void => {
  console.log(chalk.blue(`ℹ️  ${message}`));
};

/**
 * Logs a warning message
 * @param message The warning message
 */
export const logWarning = (message: string): void => {
  console.warn(chalk.yellow(`⚠️  ${message}`));
};
/**
 * Merges class names together, useful for conditional classes
 * @param classes Array of class names
 * @returns Merged class names string
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};
