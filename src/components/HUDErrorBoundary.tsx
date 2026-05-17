'use client';

import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackOverlay?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  mode: 'NORMAL' | 'STATIC_FAILOVER';
}

/**
 * HUDErrorBoundary: A premium fail-safe system for the portfolio.
 * If the Three.js or high-intensity JS engine fails, it provides
 * a graceful degradation to 'Static Mode' so the user can still read the content.
 */
export class HUDErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, mode: 'NORMAL' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, mode: 'NORMAL' };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('HUD_SUB_SYSTEM_FAILURE:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleSafeMode = () => {
    // Clear the error and switch to static mode
    this.setState({ hasError: false, error: null, mode: 'STATIC_FAILOVER' });
  };

  render() {
    // If we are in Static Failover mode, we don't render the broken children (the background/3D)
    // and instead render nothing or a static fallback in its place.
    if (this.state.mode === 'STATIC_FAILOVER') {
      return (
        <div style={{
          position: 'fixed', inset: 0, zIndex: -1,
          background: 'radial-gradient(circle at 20% 30%, #1a1510 0%, #0a0805 100%)',
        }} />
      );
    }

    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(5, 4, 3, 0.98)',
          fontFamily: 'var(--font-mono)',
          padding: '1.5rem',
          backdropFilter: 'blur(20px)',
        }}>
          {/* Diagnostic Grid */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(180,48,32,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(180,48,32,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div style={{
            position: 'relative', width: '100%', maxWidth: '480px',
            background: '#0a0807', border: '1px solid rgba(180,48,32,0.4)',
            padding: '2.5rem', boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              marginBottom: '2rem', color: '#ff4d4d'
            }}>
              <span style={{ fontSize: '1.2rem', animation: 'pulse 1s infinite' }}>⚠</span>
              <h2 style={{
                margin: 0, fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                fontWeight: 600, color: '#ff4d4d'
              }}>
                Engine Component Failure
              </h2>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
                The high-fidelity background engine encountered a critical error. This can happen on devices with 
                limited hardware acceleration or strict security settings.
              </p>
              <div style={{ 
                background: 'rgba(255,255,255,0.03)', padding: '0.75rem', 
                borderLeft: '2px solid #ff4d4d', fontSize: '0.75rem', color: '#bbb'
              }}>
                {this.state.error?.message || 'Error executing background runtime.'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={this.handleSafeMode}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', background: '#333' }}
              >
                Continue in Static Mode
              </button>
              <button
                onClick={this.handleReload}
                className="btn-ghost"
                style={{ width: '100%', justifyContent: 'center', opacity: 0.6 }}
              >
                Attempt Full Reboot
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
