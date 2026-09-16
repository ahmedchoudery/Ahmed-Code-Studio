# Ahmed Code Studio

A dual-audience static portfolio website for **Muhammad Ahmed Raza**, a Full-Stack Web Developer based in Gujrat, Pakistan. The site is engineered to serve two distinct user intents with zero friction: the root route (`/`) provides a lightweight static audience selector; `/client` delivers a calm, content-first landing page with structured case studies and an inline project inquiry form; and `/recruiter` hosts an interactive, cinematic Heads-Up Display (HUD) terminal showcasing technical specifications, project architectures, and skills data.

---

## Routes

| Route | Audience & Purpose | Rendering |
| :--- | :--- | :--- |
| `/` | **Audience Selector**: Clean, lightweight portal directing visitors to project hiring or technical recruiter views. | Static HTML |
| `/client` | **Client Services**: Calm, vertical-scrolling landing page with value proposition, case studies, and contact form. | Static HTML |
| `/client/work/falak-hall-events` | **Case Study**: Full-stack booking and venue management platform case study. | Static HTML (`generateStaticParams`) |
| `/client/work/stop-shop` | **Case Study**: Bespoke editorial e-commerce platform with real-time stock deduction. | Static HTML (`generateStaticParams`) |
| `/recruiter` | **Engineering HUD**: Cinematic Heads-Up Display terminal with project specs, skills matrix, and interactive drawer. | Static HTML + Client Hydration |

---

## Tech Stack

