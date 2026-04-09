import { inject, provide, type Ref } from "vue";

interface TabsContext {
  activeTab: Ref<string>;
  setActiveTab: (value: string) => void;
}

const TABS_KEY = Symbol("tabs");

export function provideTabsContext(activeTab: Ref<string>, onValueChange: (value: string) => void) {
  provide<TabsContext>(TABS_KEY, {
    activeTab,
    setActiveTab(value) {
      onValueChange(value);
    },
  });
}

export function useTabsContext(): TabsContext {
  const ctx = inject<TabsContext>(TABS_KEY);
  if (!ctx) throw new Error("Tabs components must be used within <LaTabs>");
  return ctx;
}
