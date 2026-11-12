import { showToast } from './toast.js';
import { parsePrice, formatRupiah, escapeHtml, getIndonesianDate } from './products.js';

export const WA_ADMIN_NUMBER = '6287862481038';

let productsRef = [];
let lastFocusedElement = null;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeOpenWhatsApp(url) {
  const newWindow = window.open(url, '_blank');
  if (newWindow) {
    newWindow.opener = null;
  } else {
    window.location.href = url;
  }
}

export const CartStore = {
  STORAGE_KEY: 'cozu_cart_data_v1',
  items: [],
  buyerName: '',
  buyerNotes: '',
  extraData: {
    netflixPhone: '',
    netflixDevice: '',
    netflixLocation: '',
    canvaEmail: '',
    bstationEmail: '',
    capcutEmail: ''
  },

  init() {
    this.load();
  },

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.items)) {
          this.items = parsed.items;
        }
        if (typeof parsed.buyerName === 'string') {
          this.buyerName = parsed.buyerName.slice(0, 100);
        }
        if (typeof parsed.buyerNotes === 'string') {
          this.buyerNotes = parsed.buyerNotes.slice(0, 500);
        }
        if (parsed.extraData && typeof parsed.extraData === 'object') {
          this.extraData = { ...this.extraData, ...parsed.extraData };
        }
      }
    } catch {
      // Fall back silently to in-memory cart if localStorage is blocked or corrupted
    }
    this.syncUI();
  },

  setExtraData(key, value) {
    this.extraData[key] = typeof value === 'string' ? value.slice(0, 254) : '';
    this.saveStorageOnly();
  },

  setBuyerInfo(key, value) {
    const clean = typeof value === 'string' ? value : '';
    if (key === 'buyerName') this.buyerName = clean.slice(0, 100);
    if (key === 'buyerNotes') this.buyerNotes = clean.slice(0, 500);
    this.saveStorageOnly();
  },

  saveStorageOnly() {
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({
          items: this.items,
          buyerName: this.buyerName,
          buyerNotes: this.buyerNotes,
          extraData: this.extraData
        })
      );
    } catch {
      // Ignore storage quota or private mode failures
    }
  },

  save() {
    this.saveStorageOnly();
    this.syncUI();
  },

  addItem(product, showNotification = true) {
    const itemId = `${product.appId}-${product.planName}-${product.durationKey}`
      .replace(/\s+/g, '-')
      .toLowerCase();
    const existingIndex = this.items.findIndex((i) => i.id === itemId);

    if (existingIndex > -1) {
      if (this.items[existingIndex].quantity < 99) {
        this.items[existingIndex].quantity += 1;
      }
    } else {
      const unitPrice = parsePrice(product.price);
      this.items.push({
        id: itemId,
        appId: product.appId,
        appName: product.appName,
        appIcon: product.appIcon,
        planName: product.planName,
        durationKey: product.durationKey,
        durationLabel: product.durationLabel,
        rawPrice: product.price,
        unitPrice,
        quantity: 1
      });
    }

    this.save();
    triggerBadgeAnimation();
    if (showNotification) {
      showToast(
        'Ditambahkan ke Keranjang',
        `${product.appName} (${product.planName}) siap di keranjang.`
      );
    }
  },

  removeItem(itemId) {
    const item = this.items.find((i) => i.id === itemId);
    this.items = this.items.filter((i) => i.id !== itemId);
    this.save();
    if (item) {
      showToast('Item Dihapus', `${item.appName} (${item.planName}) dihapus dari keranjang.`, 'info');
    }
  },

  updateQuantity(itemId, delta) {
    const item = this.items.find((i) => i.id === itemId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      this.removeItem(itemId);
    } else if (newQty <= 99) {
      item.quantity = newQty;
      this.save();
    }
  },

  clearCart() {
    if (this.items.length === 0) return;
    this.items = [];
    this.save();
    showToast('Keranjang Dikosongkan', 'Semua item pesanan telah dihapus.', 'info');
  },

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  },

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + (item.unitPrice || 0) * (item.quantity || 1), 0);
  },

  syncUI() {
    updateCartBadge();
    renderCartDrawer();
    renderDynamicAppFields();
    syncStaticBuyerInputs();
  }
};

