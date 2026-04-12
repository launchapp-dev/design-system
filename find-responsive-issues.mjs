import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blocksDir = path.join(__dirname, 'src/blocks');
const componentsDir = path.join(__dirname, 'src/components');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(blocksDir).concat(walk(componentsDir));
const issues = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find grid-cols-X without any sm: or md: prefixes anywhere in the file
  if (/grid-cols-[2-9]/.test(content) && !/(sm|md|lg|xl):grid-cols/.test(content)) {
    issues.push(`${path.relative(__dirname, file)}: Hardcoded grid columns`);
  }
  
  // Find flex row without flex-col and md:flex-row (approximate check)
  // Look for className containing flex but NOT containing flex-col or flex-wrap
  const classNames = [...content.matchAll(/className="([^"]+)"/g)].map(m => m[1]);
  classNames.forEach(className => {
    if (className.includes('flex ') && !className.includes('flex-col') && !className.includes('flex-wrap') && !className.includes('sm:flex') && !className.includes('md:flex')) {
      // If it contains things like gap-4 and items-center without flex-wrap, it might overflow on mobile
      if (className.includes('gap-') && className.split(' ').length > 3) {
         issues.push(`${path.relative(__dirname, file)}: Potentially rigid flex container -> ${className}`);
      }
    }
  });
});

console.log(issues.join('\n'));
