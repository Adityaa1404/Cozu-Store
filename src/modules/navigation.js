import { highlightAppSection } from './products.js';

const SIDEBAR_STATE_KEY = 'cozu_sidebar_expanded';

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function scrollBehavior() {
  return prefersReducedMotion() ? 'auto' : 'smooth';
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}

export function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');
  if (!scrollBtn) return;

  const updateVisibility = () => {
    if (window.scrollY > 320) {
      scrollBtn.classList.remove('hidden-btn');
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
      scrollBtn.classList.add('hidden-btn');
    }
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  scrollBtn.addEventListener('click', scrollToTop);
}

/* Desktop rail: 68px collapsed ↔ 240px expanded, remembered per browser */
export function initSidebar() {
  const sidebar = document.getElementById('desktop-sidebar');
  const toggle = document.getElementById('sidebar-toggle');
  if (!sidebar || !toggle) return;

  const label = toggle.querySelector('.sidebar-label');
  let expanded = false;
  try {
    expanded = localStorage.getItem(SIDEBAR_STATE_KEY) === 'true';
  } catch {
    expanded = false;
  }

  const applyState = (next) => {
    expanded = next;
    sidebar.classList.toggle('is-expanded', expanded);
    document.body.classList.toggle('sidebar-expanded', expanded);
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    toggle.setAttribute('aria-label', expanded ? 'Perkecil sidebar' : 'Perluas sidebar');
    if (label) label.textContent = expanded ? 'Perkecil' : 'Perluas';
  };

  applyState(expanded);

  toggle.addEventListener('click', () => {
    applyState(!expanded);
    try {
      localStorage.setItem(SIDEBAR_STATE_KEY, String(expanded));
    } catch {
      /* private mode: state stays in memory */
    }
  });
}

/* Mobile hamburger drawer (left slide) */
export function initMobileMenu() {
  const root = document.getElementById('mobile-drawer-root');
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  if (!root || !openBtn) return;

  const isOpen = () => root.classList.contains('mobile-menu-open');

  const openMenu = () => {
    root.classList.remove('mobile-menu-closed');
    root.classList.add('mobile-menu-open');
    root.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
    window.setTimeout(() => closeBtn?.focus(), 60);
  };

  const closeMenu = () => {
    if (!isOpen()) return;
    root.classList.remove('mobile-menu-open');
    root.classList.add('mobile-menu-closed');
    root.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    const cartRoot = document.getElementById('cart-drawer-root');
    if (!cartRoot || !cartRoot.classList.contains('drawer-open')) {
      document.body.classList.remove('overflow-hidden');
    }
    openBtn.focus();
  };

  openBtn.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  root.querySelectorAll('a[href^="#"], [data-open-cart]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeMenu();
  });
}

export function initNavbarNavigation() {
  // DOM order: hero → testimoni → katalog → faq → cara pesan
  const sectionIds = ['home', 'testimoni', 'layanan', 'faq', 'cara-pesan'];
  const navLinks = Array.from(
    document.querySelectorAll(
      '.nav-link[data-nav], .mobile-nav-link[data-nav], .drawer-link[data-nav]'
    )
  );

  function updateActiveNav(activeId) {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('data-nav') === activeId;
      link.classList.toggle('active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function onScroll() {
    const scrollPosition = window.scrollY + 180;
    let currentId = 'home';

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el && scrollPosition >= el.getBoundingClientRect().top + window.scrollY) {
        currentId = sectionIds[i];
        break;
      }
    }

    updateActiveNav(currentId);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-nav');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: scrollBehavior() });
      updateActiveNav(targetId);
      if (window.history?.pushState) {
        window.history.pushState(null, '', `#${targetId}`);
      }
    });
  });
}

export function handleHashRoute(products, onResetFilters) {
  const rawHash = window.location.hash.replace('#', '').trim();
  if (!rawHash) return;

  const matchedApp = Array.isArray(products)
    ? products.find((a) => a.id.toLowerCase() === rawHash.toLowerCase())
    : null;

  if (matchedApp) {
    onResetFilters?.();
    setTimeout(() => highlightAppSection(matchedApp.id), 40);
    return;
  }

  const targetSection = document.getElementById(rawHash);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: scrollBehavior() });
  }
}

export function initNavigation(products, onResetFilters) {
  initSidebar();
  initMobileMenu();
  initNavbarNavigation();
  initScrollToTop();
  handleHashRoute(products, onResetFilters);

  window.addEventListener('hashchange', () => {
    handleHashRoute(products, onResetFilters);
  });

  // Wire footer / quick-jump app links (#netflix, #canva, etc.)
  document.addEventListener('click', (e) => {
    const jumpLink = e.target.closest('[data-jump-app]');
    if (!jumpLink) return;
    const appId = jumpLink.getAttribute('data-jump-app');
    if (!appId) return;
    e.preventDefault();
    onResetFilters?.();
    if (window.history?.pushState) {
      window.history.pushState(null, '', `#${appId}`);
    }
    setTimeout(() => highlightAppSection(appId), 40);
  });
}
