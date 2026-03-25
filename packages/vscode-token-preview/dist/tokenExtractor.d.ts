export interface Token {
    name: string;
    value: string;
    type: 'color' | 'typography' | 'spacing' | 'other';
}
export interface ColorToken extends Token {
    type: 'color';
    hslValue: string;
    rgbValue: string;
}
export interface TypographyToken extends Token {
    type: 'typography';
    fontFamily: string;
}
export declare function hslToRgb(hsl: string): string;
export declare function extractTokensFromCSS(filePath: string): Map<string, Token>;
export declare function findTokenConfigFile(workspaceRoot: string): string | null;
