import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowLeft,
  Bandage,
  Bookmark,
  BookOpen,
  Box,
  Check,
  ChevronDown,
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
  Sparkles,
  TriangleAlert,
  Users,
  X,
} from 'lucide-react';
import { categories, getCategory, glossary, searchTopics, sourceNotes, topicById, topics, topicsForCategory } from './data/content.js';

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
  { id: 'equipment', label: 'Equipment', icon: Box },
  { id: 'situations', label: 'Situations', icon: TriangleAlert },
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
];

const useStoredList = (key) => {
  const [list, setList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(list)), [key, list]);
  return [list, setList];
};

const routeFromHash = () => {
  const raw = window.location.hash.replace(/^#\/?/, '') || 'home';
  const [kind, id] = raw.split('/');
  return { kind, id };
};

const navigate = (path) => {
  window.location.hash = `#/${path}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function Brand() {
  return (
    <button className="brand" type="button" onClick={() => navigate('home')} aria-label="Casualty Clearers home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>Casualty<br className="desktop-only" /> Clearers</span>
    </button>
  );
}

function IconFor({ name, size = 22 }) {
  const Icon = ICONS[name] || FileText;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}

function SearchBox({ value, onChange, onSelect, compact = false }) {
  const inputRef = useRef(null);
  const [active, setActive] = useState(false);
  const results = useMemo(() => searchTopics(value), [value]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.key === '/' && !/input|textarea/i.test(document.activeElement?.tagName)) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === 'Escape') inputRef.current?.blur();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={`search-wrap ${compact ? 'compact' : ''}`}>
      <Search aria-hidden="true" />
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => window.setTimeout(() => setActive(false), 120)}
        placeholder="Search treatments, equipment, situations..."
        aria-label="Search all information"
      />
      {!compact && <kbd>⌘ K</kbd>}
      {value && <button className="clear-search" type="button" onClick={() => onChange('')} aria-label="Clear search"><X size={18} /></button>}
      {active && value && (
        <div className="search-results" role="listbox" aria-label="Search results">
          {results.length ? results.map((topic) => (
            <button key={topic.id} type="button" onClick={() => { onSelect(topic); onChange(''); }}>
              <span className={`mini-icon ${topic.color}`}><IconFor name={topic.icon} size={18} /></span>
              <span><strong>{topic.title}</strong><small>{getCategory(topic.category)?.label}</small></span>
              <ChevronRight size={18} />
            </button>
          )) : <p>No matching information found.</p>}
        </div>
      )}
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
          <button className={selected === id ? 'selected' : ''} key={id} type="button" onClick={() => navigate(id === 'equipment' || id === 'situations' ? `category/${id}` : id)}>
            <Icon size={20} strokeWidth={1.8} /><span>{label}</span>
          </button>
        ))}
        <span className="nav-rule" />
        <button className={selected === 'saved' ? 'selected' : ''} type="button" onClick={() => navigate('saved')}>
          <Bookmark size={20} strokeWidth={1.8} /><span>Saved</span>{savedCount > 0 && <em>{savedCount}</em>}
        </button>
        <button className={selected === 'recent' ? 'selected' : ''} type="button" onClick={() => navigate('recent')}>
          <Clock3 size={20} strokeWidth={1.8} /><span>Recently viewed</span>
        </button>
      </nav>
      <p className="sidebar-note">Information that is easier to find, connect and revisit.</p>
    </aside>
  );
}

function MobileHeader({ onOpen }) {
  return (
    <header className="mobile-header">
      <Brand />
      <button type="button" onClick={onOpen} aria-label="Open navigation"><Menu /></button>
    </header>
  );
}

function MobileNav({ route }) {
  const items = [
    { id: 'home', label: 'Home', icon: Home, path: 'home' },
    { id: 'explore', label: 'Explore', icon: Search, path: 'explore' },
    { id: 'saved', label: 'Saved', icon: Bookmark, path: 'saved' },
    { id: 'more', label: 'More', icon: MoreHorizontal, path: 'glossary' },
  ];
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map(({ id, label, icon: Icon, path }) => (
        <button key={id} className={route.kind === id || (id === 'more' && route.kind === 'glossary') ? 'selected' : ''} type="button" onClick={() => navigate(path)}>
          <Icon size={23} strokeWidth={1.8} /><span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function TopicRow({ category, expanded, onToggle }) {
  const sampleTopics = topicsForCategory(category.id).slice(0, 4);
  return (
    <div className={`topic-row ${category.color} ${expanded ? 'expanded' : ''}`}>
      <button className="topic-row-main" type="button" onClick={onToggle} aria-expanded={expanded}>
        <span className="topic-icon"><IconFor name={category.icon} /></span>
        <span className="topic-copy"><strong>{category.label}</strong><small>{category.description}</small></span>
        {expanded ? <ChevronDown /> : <ChevronRight />}
      </button>
      {expanded && (
        <div className="topic-preview">
          {sampleTopics.map((topic) => <button type="button" key={topic.id} onClick={() => navigate(`topic/${topic.id}`)}>{topic.title}<ChevronRight size={16} /></button>)}
          <button type="button" className="view-category" onClick={() => navigate(`category/${category.id}`)}>View all {category.short.toLowerCase()} information <ChevronRight size={16} /></button>
        </div>
      )}
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
      <button className={saved ? 'save-button saved' : 'save-button'} type="button" onClick={() => onSave(topic.id)} aria-label={`${saved ? 'Remove' : 'Save'} ${topic.title}`}>
        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}

function HomeView({ saved, toggleSaved, recent }) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(() => window.matchMedia('(min-width: 761px)').matches ? 'assessment' : '');
  const recentTopics = recent.map((id) => topicById[id]).filter(Boolean).slice(0, 3);
  const continueTopics = ['MARCHE as the main navigation path', 'Basic airway opening', 'MIST, SITREP, traumagram, and communications']
    .map((title) => topics.find((topic) => topic.heading.startsWith(title)))
    .filter(Boolean);

  return (
    <>
      <header className="desktop-top-search"><SearchBox compact value={query} onChange={setQuery} onSelect={(topic) => navigate(`topic/${topic.id}`)} /></header>
      <main className="home-main">
        <section className="welcome">
          <h1>Everything in one place.</h1>
          <p>Clear, connected information for casualty clearers.</p>
          <SearchBox value={query} onChange={setQuery} onSelect={(topic) => navigate(`topic/${topic.id}`)} />
        </section>
        <section className="topic-directory" aria-labelledby="explore-heading">
          <h2 id="explore-heading">Explore key topics</h2>
          <div className="topic-list">
            {categories.filter((category) => category.id !== 'equipment').map((category) => (
              <TopicRow key={category.id} category={category} expanded={expanded === category.id} onToggle={() => setExpanded(expanded === category.id ? '' : category.id)} />
            ))}
          </div>
        </section>
      </main>
      <aside className="context-rail">
        <section>
          <div className="rail-heading"><h2>Continue exploring</h2><button type="button" onClick={() => navigate('explore')}>See all</button></div>
          {continueTopics.map((topic) => <MiniTopicRow key={topic.id} topic={topic} saved={saved.includes(topic.id)} onSave={toggleSaved} />)}
        </section>
        <section>
          <div className="rail-heading"><h2>Recently viewed</h2><button type="button" onClick={() => navigate('recent')}>See all</button></div>
          {recentTopics.length ? recentTopics.map((topic) => <MiniTopicRow key={topic.id} topic={topic} saved={saved.includes(topic.id)} onSave={toggleSaved} />) : <p className="empty-note">Topics you open will appear here.</p>}
        </section>
      </aside>
    </>
  );
}

function DirectoryView({ title = 'Explore all information', intro = 'Browse by subject or search across every topic.', categoryId, topicList = topics, saved, toggleSaved }) {
  const [query, setQuery] = useState('');
  const visible = query ? searchTopics(query).filter((topic) => !categoryId || topic.category === categoryId) : topicList;
  const groups = categories.map((category) => ({ category, items: visible.filter((topic) => topic.category === category.id) })).filter((group) => group.items.length);
  return (
    <main className="page-main directory-page">
      <button type="button" className="back-link" onClick={() => history.back()}><ArrowLeft size={17} /> Back</button>
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
        {!groups.length && <div className="empty-state"><Search /><h2>No matching information</h2><p>Try a shorter term or a related word.</p></div>}
      </div>
    </main>
  );
}

function ArticleView({ topic, saved, toggleSaved }) {
  const category = getCategory(topic.category);
  const related = topics.filter((item) => item.category === topic.category && item.id !== topic.id).slice(0, 4);
  const sourceIds = [...new Set([...topic.body.matchAll(/\[(\d+)\]/g)].map((match) => match[1]))].filter((id) => sourceNotes[id]);
  return (
    <main className="page-main article-page">
      <button type="button" className="back-link" onClick={() => history.back()}><ArrowLeft size={17} /> Back</button>
      <div className="article-breadcrumb"><button type="button" onClick={() => navigate(`category/${category.id}`)}>{category.label}</button><ChevronRight size={15} /><span>{topic.title}</span></div>
      <header className={`article-header ${topic.color}`}>
        <span className="topic-icon"><IconFor name={topic.icon} size={26} /></span>
        <div><p>{topic.group}</p><h1>{topic.title}</h1><span>{topic.description}</span></div>
        <button className={saved ? 'article-save saved' : 'article-save'} type="button" onClick={() => toggleSaved(topic.id)}>
          <Bookmark size={19} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}
        </button>
      </header>
      <div className="article-layout">
        <article className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            a: ({ ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
          }}>{topic.body}</ReactMarkdown>
          {sourceIds.length > 0 && (
            <details className="source-notes">
              <summary>Sources used in this topic</summary>
              <ol>{sourceIds.map((id) => <li key={id}><span>[{id}]</span> {sourceNotes[id]}</li>)}</ol>
            </details>
          )}
          <footer className="content-source"><Sparkles size={18} /><span>Consolidated from: {topic.source}</span></footer>
        </article>
        <aside className="related-panel">
          <h2>Related information</h2>
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
      <div className="page-heading"><h1>Glossary</h1><p>Common terms used throughout the information.</p></div>
      <div className="small-search"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a term..." /></div>
      <dl>{filtered.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.meaning}</dd></div>)}</dl>
    </main>
  );
}

function Drawer({ open, onClose, route, savedCount }) {
  if (!open) return null;
  return <div className="drawer-backdrop" onClick={onClose}><div className="drawer" onClick={(event) => event.stopPropagation()}><button className="drawer-close" type="button" onClick={onClose}><X /></button><Sidebar route={route} savedCount={savedCount} /></div></div>;
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash);
  const [saved, setSaved] = useStoredList('cc-saved-topics');
  const [recent, setRecent] = useStoredList('cc-recent-topics');
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  let content;
  if (route.kind === 'home') content = <HomeView saved={saved} toggleSaved={toggleSaved} recent={recent} />;
  else if (route.kind === 'explore') content = <DirectoryView saved={saved} toggleSaved={toggleSaved} />;
  else if (route.kind === 'category') {
    const category = getCategory(route.id) || categories[0];
    content = <DirectoryView title={category.label} intro={category.description} categoryId={category.id} topicList={topicsForCategory(category.id)} saved={saved} toggleSaved={toggleSaved} />;
  } else if (route.kind === 'topic' && activeTopic) content = <ArticleView topic={activeTopic} saved={saved.includes(activeTopic.id)} toggleSaved={toggleSaved} />;
  else if (route.kind === 'saved') content = <DirectoryView title="Saved information" intro="Topics you have set aside to revisit." topicList={saved.map((id) => topicById[id]).filter(Boolean)} saved={saved} toggleSaved={toggleSaved} />;
  else if (route.kind === 'recent') content = <DirectoryView title="Recently viewed" intro="The information you opened most recently." topicList={recent.map((id) => topicById[id]).filter(Boolean)} saved={saved} toggleSaved={toggleSaved} />;
  else if (route.kind === 'glossary') content = <GlossaryView />;
  else content = <DirectoryView saved={saved} toggleSaved={toggleSaved} />;

  return (
    <div className="app-shell">
      <Sidebar route={route} savedCount={saved.length} />
      <MobileHeader onOpen={() => setDrawerOpen(true)} />
      <div className={`content-shell ${route.kind === 'home' ? 'home-layout' : ''}`}>{content}</div>
      <MobileNav route={route} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} route={route} savedCount={saved.length} />
    </div>
  );
}
