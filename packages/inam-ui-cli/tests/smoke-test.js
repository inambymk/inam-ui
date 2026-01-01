#!/usr/bin/env node

/**
 * CLI Smoke Tests
 * Basic tests to ensure the CLI works correctly
 *
 * Run: node packages/inam-ui-cli/tests/smoke-test.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const CLI_PATH = path.join(__dirname, "..", "dist", "index.js");
const TEST_OUTPUT = path.join(__dirname, "..", "..", "..", "test-output");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
}

function cleanup() {
  if (fs.existsSync(TEST_OUTPUT)) {
    fs.rmSync(TEST_OUTPUT, { recursive: true });
  }
}

function setup() {
  cleanup();
  fs.mkdirSync(TEST_OUTPUT, { recursive: true });
}

// ============================================
// Tests
// ============================================

console.log("\n🧪 Running CLI Smoke Tests\n");
console.log("─".repeat(40));

// Check if CLI is built
test("CLI is built", () => {
  if (!fs.existsSync(CLI_PATH)) {
    throw new Error("CLI not found. Run 'npm run build:cli' first.");
  }
});

// Test --help
test("--help returns usage info", () => {
  const output = execSync(`node ${CLI_PATH} --help`, { encoding: "utf-8" });
  if (!output.includes("Usage:")) {
    throw new Error("Help output missing usage info");
  }
});

// Test --version
test("--version returns version", () => {
  const output = execSync(`node ${CLI_PATH} --version`, { encoding: "utf-8" });
  if (!output.includes("Inam UI v")) {
    throw new Error("Version output incorrect");
  }
});

// Test list command
test("list command shows components", () => {
  const output = execSync(`node ${CLI_PATH} list`, { encoding: "utf-8" });
  if (!output.includes("Available Components")) {
    throw new Error("List output missing components");
  }
  if (!output.includes("Button")) {
    throw new Error("List output missing Button component");
  }
});

// Test list with category filter
test("list --category Form filters correctly", () => {
  const output = execSync(`node ${CLI_PATH} list --category Form`, { encoding: "utf-8" });
  if (!output.includes("Form")) {
    throw new Error("Category filter not working");
  }
});

// Test component generation
setup();

test("generates Button component", () => {
  execSync(`node ${CLI_PATH} button --path ${TEST_OUTPUT}`, { encoding: "utf-8" });
  const buttonPath = path.join(TEST_OUTPUT, "Button.tsx");
  if (!fs.existsSync(buttonPath)) {
    throw new Error("Button.tsx not generated");
  }
});

test("generated Button has valid content", () => {
  const buttonPath = path.join(TEST_OUTPUT, "Button.tsx");
  const content = fs.readFileSync(buttonPath, "utf-8");

  if (!content.includes("interface ButtonProps")) {
    throw new Error("Missing ButtonProps interface");
  }
  if (!content.includes("export default Button")) {
    throw new Error("Missing default export");
  }
});

test("generates Input component", () => {
  execSync(`node ${CLI_PATH} input --path ${TEST_OUTPUT}`, { encoding: "utf-8" });
  const inputPath = path.join(TEST_OUTPUT, "Input.tsx");
  if (!fs.existsSync(inputPath)) {
    throw new Error("Input.tsx not generated");
  }
});

test("invalid component name shows error", () => {
  try {
    execSync(`node ${CLI_PATH} invalidcomponent --path ${TEST_OUTPUT}`, {
      encoding: "utf-8",
      stdio: "pipe",
    });
    throw new Error("Should have thrown for invalid component");
  } catch (error) {
    // Expected to fail
    if (
      !error.message.includes("not a valid component") &&
      !error.stderr?.includes("not a valid component")
    ) {
      // Check if it's just the expected error (exit code 1)
      if (error.status !== 1) {
        throw new Error("Didn't show proper error for invalid component");
      }
    }
  }
});

// Cleanup
cleanup();

// ============================================
// Summary
// ============================================

console.log("─".repeat(40));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
