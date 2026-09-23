/**
 * Comprehensive Automated Test Suite for Cozu Store:
 * Cart Module, Netflix Device Management, Account Emails, Professional WhatsApp Receipt, & Category Filter/Sorting Engine
 */
const assert = require('assert');

// Mock browser environment
let mockLocalStorage = {};
global.localStorage = {
    getItem: (key) => mockLocalStorage[key] || null,
    setItem: (key, val) => { mockLocalStorage[key] = String(val); },
    removeItem: (key) => { delete mockLocalStorage[key]; },
    clear: () => { mockLocalStorage = {}; }
};

global.document = {
    getElementById: (id) => ({
        classList: {
            add: () => {},
            remove: () => {},
            contains: () => false
        },
        value: '',
        textContent: '',
        innerHTML: '',
        disabled: false
    }),
    createElement: () => ({
        classList: { add: () => {}, remove: () => {} },
        appendChild: () => {}
    })
};

global.window = {
    open: (url) => { lastOpenedUrl = url; }
};

let lastOpenedUrl = '';

// Test Mock Apps Data
const mockAppsData = [
    {
        id: "netflix",
        name: "Netflix",
        category: "streaming",
        popularityScore: 100,
        plans: [
            {
                name: "Sharing 1 Profile",
                durations: {
                    daily: { price: "Rp 6.000" },
                    weekly: { price: "Rp 16.000" },
                    monthly: { price: "Rp 40.000" }
                }
            }
        ]
    },
    {
        id: "canva",
        name: "Canva",
        category: "design",
        popularityScore: 95,
        plans: [
            {
                name: "Canva Pro (Tim)",
                durations: {
                    monthly: { price: "Rp 4.000" }
                }
            },
            {
                name: "Canva Pro Design (Tim)",
                durations: {
                    monthly: { price: "Rp 5.000" }
                }
            }
        ]
    },
    {
        id: "bstation",
        name: "Bstation",
        category: "streaming",
        popularityScore: 85,
        plans: [
            {
                name: "Sharing 6 Members",
                durations: {
                    monthly: { price: "Rp 8.000" }
                }
            }
        ]
    },
    {
        id: "capcut",
        name: "Capcut",
        category: "design",
        popularityScore: 90,
        plans: [
            {
                name: "Sharing 2U (Khusus Android)",
                durations: {
                    weekly: { price: "Rp 12.000" },
                    monthly: { price: "Rp 25.000" }
                }
            },
            {
                name: "Private",
                durations: {
                    monthly: { price: "Rp 42.000" }
                }
            }
        ]
    }
];

// Core utilities under test
function getIndonesianDate(date = new Date()) {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const d = date.getDate();
    const m = months[date.getMonth()];
    const y = date.getFullYear();
    return `${d} ${m} ${y}`;
}

function parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr || typeof priceStr !== 'string') return 0;
    const cleanNum = priceStr.replace(/[^0-9]/g, '');
    return parseInt(cleanNum, 10) || 0;
}

function formatRupiah(num) {
    return 'Rp ' + (num || 0).toLocaleString('id-ID');
}

