# Design Guidelines: Windows 11-Style Portfolio Clone

## Design Approach

**Reference-Based: Windows 11 Fluent Design System**

This portfolio website recreates the Windows 11 desktop experience as a web interface. The design draws directly from Microsoft's Fluent Design System, specifically Windows 11's aesthetic principles:
- Acrylic material effects with background blur
- Rounded corners (8px radius standard)
- Mica material for taskbar and windows
- Subtle depth through shadows and layering
- Light/dark mode support with system-aware theming

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Background: `0 0% 98%` (desktop wallpaper overlay)
- Surface (Windows/Taskbar): `0 0% 100%` with 70% opacity backdrop blur
- Primary Accent: `213 94% 55%` (Windows blue)
- Text Primary: `0 0% 13%`
- Text Secondary: `0 0% 38%`
- Border/Divider: `0 0% 0%` at 8% opacity

**Dark Mode:**
- Background: `0 0% 7%` (desktop wallpaper overlay)
- Surface (Windows/Taskbar): `0 0% 15%` with 60% opacity backdrop blur
- Primary Accent: `213 94% 62%`
- Text Primary: `0 0% 100%`
- Text Secondary: `0 0% 78%`
- Border/Divider: `0 0% 100%` at 12% opacity

**Accent States:**
- Hover: Accent color at 90% opacity
- Active: Accent color at 80% opacity
- Disabled: Text secondary at 40% opacity

### B. Typography

**Font Stack:**
```
Primary: 'Segoe UI Variable', 'Segoe UI', system-ui, -apple-system, sans-serif
```

**Type Scale:**
- Window Title: 12px, weight 600
- Body Text: 14px, weight 400
- Menu Items: 13px, weight 400
- App Labels: 11px, weight 500
- Desktop Icons: 11px, weight 400
- System Tray: 11px, weight 400

### C. Layout System

**Spacing Units:** Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16
- Taskbar height: h-16 (64px)
- Window padding: p-0 (custom inner spacing)
- App icon spacing: gap-1 to gap-2
- Desktop grid: gap-4 for icon layout
- Window title bar: h-8 (32px)

**Grid System:**
- Desktop icons: CSS Grid with auto-fill
- Start Menu apps: grid-cols-6 (desktop), grid-cols-4 (tablet)
- Taskbar: Flexbox with space-between
- Window content: Flexbox column layout

### D. Component Library

**1. Taskbar**
- Fixed bottom position with backdrop blur
- Centered app icons with pill-shaped active indicator below
- Start button (Windows logo) at left
- System tray (clock, volume, network) at right
- Search box with rounded corners and subtle border
- Hover states: Background fill with accent color at 8% opacity

**2. Desktop Windows**
- Draggable title bar with app icon, title, and window controls
- Resizable borders (minimum size constraints)
- Shadow: `0 8px 16px rgb(0 0 0 / 0.14)`
- Border: 1px solid at 12% opacity
- Title bar controls (minimize, maximize, close) with circular hover states
- Content area with appropriate padding per app type

**3. Start Menu**
- Positioned bottom-left above taskbar
- Rounded corners (12px)
- Backdrop blur with acrylic material
- Sections: Pinned apps (grid), Recommended (list), User profile footer
- Search bar at top with rounded input
- App icons: 48x48px with 8px spacing
- Shadow: `0 8px 32px rgb(0 0 0 / 0.24)`

**4. Desktop Icons**
- Vertical text-below-icon layout
- Icon size: 48x48px
- Label max-width with ellipsis
- Selection state: Subtle background with border
- Double-click to open window

**5. Context Menus**
- Right-click activated
- Rounded corners (8px)
- Backdrop blur surface
- Menu items with left icon, text, right shortcut
- Hover: Light fill (8% accent or white/black)
- Dividers between logical groups

**6. Window Controls**
- Minimize: Horizontal line icon
- Maximize/Restore: Square/Double square icon
- Close: X icon with red hover (rgb(232 17 35))
- Button size: 32x32px
- Hover backgrounds: Subtle fill except close (red)

### E. Visual Effects & Animations

**Acrylic/Mica Materials:**
- Taskbar: `backdrop-blur-xl` with `bg-white/70` (light) or `bg-neutral-900/60` (dark)
- Windows: `backdrop-blur-2xl` with surface colors
- Start Menu: `backdrop-blur-3xl`

**Transitions (CSS-based, minimal framer-motion):**
- Window open: Scale from 0.95 to 1, opacity 0 to 1, 200ms ease-out
- Window close: Scale to 0.95, opacity to 0, 150ms ease-in
- Taskbar hover: Background transition 120ms
- Menu open: Slide up 150ms with fade
- Context menu: Scale 0.95→1 with opacity, 100ms

**Interactive States:**
- Focus rings: 2px accent color with 3px offset
- Hover elevations: No elevation change, only background fill
- Active window: Slightly brighter title bar

### F. Responsive Adaptations

**Desktop (1024px+):**
- Full Windows 11 desktop experience
- Multi-window support with drag/resize
- Start menu bottom-left positioned
- Desktop icons in grid layout

**Tablet (768px-1023px):**
- Taskbar remains at bottom
- Single active window (full screen)
- Start menu centered
- Simplified window controls

**Mobile (<768px):**
- Transform to mobile-first navigation
- Taskbar becomes bottom nav with key apps only
- Windows become full-screen modals
- Start menu as slide-up drawer
- Desktop icons in vertical scrollable list

### G. Content Windows

**Portfolio Window:**
- Gallery grid of project cards
- Card hover: Subtle lift with shadow increase
- Click to expand project details in modal/panel

**Resume Window:**
- Two-column layout (sidebar + content)
- Section headers with accent color underline
- Download button in title bar

**Projects Window:**
- List/grid toggle view
- Filter chips at top
- Project cards with image, title, description, tech stack tags

**About/Contact:**
- Centered content layout
- Social links with icon buttons
- Contact form with Windows-style inputs (subtle borders, focus accent)

## Images

**Desktop Wallpaper:**
- Large hero background image covering entire viewport
- Windows 11 style abstract gradient or nature scene
- Slightly blurred to not compete with UI elements
- Dark overlay (10-20% black) for better contrast

**App Icons:**
- 48x48px or 64x64px high-quality icons
- Consistent style (realistic or flat matching Windows 11)
- Use actual logos for known apps (VS Code, GitHub, Figma, etc.)

**Project Thumbnails:**
- 16:9 aspect ratio recommended
- High quality screenshots or mockups
- Consistent treatment across portfolio items

**Profile Picture:**
- Circular avatar in Start Menu user section
- Size: 40x40px with subtle border

This design system ensures pixel-perfect recreation of the Windows 11 aesthetic while maintaining web-native performance and accessibility standards.