import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// tsparticles drives a real canvas, which jsdom does not implement, so the
// library is stubbed. What is under test is this component's own wiring to the
// v4 API — the ParticlesProvider/useParticlesProvider pair that replaced
// initParticlesEngine — not the particle engine itself.
const loadSlim = vi.fn().mockResolvedValue(undefined);
let providerLoaded = true;
let capturedInit: ((engine: unknown) => Promise<void>) | null = null;

vi.mock('@tsparticles/slim', () => ({
  loadSlim: (engine: unknown) => loadSlim(engine),
}));

vi.mock('@tsparticles/react', () => ({
  default: (props: Record<string, unknown>) => (
    <div
      data-testid="particles"
      data-id={props.id as string}
      className={props.className as string}
    />
  ),
  ParticlesProvider: ({
    children,
    init,
  }: {
    children: React.ReactNode;
    init: (engine: unknown) => Promise<void>;
  }) => {
    capturedInit = init;
    return <div data-testid="particles-provider">{children}</div>;
  },
  useParticlesProvider: () => ({ loaded: providerLoaded }),
}));

import ParticlesBackground from './ParticlesBackground';

describe('ParticlesBackground', () => {
  beforeEach(() => {
    providerLoaded = true;
    capturedInit = null;
    loadSlim.mockClear();
  });

  it('mounts without throwing', () => {
    expect(() => render(<ParticlesBackground />)).not.toThrow();
  });

  it('wraps the particle layer in a provider', () => {
    render(<ParticlesBackground />);
    expect(screen.getByTestId('particles-provider')).toBeInTheDocument();
  });

  it('registers the slim bundle through the provider init callback', async () => {
    render(<ParticlesBackground />);

    expect(capturedInit).toBeTypeOf('function');
    await capturedInit?.({ fake: 'engine' });
    expect(loadSlim).toHaveBeenCalledOnce();
    expect(loadSlim).toHaveBeenCalledWith({ fake: 'engine' });
  });

  it('renders the particle canvas once the provider reports loaded', () => {
    render(<ParticlesBackground />);
    const particles = screen.getByTestId('particles');

    expect(particles).toHaveAttribute('data-id', 'tsparticles');
    // Sits behind the page content.
    expect(particles.className).toContain('-z-10');
    expect(particles.className).toContain('absolute');
  });

  it('renders nothing until the provider reports loaded', () => {
    providerLoaded = false;
    render(<ParticlesBackground />);

    expect(screen.queryByTestId('particles')).not.toBeInTheDocument();
    // The provider is still mounted, so loading can complete.
    expect(screen.getByTestId('particles-provider')).toBeInTheDocument();
  });
});
