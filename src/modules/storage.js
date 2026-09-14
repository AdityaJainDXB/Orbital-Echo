const PREFIX = "orbitalEcho:";

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setItem(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function exportAll() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k.startsWith(PREFIX)) data[k.replace(PREFIX, "")] = JSON.parse(localStorage.getItem(k));
  }
  return data;
}

export function importAll(data) {
  Object.entries(data).forEach(([k, v]) => setItem(k, v));
}