/**
 * COZU STORE - DATA CONFIGURATION
 * Anda bisa menambah aplikasi, mengubah harga, dan deskripsi di sini.
 */
const appsData = [
    {
        id: "netflix",
        name: "Netflix",
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

let currentApp = appsData[0].id;
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
 * Filter data aplikasi berdasarkan pencarian
 */
function getFilteredApps() {
    if (!searchQuery.trim()) {
        return appsData;
    }
    return appsData.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.plans.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
}

/**
 * Render Navigasi Tab Aplikasi
 */
function renderTabs() {
    const tabsContainer = document.getElementById('app-tabs');
    const filtered = getFilteredApps();

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
                                ${durationLabels[durationKey]?.label || durationKey}
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

                    <!-- Tombol Pesan -->
                    <button onclick="orderNow('${selectedAppData.name}', '${plan.name}', '${durationData.price}', '${durationLabels[durationKey]?.label || durationKey}')" 
                            style="${isBest ? `background-color: ${appColor}; color: #ffffff;` : `background-color: ${appSoftBg}; color: ${appColor};`}"
                            class="w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base transition-all transform active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 hover:opacity-95">
                        <i class="fa-brands fa-whatsapp text-lg"></i>
                        <span>Beli Sekarang</span>
                    </button>
                </div>
            `;
        });
    });

    container.innerHTML = planCards.join('');
}

/**
 * Handle Order via WhatsApp dengan format pesan otomatis
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

        const filtered = getFilteredApps();
        if (filtered.length > 0 && !filtered.some(a => a.id === currentApp)) {
            currentApp = filtered[0].id;
        }

        renderTabs();
        renderCards();
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
    renderTabs();
    renderCards();
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

// Event Listeners
window.addEventListener('hashchange', () => {
    handleHashRoute();
});

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initScrollToTop();
    handleHashRoute();
});

// Fallback execution jika DOMContentLoaded sudah lewat
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initSearch();
    initScrollToTop();
    handleHashRoute();
}


