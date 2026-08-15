import { render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { version } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tsparticles/slim', () => ({ loadSlim: vi.fn() }));
vi.mock('@tsparticles/react', () => ({
  default: () => <div data-testid="particles" />,
  ParticlesProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useParticlesProvider: () => ({ loaded: true }),
}));

import Index from './pages/Index';
import Navigation from './components/Navigation';

// The app does not wrap itself in StrictMode today, but React 19 double-invokes
// effects and render bodies under it and is stricter generally. Rendering the
// page this way is a cheap way to surface effect-cleanup and side-effect bugs
// that a single pass hides.
describe('React 19 compatibility', () => {
  it('runs on React 19', () => {
    expect(version.startsWith('19.')).toBe(true);
  });

  it('renders the whole page under StrictMode without throwing', () => {
    expect(() =>
      render(
        <StrictMode>
          <Index />
        </StrictMode>,
      ),
    ).not.toThrow();
  });

  it('still renders every section under StrictMode', () => {
    const { container } = render(
      <StrictMode>
        <Index />
      </StrictMode>,
    );

    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('section#about')).toBeInTheDocument();
    expect(container.querySelector('section#work')).toBeInTheDocument();
    expect(container.querySelector('section#contact')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /I ship features/,
    );
  });

  // Navigation's scroll listener is the one subscription in the app. Under
  // StrictMode's mount/unmount/remount, a missing cleanup leaks a listener.
  it('does not leak scroll listeners under StrictMode remounting', () => {
    const add = vi.spyOn(window, 'addEventListener');
    const remove = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(
      <StrictMode>
        <Navigation />
      </StrictMode>,
    );
    unmount();

    const added = add.mock.calls.filter(([e]) => e === 'scroll').length;
    const removed = remove.mock.calls.filter(([e]) => e === 'scroll').length;
    expect(removed).toBe(added);
  });
});
