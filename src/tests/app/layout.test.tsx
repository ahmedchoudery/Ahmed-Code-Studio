import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
  it('renders children and base structure', () => {
    // Mock env variable for conditional GA testing
    process.env.NEXT_PUBLIC_GA_ID = 'G-TEST';

    const { container } = render(
      <RootLayout>
        <div data-testid="child">CHILD_CONTENT</div>
      </RootLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
    
    // Check GA scripts are rendered when ID exists
    const scripts = screen.getAllByTestId('mock-script');
    expect(scripts.length).toBeGreaterThan(0);
    expect(scripts[0]).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-TEST');
  });

  it('does not render GA scripts when ID is missing', () => {
    const originalEnv = process.env.NEXT_PUBLIC_GA_ID;
    delete process.env.NEXT_PUBLIC_GA_ID;

    render(
      <RootLayout>
        <div />
      </RootLayout>
    );

    expect(screen.queryByTestId('mock-script')).not.toBeInTheDocument();

    // Restore env
    process.env.NEXT_PUBLIC_GA_ID = originalEnv;
  });
});
