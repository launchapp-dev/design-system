import fs from 'fs';
import path from 'path';

const COMPONENT_DIR = 'src/components';
const SVELTE_DIR = 'src/svelte/components';
const SVELTE_INDEX = 'src/svelte/index.ts';

if (!fs.existsSync(SVELTE_DIR)) {
  fs.mkdirSync(SVELTE_DIR, { recursive: true });
}

function extractBaseClass(content) {
  const cnMatch = content.match(/cn\(\s*['"`](.*?)['"`]/);
  if (cnMatch) return cnMatch[1];
  const classMatch = content.match(/className(?:=|:\s*)(?:\{)?['"`](.*?)['"`]/);
  if (classMatch) return classMatch[1];
  return "";
}

function extractCva(content) {
  const cvaMatch = content.match(/cva\([\s\S]*?['"`](.*?)['"`],\s*\{([\s\S]*?)\}\n\s*\)/);
  if (!cvaMatch) return null;
  const baseClass = cvaMatch[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  const variantsBlock = cvaMatch[2];
  
  const variants = {};
  const defaultVariants = {};
  
  const vMatch = variantsBlock.match(/variants:\s*\{([\s\S]*?)\n\s*\},?\n\s*defaultVariants/);
  const variantsStr = vMatch ? vMatch[1] : variantsBlock;
  
  // Extract variants
  const variantMatches = [...variantsStr.matchAll(/(\w+):\s*\{([\s\S]*?)\}/g)];
  for (const vMatch of variantMatches) {
    if (vMatch[1] === 'variants' || vMatch[1] === 'defaultVariants') continue;
    const vName = vMatch[1];
    const vOptsStr = vMatch[2];
    const vOptRegex = /(\w+):\s*['"`](.*?)['"`]/g;
    let m2;
    variants[vName] = {};
    while ((m2 = vOptRegex.exec(vOptsStr)) !== null) {
      variants[vName][m2[1]] = m2[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    }
  }

  const dMatch = variantsBlock.match(/defaultVariants:\s*\{([\s\S]*?)\}/);
  if (dMatch) {
    const dStr = dMatch[1];
    const optRegex = /(\w+):\s*['"`](.*?)['"`]/g;
    let m;
    while ((m = optRegex.exec(dStr)) !== null) {
      defaultVariants[m[1]] = m[2];
    }
  }
  
  return { baseClass, variants, defaultVariants };
}

const getFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = getFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') && !file.includes('.stories.') && !file.includes('.test.')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
};

const tsxFiles = getFiles(COMPONENT_DIR);
let exportsList = `export { cn } from "./utils/cn";\n\n`;

for (const file of tsxFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const componentName = path.basename(file, '.tsx');
  if (componentName === 'index' || componentName.toLowerCase() === componentName) continue;

  const cvaData = extractCva(content);
  let svelteContent = '';

  if (cvaData && Object.keys(cvaData.variants).length > 0) {
    const { baseClass, variants, defaultVariants } = cvaData;
    let propsDef = `  let { class: className, children, ...restProps }: {\n    class?: string;\n`;
    let derivedClasses = `cn("${baseClass}", className`;
    let variantDeclarations = ``;
    
    for (const [vName, opts] of Object.entries(variants)) {
      const typeUnion = Object.keys(opts).map(k => `"${k}"`).join(' | ');
      propsDef += `    ${vName}?: ${typeUnion};\n`;
      
      variantDeclarations += `  const ${vName}Classes: Record<string, string> = {\n`;
      for (const [k, v] of Object.entries(opts)) {
        variantDeclarations += `    ${k}: "${v}",\n`;
      }
      variantDeclarations += `  };\n`;
      
      derivedClasses += `, ${vName} ? ${vName}Classes[${vName}] : ""`;
    }
    propsDef += `    children?: import('svelte').Snippet;\n    [key: string]: any;\n  } = $props();\n`;
    
    let propsLine = `class: className, `;
    for (const [vName, defaultVal] of Object.entries(defaultVariants)) {
      propsLine += `${vName} = "${defaultVal}", `;
    }
    propsDef = propsDef.replace(`class: className, `, propsLine);
    derivedClasses += `)`;

    svelteContent = `<script lang="ts">\n  import { cn } from "../utils/cn";\n\n${propsDef}\n${variantDeclarations}\n  let classes = $derived(${derivedClasses});\n</script>\n\n<div class={classes} {...restProps}>\n  {@render children?.()}\n</div>\n`;

  } else {
    let baseClass = extractBaseClass(content) || "";
    
    if (baseClass.includes('animate-spin') && !componentName.toLowerCase().includes('spinner')) {
      const classes = [...content.matchAll(/className(?:=|:\s*)(?:\{)?['"`](.*?)['"`]|cn\(\s*['"`](.*?)['"`]/g)];
      for (const m of classes) {
        const cls = m[1] || m[2];
        if (cls && !cls.includes('animate-spin') && !cls.match(/^[a-z]+$/) && cls.length > 5) {
          baseClass = cls;
          break;
        }
      }
    }

    svelteContent = `<script lang="ts">\n  import { cn } from "../utils/cn";\n\n  let { class: className, children, ...restProps }: {\n    class?: string;\n    children?: import('svelte').Snippet;\n    [key: string]: any;\n  } = $props();\n\n  let classes = $derived(cn("${baseClass}", className));\n</script>\n\n<div class={classes} {...restProps}>\n  {@render children?.()}\n</div>\n`;
  }

  if (['Input', 'Textarea', 'Checkbox', 'RadioGroupItem', 'Switch', 'Slider', 'Separator'].includes(componentName)) {
    let tag = 'div';
    if (componentName === 'Input') tag = 'input';
    if (componentName === 'Textarea') tag = 'textarea';
    if (['Checkbox', 'RadioGroupItem', 'Switch'].includes(componentName)) tag = 'button';
    
    svelteContent = svelteContent.replace(/<div class=\{classes\} \{...restProps\}>\n  \{@render children\?\.\(\)\}\n<\/div>/, `<${tag} class={classes} {...restProps} />`);
    svelteContent = svelteContent.replace(/children\?: import\('svelte'\)\.Snippet;\n/, '');
    svelteContent = svelteContent.replace(/children, /, '');
  }

  const svelteFilePath = path.join(SVELTE_DIR, `${componentName}.svelte`);
  fs.writeFileSync(svelteFilePath, svelteContent);
  exportsList += `export { default as La${componentName} } from "./components/${componentName}.svelte";\n`;
}

fs.writeFileSync(SVELTE_INDEX, exportsList);
console.log('Successfully regenerated Svelte wrappers for React components.');