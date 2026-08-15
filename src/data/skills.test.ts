import { describe, expect, it } from 'vitest';
import { skillCategories } from './skills';

// These expectations are written out longhand on purpose. About.test.tsx
// iterates over this module to prove the UI renders whatever the data holds,
// which means it cannot notice the data itself shrinking — deleting a skill
// would delete the expectation along with it. Pinning the contents here is what
// makes accidental data loss fail a test.
describe('skillCategories contents', () => {
  it('holds exactly the expected skills, in order', () => {
    expect(skillCategories).toEqual([
      {
        category: 'Backend',
        skills: [
          'Node.js',
          'Express',
          'REST APIs',
          'PostgreSQL',
          'AWS Lambda',
          'Sequelize',
          'MongoDB',
          'Python',
        ],
      },
      {
        category: 'Frontend',
        skills: [
          'React',
          'TypeScript',
          'JavaScript',
          'HTML/CSS',
          'Tailwind CSS',
          'Redux',
          'Vite',
        ],
      },
      {
        category: 'Tools & DevOps',
        skills: ['Docker', 'AWS', 'CI/CD', 'Git', 'Jest', 'Claude Code'],
      },
      {
        category: 'Currently Exploring',
        skills: ['Arduino', 'Hugging Face Agents Course'],
      },
    ]);
  });

  it('lists 23 skills in total', () => {
    const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);
    expect(total).toBe(23);
  });
});

describe('skillCategories shape', () => {
  it('exposes the four expected categories in order', () => {
    expect(skillCategories.map((c) => c.category)).toEqual([
      'Backend',
      'Frontend',
      'Tools & DevOps',
      'Currently Exploring',
    ]);
  });

  it('gives every category at least one skill', () => {
    for (const { category, skills } of skillCategories) {
      expect(skills.length, `${category} has no skills`).toBeGreaterThan(0);
    }
  });

  it('has no blank or untrimmed entries', () => {
    for (const { category, skills } of skillCategories) {
      expect(category).toBe(category.trim());
      expect(category).not.toBe('');
      for (const skill of skills) {
        expect(skill, 'skill should be trimmed').toBe(skill.trim());
        expect(skill).not.toBe('');
      }
    }
  });

  it('has no duplicate categories', () => {
    const names = skillCategories.map((c) => c.category);
    expect(new Set(names).size).toBe(names.length);
  });

  // About.tsx keys each tag on the skill string, so a duplicate inside one
  // category would produce a duplicate React key.
  it('has no duplicate skills within a category', () => {
    for (const { category, skills } of skillCategories) {
      expect(new Set(skills).size, `${category} repeats a skill`).toBe(
        skills.length,
      );
    }
  });
});
