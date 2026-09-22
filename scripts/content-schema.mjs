const isText = (value) => typeof value === 'string' && value.trim().length > 0;
const isList = (value) => Array.isArray(value);

export function validateContent(categories, topics) {
  const errors = [];
  const categoryIds = new Set();
  const topicIds = new Set();
  const internalLinks = [];
  const fail = (owner, path, message) => errors.push(`${owner}.${path}: ${message}`);
  const links = (owner, path, value) => {
    if (value === undefined) return;
    if (!isList(value)) { fail(owner, path, 'must be an array'); return; }
    value.forEach((link, index) => {
      if (typeof link === 'string') { internalLinks.push({ owner, path: `${path}[${index}]`, topicId: link }); return; }
      if (!link || typeof link !== 'object' || !isText(link.topicId)) fail(owner, `${path}[${index}].topicId`, 'is required');
      else internalLinks.push({ owner, path: `${path}[${index}]`, topicId: link.topicId });
    });
  };

  if (!isList(categories)) return ['categories: must be an array'];
  if (!isList(topics)) return ['topics: must be an array'];
  categories.forEach((category, index) => {
    const owner = `category[${index}]`;
    if (!category || typeof category !== 'object') { fail(owner, '', 'must be an object'); return; }
    ['id', 'label', 'description', 'color', 'icon'].forEach((field) => { if (!isText(category[field])) fail(owner, field, 'is required'); });
    if (categoryIds.has(category.id)) fail(owner, 'id', `duplicate category ID ${category.id}`);
    categoryIds.add(category.id);
  });

  topics.forEach((topic, index) => {
    const owner = `topic[${index}]${topic?.id ? `(${topic.id})` : ''}`;
    if (!topic || typeof topic !== 'object') { fail(owner, '', 'must be an object'); return; }
    ['id', 'title', 'category', 'group', 'icon', 'color'].forEach((field) => { if (!isText(topic[field])) fail(owner, field, 'is required'); });
    if (topicIds.has(topic.id)) fail(owner, 'id', `duplicate topic ID ${topic.id}`);
    topicIds.add(topic.id);
    if (!categoryIds.has(topic.category)) fail(owner, 'category', `unknown category ${topic.category}`);
    ['path', 'quickRoutes', 'scenarioCards', 'march', 'actions', 'related'].forEach((field) => links(owner, field, topic[field]));
    if (topic.nextStep !== undefined) links(owner, 'nextStep', [topic.nextStep]);
    ['sections', 'scenarioPhases', 'equipmentGroups', 'roleCards', 'scale'].forEach((field) => {
      if (topic[field] !== undefined && !isList(topic[field])) fail(owner, field, 'must be an array');
    });
    if (topic.steps !== undefined && !isList(topic.steps)) fail(owner, 'steps', 'must be an array');
    if (isList(topic.steps) && !topic.steps.every(isText)) fail(owner, 'steps', 'must contain non-empty strings');
    (topic.sections || []).forEach((section, sectionIndex) => {
      if (!section || !isText(section.title) || !isList(section.bullets) || !section.bullets.every(isText)) fail(owner, `sections[${sectionIndex}]`, 'requires a title and bullets array of strings');
    });
    (topic.scenarioPhases || []).forEach((phase, phaseIndex) => links(owner, `scenarioPhases[${phaseIndex}].links`, phase?.links));
    (topic.equipmentGroups || []).forEach((group, groupIndex) => links(owner, `equipmentGroups[${groupIndex}].items`, group?.items));
    (topic.resources || []).forEach((resource, resourceIndex) => {
      try { if (!isText(resource?.url) || new URL(resource.url).protocol !== 'https:') fail(owner, `resources[${resourceIndex}].url`, 'must be a HTTPS URL'); } catch { fail(owner, `resources[${resourceIndex}].url`, 'must be a valid HTTPS URL'); }
    });
    if (topic.sourceMetadata !== undefined) {
      if (!topic.sourceMetadata || typeof topic.sourceMetadata !== 'object') fail(owner, 'sourceMetadata', 'must be an object when supplied');
      else if (topic.sourceMetadata.reviewStatus !== undefined && !isText(topic.sourceMetadata.reviewStatus)) fail(owner, 'sourceMetadata.reviewStatus', 'must be a non-empty string when supplied');
    }
  });
  categoryIds.forEach((categoryId) => {
    if (!topicIds.has(`${categoryId}-overview`)) errors.push(`category(${categoryId}).overview: missing topic ${categoryId}-overview`);
  });
  internalLinks.forEach((link) => { if (!topicIds.has(link.topicId)) fail(link.owner, link.path, `links to unknown topic ${link.topicId}`); });
  return errors;
}
