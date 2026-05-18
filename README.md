# Ahmed Code Studio — Cinematic HUD Portfolio

A high-performance, cinematic spatial portfolio website built for **Muhammad Ahmed Raza**, a Full Stack Web Developer. The application leverages a cutting-edge modern stack to deliver a premium, dark glassmorphism aesthetic with 60fps micro-animations, 3D interactive particle backgrounds, and a customizable Heads-Up Display (HUD) state-management layer.

---

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Architecture & Design Systems](#architecture--design-systems)
  - [Directory Structure](#directory-structure)
  - [HUD State Flow & Lifecycles](#hud-state-flow--lifecycles)
  - [Interactive 3D WebGL System](#interactive-3d-webgl-system)
  - [Form Validation & Email Pipelines](#form-validation--email-pipelines)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Testing Infrastructure](#testing-infrastructure)
  - [Mocks & Muted Canvas Contexts](#mocks--muted-canvas-contexts)
  - [Executing Tests](#executing-tests)
- [Deployment](#deployment)
  - [Deploying to Vercel (Recommended)](#deploying-to-vercel-recommended)
  - [Manual Deployments](#manual-deployments)
- [Troubleshooting & Gotchas](#troubleshooting--gotchas)

---

## Key Features

- **Spatial Glassmorphism HUD**: An interactive, weightless Heads-Up Display UI inspired by technical blueprints and spacecraft dashboards.
- **WebGL Particle Atmosphere**: Implements interactive 3D particle dust and light fields that react dynamically to cursor coordinates and gyroscope parameters.
- **Precision Framerate Motion**: Utilizes GSAP (GreenSock Animation Platform) and Framer Motion to deliver seamless, hardware-accelerated 60fps micro-animations.
- **Stateless Serverless Contact**: Employs a secure Zod-validated input schema backed by Web3Forms for immediate serverless feedback.
- **Adherence to Next.js 15 & React 19**: Strictly follows the modern App Router paradigm, featuring Server-Side Rendering (SSR) alongside dynamic client hydration wrappers.

---

## Tech Stack

- **Framework**: [Next.js 15.0.3](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Runtime Environment**: [React 19](https://react.dev/)
- **State Engine**: [Zustand](https://github.com/pmndrs/zustand)
- **3D Graphics**: [Three.js](https://threejs.org/) (`@react-three/fiber` & `@react-three/drei`)
- **Animations**: [GSAP](https://greensock.com/gsap/) (GreenSock) & [Framer Motion](https://www.framer.com/motion/)
- **Validation**: [Zod](https://zod.dev/)
- **Linter**: ESLint (Next.js config)
- **Test Engine**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
- **Infrastructure Host**: [Vercel](https://vercel.com/)

---

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x.x` or higher (LTS recommended)
- **Package Manager**: `npm` (v10+) or `pnpm` (recommended for zero-overhead builds)

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

### 3. Setup Environment Configuration

Create a `.env.local` file in the project's root folder:

```bash
cp .env.example .env.local
```

Configure the following variables inside `.env.local`:

| Variable | Requirement | Description | Example |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | **Required** | The API access key from Web3Forms for contact submissions. | `a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6` |
| `NEXT_PUBLIC_GA_ID` | *Optional* | Google Analytics 4 measurement ID for traffic analytics. | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SITE_URL` | *Optional* | The canonical URL of your deployed application. | `https://ahmed-code-studio.vercel.app` |
| `NEXT_PUBLIC_OG_IMAGE` | *Optional* | OpenGraph standard image preview for social share cards. | `https://ahmed-code-studio.vercel.app/og-preview.jpg` |

### 4. Boot Up the Local Environment

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your spatial cinematic portfolio running locally with hot-module reloading.

---

## Architecture & Design Systems

### Directory Structure

```text
├── src/
│   ├── app/                 # Next.js 15 App Router pages, layouts, and configurations
│   │   ├── globals.css      # Custom UI theme variables, HSL color tokens, typography & animations
│   │   ├── layout.tsx       # Root layout initializing global metadata, viewport systems, and fonts
│   │   └── page.tsx         # Main entry point importing the Client Home container
│   ├── components/          # React components representing specific parts of the HUD
│   │   ├── BackgroundSystem.tsx    # Three.js 3D WebGL Canvas particle logic and event handling
│   │   ├── ClientHome.tsx          # Client-side core shell, scroll listeners, and keybindings
│   │   ├── ContactHUD.tsx          # Zod-validated serverless Web3Forms contact form panel
│   │   ├── HUDErrorBoundary.tsx    # Secure fallback rendering for isolated component failures
│   │   ├── HUDSystemAlert.tsx      # System notifications and popups using Zustand alerts
│   │   ├── ProjectDetailDrawer.tsx # Slide-out overlay presenting technical case study specifications
│   │   ├── ProjectDisplay.tsx      # Carousel views for projects with animated entrance sequences
│   │   ├── TechnicalSpecs.tsx      # Side panel displaying custom dynamic skill meters
│   │   └── TopNav.tsx              # Interactive status bar with navigation indicators
│   ├── data/                # Data management
│   │   └── projects.ts      # Core portfolio records, icons, schemas, and skills data
│   ├── hooks/               # Custom React Hooks
│   │   ├── useMagneticHUD.ts       # Magnet cursor calculations for hover interactions
│   │   └── useTextDecodeEffect.ts  # Matrix-style cipher text-decoding animations
│   ├── store/               # Centralized State Management
│   │   └── useHUDStore.ts   # Zustand stores tracking view transitions, active indexes, and transitions
│   └── tests/               # Full verification suite mirroring source layout
│       ├── setup.ts         # Vitest setup configuring JSDOM, GSAP and ResizeObserver mocks
│       ├── components/      # Unit and integration assertions for HUD components
│       └── store/           # Zustand state transition test cases
├── public/                  # Static assets (fallback graphics, sitemaps, robots.txt)
├── next.config.mjs          # Next.js bundle optimizations and production webpack configuration
├── vitest.config.ts         # Vitest config defining testing environments and path aliases
├── tsconfig.json            # Strict TypeScript configuration
└── package.json             # App configurations, dependencies, and execution scripts
```

### HUD State Flow & Lifecycles

State transitions are managed centrally using a lightweight **Zustand store** (`useHUDStore.ts`). Instead of relying on traditional route changes that break high-fidelity animations, the interface behaves as a spatial Single Page Application.

```
                    ┌──────────────┐
                    │  MAIN VIEW   │
                    └──────┬───────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
 ┌───────────────────────┐   ┌───────────────────────┐
 │    PROJECT_DETAILS    │   │      CONTACT HUD      │
 │  (Case study drawer)  │   │  (Interactive panel)  │
 └───────────────────────┘   └───────────────────────┘
```

When a transition occurs:
1. `useHUDStore` toggles the active view (e.g., `CONTACT` or `PROJECT_DETAILS`).
2. GSAP context registers the event and executes exit animations on active components.
3. Once elements exit, React's dynamic component resolves, rendering the incoming view.
4. The incoming view triggers entrance animations using target refs.

### Interactive 3D WebGL System

The interactive visual atmosphere is rendered inside `BackgroundSystem.tsx` using **Three.js** under React Three Fiber (`@react-three/fiber`). 

- **Optimized Particle System**: Over 1,000 custom-shaded vertices are loaded into a `BufferGeometry` instance rather than individual mesh nodes. This ensures single-pass rendering (instanced drawing), keeping overhead extremely low on low-end mobile devices.
- **Parallax Physics**: The particle group acts dynamically to mouse coordinates. On desktop, mouse coordinates compute relative velocity offsets to create a physical depth effect.
- **Device Parallax**: Integrates mobile device orientation values (pitch & roll), transferring gyroscope movements to the particle fields for immersive physical depth on mobile browsers.

### Form Validation & Email Pipelines

The contact form uses a combination of client-side validation and serverless form actions:

1. **Client-side schemas (Zod)**: Input values are structured using `z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(10) })`.
2. **Immediate validation checks**: Validation errors trigger status alerts inside `HUDSystemAlert.tsx` without resetting inputs.
3. **Web3Forms Transmission**: Confirmed payloads are posted asynchronously to Web3Forms API endpoints, avoiding the need for heavy custom backend route management.

---

## Environment Variables

The application operates securely on serverless systems using public environment prefixes. Add these in Vercel or your local `.env.local` file:

```env
# Web3Forms Secret Access Key (Acquire from web3forms.com)
NEXT_PUBLIC_WEB3FORMS_KEY=a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6

# Canonical Deployment Domain
NEXT_PUBLIC_SITE_URL=https://ahmed-code-studio.vercel.app

# OpenGraph Social Share Preview Image
NEXT_PUBLIC_OG_IMAGE=https://ahmed-code-studio.vercel.app/og-preview.jpg

# Google Analytics Measurement Identifier
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Available Scripts

Use the following commands inside the project's root folder:

| Command | Action | Goal |
| :--- | :--- | :--- |
| `npm run dev` | `next dev` | Start the dev server on port `3000` with hot-reloading. |
| `npm run build` | `next build` | Compile static production assets and serverless configurations. |
| `npm run start` | `next start` | Launch the built production server locally. |
| `npm run lint` | `next lint` | Validate codebase syntax against strict ESLint rules. |
| `npm run test` | `vitest` | Run unit and integration tests headlessly. |
| `npm run test:ui` | `vitest --ui` | Run Vitest with a graphical web-based test dashboard. |
| `npm run coverage` | `vitest run --coverage` | Generate complete coverage directories in `coverage/`. |
| `npm run type-check` | `tsc --noEmit` | Validate type soundness across all source code. |

---

## Testing Infrastructure

The application has a robust, clean test suite configured under Vitest, React Testing Library, and JSDOM, asserting custom store transitions, component integrity, and validation behaviors.

### Mocks & Muted Canvas Contexts

To run tests without standard browser runtime failures:
- **WebGL & Canvas Mocks**: `BackgroundSystem.tsx` requires a WebGL context, which does not exist inside virtual JSDOM systems. The test suite uses custom mock setups in `src/tests/setup.ts` to stub `@react-three/fiber` canvas blocks, allowing specs to run smoothly.
- **ResizeObserver / GSAP Hooks**: Custom global stubs are injected for browser APIs (`window.ResizeObserver`, `window.matchMedia`), and GSAP animations are automatically bypassed by setting global GSAP speeds to immediate completion times (`gsap.globalTimeline.timeScale(100)`).

### Executing Tests

```bash
# Run tests headlessly
npm run test

# Launch visual test suite
npm run test:ui

# Verify code coverage (Aiming above 70%)
npm run coverage
```

---

## Deployment

The application is fully optimized for zero-configuration deployments on **Vercel**.

### Deploying to Vercel (Recommended)

1. Push your updated code to your GitHub repository.
2. Visit the [Vercel Dashboard](https://vercel.com/) and click **Add New...** > **Project**.
3. Import your repository: `Ahmed-Code-Studio`.
4. In the **Environment Variables** panel, add `NEXT_PUBLIC_WEB3FORMS_KEY` with your actual Web3Forms API key.
5. Click **Deploy**. Vercel will build your application, generate static paths, and serve your pages over a global, edge-cached CDN.

### Manual Deployments

To build and run the application manually on a private server (VPS or Docker container):

```bash
# 1. Pull the absolute source code
git pull origin main

# 2. Install pristine dependencies
npm ci

# 3. Compile Next.js production code
npm run build

# 4. Start the server daemon
npm run start
```

---

## Troubleshooting & Gotchas

### Hydration Warnings
**Issue**: Browser logs display `Extra attributes from server: style...` or warnings about canvas overlays.
**Solution**: React Three Fiber injects absolute styles to standard overlay elements dynamically. This is safe to ignore, but you can prevent warnings by declaring `suppressHydrationWarning` on elements heavily altered by dynamic hooks.

### WebGL Canvas Rendering Failures
**Issue**: The background disappears or prints canvas driver warnings.
**Solution**: Old mobile devices may not support full WebGL2 instanced buffer attributes. The codebase is configured to detect rendering contexts; if WebGL initialization fails, it falls back to a clean, CSS-based glassmorphism space background without blocking the core page layout.

### GSAP Animation Conflicts during Fast Transition
**Issue**: UI elements freeze halfway or display styling bugs when clicking navigation buttons rapidly.
**Solution**: Fast clicks can trigger a new animation transition before previous timelines finish. We use `gsap.context()` in components, which automatically handles tearing down and cleaning up previous timelines when props or states change. Always use `gsap.context` inside React effects to prevent layout memory leaks!

---

*Designed and engineered by Muhammad Ahmed Raza. Built for high-performance visual fidelity.*