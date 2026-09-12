import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Bandage,
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
  Wind,
  Menu,
  MoreHorizontal,
  Radio,
  Search,
  TriangleAlert,
  Users,
  X,
} from 'lucide-react';
import { categories, getCategory, glossary, searchTopics, topicById, topics, topicsForCategory } from './data/content.js';

const ICONS = {
  assessment: ClipboardCheck,
  treatments: Bandage,
  airway: Wind,
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
  { id: 'equipment', label: 'Equipment', icon: Box },
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

const readStored = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const writeStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private browsing, blocked site data). Saving is optional.
  }
};

const useStoredList = (key) => {
  const [list, setList] = useState(() => readStored(key));
  useEffect(() => writeStored(key, list), [key, list]);
  return [list, setList];
};

const routeFromHash = () => {
  const raw = window.location.hash.replace(/^#\/?/, '') || 'home';
  const [kind, id] = raw.split('/');
  return { kind, id };
};

// History entries that existed before the app loaded. Anything beyond this was
// added by in-app navigation, so going back stays inside the app.
const entryHistoryLength = window.history.length;

const navigate = (path) => {
  window.location.hash = `#/${path}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goBack = () => {
  if (window.history.length > entryHistoryLength) window.history.back();
  else navigate('home');
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

function SearchBox({ value, onChange, onSelect, compact = false, shortcut = true }) {
  const inputRef = useRef(null);
  const listId = useId();
  const [active, setActive] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const results = useMemo(() => searchTopics(value), [value]);
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
        placeholder="Search all information..."
        aria-label="Search all information"
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
        <div className="search-results"><p role="status">No matching information found.</p></div>
      ))}
    </div>
  );
}

function Sidebar({ route, savedCount }) {
  const selected = route.kind === 'category' ? route.id : route.kind;
  return (
    <aside className="sidebar">
      <Brand />
      <nav aria-label="Primary navigation">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button className={selected === id ? 'selected' : ''} aria-current={selected === id ? 'page' : undefined} key={id} type="button" onClick={() => navigate(['assessment', 'bleeding', 'airway', 'equipment'].includes(id) ? `category/${id}` : id)}>
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

function MobileNav({ route, savedCount }) {
  const items = [
    { id: 'home', label: 'Home', icon: Home, path: 'home' },
    { id: 'explore', label: 'Explore', icon: Search, path: 'explore' },
    { id: 'saved', label: 'Saved', icon: Bookmark, path: 'saved' },
    { id: 'more', label: 'More', icon: MoreHorizontal, path: 'glossary' },
  ];
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map(({ id, label, icon: Icon, path }) => {
        const selected = route.kind === id || (id === 'more' && route.kind === 'glossary');
        return (
          <button key={id} className={selected ? 'selected' : ''} aria-current={selected ? 'page' : undefined} type="button" onClick={() => navigate(path)}>
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

function HomeView() {
  const [query, setQuery] = useState('');

  return (
    <>
      <header className="desktop-top-search"><SearchBox compact shortcut={false} value={query} onChange={setQuery} onSelect={(topic) => navigate(`topic/${topic.id}`)} /></header>
      <main className="home-main">
        <section className="welcome">
          <h1>CCT Info Hub</h1>
          <SearchBox value={query} onChange={setQuery} onSelect={(topic) => navigate(`topic/${topic.id}`)} />
        </section>
        <section className="topic-directory" aria-labelledby="explore-heading">
          <h2 id="explore-heading">Browse</h2>
          <div className="topic-list">
            {categories.map((category) => <TopicRow key={category.id} category={category} />)}
          </div>
        </section>
      </main>
    </>
  );
}

function DirectoryView({ title = 'Explore all information', intro = 'Browse by subject or search across every topic.', emptyNote, topicList = topics, saved, toggleSaved }) {
  const [query, setQuery] = useState('');
  const scopedIds = useMemo(() => new Set(topicList.map((topic) => topic.id)), [topicList]);
  const visible = query ? searchTopics(query).filter((topic) => scopedIds.has(topic.id)) : topicList;
  const groups = categories.map((category) => ({ category, items: visible.filter((topic) => topic.category === category.id) })).filter((group) => group.items.length);
  return (
    <main className="page-main directory-page">
      <BackLink />
      <div className="page-heading"><h1>{title}</h1><p>{intro}</p></div>
      <SearchBox value={query} onChange={setQuery} onSelect={(topic) => navigate(`topic/${topic.id}`)} />
      <div className="directory-groups">
        {groups.map(({ category, items }) => (
          <section key={category.id}>
            <div className="group-heading"><span className={`topic-icon ${category.color}`}><IconFor name={category.icon} /></span><div><h2>{category.label}</h2><p>{category.description}</p></div></div>
            <div className="article-list">
              {items.map((topic) => <MiniTopicRow key={topic.id} topic={topic} saved={saved.includes(topic.id)} onSave={toggleSaved} />)}
            </div>
          </section>
        ))}
        {!groups.length && (
          <div className="empty-state">
            <Search />
            <h2>{query ? 'No matching information' : 'Nothing here yet'}</h2>
            <p>{query ? 'Try a shorter term or a related word.' : emptyNote || 'There is no information in this section.'}</p>
            {!query && <button type="button" onClick={() => navigate('explore')}>Browse all information <ChevronRight size={16} /></button>}
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
        <h2>That information could not be found</h2>
        <p>The link may be out of date, or the topic may have been renamed.</p>
        <button type="button" onClick={() => navigate('explore')}>Browse all information <ChevronRight size={16} /></button>
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

function ArticleView({ topic, saved, toggleSaved }) {
  const category = getCategory(topic.category);
  const related = (topic.related || []).map((id) => topicById[id]).filter(Boolean);
  const isMarchPriority = MARCHE_STEPS.some((step) => step.id === topic.id);
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
      <div className="article-layout">
        <article className="reference-content">
          {topic.path && <section className="reference-block"><h2>Assessment sequence</h2>{renderLinks(topic.path, 'path-list')}</section>}
          {topic.scale && <section className="reference-block"><h2>AVPU scale</h2><div className="scale-grid">{topic.scale.map((item) => <div key={item.letter}><span>{item.letter}</span><strong>{item.title}</strong><p>{item.text}</p></div>)}</div></section>}
          {topic.march && <section className="reference-block"><h2>Select a MARCHE priority</h2><div className="march-grid">{topic.march.map((item) => <button key={item.letter} type="button" onClick={() => navigate(`topic/${item.topicId}`)}><b>{item.letter}</b><span><strong>{item.title}</strong><small>{item.text}</small></span><ChevronRight size={21} /></button>)}</div></section>}
          {topic.quickRoutes && <section className="reference-block"><h2>{topic.quickRouteHeading || 'Choose what you need'}</h2>{renderLinks(topic.quickRoutes, 'quick-route-grid')}</section>}
          {topic.steps && <section className="reference-block"><h2>How to do it</h2><ol className="step-list">{topic.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section>}
          {topic.sections?.map((section) => <section className="reference-block" key={section.title}><h2>{section.title}</h2><ul className="check-list">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul></section>)}
          {topic.notice && <aside className="reference-notice"><TriangleAlert size={21} /><div><strong>{topic.notice.title}</strong><p>{topic.notice.text}</p></div></aside>}
          {topic.actions && <section className="reference-block"><h2>{topic.actionHeading || 'Open a procedure or equipment card'}</h2>{renderLinks(topic.actions, 'action-grid')}</section>}
          {topic.nextStep && <section className="continue-primary"><div><span>{topic.nextStep.kicker || 'Next in MARCHE'}</span><h2>{topic.nextStep.title}</h2><p>{topic.nextStep.description}</p></div><button type="button" onClick={() => navigate(`topic/${topic.nextStep.topicId}`)} aria-label={topic.nextStep.title}><ChevronRight size={25} /></button></section>}
          {topic.resources?.length > 0 && <section className="reference-block resources"><h2>Official references & media</h2>{topic.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer"><span><em>{resource.kind}</em><strong>{resource.title}</strong><small>{resource.description}</small></span><ExternalLink size={19} /></a>)}</section>}
        </article>
        <aside className="related-panel">
          <h2>Go next</h2>
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
      <div className="page-heading"><h1>Glossary</h1><p>Common terms used throughout the information.</p></div>
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

function Drawer({ open, onClose, route, savedCount }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="drawer-backdrop" role="presentation" onClick={onClose}>
      <div className="drawer" role="dialog" aria-modal="true" aria-label="Navigation" onClick={(event) => event.stopPropagation()}>
        <button ref={closeRef} className="drawer-close" type="button" onClick={onClose} aria-label="Close navigation"><X /></button>
        <Sidebar route={route} savedCount={savedCount} />
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash);
  const [saved, setSaved] = useStoredList('cc-saved-topics');
  const [recent, setRecent] = useStoredList('cc-recent-topics');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    const onHash = () => { setRoute(routeFromHash()); setDrawerOpen(false); };
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) navigate('home');
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const activeTopic = route.kind === 'topic' ? topicById[route.id] : null;
  useEffect(() => {
    if (!activeTopic) return;
    setRecent((items) => [activeTopic.id, ...items.filter((id) => id !== activeTopic.id)].slice(0, 12));
  }, [activeTopic, setRecent]);

  const toggleSaved = (id) => setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [id, ...items]);
  const savedTopics = useMemo(() => saved.map((id) => topicById[id]).filter(Boolean), [saved]);
  const recentTopics = useMemo(() => recent.map((id) => topicById[id]).filter(Boolean), [recent]);
  const category = route.kind === 'category' ? getCategory(route.id) : null;

  let content;
  if (route.kind === 'home') content = <HomeView />;
  else if (route.kind === 'explore') content = <DirectoryView key="explore" saved={saved} toggleSaved={toggleSaved} />;
  else if (route.kind === 'category') {
    content = category
      ? category.id === 'assessment'
        ? <ArticleView topic={topicById['assessment-overview']} saved={saved.includes('assessment-overview')} toggleSaved={toggleSaved} />
        : <DirectoryView key={`category-${category.id}`} title={category.label} intro={category.description} topicList={topicsForCategory(category.id)} saved={saved} toggleSaved={toggleSaved} />
      : <NotFoundView />;
  } else if (route.kind === 'topic') {
    content = activeTopic ? <ArticleView topic={activeTopic} saved={saved.includes(activeTopic.id)} toggleSaved={toggleSaved} /> : <NotFoundView />;
  } else if (route.kind === 'saved') content = <DirectoryView key="saved" title="Saved information" intro="Topics you have set aside to revisit." emptyNote="Use the bookmark on any topic to save it here." topicList={savedTopics} saved={saved} toggleSaved={toggleSaved} />;
  else if (route.kind === 'recent') content = <DirectoryView key="recent" title="Recently viewed" intro="The information you opened most recently." emptyNote="Topics you open will appear here." topicList={recentTopics} saved={saved} toggleSaved={toggleSaved} />;
  else if (route.kind === 'glossary') content = <GlossaryView />;
  else content = <NotFoundView />;

  return (
    <div className="app-shell">
      <Sidebar route={route} savedCount={saved.length} />
      <MobileHeader onOpen={() => setDrawerOpen(true)} />
      <div className={`content-shell ${route.kind === 'home' ? 'home-layout' : ''}`}>{content}</div>
      <MobileNav route={route} savedCount={saved.length} />
      <Drawer open={drawerOpen} onClose={closeDrawer} route={route} savedCount={saved.length} />
    </div>
  );
}
