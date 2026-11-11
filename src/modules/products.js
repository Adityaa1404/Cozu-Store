export const durationLabels = {
  daily: { label: 'Harian', unit: 'hari' },
  weekly: { label: 'Mingguan', unit: 'minggu' },
  monthly: { label: 'Bulanan', unit: 'bulan' }
};

export const APP_THEMES = {
  netflix: {
    pastelSurface: 'bg-[#FBE3E4]/75 border-[#F3C2C5]',
    pastelOrb: 'bg-[#FBE3E4] text-[#E11D48]',
    badgeClass: 'bg-[#FBE3E4] text-[#9F1239] border-[#F3C2C5]',
    heroGradient: 'from-[#FBE3E4] via-[#FCEBED] to-[#FFF6F6]',
    orbShadow: 'drop-shadow(0 12px 20px rgba(225, 29, 72, 0.24))',
    accentHex: '#E11D48',
    surfaceHex: '#FBE3E4',
    urlSlug: 'cozu.store/netflix',
    shortLabel: 'Netflix 4K',
    chips: ['Ultra HD 4K', 'Less Limit', 'Full Garansi']
  },
  canva: {
    pastelSurface: 'bg-[#D5F5F6]/75 border-[#9FE4E6]',
    pastelOrb: 'bg-[#D5F5F6] text-[#0891B2]',
    badgeClass: 'bg-[#D5F5F6] text-[#155E75] border-[#9FE4E6]',
    heroGradient: 'from-[#D5F5F6] via-[#E6FAFA] to-[#F3FEFE]',
    orbShadow: 'drop-shadow(0 12px 20px rgba(8, 145, 178, 0.22))',
    accentHex: '#0891B2',
    surfaceHex: '#D5F5F6',
    urlSlug: 'cozu.store/canva',
    shortLabel: 'Canva Pro',
    chips: ['100M+ Aset Pro', 'Brand Kit', 'Magic Studio']
  },
  capcut: {
    pastelSurface: 'bg-[#EFF7D3]/80 border-[#D1E58F]',
    pastelOrb: 'bg-[#EFF7D3] text-[#4D7C0F]',
    badgeClass: 'bg-[#EFF7D3] text-[#3F6212] border-[#D1E58F]',
    heroGradient: 'from-[#EFF7D3] via-[#F6FBE5] to-[#FBFEF4]',
    orbShadow: 'drop-shadow(0 12px 20px rgba(77, 124, 15, 0.20))',
    accentHex: '#4D7C0F',
    surfaceHex: '#EFF7D3',
    urlSlug: 'cozu.store/capcut',
    shortLabel: 'CapCut Pro',
    chips: ['Bebas Watermark', 'Fitur AI Pro', 'Full Garansi']
  },
  bstation: {
    pastelSurface: 'bg-[#F3E5F5]/75 border-[#DFC0E3]',
    pastelOrb: 'bg-[#F3E5F5] text-[#7C3AED]',
    badgeClass: 'bg-[#F3E5F5] text-[#5B21B6] border-[#DFC0E3]',
    heroGradient: 'from-[#F3E5F5] via-[#F8EFFA] to-[#FDF8FE]',
    orbShadow: 'drop-shadow(0 12px 20px rgba(124, 58, 237, 0.22))',
    accentHex: '#7C3AED',
    surfaceHex: '#F3E5F5',
    urlSlug: 'cozu.store/bstation',
    shortLabel: 'Bstation VIP',
    chips: ['Bebas Iklan', 'Full HD 1080p', 'Full Garansi']
  }
};

const DEFAULT_THEME = {
  pastelSurface: 'bg-brand-50/75 border-brand-200',
  pastelOrb: 'bg-brand-50 text-brand-700',
  badgeClass: 'bg-brand-50 text-brand-700 border-brand-200',
  heroGradient: 'from-brand-50 via-white to-stone-50',
  orbShadow: 'drop-shadow(0 12px 20px rgba(13, 148, 136, 0.2))',
  accentHex: '#0D9488',
  surfaceHex: '#F0FDFA',
  urlSlug: 'cozu.store',
  shortLabel: 'Akun Premium',
  chips: ['Full Garansi', 'Proses Kilat', 'QRIS Ready']
};

