import React, { Component, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Bandage,
  Brain,
  Bookmark,
  BookOpen,
  Box,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Droplets,
  ExternalLink,
  FileText,
  Home,
  HeartPulse,
  Wind,
  Menu,
  MoreHorizontal,
  Radio,
  Search,
  TriangleAlert,
  Users,
  X,
} from 'lucide-react';
import { categories, categoryOverviewIds, getCategory, getTopic, glossary, searchTopics, topics, topicsForCategory } from './data/content.js';
import { goBack, initialiseHistory, navigate, normalizeRoute, scrollToSection } from './lib/navigation.js';
import { normalizeTopicIds, readStoredList, writeStoredList } from './lib/storage.js';

const ICONS = {
  assessment: ClipboardCheck,
  treatments: Bandage,
  airway: Wind,
  circulation: HeartPulse,
  medical: HeartPulse,
  head: Brain,
  bleeding: Droplets,
  movement: Users,
  communications: Radio,
  situations: TriangleAlert,
  equipment: Box,
  document: FileText,
};

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'assessment', label: 'Assessment', icon: ClipboardCheck },
  { id: 'bleeding', label: 'Bleeding Control', icon: Droplets },
  { id: 'airway', label: 'Airway & Breathing', icon: Wind },
  { id: 'circulation', label: 'Circulation & Shock', icon: HeartPulse },
  { id: 'medical', label: 'Sudden Illness', icon: HeartPulse },
  { id: 'head-temperature', label: 'Head & Temperature', icon: Brain },
  { id: 'splinting', label: 'Splinting & Movement', icon: Users },
  { id: 'equipment', label: 'Equipment', icon: Box },
  { id: 'scenarios', label: 'Scenarios', icon: TriangleAlert },
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
];

const MARCHE_STEPS = [
  { id: 'march-m', letter: 'M', title: 'Massive hemorrhage' },
  { id: 'march-a', letter: 'A', title: 'Airway' },
  { id: 'march-r', letter: 'R', title: 'Respiration' },
  { id: 'march-c', letter: 'C', title: 'Circulation' },
  { id: 'march-h', letter: 'H', title: 'Head & hypothermia' },
  { id: 'march-e', letter: 'E', title: 'Everything else' },
];

const SECONDARY_STEPS = [
  { id: 'sample-history', number: '1', title: 'SAMPLE history' },
  { id: 'vital-signs', number: '2', title: 'Vital signs' },
  { id: 'head-to-toe', number: '3', title: 'Injury check' },
  { id: 'reassessment-handover', number: '4', title: 'Reassess & hand over' },
];

const HEAD_TO_TOE_TOPICS = new Set(['head-face-check', 'neck-check', 'chest-check', 'abdomen-check', 'pelvis-check', 'limbs-check', 'back-check']);
const REASSESSMENT_TOPICS = new Set(['reassessment-loop', 'treatment-checks', 'mist-handover', 'handover-example']);
const SECONDARY_TOPIC_IDS = new Set(['secondary-survey', 'focused-examination', ...SECONDARY_STEPS.map((step) => step.id), ...HEAD_TO_TOE_TOPICS, ...REASSESSMENT_TOPICS]);

class AppErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { console.error('CCT Info Hub rendering error', error); }
  render() {
    if (!this.state.failed) return this.props.children;
    return <main className="page-main" tabIndex="-1"><div className="empty-state"><TriangleAlert /><h1>Unable to display this page</h1><p>Try returning to the topic directory. If the problem continues, reload the app.</p><button type="button" onClick={() => navigate('explore')}>Browse all topics <ChevronRight size={16} /></button></div></main>;
  }
}

const validTopicIds = new Set(topics.map((topic) => topic.id));

