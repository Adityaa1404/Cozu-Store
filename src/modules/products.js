export const durationLabels = {
  daily: { label: 'Harian', unit: 'hari' },
  weekly: { label: 'Mingguan', unit: 'minggu' },
  monthly: { label: 'Bulanan', unit: 'bulan' }
};

/**
 * App metadata. Brand colour is used only for the soft logo aura — the interface
 * itself still runs on a single cyan accent.
 */
export const APP_META = {
  netflix: {
    urlSlug: 'cozu.store/netflix',
    shortLabel: 'Netflix 4K',
    chips: ['Ultra HD 4K', 'Less Limit', 'Full Garansi'],
    logo: '/logos/netflix.png',
    brand: '#E50914'
  },
  canva: {
    urlSlug: 'cozu.store/canva',
    shortLabel: 'Canva Pro',
    chips: ['100M+ Aset Pro', 'Brand Kit', 'Magic Studio'],
    logo: '/logos/canva.png',
    brand: '#00C4CC'
  },
  capcut: {
    urlSlug: 'cozu.store/capcut',
    shortLabel: 'CapCut Pro',
    chips: ['Bebas Watermark', 'Fitur AI Pro', 'Full Garansi'],
    logo: '/logos/capcut.png',
    brand: '#FFFFFF'
  },
  bstation: {
    urlSlug: 'cozu.store/bstation',
    shortLabel: 'Bstation VIP',
    chips: ['Bebas Iklan', 'Full HD 1080p', 'Full Garansi'],
    logo: '/logos/bstation.png',
    brand: '#00A1D6'
  }
};

const DEFAULT_META = {
  urlSlug: 'cozu.store',
  shortLabel: 'Akun Premium',
  chips: ['Full Garansi', 'Proses Kilat', 'QRIS Ready'],
  logo: '',
  brand: '#FFFFFF'
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

  const seenApp = new Set();

  const cards = apps
    .flatMap((app) => {
      const categoryLabel = categoryLabels[app.category] || app.category;
      const isFirstCard = !seenApp.has(app.id);
      seenApp.add(app.id);

      return app.plans.flatMap((plan) =>
        Object.entries(plan.durations || {}).map(([durationKey, durationData]) => {
          const isBest = Boolean(plan.bestSeller);
          const durMeta = durationLabels[durationKey] || { label: durationKey, unit: durationKey };
          const features = (durationData.features || []).slice(0, 3);
          const meta = getAppTheme(app.id);
          const logoMarkup = meta.logo
            ? `
                <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <div class="relative grid h-16 w-16 place-items-center sm:h-20 sm:w-20">
                    <span
                      class="absolute inset-0 rounded-full opacity-35 blur-xl"
                      style="background: radial-gradient(circle, ${meta.brand} 0%, transparent 68%)"
                    ></span>
                    <img
                      src="${escapeHtml(meta.logo)}"
                      alt=""
                      class="relative h-10 w-10 object-contain sm:h-12 sm:w-12"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              `
            : `
                <i
                  data-lucide="${escapeHtml(app.icon || 'layers')}"
                  class="absolute -right-4 top-1/2 h-28 w-28 -translate-y-1/2 text-white/[0.08] transition-transform duration-500 group-hover:scale-105 sm:h-32 sm:w-32"
                  aria-hidden="true"
                ></i>
              `;

          return `
            <article
              ${isFirstCard ? `id="app-${escapeHtml(app.id)}"` : ''}
              data-catalog-card
              data-motion-hover
              aria-label="Produk: ${escapeHtml(app.name)} — ${escapeHtml(plan.name)} (${escapeHtml(durMeta.label)})"
              class="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong"
            >
              <div class="relative m-2 mb-0 aspect-[16/9] overflow-hidden rounded-lg bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.10),transparent_62%),linear-gradient(150deg,#141824_0%,#0F171E_72%)]">
                ${logoMarkup}

                <div class="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
                  ${
                    isBest
                      ? `<span class="inline-flex items-center rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-canvas">
                           Paling laris
                         </span>`
                      : `<span class="inline-flex items-center rounded-full bg-badge px-2.5 py-1 text-[11px] font-medium text-badge-text">
                           ${escapeHtml(categoryLabel)}
                         </span>`
                  }
                  <span class="inline-flex items-center rounded-full bg-badge px-2.5 py-1 text-[11px] font-medium text-badge-text">
                    ${escapeHtml(durMeta.label)}
                  </span>
                </div>
              </div>

              <div class="flex flex-1 flex-col p-4">
                <h3 class="text-base font-bold leading-snug tracking-tight text-ink">${escapeHtml(app.name)}</h3>
                <p class="mt-0.5 text-sm font-medium leading-snug text-ink-secondary">${escapeHtml(plan.name)}</p>

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
                    ? `<p class="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-secondary">${escapeHtml(durationData.description)}</p>`
                    : ''
                }

                <ul class="mt-3 space-y-1.5 border-t border-line pt-3">
                  ${features
                    .map(
                      (feat) => `
                        <li class="flex items-start gap-2 text-[12px] leading-snug text-ink-secondary">
                          <i data-lucide="check" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-secondary" aria-hidden="true"></i>
                          <span>${escapeHtml(feat)}</span>
                        </li>
                      `
                    )
                    .join('')}
                </ul>

                <div class="mt-auto flex items-center gap-2 pt-4">
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
                    class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-action text-ink transition-colors hover:bg-action-active"
                  >
                    <i data-lucide="plus" class="h-4 w-4" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </article>
          `;
        })
      );
    })
    .join('');

  container.innerHTML = `
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      ${cards}
    </div>
  `;

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
