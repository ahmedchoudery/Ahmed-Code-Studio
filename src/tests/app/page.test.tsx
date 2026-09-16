import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RootSelectorPage from '../../app/page';
import RecruiterPage from '../../app/recruiter/page';

// Mock ClientHome as it's tested separately
vi.mock('../../components/ClientHome', () => ({
  default: () => <div data-testid="client-home">CLIENT_HOME</div>,
}));

describe('Root Selector Page (/)', () => {
  it('renders the name and descriptive paragraph', () => {
    render(<RootSelectorPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Muhammad Ahmed Raza/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Full-stack web developer building e-commerce and booking platforms/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Gujrat, Pakistan/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders clearly labeled choices for client and recruiter', () => {
    render(<RootSelectorPage />);

    const clientLink = screen.getByRole('link', { name: /I'm hiring for a project/i });
    expect(clientLink).toBeInTheDocument();
    expect(clientLink.getAttribute('href')).toMatch(/^\/client\/?$/);

    const recruiterLink = screen.getByRole('link', { name: /I'm a recruiter/i });
    expect(recruiterLink).toBeInTheDocument();
    expect(recruiterLink.getAttribute('href')).toMatch(/^\/recruiter\/?$/);
  });
});

describe('Recruiter Page (/recruiter)', () => {
  it('renders the ClientHome component', () => {
    render(<RecruiterPage />);
    expect(screen.getByTestId('client-home')).toBeInTheDocument();
  });
});
