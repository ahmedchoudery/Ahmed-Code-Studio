import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TechnicalSpecs from '../../components/TechnicalSpecs';

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    fromTo: vi.fn(),
  },
}));

describe('TechnicalSpecs Component', () => {
  it('renders the technical specifications correctly', async () => {
    const specs = [
      { label: 'Role', value: 'Security Analyst' },
      { label: 'System', value: 'Unix/Linux' },
    ];

    render(<TechnicalSpecs title="TECHNICAL SKILLS" specs={specs} />);

    // Renders title and specs
    expect(screen.getByText('TECHNICAL SKILLS')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Security Analyst')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
    expect(screen.getByText('Unix/Linux')).toBeInTheDocument();
  });
});

