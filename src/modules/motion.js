import {
  animate,
  inView,
  scroll,
  stagger,
  hover,
  press,
  prefersReducedMotion,
  initPrefersReducedMotion
} from 'motion';
import {
  getAppTheme,
  getStartingPrice,
  formatRupiah,
  parsePrice,
  escapeHtml,
  durationLabels
} from './products.js';

export const motionTokens = {
  duration: { instant: 0.08, fast: 0.18, normal: 0.35, slow: 0.6, carousel: 0.5, crawl: 0.9 },
  easing: {
    smooth: [0.22, 1, 0.36, 1],
    sharp: [0.4, 0, 0.2, 1]
  },
  distance: { xs: 4, sm: 8, md: 16, lg: 24 },
  scale: { press: 0.97, pop: 1.02 }
};

export const springs = {
  snappy: { type: 'spring', stiffness: 300, damping: 28 },
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  release: { type: 'spring', stiffness: 200, damping: 20 }
};

const CAROUSEL_INTERVAL_MS = 3000;
const CAROUSEL_DURATION_S = 0.5;

const UNIT_SHORT = {
  daily: 'hari',
  weekly: 'minggu',
  monthly: 'bulan'
};

const CATEGORY_LABELS = {
  streaming: 'Streaming Video',
  design: 'Desain & Editing',
  music: 'Musik & Audio',
  productivity: 'AI & Produktivitas'
};

const TREND_LABELS = ['#1 Paling Laris', '#2 Paling Dicari', '#3 Trending', '#4 Pilihan Baru'];

const clamp01 = (value) => Math.max(0, Math.min(1, value));

export function shouldAnimate() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  if (prefersReducedMotion.current === null) {
    initPrefersReducedMotion();
  }
  if (prefersReducedMotion.current === true) return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  if (
    typeof navigator !== 'undefined' &&
    navigator.hardwareConcurrency > 0 &&
    navigator.hardwareConcurrency <= 2
  ) {
    return false;
  }
  return true;
}

/* 1. Top scroll progress bar — scaleX only */
export function initScrollProgressBar() {
  const bar = document.getElementById('top-scroll-progress');
  if (!bar) return;
  if (!shouldAnimate()) {
    bar.style.transform = 'scaleX(0)';
    return;
  }

  const updateFromScroll = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const ratio = clamp01(window.scrollY / max);
    bar.style.transform = `scaleX(${ratio})`;
  };

  let tracked = false;
  try {
    scroll(
      (progress) => {
        if (typeof progress === 'number' && !Number.isNaN(progress)) {
          bar.style.transform = `scaleX(${clamp01(progress)})`;
        }
      },
      { trackContentSize: true }
    );
    tracked = true;
  } catch {
    tracked = false;
  }

  if (!tracked) {
    window.addEventListener('scroll', updateFromScroll, { passive: true });
  }
  updateFromScroll();
}

/* 2. Featured plan + starting offer helpers */
function getFeaturedPlanData(app) {
  const plan = app.plans?.find((p) => p.bestSeller) || app.plans?.[0];
  const entries = Object.entries(plan?.durations || {});
  const [durationKey, durationData] =
    entries.find(([k]) => k === 'monthly') || entries[0] || ['monthly', { price: 'Rp 0' }];
  const durMeta = durationLabels[durationKey] || { label: durationKey, unit: durationKey };
  return {
    planName: plan?.name || app.name,
    bestSeller: Boolean(plan?.bestSeller),
    durationKey,
    durationLabel: durMeta.label,
    unitShort: UNIT_SHORT[durationKey] || durMeta.unit,
    price: durationData?.price || formatRupiah(getStartingPrice(app))
  };
}

function getStartingOffer(app) {
  let best = null;
  (app.plans || []).forEach((plan) => {
    Object.entries(plan.durations || {}).forEach(([key, data]) => {
      const price = parsePrice(data?.price);
      if (price > 0 && (!best || price < best.price)) {
        best = { key, price, rawPrice: data.price };
      }
    });
  });
  if (!best) {
    return { key: 'monthly', price: formatRupiah(getStartingPrice(app)), unitShort: 'bulan' };
  }
  return {
    key: best.key,
    price: formatRupiah(best.price),
    unitShort: UNIT_SHORT[best.key] || 'bulan'
  };
}