function syncStaticBuyerInputs() {
  const buyerNameInput = document.getElementById('buyer-name-input');
  const buyerNotesInput = document.getElementById('buyer-notes-input');
  if (buyerNameInput && buyerNameInput.value !== CartStore.buyerName) {
    buyerNameInput.value = CartStore.buyerName;
  }
  if (buyerNotesInput && buyerNotesInput.value !== CartStore.buyerNotes) {
    buyerNotesInput.value = CartStore.buyerNotes;
  }
}

export function triggerBadgeAnimation() {
  document.dispatchEvent(new CustomEvent('cozu:cart-pop'));
  if (typeof window !== 'undefined' && window.__cozuMotionActive) return;
  ['cart-count-badge', 'header-cart-badge', 'mobile-cart-badge'].forEach((id) => {
    const badge = document.getElementById(id);
    if (badge) {
      badge.classList.remove('badge-pop');
      void badge.offsetWidth;
      badge.classList.add('badge-pop');
    }
  });
}

export function updateCartBadge() {
  const totalCount = CartStore.getTotalCount();
  const totalPrice = CartStore.getTotalPrice();

  ['cart-count-badge', 'header-cart-badge', 'mobile-cart-badge'].forEach((id) => {
    const badge = document.getElementById(id);
    if (!badge) return;
    const isEmpty = totalCount <= 0;
    badge.textContent = String(totalCount);
    badge.classList.toggle('hidden', isEmpty);
    badge.classList.toggle('inline-flex', !isEmpty);
  });

  const totalBadge = document.getElementById('cart-total-badge');
  if (totalBadge) {
    totalBadge.textContent = formatRupiah(totalPrice);
  }

  const drawerCount = document.getElementById('cart-drawer-count');
  if (drawerCount) {
    drawerCount.textContent = `${totalCount} item dipilih`;
  }
}

export function openCartDrawer() {
  const root = document.getElementById('cart-drawer-root');
  if (!root) return;
  lastFocusedElement = document.activeElement;
  root.classList.remove('drawer-closed');
  root.classList.add('drawer-open');
  root.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overflow-hidden');

  setTimeout(() => {
    const closeBtn = document.getElementById('close-cart-drawer-btn');
    if (closeBtn) closeBtn.focus();
  }, 50);
}

