import { describe, expect, it } from 'vitest';
import { categories, getCategory, getTopic, searchTopics, topics } from '../src/data/content.js';
import { normalizeTopicIds } from '../src/lib/storage.js';
import { validateContent } from '../scripts/content-schema.mjs';

describe('content routing and search', () => {
  it('resolves valid topics and categories but never prototype properties', () => {
    expect(getTopic('marche')?.title).toContain('MARCHE');
    expect(getCategory('assessment')?.label).toBe('Assessment & MARCHE');
    ['constructor', 'toString', '__proto__'].forEach((id) => { expect(getTopic(id)).toBeUndefined(); expect(getCategory(id)).toBeUndefined(); });
  });

  it('searches all matching directory items and indexes visible nested text', () => {
    expect(searchTopics('the').length).toBeGreaterThan(16);
    for (const query of ['latex', 'jumbled', 'drifting', 'painful-stimulus', '1015', 'nothing by mouth']) {
      expect(searchTopics(query).length, query).toBeGreaterThan(0);
    }
  });

  it('applies Saved and Recent scope before search limits', () => {
    const saved = [getTopic('cat-tourniquet'), getTopic('direct-pressure')];
    const recent = [getTopic('diabetic-emergencies'), getTopic('seizure-care')];
    expect(searchTopics('bleeding', { scope: saved }).map((topic) => topic.id)).toEqual(expect.arrayContaining(['direct-pressure', 'cat-tourniquet']));
    expect(searchTopics('nothing by mouth', { scope: recent }).map((topic) => topic.id)).toContain('diabetic-emergencies');
  });
});

describe('browser-local lists', () => {
  it('deduplicates, rejects corrupt types and removes stale IDs in chronological order', () => {
    const ids = new Set(topics.map((topic) => topic.id));
    expect(normalizeTopicIds(['marche', 'marche', 'gone', 3, 'avpu'], ids)).toEqual(['marche', 'avpu']);
    expect(normalizeTopicIds('marche', ids)).toEqual([]);
  });
});

describe('content schema', () => {
  it('rejects missing navigation targets, invalid steps, and duplicate categories', () => {
    const missingTarget = structuredClone(topics); missingTarget[0].path = [{ title: 'Broken' }];
    expect(validateContent(categories, missingTarget).join('\n')).toMatch(/topicId/);
    const invalidSteps = structuredClone(topics); invalidSteps[0].steps = 'not an array';
    expect(validateContent(categories, invalidSteps).join('\n')).toMatch(/steps.*array/);
    const duplicateCategories = structuredClone(categories); duplicateCategories.push({ ...categories[0] });
    expect(validateContent(duplicateCategories, topics).join('\n')).toMatch(/duplicate category ID/);
  });
});
