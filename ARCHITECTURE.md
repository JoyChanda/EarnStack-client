# 🏗️ Component Architecture

## Component Hierarchy

```
App
├── ThemeProvider (Dark/Light Mode Management)
│   ├── AuthProvider (User Authentication)
│   │   └── BrowserRouter (Routing)
│   │       └── Routes
│   │           ├── Home
│   │           ├── Register (✅ Updated with Design System)
│   │           ├── Login
│   │           └── DesignShowcase (✅ Demo Page)
│
└── UI Components Library
    ├── Button (6 variants, 3 sizes)
    ├── Card (3 variants)
    ├── Input (validation states)
    ├── Modal (accessible)
    ├── Loader (3 types)
    └── Skeleton (4 types)
```

## Data Flow

```
User Action
    ↓
Component State Update
    ↓
Validation (utils/validation.js)
    ↓
Error/Success Feedback
    ↓
API Call (if valid)
    ↓
Loading State
    ↓
Success/Error UI Update
```

## Theme System Flow

```
User Toggles Theme
    ↓
ThemeProvider.toggleTheme()
    ↓
Update localStorage
    ↓
Update HTML class (light/dark)
    ↓
CSS Dark Mode Styles Apply
    ↓
All Components Re-render
```

## Component Communication

### Props Down
```jsx
<Input
  label="Email"          // Display
  value={email}          // Controlled
  onChange={handleChange} // Handler
  error={errors.email}   // Validation
  required              // Constraint
/>
```

### Events Up
```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Validate
  const error = validateEmail(value);
  setErrors(prev => ({ ...prev, [name]: error }));
};
```

## Styling Strategy

### 1. Global Styles (`index.css`)
- Base typography
- Color variables
- Component classes (`.btn-primary`, `.card-base`)
- Utility classes

### 2. Tailwind Config (`tailwind.config.js`)
- Custom color palette
- Design tokens
- Spacing scale
- Border radius
- Shadows

### 3. Component Styles
- Use predefined classes
- Dark mode variants
- Responsive utilities

### 4. Inline Overrides (Minimal)
- Only for unique cases
- Always use Tailwind classes
- Never hardcode colors

## File Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI primitives
│   ├── Shared/          # Shared components (ThemeToggle, etc.)
│   └── templates/       # Page templates
├── providers/           # Context providers
├── utils/              # Pure functions (validation, etc.)
├── pages/              # Route pages
└── assets/             # Images, fonts, etc.
```

## Import Aliases Recommendation

Update `vite.config.js` or `jsconfig.json`:
```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"],
      "@/pages/*": ["src/pages/*"]
    }
  }
}
```

Then import like:
```jsx
import { Button } from '@/components/ui';
import { validateEmail } from '@/utils/validation';
```

## Best Practices

### ✅ DO
- Use design system components
- Validate all user inputs
- Show loading states
- Handle errors gracefully
- Use semantic HTML
- Add ARIA labels
- Test in both themes
- Make responsive

### ❌ DON'T
- Hardcode colors
- Skip validation
- Use inline styles
- Ignore accessibility
- Use Lorem ipsum
- Forget error states
- Ignore dark mode
- Assume desktop only

## Performance Tips

1. **Code Splitting**
   ```jsx
   const DesignShowcase = lazy(() => import('./pages/DesignShowcase'));
   ```

2. **Memoization**
   ```jsx
   const MemoizedCard = memo(Card);
   ```

3. **Debounce Validation**
   ```jsx
   const debouncedValidate = debounce(validateEmail, 300);
   ```

4. **Lazy Load Images**
   ```jsx
   <img loading="lazy" src="..." alt="..." />
   ```

## Testing Checklist

- [ ] Light mode works
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Form validation works
- [ ] Error messages show
- [ ] Success states show
- [ ] Loading states work
- [ ] Modal is accessible
- [ ] Keyboard navigation works
- [ ] Screen readers work
- [ ] Theme persists on reload

## Common Patterns

### Form Handling
```jsx
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: null }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate
  const newErrors = {};
  // ... validation logic
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
  setLoading(true);
  try {
    // API call
  } catch (error) {
    setErrors({ general: error.message });
  } finally {
    setLoading(false);
  }
};
```

### Modal Pattern
```jsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="..."
>
  Content
</Modal>
```

### Theme Usage
```jsx
import { useTheme } from '../providers/ThemeProvider';

const { theme, toggleTheme } = useTheme();

<button onClick={toggleTheme}>
  Current: {theme}
</button>
```
