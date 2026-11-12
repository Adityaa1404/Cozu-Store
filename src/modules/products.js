export const durationLabels = {
  daily: { label: 'Harian', unit: 'hari' },
  weekly: { label: 'Mingguan', unit: 'minggu' },
  monthly: { label: 'Bulanan', unit: 'bulan' }
};

/**
 * Non-visual app metadata only. The storefront uses a single accent, so apps are
 * differentiated by name + icon, never by their own colour theme.
 */
export const APP_META = {
  netflix: {
    urlSlug: 'cozu.store/netflix',
    shortLabel: 'Netflix 4K',
    chips: ['Ultra HD 4K', 'Less Limit', 'Full Garansi']
  },
  canva: {
    urlSlug: 'cozu.store/canva',
    shortLabel: 'Canva Pro',
    chips: ['100M+ Aset Pro', 'Brand Kit', 'Magic Studio']
  },
  capcut: {
    urlSlug: 'cozu.store/capcut',
    shortLabel: 'CapCut Pro',
    chips: ['Bebas Watermark', 'Fitur AI Pro', 'Full Garansi']
  },
  bstation: {
    urlSlug: 'cozu.store/bstation',
    shortLabel: 'Bstation VIP',
    chips: ['Bebas Iklan', 'Full HD 1080p', 'Full Garansi']
  }
};

const DEFAULT_META = {
  urlSlug: 'cozu.store',
  shortLabel: 'Akun Premium',
  chips: ['Full Garansi', 'Proses Kilat', 'QRIS Ready']
};

export function getAppTheme(appId) {
  return APP_META[appId] || DEFAULT_META;
}

