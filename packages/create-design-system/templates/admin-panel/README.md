# {{projectName}}

A modern admin panel application built with Next.js and the LaunchApp Design System.

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

Open [http://localhost:3000](http://localhost:3000) to view the admin panel.

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard home page
│   └── admin/             # Admin routes (users, settings, etc.)
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

- **Sidebar Navigation**: Clean sidebar navigation for admin pages
- **Responsive Layout**: Mobile-friendly admin interface
- **Design System Components**: Built with LaunchApp Design System
- **Dark Mode Support**: Full dark mode support
- **TypeScript**: Fully typed for safety
- **Tailwind CSS**: Utility-first CSS for rapid styling
- **ESLint**: Code quality linting
- **User Management**: Basic user management table interface

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Building the Admin Interface

### Adding New Pages

Create new admin pages in the `app/admin/` directory:

```tsx
// app/admin/users/page.tsx
export default function UsersPage() {
  return <div>Users Management</div>;
}
```

Then add a navigation link in the sidebar (in `app/page.tsx`):

```tsx
<NavItem label="Users" href="/admin/users" />
```

### Using Components

Import components from the design system:

```tsx
import { Button, Card, Table, Badge } from "@launchapp/design-system";
```

## Customization

### Changing Colors

Edit the color tokens in `src/styles/globals.css`:

```css
:root {
  --la-primary: 240 5.9% 10%;
  /* ... other tokens ... */
}
```

### Changing the Sidebar

The sidebar is located in `app/page.tsx`. You can customize it by:
1. Adding/removing navigation links
2. Changing the width (default is `w-64`)
3. Modifying the styling

### Changing Fonts

Update the font configuration in `src/styles/globals.css` and `tailwind.config.ts`.

## Building Features

### Tables

Create data tables using the design system:

```tsx
<table className="w-full">
  <thead>
    <tr>
      <th className="text-left px-6 py-3">Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="px-6 py-4">Data</td>
    </tr>
  </tbody>
</table>
```

### Cards and Stats

Display statistics in cards:

```tsx
<Card className="p-6">
  <p className="text-sm text-muted-foreground">Label</p>
  <p className="text-3xl font-bold mt-2">1,234</p>
</Card>
```

### Authentication

To add authentication:

1. Install an auth library (NextAuth.js, Supabase, etc.)
2. Create an auth layout that protects admin routes
3. Update the user display in the top bar

## Community Themes

Install pre-built themes:

```bash
npx @launchapp/create-design-system add dracula
# or nord, gruvbox
```

Then import in `src/styles/globals.css`:

```css
@import './themes/dracula.css';
```

## Deployment

Build for production:

```bash
npm run build
npm start
```

### Vercel

```bash
vercel deploy
```

### Other Platforms

The application can be deployed to any Node.js hosting platform.

## Resources

- [LaunchApp Design System](https://github.com/launchapp-dev/design-system)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://radix-ui.com)

## License

MIT
