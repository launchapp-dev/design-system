#!/usr/bin/env node
/**
 * Capture block preview screenshots using Playwright
 *
 * This script creates standalone HTML pages for each block and captures screenshots.
 */

import { chromium } from "playwright";
import { mkdir, readdir, writeFile, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const docsDir = resolve(__dirname, "..");
const previewsDir = resolve(docsDir, "public/previews");
const tempDir = resolve(docsDir, ".temp-capture");

// Block categories and their blocks
const BLOCKS = {
  auth: [
    { id: "login-form", name: "Login Form" },
    { id: "sign-up-form", name: "Sign Up Form" },
    { id: "forgot-password-form", name: "Forgot Password Form" },
    { id: "otp-verification", name: "OTP Verification" },
  ],
  dashboard: [
    { id: "metric-cards", name: "Metric Cards" },
    { id: "stats-overview", name: "Stats Overview" },
    { id: "activity-feed", name: "Activity Feed" },
  ],
  settings: [
    { id: "profile-settings", name: "Profile Settings" },
    { id: "account-settings", name: "Account Settings" },
    { id: "notification-preferences", name: "Notification Preferences" },
    { id: "billing-page", name: "Billing Page" },
  ],
  navigation: [
    { id: "app-sidebar", name: "App Sidebar" },
    { id: "top-nav", name: "Top Navigation" },
    { id: "mobile-nav-drawer", name: "Mobile Nav Drawer" },
  ],
  data: [
    { id: "full-data-table", name: "Full Data Table" },
    { id: "kanban-board", name: "Kanban Board" },
    { id: "searchable-data-table", name: "Searchable Data Table" },
    { id: "timeline", name: "Timeline" },
    { id: "stats-card", name: "Stats Card" },
    { id: "metric-grid", name: "Metric Grid" },
    { id: "empty-state", name: "Empty State" },
  ],
  ecommerce: [
    { id: "product-card", name: "Product Card" },
    { id: "shopping-cart", name: "Shopping Cart" },
    { id: "checkout-form", name: "Checkout Form" },
  ],
  marketing: [
    { id: "hero-section", name: "Hero Section" },
    { id: "feature-grid", name: "Feature Grid" },
    { id: "pricing-table", name: "Pricing Table" },
    { id: "testimonial-carousel", name: "Testimonial Carousel" },
    { id: "testimonial-grid", name: "Testimonial Grid" },
  ],
  "app-shells": [
    { id: "app-shell", name: "App Shell" },
    { id: "sidebar-layout", name: "Sidebar Layout" },
    { id: "dashboard-layout", name: "Dashboard Layout" },
    { id: "icon-only-sidebar-shell", name: "Icon Only Sidebar Shell" },
    { id: "dual-panel-sidebar-shell", name: "Dual Panel Sidebar Shell" },
    { id: "command-palette-shell", name: "Command Palette Shell" },
    { id: "split-pane-layout", name: "Split Pane Layout" },
  ],
  admin: [
    { id: "api-key-manager", name: "API Key Manager" },
    { id: "audit-log-viewer", name: "Audit Log Viewer" },
    { id: "user-management-table", name: "User Management Table" },
  ],
  billing: [
    { id: "subscription-manager", name: "Subscription Manager" },
    { id: "payment-method-card", name: "Payment Method Card" },
  ],
  blog: [
    { id: "post-list", name: "Post List" },
  ],
  community: [
    { id: "user-profile-card", name: "User Profile Card" },
  ],
  errors: [
    { id: "not-found-page", name: "Not Found Page" },
  ],
  messaging: [
    { id: "chat-interface", name: "Chat Interface" },
  ],
  notifications: [
    { id: "notification-center", name: "Notification Center" },
    { id: "activity-timeline-block", name: "Activity Timeline" },
  ],
  onboarding: [
    { id: "onboarding-wizard", name: "Onboarding Wizard" },
    { id: "onboarding-checklist", name: "Onboarding Checklist" },
    { id: "progress-checklist", name: "Progress Checklist" },
  ],
  team: [
    { id: "team-member-list", name: "Team Member List" },
  ],
};

async function createBlockHtml(blockId, blockName) {
  // Read the built CSS from design-system
  const cssPath = resolve(docsDir, "../../dist/styles.css");
  let cssContent = "";
  try {
    cssContent = await readFile(cssPath, "utf-8");
  } catch {
    console.warn(`[capture] Could not load CSS from ${cssPath}`);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blockName} Preview</title>
  <style>
    ${cssContent}
    body {
      margin: 0;
      padding: 24px;
      background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
      min-height: 100vh;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .preview-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      border: 1px solid #e5e5e5;
      overflow: hidden;
    }
    .preview-header {
      padding: 12px 16px;
      background: #fafafa;
      border-bottom: 1px solid #e5e5e5;
      font-size: 12px;
      font-weight: 500;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .preview-content {
      padding: 24px;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .placeholder {
      text-align: center;
      color: #666;
    }
    .placeholder h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    .placeholder p {
      margin: 0;
      font-size: 14px;
      color: #999;
    }
    .category-badge {
      display: inline-block;
      padding: 4px 12px;
      background: #3b82f6;
      color: white;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="preview-container" id="capture-target">
    <div class="preview-header">Preview</div>
    <div class="preview-content">
      <div class="placeholder">
        <span class="category-badge">${blockId.split('-')[0]}</span>
        <h3>${blockName}</h3>
        <p>Block ID: ${blockId}</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  return html;
}

async function captureBlockScreenshot(page, blockId, blockName) {
  const htmlContent = await createBlockHtml(blockId, blockName);
  const tempFile = resolve(tempDir, `${blockId}.html`);

  try {
    // Write temporary HTML file
    await writeFile(tempFile, htmlContent);

    // Navigate to the file
    await page.goto(`file://${tempFile}`, { waitUntil: "networkidle" });

    // Find the capture target
    const target = await page.$("#capture-target");
    if (!target) {
      throw new Error("Capture target not found");
    }

    // Take screenshot
    const screenshotPath = resolve(previewsDir, `${blockId}.png`);
    await target.screenshot({
      path: screenshotPath,
      type: "png",
    });

    console.log(`[capture] ${blockId} - saved to previews/${blockId}.png`);
    return screenshotPath;
  } catch (err) {
    console.error(`[capture] ${blockId} - error: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("[capture] Block Preview Screenshot Capture");
  console.log("[capture] Output directory:", previewsDir);

  // Ensure directories exist
  await mkdir(previewsDir, { recursive: true });
  await mkdir(tempDir, { recursive: true });

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2, // Retina quality
  });
  const page = await context.newPage();

  const results = {
    captured: [],
    failed: [],
  };

  // Capture each block
  for (const [category, blocks] of Object.entries(BLOCKS)) {
    console.log(`\n[capture] Category: ${category} (${blocks.length} blocks)`);

    for (const block of blocks) {
      const path = await captureBlockScreenshot(page, block.id, block.name);
      if (path) {
        results.captured.push({ category, block: block.id, path });
      } else {
        results.failed.push({ category, block: block.id, name: block.name });
      }

      // Small delay between screenshots
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  // Cleanup
  await browser.close();

  // Summary
  console.log("\n[capture] === Summary ===");
  console.log(`[capture] Captured: ${results.captured.length}`);
  console.log(`[capture] Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log("\n[capture] Failed blocks:");
    for (const f of results.failed) {
      console.log(`  - ${f.category}/${f.block} (${f.name})`);
    }
  }

  // List generated files
  const files = await readdir(previewsDir);
  console.log(`\n[capture] Files in ${previewsDir}:`);
  for (const file of files.sort()) {
    console.log(`  - ${file}`);
  }

  process.exit(results.failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("[capture] Fatal error:", err);
  process.exit(1);
});
