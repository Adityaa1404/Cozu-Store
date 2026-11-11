/**
 * ESM Verification Suite for Cozu Store Modules
 * Tests real src/modules/* and src/data/* directly (no duplicated mocks).
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

let mockLocalStorage = {};
let lastOpenedUrl = '';
let lastFallbackHref = '';
let popupBlocked = false;
let openedWindowObj = null;

function createMockEl(id = '') {
  const classes = new Set();
  const attrs = new Map();
  return {
    id,
    value: '',
    textContent: '',
    innerHTML: '',
    disabled: false,
    dataset: {},
    style: {},
    className: '',
    offsetWidth: 0,
    classList: {
      add: (...c) => c.forEach((x) => classes.add(x)),
      remove: (...c) => c.forEach((x) => classes.delete(x)),
      toggle: (c, force) => {
        if (force === undefined) {
          if (classes.has(c)) classes.delete(c);
          else classes.add(c);
        } else if (force) {
          classes.add(c);
        } else {
          classes.delete(c);
        }
      },
      contains: (c) => classes.has(c)
    },
    setAttribute: (k, v) => attrs.set(k, String(v)),
    getAttribute: (k) => attrs.get(k) ?? null,
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    appendChild: () => {},
    focus: () => {}
  };
}

const domElements = new Map();

globalThis.localStorage = {
  getItem: (key) => (Object.prototype.hasOwnProperty.call(mockLocalStorage, key) ? mockLocalStorage[key] : null),
  setItem: (key, val) => { mockLocalStorage[key] = String(val); },
  removeItem: (key) => { delete mockLocalStorage[key]; },
  clear: () => { mockLocalStorage = {}; }
};

globalThis.CustomEvent = class CustomEvent {
  constructor(type, init = {}) {
    this.type = type;
    this.detail = init.detail;
  }
};

globalThis.document = {
  getElementById: (id) => {
    if (!domElements.has(id)) domElements.set(id, createMockEl(id));
    return domElements.get(id);
  },
  createElement: () => createMockEl(),
  querySelectorAll: () => [],
  addEventListener: () => {},
  dispatchEvent: () => true,
  body: createMockEl('body')
};

globalThis.window = {
  open: (url) => {
    lastOpenedUrl = url;
    if (popupBlocked) return null;
    openedWindowObj = { opener: globalThis.window };
    return openedWindowObj;
  },
  location: {
    set href(val) {
      lastFallbackHref = val;
    },
    get href() {
      return lastFallbackHref;
    }
  }
};

const {
  getIndonesianDate,
  parsePrice,
  formatRupiah,
  escapeHtml,
  renderCatalog
} = await import('./src/modules/products.js');

const {
  getMinPrice,
  getMaxPrice,
  filterAndSortApps
} = await import('./src/modules/search.js');

const {
  WA_ADMIN_NUMBER,
  CartStore,
  formatStructuredWhatsAppMessage,
  checkoutWhatsAppCart
} = await import('./src/modules/cart.js');

const productsData = JSON.parse(readFileSync('./src/data/products.json', 'utf8'));
const categoriesData = JSON.parse(readFileSync('./src/data/categories.json', 'utf8'));
const testimonialsData = JSON.parse(readFileSync('./src/data/testimonials.json', 'utf8'));

let passCount = 0;
let failCount = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
    failCount++;
  }
}

function resetState() {
  mockLocalStorage = {};
  domElements.clear();
  lastOpenedUrl = '';
  lastFallbackHref = '';
  popupBlocked = false;
  openedWindowObj = null;
  CartStore.items = [];
  CartStore.buyerName = '';
  CartStore.buyerNotes = '';
  CartStore.extraData = {
    netflixPhone: '',
    netflixDevice: '',
    netflixLocation: '',
    canvaEmail: '',
    bstationEmail: '',
    capcutEmail: ''
  };
}

console.log('--- STARTING COZU STORE ESM VERIFICATION SUITE ---');

runTest('JSON datasets match expected catalog schema', () => {
  assert.equal(productsData.length, 4);
  assert.ok(categoriesData.some((c) => c.id === 'all'));
  assert.ok(testimonialsData.length >= 4);

  for (const app of productsData) {
    assert.ok(app.id && app.name && app.category && app.icon);
    assert.ok(Array.isArray(app.plans) && app.plans.length > 0);
    for (const plan of app.plans) {
      assert.ok(plan.name);
      const durs = Object.values(plan.durations || {});
      assert.ok(durs.length > 0);
      for (const dur of durs) {
        assert.ok(parsePrice(dur.price) > 0);
        assert.ok(Array.isArray(dur.features) && dur.features.length > 0);
      }
    }
  }
});

runTest('products.js utilities (parsePrice, formatRupiah, escapeHtml, getIndonesianDate)', () => {
  assert.equal(parsePrice('Rp 40.000'), 40000);
  assert.equal(parsePrice('Rp 4.000'), 4000);
  assert.equal(parsePrice(''), 0);
  assert.equal(formatRupiah(40000).replace(/\s/g, ' '), 'Rp 40.000');

  const escaped = escapeHtml('<script>alert("XSS")</script>&"\'');
  assert.equal(escaped.includes('<script>'), false);
  assert.equal(escaped.includes('&lt;script&gt;'), true);

  assert.equal(getIndonesianDate(new Date(2026, 7, 15)), '15 Agustus 2026');
});

runTest('products.js renderCatalog renders all apps and handles empty state', () => {
  const container = createMockEl('catalog-container');
  const emptyState = createMockEl('empty-state');

  renderCatalog(container, emptyState, productsData);
  assert.equal(emptyState.classList.contains('hidden'), true);
  assert.equal(container.classList.contains('hidden'), false);
  assert.ok(container.innerHTML.includes('id="app-netflix"'));
  assert.ok(container.innerHTML.includes('id="app-canva"'));
  assert.ok(container.innerHTML.includes('id="app-capcut"'));
  assert.ok(container.innerHTML.includes('id="app-bstation"'));

  renderCatalog(container, emptyState, []);
  assert.equal(container.innerHTML, '');
  assert.equal(container.classList.contains('hidden'), true);
  assert.equal(emptyState.classList.contains('hidden'), false);
});

runTest('search.js price helpers & filterAndSortApps against products.json', () => {
  const netflix = productsData.find((a) => a.id === 'netflix');
  const canva = productsData.find((a) => a.id === 'canva');
  assert.equal(getMinPrice(netflix), 6000);
  assert.equal(getMaxPrice(netflix), 45000);
  assert.equal(getMinPrice(canva), 4000);

  assert.equal(filterAndSortApps(productsData, 'streaming').length, 2);
  assert.equal(filterAndSortApps(productsData, 'design').length, 2);
  assert.equal(filterAndSortApps(productsData, 'music').length, 0);

  const priceLow = filterAndSortApps(productsData, 'all', '', 'price-low');
  assert.equal(priceLow[0].id, 'canva');
  assert.equal(priceLow[1].id, 'netflix');
  assert.equal(priceLow[2].id, 'bstation');
  assert.equal(priceLow[3].id, 'capcut');

  const priceHigh = filterAndSortApps(productsData, 'all', '', 'price-high');
  assert.equal(priceHigh[0].id, 'netflix');
  assert.equal(priceHigh[1].id, 'capcut');

  const nameAsc = filterAndSortApps(productsData, 'all', '', 'name-asc');
  assert.deepEqual(nameAsc.map((a) => a.id), ['bstation', 'canva', 'capcut', 'netflix']);

  const searchAnime = filterAndSortApps(productsData, 'streaming', 'anime');
  assert.deepEqual(searchAnime.map((a) => a.id), ['bstation']);
});

runTest('CartStore persists items, quantities, extraData, and badge visibility classes', () => {
  resetState();
  const word = 'Laptop Asus Vivobook';
  for (let i = 1; i <= word.length; i++) {
    CartStore.setExtraData('netflixDevice', word.substring(0, i));
  }
  assert.equal(CartStore.extraData.netflixDevice, word);

  CartStore.addItem(
    {
      appId: 'netflix',
      appName: 'Netflix',
      appIcon: 'tv',
      planName: 'Sharing 1 Profile',
      durationKey: 'weekly',
      durationLabel: 'Mingguan',
      price: 'Rp 16.000'
    },
    false
  );

  assert.equal(CartStore.getTotalCount(), 1);
  assert.equal(CartStore.getTotalPrice(), 16000);
  assert.equal(globalThis.document.getElementById('header-cart-badge').classList.contains('hidden'), false);
  assert.equal(globalThis.document.getElementById('header-cart-badge').classList.contains('inline-flex'), true);
  assert.equal(globalThis.document.getElementById('clear-cart-btn').classList.contains('hidden'), false);
  assert.equal(globalThis.document.getElementById('clear-cart-btn').classList.contains('inline-flex'), true);

  const itemId = CartStore.items[0].id;
  CartStore.updateQuantity(itemId, 1);
  assert.equal(CartStore.getTotalCount(), 2);
  assert.equal(CartStore.getTotalPrice(), 32000);

  CartStore.clearCart();
  assert.equal(CartStore.getTotalCount(), 0);
  assert.equal(globalThis.document.getElementById('header-cart-badge').classList.contains('hidden'), true);
  assert.equal(globalThis.document.getElementById('header-cart-badge').classList.contains('inline-flex'), false);
  assert.equal(globalThis.document.getElementById('clear-cart-btn').classList.contains('hidden'), true);
  assert.equal(globalThis.document.getElementById('clear-cart-btn').classList.contains('inline-flex'), false);
});

runTest('formatStructuredWhatsAppMessage builds exact WhatsApp receipt format', () => {
  const message = formatStructuredWhatsAppMessage(
    [
      {
        appId: 'netflix',
        appName: 'Netflix',
        planName: 'Sharing 1 Profile',
        durationKey: 'weekly',
        durationLabel: '1 minggu',
        rawPrice: 'Rp 16.000',
        unitPrice: 16000,
        quantity: 1
      }
    ],
    'Ann Customer',
    'Tolong proses cepat',
    {
      netflixPhone: '085854577353',
      netflixDevice: 'laptop asus vivobook',
      netflixLocation: 'surabaya'
    },
    'CZ-8821',
    '18 Agustus 2026'
  );

  assert.ok(message.includes('*─── COZU STORE | ORDER FORM ───*'));
  assert.ok(message.includes('🔖 *ID Pesanan:* CZ-8821'));
  assert.ok(message.includes('1. *Netflix* — Sharing 1 Profile'));
  assert.ok(message.includes('└ *Durasi:* 1 minggu'));
  assert.ok(message.includes('📱 *NETFLIX DEVICE MANAGEMENT*'));
  assert.ok(message.includes('🌷 nomor customer :  085854577353'));
  assert.ok(message.includes('✿ wajib diisi 1x24 jam, selebihnya maka no garansi'));
  assert.ok(message.includes('💳 *TOTAL PEMBAYARAN: Rp 16.000*'));
});

runTest('checkoutWhatsAppCart validates inputs, opens wa.me without double navigation, and falls back when blocked', () => {
  resetState();
  CartStore.addItem(
    {
      appId: 'canva',
      appName: 'Canva',
      appIcon: 'palette',
      planName: 'Canva Pro (Tim)',
      durationKey: 'monthly',
      durationLabel: 'Bulanan',
      price: 'Rp 4.000'
    },
    false
  );

  // Invalid email blocks WhatsApp open
  CartStore.extraData.canvaEmail = 'not-an-email';
  globalThis.document.getElementById('canva-email-input').value = 'not-an-email';
  checkoutWhatsAppCart();
  assert.equal(lastOpenedUrl, '');

  // Valid email opens WA new tab and clears opener without overwriting current tab
  CartStore.extraData.canvaEmail = 'user@example.com';
  globalThis.document.getElementById('canva-email-input').value = 'user@example.com';
  checkoutWhatsAppCart();
  assert.ok(lastOpenedUrl.startsWith(`https://wa.me/${WA_ADMIN_NUMBER}?text=`));
  assert.equal(openedWindowObj.opener, null);
  assert.equal(lastFallbackHref, '');

  // Popup blocked falls back to window.location.href
  popupBlocked = true;
  lastFallbackHref = '';
  checkoutWhatsAppCart();
  assert.ok(lastFallbackHref.startsWith(`https://wa.me/${WA_ADMIN_NUMBER}?text=`));
});

console.log(`\n--- TEST SUITE COMPLETED: ${passCount} PASSED, ${failCount} FAILED ---`);
if (failCount > 0) process.exit(1);
