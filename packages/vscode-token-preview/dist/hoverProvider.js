const vscode = require('vscode');
const { hslToRgb, extractTokensFromCSS } = require('./tokenExtractor');

class DesignTokenHoverProvider {
  constructor(workspaceRoot) {
    this.workspaceRoot = workspaceRoot;
    this.tokens = new Map();
    this.lastConfigPath = '';
    this.loadTokens();
  }

  loadTokens(configPath) {
    if (!configPath) {
      const config = vscode.workspace.getConfiguration('designTokenPreview');
      configPath = config.get('configPath', './src/styles/globals.css');
    }

    const fullPath = configPath.startsWith('/')
      ? configPath
      : `${this.workspaceRoot}/${configPath}`;

    if (fullPath === this.lastConfigPath) {
      return;
    }

    this.tokens = extractTokensFromCSS(fullPath);
    this.lastConfigPath = fullPath;
  }

  reloadTokens(configPath) {
    this.loadTokens(configPath);
  }

  provideHover(document, position, token) {
    const line = document.lineAt(position.line).text;
    const wordRange = document.getWordRangeAtPosition(position, /--la-[\w-]*/);

    if (!wordRange) {
      return undefined;
    }

    const tokenName = document.getText(wordRange);
    const designToken = this.tokens.get(tokenName);

    if (!designToken) {
      return undefined;
    }

    const markdown = this.createHoverContent(designToken);
    return new vscode.Hover(markdown);
  }

  createHoverContent(designToken) {
    const md = new vscode.MarkdownString();
    md.supportHtml = true;

    if (designToken.type === 'color') {
      const colorToken = designToken;
      const rgbValue = hslToRgb(colorToken.hslValue);
      const swatchHtml = `<div style="display: inline-block; width: 40px; height: 40px; background: hsl(${colorToken.hslValue}); border: 1px solid #ccc; border-radius: 4px; margin-right: 8px; vertical-align: middle;"></div>`;

      md.appendMarkdown(`${swatchHtml}`);
      md.appendMarkdown(`\n\n**Color Token**\n\n`);
      md.appendMarkdown(`- **Token:** \`${designToken.name}\`\n`);
      md.appendMarkdown(`- **HSL Value:** \`hsl(${colorToken.hslValue})\`\n`);
      md.appendMarkdown(`- **RGB Value:** \`${rgbValue}\`\n`);
    } else if (designToken.type === 'typography') {
      const typographyToken = designToken;
      md.appendMarkdown(`**Typography Token**\n\n`);
      md.appendMarkdown(`- **Token:** \`${designToken.name}\`\n`);
      md.appendMarkdown(`- **Font Family:** \`${typographyToken.fontFamily}\`\n`);
    } else if (designToken.type === 'spacing') {
      md.appendMarkdown(`**Spacing Token**\n\n`);
      md.appendMarkdown(`- **Token:** \`${designToken.name}\`\n`);
      md.appendMarkdown(`- **Value:** \`${designToken.value}\`\n`);
    } else {
      md.appendMarkdown(`**Token**\n\n`);
      md.appendMarkdown(`- **Token:** \`${designToken.name}\`\n`);
      md.appendMarkdown(`- **Value:** \`${designToken.value}\`\n`);
    }

    return md;
  }
}

module.exports = {
  DesignTokenHoverProvider,
};
