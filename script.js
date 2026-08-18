/**
 * COZU STORE - DATA CONFIGURATION
 * Anda bisa menambah aplikasi, mengubah harga, dan deskripsi di sini.
 */
const appsData = [
    {
        id: "netflix",
        name: "Netflix",
        category: "streaming",
        popularityScore: 100,
        icon: "fa-solid fa-play",
        color: "#E50914",
        plans: [
            {
                name: "Sharing 1 Profile",
                durations: {
                    daily: {
                        price: "Rp 6.000",
                        description: "Cocok untuk coba-coba singkat & nobar harian.",
                        features: ["Ultra HD 4K", "1 User / 1 Profile", "Login 1 Device (Tidak boleh pindah device)", "Less Limit", "Garansi aktivasi"],
                    },
                    weekly: {
                        price: "Rp 16.000",
                        description: "Marathon series favoritmu tanpa khawatir habis dalam sehari.",
                        features: ["Ultra HD 4K", "1 User / 1 Profile", "Login 1 Device (Tidak boleh pindah device)", "Less Limit", "Full Garansi", "Durasi 7 Hari"],
                    },
                },
                bestSeller: false
            },
            {
                name: "Sharing 1 Profile",
                durations: {
                    monthly: {
                        price: "Rp 40.000",
                        description: "Pilihan paling hemat & populer untuk penggunaan rutin harian.",
                        features: ["Ultra HD 4K", "1 User / 1 Profile", "Login 1 Device (Tidak boleh pindah device)", "Less Limit", "Full Garansi", "Durasi 25 - 30 Hari"],
                    },
                },
                bestSeller: true
            },
            {
                name: "Semi Private 1 Profile",
                durations: {
                    monthly: {
                        price: "Rp 45.000",
                        description: "Akses lebih fleksibel dengan kemampuan login di 2 device sekaligus.",
                        features: ["Ultra HD 4K", "1 User / 1 Profile", "Bisa Login 2 Device", "Anti On-Hold & Less Limit", "Full Garansi", "Durasi 25 - 30 Hari"],
                    },
                },
                bestSeller: false
            },
        ]
    },
    {
        id: "canva",
        name: "Canva",
        category: "design",
        popularityScore: 95,
        icon: "fa-solid fa-palette",
        color: "#00C4CC",
        plans: [
            {
                name: "Canva Pro (Tim)",
                durations: {
                    monthly: {
                        price: "Rp 4.000",
                        description: "Paket standar untuk individu dengan akses penuh ke ratusan juta aset Pro.",
                        features: ["Akses 100M+ Foto & Video Premium", "Magic Studio & AI Tools Lengkap", "Undang & Gabung via Link", "Garansi Durasi Penuh"],
                    },
                },
                bestSeller: false
            },
            {
                name: "Canva Pro Design (Tim)",
                durations: {
                    monthly: {
                        price: "Rp 5.000",
                        description: "Akses Pro dengan fitur kontrol desain & brand kit lengkap.",
                        features: ["Semua Fitur Canva Pro", "Upload Custom Font Sendiri", "Brand Kit & Custom Color Palette", "Magic Switch & Resizer", "Garansi Durasi Penuh"],
                    },
                },
                bestSeller: true
            },
        ]
    },
    {
        id: "bstation",
        name: "Bstation",
        category: "streaming",
        popularityScore: 85,
        icon: "fa-solid fa-video",
        color: "#00A1D6",
        plans: [
            {
                name: "Sharing 6 Members",
                durations: {
                    monthly: {
                        price: "Rp 8.000",
                        description: "Nonton anime & drama favorit bebas iklan dengan resolusi tertinggi.",
                        features: ["Bebas Iklan Selamanya", "Akses Konten VIP & Premiere", "Login 1 Device", "Streaming Full HD 1080p", "Garansi Full 30 Hari"],
                    },
                },
                bestSeller: true
            },
        ]
    },
    {
        id: "capcut",
        name: "Capcut",
        category: "design",
        popularityScore: 90,
        icon: "fa-solid fa-scissors",
        color: "#1e293b",
        plans: [
            {
                name: "Sharing 2U (Khusus Android)",
                durations: {
                    weekly: {
                        price: "Rp 12.000",
                        description: "Akses semua fitur premium CapCut dengan mudah.",
                        features: ["Semua Fitur CapCut Pro", "Template Eksklusif", "Bebas Watermark", "Fitur AI Terbaru", "Durasi 7 Hari", "Full Garansi"],
                    },
                },
                bestSeller: false
            },
            {
                name: "Private",
                durations: {
                    weekly: {
                        price: "Rp 18.000",
                        description: "Akses semua fitur premium CapCut dengan mudah.",
                        features: ["Semua Fitur CapCut Pro", "Template Eksklusif", "Bebas Watermark", "Fitur AI Terbaru", "Durasi 7 Hari", "Garansi 6 Hari"],
                    },
                },
                bestSeller: true
            },
            {
                name: "Sharing 2U (Khusus Android)",
                durations: {
                    monthly: {
                        price: "Rp 25.000",
                        description: "Akses semua fitur premium CapCut dengan mudah.",
                        features: ["Semua Fitur CapCut Pro", "Template Eksklusif", "Bebas Watermark", "Fitur AI Terbaru", "Durasi 25-30 Hari", "Full Garansi"],
                    },
                },
                bestSeller: false
            },
            {
                name: "Private",
                durations: {
                    monthly: {
                        price: "Rp 42.000",
                        description: "Akses semua fitur premium CapCut dengan mudah.",
                        features: ["Semua Fitur CapCut Pro", "Template Eksklusif", "Bebas Watermark", "Fitur AI Terbaru", "Durasi 25-30 Hari", "Full Garansi"],
                    },
                },
                bestSeller: false
            }
        ]
    }
];