function getDurationBadges(app) {
  const seen = new Set();
  const badges = [];
  (app.plans || []).forEach((plan) => {
    Object.entries(plan.durations || {}).forEach(([key, data]) => {
      if (seen.has(key) || !data?.price) return;
      seen.add(key);
      const meta = durationLabels[key] || { label: key, unit: key };
      badges.push({ key, label: meta.label, price: data.price });
    });
  });
  return badges.slice(0, 3);
}

function buildHeroSlide(app, index) {
  const meta = getAppTheme(app.id);
  const featured = getFeaturedPlanData(app);
  const start = getStartingOffer(app);
  const badges = getDurationBadges(app);
  const trend = TREND_LABELS[index % TREND_LABELS.length];
  const category = CATEGORY_LABELS[app.category] || 'Akun Premium';
  const eyebrow = `${category} · ${meta.chips?.[0] || 'Full Garansi'}`;
  const titleTag = 'h2';

  const badgeHtml = badges
    .map(
      (badge) => `
        <span class="inline-flex items-center gap-1.5 rounded-full bg-badge px-2.5 py-1 text-[11px] font-medium text-badge-text">
          <span class="font-semibold text-ink">${escapeHtml(badge.label)}</span>
          ${escapeHtml(badge.price)}
        </span>`
    )
    .join('');

  return `
    <article
      class="hero-slide"
      data-hero-slide="${index}"
      aria-roledescription="slide"
      aria-label="${index + 1} dari 4: ${escapeHtml(app.name)}"
      aria-hidden="true"
    >
      <div class="hero-art absolute inset-y-0 right-0 w-full sm:w-[72%] lg:w-[60%]" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_68%_38%,rgba(0,168,225,0.22),transparent_58%),linear-gradient(150deg,#141824_0%,#0F171E_55%,#05070A_100%)]"></div>
        <div class="absolute inset-0 grid place-items-center">
          <i data-lucide="${escapeHtml(app.icon || 'layers')}" class="h-[13rem] w-[13rem] text-accent/25 sm:h-[18rem] sm:w-[18rem]"></i>
        </div>
        <div class="absolute inset-x-0 bottom-24 hidden justify-end px-10 lg:flex">
          <span class="text-[clamp(3rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.04em] text-white/5">
            ${escapeHtml(app.name)}
          </span>
        </div>
      </div>

      <div class="relative z-10 mx-auto flex h-full max-w-[1280px] items-center px-4 pb-28 pt-20 sm:px-6 lg:px-10">
        <div class="w-full max-w-[34rem] lg:w-[42%]">
          <p class="inline-flex items-center gap-2 rounded-full bg-accent-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
            <span class="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true"></span>
            ${escapeHtml(trend)}
          </p>

          <p class="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-ink-tertiary">
            ${escapeHtml(eyebrow)}
          </p>

          <${titleTag} class="mt-2 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink">
            ${escapeHtml(app.name)}
          </${titleTag}>

          <p class="mt-3 max-w-md text-sm leading-relaxed text-ink-secondary sm:text-base">
            ${escapeHtml(app.tagline || 'Akun premium bergaransi, proses 5–15 menit.')}
          </p>

          <p class="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span class="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-ink-tertiary">Mulai</span>
            <span class="text-2xl font-bold tracking-tight text-ink">${escapeHtml(start.price)}</span>
            <span class="text-xs font-medium text-ink-secondary">/${escapeHtml(start.unitShort)}</span>
          </p>

          <div class="mt-4 flex flex-wrap items-center gap-1.5">
            ${badgeHtml}
            <span class="inline-flex items-center gap-1.5 rounded-full bg-badge px-2.5 py-1 text-[11px] font-medium text-badge-text">
              <i data-lucide="shield-check" class="h-3 w-3 text-accent" aria-hidden="true"></i>
              Garansi penuh
            </span>
          </div>

          <div class="mt-7 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              data-catalog-action="buy"
              data-motion-press
              data-app-id="${escapeHtml(app.id)}"
              data-plan-name="${escapeHtml(featured.planName)}"
              data-price="${escapeHtml(featured.price)}"
              data-duration-key="${escapeHtml(featured.durationKey)}"
              data-duration-label="${escapeHtml(featured.durationLabel)}"
              class="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-canvas transition-colors hover:bg-ink-secondary focus-visible:outline-none"
            >
              <i data-lucide="play" class="h-4 w-4 fill-current" aria-hidden="true"></i>
              <span>Beli</span>
            </button>
            <button
              type="button"
              data-catalog-action="add"
              data-motion-press
              data-app-id="${escapeHtml(app.id)}"
              data-plan-name="${escapeHtml(featured.planName)}"
              data-price="${escapeHtml(featured.price)}"
              data-duration-key="${escapeHtml(featured.durationKey)}"
              data-duration-label="${escapeHtml(featured.durationLabel)}"
              aria-label="Tambah ${escapeHtml(app.name)} ${escapeHtml(featured.planName)} ke keranjang"
              title="Tambah ke keranjang"
              class="grid h-12 w-12 place-items-center rounded-full bg-action text-ink transition-colors hover:bg-action-active"
            >
              <i data-lucide="plus" class="h-5 w-5" aria-hidden="true"></i>
            </button>
            <a
              href="#layanan"
              class="inline-flex h-12 items-center rounded-full px-4 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
            >
              Lihat semua paket
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

/* 3. Hero carousel — 3s seamless crossfade + slide, pause on hover/focus */
export function initHeroCarousel(products, { onAddToCart, onDirectBuy } = {}) {
  const root = document.getElementById('home');
  const track = document.getElementById('hero-carousel-slides');
  const dotsRoot = document.getElementById('hero-dots');
  const apps = Array.isArray(products) ? products.slice(0, 4) : [];
  if (!root || !track || !dotsRoot || apps.length === 0) return;

  track.innerHTML = apps.map((app, index) => buildHeroSlide(app, index)).join('');

  dotsRoot.innerHTML = apps
    .map(
      (app, index) => `
        <button
          type="button"
          class="hero-dot"
          data-hero-dot="${index}"
          aria-label="Slide ${index + 1}: ${escapeHtml(app.name)}"
          aria-current="${index === 0 ? 'true' : 'false'}"
        >
          <span class="hero-dot-track">
            <span class="hero-dot-fill"></span>
          </span>
        </button>`
    )
    .join('');

  const slides = Array.from(track.querySelectorAll('[data-hero-slide]'));
  const dotBtns = Array.from(dotsRoot.querySelectorAll('[data-hero-dot]'));
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');

  const reduceMotion = !shouldAnimate();
  let index = 0;
  let paused = false;
  let timer = null;
  let progressAnim = null;
  let rafId = 0;

  const setSlideState = (activeIndex) => {
    slides.forEach((slide, i) => {
      const isActive = i === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.style.pointerEvents = isActive ? 'auto' : 'none';
    });
    dotBtns.forEach((btn, i) => {
      btn.setAttribute('aria-current', i === activeIndex ? 'true' : 'false');
      const fill = btn.querySelector('.hero-dot-fill');
      if (!fill) return;
      if (i < activeIndex) fill.style.transform = 'scaleX(1)';
      else if (i > activeIndex) fill.style.transform = 'scaleX(0)';
    });
  };

  const stopProgress = () => {
    if (progressAnim?.stop) {
      progressAnim.stop();
      progressAnim = null;
    }
  };

  const startProgress = () => {
    stopProgress();
    const fill = dotBtns[index]?.querySelector('.hero-dot-fill');
    if (!fill) return;
    if (reduceMotion) {
      fill.style.transform = 'scaleX(1)';
      return;
    }
    fill.style.transform = 'scaleX(0)';
    progressAnim = animate(
      fill,
      { scaleX: [0, 1] },
      { duration: CAROUSEL_INTERVAL_MS / 1000, ease: 'linear' }
    );
  };

  const stopTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    stopProgress();
  };

  const schedule = () => {
    stopTimer();
    if (paused || document.hidden) return;
    startProgress();
    timer = window.setTimeout(() => {
      show(index + 1, 1, true);
      schedule();
    }, CAROUSEL_INTERVAL_MS);
  };

  const show = (nextIndex, direction = 1, doAnimate = true) => {
    const previous = index;
    index = ((nextIndex % slides.length) + slides.length) % slides.length;
    if (index === previous) return;

    const incoming = slides[index];
    const outgoing = slides[previous];

    slides.forEach((slide, i) => {
      slide.style.zIndex = i === index ? '2' : i === previous ? '3' : '1';
    });
    setSlideState(index);

    if (!doAnimate || reduceMotion) {
      animate(incoming, { opacity: 1 }, { duration: 0.15, ease: 'linear' });
      animate(outgoing, { opacity: 0 }, { duration: 0.15, ease: 'linear' });
    } else {
      animate(
        outgoing,
        { opacity: [1, 0], x: [0, -direction * 48] },
        { duration: CAROUSEL_DURATION_S, ease: motionTokens.easing.smooth }
      );
      animate(
        incoming,
        { opacity: [0, 1], x: [direction * 48, 0] },
        { duration: CAROUSEL_DURATION_S, ease: motionTokens.easing.smooth }
      );
    }

    startProgress();
  };

  const goTo = (nextIndex, direction) => {
    show(nextIndex, direction, true);
    if (!paused) schedule();
  };

  prevBtn?.addEventListener('click', () => goTo(index - 1, -1));
  nextBtn?.addEventListener('click', () => goTo(index + 1, 1));

  dotBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = Number(btn.getAttribute('data-hero-dot'));
      if (Number.isNaN(target)) return;
      const direction = target >= index ? 1 : -1;
      goTo(target, direction);
    });
  });

  track.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('[data-catalog-action]');
    if (!actionBtn) return;
    const payload = {
      appId: actionBtn.getAttribute('data-app-id'),
      planName: actionBtn.getAttribute('data-plan-name'),
      price: actionBtn.getAttribute('data-price'),
      durationKey: actionBtn.getAttribute('data-duration-key'),
      durationLabel: actionBtn.getAttribute('data-duration-label')
    };
    if (actionBtn.getAttribute('data-catalog-action') === 'add') onAddToCart?.(payload);
    else onDirectBuy?.(payload);
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1, -1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1, 1);
    }
  });

  root.addEventListener('mouseenter', () => {
    paused = true;
    stopTimer();
  });
  root.addEventListener('mouseleave', () => {
    paused = false;
    schedule();
  });
  root.addEventListener('focusin', () => {
    paused = true;
    stopTimer();
  });
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget)) {
      paused = false;
      schedule();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTimer();
    else if (!paused) schedule();
  });

  /* Key-art parallax — translateY only, small and clamped */
  if (!reduceMotion) {
    const artEls = slides.map((slide) => slide.querySelector('.hero-art'));
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (window.scrollY > root.offsetHeight + 80) return;
        const y = Math.min(window.scrollY * 0.08, 72);
        artEls[index]?.style.setProperty('transform', `translate3d(0, ${y}px, 0) scale(1.04)`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Initial paint: first slide visible, all others hidden without animation.
  slides.forEach((slide, i) => {
    slide.style.opacity = i === 0 ? '1' : '0';
    slide.style.transform = 'translate3d(0, 0, 0)';
    slide.style.zIndex = i === 0 ? '2' : '1';
  });
  setSlideState(0);
  document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root } }));
  schedule();
}

/* 4. Scroll reveals — fade-up once, plus rAF sweep for stranded elements */
export function initScrollReveals() {
  const animateEnabled = shouldAnimate();
  const singleEls = Array.from(document.querySelectorAll('[data-reveal]'));
  const groups = Array.from(document.querySelectorAll('[data-reveal-group]'));

  if (!animateEnabled) {
    singleEls.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    groups.forEach((group) => {
      group.querySelectorAll('[data-reveal-item]').forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
    });
    return;
  }

  const revealSingle = (el, immediate = false) => {
    if (!el || el.dataset.revealed === 'true') return;
    el.dataset.revealed = 'true';
    if (immediate) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }
    animate(
      el,
      { opacity: [0, 1], y: [16, 0] },
      { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }
    );
  };

  const revealGroup = (group, items, immediate = false) => {
    if (!group || group.dataset.revealed === 'true') return;
    group.dataset.revealed = 'true';
    if (immediate) {
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      return;
    }
    animate(
      items,
      { opacity: [0, 1], y: [16, 0] },
      {
        delay: stagger(0.06),
        duration: motionTokens.duration.normal,
        ease: motionTokens.easing.smooth
      }
    );
  };

  const groupItemsMap = new Map();

  singleEls.forEach((el) => {
    if (el.dataset.revealed === 'true') return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.96) {
      el.dataset.revealed = 'true';
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';

    inView(el, () => revealSingle(el), { amount: 'some' });
  });

  groups.forEach((group) => {
    if (group.dataset.revealed === 'true') return;
    const items = Array.from(group.querySelectorAll('[data-reveal-item]'));
    if (!items.length) return;
    groupItemsMap.set(group, items);

    const rect = group.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.96) {
      group.dataset.revealed = 'true';
      return;
    }

    items.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(16px)';
    });

    inView(group, () => revealGroup(group, items), { amount: 'some' });
  });

  // Fallback sweep so fast jumps / hash navigation never leave elements above fold stuck invisible
  let sweepScheduled = false;
  const sweepVisibleOrPassed = () => {
    sweepScheduled = false;
    const threshold = window.innerHeight * 0.98;
    singleEls.forEach((el) => {
      if (el.dataset.revealed === 'true') return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= threshold) {
        revealSingle(el, rect.bottom < 0);
      }
    });
    groups.forEach((group) => {
      if (group.dataset.revealed === 'true') return;
      const items = groupItemsMap.get(group) || [];
      const rect = group.getBoundingClientRect();
      if (rect.top <= threshold) {
        revealGroup(group, items, rect.bottom < 0);
      }
    });
  };

  const scheduleSweep = () => {
    if (sweepScheduled) return;
    sweepScheduled = true;
    requestAnimationFrame(sweepVisibleOrPassed);
  };

  window.addEventListener('scroll', scheduleSweep, { passive: true });
  window.addEventListener('hashchange', () => setTimeout(scheduleSweep, 60));

  document.addEventListener('cozu:catalog-rendered', (e) => {
    if (!shouldAnimate()) return;
    const root = e.detail?.root;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll('[data-catalog-card]'));
    if (!cards.length) return;
    animate(
      cards,
      { opacity: [0.85, 1], y: [8, 0] },
      {
        delay: stagger(0.04, { startDelay: 0 }),
        duration: motionTokens.duration.fast,
        ease: motionTokens.easing.smooth
      }
    );
  });
}

/* 5. Scroll-path spine for "3 Langkah" — stroke-dashoffset follows scroll */
export function initStepsSpine() {
  const section = document.getElementById('cara-pesan');
  const list = document.getElementById('steps-list');
  const path = document.getElementById('steps-spine-path');
  if (!section || !path) return;

  const target = list || section;
  const dashLength = typeof path.getTotalLength === 'function' ? path.getTotalLength() || 100 : 100;

  const setProgress = (progress) => {
    path.style.strokeDasharray = String(dashLength);
    path.style.strokeDashoffset = String(dashLength * (1 - clamp01(progress)));
  };

  if (!shouldAnimate()) {
    setProgress(1);
    return;
  }

  setProgress(0);

  // 0 when the step list enters the lower third of the viewport,
  // 1 when its last step reaches that same anchor.
  const measure = () => {
    const rect = target.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const anchor = viewport * 0.58;
    const travel = Math.max(1, rect.height);
    setProgress((anchor - rect.top) / travel);
  };

  let frame = 0;
  const scheduleMeasure = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      measure();
    });
  };

  try {
    scroll(() => scheduleMeasure(), { trackContentSize: true });
  } catch {
    /* rAF + scroll listener below still drives the spine */
  }

  window.addEventListener('scroll', scheduleMeasure, { passive: true });
  window.addEventListener('resize', scheduleMeasure, { passive: true });
  scheduleMeasure();
}

/* 6. Count-up stats — once per element, on first view */
export function initCounters() {
  const els = Array.from(document.querySelectorAll('[data-counter]'));
  if (!els.length) return;

  const render = (el, value) => {
    el.textContent = String(Math.round(value));
  };

  const run = (el) => {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';
    const to = Number(el.dataset.counterTo || 0);
    const duration = Number(el.dataset.counterDuration || 1100);

    if (!shouldAnimate() || to <= 0) {
      render(el, to);
      return;
    }

    const started = performance.now();
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - started) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      render(el, to * eased);
      if (t < 1) requestAnimationFrame(tick);
      else render(el, to);
    };
    requestAnimationFrame(tick);
  };

  els.forEach((el) => {
    // Static markup keeps the final numbers, so the page is honest without JS.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      requestAnimationFrame(() => run(el));
    } else {
      inView(el, () => run(el), { amount: 'some' });
    }
  });
}

/* 7. Micro interactions */
function bindGestureSet(cleanups, selector, binder) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  cleanups.push(binder(els));
}

export function initMicroInteractions() {
  if (typeof window === 'undefined') return;
  const animateEnabled = shouldAnimate();
  window.__cozuMotionActive = animateEnabled;

  let dynamicCleanups = [];
  const staticCleanups = [];

  const bindDynamic = () => {
    dynamicCleanups.forEach((stop) => stop?.());
    dynamicCleanups = [];
    if (!shouldAnimate()) return;

    bindGestureSet(dynamicCleanups, '[data-motion-press], .category-pill', (els) =>
      press(els, (el) => {
        animate(el, { scale: motionTokens.scale.press }, { duration: motionTokens.duration.instant });
        return () => {
          animate(el, { scale: 1 }, { ...springs.release });
        };
      })
    );

    bindGestureSet(dynamicCleanups, '[data-motion-hover]', (els) =>
      hover(els, (el) => {
        animate(el, { y: -2 }, { ...springs.snappy });
        return () => {
          animate(el, { y: 0 }, { ...springs.release });
        };
      })
    );
  };

  bindDynamic();
  document.addEventListener('cozu:catalog-rendered', bindDynamic);

  document.addEventListener('cozu:cart-pop', () => {
    if (!shouldAnimate()) return;
    ['cart-count-badge', 'header-cart-badge', 'mobile-cart-badge'].forEach((id) => {
      const badge = document.getElementById(id);
      if (badge && !badge.classList.contains('hidden')) {
        animate(badge, { scale: [1, 1.2, 1] }, { ...springs.release });
      }
    });
  });

  document.addEventListener('cozu:faq-toggle', (e) => {
    if (!shouldAnimate()) return;
    const { panel, expanded } = e.detail || {};
    if (panel && expanded) {
      animate(
        panel,
        { opacity: [0, 1], y: [-6, 0] },
        { duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }
      );
    }
  });

  return () => {
    dynamicCleanups.forEach((stop) => stop?.());
    staticCleanups.forEach((stop) => stop?.());
  };
}

export function initMotionSystem(products, { onAddToCart, onDirectBuy } = {}) {
  initScrollProgressBar();
  initHeroCarousel(products, { onAddToCart, onDirectBuy });
  initScrollReveals();
  initStepsSpine();
  initCounters();
  initMicroInteractions();

  // Dynamic copyright year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
