import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import About from './About';
import { skillCategories } from '@/data/skills';

describe('About', () => {
  it('renders inside a section addressable by the nav anchor', () => {
    const { container } = render(<About />);
    expect(container.querySelector('section#about')).toBeInTheDocument();
  });

  it('renders the About heading', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'About' }),
    ).toBeInTheDocument();
  });

  it('renders the bio copy', () => {
    render(<About />);
    expect(
      screen.getByText(/early-stage legal tech startup/),
    ).toBeInTheDocument();
    expect(screen.getByText(/I run a home server/)).toBeInTheDocument();
  });

  // Driven off the real data module, so adding a skill to skills.ts cannot
  // silently fail to render.
  it('renders a heading for every category in skills.ts', () => {
    render(<About />);
    for (const { category } of skillCategories) {
      expect(
        screen.getByRole('heading', { level: 3, name: category }),
      ).toBeInTheDocument();
    }
  });

  it('renders every single skill from skills.ts', () => {
    render(<About />);
    for (const { category, skills } of skillCategories) {
      for (const skill of skills) {
        expect(
          screen.getAllByText(skill).length,
          `${skill} (${category}) is missing from the DOM`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it('renders no more skill tags than the data defines', () => {
    const { container } = render(<About />);
    const expected = skillCategories.reduce((n, c) => n + c.skills.length, 0);
    // Tags are the spans carrying the pill styling.
    const tags = container.querySelectorAll('span.font-mono.rounded-full');
    expect(tags.length).toBe(expected);
  });

  it('groups each skill under its own category heading', () => {
    const { container } = render(<About />);
    for (const { category, skills } of skillCategories) {
      const heading = screen.getByRole('heading', { level: 3, name: category });
      const group = heading.parentElement as HTMLElement;
      expect(group, `${category} has no wrapper`).toBeTruthy();
      for (const skill of skills) {
        expect(
          within(group).getByText(skill),
          `${skill} is not under ${category}`,
        ).toBeInTheDocument();
      }
    }
    expect(container).toBeTruthy();
  });
});