const categoriesData = [
    { id: 'all', name: 'Semua Aplikasi', icon: 'fa-solid fa-layer-group' },
    { id: 'streaming', name: 'Streaming Video', icon: 'fa-solid fa-play' },
    { id: 'design', name: 'Desain & Editing', icon: 'fa-solid fa-palette' },
    { id: 'music', name: 'Musik & Audio', icon: 'fa-solid fa-music' },
    { id: 'productivity', name: 'AI & Produktivitas', icon: 'fa-solid fa-brain' }
];

let currentApp = appsData[0].id;
let activeCategory = 'all';
let activeSort = 'popular';
let searchQuery = "";

const durationLabels = {
    daily: {
        label: 'Harian',
        unit: 'hari'
    },
    weekly: {
        label: 'Mingguan',
        unit: 'minggu'
    },
    monthly: {
        label: 'Bulanan',
        unit: 'bulan'
    }
};

/**
 * Helper: Ambil harga minimum dari seluruh plan suatu aplikasi
 */
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

/**
 * Helper: Ambil harga maksimum dari seluruh plan suatu aplikasi
 */
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

/**
 * Utility: Mengubah HEX ke RGBA untuk background lembut dinamis
 */
function hexToRgba(hex, alpha = 0.1) {
    let c = hex.replace('#', '');
    if (c.length === 3) {
        c = c.split('').map(x => x + x).join('');
    }
    if (c.length >= 6) {
        const r = parseInt(c.substring(0, 2), 16);
        const g = parseInt(c.substring(2, 4), 16);
        const b = parseInt(c.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgba(30, 41, 59, ${alpha})`;
}

/**
 * Update Dynamic Branding Color Theme
 */
function updateBrandTheme(app) {
    if (!app) return;
    const root = document.documentElement;
    root.style.setProperty('--brand-color', app.color);
    root.style.setProperty('--brand-color-bg', hexToRgba(app.color, 0.09));
}

/**
 * Filter and Sort Engine Terpadu
 * (Filter Kategori -> Filter Keyword Pencarian -> Sort Algorithm)
 */
function getFilteredAndSortedApps() {
    let results = [...appsData];

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

// Backward compatibility alias
function getFilteredApps() {
    return getFilteredAndSortedApps();
}

/**
 * Render Category Filter Pills dengan Product Counter
 */
function renderCategoryPills() {
    const container = document.getElementById('category-filter-pills');
    if (!container) return;

    // Hitung jumlah aplikasi per kategori
    const counts = {};
    counts['all'] = appsData.length;
    categoriesData.forEach(c => {
        if (c.id !== 'all') {
            counts[c.id] = appsData.filter(a => a.category === c.id).length;
        }
    });

    container.innerHTML = categoriesData
        .filter(c => c.id === 'all' || (counts[c.id] || 0) > 0)
        .map(c => {
            const isActive = activeCategory === c.id;
            const count = counts[c.id] || 0;
            return `
                <button
                    type="button"
                    onclick="setCategory('${c.id}')"
                    class="category-pill flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold border transition ${
                        isActive 
                        ? 'active bg-slate-900 text-white border-slate-900' 
                        : 'bg-white text-slate-700 border-slate-200/90 shadow-2xs hover:bg-slate-50'
                    }"
                >
                    <i class="${c.icon} text-xs ${isActive ? 'text-white' : 'text-slate-500'}"></i>
                    <span>${c.name}</span>
                    <span class="pill-count px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }">
                        ${count}
                    </span>
                </button>
            `;
        }).join('');
}

/**
 * Handler Ganti Kategori
 */
function setCategory(catId) {
    activeCategory = catId;
    renderCategoryPills();
    updateAppView();
}   
/**
 * Update Tampilan Aplikasi Setelah Filter Berubah
 */
function updateAppView() {
    const filtered = getFilteredAndSortedApps();
    if (filtered.length > 0 && !filtered.some(a => a.id === currentApp)) {
        currentApp = filtered[0].id;
    }
    renderTabs();
    renderCards();
}

/**
 * Reset Semua Filter (Kategori dan Pencarian)
 */
function resetAllFilters() {
    activeCategory = 'all';
    searchQuery = '';

    const searchInput = document.getElementById('app-search');
    const clearBtn = document.getElementById('clear-search');

    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');

    renderCategoryPills();
    updateAppView();
}

/**
 * Render Navigasi Tab Aplikasi
 */
function renderTabs() {
    const tabsContainer = document.getElementById('app-tabs');
    const filtered = getFilteredAndSortedApps();

    if (!tabsContainer) return;

    if (filtered.length === 0) {
        tabsContainer.innerHTML = '';
        return;
    }

    tabsContainer.innerHTML = filtered.map(app => {
        const isActive = currentApp === app.id;
        return `
            <button onclick="setApp('${app.id}')" 
                    id="tab-btn-${app.id}"
                    style="${isActive ? `border-color: ${app.color}; color: ${app.color};` : ''}"
                    class="whitespace-nowrap px-3 sm:px-4 py-2.5 font-semibold text-sm sm:text-base transition-all rounded-t-lg flex items-center gap-2 ${
                        isActive 
                            ? 'tab-active' 
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 border-b-2 border-transparent'
                    }">
                <i class="${app.icon} text-base" style="${isActive ? `color: ${app.color};` : ''}"></i>
                <span>${app.name}</span>
            </button>
        `;
    }).join('');
}

/**
 * Set Aplikasi Aktif & Sinkronisasi Deep Linking (URL Hash)
 */
function setApp(appId, updateHash = true) {
    const app = appsData.find(a => a.id === appId);
    if (!app) return;

    currentApp = appId;
    updateBrandTheme(app);

    if (updateHash && window.location.hash !== `#${appId}`) {
        history.replaceState(null, null, `#${appId}`);
    }

    renderTabs();
    renderCards();
}

