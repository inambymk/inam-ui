import fs from "fs";
import path from "path";

/**
 * Configuration options for Inam UI CLI
 */
export interface InamConfig {
  /**
   * Default path where components will be generated
   * @default "src/components/ui"
   */
  defaultPath: string;

  /**
   * Whether to add file header with generation info
   * @default true
   */
  addFileHeader: boolean;

  /**
   * Whether to check for required dependencies before generating
   * @default true
   */
  checkDependencies: boolean;

  /**
   * Whether to ask for confirmation before overwriting files
   * @default true
   */
  confirmBeforeOverwrite: boolean;

  /**
   * Tailwind CSS version to target
   * @default 4
   */
  tailwindVersion: 3 | 4;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: InamConfig = {
  defaultPath: "src/components/ui",
  addFileHeader: true,
  checkDependencies: true,
  confirmBeforeOverwrite: true,
  tailwindVersion: 4,
};

/**
 * Possible config file names (in order of priority)
 */
const CONFIG_FILES = [".inamrc", ".inamrc.json", "inam.config.json"];

/**
 * Find and load configuration file from the current working directory
 * @returns Merged configuration with defaults
 */
export function loadConfig(): InamConfig {
  const cwd = process.cwd();

  for (const configFile of CONFIG_FILES) {
    const configPath = path.join(cwd, configFile);

    if (fs.existsSync(configPath)) {
      try {
        const fileContent = fs.readFileSync(configPath, "utf-8");
        const userConfig = JSON.parse(fileContent);

        // Merge with defaults
        return {
          ...DEFAULT_CONFIG,
          ...userConfig,
        };
      } catch (error) {
        // Invalid JSON, use defaults
        console.warn(`⚠️  Warning: Could not parse ${configFile}, using defaults`);
        return DEFAULT_CONFIG;
      }
    }
  }

  // No config file found, use defaults
  return DEFAULT_CONFIG;
}

/**
 * Check if a config file exists
 */
export function hasConfigFile(): boolean {
  const cwd = process.cwd();
  return CONFIG_FILES.some((file) => fs.existsSync(path.join(cwd, file)));
}

/**
 * Get the path to the config file (if exists)
 */
export function getConfigPath(): string | null {
  const cwd = process.cwd();
  for (const configFile of CONFIG_FILES) {
    const configPath = path.join(cwd, configFile);
    if (fs.existsSync(configPath)) {
      return configPath;
    }
  }
  return null;
}
