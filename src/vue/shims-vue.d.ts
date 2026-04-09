// TypeScript shim for Vue SFC (.vue) files.
// Tells tsc to treat *.vue imports as typed Vue components
// without requiring vue-tsc or volar to parse the SFC syntax.
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    unknown
  >;
  export default component;
}