/**
 * Render Kartu Harga untuk Aplikasi Terpilih
 */
function renderCards() {
    const container = document.getElementById('pricing-container');
    const emptyState = document.getElementById('empty-state');
    if (!container) return;

    const filtered = getFilteredApps();

    if (filtered.length === 0) {
        container.innerHTML = '';
        container.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    container.classList.remove('hidden');

    let selectedAppData = filtered.find(app => app.id === currentApp);
    if (!selectedAppData) {
        selectedAppData = filtered[0];
        currentApp = selectedAppData.id;
        updateBrandTheme(selectedAppData);
        renderTabs();
    }

    const appColor = selectedAppData.color;
    const appSoftBg = hexToRgba(appColor, 0.08);

    const planCards = selectedAppData.plans.flatMap(plan => {
        return Object.entries(plan.durations).map(([durationKey, durationData]) => {
            const isBest = plan.bestSeller;
            const durationLabel = durationLabels[durationKey]?.label || durationKey;
            return `
                <div class="relative bg-white rounded-3xl border ${isBest ? 'border-2' : 'border border-slate-200/90'} p-6 sm:p-8 card-shadow card-hover flex flex-col justify-between animate-fade-in"
                     style="${isBest ? `border-color: ${appColor};` : ''}">
                    
                    ${isBest ? `
                        <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5"
                              style="background-color: ${appColor};">
                            <i class="fa-solid fa-fire text-amber-300"></i> Paling Laris
                        </span>
                    ` : ''}

                    <div>
                        <!-- Header Card -->
                        <div class="flex items-center justify-between gap-2 mb-3">
                            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100">
                                ${durationLabel}
                            </span>
                            <span class="text-xs font-medium text-slate-400">
                                <i class="${selectedAppData.icon} mr-1" style="color: ${appColor};"></i> ${selectedAppData.name}
                            </span>
                        </div>

                        <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">${plan.name}</h3>
                        
                        <div class="mt-4 pb-4 border-b border-slate-100 flex items-baseline">
                            <span class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">${durationData.price}</span>
                            <span class="ml-1.5 text-slate-500 text-xs sm:text-sm font-medium">/${durationLabels[durationKey]?.unit || durationKey}</span>
                        </div>

                        ${durationData.description ? `
                            <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[40px]">${durationData.description}</p>
                        ` : ''}

                        <!-- List Fitur -->
                        <div class="mt-5 mb-8">
                            <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Fitur Termasuk:</p>
                            <ul class="space-y-3">
                                ${(durationData.features || []).map(feat => `
                                    <li class="flex items-start text-xs sm:text-sm text-slate-700">
                                        <i class="fa-solid fa-circle-check mt-0.5 mr-2.5 flex-shrink-0 text-emerald-500"></i>
                                        <span class="leading-snug">${feat}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- Tombol Aksi: + Keranjang & Beli Sekarang -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button onclick="addToCart('${selectedAppData.id}', '${plan.name.replace(/'/g, "\\'")}', '${durationData.price}', '${durationKey}', '${durationLabel}')" 
                                style="background-color: ${appSoftBg}; color: ${appColor}; border-color: ${appColor};"
                                class="w-full py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm border border-transparent hover:border-current transition-all transform active:scale-[0.98] shadow-xs flex items-center justify-center gap-1.5">
                            <i class="fa-solid fa-cart-plus text-sm"></i>
                            <span>+ Keranjang</span>
                        </button>
                        <button onclick="directBuy('${selectedAppData.id}', '${plan.name.replace(/'/g, "\\'")}', '${durationData.price}', '${durationKey}', '${durationLabel}')" 
                                style="${isBest ? `background-color: ${appColor}; color: #ffffff;` : `background-color: #0f172a; color: #ffffff;`}"
                                class="w-full py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm transition-all transform active:scale-[0.98] shadow-sm flex items-center justify-center gap-1.5 hover:opacity-90">
                            <i class="fa-brands fa-whatsapp text-sm"></i>
                            <span>Beli Langsung</span>
                        </button>
                    </div>
                </div>
            `;
        });
    });

    container.innerHTML = planCards.join('');
}

/**
 * Handle Order via WhatsApp dengan format pesan otomatis (Single item direct)
 */
function orderNow(app, plan, price, durationLabel) {
    const orderCode = 'CZ-' + Math.floor(1000 + Math.random() * 9000);
    const message = `Halo Admin Cozu Store, saya ingin order:\n\n` +
                    `📦 Kode Order: ${orderCode}\n` +
                    `📱 Aplikasi: ${app}\n` +
                    `⭐ Paket: ${plan}\n` +
                    `⏱️ Durasi: ${durationLabel}\n` +
                    `💰 Harga: ${price}\n\n` +
                    `Mohon diproses, terima kasih!`;
    const waUrl = `https://wa.me/6287862481038?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
}

/**
 * Kontrol Carousel Testimoni
 */
function scrollTestimonials(direction) {
    const carousel = document.getElementById('testimonial-carousel');
    if (!carousel) return;
    const scrollAmount = 380;
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

/**
 * Scroll to Top Function
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Inisialisasi Tombol Scroll to Top
 */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 320) {
            scrollBtn.classList.remove('hidden-btn');
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
            scrollBtn.classList.add('hidden-btn');
        }
    });
}

