# 🎨 EarnStack Design System Documentation

## 📋 Table of Contents
1. [Color Palette](#color-palette)
2. [Components](#components)
3. [Validation](#validation)
4. [Theming](#theming)
5. [Responsive Design](#responsive-design)
6. [Best Practices](#best-practices)

---

## 🎨 Color Palette

### Primary Colors (Maximum 3)

#### 1. Purple (Primary Brand)
- `primary-500`: Main brand color (#a855f7)
- Use for: Primary buttons, links, highlights
- Available shades: 50-900

#### 2. Blue (Secondary Brand)
- `secondary-500`: Secondary actions (#3b82f6)
- Use for: Secondary buttons, info states
- Available shades: 50-900

#### 3. Emerald (Accent/Success)
- `accent-500`: Success and positive actions (#10b981)
- Use for: Success messages, CTAs
- Available shades: 50-900

#### Neutrals
- `neutral-*`: Gray scale for text, backgrounds, borders
- Available shades: 50-950

---

## 🧩 Components

### Button

**Import:**
```jsx
import { Button } from '@/components/ui';
```

**Variants:**
- `primary` - Gradient primary button (default)
- `secondary` - Solid blue button
- `accent` - Solid emerald button
- `outline` - Outlined button
- `ghost` - Transparent button
- `danger` - Red danger button

**Sizes:**
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

**Props:**
- `loading` - Show loading spinner
- `disabled` - Disable button
- `fullWidth` - Full width button
- `leftIcon` / `rightIcon` - Add icons

**Example:**
```jsx
<Button variant="primary" size="md" loading={false}>
  Submit
</Button>

<Button variant="outline" leftIcon={<Icon />}>
  With Icon
</Button>
```

---

### Card

**Import:**
```jsx
import { Card } from '@/components/ui';
```

**Variants:**
- `base` - Standard card (default)
- `hover` - Card with hover effect
- `glass` - Glassmorphism card

**Example:**
```jsx
<Card variant="hover">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

---

### Input

**Import:**
```jsx
import { Input } from '@/components/ui';
```

**Types:**
- `text`, `email`, `password`, `number`, `tel`, `url`, `date`

**States:**
- `error` - Show error state
- `success` - Show success state

**Props:**
- `label` - Input label
- `required` - Required field indicator
- `leftIcon` / `rightIcon` - Add icons

**Example:**
```jsx
<Input
  label="Email Address"
  type="email"
  name="email"
  placeholder="you@example.com"
  required
  error={errors.email}
/>
```

---

### Modal

**Import:**
```jsx
import { Modal } from '@/components/ui';
```

**Sizes:**
- `sm`, `md` (default), `lg`, `xl`, `2xl`

**Props:**
- `isOpen` - Control visibility
- `onClose` - Close handler
- `title` - Modal title
- `footer` - Footer content
- `closeOnBackdrop` - Close on backdrop click
- `showCloseButton` - Show close button

**Example:**
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </>
  }
>
  <p>Are you sure?</p>
</Modal>
```

---

### Loaders

**Import:**
```jsx
import { Spinner, PulseLoader, PageLoader } from '@/components/ui';
```

**Spinner Sizes:**
- `sm`, `md` (default), `lg`

**Examples:**
```jsx
<Spinner size="md" />
<PulseLoader />
<PageLoader message="Loading your dashboard..." />
```

---

### Skeleton

**Import:**
```jsx
import { Skeleton, SkeletonText, CardSkeleton } from '@/components/ui';
```

**Examples:**
```jsx
<SkeletonText lines={3} />
<CardSkeleton />
```

---

## ✅ Validation

**Import:**
```jsx
import { validateEmail, validatePassword, validateRequired } from '@/utils/validation';
```

**Available Validators:**
- `validateEmail(email)` - Email validation
- `validatePassword(password)` - Password strength validation
- `validateRequired(value, fieldName)` - Required field
- `validateURL(url)` - URL validation
- `validatePhone(phone)` - Phone number validation
- `validateNumber(value, min, max)` - Number validation
- `validateMatch(value1, value2)` - Match validation

**Example:**
```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  
  if (emailError || passwordError) {
    setErrors({ email: emailError, password: passwordError });
    return;
  }
  
  // Proceed with submission
};
```

---

## 🌗 Theming

### Setup Theme Provider

**In your App.jsx or main.jsx:**
```jsx
import { ThemeProvider } from './providers/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Use Theme Hook

```jsx
import { useTheme } from '../providers/ThemeProvider';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Theme Toggle Component

```jsx
import ThemeToggle from './components/Shared/ThemeToggle';

<ThemeToggle />
```

---

## 📱 Responsive Design

### Breakpoints
- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

---

## ✨ Best Practices

### 1. **Consistent Spacing**
Use predefined spacing classes:
```jsx
<div className="p-6">  {/* Same padding everywhere */}
<div className="gap-4"> {/* Consistent gaps */}
```

### 2. **Same Component Patterns**
Always use design system components:
```jsx
// ❌ Don't
<button className="bg-blue-500 px-4 py-2">Click</button>

// ✅ Do
<Button variant="primary">Click</Button>
```

### 3. **Form Validation**
Always validate forms before submission:
```jsx
const emailError = validateEmail(formData.email);
if (emailError) {
  setErrors({ email: emailError });
  return;
}
```

### 4. **Loading States**
Show feedback during async operations:
```jsx
<Button loading={isLoading}>
  {isLoading ? 'Submitting...' : 'Submit'}
</Button>
```

### 5. **Dark Mode Awareness**
Use semantic color classes:
```jsx
// ✅ Automatic dark mode support
<div className="bg-white dark:bg-neutral-900">
<p className="text-neutral-900 dark:text-neutral-50">
```

### 6. **Error Messages**
Show clear, user-friendly errors:
```jsx
<Input
  error="Please enter a valid email address"
/>
```

### 7. **No Lorem Ipsum**
Use real, descriptive content:
```jsx
// ❌ Don't
<p>Lorem ipsum dolor sit amet...</p>

// ✅ Do
<p>Complete tasks and earn rewards on EarnStack</p>
```

---

## 🚀 Quick Start Checklist

- [ ] Wrap app in `<ThemeProvider>`
- [ ] Import components from `@/components/ui`
- [ ] Use validation utilities for forms
- [ ] Apply consistent spacing (p-6, gap-4, etc.)
- [ ] Test in both light and dark modes
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Show loading states for async operations
- [ ] Display validation errors to users
- [ ] Use real content (no placeholders)

---

**Happy Coding! 🎉**
