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
    <main className="rs-main">
      <style>{`
        .rs-main {
          min-height: 100vh;
          background-color: #0a0806;
          color: var(--warm-white, #F0E4D0);
          font-family: var(--f-body, 'DM Sans', sans-serif);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(3rem, 8vw, 6rem) 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .rs-main::before {
          content: '';
          position: fixed;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 500px;
          background: radial-gradient(ellipse at center, rgba(192,146,24,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .rs-wrap {
          position: relative;
          z-index: 1;
          max-width: 680px;
          width: 100%;
          text-align: center;
        }
        .rs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--f-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--amber, #C09218);
          margin-bottom: 1.5rem;
        }
        .rs-eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--amber, #C09218);
          animation: rs-pulse 2.4s ease-in-out infinite;
        }
        @keyframes rs-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        .rs-headline {
          font-family: var(--f-display, 'Cormorant Garamond', serif);
          font-size: clamp(2.6rem, 7vw, 4.4rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--warm-white, #F0E4D0);
          margin: 0 0 1.5rem 0;
        }
        .rs-headline em {
          font-style: italic;
          color: var(--amber, #C09218);
        }
        .rs-lead {
          font-size: clamp(1rem, 2vw, 1.15rem);
          line-height: 1.75;
          color: #a8937a;
          max-width: 520px;
          margin: 0 auto 2.5rem auto;
        }
        .rs-trust {
          display: flex;
          justify-content: center;
          gap: clamp(1.5rem, 4vw, 3rem);
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .rs-trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }
        .rs-trust-num {
          font-family: var(--f-display, serif);
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 500;
          color: var(--warm-white, #F0E4D0);
          line-height: 1;
        }
        .rs-trust-label {
          font-size: 0.72rem;
          color: #7a6252;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: var(--f-mono, monospace);
        }
        .rs-trust-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.08);
          align-self: center;
        }
        .rs-ctas {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        .rs-cta-primary {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.4rem 1.8rem;
          background: var(--amber, #C09218);
          border-radius: 6px;
          text-decoration: none;
          overflow: hidden;
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
        }
        .rs-cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, rgba(255,255,255,0.14) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .rs-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 44px rgba(192,146,24,0.38); }
        .rs-cta-primary:hover::before { opacity: 1; }
        .rs-cta-primary-left { text-align: left; }
        .rs-cta-primary-title {
          display: block;
          font-family: var(--f-label, sans-serif);
          font-size: 1rem;
          font-weight: 700;
          color: #000;
          letter-spacing: 0.01em;
        }
        .rs-cta-primary-sub {
          display: block;
          font-size: 0.8rem;
          color: rgba(0,0,0,0.58);
          margin-top: 0.2rem;
        }
        .rs-cta-arrow {
          font-size: 1.3rem;
          color: rgba(0,0,0,0.45);
          transition: transform 0.2s ease, color 0.2s ease;
          flex-shrink: 0;
          margin-left: 1rem;
        }
        .rs-cta-primary:hover .rs-cta-arrow { transform: translateX(6px); color: rgba(0,0,0,0.8); }
        .rs-perks {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .rs-perk {
          background: rgba(192,146,24,0.05);
          border: 1px solid rgba(192,146,24,0.14);
          border-radius: 5px;
          padding: 0.85rem 1rem;
          text-align: left;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .rs-perk:hover { border-color: rgba(192,146,24,0.28); background: rgba(192,146,24,0.08); }
        .rs-perk-icon { font-size: 1.1rem; margin-bottom: 0.35rem; display: block; }
        .rs-perk-text { font-size: 0.76rem; color: #7a6252; line-height: 1.45; margin: 0; }
        .rs-perk-text strong { display: block; color: #c8b298; font-size: 0.79rem; margin-bottom: 0.12rem; font-weight: 600; }
        .rs-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #3a2e26;
          font-family: var(--f-mono, monospace);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .rs-divider::before, .rs-divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
        .rs-cta-secondary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.8rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .rs-cta-secondary:hover { border-color: rgba(192,146,24,0.28); transform: translateY(-2px); }
        .rs-cta-secondary-title { font-family: var(--f-label, sans-serif); font-size: 0.9rem; font-weight: 600; color: #c8b298; display: block; }
        .rs-cta-secondary-sub { display: block; font-size: 0.75rem; color: #4a3c32; margin-top: 0.15rem; }
        .rs-cta-arrow-sec { font-size: 1rem; color: #3a2e26; transition: transform 0.2s ease, color 0.2s ease; margin-left: 1rem; flex-shrink: 0; }
        .rs-cta-secondary:hover .rs-cta-arrow-sec { transform: translateX(5px); color: var(--amber, #C09218); }
        .rs-footer { margin-top: 3.5rem; font-family: var(--f-mono, monospace); font-size: 0.68rem; color: #3a2e26; letter-spacing: 0.08em; text-transform: uppercase; }
        @media (max-width: 520px) {
          .rs-perks { grid-template-columns: 1fr 1fr; }
          .rs-trust-divider { display: none; }
          .rs-trust { gap: 1.25rem; }
        }
        @media (max-width: 360px) { .rs-perks { grid-template-columns: 1fr; } }
      `}</style>

      <div className="rs-wrap">
        <div className="rs-eyebrow">
          <span className="rs-eyebrow-dot" aria-hidden="true" />
          Ahmed Code Studio
        </div>

        <h1 className="rs-headline">
          Your idea deserves<br />
          <em>code that converts.</em>
        </h1>

        <p className="rs-lead">
          {"I'm"} <strong style={{color: '#c8b298', fontWeight: 500}}>Muhammad Ahmed Raza</strong> — a
          full-stack developer based in Gujrat, Pakistan. I build e-commerce stores
          and booking platforms that load fast, rank well, and turn visitors into paying customers.
        </p>

        <div className="rs-trust" aria-label="Track record">
          <div className="rs-trust-item">
            <span className="rs-trust-num">98</span>
            <span className="rs-trust-label">Lighthouse Score</span>
          </div>
          <div className="rs-trust-divider" aria-hidden="true" />
          <div className="rs-trust-item">
            <span className="rs-trust-num">2+</span>
            <span className="rs-trust-label">Live platforms</span>
          </div>
          <div className="rs-trust-divider" aria-hidden="true" />
          <div className="rs-trust-item">
            <span className="rs-trust-num">0</span>
            <span className="rs-trust-label">Missed deadlines</span>
          </div>
        </div>

        <nav className="rs-ctas" aria-label="Choose your path">
          <Link href="/client/" className="rs-cta-primary">
            <div className="rs-cta-primary-left">
              <span className="rs-cta-primary-title">I need a website built</span>
              <span className="rs-cta-primary-sub">See past work, how it works &amp; how to start</span>
            </div>
            <span className="rs-cta-arrow" aria-hidden="true">&#8594;</span>
          </Link>

          <div className="rs-perks" role="list" aria-label="Services overview">
            <div className="rs-perk" role="listitem">
              <span className="rs-perk-icon" aria-hidden="true">&#x1F6D2;</span>
              <p className="rs-perk-text">
                <strong>E-commerce stores</strong>
                Catalog, checkout, admin dashboard
              </p>
            </div>
            <div className="rs-perk" role="listitem">
              <span className="rs-perk-icon" aria-hidden="true">&#x1F4C5;</span>
              <p className="rs-perk-text">
                <strong>Booking platforms</strong>
                Calendar, SMS &amp; email alerts
              </p>
            </div>
            <div className="rs-perk" role="listitem">
              <span className="rs-perk-icon" aria-hidden="true">&#x26A1;</span>
              <p className="rs-perk-text">
                <strong>Fast delivery</strong>
                Tested, deployed, ready to earn
              </p>
            </div>
          </div>

          <div className="rs-divider" aria-hidden="true">or</div>

          <Link href="/recruiter/" className="rs-cta-secondary">
            <div>
              <span className="rs-cta-secondary-title">{"I'm"} a recruiter or engineer</span>
              <span className="rs-cta-secondary-sub">Full tech stack, architecture specs &amp; interactive HUD</span>
            </div>
            <span className="rs-cta-arrow-sec" aria-hidden="true">&#8594;</span>
          </Link>
        </nav>

        <footer className="rs-footer">
          &#169; 2026 Ahmed Code Studio &middot; Gujrat, Pakistan
        </footer>
      </div>
    </main>
  );
}
