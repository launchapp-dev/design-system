# @launchapp/create-design-system

CLI tool to scaffold applications with the LaunchApp design system pre-integrated.

## Installation

```bash
npm install -g @launchapp/create-design-system
```

Or use directly with npx:

```bash
npx @launchapp/create-design-system
npx @launchapp/ds create-app
```

## Quick Start

Run the CLI to start scaffolding a new project:

```bash
npx @launchapp/create-design-system
```

You'll be prompted to:
1. Choose a template (SaaS Dashboard, Marketing Site, Admin Panel, Next.js Blank, or Vite Blank)
2. Enter a project name
3. Select a primary color (hex format, e.g., #4C3AFF)
4. Select a primary color for dark mode
5. Choose a base border radius
6. Select sans-serif and monospace font families
7. Optionally include Storybook configuration (Next.js only)

## Available Templates

### SaaS Dashboard
Complete SaaS dashboard with analytics, charts, and pre-built components. Perfect for web applications.

### Marketing Site
Marketing website template with landing page, CTA sections, and responsive design. Ideal for product marketing.

### Admin Panel
Admin interface template with data tables, forms, and management components. Great for admin dashboards.

### Next.js Blank
Full-stack React framework with Server Components, optimal for production applications.

### Vite Blank
Fast lightweight bundler with React, ideal for rapid development and quick builds.

## Features

Each template includes:
- **TypeScript** configured and ready to use
- **ESLint** for code quality
- **Tailwind CSS** with design tokens
- **Design System Integration** with @launchapp/design-system
- **Next.js/Vite Config** pre-configured for design system
- **Dark Mode Support** out of the box

## Customization

After scaffolding, you can customize your theme by:

1. **Edit colors and tokens**: Modify `src/styles/globals.css`
2. **Adjust fonts and spacing**: Update `tailwind.config.ts`
3. **Configure Tailwind**: Customize `tailwind.config.ts`
4. **Add ESLint rules**: Modify `.eslintrc.json`

## Community Themes

Install pre-built community themes:

```bash
npx @launchapp/create-design-system add <theme-id>
npx @launchapp/create-design-system list
```

Available themes:
- `dracula` - Dracula color scheme
- `nord` - Nord color palette
- `gruvbox` - Gruvbox theme

## Next Steps After Creating Your Project

```bash
cd my-app
npm install
npm run dev
```

## Project Structure

The scaffolded project includes:

```
my-app/
├── src/
│   ├── components/    # Your components
│   ├── styles/        # Global styles and themes
│   ├── app.tsx        # (Vite) Main app component
│   └── main.tsx       # (Vite) Entry point
├── app/               # (Next.js) App router
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Dependencies
└── .eslintrc.json     # ESLint configuration
```

## Built-in Design System

- **Radix UI Primitives** for accessible components
- **Tailwind CSS** for styling
- **Design Tokens** for theming
- **Dark Mode Support** out of the box
- **CSS Custom Properties** for dynamic theming

## Development Tools

- **Hot Module Reload** (Next.js dev server / Vite)
- **TypeScript** strict mode by default
- **ESLint** configured for code quality
- **Storybook** optional (Next.js only)

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001  # Use a different port
```

### Dependencies Not Installed
```bash
npm install
```

### TypeScript Errors
```bash
npm run typecheck
```

### ESLint Errors
```bash
npx eslint src --fix
```

## Publishing Your Project

Once ready for production:

```bash
npm run build
npm start  # (Next.js)
npm run preview  # (Vite)
```

## Additional Resources

- [LaunchApp Design System Docs](https://github.com/launchapp-dev/design-system)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Next.js Documentation](https://nextjs.org/)
- [Vite Documentation](https://vitejs.dev/)

## License

MIT

## Support

For issues and questions:
- [GitHub Issues](https://github.com/launchapp-dev/design-system/issues)
- [GitHub Discussions](https://github.com/launchapp-dev/design-system/discussions)
