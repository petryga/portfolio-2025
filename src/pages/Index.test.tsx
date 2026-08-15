import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Stubbed for the same reason as in ParticlesBackground.test.tsx: no canvas in
// jsdom. Everything else on the page renders for real.
vi.mock('@tsparticles/slim', () => ({ loadSlim: vi.fn() }));
vi.mock('@tsparticles/react', () => ({
  default: () => <div data-testid="particles" />,
  ParticlesProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useParticlesProvider: () => ({ loaded: true }),
}));

import Index from './Index';

describe('Index page', () => {
  it('renders the whole page without throwing', () => {
    expect(() => render(<Index />)).not.toThrow();
  });

  it('composes every section of the site', () => {
    const { container } = render(<Index />);

    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('section#about')).toBeInTheDocument();
    expect(container.querySelector('section#work')).toBeInTheDocument();
    expect(container.querySelector('section#contact')).toBeInTheDocument();
    expect(screen.getByTestId('particles')).toBeInTheDocument();
  });

  it('orders the sections about → work → contact', () => {
    const { container } = render(<Index />);
    const ids = Array.from(container.querySelectorAll('section[id]')).map(
      (s) => s.id,
    );
    expect(ids).toEqual(['about', 'work', 'contact']);
  });

  // Every nav target must exist on the page, or the header scrolls nowhere.
  it('provides a section for every nav anchor', () => {
    const { container } = render(<Index />);
    const navAnchors = Array.from(
      container.querySelectorAll('nav a[href^="#"]'),
    )
      .map((a) => a.getAttribute('href'))
      .filter((href): href is string => Boolean(href) && href !== '#');

    for (const href of navAnchors) {
      expect(
        container.querySelector(`section${href}`),
        `nav links to ${href} but no section has that id`,
      ).toBeInTheDocument();
    }
  });

  it('renders the hero headline and the contact links together', () => {
    render(<Index />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /I ship features/,
    );
    expect(screen.getByRole('link', { name: /Email/ })).toBeInTheDocument();
  });
});
