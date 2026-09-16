import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RootLayout from '../../app/layout';

// Mock Next.js specialized components
vi.mock('next/font/google', () => ({
  Cormorant_Garamond: () => ({ variable: 'cormorant' }),
  DM_Sans: () => ({ variable: 'dm-sans' }),
  JetBrains_Mono: () => ({ variable: 'jetbrains' }),
  Syne: () => ({ variable: 'syne' }),
  Space_Mono: () => ({ variable: 'space-mono' }),
}));

vi.mock('next/script', () => ({
  default: ({ src }: { src: string }) => <script src={src} data-testid="mock-script" />,
}));

describe('RootLayout', () => {
  beforeEach(() => {
    document.querySelectorAll('script[src*="googletagmanager"]').forEach((s) => s.remove());
    document.querySelectorAll('#google-analytics').forEach((s) => s.remove());
  });

  it('renders children and base structure', () => {
    // Mock env variable for conditional GA testing
    process.env.NEXT_PUBLIC_GA_ID = 'G-TEST';

    render(
      <RootLayout>
        <div data-testid="child">CHILD_CONTENT</div>
      </RootLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
    
    // Check GA scripts are rendered when ID exists
    const gaScript = document.querySelector('script[src*="googletagmanager"]');
    expect(gaScript).toBeInTheDocument();
    expect(gaScript).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-TEST');
  });

  it('does not render GA scripts when ID is missing', () => {
    const originalEnv = process.env.NEXT_PUBLIC_GA_ID;
    delete process.env.NEXT_PUBLIC_GA_ID;

    render(
      <RootLayout>
        <div />
      </RootLayout>
    );

    const gaScript = document.querySelector('script[src*="googletagmanager"]');
    expect(gaScript).not.toBeInTheDocument();

    // Restore env
    process.env.NEXT_PUBLIC_GA_ID = originalEnv;
  });
});
