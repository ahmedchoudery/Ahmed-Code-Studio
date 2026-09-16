import type { Metadata } from 'next';
import Link from 'next/link';
import ClientContactForm from '@/components/ClientContactForm';

export const metadata: Metadata = {
  title: 'Web development for small businesses — Ahmed Code Studio',
  description: 'Custom full-stack web development specializing in high-performance e-commerce and booking platforms for small businesses.',
  alternates: {
    canonical: 'https://ahmed-code-studio.vercel.app/client',
  },
  openGraph: {
    title: 'Web development for small businesses — Ahmed Code Studio',
    description: 'Custom full-stack web development specializing in high-performance e-commerce and booking platforms for small businesses.',
    url: 'https://ahmed-code-studio.vercel.app/client',
    type: 'website',
  },
};

export default function ClientLandingPage() {
  return (
    <main className="client-landing">
      <style>{`
        .client-landing {
          min-height: 100vh;
          background: #000000;
          color: var(--warm-white, #F0E4D0);
          font-family: var(--f-body, 'DM Sans', sans-serif);
          padding: 3rem 1.5rem 6rem;
          line-height: 1.7;
          overflow-y: auto;
        }

        .client-container {
          max-width: 960px;
          margin: 0 auto;
        }

        .client-brand {
          font-family: var(--f-mono, monospace);
          font-size: 0.85rem;
          color: var(--amber, #C09218);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 4rem;
        }

        .client-hero {
          max-width: 820px;
          margin-bottom: 5.5rem;
        }

        .client-hero h1 {
          font-family: var(--f-display, 'Cormorant Garamond', serif);
          font-size: clamp(2.5rem, 6vw, 4.2rem);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--warm-white, #F0E4D0);
          margin: 0 0 1.5rem 0;
        }

        .client-hero-sub {
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          color: var(--linen, #C8B298);
          line-height: 1.75;
          margin: 0 0 2.25rem 0;
          max-width: 680px;
        }

        .hero-whatsapp-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--amber, #C09218);
          color: #000000;
          font-family: var(--f-mono, monospace);
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 0.9rem 1.8rem;
          border-radius: 4px;
          text-decoration: none;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }

        .hero-whatsapp-cta:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .client-projects-section {
          padding-top: 3.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .client-projects-title {
          font-family: var(--f-mono, monospace);
          font-size: 0.85rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--amber, #C09218);
          margin-bottom: 2.5rem;
        }

        .client-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .client-project-card {
          background: rgba(26, 20, 16, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .client-project-card:hover {
          border-color: rgba(192, 146, 24, 0.4);
          transform: translateY(-2px);
        }

        .card-top {
          margin-bottom: 2rem;
        }

        .card-eyebrow {
          font-family: var(--f-mono, monospace);
          font-size: 0.72rem;
          color: var(--amber, #C09218);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.6rem;
        }

        .client-project-card h3 {
          font-family: var(--f-display, 'Cormorant Garamond', serif);
          font-size: 1.85rem;
          font-weight: 500;
          line-height: 1.2;
          margin: 0 0 0.5rem 0;
          color: var(--warm-white, #F0E4D0);
        }

        .card-subheadline {
          font-size: 0.95rem;
          color: var(--amber, #C09218);
          opacity: 0.9;
          margin: 0 0 1rem 0;
        }

        .card-description {
          font-size: 0.95rem;
          color: var(--linen, #C8B298);
          line-height: 1.65;
          margin: 0 0 1.25rem 0;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .card-tag {
          font-family: var(--f-mono, monospace);
          font-size: 0.72rem;
          padding: 0.25rem 0.55rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 3px;
          color: var(--warm-white, #F0E4D0);
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--f-mono, monospace);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--warm-white, #F0E4D0);
          text-decoration: none;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1.25rem;
          margin-top: auto;
          transition: color 0.15s ease;
        }

        .card-link:hover {
          color: var(--amber, #C09218);
        }

        .card-link-whatsapp {
          color: var(--amber, #C09218);
        }

        .client-footer {
          margin-top: 6rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-family: var(--f-mono, monospace);
          font-size: 0.75rem;
          color: var(--mist, #7A6252);
          text-align: center;
        }
      `}</style>

      <div className="client-container">
        <header className="client-brand">
          Ahmed Code Studio // Client Services
        </header>

        {/* Hero Section */}
        <section className="client-hero">
          <h1>I build full-stack e-commerce and booking platforms for small businesses</h1>
          <p className="client-hero-sub">
            From seamless checkout systems to automated booking calendars, I engineer custom platforms designed to drive sales and streamline daily operations.
          </p>
          <a
            href="https://wa.me/923174307043"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-whatsapp-cta"
          >
            Contact on WhatsApp
          </a>
        </section>

        {/* Selected Projects */}
        <section className="client-projects-section">
          <h2 className="client-projects-title">Featured Case Studies</h2>
          <div className="client-cards-grid">
            {/* Card 1: Falak Hall & Events */}
            <article className="client-project-card">
              <div className="card-top">
                <span className="card-eyebrow">Booking Platform</span>
                <h3>Falak Hall & Events</h3>
                <p className="card-subheadline">Luxury Wedding Venue Platform</p>
                <p className="card-description">
                  Replaced paper booking with real-time calendar syncing, automated SMS notifications via Twilio, and eliminated double-booking scenarios.
                </p>
                <ul className="card-tags">
                  <li className="card-tag">Next.js 15</li>
                  <li className="card-tag">React 19</li>
                  <li className="card-tag">Node.js</li>
                  <li className="card-tag">Twilio</li>
                </ul>
              </div>
              <Link href="/client/work/falak-hall-events/" className="card-link">
                View Case Study →
              </Link>
            </article>

            {/* Card 2: Stop & Shop */}
            <article className="client-project-card">
              <div className="card-top">
                <span className="card-eyebrow">E-Commerce</span>
                <h3>Stop & Shop</h3>
                <p className="card-subheadline">Editorial Fashion Store</p>
                <p className="card-description">
                  Cinematic editorial storefront with 2-column local checkout flow, real-time stock deduction, and a secure revenue analytics dashboard.
                </p>
                <ul className="card-tags">
                  <li className="card-tag">Next.js 14</li>
                  <li className="card-tag">MongoDB</li>
                  <li className="card-tag">Redis</li>
                  <li className="card-tag">GSAP</li>
                </ul>
              </div>
              <Link href="/client/work/stop-shop/" className="card-link">
                View Case Study →
              </Link>
            </article>

            {/* Card 3: More projects on request */}
            <article className="client-project-card">
              <div className="card-top">
                <span className="card-eyebrow">Custom Solutions</span>
                <h3>More projects on request</h3>
                <p className="card-subheadline">Tailored Business Software</p>
                <p className="card-description">
                  Need a bespoke inventory dashboard, appointment scheduler, or custom ordering system? Inquire directly for private client case studies.
                </p>
                <ul className="card-tags">
                  <li className="card-tag">Full Stack</li>
                  <li className="card-tag">MERN</li>
                  <li className="card-tag">REST APIs</li>
                  <li className="card-tag">Cloud</li>
                </ul>
              </div>
              <a
                href="https://wa.me/923174307043"
                target="_blank"
                rel="noopener noreferrer"
                className="card-link card-link-whatsapp"
              >
                Inquire on WhatsApp →
              </a>
            </article>
          </div>
        </section>

        {/* Contact Section */}
        <section className="client-contact-section" style={{ marginTop: '5.5rem', paddingTop: '3.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h2 className="client-projects-title" style={{ marginBottom: '1rem' }}>Get in Touch</h2>
          <p style={{ color: 'var(--linen, #C8B298)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '640px' }}>
            Have an e-commerce or booking project in mind? Submit your requirements below for a consultation, or connect directly on WhatsApp.
          </p>
          <ClientContactForm />
        </section>

        <footer className="client-footer">
          © 2026 Ahmed Code Studio. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
