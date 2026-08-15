import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import NotFound from './NotFound';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <NotFound />
    </MemoryRouter>,
  );

describe('NotFound', () => {
  it('renders the 404 heading and message', () => {
    renderAt('/nope');

    expect(
      screen.getByRole('heading', { level: 1, name: '404' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument();
  });

  it('offers a way back to the home page', () => {
    renderAt('/nope');
    expect(
      screen.getByRole('link', { name: 'Return to Home' }),
    ).toHaveAttribute('href', '/');
  });

  it('logs the attempted path so the miss is diagnosable', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderAt('/some/missing/page');

    expect(error).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      '/some/missing/page',
    );
  });

  it('logs once per render, not repeatedly', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderAt('/missing');

    expect(error).toHaveBeenCalledTimes(1);
  });
});