export function getIndonesianDate(date = new Date()) {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function parsePrice(priceStr) {
  if (typeof priceStr === 'number') return priceStr;
  if (!priceStr || typeof priceStr !== 'string') return 0;
  const cleanNum = priceStr.replace(/[^0-9]/g, '');
  return parseInt(cleanNum, 10) || 0;
}

export function formatRupiah(num) {
  return 'Rp ' + (num || 0).toLocaleString('id-ID');
}

export function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getStartingPrice(app) {
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

function countPlanCards(app) {
  if (!app || !Array.isArray(app.plans)) return 0;
  return app.plans.reduce((sum, plan) => sum + Object.keys(plan.durations || {}).length, 0);
}

const categoryLabels = {
  streaming: 'Streaming Video',
  design: 'Desain & Editing',
  music: 'Musik & Audio',
  productivity: 'AI & Produktivitas'
};

export function renderCatalog(container, emptyStateEl, apps, { onAddToCart, onDirectBuy } = {}) {
  if (!container) return;

  if (!Array.isArray(apps) || apps.length === 0) {
    container.innerHTML = '';
    container.classList.add('hidden');
    if (emptyStateEl) emptyStateEl.classList.remove('hidden');
    return;
  }

  if (emptyStateEl) emptyStateEl.classList.add('hidden');
  container.classList.remove('hidden');

  container.innerHTML = apps
    .map((app) => {
      const startPrice = getStartingPrice(app);
      const totalVariants = countPlanCards(app);
      const gridColsClass =
        totalVariants === 1
          ? 'grid-cols-1 max-w-md'
          : totalVariants === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4';

      const planCardsHtml = app.plans
        .flatMap((plan) =>
          Object.entries(plan.durations || {}).map(([durationKey, durationData]) => {
            const isBest = Boolean(plan.bestSeller);
            const durMeta = durationLabels[durationKey] || { label: durationKey, unit: durationKey };

            return `
              <div
                data-catalog-card
                data-motion-hover
                class="flex h-full flex-col justify-between rounded-xl border p-5 transition-colors ${
                  isBest
                    ? 'border-accent/40 bg-surface'
                    : 'border-line bg-canvas-subtle hover:border-accent/30'
                }"
              >
                <div class="flex flex-col">
                  <div class="flex items-center justify-between gap-2">
                    <span class="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-ink-secondary">
                      ${escapeHtml(durMeta.label)}
                    </span>
                    ${
                      isBest
                        ? `<span class="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-accent-subtle px-2.5 py-1 text-[11px] font-semibold text-ink">
                             Paling laris
                           </span>`
                        : ''
                    }
                  </div>

                  <h4 class="mt-4 text-base font-semibold leading-snug text-ink">
                    ${escapeHtml(plan.name)}
                  </h4>

                  <div
                    class="mt-2 flex items-baseline gap-1"
                    aria-label="Harga: ${escapeHtml(durationData.price)} per ${escapeHtml(durMeta.unit)}"
                  >
                    <span class="text-2xl font-bold tracking-tight text-ink">
                      ${escapeHtml(durationData.price)}
                    </span>
                    <span class="text-xs font-medium text-ink-secondary">
                      /${escapeHtml(durMeta.unit)}
                    </span>
                  </div>

                  ${
                    durationData.description
                      ? `<p class="mt-3 min-h-[58px] text-[13px] leading-relaxed text-ink-secondary">${escapeHtml(durationData.description)}</p>`
                      : ''
                  }

                  <ul class="mb-5 mt-4 flex-1 space-y-2 border-t border-line pt-4">
                    ${(durationData.features || [])
                      .map(
                        (feat) => `
                          <li class="flex items-start gap-2 text-[13px] leading-snug text-ink-secondary">
                            <i data-lucide="check" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true"></i>
                            <span>${escapeHtml(feat)}</span>
                          </li>
                        `
                      )
                      .join('')}
                  </ul>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    data-catalog-action="buy"
                    data-motion-press
                    data-app-id="${escapeHtml(app.id)}"
                    data-plan-name="${escapeHtml(plan.name)}"
                    data-price="${escapeHtml(durationData.price)}"
                    data-duration-key="${escapeHtml(durationKey)}"
                    data-duration-label="${escapeHtml(durMeta.label)}"
                    class="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-accent text-sm font-semibold text-canvas transition-colors hover:bg-accent-hover"
                  >
                    <span>Beli Langsung</span>
                  </button>
                  <button
                    type="button"
                    data-catalog-action="add"
                    data-motion-press
                    data-app-id="${escapeHtml(app.id)}"
                    data-plan-name="${escapeHtml(plan.name)}"
                    data-price="${escapeHtml(durationData.price)}"
                    data-duration-key="${escapeHtml(durationKey)}"
                    data-duration-label="${escapeHtml(durMeta.label)}"
                    aria-label="Tambah ${escapeHtml(app.name)} ${escapeHtml(plan.name)} (${escapeHtml(durMeta.label)}) ke keranjang"
                    title="Tambah ke keranjang"
                    class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent transition-colors hover:bg-accent-subtle"
                  >
                    <i data-lucide="plus" class="h-4 w-4" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            `;
          })
        )
        .join('');

      return `
        <article
          id="app-${escapeHtml(app.id)}"
          aria-label="Produk: ${escapeHtml(app.name)}"
          class="scroll-mt-24 rounded-xl border border-line bg-surface p-5 sm:p-7"
        >
          <div class="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-center">
            <div class="flex items-start gap-4 sm:items-center">
              <div
                class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-subtle text-accent"
                aria-hidden="true"
              >
                <i data-lucide="${escapeHtml(app.icon || 'layers')}" class="h-6 w-6"></i>
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    ${escapeHtml(app.name)}
                  </h3>
                  <span class="inline-flex items-center rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-ink-faint">
                    ${escapeHtml(categoryLabels[app.category] || app.category)}
                  </span>
                </div>
                ${
                  app.tagline
                    ? `<p class="mt-0.5 text-sm text-ink-secondary">${escapeHtml(app.tagline)}</p>`
                    : ''
                }
              </div>
            </div>

            <div class="flex items-center gap-3 self-start sm:self-center">
              <span class="text-xs font-medium text-ink-faint">${totalVariants} paket</span>
              <span class="text-sm font-semibold text-accent-hover">
                Mulai ${escapeHtml(formatRupiah(startPrice))}
              </span>
            </div>
          </div>

          <div class="mt-6 grid ${gridColsClass} gap-4">
            ${planCardsHtml}
          </div>
        </article>
      `;
    })
    .join('');

  if (!container.dataset.delegated) {
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-catalog-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-catalog-action');
      const payload = {
        appId: btn.getAttribute('data-app-id'),
        planName: btn.getAttribute('data-plan-name'),
        price: btn.getAttribute('data-price'),
        durationKey: btn.getAttribute('data-duration-key'),
        durationLabel: btn.getAttribute('data-duration-label')
      };
      if (action === 'add-to-cart' || action === 'add') {
        onAddToCart?.(payload);
      } else if (action === 'direct-buy' || action === 'buy') {
        onDirectBuy?.(payload);
      }
    });
    container.dataset.delegated = 'true';
  }

  document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: container } }));
  document.dispatchEvent(new CustomEvent('cozu:catalog-rendered', { detail: { root: container } }));
}

export function highlightAppSection(appId) {
  const el = document.getElementById(`app-${appId}`);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.classList.remove('target-highlight');
  void el.offsetWidth;
  el.classList.add('target-highlight');
}
