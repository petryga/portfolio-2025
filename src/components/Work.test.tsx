import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Work from './Work';

const PROJECTS = [
  'GoVeyance',
  'ReadyWhen',
  'Admin Portal',
  'Support Portal',
  'Expense Tracker',
  'Kanban board',
  'Landing Page 2024',
  'Landing Page 2021',
  'Landing Page 2020',
];

// Listed in render order.
const SCRIPTS = [
  'GAIA Benchmark Agent',
  'Waste Sorting Classifier',
  'Home Assistant Voice Pipeline',
  'Job Search Claude Code Agent',
  'Music Library Automation',
  'macOS Focus-Mode Script',
];

// Projects rendered without a public URL — these are the internal tools.
const PROJECTS_WITHOUT_LINK = ['Support Portal'];
// Projects rendered without a screenshot, which fall back to the lock tile.
const PROJECTS_WITHOUT_IMAGE = ['Admin Portal', 'Support Portal'];

describe('Work', () => {
  it('renders inside a section addressable by the nav anchor', () => {
    const { container } = render(<Work />);
    expect(container.querySelector('section#work')).toBeInTheDocument();
  });

  it('renders both section headings', () => {
    render(<Work />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Selected Projects' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Scripts, Automation & Experiments',
      }),
    ).toBeInTheDocument();
  });

  it('renders every project title', () => {
    render(<Work />);
    for (const title of PROJECTS) {
      expect(screen.getByText(title), `${title} is missing`).toBeInTheDocument();
    }
  });

  it('renders exactly the expected number of projects', () => {
    const { container } = render(<Work />);
    // Each project is one grid anchor.
    const cards = container.querySelectorAll('.grid > a');
    expect(cards.length).toBe(PROJECTS.length);
  });

  it('renders every script title', () => {
    render(<Work />);
    for (const title of SCRIPTS) {
      expect(screen.getByText(title), `${title} is missing`).toBeInTheDocument();
    }
  });

  it('renders exactly the expected number of scripts', () => {
    const { container } = render(<Work />);
    // Each script is one terminal-styled card in the second grid.
    const cards = container.querySelectorAll('.terminal-card');
    expect(cards.length).toBe(SCRIPTS.length);
  });

  it('renders the scripts in the intended order', () => {
    const { container } = render(<Work />);
    const titles = Array.from(container.querySelectorAll('.terminal-card h3')).map(
      (h) => h.textContent?.trim(),
    );
    expect(titles).toEqual(SCRIPTS);
  });

  it('gives each script a description and at least one tech tag', () => {
    const { container } = render(<Work />);
    container.querySelectorAll('.terminal-card').forEach((card) => {
      expect(card.querySelector('p')?.textContent?.trim().length ?? 0).toBeGreaterThan(20);
      expect(
        card.querySelectorAll('span.font-mono.rounded-full').length,
      ).toBeGreaterThan(0);
    });
  });

  it('gives each project a non-empty description', () => {
    const { container } = render(<Work />);
    const paragraphs = container.querySelectorAll('.grid > a p');
    expect(paragraphs.length).toBe(PROJECTS.length);
    paragraphs.forEach((p) => {
      expect(p.textContent?.trim().length ?? 0).toBeGreaterThan(20);
    });
  });

  it('gives each project at least one tech tag', () => {
    const { container } = render(<Work />);
    container.querySelectorAll('.grid > a').forEach((card) => {
      const tags = card.querySelectorAll('span.font-mono.rounded-full');
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  describe('external links', () => {
    it('opens every linked project in a new tab, safely', () => {
      render(<Work />);
      const links = screen
        .getAllByRole('link')
        .filter((a) => a.getAttribute('href'));

      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link.getAttribute('rel')).toContain('noopener');
        expect(link.getAttribute('rel')).toContain('noreferrer');
      }
    });

    it('points the linked projects at absolute https URLs', () => {
      render(<Work />);
      screen
        .getAllByRole('link')
        .map((a) => a.getAttribute('href'))
        .filter((href): href is string => Boolean(href))
        .forEach((href) => {
          expect(href).toMatch(/^https:\/\//);
        });
    });

    it('links the projects whose titles name a live site', () => {
      const { container } = render(<Work />);
      const hrefByTitle = new Map<string, string | null>();
      container.querySelectorAll('.grid > a').forEach((card) => {
        const title = card.querySelector('[class*="text-lg"]')?.textContent;
        if (title) hrefByTitle.set(title.trim(), card.getAttribute('href'));
      });

      expect(hrefByTitle.get('GoVeyance')).toBe('https://goveyance.com/');
      expect(hrefByTitle.get('ReadyWhen')).toBe('https://readywhen.com/');
      expect(hrefByTitle.get('Landing Page 2020')).toBe(
        'https://petryga.github.io/portfolio-2020/',
      );
    });

    // KNOWN DEFECT, documented rather than asserted as desirable: a project
    // with no `link` still renders an <a> element, just without an href. An
    // anchor without href is not a link — it is not focusable and not
    // clickable — yet it still carries target="_blank". Fixing it means
    // rendering a non-anchor wrapper when there is no URL; this test pins the
    // current behaviour so the fix is visible when it happens.
    it('renders link-less projects as an anchor with no href (known defect)', () => {
      const { container } = render(<Work />);
      const hrefless = Array.from(container.querySelectorAll('.grid > a')).filter(
        (a) => !a.getAttribute('href'),
      );

      expect(hrefless.length).toBe(PROJECTS_WITHOUT_LINK.length);
      hrefless.forEach((a) => {
        expect(a.className).toContain('cursor-default');
      });
    });
  });

  describe('screenshots', () => {
    it('gives every screenshot descriptive alt text', () => {
      render(<Work />);
      const images = screen.getAllByRole('img');
      expect(images.length).toBe(
        PROJECTS.length - PROJECTS_WITHOUT_IMAGE.length,
      );
      for (const img of images) {
        expect(img).toHaveAccessibleName(/screenshot$/);
      }
    });

    it('names each screenshot after its project', () => {
      render(<Work />);
      expect(
        screen.getByAltText('GoVeyance screenshot'),
      ).toBeInTheDocument();
      expect(
        screen.getByAltText('Expense Tracker screenshot'),
      ).toBeInTheDocument();
    });

    it('falls back to a lock tile for projects with no public preview', () => {
      render(<Work />);
      const fallbacks = screen.getAllByText('Internal tool — no public preview');
      expect(fallbacks.length).toBe(PROJECTS_WITHOUT_IMAGE.length);
    });

    it('points every screenshot at a resolved asset, not a broken path', () => {
      render(<Work />);
      for (const img of screen.getAllByRole('img')) {
        const src = img.getAttribute('src');
        expect(src, 'image has no src').toBeTruthy();
        expect(src).not.toBe('undefined');
      }
    });
  });
});