/**
 * Inisialisasi Search Bar
 */
function initSearch() {
    const searchInput = document.getElementById('app-search');
    const clearBtn = document.getElementById('clear-search');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchQuery.trim().length > 0) {
            if (clearBtn) clearBtn.classList.remove('hidden');
        } else {
            if (clearBtn) clearBtn.classList.add('hidden');
        }

        updateAppView();
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', resetSearch);
    }
}

/**
 * Reset Pencarian
 */
function resetSearch() {
    const searchInput = document.getElementById('app-search');
    const clearBtn = document.getElementById('clear-search');
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    searchQuery = '';
    updateAppView();
}

/**
 * Handle Deep Linking dari Hash URL
 */
function handleHashRoute() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash) {
        const found = appsData.find(a => a.id === hash);
        if (found) {
            setApp(found.id, false);
            return;
        }
    }
    // Default app
    setApp(appsData[0].id, false);
}

// ==========================================
// SHOPPING CART & MULTI-ITEM CHECKOUT ENGINE
// ==========================================

/**
 * Utility: Mendapatkan tanggal hari ini dalam format Bahasa Indonesia (contoh: "18 Agustus 2026")
 */
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

/**
 * Utility: Parse format harga string "Rp 40.000" menjadi angka numerik integer 40000
 */
function parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr || typeof priceStr !== 'string') return 0;
    const cleanNum = priceStr.replace(/[^0-9]/g, '');
    return parseInt(cleanNum, 10) || 0;
}

/**
 * Utility: Format angka integer menjadi format Rupiah "Rp 40.000"
 */
function formatRupiah(num) {
    return 'Rp ' + (num || 0).toLocaleString('id-ID');
}

/**
 * Utility: Escape HTML characters untuk mencegah XSS pada input pengguna
 */
