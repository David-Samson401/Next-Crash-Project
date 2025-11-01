# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

### TypeScript
```bash
npx tsc --noEmit     # Type check without emitting files
```

## Project Architecture

### Technology Stack
- **Framework**: Next.js 16 (App Router)
- **React**: v19.2.0
- **TypeScript**: Configured with strict mode
- **Styling**: Tailwind CSS v4 with custom utilities
- **Fonts**: Schibsted Grotesk (headings), Martian Mono (monospace)
- **Analytics**: PostHog (client-side tracking with error capture)
- **UI Components**: shadcn/ui (New York style variant)
- **3D Effects**: OGL library for WebGL-based LightRays component

### Directory Structure
```
app/
├── components/          # Page-specific components (EventCard, Navbar, etc.)
├── layout.tsx          # Root layout with fonts and LightRays background
├── page.tsx            # Home page showing event listings
└── globals.css         # Tailwind + custom utilities and component styles

components/
└── LightRays.jsx       # Reusable WebGL light ray effect component

lib/
├── constants.ts        # Event data (EventItem type and events array)
└── utils.ts            # cn() utility for merging Tailwind classes

public/
├── icons/              # SVG icons for UI elements
└── images/             # Event posters and images
```

### Path Aliases
- `@/*` → Root directory (e.g., `@/lib/constants`, `@/components/LightRays`)

### Key Architectural Patterns

#### Component Organization
- **Page components** live in `app/components/` (co-located with pages)
- **Reusable components** live in root `/components/`
- shadcn/ui components should go in `@/components/ui/` when added

#### Styling Conventions
- **Custom Tailwind utilities** defined in `globals.css`:
  - `flex-center`: Flex with centered items
  - `text-gradient`: Blue gradient text effect
  - `glass`: Glassmorphism effect with backdrop blur
  - `card-shadow`: Standard card shadow
- **Component-specific styles** use nested CSS in `globals.css` with ID/class selectors (e.g., `#event-card`)
- **Color system**: Custom CSS variables for theme colors (blue, light-100/200, dark-100/200, etc.)

#### PostHog Integration
- Initialized in `instrumentation-client.ts` (client-side only)
- Uses proxied endpoints (`/ingest`) configured in `next.config.ts` to avoid ad blockers
- Error tracking enabled in development mode with debug logging
- Requires `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables

#### Type Safety
- Strict TypeScript mode enabled
- Event data strictly typed via `EventItem` interface in `lib/constants.ts`
- Component props should be explicitly typed (interface or type alias)

### Environment Variables
Required in `.env` (not committed to git):
```
NEXT_PUBLIC_POSTHOG_KEY=         # PostHog project key
NEXT_PUBLIC_POSTHOG_HOST=        # PostHog host URL
MONGODB_URI=                      # MongoDB connection string (if database used)
```

## Development Notes

### Adding New Events
Events are managed in `lib/constants.ts` as a typed array. Follow the `EventItem` schema:
```typescript
{
  title: string;
  image: string;        // Path relative to /public
  slug: string;         // URL-friendly identifier
  location: string;     // City, State/Country
  date: string;         // YYYY-MM-DD format
  time: string;         // Human-readable time range
}
```

### Working with LightRays Component
The `LightRays` component uses OGL for WebGL rendering:
- Configurable via props (raysOrigin, color, speed, mouse interaction, etc.)
- Positioned absolutely with z-index -1 as background effect
- Performance-sensitive: be cautious with multiple instances

### ESLint Configuration
Uses Next.js recommended config with TypeScript support. Custom global ignores for `.next/`, `out/`, `build/`, and `next-env.d.ts`.

### When Making Changes
1. Use the shadcn/ui "new-york" style variant when adding UI components
2. Leverage the `cn()` utility from `lib/utils.ts` for conditional Tailwind classes
3. Follow the existing custom utility pattern in `globals.css` for reusable styles
4. Type check with `npx tsc --noEmit` before committing
5. Run `npm run lint` to ensure code quality
