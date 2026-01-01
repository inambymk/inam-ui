import fs from "fs";
import path from "path";
import chalk from "chalk";

/**
 * Required dependencies for Inam UI components
 */
const REQUIRED_DEPENDENCIES = {
  tailwindcss: {
    name: "Tailwind CSS",
    installCmd: "npm install -D tailwindcss@latest",
    severity: "warning" as const,
  },
  react: {
    name: "React",
    installCmd: "npm install react react-dom",
    severity: "error" as const,
  },
};

interface DependencyCheckResult {
  name: string;
  installed: boolean;
  severity: "warning" | "error";
  installCmd: string;
}

/**
 * Check if package.json exists and read it
 */
function getPackageJson(): Record<string, unknown> | null {
  const packagePath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(packagePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(packagePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Check if a dependency is installed
 */
function isDependencyInstalled(packageJson: Record<string, unknown>, depName: string): boolean {
  const deps = packageJson.dependencies as Record<string, string> | undefined;
  const devDeps = packageJson.devDependencies as Record<string, string> | undefined;
  const peerDeps = packageJson.peerDependencies as Record<string, string> | undefined;

  return Boolean(deps?.[depName] || devDeps?.[depName] || peerDeps?.[depName]);
}

/**
 * Check for required dependencies and show warnings
 * Returns true if critical dependencies are missing (should stop)
 */
export function checkDependencies(): boolean {
  const packageJson = getPackageJson();

  if (!packageJson) {
    console.log(chalk.yellow("\n⚠️  No package.json found in current directory"));
    console.log(
      chalk.gray(
        "   Components will still be generated, but ensure you have the required dependencies.\n"
      )
    );
    return false; // Continue anyway
  }

  const results: DependencyCheckResult[] = [];

  for (const [depName, info] of Object.entries(REQUIRED_DEPENDENCIES)) {
    results.push({
      name: info.name,
      installed: isDependencyInstalled(packageJson, depName),
      severity: info.severity,
      installCmd: info.installCmd,
    });
  }

  const missingDeps = results.filter((r) => !r.installed);

  if (missingDeps.length === 0) {
    return false; // All good, continue
  }

  // Show warnings for missing dependencies
  console.log(chalk.yellow("\n⚠️  Missing Dependencies Detected:\n"));

  for (const dep of missingDeps) {
    if (dep.severity === "error") {
      console.log(chalk.red(`   ✗ ${dep.name} (required)`));
    } else {
      console.log(chalk.yellow(`   ⚠ ${dep.name} (recommended)`));
    }
    console.log(chalk.gray(`     Install with: ${dep.installCmd}\n`));
  }

  // Check if any critical dependencies are missing
  const hasCriticalMissing = missingDeps.some((d) => d.severity === "error");

  if (hasCriticalMissing) {
    console.log(chalk.yellow("   Components require React to function.\n"));
  }

  console.log(chalk.blue("   Generating component anyway...\n"));

  return false; // Always continue, just warn
}

/**
 * Quick check if Tailwind CSS is configured
 */
export function hasTailwindConfig(): boolean {
  const possibleConfigs = [
    "tailwind.config.js",
    "tailwind.config.ts",
    "tailwind.config.mjs",
    "tailwind.config.cjs",
  ];

  return possibleConfigs.some((config) => fs.existsSync(path.join(process.cwd(), config)));
}
