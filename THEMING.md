# Theming Guide

This document explains how the Windows 11 clone UI theming system works and how to customize it.

## Theme Architecture

The application uses a CSS custom properties-based theming system with support for light and dark modes.

## Color System

### Base Colors (defined in `client/src/index.css`)

The theme uses HSL color values stored as CSS custom properties in the `:root` selector:

```css
:root {
  --background: 0 0% 100%;          /* Main background */
  --foreground: 222.2 84% 4.9%;     /* Main text color */
  
  --card: 0 0% 100%;                /* Card backgrounds */
  --card-foreground: 222.2 84% 4.9%;
  --card-border: 0 0% 89.8%;        /* Card borders */
  
  --popover: 0 0% 100%;             /* Popover backgrounds */
  --popover-foreground: 222.2 84% 4.9%;
  --popover-border: 0 0% 89.8%;
  
  --primary: 221.2 83.2% 53.3%;     /* Primary accent color */
  --primary-foreground: 210 40% 98%;
  
  --secondary: 210 40% 96.1%;       /* Secondary colors */
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  --muted: 210 40% 96.1%;           /* Muted backgrounds */
  --muted-foreground: 215.4 16.3% 46.9%;
  
  --accent: 210 40% 96.1%;          /* Accent highlights */
  --accent-foreground: 222.2 47.4% 11.2%;
  
  --destructive: 0 84.2% 60.2%;     /* Error/destructive actions */
  --destructive-foreground: 210 40% 98%;
  
  --border: 214.3 31.8% 91.4%;      /* Default borders */
  --input: 214.3 31.8% 91.4%;       /* Input borders */
  --ring: 221.2 83.2% 53.3%;        /* Focus rings */
  
  --radius: 0.5rem;                 /* Border radius */
}
```

### Dark Mode

Dark mode colors are defined in the `.dark` class:

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --card-border: 217.2 32.6% 17.5%;
  
  /* ... other dark mode colors */
}
```

## Windows 11 Specific Styling

### Acrylic/Blur Effects

Windows 11's signature acrylic material is achieved using:

```css
.bg-card/70 backdrop-blur-2xl
```

This creates a semi-transparent background with a blur effect.

### Rounded Corners

The UI uses consistent border radius values:
- Default: `rounded-md` (0.5rem / 8px)
- Windows: `rounded-md` 
- Buttons: `rounded-md`
- Panels: `rounded-lg` (0.75rem / 12px)

### Shadows

Subtle shadows are used throughout:
- Windows: `shadow-2xl`
- Cards: `shadow-xl`
- Popover: `shadow-xl`

## Customizing the Theme

### 1. Change Accent Color

Edit the primary color in `client/src/index.css`:

```css
--primary: 221.2 83.2% 53.3%;  /* Blue - default */
--primary: 262 83% 58%;        /* Purple */
--primary: 142 76% 36%;        /* Green */
```

Or use the Settings app (Personalization → Accent Color) at runtime.

### 2. Modify Border Radius

Change the radius variable:

```css
--radius: 0.5rem;  /* Default (8px) */
--radius: 0.75rem; /* Larger (12px) */
--radius: 0.25rem; /* Smaller (4px) */
```

### 3. Adjust Blur Strength

Modify backdrop blur classes in components:

```tsx
backdrop-blur-xl   // Less blur
backdrop-blur-2xl  // Default
backdrop-blur-3xl  // More blur
```

### 4. Change Opacity

Adjust background opacity:

```tsx
bg-card/50   // 50% opacity
bg-card/70   // 70% opacity (default)
bg-card/90   // 90% opacity
```

## Elevation System

The theme includes a custom elevation system for hover/active states:

```css
.hover-elevate   /* Elevates background on hover */
.active-elevate-2 /* Elevates background on active/press */
```

These classes automatically adjust colors based on the current theme and work with any background color.

## Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", 
             "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", 
             sans-serif;
```

### Font Sizes

- Title: `text-2xl` (24px)
- Heading: `text-xl` (20px)
- Body: `text-sm` (14px)
- Small: `text-xs` (12px)

## Animations

### Window Animations

```css
.animate-window-open   /* Window open animation */
.animate-slide-up      /* Slide up animation for panels */
```

Animations use framer-motion for smooth transitions:
- Duration: 150-200ms
- Easing: ease-out / ease-in

## Persistence

Theme preferences are persisted to localStorage:

```typescript
localStorage.setItem('theme', 'dark');
localStorage.setItem('accentColor', '#0078d4');
```

The Zustand store also persists:
- Virtual desktop layouts
- Window positions
- Pinned applications

## Responsive Behavior

The theme adapts to different screen sizes:

- Desktop (≥1280px): Full Windows 11 experience
- Tablet (768-1279px): Compact taskbar, modal dialogs
- Mobile (<768px): Full-screen overlays, bottom sheets

## Custom Scrollbars

Windows 11 style scrollbars are implemented:

```css
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 6px;
}
```

## Accessibility

The theme maintains WCAG AA contrast ratios:
- Text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

Focus indicators are clearly visible with the `--ring` color.
