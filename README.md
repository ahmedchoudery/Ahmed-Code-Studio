# Ahmed Code Studio — Portfolio

A high-performance, cinematic portfolio website built for Muhammad Ahmed Raza, a Full Stack Web Developer. The application leverages a cutting-edge modern stack to deliver a premium, glassmorphism aesthetic with 60fps micro-animations, 3D interactive backgrounds, and seamless mobile responsiveness.

## Key Features

- **Cinematic Experience**: Immersive GSAP-powered animations, magnetic buttons, and custom text decoding effects.
- **3D Background System**: Integrates `Three.js` and React Three Fiber to render a lightweight, interactive spatial environment.
- **HUD Interface**: Custom-built Heads-Up Display (HUD) state management using Zustand for seamless modal and navigation flows.
- **Robust Engineering**: Built on Next.js 15 (App Router) and React 19 with strict TypeScript adherence.
- **Tested & Validated**: Comprehensive unit and integration test suite utilizing Vitest and React Testing Library.

## Tech Stack

- **Language**: TypeScript / React 19
- **Framework**: Next.js 15.0.3 (App Router)
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: GSAP (GreenSock Animation Platform)
- **State Management**: Zustand
- **Form Validation**: Zod
- **Testing**: Vitest, React Testing Library
- **Deployment**: Vercel

## Prerequisites

- Node.js 20 or higher
- npm (Node Package Manager)

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

### 3. Environment Setup

Copy the example environment file (if available) or create a new `.env.local` file in the root directory.

Configure the following variables in your `.env.local`:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for the contact form | `your-web3forms-key-here` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SITE_URL` | The canonical URL of the site | `https://ahmedchoudery.github.io` |
| `NEXT_PUBLIC_OG_IMAGE` | The OpenGraph image URL for SEO previews | `https://ahmedchoudery.github.io/og-image.jpg` |

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running locally.

## Architecture

### Directory Structure

```text
├── src/
│   ├── app/                 # Next.js 15 App Router pages and layouts
│   │   ├── globals.css      # Core global styles, variables, and utility classes
│   │   ├── layout.tsx       # Root layout including fonts and metadata
│   │   └── page.tsx         # Main entry point (Portfolio Home)
│   ├── components/          # Reusable React components
│   │   ├── BackgroundSystem.tsx    # Three.js 3D WebGL background
│   │   ├── ClientHome.tsx          # Main client-side rendering shell
│   │   ├── ContactHUD.tsx          # Contact form with Zod validation
│   │   ├── HUDSystemAlert.tsx      # Notification and alert system
│   │   ├── ProjectDetailDrawer.tsx # Slide-out case study viewer
│   │   ├── ProjectDisplay.tsx      # Main project presentation view
│   │   └── TopNav.tsx              # Application top navigation bar
│   ├── data/                # Static data models
│   │   └── projects.ts      # Portfolio project listings and details
│   ├── hooks/               # Custom React Hooks
│   │   ├── useMagneticHUD.ts       # Logic for magnetic cursor hover effects
│   │   └── useTextDecodeEffect.ts  # Matrix-style text reveal animation
│   ├── store/               # Global state management
│   │   └── useHUDStore.ts   # Zustand store for HUD UI state (views, overlays)
│   ├── tests/               # Test suite
│   │   ├── app/             # Tests for Next.js App Router components
│   │   ├── components/      # Unit/Integration tests for UI components
│   │   ├── hooks/           # Hook tests
│   │   └── store/           # Zustand store tests
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Helper utilities
├── public/                  # Static assets (images, icons, etc.)
├── next.config.mjs          # Next.js configuration
├── vitest.config.ts         # Vitest configuration
└── tsconfig.json            # TypeScript configuration
```

### Data Flow & State Management

The application is heavily interactive and client-side driven while maximizing Next.js SSR for the initial shell.
State is centrally managed by Zustand (`useHUDStore`), which tracks the currently active "view" (e.g., `HOME`, `PROJECT_DETAILS`, `CONTACT`). The HUD components react to this state to trigger GSAP enter/exit animations, providing a seamless Single Page Application (SPA) feel within the Next.js App Router paradigm.

### Form Handling

The Contact form (`ContactHUD.tsx`) leverages **Web3Forms** for serverless email forwarding. Client-side input is strictly validated using **Zod** schemas before submission, ensuring data integrity and providing immediate user feedback on validation errors.

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the Next.js development server on port 3000 |
| `npm run build` | Build the application for production deployment |
| `npm run start` | Start the production server (after building) |
| `npm run lint` | Run Next.js ESLint configuration to check for errors |
| `npm run test` | Run the full Vitest test suite |
| `npm run test:ui` | Run Vitest with the interactive UI dashboard |
| `npm run coverage` | Run tests and generate code coverage reports |
| `npm run type-check` | Run the TypeScript compiler without emitting files |

## Testing

The project maintains a robust test suite using Vitest, React Testing Library, and JSDOM.

### Running Tests

```bash
# Run all tests headlessly
npm run test

# Run tests with the interactive visual UI
npm run test:ui

# Run tests and generate an LCOV/HTML coverage report
npm run coverage
```

### Test Architecture

Tests are collocated in the `src/tests` directory mirroring the `src` folder structure. Components use React Testing Library (`@testing-library/react`) to assert DOM state, simulate user events (clicks, input), and verify accessibility. Global mocks for `gsap` and `@react-three/fiber` are configured in `src/tests/setup.ts` to ensure tests execute cleanly without requiring a WebGL context or animation frames.

## Deployment

This application is built for seamless, zero-configuration deployment to **Vercel**, making full use of Next.js edge caching and serverless functions.

### Deploying to Vercel (Recommended)

1. Push your code to your GitHub repository.
2. Navigate to your [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **Add New...** > **Project**.
4. Import your GitHub repository (`Ahmed-Code-Studio`).
5. In the Environment Variables section, add your `NEXT_PUBLIC_WEB3FORMS_KEY` and any other `.env.local` keys.
6. Click **Deploy**.

Vercel will automatically detect the Next.js framework, run the `npm run build` step, and provision a global CDN for your static assets.

### Manual / Other Platforms

If deploying to another Node.js capable platform (e.g., Render, Railway, DigitalOcean):

```bash
# Install production dependencies
npm ci

# Build the Next.js application
npm run build

# Start the Node.js production server
npm run start
```

## Troubleshooting

### Canvas / Three.js Errors in Development

**Issue**: WebGL warnings or strict mode double-renders.
**Solution**: React 19 and Next.js strict mode can cause dual invocations of components in development. This is expected. If performance is severely degraded in development, you can temporarily disable strict mode in `next.config.mjs`, though it is NOT recommended for production builds.

### GSAP Animation Stuttering

**Issue**: Animations feel janky or are dropping frames.
**Solution**: Ensure no extraneous state updates are triggering re-renders of elements actively being animated by GSAP. GSAP bypasses React's virtual DOM by mutating styles directly; forcing a React render during a tween can cause conflict. Use `useRef` for tracking local values instead of `useState` when tied to an animation tick.

### Tests Failing Due to GSAP / ResizeObserver

**Issue**: Error output mentioning `ResizeObserver is not defined` or `gsap`.
**Solution**: Ensure your test is loading `src/tests/setup.ts` correctly, which mocks these browser-specific APIs for the JSDOM environment.

---

*Designed and Built by Muhammad Ahmed Raza.*