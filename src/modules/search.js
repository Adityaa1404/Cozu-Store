import { escapeHtml, parsePrice } from './products.js';

let activeApp = 'all';
let activeSort = 'price-low';
let searchQuery = '';

export function getMinPrice(app) {
  if (!app || !Array.isArray(app.plans)) return 0;
  let min = Infinity;
  app.plans.forEach((plan) => {
    if (plan.durations) {
      Object.values(plan.durations).forEach((dur) => {
        const p = parsePrice(dur.price);
        if (p > 0 && p < min) min = p;
      });
    }
  });
  return min === Infinity ? 0 : min;
}

export function getMaxPrice(app) {
  if (!app || !Array.isArray(app.plans)) return 0;
  let max = 0;
  app.plans.forEach((plan) => {
    if (plan.durations) {
      Object.values(plan.durations).forEach((dur) => {
        const p = parsePrice(dur.price);
        if (p > max) max = p;
      });
    }
  });
  return max;
}

function applyQueryAndSort(apps, query, sort) {
  let results = Array.isArray(apps) ? [...apps] : [];

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    results = results.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        (app.tagline && app.tagline.toLowerCase().includes(q)) ||
        (app.category && app.category.toLowerCase().includes(q)) ||
        app.plans.some(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            Object.values(p.durations || {}).some(
              (d) =>
                (d.description && d.description.toLowerCase().includes(q)) ||
                (d.features && d.features.some((f) => f.toLowerCase().includes(q)))
            )
        )
    );
  }

  if (sort === 'price-low') {
    results.sort((a, b) => getMinPrice(a) - getMinPrice(b));
  } else if (sort === 'price-high') {
    results.sort((a, b) => getMaxPrice(b) - getMaxPrice(a));
  } else if (sort === 'name-asc') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    results.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
  }

  return results;
}

/**
 * Legacy category filter kept for the cartridge/unit tests and any old callers.
 * The storefront itself now filters by app id via filterAppsByApp().
 */
export function filterAndSortApps(apps, category = 'all', query = '', sort = 'popular') {
  let results = Array.isArray(apps) ? [...apps] : [];
  if (category !== 'all') {
    results = results.filter((app) => app.category === category);
  }
  return applyQueryAndSort(results, query, sort);
}

/** Storefront filter: one app at a time, selected from the per-app dropdown. */
export function filterAppsByApp(apps, appId = 'all', query = '', sort = 'popular') {
  let results = Array.isArray(apps) ? [...apps] : [];
  if (appId !== 'all') {
    results = results.filter((app) => app.id === appId);
  }
  return applyQueryAndSort(results, query, sort);
}

export function initSearch({ products, onUpdate }) {
  const pillsContainer = document.getElementById('category-filter-pills');
  const appSelect = document.getElementById('app-filter-select');
  const searchInput = document.getElementById('app-search');
  const clearBtn = document.getElementById('clear-search');
  const sortSelect = document.getElementById('sort-select');
  const resetBtn = document.getElementById('reset-filters-btn');

  // The old category pill bar stays in the DOM for the protected contract, but
  // is intentionally hidden and empty. The per-app select is the live filter.
  if (pillsContainer) pillsContainer.innerHTML = '';

  if (appSelect && Array.isArray(products) && products.length) {
    const current = appSelect.value || activeApp;
    appSelect.innerHTML = [
      '<option value="all">Semua Aplikasi</option>',
      ...products.map(
        (app) => `<option value="${escapeHtml(app.id)}">${escapeHtml(app.name)}</option>`
      )
    ].join('');
    appSelect.value = current;
  }

  const notify = () => {
    const filtered = filterAppsByApp(products, activeApp, searchQuery, activeSort);
    onUpdate?.(filtered, { sort: activeSort });
  };

  const resetAll = () => {
    activeApp = 'all';
    activeSort = 'price-low';
    searchQuery = '';
    if (appSelect) appSelect.value = 'all';
    if (searchInput) searchInput.value = '';
    if (clearBtn) {
      clearBtn.classList.add('hidden');
      clearBtn.classList.remove('flex');
    }
    if (sortSelect) sortSelect.value = 'price-low';
    notify();
  };

  if (appSelect) {
    appSelect.addEventListener('change', (e) => {
      activeApp = e.target.value || 'all';
      notify();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearBtn) {
        const isEmpty = searchQuery.trim().length === 0;
        clearBtn.classList.toggle('hidden', isEmpty);
        clearBtn.classList.toggle('flex', !isEmpty);
      }
      notify();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      clearBtn.classList.add('hidden');
      clearBtn.classList.remove('flex');
      notify();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      notify();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetAll);
  }

  notify();

  return { resetAll };
}