function escapeHtml(str) {
    if (!str || typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getMinPrice(app) {
    if (!app || !Array.isArray(app.plans)) return 0;
    let min = Infinity;
    app.plans.forEach(plan => {
        if (plan.durations) {
            Object.values(plan.durations).forEach(dur => {
                const p = parsePrice(dur.price);
                if (p > 0 && p < min) min = p;
            });
        }
    });
    return min === Infinity ? 0 : min;
}

function getMaxPrice(app) {
    if (!app || !Array.isArray(app.plans)) return 0;
    let max = 0;
    app.plans.forEach(plan => {
        if (plan.durations) {
            Object.values(plan.durations).forEach(dur => {
                const p = parsePrice(dur.price);
                if (p > max) max = p;
            });
        }
    });
    return max;
}

function filterAndSortApps(apps, activeCategory = 'all', searchQuery = '', activeSort = 'popular') {
    let results = [...apps];

    // 1. Category Filter
    if (activeCategory !== 'all') {
        results = results.filter(app => app.category === activeCategory);
    }

    // 2. Search Keyword Filter
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        results = results.filter(app => 
            app.name.toLowerCase().includes(q) ||
            (app.category && app.category.toLowerCase().includes(q)) ||
            app.plans.some(p => 
                p.name.toLowerCase().includes(q) ||
                Object.values(p.durations).some(d => 
                    (d.description && d.description.toLowerCase().includes(q)) ||
                    (d.features && d.features.some(f => f.toLowerCase().includes(q)))
                )
            )
        );
    }

    // 3. Sorting Engine
    if (activeSort === 'price-low') {
        results.sort((a, b) => getMinPrice(a) - getMinPrice(b));
    } else if (activeSort === 'price-high') {
        results.sort((a, b) => getMaxPrice(b) - getMaxPrice(a));
    } else if (activeSort === 'name-asc') {
        results.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        // 'popular'
        results.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
    }

    return results;
}

const CartStore = {
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
                if (typeof parsed.buyerName === 'string') this.buyerName = parsed.buyerName;
                if (typeof parsed.buyerNotes === 'string') this.buyerNotes = parsed.buyerNotes;
                if (parsed.extraData && typeof parsed.extraData === 'object') {
                    this.extraData = { ...this.extraData, ...parsed.extraData };
                }
            }
        } catch (e) {}
    },

    setExtraData(key, value) {
        this.extraData[key] = value;
        this.saveStorageOnly();
    },

    setBuyerInfo(key, value) {
        if (key === 'buyerName') this.buyerName = value;
        if (key === 'buyerNotes') this.buyerNotes = value;
        this.saveStorageOnly();
    },

    saveStorageOnly() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
                items: this.items,
                buyerName: this.buyerName,
                buyerNotes: this.buyerNotes,
                extraData: this.extraData
            }));
        } catch (e) {}
    },

    save() {
        this.saveStorageOnly();
    },

    addItem(product) {
        const itemId = `${product.appId}-${product.planName}-${product.durationKey}`.replace(/\s+/g, '-').toLowerCase();
        const existingIndex = this.items.findIndex(i => i.id === itemId);

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
                appColor: product.appColor,
                planName: product.planName,
                durationKey: product.durationKey,
                durationLabel: product.durationLabel,
                rawPrice: product.price,
                unitPrice: unitPrice,
                quantity: 1
            });
        }
        this.save();
    },

    removeItem(itemId) {
        this.items = this.items.filter(i => i.id !== itemId);
        this.save();
    },

    updateQuantity(itemId, delta) {
        const item = this.items.find(i => i.id === itemId);
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
        this.items = [];
        this.save();
    },

    getTotalCount() {
        return this.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    },

    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + ((item.unitPrice || 0) * (item.quantity || 1)), 0);
    }
};

/**
 * WhatsApp Digital Receipt Engine
 */
function formatStructuredWhatsAppMessage(cartItems, buyerName, buyerNotes, extraData, orderCode, overrideDate = null) {
    const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + ((item.unitPrice || 0) * (item.quantity || 1)), 0);
    const orderDate = overrideDate || getIndonesianDate();

    let itemsText = cartItems.map((item, index) => {
        const itemSubtotal = formatRupiah(item.unitPrice * item.quantity);
        return `${index + 1}. *${item.appName}* — ${item.planName}\n` +
               `   └ *Durasi:* ${item.durationLabel || item.durationKey}\n` +
               `   └ *Qty:* ${item.quantity} × ${item.rawPrice} = *${itemSubtotal}*`;
    }).join('\n');

    let sections = [];

    // 1. Header & Order Metadata
    let headerText = `*─── COZU STORE | ORDER FORM ───*\n\n` +
                     `Halo Admin, saya ingin melakukan pemesanan akun premium dengan rincian berikut:\n\n` +
                     `🔖 *ID Pesanan:* ${orderCode}\n` +
                     (buyerName ? `👤 *Nama Customer:* ${buyerName}\n` : '') +
                     `📅 *Tanggal:* ${orderDate}`;
    sections.push(headerText);

    // 2. Products Section
    let productSection = `📦 *RINCIAN PESANAN*\n${itemsText}`;
    sections.push(productSection);

    // 3. Netflix Device Management Block
    const netflixItem = cartItems.find(i => i.appId === 'netflix');
    if (netflixItem) {
        const netflixPhone = (extraData && extraData.netflixPhone) ? extraData.netflixPhone : '-';
        const netflixDevice = (extraData && extraData.netflixDevice) ? extraData.netflixDevice : '-';
        const netflixLocation = (extraData && extraData.netflixLocation) ? extraData.netflixLocation : '-';
        const durationStr = netflixItem.durationLabel || netflixItem.durationKey;

        let netflixBlock = `📱 *NETFLIX DEVICE MANAGEMENT*\n\n` +
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

    // 4. Email Data for Canva, Bstation, CapCut
    const emailEntries = [];
    if (cartItems.some(i => i.appId === 'canva') && extraData && extraData.canvaEmail) {
        emailEntries.push(`• *Canva Pro:* ${extraData.canvaEmail}`);
    }
    if (cartItems.some(i => i.appId === 'bstation') && extraData && extraData.bstationEmail) {
        emailEntries.push(`• *Bstation:* ${extraData.bstationEmail}`);
    }
    if (cartItems.some(i => i.appId === 'capcut') && extraData && extraData.capcutEmail) {
        emailEntries.push(`• *CapCut:* ${extraData.capcutEmail}`);
    }

    if (emailEntries.length > 0) {
        let emailSection = `📧 *DATA EMAIL AKUN*\n${emailEntries.join('\n')}`;
        sections.push(emailSection);
    }

    // 5. Buyer Notes
    if (buyerNotes) {
        let notesSection = `📝 *CATATAN TAMBAHAN*\n${buyerNotes}`;
        sections.push(notesSection);
    }

    // 6. Total Payment & Footer CTA
    let footerSection = `💳 *TOTAL PEMBAYARAN: ${formatRupiah(totalPrice)}*\n` +
                        `_(Total: ${totalCount} Item Produk)_\n\n` +
                        `Mohon info metode pembayaran / QRIS untuk segera saya selesaikan. Terima kasih! ✨`;
    sections.push(footerSection);

    // Join sections cleanly with single, uniform dividers
    return sections.join('\n\n━━━━━━━━━━━━━━━━━━━━\n\n');
}

