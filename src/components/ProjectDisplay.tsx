'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DOMPurify from 'dompurify';
import { Project, projects } from '../data/projects';
import { useHUDStore } from '../store/useHUDStore';

/**
 * Sanitize HTML safely. Falls back to empty string on server or
 * if DOMPurify is unavailable (e.g., CSP Trusted Types restrictions).
 */
const sanitize = (html: string, options?: Record<string, unknown>): string => {
  if (typeof window === 'undefined') return html;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return DOMPurify.sanitize(html, options as any) as unknown as string;
  } catch {
    return html;
  }
};

interface ProjectDisplayProps {
  project: Project;
  index: number;
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = React.memo(({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLHeadingElement>(null);
  const bioRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const socialsRef   = useRef<HTMLDivElement>(null);

  const setView = useHUDStore(state => state.setView);
  const toggleDetails = useHUDStore(state => state.toggleDetails);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Entrance sequence
      gsap.fromTo(
        [eyebrowRef.current, nameRef.current, bioRef.current, ctaRef.current, socialsRef.current],
        { y: 30, opacity: 0, filter: 'blur(15px)' },
        { 
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 1.4, 
          stagger: 0.15, 
          ease: 'expo.out',
          clearProps: 'filter'
        }
      );

      // Magnetic Effect
      const buttons = containerRef.current?.querySelectorAll('.btn-primary, .btn-ghost, .btn-download');
      buttons?.forEach(btn => {
        const moveBtn = (e: MouseEvent) => {
          if (window.innerWidth < 1100) return;
          const rect = (btn as HTMLElement).getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
          gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' });
        };
        const resetBtn = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
        };
        btn.addEventListener('mousemove', moveBtn as EventListener);
        btn.addEventListener('mouseleave', resetBtn);
      });
    }, containerRef);
    return () => ctx.revert();
  }, [project]);

  useEffect(() => {
    if (index === 0) {
      document.title = 'Muhammad Ahmed Raza — Full Stack Web Developer';
    } else {
      document.title = `${project.headline} — Muhammad Ahmed Raza`;
    }
  }, [project.headline, index]);

  const isPersonal = index === 0;

  return (
    <div className="hero" ref={containerRef} id="hero">
      <div className="hero-counter" aria-hidden="true">
        <span className="count-current">{(index + 1).toString().padStart(2, '0')}</span>
        <span className="count-divider">/</span>
        <span className="count-total">{projects.length.toString().padStart(2, '0')}</span>
      </div>

      <div className="hero-eyebrow" ref={eyebrowRef}>
        {!isPersonal && (
          <span className="project-badge">
            Project# {index}
          </span>
        )}
        {project.subheadline}
      </div>

      <h1 className="hero-name" ref={nameRef}>
        {project.headline}
      </h1>

      <p
        className="hero-bio"
        ref={bioRef}
        dangerouslySetInnerHTML={{ __html: sanitize(project.description) }}
      />

      <div className="hero-cta" ref={ctaRef}>
        {!isPersonal ? (
          project.isComingSoon ? (
            <button className="btn-primary" onClick={() => setView('CONTACT')}>
              Get in Touch <span className="arrow" aria-hidden="true">&#8594;</span>
            </button>
          ) : project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Explore Project Live <span className="arrow" aria-hidden="true">&#8594;</span>
            </a>
          ) : (
            <button className="btn-primary" onClick={toggleDetails}>
              Explore Case Study <span className="arrow" aria-hidden="true">&#8594;</span>
            </button>
          )
        ) : (
          <button className="btn-primary" onClick={toggleDetails}>
            Read My Story <span className="arrow" aria-hidden="true">&#8594;</span>
          </button>
        )}
        
        {isPersonal && (
          <a href="/resume.pdf" download className="btn-download">
            Download CV
          </a>
        )}

        {!isPersonal ? (
          project.isComingSoon ? null : project.link ? (
            <button className="btn-ghost" onClick={toggleDetails}>
              Explore Case Study <span className="arrow" aria-hidden="true">&#8594;</span>
            </button>
          ) : (
            <button className="btn-ghost" onClick={() => setView('CONTACT')}>
              Hire Me
            </button>
          )
        ) : (
          <button className="btn-ghost" onClick={() => setView('CONTACT')}>
            Hire Me
          </button>
        )}
      </div>

      {project.icons.length > 0 && (
        <div className="hero-socials" ref={socialsRef}>
          {project.icons.map((icon, idx) =>
            icon.url ? (
              <a
                key={idx}
                href={icon.url}
                target="_blank"
                rel="noreferrer"
                aria-label={icon.name || 'Social link'}
                className="icon-circle"
                dangerouslySetInnerHTML={{ __html: sanitize(icon.svg || '', { USE_PROFILES: { svg: true } }) }}
              />
            ) : null
          )}
        </div>
      )}

      {project.seoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(project.seoSchema) }}
        />
      )}
    </div>
  );
});

ProjectDisplay.displayName = 'ProjectDisplay';
export default ProjectDisplay;
