# Copilot Instructions for my-portfolio

This is a personal portfolio website built with **Next.js 16 + React 19** using the App Router, styled with **Tailwind CSS 4**, and enhanced with **TypeScript 5** for type safety.

## Tech Stack & Architecture

- **Framework**: Next.js 16.1.6 (latest App Router)
- **Styling**: Tailwind CSS 4 + PostCSS 4 with custom Tailwind plugins
- **Type System**: TypeScript 5 with strict mode enabled
- **UI Pattern**: Component-based with Next.js Link for client-side navigation
- **Color Scheme**: Dark theme (neutral-950/neutral-900) with yellow-500/orange-500 accents

The project structure follows Next.js conventions: `app/` contains all routes (Home, About, Demo), with a root `layout.tsx` that defines shared navigation and footer.

## Key Conventions & Patterns

### 1. **Page Organization**
- Root `layout.tsx` provides fixed navbar and footer (shared across all pages)
- Each route (/, /about, /demo) has its own `page.tsx` in subdirectories
- Pages in `app/page.tsx` and `app/about/page.tsx` are server components by default
- Client components (interactive content) explicitly declare `"use client"` (e.g., `app/page.tsx`, `app/demo/page.tsx`)

### 2. **Styling Standards**
- Use Tailwind utility classes exclusively—no custom CSS in component files
- Dark theme default: background `bg-neutral-950`, text `text-white`
- Accent colors: `yellow-500` (primary hover state) and `orange-500` (gradients)
- Border styling: `border-neutral-800` for dark mode, `border-slate-200` for light mode
- Responsive patterns: `grid-cols-1 md:grid-cols-2` for mobile-first grid layouts
- Glassmorphism: use `backdrop-blur-md` + `bg-neutral-900/80` for overlays

### 3. **Data Patterns**
- Static data (projects, stats) defined in-component using TypeScript interfaces (see `page.tsx` project card pattern)
- Example type definition: `type Project = { title: string; description: string; tags: string[]; image: string; }`
- Use `.map()` to render arrays with `key={index}` for simple lists
- All external images use unsplash URLs (format: `https://images.unsplash.com/...`)

### 4. **Navigation & Links**
- Use Next.js `Link` component for internal routing (fast client-side transitions)
- Comment included in layout: "Required for fast page switching"
- External links use standard `<a>` tags with `target="_blank"`
- Navigation navbar is fixed, floats with `z-50`, includes hover states on items

### 5. **Component Composition**
- Root layout wraps children with padding/spacing (pt-20 for navbar offset)
- Footer in layout is shared across all pages
- Interactive features (theme toggle, popups) managed with React `useState` + `useEffect` hooks
- HSL/gradient text effects: `bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent`

## Build & Development Commands

```bash
npm run dev        # Start dev server (auto-reload, localhost:3000)
npm run build      # Production build
npm run start      # Run production server
npm lint           # Run ESLint (enforces Next.js + TypeScript best practices)
```

- Development server runs on port 3000 by default
- TypeScript strict mode enabled; all files must pass type checks before build
- ESLint includes Next.js core web vitals and TypeScript rules

## Important Implementation Details

### Path Aliases
- `@/*` resolves to workspace root (defined in `tsconfig.json`)
- Example: `@/app/layout.tsx` → imports from root layout

### React 19 Features
- Latest React patterns supported; use hooks for state management
- No need for React.FC wrapper syntax (implicit return types work)

### Next.js Specifics
- App Router only (no Pages directory)
- Server components by default unless `"use client"` declared
- `next/font/google` for automatic font optimization (currently using Inter)
- Metadata exported from root layout

### ESLint Configuration
- Enforces Next.js core web vitals and TypeScript best practices
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`
- Strict type checking required for all changes

## Common Tasks & File Locations

| Task | File | Pattern |
|------|------|---------|
| Add new route | `app/{route}/page.tsx` | Create folder + `page.tsx` |
| Update shared layout | `app/layout.tsx` | Navbar, footer, fonts |
| Add project card | `app/page.tsx` | Extend `projects` array + TypeScript type |
| Style component | Any `.tsx` | Use Tailwind classNames, no CSS files |
| Global styles | `app/globals.css` | Minimal—Tailwind handles most styling |

## Critical Notes

1. **Mobile-first approach**: Developer works on mobile devices; test responsive design
2. **Dark mode dominant**: Default dark theme with optional light mode in demo page only
3. **No external state management**: Use React hooks (`useState`, `useEffect`) for component state
4. **Metadata**: Portfolio brand is "Thrilshadow | Freelance Developer"—update metadata when adding new routes
5. **Image optimization**: Next.js automatically optimizes images; use full URLs for external sources

---

## Questions or Additions?

If you discover patterns or workflows not documented here, update this file to keep guidance fresh.