function escapeHtml(str) {
    if (!str || typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Cart Store - Pengelola State Keranjang Belanja & Form Spesifik Terpusat
 */
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
        } catch (e) {
            console.warn('LocalStorage tidak tersedia, menggunakan in-memory mode:', e);
        }
        this.syncUI();
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
        } catch (e) {
            console.warn('Gagal menyimpan keranjang ke LocalStorage:', e);
        }
    },

    save() {
        this.saveStorageOnly();
        this.syncUI();
    },

    addItem(product, showNotification = true) {
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
        triggerBadgeAnimation();
        if (showNotification) {
            showToast('Berhasil Ditambahkan!', `${product.appName} (${product.planName}) telah masuk ke keranjang belanja.`);
        }
    },

    removeItem(itemId) {
        const item = this.items.find(i => i.id === itemId);
        this.items = this.items.filter(i => i.id !== itemId);
        this.save();
        if (item) {
            showToast('Item Dihapus', `${item.appName} (${item.planName}) dihapus dari keranjang.`, 'info');
        }
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
        if (this.items.length === 0) return;
        this.items = [];
        this.save();
        showToast('Keranjang Dikosongkan', 'Semua item pesanan telah dihapus.', 'info');
    },

    getTotalCount() {
        return this.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    },

    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + ((item.unitPrice || 0) * (item.quantity || 1)), 0);
    },

    syncUI() {
        updateCartBadge();
        renderCartDrawer();
        renderDynamicAppFields();
    }
};

/**
 * Handle Add to Cart dari tombol pada kartu paket
 */
function addToCart(appId, planName, price, durationKey, durationLabel) {
    const app = appsData.find(a => a.id === appId);
    if (!app) return;

    CartStore.addItem({
        appId: app.id,
        appName: app.name,
        appIcon: app.icon,
        appColor: app.color,
        planName: planName,
        durationKey: durationKey,
        durationLabel: durationLabel,
        price: price
    }, true);
}

/**
 * Handle Beli Langsung (Quick Buy Flow)
 * Menambahkan item ke cart dan langsung membuka drawer form untuk melengkapi data
 */
function directBuy(appId, planName, price, durationKey, durationLabel) {
    const app = appsData.find(a => a.id === appId);
    if (!app) return;

    CartStore.addItem({
        appId: app.id,
        appName: app.name,
        appIcon: app.icon,
        appColor: app.color,
        planName: planName,
        durationKey: durationKey,
        durationLabel: durationLabel,
        price: price
    }, false);

    openCartDrawer();

    setTimeout(() => {
        const targetInput = document.getElementById('netflix-phone-input') || 
                            document.getElementById('canva-email-input') || 
                            document.getElementById('bstation-email-input') || 
                            document.getElementById('capcut-email-input') || 
                            document.getElementById('buyer-name-input');
        if (targetInput) {
            targetInput.focus();
        }
    }, 350);
}

/**
 * Animasi Pop Badge Counter
 */
function triggerBadgeAnimation() {
    const badge = document.getElementById('cart-count-badge');
    if (badge) {
        badge.classList.remove('badge-pop');
        void badge.offsetWidth;
        badge.classList.add('badge-pop');
    }
}

/**
 * Update Status Badge Floating Cart
 */