export function closeCartDrawer() {
  const root = document.getElementById('cart-drawer-root');
  if (!root) return;
  root.classList.remove('drawer-open');
  root.classList.add('drawer-closed');
  root.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('overflow-hidden');

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

export function toggleCartDrawer() {
  const root = document.getElementById('cart-drawer-root');
  if (!root) return;
  if (root.classList.contains('drawer-open')) {
    closeCartDrawer();
  } else {
    openCartDrawer();
  }
}

export function addToCart({ appId, planName, price, durationKey, durationLabel }) {
  const app = productsRef.find((a) => a.id === appId);
  if (!app) return;

  CartStore.addItem(
    {
      appId: app.id,
      appName: app.name,
      appIcon: app.icon,
      planName,
      durationKey,
      durationLabel,
      price
    },
    true
  );
}

export function directBuy({ appId, planName, price, durationKey, durationLabel }) {
  const app = productsRef.find((a) => a.id === appId);
  if (!app) return;

  CartStore.addItem(
    {
      appId: app.id,
      appName: app.name,
      appIcon: app.icon,
      planName,
      durationKey,
      durationLabel,
      price
    },
    false
  );

  openCartDrawer();

  setTimeout(() => {
    const targetInput =
      document.getElementById('netflix-phone-input') ||
      document.getElementById('canva-email-input') ||
      document.getElementById('bstation-email-input') ||
      document.getElementById('capcut-email-input') ||
      document.getElementById('buyer-name-input');
    if (targetInput) {
      targetInput.focus();
    }
  }, 320);
}

function renderDynamicAppFields() {
  const container = document.getElementById('dynamic-app-fields');
  if (!container) return;

  if (CartStore.items.length === 0) {
    container.innerHTML = '';
    return;
  }

  const hasNetflix = CartStore.items.some((i) => i.appId === 'netflix');
  const hasCanva = CartStore.items.some((i) => i.appId === 'canva');
  const hasBstation = CartStore.items.some((i) => i.appId === 'bstation');
  const hasCapcut = CartStore.items.some((i) => i.appId === 'capcut');

  let html = '';

  if (hasNetflix) {
    const netflixItem = CartStore.items.find((i) => i.appId === 'netflix');
    const defaultDuration = netflixItem ? netflixItem.durationLabel || netflixItem.durationKey : 'Bulanan';
    const currentDate = getIndonesianDate();

    html += `
      <div class="space-y-3.5 rounded-xl border border-line bg-canvas-subtle p-4">
        <div class="flex items-center justify-between gap-2 border-b border-line pb-2.5">
          <div class="flex items-center gap-2">
            <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-subtle text-accent" aria-hidden="true">
              <i data-lucide="tv" class="h-4 w-4"></i>
            </span>
            <h5 class="text-xs font-semibold uppercase tracking-[0.08em] text-ink">Netflix device management</h5>
          </div>
          <span class="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-ink-faint">
            Wajib diisi
          </span>
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label for="netflix-phone-input" class="mb-1 block text-xs font-medium text-ink-secondary">
              Nomor WhatsApp / customer <span class="text-error">*</span>
            </label>
            <input
              type="tel"
              id="netflix-phone-input"
              maxlength="20"
              placeholder="085854577353"
              value="${escapeHtml(CartStore.extraData.netflixPhone || '')}"
              data-extra-field="netflixPhone"
              class="h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
            />
          </div>

          <div>
            <label for="netflix-location-input" class="mb-1 block text-xs font-medium text-ink-secondary">
              Lokasi / kota <span class="text-error">*</span>
            </label>
            <input
              type="text"
              id="netflix-location-input"
              maxlength="80"
              placeholder="Contoh: Surabaya"
              value="${escapeHtml(CartStore.extraData.netflixLocation || '')}"
              data-extra-field="netflixLocation"
              class="h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
            />
          </div>

          <div>
            <label for="netflix-date-input" class="mb-1 block text-xs font-medium text-ink-faint">
              Tanggal order (otomatis)
            </label>
            <input
              type="text"
              id="netflix-date-input"
              value="${escapeHtml(currentDate)}"
              readonly
              class="h-11 w-full cursor-not-allowed rounded-xl border border-line bg-canvas px-3 text-sm text-ink-faint"
            />
          </div>

          <div>
            <label for="netflix-duration-input" class="mb-1 block text-xs font-medium text-ink-faint">
              Durasi (otomatis)
            </label>
            <input
              type="text"
              id="netflix-duration-input"
              value="${escapeHtml(defaultDuration)}"
              readonly
              class="h-11 w-full cursor-not-allowed rounded-xl border border-line bg-canvas px-3 text-sm text-ink-faint"
            />
          </div>
        </div>

        <div>
          <label for="netflix-device-input" class="mb-1 block text-xs font-medium text-ink-secondary">
            Device &amp; merk lengkap <span class="text-error">*</span>
          </label>
          <input
            type="text"
            id="netflix-device-input"
            maxlength="100"
            placeholder="Contoh: Laptop Asus Vivobook / iPhone XR / TV Samsung"
            value="${escapeHtml(CartStore.extraData.netflixDevice || '')}"
            data-extra-field="netflixDevice"
            class="h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
        </div>

        <div class="space-y-1.5 rounded-xl border border-line bg-canvas p-3 text-xs leading-relaxed text-ink-secondary">
          <p class="flex items-start gap-2">
            <i data-lucide="info" class="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true"></i>
            <span>Tulis device lengkap beserta merk (contoh: <strong class="font-medium text-ink">iPhone XR, TV Samsung, Redmi Pad SE</strong>).</span>
          </p>
          <p class="flex items-start gap-2">
            <i data-lucide="shield-check" class="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true"></i>
            <span>Selain paket Semi Private (2 device), wajib <strong class="font-medium text-ink">login 1 device saja</strong> agar garansi tetap berlaku.</span>
          </p>
        </div>
      </div>
    `;
  }

  const emailApps = [
    {
      active: hasCanva,
      key: 'canvaEmail',
      id: 'canva-email-input',
      icon: 'palette',
      title: 'Email Akun Canva Pro',
      label: 'Email Canva Anda',
      placeholder: 'emailcanva@gmail.com',
      hint: 'Undangan tim Canva Pro akan dikirimkan ke email ini.'
    },
    {
      active: hasBstation,
      key: 'bstationEmail',
      id: 'bstation-email-input',
      icon: 'clapperboard',
      title: 'Email Akun Bstation',
      label: 'Email Bstation Anda',
      placeholder: 'emailbstation@gmail.com',
      hint: 'Digunakan untuk aktivasi akun Bstation VIP.'
    },
    {
      active: hasCapcut,
      key: 'capcutEmail',
      id: 'capcut-email-input',
      icon: 'scissors',
      title: 'Email Akun CapCut',
      label: 'Email CapCut Anda',
      placeholder: 'emailcapcut@gmail.com',
      hint: 'Digunakan untuk aktivasi paket CapCut Pro.'
    }
  ];

  emailApps
    .filter((app) => app.active)
    .forEach((app) => {
      html += `
        <div class="space-y-2 rounded-xl border border-line bg-canvas-subtle p-4">
          <div class="flex items-center gap-2">
            <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-subtle text-accent" aria-hidden="true">
              <i data-lucide="${app.icon}" class="h-4 w-4"></i>
            </span>
            <h5 class="text-xs font-semibold text-ink">${app.title}</h5>
          </div>
          <label for="${app.id}" class="block text-xs font-medium text-ink-secondary">
            ${app.label} <span class="text-error">*</span>
          </label>
          <input
            type="email"
            id="${app.id}"
            maxlength="254"
            placeholder="${app.placeholder}"
            value="${escapeHtml(CartStore.extraData[app.key] || '')}"
            data-extra-field="${app.key}"
            class="h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
          <p class="text-xs text-ink-faint">${app.hint}</p>
        </div>
      `;
    });

  container.innerHTML = html;
  document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: container } }));
}

