import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ClientHome from '../../components/ClientHome';
import { useHUDStore } from '../../store/useHUDStore';

// Mock next/dynamic to be synchronous in tests
vi.mock('next/dynamic', () => ({
  default: (fn: any) => {
    // If it's a function that returns a promise (like () => import(...))
    // we just execute it and hope it's already mocked or return a dummy
    // But since we are mocking the components individually, we just need
    // the dynamic wrapper to not break things.
    return function MockDynamic(props: any) {
      // We'll just try to render what the function returns if it's synchronous
      // or just render nothing if it's a promise (the individual mocks will handle it)
      const [Component, setComponent] = React.useState<any>(null);
      React.useEffect(() => {
        fn().then((mod: any) => {
          setComponent(() => mod.default || mod);
        });
      }, []);
      return Component ? <Component {...props} /> : null;
    };
  },
}));

// Mock child components to isolate ClientHome tests
vi.mock('../../components/TopNav', () => ({
  default: () => <div data-testid="mock-topnav">TOPNAV</div>,
}));

vi.mock('../../components/ProjectDisplay', () => ({
  default: () => <div data-testid="mock-project">PROJECT_DISPLAY</div>,
}));

vi.mock('../../components/TechnicalSpecs', () => ({
  default: () => <div data-testid="mock-specs">TECH_SPECS</div>,
}));

vi.mock('../../components/BackgroundSystem', () => ({
  default: () => <div data-testid="mock-bg">BACKGROUND</div>,
}));

vi.mock('../../components/ContactHUD', () => ({
  ContactHUD: () => <div data-testid="mock-contact">CONTACT_HUD</div>,
}));

describe('ClientHome Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useHUDStore.setState({ currentIndex: 0, isPending: false, view: 'MAIN' });
  });

  it('renders standard layout', () => {
    render(<ClientHome />);

    expect(screen.getByTestId('mock-bg')).toBeInTheDocument();
    expect(screen.getByTestId('mock-topnav')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-contact')).not.toBeInTheDocument();

    // Standard view should show Project + Specs
    expect(screen.getByTestId('mock-project')).toBeInTheDocument();
    expect(screen.getByTestId('mock-specs')).toBeInTheDocument();
  });

  it('renders ContactHUD when view is CONTACT', async () => {
    useHUDStore.setState({ view: 'CONTACT' });
    render(<ClientHome />);
    expect(await screen.findByTestId('mock-contact')).toBeInTheDocument();
  });

  it('applies pending opacity when isPending is true', () => {
    useHUDStore.setState({ isPending: true });
    
    const { container } = render(<ClientHome />);
    
    const appWrapper = container.querySelector('#app') as HTMLElement;
    expect(appWrapper).toHaveStyle({ opacity: '0.7' });
  });
});

