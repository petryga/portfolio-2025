import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tsparticles/slim', () => ({ loadSlim: vi.fn() }));
vi.mock('@tsparticles/react', () => ({
  default: () => <div data-testid="particles" />,
  ParticlesProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useParticlesProvider: () => ({ loaded: true }),
}));

import App from './App';

describe('App', () => {
  it('mounts the full provider stack without throwing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders the home page at /', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /I ship features/,
    );
  });

  it('renders the 404 page for an unknown route', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    window.history.pushState({}, '', '/definitely-not-a-page');

    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: '404' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument();
    expect(error).toHaveBeenCalled();
  });

  it('does not render the home page content on a 404', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    window.history.pushState({}, '', '/nope');

    render(<App />);

    expect(screen.queryByText('Selected Projects')).not.toBeInTheDocument();
  });

  // The catch-all must stay last, or it swallows real routes added above it.
  it('treats a nested unknown path as a 404 too', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    window.history.pushState({}, '', '/a/b/c');

    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: '404' }),
    ).toBeInTheDocument();
  });
});
