const APP_STATE_KEY = '__cctInfoHub';

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });

export const normalizeRoute = (hash = window.location.hash) => {
  const raw = hash.replace(/^#\/?/, '');
  const segments = raw.split('/').filter(Boolean);
  return segments.length === 0 ? { kind: 'home' } : { kind: segments[0], id: segments[1] };
};

const stateFor = (index) => ({ ...window.history.state, [APP_STATE_KEY]: { index } });

export const initialiseHistory = () => {
  const current = window.history.state?.[APP_STATE_KEY];
  if (!current) window.history.replaceState(stateFor(0), '', window.location.href);
  if (!window.location.hash) window.history.replaceState(stateFor(0), '', '#/home');
};

export const navigate = (path, { replace = false, focus = true } = {}) => {
  const currentIndex = window.history.state?.[APP_STATE_KEY]?.index ?? 0;
  const url = `#/${path}`;
  if (replace) window.history.replaceState(stateFor(currentIndex), '', url);
  else window.history.pushState(stateFor(currentIndex + 1), '', url);
  window.dispatchEvent(new CustomEvent('cct:navigate', { detail: { focus } }));
  scrollToTop();
};

export const goBack = () => {
  const index = window.history.state?.[APP_STATE_KEY]?.index ?? 0;
  if (index > 0) window.history.back();
  else navigate('home');
};

export const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
};
