import { afterEach, describe, expect, it, vi } from 'vitest';
import { stripTrackingParams } from './stripTrackingParams';

describe('stripTrackingParams', () => {
  afterEach(() => window.history.replaceState({}, '', '/'));

  it('removes utm_* params and keeps other params and the hash', () => {
    window.history.replaceState({}, '', '/?utm_source=resume&utm_campaign=a1&x=1#work');
    stripTrackingParams();
    expect(window.location.search).toBe('?x=1');
    expect(window.location.hash).toBe('#work');
  });

  it('leaves clean URLs alone', () => {
    window.history.replaceState({}, '', '/?x=1');
    stripTrackingParams();
    expect(window.location.search).toBe('?x=1');
  });

  it('bypasses a patched history.replaceState', () => {
    window.history.replaceState({}, '', '/?utm_source=resume');
    const patched = vi.fn();
    window.history.replaceState = patched;
    stripTrackingParams();
    expect(patched).not.toHaveBeenCalled();
    expect(window.location.search).toBe('');
    delete (window.history as { replaceState?: unknown }).replaceState;
  });
});
