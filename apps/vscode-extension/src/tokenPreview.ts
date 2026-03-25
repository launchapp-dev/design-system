import * as vscode from "vscode";

const DESIGN_TOKENS = {
  colors: {
    "la-primary": { light: "hsl(262, 83%, 58%)", dark: "hsl(263, 70%, 50%)" },
    "la-secondary": { light: "hsl(240, 4.8%, 95.9%)", dark: "hsl(240, 3.7%, 15.9%)" },
    "la-accent": { light: "hsl(240, 4.8%, 95.9%)", dark: "hsl(240, 3.7%, 15.9%)" },
    "la-background": { light: "hsl(0, 0%, 100%)", dark: "hsl(240, 10%, 3.9%)" },
    "la-foreground": { light: "hsl(240, 10%, 3.9%)", dark: "hsl(0, 0%, 98%)" },
    "la-card": { light: "hsl(0, 0%, 100%)", dark: "hsl(240, 10%, 3.9%)" },
    "la-popover": { light: "hsl(0, 0%, 100%)", dark: "hsl(240, 10%, 3.9%)" },
    "la-destructive": { light: "hsl(0, 84.2%, 60.2%)", dark: "hsl(0, 62.8%, 30.6%)" },
    "la-border": { light: "hsl(240, 5.9%, 90%)", dark: "hsl(240, 3.7%, 15.9%)" },
    "la-input": { light: "hsl(240, 5.9%, 90%)", dark: "hsl(240, 3.7%, 15.9%)" },
    "la-ring": { light: "hsl(262, 83%, 58%)", dark: "hsl(263, 70%, 50%)" },
    "la-muted": { light: "hsl(240, 4.8%, 95.9%)", dark: "hsl(240, 3.7%, 15.9%)" },
  },
  spacing: {
    "0": "0px",
    "1": "0.25rem (4px)",
    "2": "0.5rem (8px)",
    "3": "0.75rem (12px)",
    "4": "1rem (16px)",
    "6": "1.5rem (24px)",
    "8": "2rem (32px)",
    "12": "3rem (48px)",
    "16": "4rem (64px)",
  },
  borderRadius: {
    "0": "0px",
    "sm": "0.125rem (2px)",
    "md": "0.375rem (6px)",
    "lg": "0.5rem (8px)",
    "full": "9999px",
  },
};

export class TokenPreviewCommand {
  async execute() {
    const selectedText = this.getSelectedText();

    if (selectedText && selectedText.startsWith("--la-")) {
      this.showTokenPreview(selectedText);
    } else {
      this.showTokenPalette();
    }
  }

  private getSelectedText(): string {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return "";

    const selection = editor.selection;
    return editor.document.getText(selection);
  }

  private showTokenPalette() {
    const items: vscode.QuickPickItem[] = [];

    // Color tokens
    for (const [name, values] of Object.entries(DESIGN_TOKENS.colors)) {
      items.push({
        label: `🎨 ${name}`,
        description: values.light,
        detail: "Color token",
      });
    }

    // Spacing tokens
    for (const [name, value] of Object.entries(DESIGN_TOKENS.spacing)) {
      items.push({
        label: `📏 spacing-${name}`,
        description: value,
        detail: "Spacing token",
      });
    }

    // Border radius tokens
    for (const [name, value] of Object.entries(DESIGN_TOKENS.borderRadius)) {
      items.push({
        label: `⬭ radius-${name}`,
        description: value,
        detail: "Border radius token",
      });
    }

    vscode.window.showQuickPick(items, {
      title: "Design Tokens",
      placeHolder: "Search design tokens",
    });
  }

  private showTokenPreview(tokenName: string) {
    const panel = vscode.window.createWebviewPanel(
      "tokenPreview",
      `Token: ${tokenName}`,
      vscode.ViewColumn.Two,
      {}
    );

    const cleanName = tokenName.replace("--", "");
    const token = this.getToken(cleanName);

    if (token) {
      panel.webview.html = this.getWebviewContent(cleanName, token);
    } else {
      panel.webview.html = `<h1>Token not found: ${tokenName}</h1>`;
    }
  }

  private getToken(name: string): any {
    const colors = DESIGN_TOKENS.colors as any;
    if (colors[name]) {
      return {
        type: "color",
        values: colors[name],
      };
    }

    const [category, value] = name.split("-");
    if (category === "spacing") {
      const spacingTokens = DESIGN_TOKENS.spacing as any;
      return {
        type: "spacing",
        value: spacingTokens[value],
      };
    }

    if (category === "radius") {
      const radiusTokens = DESIGN_TOKENS.borderRadius as any;
      return {
        type: "borderRadius",
        value: radiusTokens[value],
      };
    }

    return null;
  }

  private getWebviewContent(name: string, token: any): string {
    if (token.type === "color") {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            h1 { margin-top: 0; color: #333; }
            .color-box {
              display: flex;
              gap: 20px;
              margin: 20px 0;
            }
            .color-sample {
              flex: 1;
              padding: 40px;
              border-radius: 8px;
              border: 1px solid #ddd;
              text-align: center;
            }
            .color-value {
              font-family: monospace;
              font-size: 12px;
              color: #666;
              margin-top: 10px;
              word-break: break-all;
            }
            .label {
              font-weight: bold;
              font-size: 12px;
              color: #999;
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>--la-${name}</h1>
            <div class="color-box">
              <div>
                <div class="label">Light Mode</div>
                <div class="color-sample" style="background: ${token.values.light}"></div>
                <div class="color-value">${token.values.light}</div>
              </div>
              <div>
                <div class="label">Dark Mode</div>
                <div class="color-sample" style="background: ${token.values.dark}"></div>
                <div class="color-value">${token.values.dark}</div>
              </div>
            </div>
            <p style="color: #666; font-size: 14px;">
              Use <code style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px;">--la-${name}</code>
              in your CSS to reference this color.
            </p>
          </div>
        </body>
        </html>
      `;
    }

    if (token.type === "spacing") {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            h1 { margin-top: 0; color: #333; }
            .spacing-demo {
              background: #f9f9f9;
              border: 2px dashed #ddd;
              border-radius: 4px;
              margin: 20px 0;
            }
            .spacing-box {
              background: #007bff;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Spacing Token: ${token.value}</h1>
            <div class="spacing-demo">
              <div class="spacing-box" style="margin: ${token.value}; padding: ${token.value};">
                This box demonstrates the spacing size
              </div>
            </div>
            <p style="color: #666; font-size: 14px;">
              Use Tailwind's spacing scale (1=0.25rem, 2=0.5rem, etc.) in className
              props to apply consistent spacing.
            </p>
          </div>
        </body>
        </html>
      `;
    }

    return `<h1>Unknown token type</h1>`;
  }
}
