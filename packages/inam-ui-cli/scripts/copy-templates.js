#!/usr/bin/env node

/**
 * Cross-platform template copy script
 * Works on Windows, macOS, and Linux
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "..", "src", "templates");
const DIST_DIR = path.join(__dirname, "..", "dist", "templates");

/**
 * Recursively copy directory
 */
function copyDir(src, dest) {
  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log("📦 Copying templates...");

  // Check if source directory exists
  if (!fs.existsSync(SRC_DIR)) {
    console.error("❌ Source templates directory not found:", SRC_DIR);
    process.exit(1);
  }

  // Copy templates
  try {
    copyDir(SRC_DIR, DIST_DIR);

    // Count copied files
    const files = fs.readdirSync(DIST_DIR);
    console.log(`✅ Successfully copied ${files.length} template(s) to dist/templates`);
  } catch (error) {
    console.error("❌ Error copying templates:", error.message);
    process.exit(1);
  }
}

main();
