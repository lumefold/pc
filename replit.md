# Windows 11 Clone - Portfolio Edition

## Overview

A pixel-perfect recreation of the Windows 11 user interface built as an interactive web portfolio. This project transforms a traditional portfolio website into an immersive desktop operating system experience, featuring draggable windows, virtual desktops, system widgets, and authentic Windows 11 design patterns.

The application serves as both a showcase of technical skills and a functional portfolio platform, allowing visitors to explore projects, view resume information, and interact with various "applications" within a familiar desktop environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Core Framework**: React 18+ with TypeScript in strict mode, using Vite as the build tool for fast development and optimized production builds.

**State Management**: Zustand with persistence middleware for centralized window management, desktop state, and user preferences. The store architecture supports:
- Window lifecycle (open, close, minimize, maximize, restore)
- Z-index management for window focus
- Virtual desktop management with window-to-desktop associations
- Window positioning and snap layouts
- LocalStorage persistence for theme and desktop configurations

**Routing**: Wouter for lightweight client-side routing, though the application primarily operates as a single-page desktop environment.

**UI Component Library**: Radix UI primitives wrapped with custom styling via Tailwind CSS, providing accessible, unstyled components for dialogs, dropdowns, tooltips, and other interactive elements.

**Animation System**: Framer Motion for complex window transitions, panel animations, and micro-interactions. CSS transitions handle simpler effects like hover states.

**Styling Architecture**: 
- Tailwind CSS with custom configuration mapping Windows 11 design tokens
- CSS custom properties for theming (light/dark mode support)
- Backdrop blur and acrylic material effects for authentic Windows 11 aesthetics
- Design system follows Microsoft Fluent Design principles with specific color palettes, border radiuses (8px standard), and elevation patterns

### Key Architectural Patterns

**Window Management System**: Central to the architecture, using Zustand store to manage:
- Each window as a state object with position, size, z-index, desktop association
- Focus management through z-index manipulation
- Snap positions (left/right halves, quadrants, maximize) with visual overlay previews
- Window dragging and resizing (planned, currently basic implementation)

**Virtual Desktop System**: Supports multiple workspaces where:
- Windows are associated with specific desktop IDs
- Desktop switching filters visible windows
- Minimum one desktop constraint prevents deletion of last desktop
- Desktop thumbnails show active window previews

**Component Structure**:
- Window components (Portfolio, Resume, Projects, FileExplorer, Terminal, Settings, About)
- System components (Taskbar, StartMenu, NotificationCenter, QuickSettings, WidgetsPanel)
- Utility components (DesktopIcon, ContextMenu, SearchBox, SystemTray)
- Base Window wrapper with controls for all windowed applications

**Keyboard Shortcuts System**: Custom hook (`useKeyboardShortcuts`) handling:
- Win/Meta key combinations (Win+A for notifications, Win+W for widgets, Win+Tab for desktops)
- Alt+Tab app switcher with visual preview
- Snap shortcuts for window management
- Start menu toggle (Win key or Ctrl+Esc)

### Theme System

**Dual Theme Support**: Light and dark modes with CSS custom properties:
- HSL color values stored as CSS variables in `:root` and `.dark` selectors
- Theme persistence via localStorage
- Accent color customization (blue, purple, green, orange, red)
- Automatic class toggling on `<html>` element

**Design Tokens**:
- Background, foreground, card, popover color families
- Primary, secondary, muted, accent variants
- Destructive actions (errors/warnings)
- Border and input colors with opacity variations
- Elevation layers via backdrop blur and shadow combinations

### Performance Considerations

**Optimization Strategies**:
- Window components lazy load content
- Backdrop blur effects use CSS `backdrop-filter` for hardware acceleration
- Animation frame budgeting with Framer Motion
- Virtual desktop filtering reduces DOM nodes for inactive desktops

**Asset Management**:
- Static wallpaper image imported via Vite asset handling
- Icon components from lucide-react for tree-shakeable imports
- SVG icons from react-icons for brand logos

## External Dependencies

### Core Libraries

**React Ecosystem**:
- `react` & `react-dom` (18+): Core framework
- `wouter`: Lightweight routing (~1.2KB)
- `@tanstack/react-query`: Server state management (currently minimal backend usage)

**State & Data**:
- `zustand`: Global state management with middleware support
- `drizzle-orm`: Type-safe ORM (configured but minimal usage, prepared for future PostgreSQL integration via Neon)
- `@neondatabase/serverless`: Serverless PostgreSQL driver

**UI Components**:
- `@radix-ui/*`: Headless accessible UI primitives (accordion, dialog, dropdown, select, tabs, tooltip, etc.)
- `framer-motion`: Animation library for complex transitions
- `lucide-react`: Icon library (main icon set)
- `react-icons`: Additional icons (brand logos via `react-icons/si`)
- `cmdk`: Command palette component (K-bar style)

**Form Handling**:
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Validation resolvers
- `zod`: Schema validation
- `drizzle-zod`: Zod schema generation from Drizzle schemas

**Styling**:
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Type-safe variant styling
- `clsx` & `tailwind-merge`: Class name utilities
- `autoprefixer`: CSS vendor prefixing

### Backend & Database

**Server Stack**:
- `express`: Web server framework
- `vite`: Development server with HMR, production bundler
- `tsx`: TypeScript execution for Node.js

**Database** (Configured, Minimal Usage):
- `@neondatabase/serverless`: Neon PostgreSQL serverless driver
- `drizzle-orm`: ORM with PostgreSQL dialect
- `drizzle-kit`: Migration tool
- User schema defined in `shared/schema.ts` with username/password fields

**Session Management** (Prepared):
- `connect-pg-simple`: PostgreSQL session store for Express

### Development Tools

**Build & Development**:
- `vite`: Build tool with React plugin
- `@vitejs/plugin-react`: Vite React support
- `esbuild`: Fast JavaScript bundler for server code
- `@replit/vite-plugin-*`: Replit-specific development plugins (runtime error modal, cartographer, dev banner)

**Type Safety**:
- `typescript`: Static type checking in strict mode
- Path aliases configured: `@/*` → `client/src/*`, `@shared/*` → `shared/*`

### UI Enhancement Libraries

**Additional Components**:
- `embla-carousel-react`: Carousel/slider component
- `date-fns`: Date manipulation and formatting
- `react-day-picker`: Calendar/date picker component

### Notable Architectural Decisions

1. **No Real Backend Logic**: The Express server is configured but minimal, serving as a placeholder for future API routes. Storage interface defined but uses in-memory implementation.

2. **Database Schema Present, Unused**: Drizzle ORM configured with PostgreSQL and Neon, but application currently operates client-side only. Schema includes basic user table (id, username, password).

3. **Component-First Architecture**: Each "application" (Portfolio, Resume, Terminal, etc.) is a self-contained React component wrapped in a Window component for consistent chrome.

4. **Accessibility Focus**: Radix UI primitives ensure keyboard navigation, screen reader support, and ARIA attributes throughout.

5. **Replit Optimized**: Includes Replit-specific Vite plugins for enhanced development experience on the platform.

6. **Prepared for Database Migration**: While currently client-only, the architecture supports adding PostgreSQL persistence via the configured Drizzle setup and `db:push` script.