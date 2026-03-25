export interface ComponentInfo {
  name: string;
  type: string;
  description?: string;
  dependencies?: string[];
  props?: PropInfo[];
}

export interface PropInfo {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  values?: string[];
}

export class ComponentRegistry {
  private components: Map<string, ComponentInfo> = new Map();

  async load(): Promise<void> {
    // In a real implementation, this would load from the registry.json
    // For now, we'll use the hardcoded props in propIntelliSense.ts
    this.loadBuiltInComponents();
  }

  private loadBuiltInComponents(): void {
    const builtInComponents = [
      {
        name: "Button",
        type: "ui",
        description: "A clickable button element with variants",
        dependencies: ["@radix-ui/react-slot"],
      },
      {
        name: "Badge",
        type: "ui",
        description: "A badge component with multiple variants",
        dependencies: ["class-variance-authority"],
      },
      {
        name: "Card",
        type: "ui",
        description: "A card container component",
      },
      {
        name: "Input",
        type: "ui",
        description: "A form input field",
      },
      {
        name: "Label",
        type: "ui",
        description: "A form label element",
      },
      {
        name: "Dialog",
        type: "ui",
        description: "A modal dialog component",
        dependencies: ["@radix-ui/react-dialog"],
      },
      {
        name: "Select",
        type: "ui",
        description: "A dropdown select component",
        dependencies: ["@radix-ui/react-select"],
      },
      {
        name: "Tabs",
        type: "ui",
        description: "A tabbed content component",
        dependencies: ["@radix-ui/react-tabs"],
      },
      {
        name: "Checkbox",
        type: "ui",
        description: "A checkbox form control",
        dependencies: ["@radix-ui/react-checkbox"],
      },
      {
        name: "RadioGroup",
        type: "ui",
        description: "A radio button group",
        dependencies: ["@radix-ui/react-radio-group"],
      },
      {
        name: "Tooltip",
        type: "ui",
        description: "A tooltip popup component",
        dependencies: ["@radix-ui/react-tooltip"],
      },
      {
        name: "Avatar",
        type: "ui",
        description: "An avatar component",
        dependencies: ["@radix-ui/react-avatar"],
      },
      {
        name: "Accordion",
        type: "ui",
        description: "An accordion collapse component",
        dependencies: ["@radix-ui/react-accordion"],
      },
      {
        name: "Alert",
        type: "ui",
        description: "An alert message component",
      },
      {
        name: "DropdownMenu",
        type: "ui",
        description: "A dropdown menu component",
        dependencies: ["@radix-ui/react-dropdown-menu"],
      },
      {
        name: "Table",
        type: "ui",
        description: "A data table component",
      },
    ];

    for (const component of builtInComponents) {
      this.components.set(component.name, component);
    }
  }

  getComponent(name: string): ComponentInfo | undefined {
    return this.components.get(name);
  }

  getAllComponents(): ComponentInfo[] {
    return Array.from(this.components.values());
  }

  searchComponents(query: string): ComponentInfo[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllComponents().filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description?.toLowerCase().includes(lowerQuery)
    );
  }
}
