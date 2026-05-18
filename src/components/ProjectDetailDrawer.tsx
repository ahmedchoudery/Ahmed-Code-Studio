'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DOMPurify from 'dompurify';
import { useHUDStore } from '../store/useHUDStore';
import { projects } from '../data/projects';

const sanitize = (html: string, options?: Record<string, unknown>): string => {
  if (typeof window === 'undefined') return html;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return DOMPurify.sanitize(html, options as any) as unknown as string;
  } catch {
    return html;
  }
};

export function ProjectDetailDrawer() {
  const isOpen = useHUDStore(state => state.view === 'PROJECT_DETAILS');
  const toggleDetails = useHUDStore(state => state.toggleDetails);
  const setView = useHUDStore(state => state.setView);
  const currentIndex = useHUDStore(state => state.currentIndex);
  const project = projects[currentIndex];

  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !contentRef.current) return;
    if (isOpen) {
      gsap.to(drawerRef.current, { x: 0, duration: 0.6, ease: 'power4.out' });
      gsap.fromTo(contentRef.current.children, 
        { x: 30, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      gsap.to(drawerRef.current, { x: '100%', duration: 0.5, ease: 'power4.in' });
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <div
      ref={drawerRef}
      className="detail-drawer"
    >
      <header style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <button className="close-btn" onClick={toggleDetails}>
          [ CLOSE ]
        </button>
      </header>

      <div ref={contentRef} className="drawer-content">
        <header className="drawer-header">
          <span className="mono-eyebrow">Case Study // {String(currentIndex + 1).padStart(2, '0')}</span>
          <h2 className="drawer-title">{project.headline}</h2>
          <p className="drawer-tagline">{project.subheadline}</p>
        </header>

        <section className="drawer-section">
          <h3 className="section-label">{project.overviewTitle || 'Overview'}</h3>
          <p 
            className="section-text" 
            style={{ whiteSpace: 'pre-line' }}
            dangerouslySetInnerHTML={{ __html: sanitize(project.fullDescription || project.description) }}
          />
        </section>

        <section className="drawer-section">
          <h3 className="section-label">{project.drawerSpecsTitle || project.specsTitle || 'Technical Specs'}</h3>
          <div className="specs-detail-list">
            {(project.drawerSpecs || project.specs).map((spec, i) => (
              <div key={i} className="spec-item">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        {project.link && (
          <footer className="drawer-footer">
            <button className="btn-primary" onClick={() => setView('CONTACT')}>
              Hire Me
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