// ==================== TEST SUITES ====================
let passCount = 0;
let failCount = 0;

function runTest(name, fn) {
    try {
        fn();
        console.log(`✅ [PASS] ${name}`);
        passCount++;
    } catch (err) {
        console.error(`❌ [FAIL] ${name}:`, err.message);
        failCount++;
    }
}

console.log('--- STARTING COZU STORE VERIFICATION SUITE ---');

// Suite 1: Utility functions
runTest('parsePrice correctly parses Rupiah strings', () => {
    assert.strictEqual(parsePrice('Rp 40.000'), 40000);
    assert.strictEqual(parsePrice('Rp 16.000'), 16000);
    assert.strictEqual(parsePrice('Rp 5.000'), 5000);
    assert.strictEqual(parsePrice(''), 0);
});

runTest('formatRupiah correctly formats numbers to IDR', () => {
    assert.strictEqual(formatRupiah(40000).replace(/\s/g, ' '), 'Rp 40.000');
    assert.strictEqual(formatRupiah(16000).replace(/\s/g, ' '), 'Rp 16.000');
});

runTest('escapeHtml sanitizes special characters to prevent XSS', () => {
    const malicious = '<script>alert("XSS")</script>&"\'';
    const escaped = escapeHtml(malicious);
    assert.strictEqual(escaped.includes('<script>'), false);
    assert.strictEqual(escaped.includes('&lt;script&gt;'), true);
});

runTest('getIndonesianDate produces proper Indonesian date format', () => {
    const fixedDate = new Date(2026, 7, 15);
    const result = getIndonesianDate(fixedDate);
    assert.strictEqual(result, '15 Agustus 2026');

    const todayDate = getIndonesianDate();
    assert.strictEqual(typeof todayDate, 'string');
    assert.strictEqual(todayDate.split(' ').length, 3);
});

// Suite 2: Price Calculation Helpers
runTest('getMinPrice and getMaxPrice compute correct boundary prices across plans', () => {
    const netflixApp = mockAppsData.find(a => a.id === 'netflix');
    const canvaApp = mockAppsData.find(a => a.id === 'canva');
    const capcutApp = mockAppsData.find(a => a.id === 'capcut');

    assert.strictEqual(getMinPrice(netflixApp), 6000);
    assert.strictEqual(getMaxPrice(netflixApp), 40000);

    assert.strictEqual(getMinPrice(canvaApp), 4000);
    assert.strictEqual(getMaxPrice(canvaApp), 5000);

    assert.strictEqual(getMinPrice(capcutApp), 12000);
    assert.strictEqual(getMaxPrice(capcutApp), 42000);
});

// Suite 3: Category Filtering Engine
runTest('filterAndSortApps filters correctly by category', () => {
    const allApps = filterAndSortApps(mockAppsData, 'all');
    assert.strictEqual(allApps.length, 4);

    const streamingApps = filterAndSortApps(mockAppsData, 'streaming');
    assert.strictEqual(streamingApps.length, 2);
    assert.strictEqual(streamingApps.map(a => a.id).includes('netflix'), true);
    assert.strictEqual(streamingApps.map(a => a.id).includes('bstation'), true);

    const designApps = filterAndSortApps(mockAppsData, 'design');
    assert.strictEqual(designApps.length, 2);
    assert.strictEqual(designApps.map(a => a.id).includes('canva'), true);
    assert.strictEqual(designApps.map(a => a.id).includes('capcut'), true);

    const emptyCategory = filterAndSortApps(mockAppsData, 'music');
    assert.strictEqual(emptyCategory.length, 0);
});

