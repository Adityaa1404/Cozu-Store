export const durationLabels = {
  daily: { label: 'Harian', unit: 'hari' },
  weekly: { label: 'Mingguan', unit: 'minggu' },
  monthly: { label: 'Bulanan', unit: 'bulan' }
};

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

function getStartingPrice(app) {
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
              <div class="rounded-xl p-5 flex flex-col justify-between transition-all duration-200 ${
                isBest
                  ? 'bg-brand-50/50 ring-2 ring-brand-600'
                  : 'bg-stone-50/70 border border-stone-200 hover:border-brand-300'
              }">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="inline-flex items-center px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-medium">
                      ${escapeHtml(durMeta.label)}
                    </span>
                    ${
                      isBest
                        ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold">
                             <i data-lucide="flame" class="w-3.5 h-3.5" aria-hidden="true"></i>
                             Paling Laris
                           </span>`
                        : ''
                    }
                  </div>

                  <h4 class="font-display text-lg font-semibold text-stone-900 leading-snug">
                    ${escapeHtml(plan.name)}
                  </h4>

                  <div
                    class="mt-3 pb-3.5 border-b border-stone-200/80 flex items-baseline gap-1"
                    aria-label="Harga: ${escapeHtml(durationData.price)} per ${escapeHtml(durMeta.unit)}"
                  >
                    <span class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
                      ${escapeHtml(durationData.price)}
                    </span>
                    <span class="text-xs sm:text-sm text-stone-500 font-medium">
                      /${escapeHtml(durMeta.unit)}
                    </span>
                  </div>

                  ${
                    durationData.description
                      ? `<p class="mt-3 text-sm text-stone-600 leading-relaxed min-h-[42px]">${escapeHtml(durationData.description)}</p>`
                      : ''
                  }

                  <ul class="mt-4 mb-6 space-y-2.5">
                    ${(durationData.features || [])
                      .map(
                        (feat) => `
                          <li class="flex items-start gap-2 text-sm text-stone-700">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-brand-700 shrink-0 mt-0.5" aria-hidden="true"></i>
                            <span class="leading-snug">${escapeHtml(feat)}</span>
                          </li>
                        `
                      )
                      .join('')}
                  </ul>
                </div>

                <div class="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    data-catalog-action="direct-buy"
                    data-app-id="${escapeHtml(app.id)}"
                    data-plan-name="${escapeHtml(plan.name)}"
                    data-price="${escapeHtml(durationData.price)}"
                    data-duration-key="${escapeHtml(durationKey)}"
                    data-duration-label="${escapeHtml(durMeta.label)}"
                    class="w-full h-11 px-4 rounded-lg bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-medium text-sm transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  >
                    <span>Pesan Sekarang</span>
                    <i data-lucide="arrow-right" class="w-4 h-4" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    data-catalog-action="add-to-cart"
                    data-app-id="${escapeHtml(app.id)}"
                    data-plan-name="${escapeHtml(plan.name)}"
                    data-price="${escapeHtml(durationData.price)}"
                    data-duration-key="${escapeHtml(durationKey)}"
                    data-duration-label="${escapeHtml(durMeta.label)}"
                    class="w-full h-11 px-4 rounded-lg bg-white hover:bg-brand-50 text-brand-700 border border-brand-200 hover:border-brand-300 active:scale-[0.98] font-medium text-sm transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  >
                    <i data-lucide="shopping-cart" class="w-4 h-4" aria-hidden="true"></i>
                    <span>+ Keranjang</span>
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
          class="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 scroll-mt-24 transition-shadow"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
            <div class="flex items-start sm:items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0" aria-hidden="true">
                <i data-lucide="${escapeHtml(app.icon || 'layers')}" class="w-6 h-6"></i>
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="font-display text-xl sm:text-2xl font-bold text-stone-900">
                    ${escapeHtml(app.name)}
                  </h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-medium">
                    ${escapeHtml(categoryLabels[app.category] || app.category)}
                  </span>
                </div>
                ${
                  app.tagline
                    ? `<p class="text-sm text-stone-500 mt-0.5">${escapeHtml(app.tagline)}</p>`
                    : ''
                }
              </div>
            </div>

            <div class="flex items-center gap-2 self-start sm:self-center">
              <span class="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-medium">
                ${totalVariants} Pilihan Paket
              </span>
              <span class="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
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
      if (action === 'add-to-cart') {
        onAddToCart?.(payload);
      } else if (action === 'direct-buy') {
        onDirectBuy?.(payload);
      }
    });
    container.dataset.delegated = 'true';
  }

  document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: container } }));
}

export function highlightAppSection(appId) {
  const el = document.getElementById(`app-${appId}`);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.classList.remove('target-highlight');
  void el.offsetWidth;
  el.classList.add('target-highlight');
}
