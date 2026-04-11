const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');
const reactDir = path.join(__dirname, 'src', 'react');
const reactComponentsDir = path.join(reactDir, 'components');

if (!fs.existsSync(reactDir)) fs.mkdirSync(reactDir);
if (!fs.existsSync(reactComponentsDir)) fs.mkdirSync(reactComponentsDir);

const components = fs.readdirSync(srcDir).filter(f => fs.statSync(path.join(srcDir, f)).isDirectory());

let indexContent = `export { cn } from "../lib/utils";\n`;

components.forEach(comp => {
  const indexTsPath = path.join(srcDir, comp, 'index.ts');
  const indexTsxPath = path.join(srcDir, comp, 'index.tsx');
  let exportsFile = indexTsPath;
  if (!fs.existsSync(indexTsPath)) {
    if (fs.existsSync(indexTsxPath)) {
      exportsFile = indexTsxPath;
    } else {
      return; // Skip if no index file
    }
  }

  const content = fs.readFileSync(exportsFile, 'utf8');
  // Match `export { X, Y }` or `export { X as Y }`
  const exportMatches = [...content.matchAll(/export\s+\{([^}]+)\}/g)];
  if (exportMatches.length === 0) return;

  const typeMatches = [...content.matchAll(/export\s+type\s+\{([^}]+)\}/g)];

  let adapterContent = '';
  let exports = [];

  const processExports = (match, isType = false) => {
    const items = match[1].split(',').map(s => s.trim()).filter(Boolean);
    items.forEach(item => {
      // Handle "X as Y"
      let orig = item;
      let asName = item;
      if (item.includes(' as ')) {
        const parts = item.split(' as ').map(s => s.trim());
        orig = parts[0];
        asName = parts[1];
      }

      // Prefix with La / la
      let newName = asName;
      if (asName.match(/^[A-Z]/)) {
        newName = `La${asName}`;
      } else {
        newName = `la${asName.charAt(0).toUpperCase()}${asName.slice(1)}`;
      }

      // If it's a type but not exported as type in the curly brace block
      if (isType || orig.startsWith('type ')) {
         const cleanOrig = orig.replace(/^type\s+/, '');
         adapterContent += `export type { ${cleanOrig} as ${newName} } from "../../components/${comp}";\n`;
      } else {
         adapterContent += `export { ${orig} as ${newName} } from "../../components/${comp}";\n`;
      }
    });
  };

  exportMatches.forEach(m => processExports(m, false));
  typeMatches.forEach(m => processExports(m, true));

  if (adapterContent) {
    fs.writeFileSync(path.join(reactComponentsDir, `${comp}.ts`), adapterContent);
    indexContent += `export * from "./components/${comp}";\n`;
  }
});

fs.writeFileSync(path.join(reactDir, 'index.ts'), indexContent);
console.log('Done generating React adapters');
