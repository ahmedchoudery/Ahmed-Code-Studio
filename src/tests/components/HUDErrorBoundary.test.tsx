import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HUDErrorBoundary } from '../../components/HUDErrorBoundary';

const ThrowError = () => {
  throw new Error('Test Error');
};

describe('HUDErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <HUDErrorBoundary>
        <div data-testid="child">CHILD</div>
      </HUDErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders error message when an error occurs', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <HUDErrorBoundary>
        <ThrowError />
      </HUDErrorBoundary>
    );

    expect(screen.getByText('Engine Component Failure')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('reloads the page when the button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const reloadSpy = vi.fn();
    
    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      value: { reload: reloadSpy },
      writable: true,
    });

    render(
      <HUDErrorBoundary>
        <ThrowError />
      </HUDErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /Attempt Full Reboot/i });
    button.click();

    expect(reloadSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

