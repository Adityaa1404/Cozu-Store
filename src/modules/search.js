import { escapeHtml, parsePrice } from './products.js';

let activeCategory = 'all';
let activeSort = 'popular';
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

export function filterAndSortApps(apps, category = 'all', query = '', sort = 'popular') {
  let results = Array.isArray(apps) ? [...apps] : [];

  if (category !== 'all') {
    results = results.filter((app) => app.category === category);
  }

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

export function renderCategoryPills(container, categories, products, onSelect) {
  if (!container) return;

  const counts = { all: products.length };
  categories.forEach((c) => {
    if (c.id !== 'all') {
      counts[c.id] = products.filter((a) => a.category === c.id).length;
    }
  });

  container.innerHTML = categories
    .filter((c) => c.id === 'all' || (counts[c.id] || 0) > 0)
    .map((c) => {
      const isActive = activeCategory === c.id;
      const count = counts[c.id] || 0;
      return `
        <button
          type="button"
          data-category-id="${escapeHtml(c.id)}"
          aria-pressed="${isActive ? 'true' : 'false'}"
          class="category-pill inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-xs font-semibold transition-colors sm:text-sm focus-visible:outline-none ${
            isActive
              ? 'active border-accent bg-accent text-canvas'
              : 'border-line bg-canvas text-ink-secondary hover:border-accent/40 hover:text-ink'
          }"
        >
          <i data-lucide="${escapeHtml(c.icon || 'layers')}" class="h-4 w-4" aria-hidden="true"></i>
          <span>${escapeHtml(c.name)}</span>
          <span class="pill-count rounded-full px-2 py-0.5 text-xs font-semibold ${
            isActive ? 'bg-canvas/20 text-canvas' : 'bg-surface-2 text-ink-muted'
          }">
            ${count}
          </span>
        </button>
      `;
    })
    .join('');

  if (!container.dataset.delegated) {
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-category-id]');
      if (!btn) return;
      onSelect?.(btn.getAttribute('data-category-id'));
    });
    container.dataset.delegated = 'true';
  }

  document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: container } }));
}

export function initSearch({ products, categories, onUpdate }) {
  const pillsContainer = document.getElementById('category-filter-pills');
  const searchInput = document.getElementById('app-search');
  const clearBtn = document.getElementById('clear-search');
  const sortSelect = document.getElementById('sort-select');
  const resetBtn = document.getElementById('reset-filters-btn');

  const notify = () => {
    const filtered = filterAndSortApps(products, activeCategory, searchQuery, activeSort);
    onUpdate?.(filtered);
  };

  const refreshPills = () => {
    renderCategoryPills(pillsContainer, categories, products, (catId) => {
      activeCategory = catId;
      refreshPills();
      notify();
    });
  };

  const resetAll = () => {
    activeCategory = 'all';
    activeSort = 'popular';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (clearBtn) {
      clearBtn.classList.add('hidden');
      clearBtn.classList.remove('flex');
    }
    if (sortSelect) sortSelect.value = 'popular';
    refreshPills();
    notify();
  };

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

  refreshPills();
  notify();

  return { resetAll };
}
