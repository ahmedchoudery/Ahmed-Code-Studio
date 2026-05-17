import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../../app/page';

// Mock ClientHome as it's tested separately
vi.mock('../../components/ClientHome', () => ({
  default: () => <div data-testid="client-home">CLIENT_HOME</div>,
}));

describe('Home Page', () => {
  it('renders the ClientHome component', () => {
    render(<Home />);
    expect(screen.getByTestId('client-home')).toBeInTheDocument();
  });
});
