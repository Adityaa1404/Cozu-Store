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
import { getAppTheme, getStartingPrice, formatRupiah, escapeHtml, durationLabels } from './products.js';

export const motionTokens = {
  duration: { instant: 0.08, fast: 0.18, normal: 0.35, slow: 0.6, crawl: 0.9 },
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

/* 2a. Hero headline mask reveal — line by line, opacity + transform only */
export function initHeroMaskReveal() {
  const lines = Array.from(document.querySelectorAll('.hero-line-inner'));
  if (!lines.length) return;

  if (!shouldAnimate()) {
    lines.forEach((line) => {
      line.style.opacity = '1';
      line.style.transform = 'none';
    });
    return;
  }

  document.documentElement.classList.add('js-motion');

  animate(
    lines,
    { opacity: [0, 1], y: ['110%', '0%'] },
    {
      delay: stagger(0.09),
      duration: 0.7,
      ease: motionTokens.easing.smooth
    }
  );

  // Safety net: never leave the headline stranded invisible.
  window.setTimeout(() => {
    lines.forEach((line) => {
      if (line.style.opacity === '0' || getComputedStyle(line).opacity === '0') {
        line.style.opacity = '1';
        line.style.transform = 'none';
      }
    });
  }, 2200);
}

/* 2b. Hero supporting content entrance */
export function initHeroEntrance() {
  const targets = Array.from(document.querySelectorAll('[data-hero-stagger]'));
  if (!targets.length) return;

  if (!shouldAnimate()) {
    targets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  animate(
    targets,
    { opacity: [0, 1], y: [16, 0] },
    {
      delay: stagger(0.06, { startDelay: 0.12 }),
      duration: motionTokens.duration.slow,
      ease: motionTokens.easing.smooth
    }
  );
}

const UNIT_SHORT = {
  daily: 'hr',
  weekly: 'mgg',
  monthly: 'bln'
};

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

export function initHeroShowcaseDeck(products, { onAddToCart } = {}) {
  const wrapper = document.getElementById('hero-deck-wrapper');
  const apps = Array.isArray(products) ? products.slice(0, 4) : [];
  if (!wrapper || apps.length === 0) return;

  const centerCard = document.getElementById('hero-deck-center');
  const cliWidget = document.getElementById('hero-cli-widget');

  const urlEl = document.getElementById('hero-deck-url');
  const counterEl = document.getElementById('hero-deck-counter');
  const statusCounterEl = document.getElementById('hero-status-counter');
  const orbEl = document.getElementById('hero-deck-orb');
  const titleEl = document.getElementById('hero-deck-title');
  const taglineEl = document.getElementById('hero-deck-tagline');
  const priceEl = document.getElementById('hero-deck-price');
  const badgeTextEl = document.getElementById('hero-deck-badge-text');
  const chipsEl = document.getElementById('hero-deck-chips');
  const jumpBtn = document.getElementById('hero-deck-jump');
  const addBtn = document.getElementById('hero-deck-add');

  const cliCmdEl = document.getElementById('hero-cli-cmd');
  const prevBtn = document.getElementById('hero-deck-prev');
  const nextBtn = document.getElementById('hero-deck-next');
  const segmentBtns = Array.from(wrapper.querySelectorAll('[data-deck-index]'));

  const AUTO_MS = 4500;
  let activeIndex = 0;
  let autoTimer = null;
  let isPaused = false;
  let activeSegmentAnim = null;

  const stopAutoRotate = () => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
    if (activeSegmentAnim?.stop) {
      activeSegmentAnim.stop();
      activeSegmentAnim = null;
    }
  };

  const renderSegments = (index, animateFill) => {
    if (activeSegmentAnim?.stop) {
      activeSegmentAnim.stop();
      activeSegmentAnim = null;
    }
    segmentBtns.forEach((btn, i) => {
      btn.setAttribute('aria-current', i === index ? 'true' : 'false');
      const fill = btn.querySelector('.deck-segment-fill');
      if (!fill) return;
      if (i < index) {
        fill.style.transform = 'scaleX(1)';
      } else if (i > index) {
        fill.style.transform = 'scaleX(0)';
      } else if (animateFill && shouldAnimate() && !isPaused) {
        activeSegmentAnim = animate(fill, { scaleX: [0, 1] }, { duration: AUTO_MS / 1000, ease: 'linear' });
      } else {
        fill.style.transform = 'scaleX(1)';
      }
    });
  };

  const renderSlide = (nextIndex, animateTransition = true, animateProgress = true) => {
    activeIndex = ((nextIndex % apps.length) + apps.length) % apps.length;
    const app = apps[activeIndex];
    const meta = getAppTheme(app.id);
    const featured = getFeaturedPlanData(app);
    const startPrice = formatRupiah(getStartingPrice(app));

    const counterNum = `${String(activeIndex + 1).padStart(2, '0')} / ${String(apps.length).padStart(2, '0')}`;
    if (urlEl) urlEl.textContent = meta.urlSlug;
    if (counterEl) counterEl.textContent = counterNum;
    if (statusCounterEl) statusCounterEl.textContent = `${counterNum} APLIKASI`;

    if (orbEl) {
      orbEl.innerHTML = `<i data-lucide="${escapeHtml(app.icon || 'layers')}" class="h-8 w-8"></i>`;
    }

    if (titleEl) titleEl.textContent = app.name;
    if (taglineEl) taglineEl.textContent = app.tagline || '';
    if (priceEl) priceEl.textContent = `MULAI ${startPrice.toUpperCase()}`;
    if (badgeTextEl) badgeTextEl.textContent = featured.bestSeller ? 'Paling laris' : 'Garansi penuh';

    if (chipsEl) {
      chipsEl.innerHTML = (meta.chips || [])
        .map(
          (chip) =>
            `<span class="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-ink-secondary">${escapeHtml(chip)}</span>`
        )
        .join('');
    }

    if (jumpBtn) {
      jumpBtn.setAttribute('href', `#${app.id}`);
      jumpBtn.setAttribute('data-jump-app', app.id);
    }

    if (addBtn) {
      addBtn.setAttribute('data-app-id', app.id);
      addBtn.setAttribute('data-plan-name', featured.planName);
      addBtn.setAttribute('data-price', featured.price);
      addBtn.setAttribute('data-duration-key', featured.durationKey);
      addBtn.setAttribute('data-duration-label', featured.durationLabel);
    }

    if (cliCmdEl) {
      cliCmdEl.textContent = `${meta.shortLabel} · ${featured.price}/${featured.unitShort} · garansi penuh`;
    }

    document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: wrapper } }));
    renderSegments(activeIndex, animateProgress);

    if (animateTransition && shouldAnimate()) {
      if (centerCard) {
        animate(centerCard, { scale: [0.97, 1], y: [8, 0], opacity: [0.9, 1] }, { ...springs.snappy });
      }
      if (cliWidget) {
        animate(cliWidget, { y: [4, 0], opacity: [0.9, 1] }, { ...springs.gentle });
      }
    }
  };

  const startAutoRotate = () => {
    stopAutoRotate();
    if (!shouldAnimate() || isPaused || document.hidden) return;
    renderSegments(activeIndex, true);
    autoTimer = setInterval(() => {
      renderSlide(activeIndex + 1, true);
    }, AUTO_MS);
  };

  const goTo = (index) => {
    renderSlide(index, true, isPaused);
    if (!isPaused) startAutoRotate();
  };

  prevBtn?.addEventListener('click', () => goTo(activeIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(activeIndex + 1));

  segmentBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-deck-index'));
      if (!Number.isNaN(idx)) goTo(idx);
    });
  });

  addBtn?.addEventListener('click', () => {
    onAddToCart?.({
      appId: addBtn.getAttribute('data-app-id'),
      planName: addBtn.getAttribute('data-plan-name'),
      price: addBtn.getAttribute('data-price'),
      durationKey: addBtn.getAttribute('data-duration-key'),
      durationLabel: addBtn.getAttribute('data-duration-label')
    });
  });

  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(activeIndex + 1);
    }
  });

  wrapper.addEventListener('mouseenter', () => {
    isPaused = true;
    stopAutoRotate();
    renderSegments(activeIndex, false);
  });

  wrapper.addEventListener('mouseleave', () => {
    isPaused = false;
    startAutoRotate();
  });

  wrapper.addEventListener('focusin', () => {
    isPaused = true;
    stopAutoRotate();
    renderSegments(activeIndex, false);
  });

  wrapper.addEventListener('focusout', (e) => {
    if (!wrapper.contains(e.relatedTarget)) {
      isPaused = false;
      startAutoRotate();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoRotate();
    } else if (!isPaused) {
      startAutoRotate();
    }
  });

  renderSlide(0, false, false);
  startAutoRotate();
}

/* 3. Scroll reveals — fade-up once, plus rAF sweep for stranded elements */
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

/* 4. Scroll-path spine for "3 Langkah" — stroke-dashoffset follows scroll */
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
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      measure();
    });
  };

  try {
    scroll(() => schedule(), { trackContentSize: true });
  } catch {
    /* rAF + scroll listener below still drives the spine */
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
}

/* 5. Count-up stats — once per element, on first view */
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

/* 6. Micro interactions */
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

export function initMotionSystem(products, { onAddToCart } = {}) {
  initScrollProgressBar();
  initHeroMaskReveal();
  initHeroEntrance();
  initHeroShowcaseDeck(products, { onAddToCart });
  initScrollReveals();
  initStepsSpine();
  initCounters();
  initMicroInteractions();

  // Dynamic copyright year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
