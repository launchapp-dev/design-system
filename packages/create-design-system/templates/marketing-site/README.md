# {{projectName}}

A modern marketing website built with Next.js and the LaunchApp Design System.

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

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage with hero, features, and CTA
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

- **Design System Integration**: Built with LaunchApp Design System components
- **SEO Optimized**: Metadata configuration ready for search engines
- **Responsive Design**: Mobile-first responsive layouts
- **Dark Mode Support**: Built-in dark mode with CSS variables
- **TypeScript**: Fully typed for type safety
- **Tailwind CSS**: Utility-first CSS for rapid development
- **ESLint**: Code quality and consistency

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Customization

### Updating Metadata

Edit the metadata in `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your description",
};
```

### Changing Colors

Modify the color tokens in `src/styles/globals.css`:

```css
:root {
  --la-primary: 240 5.9% 10%;
  /* ... other tokens ... */
}
```

### Changing Fonts

Update the font configuration in `src/styles/globals.css` and `tailwind.config.ts`.

### Adding Pages

Create new routes by adding files in the `app/` directory following Next.js app router conventions:

```
app/
├── page.tsx           # /
├── about/
│   └── page.tsx       # /about
└── contact/
    └── page.tsx       # /contact
```

## Using Design System Components

Import components from the design system:

```tsx
import { Button, Card, Badge } from "@launchapp/design-system";

export default function Component() {
  return (
    <Card>
      <Button>Click me</Button>
      <Badge>New</Badge>
    </Card>
  );
}
```

## Community Themes

Install pre-built community themes:

```bash
npx @launchapp/create-design-system add dracula
# or
npx @launchapp/create-design-system add nord
npx @launchapp/create-design-system add gruvbox
```

Then import the theme in `src/styles/globals.css`:

```css
@import './themes/dracula.css';
```

## Deployment

This application is ready to deploy to Vercel, Netlify, or any Node.js hosting platform.

### Vercel

```bash
npm run build
vercel deploy
```

### Other Platforms

Build the application:

```bash
npm run build
npm start
```

## Resources

- [LaunchApp Design System](https://github.com/launchapp-dev/design-system)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://radix-ui.com)

## License

MIT
