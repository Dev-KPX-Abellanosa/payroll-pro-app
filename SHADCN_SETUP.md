# shadcn/ui Setup for Payroll Pro Web App

## ✅ What's Been Configured

The Next.js web app (`apps/web`) is now fully set up with shadcn/ui components.

### Configuration Files

1. **`apps/web/components.json`** - shadcn/ui configuration
2. **`apps/web/src/lib/utils.ts`** - Utility function for className merging
3. **`apps/web/src/app/globals.css`** - Tailwind CSS with shadcn/ui theme variables
4. **`apps/web/tailwind.config.js`** - Tailwind config with shadcn/ui theme

### Installed Components

The following shadcn/ui components have been added to `apps/web/src/components/ui/`:

- ✅ **Button** - With variants (default, destructive, outline, secondary, ghost, link)
- ✅ **Input** - Form input component
- ✅ **Card** - Card container with header, content, footer
- ✅ **Table** - Data table components
- ✅ **Badge** - Status badges with variants
- ✅ **Label** - Form labels
- ✅ **Dialog** - Modal dialogs
- ✅ **Select** - Dropdown select component
- ✅ **Skeleton** - Loading skeleton component
- ✅ **Loading** - Loading spinner component

### Dependencies Added

- `class-variance-authority` - For component variants
- `@radix-ui/react-dialog` - Dialog primitives
- `@radix-ui/react-label` - Label primitives
- `@radix-ui/react-select` - Select primitives
- `@radix-ui/react-slot` - Slot component
- `lucide-react` - Icon library
- `tailwindcss-animate` - Animation utilities

### Updated Components

All existing components have been updated to use shadcn/ui:

- ✅ Login page - Uses Button, Input, Card, Label
- ✅ Dashboard page - Uses Card components
- ✅ Employees list - Uses Table, Button, Badge
- ✅ Sidebar - Uses shadcn/ui styling
- ✅ Header - Uses Button component

## 🎨 Usage

### Import Components

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
```

### Using the cn() Utility

```tsx
import { cn } from '@/lib/utils'

<div className={cn("base-classes", condition && "conditional-classes")} />
```

### Component Variants

```tsx
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Badge variants
<Badge variant="default">Default</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="destructive">Error</Badge>
```

## 📦 Adding More Components

To add more shadcn/ui components, you can:

1. **Use the CLI** (recommended):
```bash
cd apps/web
npx shadcn-ui@latest add [component-name]
```

2. **Manual installation**: Copy the component code from [shadcn/ui](https://ui.shadcn.com) and place it in `apps/web/src/components/ui/`

### Available Components to Add

- `form` - Form components with react-hook-form
- `dropdown-menu` - Dropdown menus
- `toast` - Toast notifications
- `alert` - Alert messages
- `tabs` - Tab navigation
- `sheet` - Side sheet/drawer
- `avatar` - User avatars
- `calendar` - Date picker
- `data-table` - Advanced data tables

## 🎨 Customization

### Theme Colors

Edit `apps/web/src/app/globals.css` to customize colors:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### Component Styling

All components use Tailwind CSS and can be customized by:
- Passing `className` prop
- Modifying component source files
- Using CSS variables for theme colors

## 🚀 Next Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add more components as needed:**
   ```bash
   cd apps/web
   npx shadcn-ui@latest add form
   npx shadcn-ui@latest add toast
   ```

3. **Start development:**
   ```bash
   npm run dev:web
   ```

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

