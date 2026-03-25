const fs = require('fs');
const path = require('path');

const HSL_REGEX = /(\d+)\s+(\d+)%\s+(\d+)%/;

function hslToRgb(hsl) {
  const match = hsl.match(HSL_REGEX);
  if (!match) return hsl;

  const h = parseInt(match[1]);
  const s = parseInt(match[2]);
  const l = parseInt(match[3]);

  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  let r, g, b;

  if (sNorm === 0) {
    r = g = b = lNorm;
  } else {
    const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
    const p = 2 * lNorm - q;

    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    r = hueToRgb(p, q, hNorm + 1 / 3);
    g = hueToRgb(p, q, hNorm);
    b = hueToRgb(p, q, hNorm - 1 / 3);
  }

  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

function extractTokensFromCSS(filePath) {
  const tokens = new Map();

  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    const colorTokenRegex = /--la-([\w-]+):\s*(\d+\s+\d+%\s+\d+%)/gm;
    let match;

    while ((match = colorTokenRegex.exec(content)) !== null) {
      const [, name, value] = match;
      const fullName = `--la-${name}`;

      const colorToken = {
        name: fullName,
        value: value.trim(),
        type: 'color',
        hslValue: value.trim(),
        rgbValue: hslToRgb(value.trim()),
      };

      tokens.set(fullName, colorToken);
    }

    const fontRegex = /--la-font-([\w-]+):\s*"([^"]+)"/gm;
    while ((match = fontRegex.exec(content)) !== null) {
      const [, name, fontFamily] = match;
      const fullName = `--la-font-${name}`;

      const typographyToken = {
        name: fullName,
        value: fontFamily,
        type: 'typography',
        fontFamily,
      };

      tokens.set(fullName, typographyToken);
    }

    const radiusRegex = /--la-radius:\s*([\d.]+\w+)/gm;
    while ((match = radiusRegex.exec(content)) !== null) {
      const [, value] = match;

      const spacingToken = {
        name: '--la-radius',
        value,
        type: 'spacing',
      };

      tokens.set('--la-radius', spacingToken);
    }
  } catch (error) {
    console.error(`Error reading CSS file: ${error}`);
  }

  return tokens;
}

function findTokenConfigFile(workspaceRoot) {
  const possiblePaths = [
    path.join(workspaceRoot, 'src', 'styles', 'globals.css'),
    path.join(workspaceRoot, 'styles', 'globals.css'),
    path.join(workspaceRoot, 'src', 'globals.css'),
    path.join(workspaceRoot, 'globals.css'),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

module.exports = {
  hslToRgb,
  extractTokensFromCSS,
  findTokenConfigFile,
};
