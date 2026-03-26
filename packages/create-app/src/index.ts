import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";

interface Template {
  id: string;
  name: string;
  description: string;
}

const TEMPLATES: Record<string, Template> = {
  "saas-dashboard": {
    id: "saas-dashboard",
    name: "SaaS Dashboard",
    description: "Complete dashboard UI with authentication, forms, tables, and charts",
  },
  "marketing-site": {
    id: "marketing-site",
    name: "Marketing Site",
    description: "Landing page with hero, features, pricing, and CTA sections",
  },
  "admin-panel": {
    id: "admin-panel",
    name: "Admin Panel",
    description: "Admin interface with navigation, forms, settings, and data management",
  },
};

function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf-8");
}

function copyTemplate(
  templateDir: string,
  targetDir: string,
  replacements: Record<string, string>
): void {
  if (!fs.existsSync(templateDir)) {
    console.error(`Error: Template directory not found: ${templateDir}`);
    process.exit(1);
  }

  const copyDir = (src: string, dest: string) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);
    files.forEach((file) => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      const stat = fs.statSync(srcPath);

      if (stat.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        let content = fs.readFileSync(srcPath, "utf-8");

        for (const [key, value] of Object.entries(replacements)) {
          content = content.replace(new RegExp(key, "g"), value);
        }

        writeFile(destPath, content);
      }
    });
  };

  copyDir(templateDir, targetDir);
}

function validateProjectName(name: string): boolean | string {
  if (!/^[a-z0-9-_]+$/.test(name)) {
    return "Use lowercase letters, numbers, hyphens, and underscores only";
  }
  if (name.length < 2) {
    return "Project name must be at least 2 characters";
  }
  return true;
}

async function main(): Promise<void> {
  console.log("\n  🚀 LaunchApp Design System — Application Scaffolder\n");

  const answers = await prompts(
    [
      {
        type: "select",
        name: "template",
        message: "Choose a template",
        choices: Object.values(TEMPLATES).map((t) => ({
          title: t.name,
          value: t.id,
          description: t.description,
        })),
        initial: 0,
      },
      {
        type: "text",
        name: "projectName",
        message: "Project name",
        initial: "my-app",
        validate: validateProjectName,
      },
    ],
    {
      onCancel: () => {
        console.log("\n  Cancelled.\n");
        process.exit(0);
      },
    }
  );

  const targetDir = path.resolve(process.cwd(), answers.projectName as string);

  if (fs.existsSync(targetDir)) {
    console.error(`\n  Error: directory "${answers.projectName}" already exists.\n`);
    process.exit(1);
  }

  const template = answers.template as string;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templatePath = path.join(__dirname, "..", "templates", template);

  const replacements = {
    "{{projectName}}": answers.projectName as string,
    "{{packageName}}": (answers.projectName as string).toLowerCase().replace(/\s+/g, "-"),
  };

  copyTemplate(templatePath, targetDir, replacements);

  const templateInfo = TEMPLATES[template];

  console.log(`\n  ✓ Created ${templateInfo.name} project: ${answers.projectName}`);
  console.log(`\n  📁 Project structure:\n`);
  console.log(`    ${answers.projectName}/`);
  console.log(`    ├── app/               (Next.js app router)`);
  console.log(`    ├── src/`);
  console.log(`    │   ├── components/    (UI components)`);
  console.log(`    │   └── styles/        (CSS styles)`);
  console.log(`    ├── package.json`);
  console.log(`    └── tailwind.config.ts`);

  console.log(`\n  📖 Next steps:\n`);
  console.log(`    cd ${answers.projectName}`);
  console.log("    npm install");
  console.log("    npm run dev\n");

  console.log(`  ✨ Features included:\n`);
  if (template === "saas-dashboard") {
    console.log("    ✓ Authentication flow with login/signup");
    console.log("    ✓ Dashboard with data visualizations (charts)");
    console.log("    ✓ Data tables with filtering and sorting");
    console.log("    ✓ Form components and validation");
    console.log("    ✓ Responsive layout with sidebar navigation");
  } else if (template === "marketing-site") {
    console.log("    ✓ Hero section with CTAs");
    console.log("    ✓ Features showcase");
    console.log("    ✓ Pricing table");
    console.log("    ✓ Testimonials section");
    console.log("    ✓ Footer with links");
    console.log("    ✓ Fully responsive design");
  } else if (template === "admin-panel") {
    console.log("    ✓ Sidebar navigation");
    console.log("    ✓ User management interface");
    console.log("    ✓ Settings and configuration forms");
    console.log("    ✓ Data tables and list views");
    console.log("    ✓ Action panels and modals");
  }

  console.log(`\n  🎨 Design System:\n`);
  console.log("    ✓ Pre-configured with LaunchApp design system");
  console.log("    ✓ Tailwind CSS with custom tokens");
  console.log("    ✓ Dark mode support");
  console.log("    ✓ Radix UI components");
  console.log("    ✓ Responsive breakpoints\n");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