The project runs on a modern, strictly typed TypeScript stack compiled as a full static export (`output: 'export'` in `next.config.mjs`) deployed globally on [Vercel](https://vercel.com/):

- **Framework**: [Next.js](https://nextjs.org/) `^16.2.6` (App Router, Static HTML Export)
- **UI Library**: [React](https://react.dev/) `^19.1.0` & [React DOM](https://react.dev/) `^19.1.0`
- **Language**: [TypeScript](https://www.typescriptlang.org/) `^5.6.3` (Strict Mode)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) `^5.0.12`
- **Animations**: [GSAP](https://greensock.com/gsap/) `^3.14.2`
- **Schema Validation**: [Zod](https://zod.dev/) `^4.3.6`
- **Sanitization**: [DOMPurify](https://github.com/cure53/DOMPurify) `^3.4.0`
- **Analytics & Performance**: [@vercel/speed-insights](https://vercel.com/docs/speed-insights) `^2.0.0`
- **Testing**: [Vitest](https://vitest.dev/) `^4.1.4`, [@testing-library/react](https://testing-library.com/) `^16.3.2`, [JSDOM](https://github.com/jsdom/jsdom) `^29.0.2`

---

## Architecture

The project maintains strict separation between client-facing static content and recruiter-facing HUD components:

```text
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Lightweight static audience selector (/)
│   │   ├── layout.tsx                  # Root layout with fonts, metadata API & GA tag
│   │   ├── globals.css                 # Color tokens, typography, and scoped HUD styles
│   │   ├── not-found.tsx               # Static 404 handler
│   │   ├── client/
│   │   │   ├── page.tsx                # Calm client landing page (/client)
│   │   │   └── work/[slug]/
│   │   │       └── page.tsx            # Static case study routes (/client/work/[slug])
│   │   └── recruiter/
│   │       └── page.tsx                # Interactive HUD portfolio (/recruiter)
│   ├── components/
│   │   ├── ClientContactForm.tsx       # Plain, non-modal client contact form
│   │   ├── ClientHome.tsx              # Core interactive HUD container
│   │   ├── ContactHUD.tsx              # Modal HUD contact interface
│   │   ├── BackgroundSystem.tsx        # HUD ambient background renderer (public/bg_v13.html)
│   │   ├── ProjectDetailDrawer.tsx     # HUD technical specifications drawer
│   │   ├── ProjectDisplay.tsx          # HUD carousel display
│   │   ├── TechnicalSpecs.tsx          # HUD technical skills panel
│   │   └── TopNav.tsx                  # HUD navigation controls
│   ├── data/
│   │   └── projects.ts                 # Portfolio records with Problem/Solution/Result content model
│   ├── lib/
│   │   └── contact.ts                  # Shared Web3Forms submission logic and Zod validation
│   ├── store/
│   │   └── useHUDStore.ts              # Zustand store for HUD views and navigation
│   └── tests/
│       ├── setup.ts                    # Test environment setup and browser API mocks
│       ├── lib/contact.test.ts         # Unit tests for contact submission helper
│       ├── routes/clientIsolation.test.ts # Route isolation guard test
│       ├── app/                        # Route and page unit tests
│       └── components/                 # Component unit tests
├── public/                             # Static assets, sitemap.xml, robots.txt, bg_v13.html
├── next.config.mjs                     # Static export configuration (output: 'export')
├── vitest.config.ts                    # Vitest configuration with path aliases
├── tsconfig.json                       # Strict TypeScript settings
└── package.json                        # Scripts and dependencies
```

### Route Isolation & Guard Testing

To ensure that heavy HUD dependencies (such as HUD modals, canvas elements, or animation controllers) never leak into client routes, an automated isolation guard test runs in CI:

- **[src/tests/routes/clientIsolation.test.ts](src/tests/routes/clientIsolation.test.ts)**: Recursively inspects all files under `src/app/client/` and asserts zero imports or references to HUD-specific modules (`BackgroundSystem`, `ClientHome`, `TopNav`, `ProjectDisplay`, `TechnicalSpecs`, `ProjectDetailDrawer`, `ContactHUD`, `HUDSystemAlert`, `HUDErrorBoundary`, `useHUDStore`, etc.).

### Shared Contact Submission

Both the recruiter modal (`ContactHUD.tsx`) and the client landing page (`ClientContactForm.tsx`) share a centralized submission layer in **[src/lib/contact.ts](src/lib/contact.ts)**:
- Uses a unified Zod schema (`name`, `email`, `message`, optional `botcheck` honeypot).
- Submits asynchronously to Web3Forms.
- Returns normalized responses (`{ ok: boolean, message: string, fieldErrors?: ... }`).

---

## Environment Variables

Configure the following variables in `.env.local` for local development or in the Vercel project dashboard:

```env
# Client-side Web3Forms Access Key (Required for contact form submissions)
NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key

# Optional: Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Canonical Deployment Domain
NEXT_PUBLIC_SITE_URL=https://ahmed-code-studio.vercel.app
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ahmedchoudery/Ahmed-Code-Studio.git
cd Ahmed-Code-Studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Local Environment

```bash
cp .env.example .env.local
```

Populate `NEXT_PUBLIC_WEB3FORMS_KEY` with your Web3Forms access key.

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Available Scripts

The following scripts are defined in `package.json`:

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `next dev -p 3000 -H 0.0.0.0` | Start local development server with hot-module reloading. |
| `npm run build` | `next build` | Compile the full static export into the `out/` directory. |
| `npm run start` | `next start` | Start production server (used for Node preview if applicable). |
| `npm run lint` | `next lint` | Run ESLint checks across the codebase. |
| `npm run test` | `vitest run` | Run all unit and integration tests headlessly. |
| `npm run test:ui` | `vitest --ui` | Run Vitest with a browser-based visual test UI. |
| `npm run coverage` | `vitest run --coverage` | Generate code coverage reports. |
| `npm run type-check` | `tsc --noEmit` | Validate TypeScript types without emitting artifacts. |

---

## Testing

The testing suite uses Vitest and React Testing Library:

```bash
# Run the complete test suite
npx vitest run
```

- **Canvas & Browser API Mocks**: `src/tests/setup.ts` stubs browser APIs unavailable in JSDOM (such as `ResizeObserver`, `matchMedia`, and canvas contexts required by HUD background components).
- **Route Isolation**: Ensures client routes maintain pure semantic HTML and never bundle interactive HUD logic.
- **Form Validation**: Tests valid submissions, empty payload rejections, honeypot bot mitigation, and network error handling.

---

## Deployment

The portfolio is built as a static site using Next.js static export (`output: 'export'`). 

Running `npm run build` pre-renders all pages and assets directly into the `out/` folder. The production deployment is hosted on **Vercel**, configured to automatically deploy the `main` branch upon push.