function renderCartDrawer() {
  const listContainer = document.getElementById('cart-items-list');
  const emptyState = document.getElementById('cart-empty-state');
  const buyerForm = document.getElementById('cart-buyer-form');
  const clearBtn = document.getElementById('clear-cart-btn');
  const totalPriceEl = document.getElementById('cart-total-price');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  if (!listContainer) return;

  const items = CartStore.items;
  const totalCount = CartStore.getTotalCount();
  const totalPrice = CartStore.getTotalPrice();

  if (totalPriceEl) {
    totalPriceEl.textContent = formatRupiah(totalPrice);
  }

  if (items.length === 0) {
    listContainer.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    if (buyerForm) buyerForm.classList.add('hidden');
    if (clearBtn) {
      clearBtn.classList.add('hidden');
      clearBtn.classList.remove('inline-flex');
    }
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML = `
        <i data-lucide="shopping-bag" class="w-5 h-5" aria-hidden="true"></i>
        <span>Keranjang Masih Kosong</span>
      `;
      document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: checkoutBtn } }));
    }
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (buyerForm) buyerForm.classList.remove('hidden');
  if (clearBtn) {
    clearBtn.classList.remove('hidden');
    clearBtn.classList.add('inline-flex');
  }
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.innerHTML = `
      <i data-lucide="message-circle" class="w-5 h-5" aria-hidden="true"></i>
      <span>Kirim Pesanan via WhatsApp (${totalCount} Item)</span>
    `;
    document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: checkoutBtn } }));
  }

  listContainer.innerHTML = items
    .map((item) => {
      const itemSubtotal = item.unitPrice * item.quantity;
      return `
        <div class="flex items-center justify-between gap-3 rounded-xl border border-line bg-canvas-subtle p-3.5">
          <div class="flex min-w-0 items-center gap-3">
            <div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-subtle text-accent" aria-hidden="true">
              <i data-lucide="${escapeHtml(item.appIcon || 'layers')}" class="h-5 w-5"></i>
            </div>
            <div class="min-w-0">
              <div class="mb-0.5 flex items-center gap-1.5">
                <span class="truncate text-sm font-semibold text-ink">${escapeHtml(item.appName)}</span>
                <span class="shrink-0 rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-ink-faint">
                  ${escapeHtml(item.durationLabel)}
                </span>
              </div>
              <p class="truncate text-xs text-ink-secondary">${escapeHtml(item.planName)}</p>
              <p class="mt-1 text-sm font-semibold text-ink">${escapeHtml(formatRupiah(itemSubtotal))}</p>
            </div>
          </div>

          <div class="flex shrink-0 items-center gap-1.5">
            <div class="flex items-center rounded-full border border-line p-0.5">
              <button
                type="button"
                data-cart-qty="${escapeHtml(item.id)}"
                data-delta="-1"
                aria-label="Kurangi kuantitas ${escapeHtml(item.appName)}"
                class="grid h-9 w-9 place-items-center rounded-full text-ink-secondary transition-colors hover:bg-surface-hover hover:text-ink"
              >
                <i data-lucide="minus" class="h-3.5 w-3.5" aria-hidden="true"></i>
              </button>
              <span class="w-7 text-center text-xs font-semibold text-ink select-none">${item.quantity}</span>
              <button
                type="button"
                data-cart-qty="${escapeHtml(item.id)}"
                data-delta="1"
                aria-label="Tambah kuantitas ${escapeHtml(item.appName)}"
                class="grid h-9 w-9 place-items-center rounded-full text-ink-secondary transition-colors hover:bg-surface-hover hover:text-ink"
              >
                <i data-lucide="plus" class="h-3.5 w-3.5" aria-hidden="true"></i>
              </button>
            </div>

            <button
              type="button"
              data-cart-remove="${escapeHtml(item.id)}"
              aria-label="Hapus ${escapeHtml(item.appName)} dari keranjang"
              class="grid h-9 w-9 place-items-center rounded-full text-ink-faint transition-colors hover:text-error"
            >
              <i data-lucide="trash-2" class="h-4 w-4" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      `;
    })
    .join('');

  document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: listContainer } }));
}

