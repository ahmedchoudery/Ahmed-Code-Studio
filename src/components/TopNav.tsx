'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useHUDStore } from '../store/useHUDStore';
import { projects } from '../data/projects';

const TopNav: React.FC = React.memo(() => {
  const currentIndex   = useHUDStore(state => state.currentIndex);
  const next           = useHUDStore(state => state.next);
  const setView        = useHUDStore(state => state.setView);

  const total   = projects.length;
  const current = currentIndex + 1;
  const progressPercent = total === 0 ? 0 : (current / total) * 100;

  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;
    gsap.to(progressRef.current, { width: `${progressPercent}%`, duration: 0.6, ease: 'power2.out' });
  }, [progressPercent]);

  return (
    <nav className="top-nav" aria-label="Site navigation">
      <span className="page-counter">
        Page {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      <div className="nav-right">
        <div className="progress-bar" aria-hidden="true">
          <div ref={progressRef} className="progress-fill" style={{ width: '0%' }} />
        </div>

        <button
          className="nav-link"
          onClick={() => setView('CONTACT')}
          aria-label="Open contact form"
        >
          Contact
        </button>


        {current < total && (
          <button
            className="nav-link"
            onClick={next}
            aria-label="Next project"
          >
            Next &#8594;
          </button>
        )}
      </div>
    </nav>
  );
});

TopNav.displayName = 'TopNav';
export default TopNav;
