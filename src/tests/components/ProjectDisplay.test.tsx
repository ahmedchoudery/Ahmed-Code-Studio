import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProjectDisplay from '../../components/ProjectDisplay';

// Mock GSAP to prevent animation issues in jsdom
vi.mock('gsap', () => ({
  default: {
    context: (fn: any) => {
      fn();
      return { revert: vi.fn() };
    },
    fromTo: vi.fn(),
    to: vi.fn(),
  },
}));

// Mock HUD store
vi.mock('../../store/useHUDStore', () => ({
  useHUDStore: (selector: any) => selector({ isPending: false }),
}));

describe('ProjectDisplay Component', () => {
  const mockProject = {
    headline: 'TEST HEADLINE',
    subheadline: 'TEST SUB',
    description: '<p>Test description HTML</p>',
    icons: [
      { name: 'GitHub', svg: '<svg id="github-icon"></svg>', url: 'https://github.com' }
    ],
    link: 'https://work.local',
    specsTitle: 'SPECS',
    specs: []
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project data correctly', () => {
    render(<ProjectDisplay project={mockProject as any} index={1} />);

    // Assert headline
    expect(screen.getByText('TEST HEADLINE')).toBeInTheDocument();
    
    // Assert subheadline
    expect(screen.getByText('TEST SUB')).toBeInTheDocument();

    // Assert description parsing
    expect(screen.getByText('Test description HTML')).toBeInTheDocument();

    // Assert buttons for non-personal project
    expect(screen.getByRole('button', { name: /Explore Case Study/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Hire Me/i })).toBeInTheDocument();
  });

  it('renders icons properly if present', () => {
    render(<ProjectDisplay project={mockProject as any} index={2} />);
    
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com');
  });

  it('renders correct buttons for personal intro project', () => {
    const noLinksProject = { ...mockProject, link: undefined };
    render(<ProjectDisplay project={noLinksProject as any} index={0} />);

    // Since index 0 is personal, it shows "Read My Story" instead of "Explore Case Study"
    expect(screen.getByRole('button', { name: /Read My Story/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Hire Me/i })).toBeInTheDocument();
  });
});

