'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useHUDStore } from '../store/useHUDStore';

/**
 * BACKGROUND SYSTEM v13.0 — "VOID ENGINE"
 * ───────────────────────────────────────────────────────────
 * · Source: /public/bg_v13.html
 * · Integration: High-performance iframe injection
 * · Interactivity bridges:
 *   - Global click  → CLICK postMessage  → ripple engine
 *   - mousemove     → MOUSEMOVE          → canvas portrait parallax (desktop)
 *   - mousemove     → MOUSEMOVE_MOBILE   → CSS portrait parallax (mobile inside iframe)
 *   - visibilitychange → PAUSE / PLAY    → power management
 * ───────────────────────────────────────────────────────────
 */
export default function BackgroundSystem() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const isPending = useHUDStore(state => state.isPending);

  const statusPhrases = [
    'initializing engine',
    'synchronizing reality',
    'establishing link',
    'deciphering pixels',
    'loading vision'
  ];

  useEffect(() => {
    if (isRevealed) return;
    const interval = setInterval(() => {
      setStatusIdx(prev => (prev + 1) % statusPhrases.length);
    }, 200);
    return () => clearInterval(interval);
  }, [isRevealed, statusPhrases.length]);

  useEffect(() => {
    let isMounted = true;
    if (typeof window === 'undefined') return;

    let safetyTimeout: ReturnType<typeof setTimeout> | null = null;

    // ── Reveal Control ──
    const reveal = () => {
      if (isMounted) setIsRevealed(true);
    };

    // Safety Reveal — Force exit loading screen after 1.5s
    safetyTimeout = setTimeout(reveal, 1500);

    // ── Mouse Forwarding (throttled at ~60fps) ──
    // Forwards to BOTH MOUSEMOVE (canvas engine) and MOUSEMOVE_MOBILE
    // (mobile CSS parallax fallback when loaded in an iframe context).
    let lastMoveTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime < 16) return; // ~60fps cap
      lastMoveTime = now;

      if (iframeRef.current?.contentWindow) {
        const rx = e.clientX / window.innerWidth;
        const ry = e.clientY / window.innerHeight;
        // Desktop canvas path
        iframeRef.current.contentWindow.postMessage({ type: 'MOUSEMOVE', rx, ry }, '*');
        // Mobile CSS path (no-op inside bg_v13 on desktop breakpoint)
        iframeRef.current.contentWindow.postMessage({ type: 'MOUSEMOVE_MOBILE', rx, ry }, '*');
      }
    };

    // ── Click Propagation → ripple engine ──
    const handleGlobalClick = (e: MouseEvent) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'CLICK',
          x: e.clientX,
          y: e.clientY
        }, '*');
      }
    };

    // ── Visibility / Power Management ──
    const handleVisibility = () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          document.hidden ? 'PAUSE' : 'PLAY',
          '*'
        );
      }
    };

    // ── Gyroscope forwarding (mobile only) ──
    // DeviceOrientationEvent.requestPermission() MUST be called from the
    // top-level frame — iOS rejects it from inside any iframe, even same-origin.
    // We request permission here in the parent and forward raw sensor data
    // via postMessage so bg_v13.html can drive the portrait parallax.
    let orientationCleanup: (() => void) | null = null;

    const forwardOrientation = (e: DeviceOrientationEvent) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'ORIENTATION',
          gamma: e.gamma,
          beta:  e.beta
        }, '*');
      }
    };

    const startOrientation = () => {
      window.addEventListener('deviceorientation', forwardOrientation, { passive: true });
      orientationCleanup = () => window.removeEventListener('deviceorientation', forwardOrientation);
    };

    const onFirstTap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (DeviceOrientationEvent as any).requestPermission()
        .then((state: string) => { if (state === 'granted') startOrientation(); })
        .catch(() => {/* user denied — graceful no-op */});
    };

    if (typeof window !== 'undefined' && typeof DeviceOrientationEvent !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // iOS 13+ — MUST be triggered by user gesture in top-level frame
        document.addEventListener('click', onFirstTap, { once: true });
      } else if (window.innerWidth < 1100) {
        // Android / older iOS — no permission dialog, start immediately if likely mobile
        startOrientation();
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleGlobalClick);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      isMounted = false;
      if (safetyTimeout) clearTimeout(safetyTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('click', onFirstTap);
      if (orientationCleanup) orientationCleanup();
    };
  }, []);

  // ── Pause on transition ──
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(isPending ? 'PAUSE' : 'PLAY', '*');
    }
  }, [isPending]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: '#000' }}>
      {/* Preloader HUD */}
      <div id="bg-loader" className={isRevealed ? 'out' : ''} role="status" aria-label="Loading Background">
        <div className="ld-lines" aria-hidden="true">
          <div className="ld-line" /><div className="ld-line" /><div className="ld-line" />
        </div>
        <div className="ld-word" aria-hidden="true">{statusPhrases[statusIdx]}</div>
      </div>

      {/* Ambiance Glows */}
      <div className="amb amb-warm" aria-hidden="true" />
      <div className="amb amb-cool" aria-hidden="true" />

      <iframe
        ref={iframeRef}
        src={process.env.NODE_ENV === 'development' ? "/bg_v13.html?v=13.1" : "/bg_v13?v=13.1"}
        title="Background Engine"
        scrolling="no"
        allow="gyroscope"
        onLoad={() => {
          setTimeout(() => setIsRevealed(true), 300);
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          pointerEvents: 'none',
          userSelect: 'none',
          overflow: 'hidden',
        }}
      />

      {/* Cinematic Vignette */}
      <div id="vig" aria-hidden="true" style={{ zIndex: 1 }} />
    </div>
  );
}