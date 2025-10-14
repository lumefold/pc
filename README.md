# Windows 11 Clone - Portfolio Edition

A pixel-perfect recreation of the Windows 11 user interface built as an interactive web portfolio. Experience the full Windows 11 desktop environment with draggable windows, virtual desktops, widgets, and more—all running in your browser.

## ✨ Features

### Core Windows 11 Experience
- **Centered Taskbar** - Windows 11-style centered taskbar with pinned apps and system tray
- **Start Menu** - Grid of pinned applications with search functionality
- **Window Management** - Fully draggable, resizable windows with minimize/maximize/close controls
- **Virtual Desktops** - Create, switch, and manage multiple desktops (Win+Tab)
- **Snap Layouts** - Snap windows to screen edges with visual overlay previews
- **Notification Center** - Toast notifications and notification history (Win+A)
- **Quick Settings** - System controls for WiFi, volume, brightness, and theme (click system tray)
- **Widgets Panel** - Weather, news, calendar, and notes widgets (Win+W)
- **Alt+Tab Switcher** - Quick app switching with visual preview

### Portfolio Applications
- **Portfolio Window** - Showcase your work and projects
- **Resume** - Professional resume viewer
- **Projects Gallery** - Browse your project portfolio
- **About Page** - Personal information and bio
- **File Explorer** - Navigate folders and files
- **Terminal** - Functional command-line interface
- **System Settings** - Personalization, system, and notification settings

### Advanced Features
- **Keyboard Shortcuts** - Full keyboard navigation support
- **Theme System** - Light/Dark mode with accent color customization
- **localStorage Persistence** - Saves theme, desktop layouts, and preferences
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Adapts to desktop, tablet, and mobile
- **Acrylic Materials** - Windows 11 blur and transparency effects
- **Context Menus** - Right-click desktop for options

## 🚀 Quick Start

### Running on Replit

This project is designed to run seamlessly on Replit:

1. Click the "Run" button at the top
2. The application will start automatically
3. Open the webview to see the Windows 11 interface

### Running Locally

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <project-name>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5000
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Win` or `Ctrl+Esc` | Toggle Start Menu |
| `Win+A` | Open Notification Center |
| `Win+W` | Open Widgets Panel |
| `Win+Tab` | Open Virtual Desktops |
| `Alt+Tab` | Switch between apps |
| `Win+←` | Snap window left |
| `Win+→` | Snap window right |
| `Win+↑` | Maximize window |
| `Win+↓` | Minimize/Restore window |
| `Esc` | Close active overlay |

*Note: On macOS, use `Cmd` instead of `Win` key*

## 🎨 Theming

The application supports extensive theming options:

- **Light/Dark Mode** - Toggle in Settings → Personalization
- **Accent Colors** - 5 preset accent colors (blue, purple, green, orange, red)
- **Custom Styling** - See [THEMING.md](./THEMING.md) for customization guide

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand state management
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities
│   └── index.css           # Global styles and theme
├── server/                 # Express server
├── THEMING.md             # Theming documentation
└── README.md              # This file
```

## 🧩 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Drag & Drop**: Custom implementation
- **Build Tool**: Vite
- **Server**: Express.js

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Component Development

Components are organized by feature:

- **Window Components**: `*Window.tsx` - Application windows
- **UI Components**: `Desktop.tsx`, `Taskbar.tsx`, `StartMenu.tsx`
- **Feature Components**: `VirtualDesktops.tsx`, `WidgetsPanel.tsx`
- **Example Components**: `components/examples/*` - Isolated component demos

## 🧪 Testing

The application includes data-testid attributes for E2E testing with Playwright:

```typescript
// Example test
await page.click('[data-testid="button-start"]');
await page.click('[data-testid="app-settings"]');
```

### Test Plan

1. **Window Management**
   - Open/close windows
   - Drag and resize
   - Minimize/maximize
   - Snap to edges

2. **Virtual Desktops**
   - Create new desktop
   - Switch between desktops
   - Delete desktop

3. **Keyboard Navigation**
   - Win key for Start Menu
   - Win+Tab for desktops
   - Alt+Tab for app switching
   - Win+Arrow for snapping

4. **Theming**
   - Toggle light/dark mode
   - Change accent color
   - Verify persistence

## ⚠️ Known Limitations

- **No Real File System** - File Explorer is simulated with mock data
- **No OS Integration** - Cannot access real system features
- **Browser Only** - Runs entirely in the browser sandbox
- **No Multi-Monitor** - Single display support only
- **Mock Data** - Portfolio content uses placeholder data

## 🎯 Future Enhancements

- [ ] Drag-to-pin taskbar functionality
- [ ] Window snapping with multi-monitor simulation
- [ ] More widget types
- [ ] File Explorer with full CRUD operations
- [ ] More sample applications
- [ ] Mobile gesture support
- [ ] PWA support for installation

## 📝 License

This project is for educational and demonstration purposes. Windows and Windows 11 are trademarks of Microsoft Corporation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a web-based recreation inspired by Windows 11. It is not affiliated with or endorsed by Microsoft Corporation.