export function formatStructuredWhatsAppMessage(
  cartItems,
  buyerName,
  buyerNotes,
  extraData,
  orderCode,
  overrideDate = null
) {
  const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.unitPrice || 0) * (item.quantity || 1),
    0
  );
  const orderDate = overrideDate || getIndonesianDate();

  const itemsText = cartItems
    .map((item, index) => {
      const itemSubtotal = formatRupiah(item.unitPrice * item.quantity);
      return (
        `${index + 1}. *${item.appName}* — ${item.planName}\n` +
        `   └ *Durasi:* ${item.durationLabel || item.durationKey}\n` +
        `   └ *Qty:* ${item.quantity} × ${item.rawPrice} = *${itemSubtotal}*`
      );
    })
    .join('\n');

  const sections = [];

  const headerText =
    `*─── COZU STORE | ORDER FORM ───*\n\n` +
    `Halo Admin, saya ingin melakukan pemesanan akun premium dengan rincian berikut:\n\n` +
    `🔖 *ID Pesanan:* ${orderCode}\n` +
    (buyerName ? `👤 *Nama Customer:* ${buyerName}\n` : '') +
    `📅 *Tanggal:* ${orderDate}`;
  sections.push(headerText);

  sections.push(`📦 *RINCIAN PESANAN*\n${itemsText}`);

  const netflixItem = cartItems.find((i) => i.appId === 'netflix');
  if (netflixItem) {
    const netflixPhone = extraData?.netflixPhone || '-';
    const netflixDevice = extraData?.netflixDevice || '-';
    const netflixLocation = extraData?.netflixLocation || '-';
    const durationStr = netflixItem.durationLabel || netflixItem.durationKey;

    const netflixBlock =
      `📱 *NETFLIX DEVICE MANAGEMENT*\n\n` +
      `🌷 nomor customer :  ${netflixPhone}\n` +
      `🌷 tanggal order : ${orderDate}\n` +
      `🌷 durasi (1U): ${durationStr}\n` +
      `🌷 device : ${netflixDevice}\n` +
      `🌷 lokasi : ${netflixLocation}\n\n` +
      `_Catatan Ketentuan:_\n` +
      `✿ tulis device lengkap beserta merk (contoh IPHONE XR, TV SAMSUNG, REDMI PAD SE, dll)\n` +
      `✿ selain pembelian semi private (2 device), diharap untuk *login 1 device saja!* lebih? void warranty\n` +
      `✿ wajib diisi 1x24 jam, selebihnya maka no garansi`;
    sections.push(netflixBlock);
  }

  const emailEntries = [];
  if (cartItems.some((i) => i.appId === 'canva') && extraData?.canvaEmail) {
    emailEntries.push(`• *Canva Pro:* ${extraData.canvaEmail}`);
  }
  if (cartItems.some((i) => i.appId === 'bstation') && extraData?.bstationEmail) {
    emailEntries.push(`• *Bstation:* ${extraData.bstationEmail}`);
  }
  if (cartItems.some((i) => i.appId === 'capcut') && extraData?.capcutEmail) {
    emailEntries.push(`• *CapCut:* ${extraData.capcutEmail}`);
  }

  if (emailEntries.length > 0) {
    sections.push(`📧 *DATA EMAIL AKUN*\n${emailEntries.join('\n')}`);
  }

  if (buyerNotes) {
    sections.push(`📝 *CATATAN TAMBAHAN*\n${buyerNotes}`);
  }

  const footerSection =
    `💳 *TOTAL PEMBAYARAN: ${formatRupiah(totalPrice)}*\n` +
    `_(Total: ${totalCount} Item Produk)_\n\n` +
    `Mohon info metode pembayaran / QRIS untuk segera saya selesaikan. Terima kasih! ✨`;
  sections.push(footerSection);

  return sections.join('\n\n━━━━━━━━━━━━━━━━━━━━\n\n');
}

