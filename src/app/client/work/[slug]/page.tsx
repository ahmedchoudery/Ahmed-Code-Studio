import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { projects } from '@/data/projects';

interface CaseStudyConfig {
  slug: string;
  projectHeadline: string;
  metaTitle: string;
  metaDescription: string;
}

const CASE_STUDIES: Record<string, CaseStudyConfig> = {
  'falak-hall-events': {
    slug: 'falak-hall-events',
    projectHeadline: 'Falak Hall & Events',
    metaTitle: 'Falak Hall & Events — Case Study | Ahmed Code Studio',
    metaDescription: 'Case study for Falak Hall & Events: A full-stack booking and venue management platform eliminating double-booking with real-time syncing and automated notifications.',
  },
  'stop-shop': {
    slug: 'stop-shop',
    projectHeadline: 'Stop & Shop',
    metaTitle: 'Stop & Shop — Case Study | Ahmed Code Studio',
    metaDescription: 'Case study for Stop & Shop: A bespoke full-stack e-commerce platform with real-time stock deduction, editorial storefront, and admin analytics.',
  },
};

export function generateStaticParams() {
  return [
    { slug: 'falak-hall-events' },
    { slug: 'stop-shop' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = CASE_STUDIES[slug];
  const project = config ? projects.find(p => p.headline === config.projectHeadline) : null;

  if (!config || !project) {
    return {
      title: 'Case Study Not Found | Ahmed Code Studio',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmed-code-studio.vercel.app';
  const canonicalUrl = `${siteUrl}/client/work/${slug}`;

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const config = CASE_STUDIES[slug];

  if (!config) {
    notFound();
  }

  const project = projects.find(p => p.headline === config.projectHeadline);

  if (!project) {
    notFound();
  }

  return (
    <main className="case-study-page">
      <style>{`
        .case-study-page {
          min-height: 100vh;
          background-color: var(--void, #000000);
          color: var(--warm-white, #F0E4D0);
          font-family: var(--f-body, 'DM Sans', sans-serif);
          padding: 2.5rem 1.5rem 5rem;
          line-height: 1.8;
        }

        .case-study-shell {
          max-width: 820px;
          margin: 0 auto;
        }

        .case-study-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(192, 146, 24, 0.2);
          gap: 1rem;
          flex-wrap: wrap;
        }

        .back-link {
          font-family: var(--f-mono, monospace);
          font-size: 0.85rem;
          color: var(--linen, #C8B298);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: var(--amber, #C09218);
        }

        .cta-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--f-mono, monospace);
          font-size: 0.82rem;
          padding: 0.55rem 1.1rem;
          background: rgba(192, 146, 24, 0.1);
          color: var(--amber, #C09218);
          border: 1px solid var(--amber, #C09218);
          border-radius: 4px;
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
        }

        .cta-whatsapp:hover {
          background: var(--amber, #C09218);
          color: #000000;
        }

        .case-study-header {
          margin-bottom: 3.5rem;
        }

        .case-study-eyebrow {
          font-family: var(--f-mono, monospace);
          font-size: 0.8rem;
          color: var(--amber, #C09218);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.75rem;
        }

        .case-study-header h1 {
          font-family: var(--f-display, 'Cormorant Garamond', serif);
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 500;
          line-height: 1.1;
          color: var(--warm-white, #F0E4D0);
          margin: 0 0 1rem 0;
          letter-spacing: -0.02em;
        }

        .case-study-tagline {
          font-family: var(--f-display, 'Cormorant Garamond', serif);
          font-size: clamp(1.2rem, 2.4vw, 1.6rem);
          font-style: italic;
          color: var(--linen, #C8B298);
          margin: 0;
        }

        .case-study-section {
          margin-bottom: 3.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .case-study-section h2 {
          font-family: var(--f-mono, monospace);
          font-size: 0.95rem;
          color: var(--amber, #C09218);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0 0 1.25rem 0;
        }

        .case-study-section p {
          font-size: 1.05rem;
          color: var(--linen, #C8B298);
          margin: 0;
          line-height: 1.85;
        }

        .tech-stack-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .tech-tag {
          font-family: var(--f-mono, monospace);
          font-size: 0.82rem;
          padding: 0.4rem 0.85rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 3px;
          color: var(--warm-white, #F0E4D0);
          letter-spacing: 0.02em;
        }

        .images-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .image-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          background: rgba(26, 20, 16, 0.5);
        }

        .image-card img {
          width: 100%;
          height: auto;
          display: block;
        }

        .image-placeholder-box {
          border: 1px dashed rgba(192, 146, 24, 0.35);
          background: rgba(26, 20, 16, 0.7);
          padding: 3rem 2rem;
          text-align: center;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .placeholder-project-name {
          font-family: var(--f-display, 'Cormorant Garamond', serif);
          font-size: 1.5rem;
          color: var(--amber, #C09218);
        }

        .placeholder-indicator {
          font-family: var(--f-mono, monospace);
          font-size: 0.78rem;
          color: var(--mist, #7A6252);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .case-study-footer {
          margin-top: 4.5rem;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(192, 146, 24, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
      `}</style>

      <div className="case-study-shell">
        <nav className="case-study-top-nav" aria-label="Breadcrumb Navigation">
          <Link href="/client" className="back-link">
            ← Back to /client
          </Link>
          <a
            href="https://wa.me/923174307043"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-whatsapp"
          >
            Discuss on WhatsApp
          </a>
        </nav>

        <article>
          {/* 1. Headline */}
          <header className="case-study-header">
            <span className="case-study-eyebrow">Case Study // {slug}</span>
            <h1>{project.headline}</h1>
            {project.subheadline && (
              <p className="case-study-tagline">{project.subheadline}</p>
            )}
          </header>

          {/* 2. Problem */}
          {project.problem && (
            <section className="case-study-section">
              <h2>Problem</h2>
              <p>{project.problem}</p>
            </section>
          )}

          {/* 3. Solution */}
          {project.solution && (
            <section className="case-study-section">
              <h2>Solution</h2>
              <p>{project.solution}</p>
            </section>
          )}

          {/* 4. Result */}
          {project.result && (
            <section className="case-study-section">
              <h2>Result</h2>
              <p>{project.result}</p>
            </section>
          )}

          {/* 5. Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <section className="case-study-section">
              <h2>Tech Stack</h2>
              <ul className="tech-stack-list">
                {project.techStack.map((tech) => (
                  <li key={tech} className="tech-tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 6. Images */}
          {project.images && project.images.length > 0 && (
            <section className="case-study-section">
              <h2>Images</h2>
              <div className="images-grid">
                {project.images.map((imgSrc, idx) => {
                  const relativePath = imgSrc.replace(/^\//, '');
                  const absolutePath = path.join(process.cwd(), 'public', relativePath);
                  const fileExists = fs.existsSync(absolutePath);

                  return fileExists ? (
                    <div key={idx} className="image-card">
                      <img
                        src={imgSrc}
                        alt={`${project.headline} screenshot ${idx + 1}`}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div key={idx} className="image-placeholder-box">
                      <span className="placeholder-project-name">
                        {project.headline}
                      </span>
                      <span className="placeholder-indicator">
                        Asset [{idx + 1}]: {imgSrc} (Placeholder)
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </article>

        <footer className="case-study-footer">
          <Link href="/client" className="back-link">
            ← Return to /client
          </Link>
          <a
            href="https://wa.me/923174307043"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-whatsapp"
          >
            Start a Project on WhatsApp
          </a>
        </footer>
      </div>
    </main>
  );
}
