import { categories, topics } from '../src/data/content.js';
import { validateContent } from './content-schema.mjs';

const errors = validateContent(categories, topics);

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed: ${topics.length} topics, ${categories.length} categories.`);