function validateCheckoutInputs(extraData) {
  const hasNetflix = CartStore.items.some((i) => i.appId === 'netflix');
  const hasCanva = CartStore.items.some((i) => i.appId === 'canva');
  const hasBstation = CartStore.items.some((i) => i.appId === 'bstation');
  const hasCapcut = CartStore.items.some((i) => i.appId === 'capcut');

  const fail = (inputId, title, message) => {
    showToast(title, message, 'error');
    const el = document.getElementById(inputId);
    if (el) el.focus();
    return false;
  };

  if (hasNetflix) {
    if (!extraData.netflixPhone || extraData.netflixPhone.replace(/[^0-9]/g, '').length < 8) {
      return fail('netflix-phone-input', 'Nomor Customer Diperlukan', 'Masukkan nomor WhatsApp aktif untuk aktivasi Netflix.');
    }
    if (!extraData.netflixLocation) {
      return fail('netflix-location-input', 'Lokasi Diperlukan', 'Masukkan kota/lokasi Anda untuk Netflix Device Management.');
    }
    if (!extraData.netflixDevice) {
      return fail('netflix-device-input', 'Device Diperlukan', 'Tulis merk & tipe device lengkap (misal: iPhone XR / TV Samsung).');
    }
  }

  if (hasCanva && (!extraData.canvaEmail || !isValidEmail(extraData.canvaEmail))) {
    return fail('canva-email-input', 'Email Canva Tidak Valid', 'Masukkan alamat email aktif untuk menerima undangan Canva Pro.');
  }

  if (hasBstation && (!extraData.bstationEmail || !isValidEmail(extraData.bstationEmail))) {
    return fail('bstation-email-input', 'Email Bstation Tidak Valid', 'Masukkan alamat email aktif untuk aktivasi Bstation VIP.');
  }

  if (hasCapcut && (!extraData.capcutEmail || !isValidEmail(extraData.capcutEmail))) {
    return fail('capcut-email-input', 'Email CapCut Tidak Valid', 'Masukkan alamat email aktif untuk aktivasi CapCut Pro.');
  }

  return true;
}