// Suite 4: Smart Sorting Engine
runTest('filterAndSortApps sorts apps by price-low, price-high, and alphabetical', () => {
    // Price low: Canva (4k), Netflix (6k), Bstation (8k), Capcut (12k)
    const priceLow = filterAndSortApps(mockAppsData, 'all', '', 'price-low');
    assert.strictEqual(priceLow[0].id, 'canva');
    assert.strictEqual(priceLow[1].id, 'netflix');
    assert.strictEqual(priceLow[2].id, 'bstation');
    assert.strictEqual(priceLow[3].id, 'capcut');

    // Price high: Capcut (42k), Netflix (40k), Bstation (8k), Canva (5k)
    const priceHigh = filterAndSortApps(mockAppsData, 'all', '', 'price-high');
    assert.strictEqual(priceHigh[0].id, 'capcut');
    assert.strictEqual(priceHigh[1].id, 'netflix');

    // Name A-Z: Bstation, Canva, Capcut, Netflix
    const nameAsc = filterAndSortApps(mockAppsData, 'all', '', 'name-asc');
    assert.strictEqual(nameAsc[0].id, 'bstation');
    assert.strictEqual(nameAsc[1].id, 'canva');
    assert.strictEqual(nameAsc[2].id, 'capcut');
    assert.strictEqual(nameAsc[3].id, 'netflix');
});

// Suite 5: Combined Search + Category Filter
runTest('filterAndSortApps filters correctly with combined category and search query', () => {
    const searchInStreaming = filterAndSortApps(mockAppsData, 'streaming', 'anime');
    assert.strictEqual(searchInStreaming.length, 0); // anime in bstation desc

    const searchCanva = filterAndSortApps(mockAppsData, 'all', 'canva');
    assert.strictEqual(searchCanva.length, 1);
    assert.strictEqual(searchCanva[0].id, 'canva');
});

// Suite 6: CartStore State & Mutations
runTest('CartStore.setExtraData preserves continuous typing without losing state', () => {
    mockLocalStorage = {};
    CartStore.items = [];
    CartStore.extraData = { netflixPhone: '', netflixDevice: '', netflixLocation: '', canvaEmail: '', bstationEmail: '', capcutEmail: '' };

    const word = 'Laptop Asus Vivobook';
    for (let i = 1; i <= word.length; i++) {
        CartStore.setExtraData('netflixDevice', word.substring(0, i));
        assert.strictEqual(CartStore.extraData.netflixDevice, word.substring(0, i));
    }

    assert.strictEqual(CartStore.extraData.netflixDevice, 'Laptop Asus Vivobook');
    const saved = JSON.parse(mockLocalStorage[CartStore.STORAGE_KEY]);
    assert.strictEqual(saved.extraData.netflixDevice, 'Laptop Asus Vivobook');
});

runTest('CartStore adds item and updates quantity & totals', () => {
    CartStore.items = [];
    CartStore.addItem({
        appId: 'netflix',
        appName: 'Netflix',
        planName: 'Sharing 1 Profile',
        durationKey: 'weekly',
        durationLabel: '1 minggu',
        price: 'Rp 16.000'
    });

    assert.strictEqual(CartStore.items.length, 1);
    assert.strictEqual(CartStore.getTotalCount(), 1);
    assert.strictEqual(CartStore.getTotalPrice(), 16000);
});

// Suite 7: Professional WhatsApp Digital Receipt Formatting
runTest('formatStructuredWhatsAppMessage generates clean receipt header, tree structure, and Netflix Device Management', () => {
    const items = [
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
    ];

    const extraData = {
        netflixPhone: '085854577353',
        netflixDevice: 'laptop asus vivobook',
        netflixLocation: 'surabaya'
    };

    const message = formatStructuredWhatsAppMessage(
        items,
        'Ann Customer',
        'Tolong proses cepat',
        extraData,
        'CZ-8821',
        '18 Agustus 2026'
    );

    assert.strictEqual(message.includes('*─── COZU STORE | ORDER FORM ───*'), true);
    assert.strictEqual(message.includes('🔖 *ID Pesanan:* CZ-8821'), true);
    assert.strictEqual(message.includes('1. *Netflix* — Sharing 1 Profile'), true);
    assert.strictEqual(message.includes('└ *Durasi:* 1 minggu'), true);
    assert.strictEqual(message.includes('📱 *NETFLIX DEVICE MANAGEMENT*'), true);
    assert.strictEqual(message.includes('🌷 nomor customer :  085854577353'), true);
    assert.strictEqual(message.includes('✿ wajib diisi 1x24 jam, selebihnya maka no garansi'), true);
    assert.strictEqual(message.includes('💳 *TOTAL PEMBAYARAN: Rp 16.000*'), true);
});

console.log(`\n--- ALL TEST CASES COMPLETED: ${passCount} PASSED, ${failCount} FAILED ---`);
if (failCount > 0) {
    process.exit(1);
}
