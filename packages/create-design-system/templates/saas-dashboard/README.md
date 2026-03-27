# {{projectName}}

A modern SaaS dashboard application built with Next.js and the LaunchApp Design System.

## Getting Started

### Prerequisites

- Node.js 16+ and npm/pnpm
- Basic knowledge of React and TypeScript

### Installation

```bash
npm install
# or
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Dashboard home page
│   └── dashboard/         # Dashboard routes
├── src/
│   └── styles/
│       ├── globals.css    # Global styles and design tokens
│       └── themes/        # Optional theme files
├── public/                # Static assets
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Features

- **Design System Integration**: Pre-configured with LaunchApp Design System components
- **Dark Mode Support**: Built-in dark mode support with CSS variables
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **ESLint**: Code quality linting
- **Responsive Design**: Mobile-first responsive layouts

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Customization

### Changing Colors

Edit the color tokens in `src/styles/globals.css`:

```css
:root {
  --la-primary: 240 5.9% 10%;
  /* ... other tokens ... */
}
```

### Changing Fonts

Update the font imports in `src/styles/globals.css` and modify the `fontFamily` in `tailwind.config.ts`.

### Adding Components

Install additional components from the design system:

```bash
npm install @launchapp/design-system
```

Then import and use them in your application:

```tsx
import { Button, Card, Dialog } from "@launchapp/design-system";
```

## Community Themes

Install pre-built community themes:

```bash
npx @launchapp/create-design-system add dracula
# or
npx @launchapp/create-design-system add nord
npx @launchapp/create-design-system add gruvbox
```

Then import the theme in your `src/styles/globals.css`:

```css
@import './themes/dracula.css';
```

## Resources

- [LaunchApp Design System Documentation](https://github.com/launchapp-dev/design-system)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://radix-ui.com)

## License

MIT