export function checkoutWhatsAppCart() {
  if (CartStore.items.length === 0) {
    showToast('Keranjang Kosong', 'Tambahkan minimal 1 paket sebelum checkout.', 'warning');
    return;
  }

  const buyerNameInput = document.getElementById('buyer-name-input');
  const buyerNotesInput = document.getElementById('buyer-notes-input');
  const netflixPhoneInput = document.getElementById('netflix-phone-input');
  const netflixDeviceInput = document.getElementById('netflix-device-input');
  const netflixLocationInput = document.getElementById('netflix-location-input');
  const canvaEmailInput = document.getElementById('canva-email-input');
  const bstationEmailInput = document.getElementById('bstation-email-input');
  const capcutEmailInput = document.getElementById('capcut-email-input');

  const buyerName = ((buyerNameInput?.value ?? CartStore.buyerName) || '').trim().slice(0, 100);
  const buyerNotes = ((buyerNotesInput?.value ?? CartStore.buyerNotes) || '').trim().slice(0, 500);

  const extraData = {
    netflixPhone: ((netflixPhoneInput?.value ?? CartStore.extraData.netflixPhone) || '').trim().slice(0, 20),
    netflixDevice: ((netflixDeviceInput?.value ?? CartStore.extraData.netflixDevice) || '').trim().slice(0, 100),
    netflixLocation: ((netflixLocationInput?.value ?? CartStore.extraData.netflixLocation) || '').trim().slice(0, 80),
    canvaEmail: ((canvaEmailInput?.value ?? CartStore.extraData.canvaEmail) || '').trim().slice(0, 254),
    bstationEmail: ((bstationEmailInput?.value ?? CartStore.extraData.bstationEmail) || '').trim().slice(0, 254),
    capcutEmail: ((capcutEmailInput?.value ?? CartStore.extraData.capcutEmail) || '').trim().slice(0, 254)
  };

  if (!validateCheckoutInputs(extraData)) return;

  const orderCode = 'CZ-' + Math.floor(1000 + Math.random() * 9000);
  const message = formatStructuredWhatsAppMessage(
    CartStore.items,
    buyerName,
    buyerNotes,
    extraData,
    orderCode
  );

  const waUrl = `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
  safeOpenWhatsApp(waUrl);
}

export function clearAllCart() {
  if (confirm('Apakah Anda yakin ingin mengosongkan semua item di keranjang belanja?')) {
    CartStore.clearCart();
  }
}

function handleDrawerFocusTrap(e) {
  const root = document.getElementById('cart-drawer-root');
  if (!root || !root.classList.contains('drawer-open')) return;

  if (e.key === 'Escape') {
    closeCartDrawer();
    return;
  }

  if (e.key !== 'Tab') return;
  const panel = document.getElementById('cart-drawer-panel');
  if (!panel) return;
  const focusables = Array.from(
    panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
  ).filter((el) => el.offsetParent !== null);

  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export function initCart(products) {
  productsRef = Array.isArray(products) ? products : [];
  CartStore.init();

  document.querySelectorAll('[data-open-cart]').forEach((btn) => {
    btn.addEventListener('click', toggleCartDrawer);
  });

  const backdrop = document.getElementById('cart-drawer-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeCartDrawer);

  document.querySelectorAll('[data-close-cart]').forEach((btn) => {
    btn.addEventListener('click', closeCartDrawer);
  });

  const clearBtn = document.getElementById('clear-cart-btn');
  if (clearBtn) clearBtn.addEventListener('click', clearAllCart);

  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', checkoutWhatsAppCart);

  const copyWaBtn = document.getElementById('copy-wa-number-btn');
  if (copyWaBtn) {
    copyWaBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(WA_ADMIN_NUMBER);
        showToast('Nomor Disalin', 'Nomor WhatsApp Admin (0878-6248-1038) disalin ke clipboard.');
      } catch {
        showToast('Nomor Admin', 'WhatsApp Admin: 0878-6248-1038', 'info');
      }
    });
  }

  const listContainer = document.getElementById('cart-items-list');
  if (listContainer) {
    listContainer.addEventListener('click', (e) => {
      const qtyBtn = e.target.closest('[data-cart-qty]');
      if (qtyBtn) {
        CartStore.updateQuantity(
          qtyBtn.getAttribute('data-cart-qty'),
          Number(qtyBtn.getAttribute('data-delta'))
        );
        return;
      }
      const removeBtn = e.target.closest('[data-cart-remove]');
      if (removeBtn) {
        CartStore.removeItem(removeBtn.getAttribute('data-cart-remove'));
      }
    });
  }

  const buyerNameInput = document.getElementById('buyer-name-input');
  if (buyerNameInput) {
    buyerNameInput.addEventListener('input', (e) => CartStore.setBuyerInfo('buyerName', e.target.value));
  }

  const buyerNotesInput = document.getElementById('buyer-notes-input');
  if (buyerNotesInput) {
    buyerNotesInput.addEventListener('input', (e) => CartStore.setBuyerInfo('buyerNotes', e.target.value));
  }

  const dynamicFields = document.getElementById('dynamic-app-fields');
  if (dynamicFields) {
    dynamicFields.addEventListener('input', (e) => {
      const key = e.target.getAttribute('data-extra-field');
      if (key) CartStore.setExtraData(key, e.target.value);
    });
  }

  document.addEventListener('keydown', handleDrawerFocusTrap);
}
