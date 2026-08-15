import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('joins plain class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('drops falsy values', () => {
    expect(cn('a', false, undefined, null, '', 'b')).toBe('a b');
  });

  it('supports conditional object syntax', () => {
    expect(cn('base', { active: true, hidden: false })).toBe('base active');
  });

  it('flattens arrays', () => {
    expect(cn(['a', ['b', 'c']])).toBe('a b c');
  });

  // The whole reason cn exists rather than plain clsx: later Tailwind utilities
  // in the same group must win, so callers can override component defaults.
  it('lets a later Tailwind utility beat an earlier one in the same group', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('keeps utilities from different groups', () => {
    expect(cn('px-2', 'py-4')).toBe('px-2 py-4');
  });

  it('resolves conflicts across arguments, not just within one', () => {
    expect(cn('p-4', { 'p-8': true })).toBe('p-8');
  });

  it('returns an empty string for no input', () => {
    expect(cn()).toBe('');
  });
});
