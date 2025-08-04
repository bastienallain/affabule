# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.5 application using the App Router, TypeScript, and Tailwind CSS v4. The project was bootstrapped with create-next-app and uses React 19.

## Key Commands

**Development:**
```bash
pnpm run dev       # Start development server with Turbopack
```

**Build & Production:**
```bash
pnpm run build     # Build the application for production
pnpm run start     # Start the production server
```

**Code Quality:**
```bash
pnpm run lint      # Run ESLint to check for code issues
```

## Architecture

**App Router Structure:**
- `/app` - Main application directory using Next.js App Router
  - `layout.tsx` - Root layout with Geist fonts and global styles
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with Tailwind CSS and custom brand color

**Configuration:**
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration with strict mode enabled
- `tailwind.config.js` - Tailwind CSS v4 configuration (PostCSS-based)
- `eslint.config.mjs` - ESLint configuration

**Key Features:**
- TypeScript with strict mode
- Path alias: `@/*` maps to root directory
- Tailwind CSS v4 with PostCSS
- Geist and Geist Mono fonts from Google Fonts
- Dark mode support (CSS classes)
- Custom brand color: `rgba(184, 157, 79, 1)` available as `bg-brand`, `text-brand`, etc.

**Key Dependencies:**
- `@splidejs/react-splide` - Used for sliders and carousels
- `@headlessui/react` - Unstyled, accessible UI components
- `@heroicons/react` - SVG icons
- `next-seo` - SEO management library (installed but using Next.js native metadata API)

## SEO Configuration

**SEO Setup:**
- Metadata configured in `/app/layout.tsx` using Next.js native Metadata API
- Default SEO config also available in `/config/seo.config.ts` for reference
- Sitemap automatically generated at `/sitemap.xml` via `/app/sitemap.ts`
- Robots.txt configured at `/robots.txt` via `/app/robots.ts`

**SEO Best Practices:**
- Use `export const metadata` in page files to override default metadata
- Title template: `%s | Affabule`
- Default Open Graph image: `/og-image.jpg` (1200x630)
- Theme color: `#B89D4F` (brand color)

## Development Guidelines

When modifying this codebase:
1. Follow the existing App Router patterns for new pages/components
2. Use TypeScript strict mode - ensure all types are properly defined
3. Style components using Tailwind CSS utility classes
4. Place new pages/routes in the `/app` directory following Next.js conventions
5. Use the `@/` import alias for absolute imports from the project root
6. For page-specific SEO, export a `metadata` object in the page file