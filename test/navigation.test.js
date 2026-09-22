import { afterEach, describe, expect, it, vi } from 'vitest';
import { goBack, initialiseHistory, navigate, normalizeRoute } from '../src/lib/navigation.js';

describe('hash navigation', () => {
  afterEach(() => { window.history.replaceState(null, '', '/'); vi.restoreAllMocks(); });
  it('normalizes direct deep links without treating arbitrary paths as valid content', () => {
    window.history.replaceState(null, '', '#/topic/marche');
    expect(normalizeRoute()).toEqual({ kind: 'topic', id: 'marche' });
    expect(normalizeRoute('#/topic/__proto__')).toEqual({ kind: 'topic', id: '__proto__' });
  });
  it('uses its own entry state for Back rather than browser history length', () => {
    window.scrollTo = vi.fn();
    initialiseHistory();
    const back = vi.spyOn(window.history, 'back');
    navigate('topic/marche');
    goBack();
    expect(back).toHaveBeenCalledOnce();
  });
});
