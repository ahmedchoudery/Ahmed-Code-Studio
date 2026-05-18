'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { projects } from '../data/projects';
import TopNav from './TopNav';
import ProjectDisplay from './ProjectDisplay';
import TechnicalSpecs from './TechnicalSpecs';
import BackgroundSystem from './BackgroundSystem';
import { HUDErrorBoundary } from './HUDErrorBoundary';
import { useHUDStore } from '../store/useHUDStore';
const ContactHUD = dynamic(() => import('./ContactHUD').then(mod => mod.ContactHUD), { ssr: false });
const HUDSystemAlert = dynamic(() => import('./HUDSystemAlert').then(mod => mod.HUDSystemAlert), { ssr: false });
const ProjectDetailDrawer = dynamic(() => import('./ProjectDetailDrawer').then(mod => mod.ProjectDetailDrawer), { ssr: false });



export default function ClientHome() {
  const currentIndex = useHUDStore(state => state.currentIndex);

  const isPending    = useHUDStore(state => state.isPending);
  const isFlickering = useHUDStore(state => state.isFlickering);
  const view         = useHUDStore(state => state.view);

  const currentProject = projects[currentIndex];
  const next = useHUDStore(state => state.next);
  const prev = useHUDStore(state => state.prev);

  // Non-scrollable Wheel Navigation
  React.useEffect(() => {
    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      if (view !== 'MAIN') return;

      const now = Date.now();
      if (now - lastWheel < 800) return; // Throttle navigation
      if (Math.abs(e.deltaY) < 30) return; // Ignore small movements

      if (e.deltaY > 0) next();
      else prev();
      lastWheel = now;
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [next, prev, view]);

  // Keyboard Navigation
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (view !== 'MAIN') return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        next();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prev();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, prev, view]);

  // Mobile Swipe Navigation
  React.useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (view !== 'MAIN') return;

      touchEndY = e.changedTouches[0].screenY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) next();
        else prev();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [next, prev, view]);



  return (
    <>
      {/* Cinematic Overlays */}
      <div className="noise-overlay" aria-hidden="true" />


      {/* Canvas background — fixed, renders first in DOM so it's behind everything */}
      <HUDErrorBoundary>
        <BackgroundSystem />
      </HUDErrorBoundary>

      {/* Skills panel — fixed right, outside #app to avoid flex interference */}
      <TechnicalSpecs
        title={currentProject.specsTitle}
        specs={currentProject.specs}
      />

      <div
        id="app"
        className={isFlickering ? 'flicker' : ''}
        style={{ opacity: isPending ? 0.7 : 1, transition: `opacity ${isPending ? '0ms' : '400ms'} ease` }}
      >
        <TopNav />

        <HUDErrorBoundary>
            <ProjectDisplay project={currentProject} index={currentIndex} />

        </HUDErrorBoundary>

        {/* Status bar — bottom */}
        <div className="status-bar">
          <div className="status-location">
            <span className="status-dot" aria-hidden="true" />
            Gujrat, Pakistan — Open to work
          </div>
          <div className="status-copyright" style={{ opacity: 0.4, fontFamily: 'var(--f-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            © 2026 Ahmed Code Studio
          </div>
        </div>
      </div>

      {view === 'CONTACT' && <ContactHUD />}
      <HUDSystemAlert />
      <ProjectDetailDrawer />
    </>
  );
}
