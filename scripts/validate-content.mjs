import { categories, topics } from '../src/data/content.js';

const errors = [];
const categoryIds = new Set(categories.map((category) => category.id));
const topicIds = new Set();
const internalLinks = [];

const addLinks = (owner, source, links = []) => {
  for (const link of links) {
    const topicId = typeof link === 'string' ? link : link?.topicId;
    if (topicId) internalLinks.push({ owner, source, topicId });
  }
};

for (const category of categories) {
  if (!category.navLabel) errors.push(`Category ${category.id} is missing its navLabel, used by the sidebar.`);
  if (!topics.some((topic) => topic.category === category.id)) {
    errors.push(`Category ${category.id} has no topics.`);
  }
  // A section without an overview page falls back to a plain topic list, which
  // is a downgrade rather than a break — worth knowing about, not failing on.
  if (!topics.some((topic) => topic.id === `${category.id}-overview`)) {
    console.warn(`Note: ${category.id} has no ${category.id}-overview page; its section link will show a topic list.`);
  }
}

for (const topic of topics) {
  if (!topic.id) errors.push('A topic is missing its id.');
  if (!topic.title) errors.push(`${topic.id || 'Unknown topic'} is missing its title.`);
  if (topicIds.has(topic.id)) errors.push(`Duplicate topic id: ${topic.id}`);
  topicIds.add(topic.id);

  if (!categoryIds.has(topic.category)) {
    errors.push(`${topic.id} uses an unknown category: ${topic.category}`);
  }

  addLinks(topic.id, 'path', topic.path);
  addLinks(topic.id, 'quickRoutes', topic.quickRoutes);
  addLinks(topic.id, 'scenarioCards', topic.scenarioCards);
  addLinks(topic.id, 'actions', topic.actions);
  addLinks(topic.id, 'MARCHE', topic.march);
  addLinks(topic.id, 'related', topic.related);
  addLinks(topic.id, 'nextStep', topic.nextStep ? [topic.nextStep] : []);

  for (const group of topic.equipmentGroups || []) {
    addLinks(topic.id, `equipment group ${group.title}`, group.items);
  }

  for (const phase of topic.scenarioPhases || []) {
    addLinks(topic.id, `response phase ${phase.title}`, phase.links);
  }

  for (const resource of topic.resources || []) {
    try {
      const url = new URL(resource.url);
      if (url.protocol !== 'https:') errors.push(`${topic.id} has a non-HTTPS resource: ${resource.url}`);
    } catch {
      errors.push(`${topic.id} has an invalid resource URL: ${resource.url}`);
    }
  }
}

for (const link of internalLinks) {
  if (!topicIds.has(link.topicId)) {
    errors.push(`${link.owner} links to missing topic ${link.topicId} from ${link.source}.`);
  }
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed: ${topics.length} topics, ${internalLinks.length} internal links, ${categories.length} categories.`);
