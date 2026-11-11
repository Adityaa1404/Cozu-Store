export function initFaq() {
  const container = document.getElementById('faq-list');
  if (!container) return;

  const buttons = Array.from(container.querySelectorAll('[data-faq-trigger]'));
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const panel = targetId ? document.getElementById(targetId) : null;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close other items for clean scanning
      buttons.forEach((otherBtn) => {
        if (otherBtn === btn) return;
        const otherId = otherBtn.getAttribute('aria-controls');
        const otherPanel = otherId ? document.getElementById(otherId) : null;
        otherBtn.setAttribute('aria-expanded', 'false');
        const otherIcon = otherBtn.querySelector('[data-faq-icon]');
        if (otherIcon) otherIcon.classList.remove('rotate-180');
        if (otherPanel) otherPanel.classList.add('hidden');
      });

      btn.setAttribute('aria-expanded', String(!isExpanded));
      const icon = btn.querySelector('[data-faq-icon]');
      if (icon) icon.classList.toggle('rotate-180', !isExpanded);
      if (panel) panel.classList.toggle('hidden', isExpanded);
    });
  });
}
