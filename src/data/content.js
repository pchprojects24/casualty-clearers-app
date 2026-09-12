import treatmentMarkdown from '../../docs/TREATMENT_ACCURACY.md?raw';
import blueprintMarkdown from '../../docs/CONTENT_BLUEPRINT.md?raw';

export const categories = [
  {
    id: 'assessment',
    label: 'Assessment & MARCHE',
    short: 'Assessment',
    description: 'Initial assessment, priorities and ongoing reassessment.',
    color: 'teal',
    icon: 'assessment',
  },
  {
    id: 'treatments',
    label: 'Treatments',
    short: 'Treatments',
    description: 'Practical treatment information and supportive care.',
    color: 'coral',
    icon: 'treatments',
  },
  {
    id: 'airway',
    label: 'Airway & Breathing',
    short: 'Airway',
    description: 'Maintaining and supporting the airway and breathing.',
    color: 'yellow',
    icon: 'airway',
  },
  {
    id: 'bleeding',
    label: 'Bleeding Control',
    short: 'Bleeding',
    description: 'Recognizing and controlling serious bleeding.',
    color: 'sky',
    icon: 'bleeding',
  },
  {
    id: 'movement',
    label: 'Casualty Movement',
    short: 'Movement',
    description: 'Principles, methods and practical movement considerations.',
    color: 'violet',
    icon: 'movement',
  },
  {
    id: 'communications',
    label: 'Communications & Handover',
    short: 'Handover',
    description: 'Collecting, organizing and sharing information clearly.',
    color: 'mint',
    icon: 'communications',
  },
  {
    id: 'situations',
    label: 'AOPS Situations',
    short: 'Situations',
    description: 'Information connected to specific AOPS situations.',
    color: 'violet',
    icon: 'situations',
  },
  {
    id: 'equipment',
    label: 'Equipment',
    short: 'Equipment',
    description: 'What equipment is, what it does and the basics of using it.',
    color: 'sky',
    icon: 'equipment',
  },
];

const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const cleanTitle = (title) => title.replace(/^\d+\.\s*/, '').split(' — ')[0].trim();

const cleanText = (value) =>
  value
    .replace(/\[[0-9]+\]/g, '')
    .replace(/[*_`>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const summarize = (value, limit = 168) => {
  const text = cleanText(value);
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1).replace(/\s+\S*$/, '')}…`;
};

const statusFrom = (heading) => {
  const status = heading.split(' — ').slice(1).join(' — ');
  if (/EXCLUDE/.test(status)) return 'excluded';
  if (/REVISE|UPDATE/.test(status)) return 'updated';
  if (/LOCAL|MODEL|TRAINING|FAMILIARIZATION/.test(status)) return 'local';
  if (/CONFIRMED/.test(status)) return 'confirmed';
  return 'information';
};

const categoryFor = (title, group) => {
  const haystack = `${title} ${group}`.toLowerCase();
  if (/mist|sitrep|traumagram|communication|handover|pace|sior/.test(haystack)) return 'communications';
  if (/tourniquet|hemorrhage|haemorrhage|bleed|wound packing|pressure dressing|pressure point/.test(haystack)) return 'bleeding';
  if (/oxygen cylinder|rad-57|propaq|zoll|equipment quick|manual blood pressure|pulse ox/.test(haystack)) return 'equipment';
  if (/airway|opa|npa|bvm|suction|breathing|choking|cpr|aed|chest wound/.test(haystack)) return 'airway';
  if (/splint|movement|stretcher|sager|pelvic|backboard|scoop|med sled|ked|cervical/.test(haystack)) return 'movement';
  if (/hypothermia|immersion|person overboard|spill|firefighter|isolated casualty|smart triage|hazard|chemical|smoke|carbon monoxide/.test(haystack)) return 'situations';
  if (/assessment|marche|avpu|secondary survey|scene safety|ppe|vital signs/.test(haystack)) return 'assessment';
  return 'treatments';
};

function parseTreatment(markdown) {
  const lines = markdown.split('\n');
  const result = [];
  let group = '';
  let current = null;

  const flush = () => {
    if (!current) return;
    const body = current.lines.join('\n').trim();
    const title = cleanTitle(current.heading);
    const status = statusFrom(current.heading);
    const category = categoryFor(title, group);
    const firstParagraph = body.split(/\n\s*\n/).find(Boolean) || '';
    if (status !== 'excluded' && body && !/recommended next work|training-only and excluded/i.test(group)) {
      result.push({
        id: slugify(`treatment-${title}`),
        title,
        heading: current.heading,
        group: group.replace(/^\d+\.\s*/, ''),
        category,
        status,
        description: summarize(firstParagraph),
        body,
        source: 'Treatment accuracy and content decisions',
      });
    }
    current = null;
  };

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      flush();
      group = line.slice(3).trim();
    } else if (line.startsWith('### ')) {
      flush();
      current = { heading: line.slice(4).trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  });
  flush();
  return result;
}

