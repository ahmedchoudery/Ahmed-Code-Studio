import type { Metadata } from 'next';
import Link from 'next/link';

export function generateMetadata(): Metadata {
  return {
    title: 'Muhammad Ahmed Raza — Full Stack Web Developer',
    description: 'Full-stack web developer based in Gujrat, Pakistan. Building high-performance e-commerce and booking platforms with Next.js, React, Node.js, and TypeScript.',
    alternates: {
      canonical: 'https://ahmed-code-studio.vercel.app/',
    },
    openGraph: {
      title: 'Muhammad Ahmed Raza — Full Stack Web Developer',
      description: 'Full-stack web developer based in Gujrat, Pakistan. Building high-performance e-commerce and booking platforms with Next.js, React, Node.js, and TypeScript.',
      url: 'https://ahmed-code-studio.vercel.app/',
      type: 'website',
    },
  };
}

export default function RootSelectorPage() {
  return (
    <main className="root-selector-main">
      <style>{`
        .root-selector-main {
          min-height: 100vh;
          background-color: var(--void, #000000);
          color: var(--warm-white, #F0E4D0);
          font-family: var(--f-body, sans-serif);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          line-height: 1.6;
        }

        .selector-card {
          max-width: 640px;
          width: 100%;
          background: rgba(26, 20, 16, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: clamp(2rem, 5vw, 3.5rem);
          text-align: center;
        }

        .selector-header {
          margin-bottom: 2.5rem;
        }

        .selector-eyebrow {
          font-family: var(--f-mono, monospace);
          font-size: 0.78rem;
          color: var(--amber, #C09218);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.75rem;
        }

        .selector-title {
          font-family: var(--f-display, serif);
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 500;
          color: var(--warm-white, #F0E4D0);
          margin: 0 0 1rem 0;
          letter-spacing: -0.02em;
        }

        .selector-bio {
          font-size: 1.05rem;
          color: var(--linen, #C8B298);
          line-height: 1.7;
          margin: 0 0 0.5rem 0;
        }

        .selector-location {
          font-family: var(--f-mono, monospace);
          font-size: 0.8rem;
          color: var(--mist, #7A6252);
          margin-top: 0.5rem;
        }

        .selector-options {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 2.5rem;
        }

        .selector-choice-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 1.5rem;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .choice-client {
          background: var(--amber, #C09218);
          color: #000000;
          border: 1px solid var(--amber, #C09218);
        }

        .choice-client:hover {
          opacity: 0.92;
          transform: translateY(-2px);
        }

        .choice-recruiter {
          background: rgba(255, 255, 255, 0.04);
          color: var(--warm-white, #F0E4D0);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .choice-recruiter:hover {
          border-color: var(--amber, #C09218);
          transform: translateY(-2px);
          color: var(--amber, #C09218);
        }

        .choice-label {
          font-family: var(--f-mono, monospace);
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.06em;
        }

        .choice-sub {
          font-size: 0.82rem;
          margin-top: 0.25rem;
          opacity: 0.85;
        }

        .selector-footer {
          margin-top: 2.5rem;
          font-family: var(--f-mono, monospace);
          font-size: 0.72rem;
          color: var(--mist, #7A6252);
        }
      `}</style>

      <div className="selector-card">
        <header className="selector-header">
          <span className="selector-eyebrow">Ahmed Code Studio</span>
          <h1 className="selector-title">Muhammad Ahmed Raza</h1>
          <p className="selector-bio">
            Full-stack web developer building e-commerce and booking platforms with modern web technologies. Based in Gujrat, Pakistan, crafting fast, scalable, and conversion-focused digital systems.
          </p>
          <div className="selector-location">
            Gujrat, Pakistan
          </div>
        </header>

        <nav className="selector-options" aria-label="Audience Selector">
          <Link href="/client/" className="selector-choice-btn choice-client">
            <span className="choice-label">I&apos;m hiring for a project</span>
            <span className="choice-sub">Explore client services, case studies &amp; pricing</span>
          </Link>

          <Link href="/recruiter/" className="selector-choice-btn choice-recruiter">
            <span className="choice-label">I&apos;m a recruiter</span>
            <span className="choice-sub">View full technical stack, specs &amp; interactive HUD</span>
          </Link>
        </nav>

        <footer className="selector-footer">
          © 2026 Ahmed Code Studio
        </footer>
      </div>
    </main>
  );
}
