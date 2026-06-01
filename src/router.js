/**
 * Mini router for LWC – declarative routes, dynamic params, History API.
 * No page refresh; back/forward supported.
 * Routes are defined in routes.config.js.
 *
 * Supports two URL modes:
 *   - pathname (default): uses pushState, requires server-side SPA fallback
 *   - hash: uses #/path URLs, works on static hosts like GitHub Pages
 *
 * Set VITE_ROUTER_MODE=hash in .env.gh-pages for static deployments.
 */

import { routes } from './routes.config.js';

const DEFAULT_TITLE = 'Salesforce';

const HASH_MODE = import.meta.env.VITE_ROUTER_MODE === 'hash';

const listeners = new Set();

function matchRoute(path) {
  for (const route of routes) {
    if (route.path === '*') {
      return { ...route, params: {} };
    }

    const keys = [];
    const pattern = route.path.replace(/:([^/]+)/g, (_, key) => {
      keys.push(key);
      return '([^/]+)';
    });

    const regex = new RegExp(`^${pattern}$`);
    const match = path.match(regex);

    if (match) {
      const params = {};
      keys.forEach((k, i) => (params[k] = match[i + 1]));

      return { ...route, params };
    }
  }

  return null;
}

function getTitleForRoute(route) {
  if (!route?.title) return DEFAULT_TITLE;
  return typeof route.title === 'function'
    ? route.title(route.params || {})
    : route.title;
}

function getLogicalPath() {
  if (!HASH_MODE) {
    return window.location.pathname;
  }
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') return '/';
  if (hash.startsWith('#/')) {
    const body = hash.slice(2).split('?')[0];
    return body ? `/${body}` : '/';
  }
  return '/';
}

function writeUrl(path, replace = false) {
  const url = HASH_MODE ? `#/${path === '/' ? '' : path.slice(1)}` : path;
  if (replace) {
    history.replaceState({}, '', url);
  } else {
    history.pushState({}, '', url);
  }
}

/**
 * Returns an href string suitable for anchor tags and programmatic navigation.
 * Consumers should use this instead of hardcoding paths so links work in both modes.
 */
export function linkHref(path) {
  if (HASH_MODE) {
    return `#/${path === '/' ? '' : path.slice(1)}`;
  }
  return path;
}

function notify() {
  const route = matchRoute(getLogicalPath());
  document.title = getTitleForRoute(route);
  listeners.forEach((cb) => cb(route));
}

export function navigate(path) {
  if (!path || path === getLogicalPath()) {
    return;
  }
  writeUrl(path);
  notify();
}

export function getCurrentRoute() {
  return matchRoute(getLogicalPath());
}

export function subscribe(callback) {
  listeners.add(callback);
  const route = matchRoute(getLogicalPath());
  document.title = getTitleForRoute(route);
  callback(route);

  return () => listeners.delete(callback);
}

window.addEventListener('popstate', notify);
window.addEventListener('hashchange', notify);
