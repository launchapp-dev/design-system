# @launchapp/ds

CLI tool to scaffold complete applications with the LaunchApp design system pre-integrated.

## Installation

Use directly with npx:

```bash
npx @launchapp/ds create-app
```

## Quick Start

Run the CLI to start scaffolding a new application:

```bash
npx @launchapp/ds create-app
```

You'll be prompted to:
1. Choose an app template (SaaS Dashboard, Marketing Site, or Admin Panel)
2. Enter a project name
3. Select a primary color (hex format, e.g., #4C3AFF)
4. Select a primary color for dark mode
5. Choose a base border radius
6. Select sans-serif and monospace font families
7. Optionally include Storybook configuration

## Available Templates

### SaaS Dashboard
Modern SaaS dashboard application with analytics, user management, and admin panels. Built with Next.js 15+.

### Marketing Site
Beautiful marketing website with conversion-optimized layouts, hero sections, and call-to-action components. Built with Next.js 15+.

### Admin Panel
Powerful admin dashboard for data management with tables, forms, and real-time updates. Built with Next.js 15+.

## Template Features

All templates include:
- **TypeScript** configured and ready to use
- **ESLint** for code quality and consistency
- **Tailwind CSS** with design tokens and theming
- **Design System Integration** with @launchapp/design-system
- **Next.js 15+** with App Router
- **Responsive Design** mobile-first layouts
- **Dark Mode Support** built-in
- **Pre-built Components** ready to customize

## Customization

After scaffolding, you can customize your theme by:

1. **Edit colors and tokens**: Modify `src/styles/globals.css`
2. **Adjust fonts and spacing**: Update `tailwind.config.ts`
3. **Configure Tailwind**: Customize `tailwind.config.ts`
4. **Add ESLint rules**: Modify `.eslintrc.json`

## Community Themes

Install pre-built community themes:

```bash
npx @launchapp/ds add <theme-id>
```

Available themes:
- `dracula` - Dracula color scheme
- `nord` - Nord color palette
- `gruvbox` - Gruvbox theme

List all available themes:

```bash
npx @launchapp/ds list
```

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
├── app/               # Next.js app directory
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── src/
│   ├── components/    # Reusable components
│   └── styles/        # Global styles and design tokens
├── public/            # Static assets
├── next.config.js     # Next.js configuration
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Dependencies
└── README.md          # Setup instructions
```

## Features

### Built-in Design System
- **Radix UI Primitives** for accessible components
- **Tailwind CSS** for styling
- **Design Tokens** for theming
- **Dark Mode Support** out of the box

### Development Tools
- **Hot Module Reload** via Next.js dev server
- **TypeScript** strict mode by default
- **ESLint** configured for code quality
- **Storybook** optional for component development

### Theme System
- Customize colors, fonts, and spacing
- Support for light and dark modes
- Community theme library
- CSS custom properties for dynamic theming

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
npm start
```

## Additional Resources

- [LaunchApp Design System Docs](https://github.com/launchapp-dev/design-system)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Next.js Documentation](https://nextjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

MIT

## Support

For issues and questions:
- [GitHub Issues](https://github.com/launchapp-dev/design-system/issues)
- [GitHub Discussions](https://github.com/launchapp-dev/design-system/discussions)
