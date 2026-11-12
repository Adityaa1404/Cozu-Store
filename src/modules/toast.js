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
      box: 'bg-surface text-ink border-accent/50',
      icon: 'check-circle-2',
      subtext: 'text-ink-secondary',
      close: 'text-ink-faint hover:text-ink'
    },
    error: {
      box: 'bg-surface text-ink border-error/60',
      icon: 'alert-triangle',
      subtext: 'text-ink-secondary',
      close: 'text-ink-faint hover:text-ink'
    },
    warning: {
      box: 'bg-surface text-ink border-line-strong',
      icon: 'alert-triangle',
      subtext: 'text-ink-secondary',
      close: 'text-ink-faint hover:text-ink'
    },
    info: {
      box: 'bg-surface text-ink border-line',
      icon: 'info',
      subtext: 'text-ink-secondary',
      close: 'text-ink-faint hover:text-ink'
    }
  };

  const style = variants[type] || variants.success;

  toast.className = `toast-in pointer-events-auto flex max-w-sm min-w-[280px] items-start gap-3 rounded-xl border p-4 shadow-card sm:min-w-[320px] ${style.box}`;
  toast.innerHTML = `
    <span class="mt-0.5 shrink-0 text-accent" aria-hidden="true">
      <i data-lucide="${style.icon}" class="h-5 w-5"></i>
    </span>
    <div class="min-w-0 flex-1">
      <p class="text-sm font-semibold leading-snug">${escapeToastText(title)}</p>
      <p class="mt-0.5 text-xs leading-relaxed ${style.subtext}">${escapeToastText(message)}</p>
    </div>
    <button
      type="button"
      data-dismiss-toast="${toastId}"
      aria-label="Tutup notifikasi"
      class="grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${style.close}"
    >
      <i data-lucide="x" class="h-4 w-4"></i>
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
