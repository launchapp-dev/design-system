import type { CommunityTheme } from "./community-themes";

interface CommunityThemeEntry {
  id: string;
  theme: CommunityTheme;
}

let cachedRegistry: CommunityThemeEntry[] | null = null;

export function getCommunityThemeRegistry(): CommunityThemeEntry[] {
  if (cachedRegistry !== null) {
    return cachedRegistry;
  }

  const themes: CommunityThemeEntry[] = [];

  const dracula: CommunityTheme = {
    id: "dracula",
    name: "Dracula",
    description: "A dark theme inspired by the popular Dracula color scheme",
    author: {
      name: "Dracula Theme Community",
      url: "https://draculatheme.com",
    },
    version: "1.0.0",
    license: "MIT",
    previewColor: "189 100% 74%",
    keywords: ["dark", "purple", "vibrant"],
    repository: "https://github.com/dracula/dracula-theme",
    tokens: {
      light: {
        "--la-background": "0 0% 100%",
        "--la-foreground": "231 15% 18%",
        "--la-card": "0 0% 100%",
        "--la-card-foreground": "231 15% 18%",
        "--la-popover": "0 0% 100%",
        "--la-popover-foreground": "231 15% 18%",
        "--la-primary": "265 89% 66%",
        "--la-primary-foreground": "0 0% 100%",
        "--la-secondary": "231 15% 95%",
        "--la-secondary-foreground": "231 15% 25%",
        "--la-muted": "231 15% 90%",
        "--la-muted-foreground": "231 15% 45%",
        "--la-accent": "265 89% 66%",
        "--la-accent-foreground": "0 0% 100%",
        "--la-destructive": "0 100% 67%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "231 15% 88%",
        "--la-input": "231 15% 88%",
        "--la-ring": "265 89% 66%",
      },
      dark: {
        "--la-background": "231 15% 18%",
        "--la-foreground": "60 30% 96%",
        "--la-card": "231 15% 22%",
        "--la-card-foreground": "60 30% 96%",
        "--la-popover": "231 15% 22%",
        "--la-popover-foreground": "60 30% 96%",
        "--la-primary": "189 100% 74%",
        "--la-primary-foreground": "231 15% 18%",
        "--la-secondary": "231 15% 35%",
        "--la-secondary-foreground": "60 30% 96%",
        "--la-muted": "231 15% 40%",
        "--la-muted-foreground": "231 15% 70%",
        "--la-accent": "189 100% 74%",
        "--la-accent-foreground": "231 15% 18%",
        "--la-destructive": "0 100% 67%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "231 15% 32%",
        "--la-input": "231 15% 32%",
        "--la-ring": "189 100% 74%",
      },
    },
  };

  const nord: CommunityTheme = {
    id: "nord",
    name: "Nord",
    description: "An arctic, north-bluish color palette for a fresh, cold aesthetic",
    author: {
      name: "Nord Theme",
      url: "https://www.nordtheme.com",
    },
    version: "1.0.0",
    license: "MIT",
    previewColor: "218 88% 52%",
    keywords: ["dark", "cool", "blue", "arctic"],
    repository: "https://github.com/arcticicestudio/nord",
    tokens: {
      light: {
        "--la-background": "0 0% 100%",
        "--la-foreground": "219 16% 27%",
        "--la-card": "0 0% 100%",
        "--la-card-foreground": "219 16% 27%",
        "--la-popover": "0 0% 100%",
        "--la-popover-foreground": "219 16% 27%",
        "--la-primary": "218 88% 52%",
        "--la-primary-foreground": "0 0% 100%",
        "--la-secondary": "219 16% 95%",
        "--la-secondary-foreground": "219 16% 30%",
        "--la-muted": "219 16% 90%",
        "--la-muted-foreground": "219 16% 45%",
        "--la-accent": "218 88% 52%",
        "--la-accent-foreground": "0 0% 100%",
        "--la-destructive": "0 86% 59%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "219 16% 88%",
        "--la-input": "219 16% 88%",
        "--la-ring": "218 88% 52%",
      },
      dark: {
        "--la-background": "219 16% 20%",
        "--la-foreground": "218 17% 92%",
        "--la-card": "219 16% 24%",
        "--la-card-foreground": "218 17% 92%",
        "--la-popover": "219 16% 24%",
        "--la-popover-foreground": "218 17% 92%",
        "--la-primary": "218 88% 65%",
        "--la-primary-foreground": "219 16% 20%",
        "--la-secondary": "219 16% 35%",
        "--la-secondary-foreground": "218 17% 92%",
        "--la-muted": "219 16% 42%",
        "--la-muted-foreground": "219 16% 70%",
        "--la-accent": "218 88% 65%",
        "--la-accent-foreground": "219 16% 20%",
        "--la-destructive": "0 86% 59%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "219 16% 32%",
        "--la-input": "219 16% 32%",
        "--la-ring": "218 88% 65%",
      },
    },
  };

  const gruvbox: CommunityTheme = {
    id: "gruvbox",
    name: "Gruvbox",
    description: "Retro groove color scheme with warm earthy tones",
    author: {
      name: "Gruvbox Theme",
      url: "https://github.com/morhetz/gruvbox",
    },
    version: "1.0.0",
    license: "MIT",
    previewColor: "25 83% 60%",
    keywords: ["warm", "earthy", "retro", "brown"],
    repository: "https://github.com/morhetz/gruvbox",
    tokens: {
      light: {
        "--la-background": "0 0% 100%",
        "--la-foreground": "14 8% 23%",
        "--la-card": "0 0% 100%",
        "--la-card-foreground": "14 8% 23%",
        "--la-popover": "0 0% 100%",
        "--la-popover-foreground": "14 8% 23%",
        "--la-primary": "25 83% 60%",
        "--la-primary-foreground": "0 0% 100%",
        "--la-secondary": "14 8% 95%",
        "--la-secondary-foreground": "14 8% 30%",
        "--la-muted": "14 8% 90%",
        "--la-muted-foreground": "14 8% 45%",
        "--la-accent": "25 83% 60%",
        "--la-accent-foreground": "0 0% 100%",
        "--la-destructive": "0 100% 62%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "14 8% 88%",
        "--la-input": "14 8% 88%",
        "--la-ring": "25 83% 60%",
      },
      dark: {
        "--la-background": "14 8% 18%",
        "--la-foreground": "60 23% 92%",
        "--la-card": "14 8% 22%",
        "--la-card-foreground": "60 23% 92%",
        "--la-popover": "14 8% 22%",
        "--la-popover-foreground": "60 23% 92%",
        "--la-primary": "25 83% 70%",
        "--la-primary-foreground": "14 8% 18%",
        "--la-secondary": "14 8% 35%",
        "--la-secondary-foreground": "60 23% 92%",
        "--la-muted": "14 8% 42%",
        "--la-muted-foreground": "14 8% 70%",
        "--la-accent": "25 83% 70%",
        "--la-accent-foreground": "14 8% 18%",
        "--la-destructive": "0 100% 62%",
        "--la-destructive-foreground": "0 0% 100%",
        "--la-border": "14 8% 32%",
        "--la-input": "14 8% 32%",
        "--la-ring": "25 83% 70%",
      },
    },
  };

  themes.push({ id: dracula.id, theme: dracula });
  themes.push({ id: nord.id, theme: nord });
  themes.push({ id: gruvbox.id, theme: gruvbox });

  cachedRegistry = themes;
  return themes;
}

export function getCommunityThemeById(id: string): CommunityTheme | undefined {
  const registry = getCommunityThemeRegistry();
  return registry.find((entry) => entry.id === id)?.theme;
}

export function listCommunityThemes(): CommunityTheme[] {
  return getCommunityThemeRegistry().map((entry) => entry.theme);
}
