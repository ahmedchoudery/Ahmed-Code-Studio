import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TopNav from '../../components/TopNav';
import { useHUDStore } from '../../store/useHUDStore';

describe('TopNav Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useHUDStore.setState({ 
      currentIndex: 0, 
      view: 'MAIN',
    });
  });

  it('renders Page counter correctly', () => {
    render(<TopNav />);
    expect(screen.getByText(/Page 01 \/ \d+/i)).toBeInTheDocument();
  });

  it('handles NEXT button correctly', () => {
    // Current total is assuming at least 2 projects based on data/projects
    useHUDStore.setState({ currentIndex: 0 });
    render(<TopNav />);

    const nextBtn = screen.getByRole('button', { name: 'Next project' });
    expect(nextBtn).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(useHUDStore.getState().currentIndex).toBe(1);
  });

  it('handles Contact click', () => {
    render(<TopNav />);
    const contactBtn = screen.getByRole('button', { name: 'Open contact form' });
    expect(contactBtn).toBeInTheDocument();

    fireEvent.click(contactBtn);
    expect(useHUDStore.getState().view).toBe('CONTACT');
  });
});