function parseBlueprint(markdown) {
  const lines = markdown.split('\n');
  const result = [];
  let insideStructure = false;
  let current = null;

  const flush = () => {
    if (!current) return;
    const body = current.lines.join('\n').trim();
    const title = cleanTitle(current.heading);
    const firstParagraph = body.split(/\n\s*\n/).find(Boolean) || '';
    if (body) {
      result.push({
        id: slugify(`overview-${title}`),
        title,
        heading: current.heading,
        group: 'Information overview',
        category: categoryFor(title, current.heading),
        status: 'information',
        description: summarize(firstParagraph),
        body,
        source: 'Consolidated content blueprint',
      });
    }
    current = null;
  };

  lines.forEach((line) => {
    if (line === '## Proposed app content structure') {
      insideStructure = true;
      return;
    }
    if (insideStructure && line.startsWith('## ')) {
      flush();
      insideStructure = false;
      return;
    }
    if (!insideStructure) return;
    if (line.startsWith('### ')) {
      flush();
      current = { heading: line.slice(4).trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  });
  flush();
  return result;
}

export const topics = [...parseTreatment(treatmentMarkdown), ...parseBlueprint(blueprintMarkdown)].map((topic) => ({
  ...topic,
  color: categoryById[topic.category]?.color || 'teal',
  icon: categoryById[topic.category]?.icon || 'document',
  searchText: `${topic.title} ${topic.group} ${topic.description} ${cleanText(topic.body)}`.toLowerCase(),
}));

export const topicById = Object.fromEntries(topics.map((topic) => [topic.id, topic]));

export const sourceNotes = Object.fromEntries(
  [...treatmentMarkdown.matchAll(/^\[(\d+)\]\s+(.+)$/gm)].map((match) => [match[1], match[2].trim()]),
);

export const glossary = [
  { term: 'AOPS', meaning: 'Arctic and Offshore Patrol Ship.' },
  { term: 'AVPU', meaning: 'Alert, responds to Voice, responds to Pain, Unresponsive.' },
  { term: 'BVM', meaning: 'Bag-valve-mask.' },
  { term: 'CCT', meaning: 'Casualty Clearing Team.' },
  { term: 'CSM', meaning: 'Circulation, sensation and movement.' },
  { term: 'MARCHE', meaning: 'The organizing sequence used in the casualty-clearer material.' },
  { term: 'MIST', meaning: 'Mechanism, Injuries, Signs and symptoms, Treatments.' },
  { term: 'NPA', meaning: 'Nasopharyngeal airway.' },
  { term: 'OPA', meaning: 'Oropharyngeal airway.' },
  { term: 'PACE', meaning: 'Primary, Alternate, Contingency and Emergency communications.' },
  { term: 'SITREP', meaning: 'Situation report.' },
  { term: 'SMART', meaning: 'A triage system referenced in the AOPS material.' },
];

export const getCategory = (id) => categoryById[id];

export function searchTopics(query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return topics
    .map((topic) => ({ ...topic, score: words.reduce((score, word) => score + (topic.title.toLowerCase().includes(word) ? 6 : topic.searchText.includes(word) ? 1 : -8), 0) }))
    .filter((topic) => topic.score >= words.length)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 16);
}

export function topicsForCategory(categoryId) {
  return topics.filter((topic) => topic.category === categoryId);
}
