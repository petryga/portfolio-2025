import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Contact from './Contact';

// These three links are the point of the page — they are how anyone actually
// reaches Alexandra. They are also the links the held lucide-react v1 upgrade
// would break, since v1 ships no brand icons.
describe('Contact', () => {
  it('renders inside a section addressable by the nav anchor', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('section#contact')).toBeInTheDocument();
  });

  it('links to the right email address', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /Email/ })).toHaveAttribute(
      'href',
      'mailto:hello@petryga.com',
    );
  });

  it('links to the right GitHub profile', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/petryga',
    );
  });

  it('links to the right LinkedIn profile', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/petryga',
    );
  });

  it('opens external profiles in a new tab, safely', () => {
    render(<Contact />);
    for (const name of [/GitHub/, /LinkedIn/]) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('target', '_blank');
      // Without noopener the new tab can reach back via window.opener.
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    }
  });

  it('does not open the mailto link in a new tab', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /Email/ })).not.toHaveAttribute(
      'target',
    );
  });

  it('renders all three contact links and nothing extra', () => {
    render(<Contact />);
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  it('renders an icon alongside each link', () => {
    const { container } = render(<Contact />);
    // lucide renders inline svg; one per link.
    expect(container.querySelectorAll('a svg')).toHaveLength(3);
  });

  it('renders the availability statement', () => {
    render(<Contact />);
    expect(screen.getByText(/Open to full stack roles/)).toBeInTheDocument();
    expect(
      screen.getByText(/Let's build something together/),
    ).toBeInTheDocument();
  });

  it('renders the footer credit', () => {
    render(<Contact />);
    expect(screen.getByText(/Alexandra Petryga/)).toBeInTheDocument();
    expect(screen.getByText(/from the East Bay/)).toBeInTheDocument();
  });
});
