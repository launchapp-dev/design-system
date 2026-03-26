# @launchapp/create-app

A CLI tool to scaffold complete applications with the LaunchApp design system pre-integrated.

## Features

- **Interactive Template Selection**: Choose from three professionally designed templates
- **Pre-configured Design System**: LaunchApp design tokens and Tailwind CSS setup
- **Multiple Templates**:
  - **SaaS Dashboard**: Complete dashboard UI with authentication flow, data tables, forms, and visualizations
  - **Marketing Site**: Landing page with hero section, features, pricing, testimonials, and footer
  - **Admin Panel**: Admin interface with sidebar navigation, settings, user management, and analytics
- **Dark Mode Support**: Built-in dark mode with CSS custom properties
- **Production Ready**: Professional structure ready for immediate development
- **TypeScript**: Full TypeScript support out of the box
- **Next.js**: Modern app router with server components support

## Installation

The package is available as a standalone CLI:

```bash
npx @launchapp/create-app
```

Or as a local package in the monorepo:

```bash
npm run create-app
pnpm create-app
```

## Usage

Run the CLI to start the interactive scaffolding process:

```bash
npx @launchapp/create-app
```

You'll be prompted to:
1. Select a template (SaaS Dashboard, Marketing Site, or Admin Panel)
2. Enter your project name

The CLI will then scaffold your project with:
- Pre-configured Next.js setup
- Tailwind CSS with design tokens
- Global styles with light/dark mode support
- Complete template-specific pages and components
- Ready-to-run development environment

## Next Steps After Scaffolding

```bash
cd your-project-name
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see your new application.

## Templates Overview

### SaaS Dashboard

A complete dashboard application template including:
- Authentication pages (login/signup)
- Dashboard with metric cards
- Responsive sidebar navigation
- Data visualizations
- Forms and form validation
- Responsive design for mobile and desktop

### Marketing Site

A professional marketing website template including:
- Hero section with call-to-action
- Features showcase
- Pricing table
- Testimonials section
- Footer with links
- Responsive navigation
- SEO-friendly structure

### Admin Panel

A comprehensive admin interface template including:
- Sidebar navigation
- Top header with search
- Statistics dashboard
- Data table with user management
- Settings panel
- Responsive layout
- Admin-specific components

## Customization

### Design Tokens

Each template includes pre-configured design tokens in `src/styles/globals.css`:
- Color scheme (background, foreground, primary, secondary, etc.)
- Border radius
- Font families

You can customize these by editing the CSS custom properties.

### Tailwind Configuration

The `tailwind.config.ts` is pre-configured to use LaunchApp design tokens but can be extended with additional utilities and components.

### Components

All templates come pre-integrated with LaunchApp design system components available from `@launchapp/design-system`.

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use, you can run:

```bash
npm run dev -- -p 3001
```

### Missing Dependencies

If you encounter missing dependency errors, ensure you've run `npm install` in your project directory.

## Contributing

To add new templates or improve existing ones, please refer to the templates directory structure and follow the same patterns.

## License

MIT
