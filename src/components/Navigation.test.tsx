import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navigation from './Navigation';

const nav = () => screen.getByRole('navigation');

describe('Navigation', () => {
  it('renders the three section links pointing at the page anchors', () => {
    render(<Navigation />);

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '#about',
    );
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'href',
      '#work',
    );
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#contact',
    );
  });

  // Each anchor has to match a section id, or the nav silently scrolls nowhere.
  it('links only to anchors the page actually defines', () => {
    render(<Navigation />);
    const anchors = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
      .filter((href): href is string => Boolean(href?.startsWith('#')));

    expect(anchors.sort()).toEqual(['#', '#about', '#contact', '#work']);
  });

  it('renders the wordmark', () => {
    render(<Navigation />);
    expect(
      screen.getByRole('link', { name: 'Alexandra Petryga' }),
    ).toBeInTheDocument();
  });

  it('starts transparent before any scrolling', () => {
    render(<Navigation />);
    expect(nav().className).toContain('bg-transparent');
    expect(nav().className).not.toContain('backdrop-blur-md');
  });

  it('becomes opaque once scrolled past the 50px threshold', () => {
    render(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 51, writable: true });
    fireEvent.scroll(window);

    expect(nav().className).toContain('backdrop-blur-md');
    expect(nav().className).toContain('border-b');
    expect(nav().className).not.toContain('bg-transparent');
  });

  it('stays transparent exactly at the threshold (> 50, not >= 50)', () => {
    render(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    fireEvent.scroll(window);

    expect(nav().className).toContain('bg-transparent');
  });

  it('reverts to transparent when scrolled back to the top', () => {
    render(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);
    expect(nav().className).toContain('backdrop-blur-md');

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    fireEvent.scroll(window);
    expect(nav().className).toContain('bg-transparent');
  });

  it('removes its scroll listener on unmount', () => {
    const { unmount } = render(<Navigation />);
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