const useStoredList = (key, maximum) => {
  const [initial] = useState(() => readStoredList(key, validTopicIds, maximum));
  const [list, setList] = useState(initial.list);
  const [persistent, setPersistent] = useState(initial.available);
  const updateList = useCallback((updater) => {
    setList((current) => {
      const next = normalizeTopicIds(typeof updater === 'function' ? updater(current) : updater, validTopicIds, maximum);
      setPersistent(writeStoredList(key, next));
      return next;
    });
  }, [key, maximum]);
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== key || event.storageArea !== window.localStorage) return;
      try {
        setList(normalizeTopicIds(JSON.parse(event.newValue), validTopicIds, maximum));
        setPersistent(true);
      } catch {
        setList([]);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, maximum]);
  return [list, updateList, persistent];
};

function Brand() {
  return (
    <button className="brand" type="button" onClick={() => navigate('home')} aria-label="CCT Info Hub home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>CCT Info Hub</span>
    </button>
  );
}

function IconFor({ name, size = 22 }) {
  const Icon = ICONS[name] || FileText;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}

function BackLink() {
  return <button type="button" className="back-link" onClick={goBack}><ArrowLeft size={17} /> Back</button>;
}

function SearchBox({ value, onChange, onSelect, scope, compact = false, shortcut = true }) {
  const inputRef = useRef(null);
  const listId = useId();
  const [active, setActive] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const results = useMemo(() => searchTopics(value, { scope, limit: 8 }), [value, scope]);
  const open = active && Boolean(value);
  const expanded = open && results.length > 0;
  // Guard against a highlight left over from a longer result set.
  const current = highlight < results.length ? highlight : -1;

  const change = (next) => { setHighlight(-1); onChange(next); };

  useEffect(() => {
    if (!shortcut) return undefined;
    const onKey = (event) => {
      if ((event.key === '/' && !/input|textarea/i.test(document.activeElement?.tagName)) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcut]);

  const choose = (topic) => {
    onSelect(topic);
    change('');
    setActive(false);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') { setActive(false); inputRef.current?.blur(); return; }
    if (!expanded) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setHighlight((index) => (index + 1) % results.length); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setHighlight((index) => (index <= 0 ? results.length : index) - 1); }
    else if (event.key === 'Enter' && current >= 0) { event.preventDefault(); choose(results[current]); }
  };

  return (
    <div className={`search-wrap ${compact ? 'compact' : ''}`}>
      <Search aria-hidden="true" />
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => change(event.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => window.setTimeout(() => setActive(false), 120)}
        onKeyDown={onKeyDown}
        placeholder="Search CCT topics..."
        aria-label="Search CCT topics"
        role="combobox"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={expanded && current >= 0 ? `${listId}-${current}` : undefined}
      />
      {!compact && <kbd>⌘ K</kbd>}
      {value && <button className="clear-search" type="button" onClick={() => change('')} aria-label="Clear search"><X size={18} /></button>}
      {open && (results.length ? (
        <div className="search-results" id={listId} role="listbox" aria-label="Search results">
          {results.map((topic, index) => (
            <button
              key={topic.id}
              id={`${listId}-${index}`}
              type="button"
              role="option"
              aria-selected={index === current}
              className={index === current ? 'highlight' : ''}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(topic)}
            >
              <span className={`mini-icon ${topic.color}`}><IconFor name={topic.icon} size={18} /></span>
              <span><strong>{topic.title}</strong><small>{getCategory(topic.category)?.label}</small></span>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      ) : (
        <div className="search-results"><p role="status">No matching topic found.</p></div>
      ))}
    </div>
  );
}

function Sidebar({ route, savedCount }) {
  const selected = route.kind === 'category' ? route.id : route.kind === 'topic' ? getTopic(route.id)?.category : route.kind;
  return (
    <aside className="sidebar">
      <Brand />
      <nav aria-label="Primary navigation">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button className={selected === id ? 'selected' : ''} aria-current={selected === id ? 'page' : undefined} key={id} type="button" onClick={() => navigate(['assessment', 'bleeding', 'airway', 'circulation', 'medical', 'head-temperature', 'splinting', 'equipment', 'scenarios'].includes(id) ? `category/${id}` : id)}>
            <Icon size={20} strokeWidth={1.8} /><span>{label}</span>
          </button>
        ))}
        <span className="nav-rule" />
        <button className={selected === 'saved' ? 'selected' : ''} aria-current={selected === 'saved' ? 'page' : undefined} type="button" onClick={() => navigate('saved')}>
          <Bookmark size={20} strokeWidth={1.8} /><span>Saved</span>{savedCount > 0 && <em aria-label={`${savedCount} saved`}>{savedCount}</em>}
        </button>
        <button className={selected === 'recent' ? 'selected' : ''} aria-current={selected === 'recent' ? 'page' : undefined} type="button" onClick={() => navigate('recent')}>
          <Clock3 size={20} strokeWidth={1.8} /><span>Recently viewed</span>
        </button>
      </nav>
    </aside>
  );
}

