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
    sharp: [0.4, 0, 0.2, 1],
    bounce: [0.34, 1.56, 0.64, 1]
  },
  distance: { xs: 4, sm: 8, md: 16, lg: 24, xl: 48 },
  scale: { subtle: 0.98, press: 0.95, pop: 1.04 }
};

export const springs = {
  snappy: { type: 'spring', stiffness: 300, damping: 28 },
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  bouncy: { type: 'spring', stiffness: 400, damping: 12 },
  instant: { type: 'spring', stiffness: 600, damping: 35 },
  release: { type: 'spring', stiffness: 200, damping: 20 }
};

export function shouldAnimate() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  if (prefersReducedMotion.current === null) {
    initPrefersReducedMotion();
  }
  if (prefersReducedMotion.current === true) return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2) {
    return false;
  }
  return true;
}

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
    const ratio = Math.max(0, Math.min(1, window.scrollY / max));
    bar.style.transform = `scaleX(${ratio})`;
  };

  scroll(
    (progress) => {
      if (typeof progress === 'number' && !Number.isNaN(progress)) {
        bar.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
      }
    },
    { trackContentSize: true }
  );
  window.addEventListener('scroll', updateFromScroll, { passive: true });
  updateFromScroll();
}

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
    { opacity: [0, 1], y: [18, 0] },
    {
      delay: stagger(0.06),
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
  const leftCard = document.getElementById('hero-deck-left');
  const rightCard = document.getElementById('hero-deck-right');
  const cliWidget = document.getElementById('hero-cli-widget');

  const urlEl = document.getElementById('hero-deck-url');
  const counterEl = document.getElementById('hero-deck-counter');
  const statusCounterEl = document.getElementById('hero-status-counter');
  const stageBgEl = document.getElementById('hero-deck-stage-bg');
  const orbEl = document.getElementById('hero-deck-orb');
  const titleEl = document.getElementById('hero-deck-title');
  const taglineEl = document.getElementById('hero-deck-tagline');
  const priceEl = document.getElementById('hero-deck-price');
  const badgeTextEl = document.getElementById('hero-deck-badge-text');
  const chipsEl = document.getElementById('hero-deck-chips');
  const jumpBtn = document.getElementById('hero-deck-jump');
  const addBtn = document.getElementById('hero-deck-add');

  const leftTitleEl = document.getElementById('hero-deck-left-title');
  const leftPriceEl = document.getElementById('hero-deck-left-price');
  const leftOrbEl = document.getElementById('hero-deck-left-orb');
  const rightTitleEl = document.getElementById('hero-deck-right-title');
  const rightPriceEl = document.getElementById('hero-deck-right-price');
  const rightOrbEl = document.getElementById('hero-deck-right-orb');

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
    const theme = getAppTheme(app.id);
    const featured = getFeaturedPlanData(app);
    const startPrice = formatRupiah(getStartingPrice(app));

    const prevIndex = (activeIndex - 1 + apps.length) % apps.length;
    const nextIdx = (activeIndex + 1) % apps.length;
    const prevApp = apps[prevIndex];
    const nextApp = apps[nextIdx];
    const prevTheme = getAppTheme(prevApp.id);
    const nextTheme = getAppTheme(nextApp.id);

    const counterNum = `${String(activeIndex + 1).padStart(2, '0')} / ${String(apps.length).padStart(2, '0')}`;
    if (urlEl) urlEl.textContent = theme.urlSlug;
    if (counterEl) counterEl.textContent = counterNum;
    if (statusCounterEl) statusCounterEl.textContent = `${counterNum} APLIKASI READY`;

    if (stageBgEl) {
      stageBgEl.className = `bg-gradient-to-br ${theme.heroGradient} p-5 sm:p-6 transition-colors duration-300`;
    }

    if (orbEl) {
      orbEl.className = `w-16 h-16 rounded-2xl ${theme.pastelOrb} ring-2 ring-white/90 flex items-center justify-center mx-auto mb-3.5`;
      orbEl.style.filter = theme.orbShadow;
      orbEl.innerHTML = `<i data-lucide="${escapeHtml(app.icon || 'layers')}" class="w-8 h-8"></i>`;
    }

    if (titleEl) titleEl.textContent = app.name;
    if (taglineEl) taglineEl.textContent = app.tagline || '';
    if (priceEl) priceEl.textContent = `MULAI ${startPrice.toUpperCase()}`;
    if (badgeTextEl) badgeTextEl.textContent = featured.bestSeller ? 'Paling Laris' : 'Full Garansi';

    if (chipsEl) {
      chipsEl.innerHTML = (theme.chips || [])
        .map(
          (chip) =>
            `<span class="px-2.5 py-1 rounded-full bg-white/85 border border-black/5 text-[11px] font-semibold text-stone-800">${escapeHtml(chip)}</span>`
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

    if (leftCard) {
      leftCard.style.backgroundColor = prevTheme.surfaceHex;
      leftCard.setAttribute('aria-label', `Tampilkan ${prevApp.name}`);
      if (leftTitleEl) leftTitleEl.textContent = prevApp.name;
      if (leftPriceEl) leftPriceEl.textContent = `Mulai ${formatRupiah(getStartingPrice(prevApp))}`;
      if (leftOrbEl) {
        leftOrbEl.className = `w-11 h-11 rounded-2xl bg-white/95 flex items-center justify-center shadow-xs`;
        leftOrbEl.style.color = prevTheme.accentHex;
        leftOrbEl.innerHTML = `<i data-lucide="${escapeHtml(prevApp.icon || 'layers')}" class="w-5 h-5"></i>`;
      }
    }

    if (rightCard) {
      rightCard.style.backgroundColor = nextTheme.surfaceHex;
      rightCard.setAttribute('aria-label', `Tampilkan ${nextApp.name}`);
      if (rightTitleEl) rightTitleEl.textContent = nextApp.name;
      if (rightPriceEl) rightPriceEl.textContent = `Mulai ${formatRupiah(getStartingPrice(nextApp))}`;
      if (rightOrbEl) {
        rightOrbEl.className = `w-11 h-11 rounded-2xl bg-white/95 flex items-center justify-center shadow-xs`;
        rightOrbEl.style.color = nextTheme.accentHex;
        rightOrbEl.innerHTML = `<i data-lucide="${escapeHtml(nextApp.icon || 'layers')}" class="w-5 h-5"></i>`;
      }
    }

    if (cliCmdEl) {
      cliCmdEl.textContent = `${theme.shortLabel || app.name} · ${featured.price}/${featured.unitShort} — Garansi Aktif ✓`;
    }

    document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: wrapper } }));
    renderSegments(activeIndex, animateProgress);

    if (animateTransition && shouldAnimate()) {
      if (centerCard) {
        animate(
          centerCard,
          { scale: [0.96, 1], y: [10, 0], opacity: [0.85, 1] },
          { ...springs.snappy }
        );
      }
      if (leftCard) {
        animate(
          leftCard,
          { x: [-12, 0], scale: [0.96, 1], rotate: [-2, 0], opacity: [0.7, 0.9] },
          { ...springs.snappy }
        );
      }
      if (rightCard) {
        animate(
          rightCard,
          { x: [12, 0], scale: [0.96, 1], rotate: [2, 0], opacity: [0.7, 0.9] },
          { ...springs.snappy }
        );
      }
      if (cliWidget) {
        animate(
          cliWidget,
          { y: [5, 0], opacity: [0.85, 1] },
          { ...springs.gentle }
        );
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
  leftCard?.addEventListener('click', () => goTo(activeIndex - 1));
  rightCard?.addEventListener('click', () => goTo(activeIndex + 1));

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
      { opacity: [0, 1], y: [18, 0] },
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
      { opacity: [0, 1], y: [18, 0] },
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
    el.style.transform = 'translateY(18px)';

    inView(
      el,
      () => revealSingle(el),
      { amount: 'some' }
    );
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
      item.style.transform = 'translateY(18px)';
    });

    inView(
      group,
      () => revealGroup(group, items),
      { amount: 'some' }
    );
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
      { opacity: [0.85, 1], y: [10, 0] },
      {
        delay: stagger(0.04, { startDelay: 0 }),
        duration: motionTokens.duration.fast,
        ease: motionTokens.easing.smooth
      }
    );
  });
}

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
        animate(el, { y: -3 }, { ...springs.snappy });
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
        animate(badge, { scale: [1, 1.28, 1] }, { ...springs.bouncy });
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
  initHeroEntrance();
  initHeroShowcaseDeck(products, { onAddToCart });
  initScrollReveals();
  initMicroInteractions();
}
