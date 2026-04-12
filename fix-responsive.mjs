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
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(blocksDir).concat(walk(componentsDir));
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Exclude some intentionally rigid things
  if (file.includes('CalendarWidget') || file.includes('ColorPicker') || file.includes('ThemeSubmissionForm')) {
    // manually fix ThemeSubmissionForm
    if (file.includes('ThemeSubmissionForm')) {
        content = content.replace(/className="grid w-full grid-cols-3"/g, 'className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto"');
        content = content.replace(/<div className="grid grid-cols-2 gap-4">/g, '<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">');
        content = content.replace(/<div className="grid grid-cols-3 gap-4">/g, '<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">');
    }
  }

  if (file.includes('HeroBrowserFrame')) {
      content = content.replace(/style=\{\{ gridTemplateColumns: "repeat\(4, 1fr\)" \}\}/, 'className="grid-cols-2 sm:grid-cols-4"');
      content = content.replace(/<div className="flex-1 grid gap-2 min-h-0" style=\{\{ gridTemplateColumns: "1.4fr 1fr" \}\}>/, '<div className="flex-1 flex flex-col sm:grid gap-2 min-h-0 sm:grid-cols-[1.4fr_1fr]">');
      content = content.replace(/className="w-40 shrink-0 flex flex-col gap-5 p-4 border-r"/, 'className="hidden sm:flex w-40 shrink-0 flex-col gap-5 p-4 border-r"');
      content = content.replace(/className="flex flex-col gap-0\.5 flex-1"/, 'className="hidden sm:flex flex-col gap-0.5 flex-1"'); // Wait, the sidebar itself is hidden, so this is fine.
  }

  // Generic flex replacements
  // 1. flex items-center justify-between gap-4 -> flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
  content = content.replace(/"flex items-center justify-between gap-4/g, '"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4');
  content = content.replace(/"flex items-center justify-between gap-3/g, '"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3');
  content = content.replace(/"flex items-center justify-between gap-2/g, '"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2');
  
  // 2. flex items-start justify-between gap-4
  content = content.replace(/"flex items-start justify-between gap-4/g, '"flex flex-col sm:flex-row items-start justify-between gap-4');
  content = content.replace(/"flex items-start justify-between gap-3/g, '"flex flex-col sm:flex-row items-start justify-between gap-3');
  content = content.replace(/"flex items-start justify-between gap-2/g, '"flex flex-col sm:flex-row items-start justify-between gap-2');

  // Generic grid replacements if they don't have sm: or md: (checking only exact strings)
  content = content.replace(/"grid grid-cols-2 gap-4/g, '"grid grid-cols-1 sm:grid-cols-2 gap-4');
  content = content.replace(/"grid grid-cols-3 gap-4/g, '"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4');
  content = content.replace(/"grid grid-cols-4 gap-4/g, '"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4');
  
  content = content.replace(/"grid grid-cols-2 gap-6/g, '"grid grid-cols-1 sm:grid-cols-2 gap-6');
  content = content.replace(/"grid grid-cols-3 gap-6/g, '"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6');
  
  content = content.replace(/"grid grid-cols-2 gap-8/g, '"grid grid-cols-1 sm:grid-cols-2 gap-8');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log("Fixed:", file);
  }
});

console.log("Total changed files:", changedFiles);
