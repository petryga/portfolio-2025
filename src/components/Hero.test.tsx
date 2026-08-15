import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the headline as the page h1', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent(/I ship features/);
    expect(heading).toHaveTextContent(/that move money/);
  });

  it('renders exactly one h1, so the page has a single top-level heading', () => {
    render(<Hero />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('states the years of experience in the intro copy', () => {
    render(<Hero />);
    expect(screen.getByText(/5\+ years of full stack work/)).toBeInTheDocument();
  });

  it('links through to the work section', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /View my work/ })).toHaveAttribute(
      'href',
      '#work',
    );
  });
});
