# RTL (Right-to-Left) Support

This design system provides comprehensive RTL (right-to-left) support for languages like Arabic, Hebrew, Farsi, and Urdu.

## Overview

RTL support is built into the design system using:

1. **Logical CSS Properties**: Using `start`/`end` instead of `left`/`right`
2. **RTL-aware Utilities**: Custom utility classes for directional styling
3. **Automatic Icon Flipping**: Icons that need to flip in RTL mode
4. **Direction Hook**: React hook to detect and set text direction

## Usage

### Setting Direction

#### Method 1: Using the DirectionProvider

Wrap your application with the `DirectionProvider` to set the direction globally:

```tsx
import { DirectionProvider } from './components';

function App() {
  return (
    <DirectionProvider defaultDirection="rtl">
      <YourApp />
    </DirectionProvider>
  );
}
```

#### Method 2: Setting the dir attribute

Set the `dir` attribute on the `<html>` or `<body>` element:

```tsx
// In your HTML file
<html dir="rtl" lang="ar">

// Or dynamically in JavaScript
document.documentElement.setAttribute('dir', 'rtl');
```

### Using the useDirection Hook

The `useDirection` hook allows components to react to direction changes:

```tsx
import { useDirection } from './components';

function MyComponent() {
  const direction = useDirection();
  
  return (
    <div>
      Current direction: {direction}
    </div>
  );
}
```

### Setting Direction Programmatically

Use the `useSetDirection` hook to change direction:

```tsx
import { useDirection, useSetDirection } from './components';

function DirectionToggle() {
  const direction = useDirection();
  const setDirection = useSetDirection();
  
  const toggleDirection = () => {
    setDirection(direction === 'ltr' ? 'rtl' : 'ltr');
  };
  
  return (
    <button onClick={toggleDirection}>
      Switch to {direction === 'ltr' ? 'RTL' : 'LTR'}
    </button>
  );
}
```

## RTL-Aware CSS Utilities

The design system provides custom utility classes that automatically adapt to RTL:

### Positioning

Instead of using `left-*` and `right-*`, use logical properties:

| LTR Class | RTL-Aware Class | CSS Property |
|-----------|----------------|--------------|
| `left-0` | `start-0` | `inset-inline-start: 0` |
| `right-0` | `end-0` | `inset-inline-end: 0` |
| `left-4` | `start-4` | `inset-inline-start: 1rem` |
| `right-4` | `end-4` | `inset-inline-end: 1rem` |

### Text Alignment

Use logical text alignment:

| LTR Class | RTL-Aware Class | CSS Property |
|-----------|----------------|--------------|
| `text-left` | `text-start` | `text-align: start` |
| `text-right` | `text-end` | `text-align: end` |

### Margin and Padding

Tailwind CSS already provides logical margin/padding utilities:

| Physical | Logical |
|----------|---------|
| `ml-*` | `ms-*` (margin-start) |
| `mr-*` | `me-*` (margin-end) |
| `pl-*` | `ps-*` (padding-start) |
| `pr-*` | `pe-*` (padding-end) |

### Border Radius

Logical border radius utilities:

| LTR Class | RTL-Aware Class |
|-----------|----------------|
| `rounded-tl-*` | `rounded-ts-*` |
| `rounded-tr-*` | `rounded-te-*` |
| `rounded-bl-*` | `rounded-bs-*` |
| `rounded-br-*` | `rounded-be-*` |

## Flipping Icons

Some icons (like arrows, chevrons) need to flip in RTL mode. Use the `flip-rtl` utility:

```tsx
<svg className="flip-rtl">
  <path d="m9 18 6-6-6-6" />
</svg>
```

Or use the `rtl:rotate-180` modifier:

```tsx
<svg className="rtl:rotate-180">
  <path d="m9 18 6-6-6-6" />
</svg>
```

## Component Support

All components in the design system support RTL:

- ✅ **Navigation**: Breadcrumb, Pagination, NavigationMenu
- ✅ **Forms**: Input, Button, Label, Checkbox, Radio
- ✅ **Layout**: Card, Dialog, Sheet, Tabs
- ✅ **Data Display**: Badge, Avatar, Table, Calendar
- ✅ **Feedback**: Alert, Toast, Tooltip
- ✅ **Media**: Lightbox, VideoPlayer, ImageComparison
- ✅ **Advanced**: Marquee, Carousel, Dock

## Best Practices

### 1. Use Logical Properties

❌ **Don't**:
```tsx
<div className="ml-4 text-right">
  Content
</div>
```

✅ **Do**:
```tsx
<div className="ms-4 text-end">
  Content
</div>
```

### 2. Use Flexbox and Grid

Flexbox and Grid naturally support RTL when you use logical properties:

```tsx
// This automatically reverses in RTL
<div className="flex gap-2">
  <span>First</span>
  <span>Second</span>
</div>
```

### 3. Test with RTL

Always test your components in RTL mode:

```tsx
// In Storybook
export const RTLMode: Story = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.setAttribute('dir', 'rtl');
        return () => document.documentElement.setAttribute('dir', 'ltr');
      }, []);
      return (
        <div className="rtl" dir="rtl">
          <Story />
        </div>
      );
    },
  ],
};
```

### 4. Use the Right Language

Always set the appropriate `lang` attribute:

```html
<html lang="ar" dir="rtl">  <!-- Arabic -->
<html lang="he" dir="rtl">  <!-- Hebrew -->
<html lang="fa" dir="rtl">  <!-- Farsi/Persian -->
<html lang="ur" dir="rtl">  <!-- Urdu -->
```

## Examples

### Arabic Interface

```tsx
<div dir="rtl" lang="ar" className="space-y-4">
  <h1>مرحباً بك</h1>
  <p>هذا مثال على واجهة عربية</p>
  <Button>إرسال</Button>
</div>
```

### Hebrew Interface

```tsx
<div dir="rtl" lang="he" className="space-y-4">
  <h1>ברוכים הבאים</h1>
  <p>זוהי דוגמה לממשק בעברית</p>
  <Button>שלח</Button>
</div>
```

### Dynamic Direction Switching

```tsx
import { useDirection, useSetDirection, Button } from './components';

function BilingualApp() {
  const direction = useDirection();
  const setDirection = useSetDirection();
  
  return (
    <div className="space-y-4">
      <Button 
        onClick={() => setDirection(direction === 'ltr' ? 'rtl' : 'ltr')}
      >
        Switch to {direction === 'ltr' ? 'Arabic' : 'English'}
      </Button>
      
      {direction === 'rtl' ? (
        <div lang="ar">مرحباً بك</div>
      ) : (
        <div lang="en">Welcome</div>
      )}
    </div>
  );
}
```

## Troubleshooting

### Icons Not Flipping

If icons aren't flipping in RTL mode, add the `flip-rtl` class:

```tsx
<svg className="flip-rtl">
  <!-- icon path -->
</svg>
```

### Text Alignment Issues

Replace `text-left`/`text-right` with `text-start`/`text-end`.

### Positioning Problems

Replace `left-*`/`right-*` with `start-*`/`end-*`.

### Components Not Adapting

If a component doesn't adapt to RTL, check if it uses physical properties. Report issues or submit a PR to fix the component.

## Resources

- [MDN: CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [W3C: RTL Guidelines](https://www.w3.org/International/questions/qa-scripts)
- [Tailwind CSS: RTL Support](https://tailwindcss.com/blog/rtl-support-in-tailwind-css-v2)