function updateCartBadge() {
    const badge = document.getElementById('cart-count-badge');
    const totalBadge = document.getElementById('cart-total-badge');
    const drawerCount = document.getElementById('cart-drawer-count');
    const totalCount = CartStore.getTotalCount();
    const totalPrice = CartStore.getTotalPrice();

    if (badge) {
        badge.textContent = totalCount;
        if (totalCount > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    if (totalBadge) {
        totalBadge.textContent = formatRupiah(totalPrice);
    }

    if (drawerCount) {
        drawerCount.textContent = `${totalCount} item dipilih`;
    }
}

/**
 * Buka Drawer Keranjang
 */
function openCartDrawer() {
    const root = document.getElementById('cart-drawer-root');
    if (root) {
        root.classList.remove('drawer-closed');
        root.classList.add('drawer-open');
    }
}

/**
 * Tutup Drawer Keranjang
 */
function closeCartDrawer() {
    const root = document.getElementById('cart-drawer-root');
    if (root) {
        root.classList.remove('drawer-open');
        root.classList.add('drawer-closed');
    }
}

/**
 * Toggle Buka / Tutup Drawer Keranjang
 */
function toggleCartDrawer() {
    const root = document.getElementById('cart-drawer-root');
    if (root) {
        if (root.classList.contains('drawer-open')) {
            closeCartDrawer();
        } else {
            openCartDrawer();
        }
    }
}

/**
 * Render Form Fields Khusus Berdasarkan Aplikasi Terpilih
 * (Netflix Device Management, Canva Email, Bstation Email, CapCut Email)
 */
function renderDynamicAppFields() {
    const container = document.getElementById('dynamic-app-fields');
    if (!container) return;

    if (CartStore.items.length === 0) {
        container.innerHTML = '';
        return;
    }

    const hasNetflix = CartStore.items.some(i => i.appId === 'netflix');
    const hasCanva = CartStore.items.some(i => i.appId === 'canva');
    const hasBstation = CartStore.items.some(i => i.appId === 'bstation');
    const hasCapcut = CartStore.items.some(i => i.appId === 'capcut');

    let html = '';

    // 1. Netflix Device Management Section
    if (hasNetflix) {
        const netflixItem = CartStore.items.find(i => i.appId === 'netflix');
        const defaultDuration = netflixItem ? (netflixItem.durationLabel || netflixItem.durationKey) : '1 minggu';
        const currentDate = getIndonesianDate();

        html += `
            <div class="bg-red-50/60 border border-red-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
                <div class="flex items-center justify-between border-b border-red-100 pb-2.5">
                    <div class="flex items-center gap-2">
                        <span class="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs shadow-xs">
                            <i class="fa-solid fa-play"></i>
                        </span>
                        <h5 class="text-xs sm:text-sm font-extrabold text-red-950 tracking-tight">NETFLIX DEVICE MANAGEMENT</h5>
                    </div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                        Form Aktivasi
                    </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label for="netflix-phone-input" class="block text-xs font-semibold text-slate-700 mb-1">
                            🌷 Nomor Customer <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="netflix-phone-input"
                            placeholder="085854577353"
                            value="${escapeHtml(CartStore.extraData.netflixPhone || '')}"
                            oninput="CartStore.setExtraData('netflixPhone', this.value)"
                            class="w-full px-3 py-2 bg-white border border-red-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>

                    <div>
                        <label for="netflix-date-input" class="block text-xs font-semibold text-slate-700 mb-1">
                            🌷 Tanggal Order <span class="text-slate-400 font-normal">(Otomatis)</span>
                        </label>
                        <input
                            type="text"
                            id="netflix-date-input"
                            value="${currentDate}"
                            readonly
                            class="w-full px-3 py-2 bg-red-100/70 border border-red-200/80 rounded-xl text-xs sm:text-sm font-bold text-red-950 cursor-not-allowed select-none"
                        />
                    </div>

                    <div>
                        <label for="netflix-duration-input" class="block text-xs font-semibold text-slate-700 mb-1">
                            🌷 Durasi (1U) <span class="text-slate-400 font-normal">(Otomatis)</span>
                        </label>
                        <input
                            type="text"
                            id="netflix-duration-input"
                            value="${escapeHtml(defaultDuration)}"
                            readonly
                            class="w-full px-3 py-2 bg-red-100/70 border border-red-200/80 rounded-xl text-xs sm:text-sm font-bold text-red-950 cursor-not-allowed select-none"
                        />
                    </div>

                    <div>
                        <label for="netflix-location-input" class="block text-xs font-semibold text-slate-700 mb-1">
                            🌷 Lokasi / Kota <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="netflix-location-input"
                            placeholder="Contoh: Surabaya"
                            value="${escapeHtml(CartStore.extraData.netflixLocation || '')}"
                            oninput="CartStore.setExtraData('netflixLocation', this.value)"
                            class="w-full px-3 py-2 bg-white border border-red-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>
                </div>

                <div>
                    <label for="netflix-device-input" class="block text-xs font-semibold text-slate-700 mb-1">
                        🌷 Device & Merk Lengkap <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="netflix-device-input"
                        placeholder="Contoh: Laptop Asus Vivobook / iPhone XR / TV Samsung"
                        value="${escapeHtml(CartStore.extraData.netflixDevice || '')}"
                        oninput="CartStore.setExtraData('netflixDevice', this.value)"
                        class="w-full px-3 py-2 bg-white border border-red-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    />
                </div>

                <!-- Netflix Rules Box -->
                <div class="bg-white border border-red-200/80 rounded-xl p-3 text-[11px] text-red-900 space-y-1.5 leading-relaxed">
                    <p class="flex items-start gap-1.5 font-medium">
                        <span class="text-red-500 font-bold">✿</span>
                        <span>Tulis device lengkap beserta merk (contoh <strong>IPHONE XR, TV SAMSUNG, REDMI PAD SE</strong>, dll).</span>
                    </p>
                    <p class="flex items-start gap-1.5 font-medium">
                        <span class="text-red-500 font-bold">✿</span>
                        <span>Selain pembelian semi private (2 device), diharap untuk <strong>login 1 device saja!</strong> Lebih? Void warranty.</span>
                    </p>
                    <p class="flex items-start gap-1.5 font-medium">
                        <span class="text-red-500 font-bold">✿</span>
                        <span>Wajib diisi <strong>1x24 jam</strong>, selebihnya maka no garansi.</span>
                    </p>
                </div>
            </div>
        `;
    }

    // 2. Canva Email Field
    if (hasCanva) {
        html += `
            <div class="bg-cyan-50/60 border border-cyan-200/90 rounded-2xl p-4 space-y-2 shadow-xs">
                <div class="flex items-center gap-2 mb-1">
                    <span class="w-6 h-6 rounded-lg bg-[#00C4CC] text-white flex items-center justify-center text-xs shadow-xs">
                        <i class="fa-solid fa-palette"></i>
                    </span>
                    <h5 class="text-xs font-bold text-cyan-950">Email Akun Canva Pro</h5>
                </div>
                <label for="canva-email-input" class="block text-xs font-semibold text-slate-700">
                    Email Canva Anda <span class="text-cyan-600">*</span>
                </label>
                <input
                    type="email"
                    id="canva-email-input"
                    placeholder="emailcanva@gmail.com"
                    value="${escapeHtml(CartStore.extraData.canvaEmail || '')}"
                    oninput="CartStore.setExtraData('canvaEmail', this.value)"
                    class="w-full px-3.5 py-2 bg-white border border-cyan-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
                <p class="text-[11px] text-slate-500">Undangan tim Canva Pro akan dikirimkan ke email ini.</p>
            </div>
        `;
    }

    // 3. Bstation Email Field
    if (hasBstation) {
        html += `
            <div class="bg-sky-50/60 border border-sky-200/90 rounded-2xl p-4 space-y-2 shadow-xs">
                <div class="flex items-center gap-2 mb-1">
                    <span class="w-6 h-6 rounded-lg bg-[#00A1D6] text-white flex items-center justify-center text-xs shadow-xs">
                        <i class="fa-solid fa-video"></i>
                    </span>
                    <h5 class="text-xs font-bold text-sky-950">Email Akun Bstation</h5>
                </div>
                <label for="bstation-email-input" class="block text-xs font-semibold text-slate-700">
                    Email Bstation Anda <span class="text-sky-600">*</span>
                </label>
                <input
                    type="email"
                    id="bstation-email-input"
                    placeholder="emailbstation@gmail.com"
                    value="${escapeHtml(CartStore.extraData.bstationEmail || '')}"
                    oninput="CartStore.setExtraData('bstationEmail', this.value)"
                    class="w-full px-3.5 py-2 bg-white border border-sky-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
            </div>
        `;
    }

    // 4. CapCut Email Field
    if (hasCapcut) {
        html += `
            <div class="bg-slate-100/80 border border-slate-200 rounded-2xl p-4 space-y-2 shadow-xs">
                <div class="flex items-center gap-2 mb-1">
                    <span class="w-6 h-6 rounded-lg bg-[#1e293b] text-white flex items-center justify-center text-xs shadow-xs">
                        <i class="fa-solid fa-scissors"></i>
                    </span>
                    <h5 class="text-xs font-bold text-slate-900">Email Akun CapCut</h5>
                </div>
                <label for="capcut-email-input" class="block text-xs font-semibold text-slate-700">
                    Email CapCut Anda <span class="text-slate-900">*</span>
                </label>
                <input
                    type="email"
                    id="capcut-email-input"
                    placeholder="emailcapcut@gmail.com"
                    value="${escapeHtml(CartStore.extraData.capcutEmail || '')}"
                    oninput="CartStore.setExtraData('capcutEmail', this.value)"
                    class="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 transition"
                />
            </div>
        `;
    }

    container.innerHTML = html;
}

/**
 * Render Konten Cart Drawer (Daftar Item, Empty State, Total, Tombol Checkout)
 */
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
        if (clearBtn) clearBtn.classList.add('hidden');
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.innerHTML = `<i class="fa-brands fa-whatsapp text-lg"></i><span>Keranjang Kosong</span>`;
        }
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (buyerForm) buyerForm.classList.remove('hidden');
    if (clearBtn) clearBtn.classList.remove('hidden');
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = `<i class="fa-brands fa-whatsapp text-lg"></i><span>Pesan via WhatsApp (${totalCount} Item)</span>`;
    }

    listContainer.innerHTML = items.map(item => {
        const itemSubtotal = (item.unitPrice * item.quantity);
        return `
            <div class="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:border-slate-300 transition">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                         style="background-color: ${item.appColor || '#0f172a'};">
                        <i class="${item.appIcon || 'fa-solid fa-box'} text-base"></i>
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-1.5 mb-0.5">
                            <span class="text-xs font-bold text-slate-900 truncate">${escapeHtml(item.appName)}</span>
                            <span class="px-1.5 py-0.5 rounded bg-slate-200/80 text-[10px] font-semibold text-slate-700">
                                ${escapeHtml(item.durationLabel)}
                            </span>
                        </div>
                        <p class="text-xs text-slate-500 truncate font-medium">${escapeHtml(item.planName)}</p>
                        <p class="text-xs font-bold text-slate-900 mt-1">${formatRupiah(itemSubtotal)}</p>
                    </div>
                </div>

                <div class="flex items-center gap-2.5 flex-shrink-0">
                    <!-- Stepper -->
                    <div class="flex items-center bg-white border border-slate-200 rounded-xl shadow-xs p-0.5">
                        <button onclick="CartStore.updateQuantity('${item.id}', -1)"
                                aria-label="Kurangi kuantitas"
                                class="qty-btn w-6 h-6 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs font-bold">
                            <i class="fa-solid fa-minus text-[10px]"></i>
                        </button>
                        <span class="w-6 text-center text-xs font-bold text-slate-900 select-none">${item.quantity}</span>
                        <button onclick="CartStore.updateQuantity('${item.id}', 1)"
                                aria-label="Tambah kuantitas"
                                class="qty-btn w-6 h-6 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs font-bold">
                            <i class="fa-solid fa-plus text-[10px]"></i>
                        </button>
                    </div>

                    <!-- Remove Item -->
                    <button onclick="CartStore.removeItem('${item.id}')"
                            aria-label="Hapus item"
                            class="w-7 h-7 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition">
                        <i class="fa-regular fa-trash-can text-xs"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Konfirmasi Kosongkan Keranjang
 */
function clearAllCart() {
    if (confirm('Apakah Anda yakin ingin mengosongkan semua item di keranjang belanja?')) {
        CartStore.clearCart();
    }
}

/**
/**
 * Format WhatsApp Order Message into Professional Digital Receipt Format
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

/**
 * Checkout Seluruh Isi Keranjang ke WhatsApp dengan Format Spesifik & Profesional
 */
function checkoutWhatsAppCart() {
    if (CartStore.items.length === 0) {
        showToast('Keranjang Kosong', 'Silakan pilih produk terlebih dahulu.', 'warning');
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

    const buyerName = (buyerNameInput && buyerNameInput.value.trim()) || CartStore.buyerName || '';
    const buyerNotes = (buyerNotesInput && buyerNotesInput.value.trim()) || CartStore.buyerNotes || '';

    const extraData = {
        netflixPhone: (netflixPhoneInput && netflixPhoneInput.value.trim()) || CartStore.extraData.netflixPhone,
        netflixDevice: (netflixDeviceInput && netflixDeviceInput.value.trim()) || CartStore.extraData.netflixDevice,
        netflixLocation: (netflixLocationInput && netflixLocationInput.value.trim()) || CartStore.extraData.netflixLocation,
        canvaEmail: (canvaEmailInput && canvaEmailInput.value.trim()) || CartStore.extraData.canvaEmail,
        bstationEmail: (bstationEmailInput && bstationEmailInput.value.trim()) || CartStore.extraData.bstationEmail,
        capcutEmail: (capcutEmailInput && capcutEmailInput.value.trim()) || CartStore.extraData.capcutEmail
    };

    const orderCode = 'CZ-' + Math.floor(1000 + Math.random() * 9000);
    const message = formatStructuredWhatsAppMessage(
        CartStore.items,
        buyerName,
        buyerNotes,
        extraData,
        orderCode
    );

    const waUrl = `https://wa.me/6287862481038?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
}

/**
 * Toast Notification System
 */
function showToast(title, message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toastId = 'toast-' + Math.random().toString(36).substring(2, 9);
    const toast = document.createElement('div');
    toast.id = toastId;

    let iconHtml = '<i class="fa-solid fa-circle-check text-emerald-500 text-base"></i>';
    if (type === 'info') {
        iconHtml = '<i class="fa-solid fa-circle-info text-blue-500 text-base"></i>';
    } else if (type === 'warning') {
        iconHtml = '<i class="fa-solid fa-triangle-exclamation text-amber-500 text-base"></i>';
    }

    toast.className = 'toast-in bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xl flex items-start gap-3 pointer-events-auto backdrop-blur-md';
    toast.innerHTML = `
        <div class="mt-0.5 flex-shrink-0">${iconHtml}</div>
        <div class="flex-grow min-w-0">
            <h5 class="text-xs font-bold text-slate-900">${escapeHtml(title)}</h5>
            <p class="text-[11px] text-slate-600 mt-0.5 leading-snug">${escapeHtml(message)}</p>
        </div>
        <button onclick="dismissToast('${toastId}')" class="text-slate-400 hover:text-slate-600 text-xs ml-1">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        dismissToast(toastId);
    }, 3200);
}

function dismissToast(toastId) {
    const toast = document.getElementById(toastId);
    if (!toast) return;
    toast.classList.remove('toast-in');
    toast.classList.add('toast-out');
    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 250);
}

// Event Listeners for Keyboard & App Initialization
window.addEventListener('hashchange', () => {
    handleHashRoute();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCartDrawer();
    }
});

// App Initialization
function initCozuStore() {
    renderCategoryPills();
    initSearch();
    initScrollToTop();
    handleHashRoute();
    CartStore.init();
}

document.addEventListener('DOMContentLoaded', () => {
    initCozuStore();
});

// Fallback execution jika DOMContentLoaded sudah lewat
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initCozuStore();
}


