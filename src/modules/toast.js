const TOAST_DURATION_MS = 4000;

function escapeToastText(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function dismissToast(toastId) {
  const toast = document.getElementById(toastId);
  if (!toast) return;
  toast.classList.remove('toast-in');
  toast.classList.add('toast-out');
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 200);
}

export function showToast(title, message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toastId = 'toast-' + Math.random().toString(36).slice(2, 9);
  const toast = document.createElement('div');
  toast.id = toastId;
  toast.setAttribute('role', 'status');

  const variants = {
    success: {
      box: 'bg-brand-700 text-white border-brand-800',
      icon: 'check-circle-2',
      subtext: 'text-teal-50',
      close: 'text-teal-100 hover:text-white'
    },
    error: {
      box: 'bg-red-600 text-white border-red-700',
      icon: 'alert-triangle',
      subtext: 'text-red-50',
      close: 'text-red-100 hover:text-white'
    },
    warning: {
      box: 'bg-amber-500 text-stone-950 border-amber-600',
      icon: 'alert-triangle',
      subtext: 'text-stone-900',
      close: 'text-stone-900 hover:text-stone-950'
    },
    info: {
      box: 'bg-accent-600 text-white border-accent-700',
      icon: 'info',
      subtext: 'text-indigo-50',
      close: 'text-indigo-100 hover:text-white'
    }
  };

  const style = variants[type] || variants.success;

  toast.className = `toast-in pointer-events-auto min-w-[280px] sm:min-w-[320px] max-w-sm rounded-xl border p-4 shadow-xl flex items-start gap-3 ${style.box}`;
  toast.innerHTML = `
    <span class="mt-0.5 shrink-0" aria-hidden="true">
      <i data-lucide="${style.icon}" class="w-5 h-5"></i>
    </span>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold leading-snug">${escapeToastText(title)}</p>
      <p class="text-xs mt-0.5 leading-relaxed ${style.subtext}">${escapeToastText(message)}</p>
    </div>
    <button
      type="button"
      data-dismiss-toast="${toastId}"
      aria-label="Tutup notifikasi"
      class="shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors ${style.close}"
    >
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  const closeBtn = toast.querySelector('[data-dismiss-toast]');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => dismissToast(toastId));
  }

  container.appendChild(toast);
  document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: toast } }));

  setTimeout(() => dismissToast(toastId), TOAST_DURATION_MS);
}