function MobileHeader({ onOpen }) {
  return (
    <header className="mobile-header">
      <Brand />
      <button className="menu-button" type="button" onClick={onOpen} aria-label="Open navigation"><Menu /></button>
    </header>
  );
}

function MobileNav({ route, savedCount, onOpen }) {
  const items = [
    { id: 'home', label: 'Home', icon: Home, path: 'home' },
    { id: 'marche', label: 'MARCHE', icon: ClipboardCheck, path: 'topic/marche' },
    { id: 'explore', label: 'Topics', icon: Search, path: 'explore' },
    { id: 'saved', label: 'Saved', icon: Bookmark, path: 'saved' },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map(({ id, label, icon: Icon, path }) => {
        const selected = route.kind === id || (id === 'marche' && route.kind === 'topic' && (route.id === 'marche' || route.id?.startsWith('march-')));
        return (
          <button
            key={id}
            className={selected ? 'selected' : ''}
            aria-current={selected ? 'page' : undefined}
            aria-haspopup={id === 'more' ? 'dialog' : undefined}
            type="button"
            onClick={(event) => id === 'more' ? onOpen(event) : navigate(path)}
          >
            <span className="mobile-nav-icon"><Icon size={23} strokeWidth={1.8} />{id === 'saved' && savedCount > 0 && <em aria-hidden="true">{savedCount}</em>}</span><span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function TopicRow({ category }) {
  return (
    <div className={`topic-row ${category.color}`}>
      <button className="topic-row-main" type="button" onClick={() => navigate(`category/${category.id}`)}>
        <span className="topic-icon"><IconFor name={category.icon} /></span>
        <span className="topic-copy"><strong>{category.label}</strong><small>{category.description}</small></span>
        <ChevronRight />
      </button>
    </div>
  );
}

function MiniTopicRow({ topic, saved, onSave }) {
  return (
    <div className="mini-topic-row">
      <button className="mini-topic-main" type="button" onClick={() => navigate(`topic/${topic.id}`)}>
        <span className={`mini-icon ${topic.color}`}><IconFor name={topic.icon} size={19} /></span>
        <span><strong>{topic.title}</strong><small>{getCategory(topic.category)?.label}</small></span>
        <ChevronRight size={18} />
      </button>
      <button className={saved ? 'save-button saved' : 'save-button'} type="button" onClick={() => onSave(topic.id)} aria-pressed={saved} aria-label={`${saved ? 'Remove' : 'Save'} ${topic.title}`}>
        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}

function RecentStrip({ topics: recentTopics }) {
  if (!recentTopics.length) return null;
  return (
    <section className="home-recent" aria-labelledby="recent-heading">
      <header><h2 id="recent-heading">Recent</h2><button type="button" onClick={() => navigate('recent')}>See all <ChevronRight size={16} /></button></header>
      <div>
        {recentTopics.slice(0, 3).map((topic) => (
          <button key={topic.id} type="button" onClick={() => navigate(`topic/${topic.id}`)}>
            <span className={`mini-icon ${topic.color}`}><IconFor name={topic.icon} size={19} /></span>
            <span><strong>{topic.title}</strong><small>{getCategory(topic.category)?.label}</small></span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}

function HomeView({ recentTopics }) {
  const [query, setQuery] = useState('');

  return (
    <>
      <header className="desktop-top-search"><SearchBox compact shortcut={false} value={query} onChange={setQuery} onSelect={(topic) => navigate(`topic/${topic.id}`)} /></header>
      <main className="home-main">
        <section className="welcome">
          <h1>CCT Info Hub</h1>
          <SearchBox value={query} onChange={setQuery} onSelect={(topic) => navigate(`topic/${topic.id}`)} />
        </section>
        <RecentStrip topics={recentTopics} />
        <section className="topic-directory" aria-labelledby="explore-heading">
          <h2 id="explore-heading">Topics</h2>
          <div className="topic-list">
            {categories.map((category) => <TopicRow key={category.id} category={category} />)}
          </div>
        </section>
      </main>
    </>
  );
}

function DirectoryView({ title = 'All topics', intro = 'Search by name or browse each section.', emptyNote, topicList = topics, saved, toggleSaved, preserveOrder = false }) {
  const [query, setQuery] = useState('');
  const visible = query ? searchTopics(query, { scope: topicList }) : topicList;
  const groups = preserveOrder ? [{ category: null, items: visible }] : categories.map((category) => ({ category, items: visible.filter((topic) => topic.category === category.id) })).filter((group) => group.items.length);
  return (
    <main className="page-main directory-page">
      <BackLink />
      <div className="page-heading"><h1>{title}</h1><p>{intro}</p></div>
      <SearchBox value={query} onChange={setQuery} onSelect={(topic) => navigate(`topic/${topic.id}`)} scope={topicList} />
      <div className="directory-groups">
        {groups.map(({ category, items }) => (
          <section key={category?.id || 'ordered'}>
            {category && <div className="group-heading"><span className={`topic-icon ${category.color}`}><IconFor name={category.icon} /></span><div><h2>{category.label}</h2><p>{category.description}</p></div></div>}
            <div className="article-list">
              {items.map((topic) => <MiniTopicRow key={topic.id} topic={topic} saved={saved.includes(topic.id)} onSave={toggleSaved} />)}
            </div>
          </section>
        ))}
        {!groups.length && (
          <div className="empty-state">
            <Search />
            <h2>{query ? 'No matching topic' : 'Nothing here yet'}</h2>
            <p>{query ? 'Try a shorter term or a related word.' : emptyNote || 'There is no information in this section.'}</p>
            {!query && <button type="button" onClick={() => navigate('explore')}>Browse all topics <ChevronRight size={16} /></button>}
          </div>
        )}
      </div>
    </main>
  );
}

function NotFoundView() {
  return (
    <main className="page-main">
      <BackLink />
      <div className="empty-state">
        <TriangleAlert />
        <h2>Topic not found</h2>
        <p>The link may be out of date, or the topic may have been renamed.</p>
        <button type="button" onClick={() => navigate('explore')}>Browse all topics <ChevronRight size={16} /></button>
      </div>
    </main>
  );
}

function MarcheProgress({ activeId }) {
  return (
    <nav className="march-progress" aria-label="MARCHE primary survey">
      <div className="march-progress-heading"><span>Primary survey</span><strong>MARCHE</strong></div>
      <div className="march-progress-steps">
        {MARCHE_STEPS.map((step) => {
          const current = step.id === activeId;
          return (
            <button
              key={step.id}
              type="button"
              className={current ? 'current' : ''}
              aria-current={current ? 'step' : undefined}
              aria-label={`${step.letter} — ${step.title}${current ? ', current priority' : ''}`}
              onClick={() => navigate(`topic/${step.id}`)}
            >
              <b>{step.letter}</b><small>{step.title}</small>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function SecondaryProgress({ activeId }) {
  const currentId = HEAD_TO_TOE_TOPICS.has(activeId) || activeId === 'focused-examination' ? 'head-to-toe' : REASSESSMENT_TOPICS.has(activeId) ? 'reassessment-handover' : activeId;
  return (
    <nav className="secondary-progress" aria-label="Secondary survey sequence">
      <div className="secondary-progress-heading"><span>Secondary survey</span><strong>Build the full picture</strong></div>
      <div className="secondary-progress-steps">
        {SECONDARY_STEPS.map((step) => {
          const current = step.id === currentId;
          return (
            <button
              key={step.id}
              type="button"
              className={current ? 'current' : ''}
              aria-current={current ? 'step' : undefined}
              onClick={() => navigate(`topic/${step.id}`)}
            >
              <b>{step.number}</b><small>{step.title}</small>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

const pageSectionsFor = (topic) => [
  topic.path && { id: 'assessment-sequence', label: 'Assessment sequence' },
  topic.scale && { id: 'avpu-scale', label: 'AVPU scale' },
  topic.mnemonic && { id: 'mnemonic', label: 'Key prompts' },
  topic.example && { id: 'worked-example', label: 'Example' },
  topic.quickRoutes && { id: 'quick-routes', label: 'Choices' },
  topic.scenarioCards && { id: 'response-choices', label: 'Responses' },
  topic.scenarioPhases && { id: 'response-flow', label: topic.phaseHeading || 'Response flow' },
  topic.roleCards && { id: 'team-roles', label: 'Team roles' },
  topic.march && { id: 'marche-priorities', label: 'MARCHE priorities' },
  topic.equipmentGroups && { id: 'equipment-by-use', label: 'Equipment' },
  topic.steps && { id: 'steps', label: 'How to do it' },
  ...(topic.sections || []).map((section, index) => ({ id: `section-${index}`, label: section.title })),
  topic.notice && { id: 'important-note', label: 'Important note' },
  topic.actions && { id: 'related-actions', label: 'Related pages' },
  topic.nextStep && { id: 'next-step', label: 'Next step' },
  topic.resources?.length > 0 && { id: 'sources', label: 'Sources' },
].filter(Boolean);

function PageJumps({ sections }) {
  if (sections.length < 3) return null;
  return (
    <nav className="page-jumps" aria-label="On this page">
      <strong>On this page</strong>
      <div>{sections.map((section) => <button key={section.id} type="button" onClick={() => scrollToSection(section.id)}>{section.label}</button>)}</div>
    </nav>
  );
}

function ArticleView({ topic, saved, toggleSaved }) {
  const category = getCategory(topic.category);
  const related = (topic.related || []).map(getTopic).filter(Boolean);
  const isMarchPriority = MARCHE_STEPS.some((step) => step.id === topic.id);
  const isSecondaryTopic = SECONDARY_TOPIC_IDS.has(topic.id);
  const pageSections = pageSectionsFor(topic);
  const renderLinks = (links, className) => links?.length ? (
    <div className={className}>
      {links.map((link) => (
        <button key={link.topicId} type="button" onClick={() => navigate(`topic/${link.topicId}`)}>
          <span><strong>{link.title}</strong><small>{link.description}</small></span><ChevronRight size={20} />
        </button>
      ))}
    </div>
  ) : null;
  return (
    <main className="page-main article-page">
      <BackLink />
      <div className="article-breadcrumb"><button type="button" onClick={() => navigate(`category/${category.id}`)}>{category.label}</button><ChevronRight size={15} /><span>{topic.title}</span></div>
      <header className={`article-header ${topic.color}`}>
        <span className="topic-icon"><IconFor name={topic.icon} size={26} /></span>
        <div><p>{topic.group}</p><h1>{topic.title}</h1>{topic.intro && <span>{topic.intro}</span>}</div>
        <button className={saved ? 'article-save saved' : 'article-save'} type="button" onClick={() => toggleSaved(topic.id)} aria-pressed={saved}>
          <Bookmark size={19} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}
        </button>
      </header>
      {isMarchPriority && <MarcheProgress activeId={topic.id} />}
      {isSecondaryTopic && <SecondaryProgress activeId={topic.id} />}
      <PageJumps sections={pageSections} />
      <div className="article-layout">
        <article className="reference-content">
          {topic.path && <section id="assessment-sequence" className="reference-block"><h2>Assessment sequence</h2>{renderLinks(topic.path, 'path-list')}</section>}
          {topic.scale && <section id="avpu-scale" className="reference-block"><h2>AVPU scale</h2><div className="scale-grid">{topic.scale.map((item) => <div key={item.letter}><span>{item.letter}</span><strong>{item.title}</strong><p>{item.text}</p></div>)}</div></section>}
          {topic.mnemonic && <section id="mnemonic" className="reference-block"><h2>{topic.mnemonic.heading}</h2><div className="mnemonic-grid">{topic.mnemonic.items.map((item) => <div key={item.letter}><span>{item.letter}</span><div><strong>{item.title}</strong><p>{item.text}</p></div></div>)}</div></section>}
          {topic.example && <section id="worked-example" className="handover-example"><span>{topic.example.title}</span><blockquote>{topic.example.text}</blockquote></section>}
          {topic.quickRoutes && <section id="quick-routes" className="reference-block"><h2>{topic.quickRouteHeading || 'Choose what you need'}</h2>{renderLinks(topic.quickRoutes, 'quick-route-grid')}</section>}
          {topic.scenarioCards && <section id="response-choices" className="reference-block"><h2>{topic.cardHeading || 'Choose a response'}</h2><div className="scenario-card-grid">{topic.scenarioCards.map((item) => <button key={item.topicId} type="button" onClick={() => navigate(`topic/${item.topicId}`)}><span>{item.kicker}</span><strong>{item.title}</strong><p>{item.text}</p><em>{topic.cardLabel || 'View response'} <ChevronRight size={17} /></em></button>)}</div></section>}
          {topic.scenarioPhases && <section id="response-flow" className="reference-block"><h2>{topic.phaseHeading || 'Response flow'}</h2><div className="scenario-timeline">{topic.scenarioPhases.map((phase, index) => <article className="scenario-phase" key={`${phase.kicker}-${phase.title}`}><span className="phase-number">{index + 1}</span><div className="phase-content"><span className="phase-kicker">{phase.kicker}</span><h3>{phase.title}</h3><p>{phase.text}</p>{phase.bullets && <ul className="check-list">{phase.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}{renderLinks(phase.links, 'phase-link-grid')}</div></article>)}</div></section>}
          {topic.roleCards && <section id="team-roles" className="reference-block"><h2>Divide the work</h2><div className="role-card-grid">{topic.roleCards.map((role) => <article key={role.title}><h3>{role.title}</h3><p>{role.text}</p><ul className="check-list">{role.bullets.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>}
          {topic.march && <section id="marche-priorities" className="reference-block"><h2>Select a MARCHE priority</h2><div className="march-grid">{topic.march.map((item) => <button key={item.letter} type="button" onClick={() => navigate(`topic/${item.topicId}`)}><b>{item.letter}</b><span><strong>{item.title}</strong><small>{item.text}</small></span><ChevronRight size={21} /></button>)}</div></section>}
          {topic.equipmentGroups && <section id="equipment-by-use" className="reference-block"><h2>Choose equipment by use</h2><div className="equipment-directory">{topic.equipmentGroups.map((group) => <section className="equipment-group" key={group.letter}><header><b>{group.letter}</b><div><h3>{group.title}</h3><p>{group.text}</p></div></header><div className="equipment-links">{group.items.map((item) => <button key={item.topicId} type="button" onClick={() => navigate(`topic/${item.topicId}`)}><span><strong>{item.title}</strong><small>{item.description}</small></span><ChevronRight size={19} /></button>)}</div></section>)}</div></section>}
          {topic.steps && <section id="steps" className="reference-block"><h2>How to do it</h2><ol className="step-list">{topic.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section>}
          {topic.sections?.map((section, index) => <section id={`section-${index}`} className="reference-block" key={section.title}><h2>{section.title}</h2><ul className="check-list">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul></section>)}
          {topic.notice && <aside id="important-note" className="reference-notice"><TriangleAlert size={21} /><div><strong>{topic.notice.title}</strong><p>{topic.notice.text}</p></div></aside>}
          {topic.actions && <section id="related-actions" className="reference-block"><h2>{topic.actionHeading || 'Procedures and equipment'}</h2>{renderLinks(topic.actions, 'action-grid')}</section>}
          {topic.nextStep && <button id="next-step" className="continue-primary" type="button" onClick={() => navigate(`topic/${topic.nextStep.topicId}`)}><span><small>{topic.nextStep.kicker || 'Next in MARCHE'}</small><strong>{topic.nextStep.title}</strong><em>{topic.nextStep.description}</em></span><i aria-hidden="true"><ChevronRight size={25} /></i></button>}
          {topic.resources?.length > 0 && <section id="sources" className="reference-block resources"><h2>More information and demonstrations</h2>{topic.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer"><span><em>{resource.kind}</em><strong>{resource.title}</strong><small>{resource.description}</small></span><ExternalLink size={19} /></a>)}</section>}
        </article>
        <aside className="related-panel">
          <h2>Related topics</h2>
          {related.map((item) => <button key={item.id} type="button" onClick={() => navigate(`topic/${item.id}`)}><span>{item.title}</span><ChevronRight size={17} /></button>)}
        </aside>
      </div>
    </main>
  );
}

function GlossaryView() {
  const [query, setQuery] = useState('');
  const filtered = glossary.filter((item) => `${item.term} ${item.meaning}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <main className="page-main glossary-page">
      <BackLink />
      <div className="page-heading"><h1>Glossary</h1><p>Definitions for terms used in the app.</p></div>
      <div className="small-search">
        <Search size={19} aria-hidden="true" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a term..." aria-label="Find a term" />
      </div>
      {filtered.length ? (
        <dl>{filtered.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.meaning}</dd></div>)}</dl>
      ) : (
        <div className="empty-state"><Search /><h2>No matching term</h2><p>Try a shorter term or a related word.</p></div>
      )}
    </main>
  );
}

function Drawer({ open, onClose, route, savedCount, restoreFocus, backgroundRef }) {
  const drawerRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const background = backgroundRef.current;
    const onKey = (event) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key !== 'Tab') return;
      const focusable = drawerRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = 'hidden';
    if (background) { background.inert = true; background.setAttribute('aria-hidden', 'true'); }
    window.addEventListener('keydown', onKey);
    window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = '';
      if (background) { background.inert = false; background.removeAttribute('aria-hidden'); }
      window.removeEventListener('keydown', onKey);
      restoreFocus?.focus();
    };
  }, [open, onClose, restoreFocus, backgroundRef]);

  if (!open) return null;
  return (
    <div className="drawer-backdrop" role="presentation" onClick={onClose}>
      <div ref={drawerRef} className="drawer" role="dialog" aria-modal="true" aria-label="Navigation" onClick={(event) => event.stopPropagation()}>
        <button ref={closeRef} className="drawer-close" type="button" onClick={onClose} aria-label="Close navigation"><X /></button>
        <Sidebar route={route} savedCount={savedCount} />
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(normalizeRoute);
  const [saved, setSaved, savedPersistent] = useStoredList('cc-saved-topics', 100);
  const [recent, setRecent] = useStoredList('cc-recent-topics', 12);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpener, setDrawerOpener] = useState(null);
  const backgroundRef = useRef(null);
  const focusRouteRef = useRef(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openDrawer = useCallback((event) => { setDrawerOpener(event.currentTarget); setDrawerOpen(true); }, []);

  useEffect(() => {
    initialiseHistory();
    const syncRoute = () => { setRoute(normalizeRoute()); setDrawerOpen(false); };
    const onNavigate = (event) => { focusRouteRef.current = Boolean(event.detail?.focus); syncRoute(); };
    const query = window.matchMedia('(min-width: 761px)');
    const closeForDesktop = () => { if (query.matches) setDrawerOpen(false); };
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('cct:navigate', onNavigate);
    query.addEventListener('change', closeForDesktop);
    syncRoute();
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('cct:navigate', onNavigate);
      query.removeEventListener('change', closeForDesktop);
    };
  }, []);

  const routeCategory = route.kind === 'category' ? getCategory(route.id) : null;
  const activeTopic = route.kind === 'topic' ? getTopic(route.id) : null;
  const viewedTopic = activeTopic || (routeCategory && categoryOverviewIds.has(routeCategory.id) ? getTopic(`${routeCategory.id}-overview`) : null);
  useEffect(() => {
    if (!viewedTopic) return;
    setRecent((items) => [viewedTopic.id, ...items.filter((id) => id !== viewedTopic.id)].slice(0, 12));
  }, [viewedTopic, setRecent]);

  useEffect(() => {
    const label = viewedTopic?.title || routeCategory?.label || ({ home: 'Home', explore: 'Topics', saved: 'Saved topics', recent: 'Recently viewed', glossary: 'Glossary' }[route.kind] || 'Page not found');
    document.title = `${label} — CCT Info Hub`;
    if (!focusRouteRef.current) return;
    focusRouteRef.current = false;
    window.requestAnimationFrame(() => {
      const main = backgroundRef.current?.querySelector('#main-content main');
      main?.setAttribute('tabindex', '-1');
      main?.focus();
    });
  }, [route, routeCategory, viewedTopic]);

  const toggleSaved = (id) => setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [id, ...items]);
  const savedTopics = useMemo(() => saved.map(getTopic).filter(Boolean), [saved]);
  const recentTopics = useMemo(() => recent.map(getTopic).filter(Boolean), [recent]);
  const category = routeCategory;

  let content;
  if (route.kind === 'home') content = <HomeView recentTopics={recentTopics} />;
  else if (route.kind === 'explore') content = <DirectoryView key="explore" saved={saved} toggleSaved={toggleSaved} />;
  else if (route.kind === 'category') {
    content = category
      ? categoryOverviewIds.has(category.id)
        ? <ArticleView topic={getTopic(`${category.id}-overview`)} saved={saved.includes(`${category.id}-overview`)} toggleSaved={toggleSaved} />
        : <DirectoryView key={`category-${category.id}`} title={category.label} intro={category.description} topicList={topicsForCategory(category.id)} saved={saved} toggleSaved={toggleSaved} />
      : <NotFoundView />;
  } else if (route.kind === 'topic') {
    content = activeTopic ? <ArticleView topic={activeTopic} saved={saved.includes(activeTopic.id)} toggleSaved={toggleSaved} /> : <NotFoundView />;
  } else if (route.kind === 'saved') content = <DirectoryView key="saved" title="Saved topics" intro="Topics you saved for another look." emptyNote="Use the bookmark on any topic to save it here." topicList={savedTopics} saved={saved} toggleSaved={toggleSaved} />;
  else if (route.kind === 'recent') content = <DirectoryView key="recent" title="Recently viewed" intro="Your most recently opened topics." emptyNote="Topics you open will appear here." topicList={recentTopics} saved={saved} toggleSaved={toggleSaved} preserveOrder />;
  else if (route.kind === 'glossary') content = <GlossaryView />;
  else content = <NotFoundView />;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); const main = backgroundRef.current?.querySelector('#main-content main'); main?.setAttribute('tabindex', '-1'); main?.focus(); }}>Skip to content</a>
      <div ref={backgroundRef}>
        <Sidebar route={route} savedCount={saved.length} />
        <MobileHeader onOpen={openDrawer} />
        <div id="main-content" className={`content-shell ${route.kind === 'home' ? 'home-layout' : ''}`}><AppErrorBoundary>{content}</AppErrorBoundary></div>
        <MobileNav route={route} savedCount={saved.length} onOpen={openDrawer} />
        {!savedPersistent && <p className="storage-status" role="status">Saved topics are available for this session only because browser storage is unavailable.</p>}
      </div>
      <Drawer open={drawerOpen} onClose={closeDrawer} route={route} savedCount={saved.length} restoreFocus={drawerOpener} backgroundRef={backgroundRef} />
    </div>
  );
}
