import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// tsparticles drives a real canvas, which jsdom does not implement, so the
// library is stubbed. What is under test is this component's own wiring —
// that it registers the slim bundle and only renders once init resolves.
const loadSlim = vi.fn().mockResolvedValue(undefined);
let initShouldReject = false;
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
  initParticlesEngine: (cb: (engine: unknown) => Promise<void>) => {
    capturedInit = cb;
    return initShouldReject
      ? Promise.reject(new Error('engine failed'))
      : Promise.resolve();
  },
}));

import ParticlesBackground from './ParticlesBackground';

describe('ParticlesBackground', () => {
  beforeEach(() => {
    initShouldReject = false;
    capturedInit = null;
    loadSlim.mockClear();
  });

  it('mounts without throwing', () => {
    expect(() => render(<ParticlesBackground />)).not.toThrow();
  });

  it('renders nothing until the engine has initialised', () => {
    render(<ParticlesBackground />);
    // Synchronously, before the init promise resolves.
    expect(screen.queryByTestId('particles')).not.toBeInTheDocument();
  });

  it('renders the particle layer once the engine is ready', async () => {
    render(<ParticlesBackground />);

    await waitFor(() => {
      expect(screen.getByTestId('particles')).toBeInTheDocument();
    });
  });

  it('registers the slim bundle with the engine', async () => {
    render(<ParticlesBackground />);

    await waitFor(() => expect(capturedInit).toBeTypeOf('function'));
    await capturedInit?.({ fake: 'engine' });

    expect(loadSlim).toHaveBeenCalledOnce();
    expect(loadSlim).toHaveBeenCalledWith({ fake: 'engine' });
  });

  it('sits behind the page content as a full-bleed layer', async () => {
    render(<ParticlesBackground />);

    const particles = await screen.findByTestId('particles');
    expect(particles).toHaveAttribute('data-id', 'tsparticles');
    expect(particles.className).toContain('absolute');
    expect(particles.className).toContain('inset-0');
    expect(particles.className).toContain('-z-10');
  });

  // The background is decorative: if the engine fails to load, the page must
  // still render rather than taking the site down with it.
  it('stays silent if the engine fails to initialise', async () => {
    initShouldReject = true;
    const unhandled = vi.fn();
    window.addEventListener('unhandledrejection', unhandled);

    expect(() => render(<ParticlesBackground />)).not.toThrow();
    await new Promise((r) => setTimeout(r, 0));
    expect(screen.queryByTestId('particles')).not.toBeInTheDocument();

    window.removeEventListener('unhandledrejection', unhandled);
  });
});
