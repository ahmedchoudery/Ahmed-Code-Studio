'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Spec } from '../data/projects';

interface TechnicalSpecsProps {
  title: string;
  specs: Spec[];
}

const TechnicalSpecs: React.FC<TechnicalSpecsProps> = React.memo(({ title, specs }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    
    // GSAP Panel Entrance
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    // Trigger skill bar animations with a slight delay
    const timer = setTimeout(() => {
      const bars = panelRef.current?.querySelectorAll('.skill-bar-fill');
      bars?.forEach(bar => bar.classList.add('animate'));
    }, 600);

    return () => {
      clearTimeout(timer);
      const bars = panelRef.current?.querySelectorAll('.skill-bar-fill');
      bars?.forEach(bar => bar.classList.remove('animate'));
    };
  }, [specs]);

  return (
    <aside className="skills-panel" ref={panelRef} aria-label="Technical Skills">
      <div className="skills-header">{title}</div>
      {specs.map((spec, idx) => (
        <div key={idx} className="skill-row">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'baseline' }}>
            <span className="skill-cat">{spec.label}</span>
            {spec.proficiency && <span className="mono-label" style={{ fontSize: '0.6rem', opacity: 0.6 }}>{spec.proficiency}%</span>}
          </div>
          <span className="skill-val">{spec.value}</span>
          
          {spec.proficiency && (
            <div className="skill-bar-track">
              <div 
                className="skill-bar-fill" 
                style={{ '--bar-pct': `${spec.proficiency}%` } as React.CSSProperties} 
              />
            </div>
          )}
        </div>
      ))}
    </aside>
  );
});

TechnicalSpecs.displayName = 'TechnicalSpecs';
export default TechnicalSpecs;
