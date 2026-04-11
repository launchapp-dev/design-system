import fs from 'fs';
import path from 'path';

const VUE_DIR = 'src/vue/components';
const SVELTE_DIR = 'src/svelte/components';
const SVELTE_INDEX = 'src/svelte/index.ts';

if (!fs.existsSync(SVELTE_DIR)) {
  fs.mkdirSync(SVELTE_DIR, { recursive: true });
}

const vueFiles = fs.readdirSync(VUE_DIR).filter(f => f.endsWith('.vue'));

for (const file of vueFiles) {
  const content = fs.readFileSync(path.join(VUE_DIR, file), 'utf-8');
  const componentName = file.replace('.vue', '');
  
  const scriptMatch = content.match(/<script setup lang="ts">([\s\S]*?)<\/script>/);
  const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
  
  if (!scriptMatch || !templateMatch) continue;
  
  let script = scriptMatch[1];
  let template = templateMatch[1].trim();
  
  // Clean up imports
  script = script.replace(/import \{ computed \} from "vue";\n?/, '');
  
  // Extract Props
  const propsMatch = script.match(/interface Props \{([\s\S]*?)\}/);
  let propsInterface = propsMatch ? propsMatch[1] : '';
  
  // Extract defaults
  const defaultsMatch = script.match(/const props = withDefaults\(defineProps<Props>\(\), \{([\s\S]*?)\}\);/);
  let defaults = {};
  if (defaultsMatch) {
    const defaultRegex = /(\w+):\s*(['"`][^'"`]*['"`]|true|false|[0-9]+)/g;
    let m;
    while ((m = defaultRegex.exec(defaultsMatch[1])) !== null) {
      defaults[m[1]] = m[2];
    }
  }

  // Parse prop names to destructure them
  let propNames = [];
  if (propsInterface) {
    const propRegex = /^\s*(\w+)\??:/gm;
    let m;
    while ((m = propRegex.exec(propsInterface)) !== null) {
      propNames.push(m[1]);
    }
  }

  // Remove Vue props definitions
  script = script.replace(/const props = defineProps<Props>\(\);/, '');
  script = script.replace(/const props = withDefaults\(defineProps<Props>\(\), \{[\s\S]*?\}\);/, '');

  // Svelte 5 $props
  let svelteProps = `  let { `;
  for (const p of propNames) {
    if (p === 'class') {
      svelteProps += `class: className, `;
    } else {
      svelteProps += `${p}${defaults[p] ? ` = ${defaults[p]}` : ''}, `;
    }
  }
  if (!propNames.includes('class')) {
     svelteProps += `class: className, `;
  }
  svelteProps += `...restProps `;
  svelteProps += `}: {\n`;
  if (propsInterface) {
    svelteProps += propsInterface.split('\n').filter(l => l.trim() && !l.includes('class?:')).join('\n') + '\n';
  }
  svelteProps += `    class?: string;\n`;
  svelteProps += `    [key: string]: any;\n  } = $props();\n`;

  script = script.replace(/interface Props \{[\s\S]*?\}/, svelteProps);

  // Transform computed properties
  script = script.replace(/const (\w+) = computed\(\(\) => (.*?)\);/g, 'let $1 = $derived($2);');
  script = script.replace(/const (\w+) = computed\(\(\)\s*=>\s*([\s\S]*?)\n\);/g, 'let $1 = $derived(\n$2\n);');
  
  // Replace props. usage
  script = script.replace(/props\.class/g, 'className');
  for (const p of propNames) {
    if (p !== 'class') {
      const regex = new RegExp(`props\\.${p}`, 'g');
      script = script.replace(regex, p);
    }
  }

  // Template adjustments
  // Replace <slot /> with {@render children?.()}
  template = template.replace(/<slot \/>/g, '{@render children?.()}');
  // Add children to props if needed
  if (template.includes('{@render children?.()}')) {
    script = script.replace(/\[key: string\]: any;/, `children?: import('svelte').Snippet;\n    [key: string]: any;`);
    script = script.replace(/\.\.\.restProps \}/, `children, ...restProps }`);
  }

  // Basic Vue directives to Svelte
  template = template.replace(/:class="(\w+)"/g, 'class={$1}');
  template = template.replace(/:type="(\w+)"/g, 'type={$1}');
  template = template.replace(/:disabled="(\w+)"/g, 'disabled={$1}');
  template = template.replace(/:id="(\w+)"/g, 'id={$1}');
  template = template.replace(/:value="(\w+)"/g, 'value={$1}');
  template = template.replace(/v-if="([^"]+)"\s*class="([^"]+)"\s*viewBox="([^"]+)"\s*fill="([^"]+)"\s*aria-hidden="([^"]+)"\s*>\s*<circle class="([^"]+)" cx="([^"]+)" cy="([^"]+)" r="([^"]+)" stroke="([^"]+)" stroke-width="([^"]+)" \/>\s*<path class="([^"]+)" fill="([^"]+)" d="([^"]+)" \/>\s*<\/svg>/, 
    `{#if $1}\n    <svg class="$2" viewBox="$3" fill="$4" aria-hidden="$5">\n      <circle class="$6" cx="$7" cy="$8" r="$9" stroke="$10" stroke-width="$11" />\n      <path class="$12" fill="$13" d="$14" />\n    </svg>\n  {/if}`);

  // Replace self closing tags with {classes} spread to components that need it
  if (['Input', 'Textarea', 'Checkbox', 'RadioGroupItem', 'Switch', 'Slider', 'Separator'].includes(componentName)) {
    // Vue template might be <input :class="classes" :type="type" :disabled="isDisabled" />
    // we just do <input class={classes} {...restProps} /> if it is simple.
    // Actually the Vue template has exactly what it needs.
    // Let's just spread restProps into the root element.
    template = template.replace(/<(\w+)([^>]*)>/, `<$1$2 {...restProps}>`);
  } else {
    // Spread restProps on root element
    template = template.replace(/<(\w+)([^>]*)>/, `<$1$2 {...restProps}>`);
  }

  // Remove v-bind
  template = template.replace(/v-bind="\$attrs"/g, '');

  let svelteContent = `<script lang="ts">\n${script.trim()}\n</script>\n\n${template}\n`;
  
  fs.writeFileSync(path.join(SVELTE_DIR, `${componentName}.svelte`), svelteContent);
}

// Copy index.ts but change .vue to .svelte
const vueIndex = fs.readFileSync(path.join(VUE_DIR, '../index.ts'), 'utf-8');
const svelteIndex = vueIndex.replace(/\.vue"/g, '.svelte"');
fs.writeFileSync(SVELTE_INDEX, svelteIndex);

console.log('Successfully translated Vue components to Svelte 5.');