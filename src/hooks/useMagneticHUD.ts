'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * Custom hook to manage the magnetic 'pull' effect on HUD corners.
 * Attaches a mousemove listener to the window and animates elements 
 * with the '.hud-corner' class when the cursor is in proximity.
 */
export function useMagneticHUD() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    
    // Only enable on desktop/large screens for performance and ergonomics
    mm.add("(min-width: 1024px)", () => {
      // MASTER OPTIMIZATION: Query once, not on every mousemove
      const corners = document.querySelectorAll('.hud-corner');
      
      const handleMouseMove = (e: MouseEvent) => {
        corners.forEach((corner) => {
          const rect = (corner as HTMLElement).getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          const distance = Math.hypot(dx, dy);
          
          if (distance < 150) {
            const pullX = dx * 0.4;
            const pullY = dy * 0.4;
            gsap.to(corner, { 
              x: pullX, 
              y: pullY, 
              duration: 0.4, 
              ease: 'power2.out',
              overwrite: 'auto' // Mastery: Prevent animation fighting
            });
          } else {
            gsap.to(corner, { 
              x: 0, 
              y: 0, 
              duration: 0.6, 
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        // Reset positions on cleanup
        corners.forEach(c => gsap.set(c, { x: 0, y: 0 }));
      };
    });

    return () => mm.revert();
  }, []);
}
