export const normalizeTopicIds = (value, validTopicIds, maximum = 12) => {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value.filter((id) => {
    if (typeof id !== 'string' || !validTopicIds.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  }).slice(0, maximum);
};

export const readStoredList = (key, validTopicIds, maximum) => {
  try {
    return { list: normalizeTopicIds(JSON.parse(window.localStorage.getItem(key)), validTopicIds, maximum), available: true };
  } catch {
    return { list: [], available: false };
  }
};

export const writeStoredList = (key, list) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
};
