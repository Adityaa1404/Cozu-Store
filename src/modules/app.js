import '../styles/main.css';
import {
  createElement,
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Clapperboard,
  Clock,
  Copy,
  Crown,
  Flame,
  HelpCircle,
  Home,
  Info,
  Layers,
  LayoutGrid,
  Lock,
  Mail,
  MessageCircle,
  MessageSquareQuote,
  Minus,
  Music,
  Palette,
  Play,
  Plus,
  RotateCcw,
  Scissors,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Trash2,
  Tv,
  Users,
  X,
  Zap
} from 'lucide';

import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import testimonialsData from '../data/testimonials.json';

import { renderCatalog } from './products.js';
import { initSearch } from './search.js';
import { initCart, addToCart, directBuy } from './cart.js';
import { initNavigation } from './navigation.js';
import { initTestimonials } from './testimonials.js';
import { initFaq } from './faq.js';
import { initMotionSystem } from './motion.js';

const USED_ICONS = {
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Clapperboard,
  Clock,
  Copy,
  Crown,
  Flame,
  HelpCircle,
  Home,
  Info,
  Layers,
  LayoutGrid,
  Lock,
  Mail,
  MessageCircle,
  MessageSquareQuote,
  Minus,
  Music,
  Palette,
  Play,
  Plus,
  RotateCcw,
  Scissors,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Trash2,
  Tv,
  Users,
  X,
  Zap
};

function toPascalCase(name) {
  return name.replace(/(^|-)([a-z0-9])/g, (_, __, ch) => ch.toUpperCase());
}

export function hydrateIcons(root = document) {
  const placeholders = root.querySelectorAll('i[data-lucide]');
  placeholders.forEach((el) => {
    const iconName = el.getAttribute('data-lucide');
    if (!iconName) return;
    const iconNode = USED_ICONS[toPascalCase(iconName)];
    if (!iconNode) return;

    const attrs = {
      class: ['lucide', `lucide-${iconName}`, el.getAttribute('class')].filter(Boolean).join(' ')
    };
    if (el.getAttribute('aria-hidden')) {
      attrs['aria-hidden'] = el.getAttribute('aria-hidden');
    }
    if (el.hasAttribute('data-faq-icon')) {
      attrs['data-faq-icon'] = '';
    }

    const svg = createElement(iconNode, attrs);
    el.parentNode?.replaceChild(svg, el);
  });
}

let initialized = false;

export function initCozuStore() {
  if (initialized) return;
  initialized = true;

  document.addEventListener('cozu:icons', (e) => {
    hydrateIcons(e.detail?.root || document);
  });

  const catalogContainer = document.getElementById('catalog-container');
  const emptyStateEl = document.getElementById('empty-state');

  const { resetAll } = initSearch({
    products: productsData,
    categories: categoriesData,
    onUpdate: (filteredApps, meta) => {
      renderCatalog(catalogContainer, emptyStateEl, filteredApps, {
        onAddToCart: addToCart,
        onDirectBuy: directBuy,
        sort: meta?.sort || 'price-low'
      });
    }
  });

  initCart(productsData);
  initTestimonials(testimonialsData);
  initFaq();
  initNavigation(productsData, resetAll);
  hydrateIcons(document);
  initMotionSystem(productsData, { onAddToCart: addToCart, onDirectBuy: directBuy });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCozuStore);
} else {
  initCozuStore();
}
