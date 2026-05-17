import Link from 'next/link';
import BackgroundSystem from '@/components/BackgroundSystem';

export default function NotFound() {
  return (
    <main className="not-found-container" style={{ 
      height: '100svh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#050403'
    }}>
      {/* Background stays active for immersion */}
      <BackgroundSystem />

      <div className="not-found-content glassmorphism" style={{
        padding: '3rem',
        textAlign: 'center',
        zIndex: 10,
        maxWidth: '500px'
      }}>
        <span className="mono-label" style={{ color: 'var(--amber)', letterSpacing: '0.5em', marginBottom: '1rem', display: 'block' }}>
          ERROR 404
        </span>
        <h1 className="display-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
          Signal Lost
        </h1>
        <p className="hero-bio" style={{ marginBottom: '2.5rem', opacity: 0.8 }}>
          The node you are attempting to access does not exist or has been moved to an unencrypted sector.
        </p>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
          RETURN TO BASE
        </Link>
      </div>

      <div className="status-bar" style={{ zIndex: 10 }}>
        <div className="status-location">
          <span className="status-dot" style={{ backgroundColor: '#ff3b3b', boxShadow: '0 0 10px #ff3b3b' }} />
          System offline — Sector unknown
        </div>
      </div>
    </main>
  );
}