export function getAppTheme(appId) {
  return APP_THEMES[appId] || DEFAULT_THEME;
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
      const theme = getAppTheme(app.id);
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
                class="h-full rounded-[20px] p-5 flex flex-col justify-between border transition-[box-shadow,border-color] duration-200 ${theme.pastelSurface} ${
                  isBest ? 'ring-2 ring-brand-600/90 shadow-md' : 'hover:shadow-sm'
                }"
              >
                <div class="flex flex-col flex-grow">
                  <div class="flex items-center justify-between gap-2 mb-3.5">
                    <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/95 border border-stone-900/15 text-stone-900 text-xs font-semibold shadow-2xs shrink-0 whitespace-nowrap">
                      ${escapeHtml(durMeta.label)}
                    </span>
                    ${
                      isBest
                        ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-stone-950 border border-[#E05D44]/40 text-xs font-bold shadow-2xs shrink-0 whitespace-nowrap">
                             <span class="w-2 h-2 rounded-full bg-[#E05D44]" aria-hidden="true"></span>
                             Paling Laris
                           </span>`
                        : ''
                    }
                  </div>

                  <h4 class="font-display text-lg font-bold text-stone-950 leading-snug">
                    ${escapeHtml(plan.name)}
                  </h4>

                  <div
                    class="mt-2.5 pb-3.5 border-b border-stone-900/10 flex items-baseline gap-1"
                    aria-label="Harga: ${escapeHtml(durationData.price)} per ${escapeHtml(durMeta.unit)}"
                  >
                    <span class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
                      ${escapeHtml(durationData.price)}
                    </span>
                    <span class="text-xs sm:text-sm text-stone-700 font-semibold">
                      /${escapeHtml(durMeta.unit)}
                    </span>
                  </div>

                  ${
                    durationData.description
                      ? `<p class="mt-3 text-sm text-stone-800 leading-relaxed min-h-[64px]">${escapeHtml(durationData.description)}</p>`
                      : ''
                  }

                  <ul class="mt-4 mb-6 space-y-2 rounded-2xl bg-white/75 border border-white/85 p-3.5 flex-1">
                    ${(durationData.features || [])
                      .map(
                        (feat) => `
                          <li class="flex items-start gap-2 text-xs sm:text-sm text-stone-800">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-brand-700 shrink-0 mt-0.5" aria-hidden="true"></i>
                            <span class="leading-snug">${escapeHtml(feat)}</span>
                          </li>
                        `
                      )
                      .join('')}
                  </ul>
                </div>

                <div class="flex items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    data-catalog-action="buy"
                    data-motion-press
                    data-app-id="${escapeHtml(app.id)}"
                    data-plan-name="${escapeHtml(plan.name)}"
                    data-price="${escapeHtml(durationData.price)}"
                    data-duration-key="${escapeHtml(durationKey)}"
                    data-duration-label="${escapeHtml(durMeta.label)}"
                    class="flex-1 h-11 px-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  >
                    <span>Beli Langsung</span>
                    <i data-lucide="arrow-right" class="w-4 h-4" aria-hidden="true"></i>
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
                    title="+ Keranjang"
                    class="w-11 h-11 rounded-full bg-white hover:bg-brand-50 text-brand-700 border border-stone-200/90 hover:border-brand-300 shadow-xs transition-colors flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  >
                    <i data-lucide="plus" class="w-5 h-5" aria-hidden="true"></i>
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
          class="bg-white rounded-[22px] border border-stone-200/80 shadow-soft-card p-5 sm:p-7 scroll-mt-28 transition-shadow"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
            <div class="flex items-start sm:items-center gap-4">
              <div
                class="w-13 h-13 rounded-2xl ${theme.pastelOrb} ring-1 ring-white flex items-center justify-center shrink-0"
                style="filter: ${theme.orbShadow}"
                aria-hidden="true"
              >
                <i data-lucide="${escapeHtml(app.icon || 'layers')}" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-stone-950">
                    ${escapeHtml(app.name)}
                  </h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold ${theme.badgeClass}">
                    ${escapeHtml(categoryLabels[app.category] || app.category)}
                  </span>
                </div>
                ${
                  app.tagline
                    ? `<p class="text-sm text-stone-700 mt-0.5">${escapeHtml(app.tagline)}</p>`
                    : ''
                }
              </div>
            </div>

            <div class="flex items-center gap-2 self-start sm:self-center">
              <span class="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-medium">
                ${totalVariants} Pilihan Paket
              </span>
              <span class="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/70 text-xs font-bold">
                Mulai ${escapeHtml(formatRupiah(startPrice))}
              </span>
            </div>
          </div>

          <div class="grid ${gridColsClass} gap-4 sm:gap-5 mt-6">
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
