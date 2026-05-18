import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactHUD } from '../../components/ContactHUD';
import { useHUDStore } from '../../store/useHUDStore';

// Mock matchMedia if not already mocked in setup
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('ContactHUD Component', () => {
  beforeEach(() => {
    useHUDStore.setState({ view: 'CONTACT', isPending: false });
    vi.restoreAllMocks();
  });

  it('renders the contact form when view is CONTACT', () => {
    render(<ContactHUD />);
    expect(screen.getByText(/Connect/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^NAME$/i)).toBeInTheDocument();
  });

  it('validates empty submissions via Zod schema', async () => {
    render(<ContactHUD />);
    const user = userEvent.setup();
    
    const fetchSpy = vi.spyOn(global, 'fetch');

    // Fill with invalid data
    const nameInput = screen.getByLabelText(/^NAME$/i);
    const emailInput = screen.getByLabelText(/^EMAIL$/i);
    const messageInput = screen.getByLabelText(/^MESSAGE$/i);

    await user.type(nameInput, 'A');
    await user.type(emailInput, 'invalid');
    await user.type(messageInput, 'short');

    const submitBtn = screen.getByRole('button', { name: /INITIATE CONTACT/i });
    
    // Use fireEvent.submit directly on the form to bypass native HTML5 validation
    fireEvent.submit(screen.getByLabelText(/^NAME$/i).closest('form')!);

    expect(fetchSpy).not.toHaveBeenCalled();

    // Verify Zod validation messages appear
    expect(await screen.findByText(/Name must be at least 2 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Message must be at least 10 characters/i)).toBeInTheDocument();
  });

  it('submits form successfully and displays complete message', async () => {
    render(<ContactHUD />);
    const user = userEvent.setup();
    
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }))
    );

    await user.type(screen.getByLabelText(/^NAME$/i), 'Ahmed Raza');
    await user.type(screen.getByLabelText(/^EMAIL$/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^MESSAGE$/i), 'This is a test message for the portfolio form.');

    fireEvent.click(screen.getByRole('button', { name: /INITIATE CONTACT/i }));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Transmission successful.')).toBeInTheDocument();
    });
  });

  it('handles server errors gracefully', async () => {
    render(<ContactHUD />);
    const user = userEvent.setup();
    
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: false, message: 'Submission failed' }))
    );

    await user.type(screen.getByLabelText(/^NAME$/i), 'Test User');
    await user.type(screen.getByLabelText(/^EMAIL$/i), 'error@test.com');
    await user.type(screen.getByLabelText(/^MESSAGE$/i), 'Testing error handling in form submission.');

    fireEvent.click(screen.getByRole('button', { name: /INITIATE CONTACT/i }));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Link failure/i)).toBeInTheDocument();
    });
  });
});

