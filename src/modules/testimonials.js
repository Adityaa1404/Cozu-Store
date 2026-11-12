import { escapeHtml } from './products.js';

export function scrollTestimonials(direction) {
  const carousel = document.getElementById('testimonial-carousel');
  if (!carousel) return;
  const scrollAmount = Math.min(380, carousel.clientWidth * 0.85);
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

export function initTestimonials(testimonials) {
  const carousel = document.getElementById('testimonial-carousel');
  if (carousel && Array.isArray(testimonials)) {
    carousel.innerHTML = testimonials
      .map((item) => {
        const ratingCount = Math.max(1, Math.min(5, item.rating || 5));
        const starsHtml = Array.from({ length: ratingCount })
          .map(
            () =>
              `<svg class="h-3.5 w-3.5 fill-current text-ink" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
          )
          .join('');

        return `
          <article
            data-motion-hover
            class="carousel-item flex aspect-[16/9] w-[300px] flex-col overflow-hidden rounded-xl border border-line bg-surface p-4 sm:w-[360px] sm:p-5"
          >
            <div class="min-h-0">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-0.5" aria-label="Rating ${ratingCount} dari 5 bintang">
                  ${starsHtml}
                </div>
                <span class="inline-flex shrink-0 items-center rounded-full bg-badge px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink">
                  Terverifikasi
                </span>
              </div>
              <p class="mt-2 line-clamp-3 text-[13px] leading-relaxed text-ink-secondary sm:text-sm">
                “${escapeHtml(item.text)}”
              </p>
            </div>
            <div class="mt-auto flex items-center gap-2.5 border-t border-line pt-3">
              <div class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-badge text-[11px] font-semibold text-ink">
                ${escapeHtml(item.initials)}
              </div>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-ink">${escapeHtml(item.name)}</p>
                <p class="flex items-center gap-1 truncate text-[11px] text-ink-muted">
                  ${
                    item.verified
                      ? `<i data-lucide="check-circle-2" class="h-3 w-3 shrink-0 text-ink-secondary" aria-hidden="true"></i>`
                      : ''
                  }
                  <span class="truncate">${escapeHtml(item.role || 'Pembeli Terverifikasi')}</span>
                </p>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    document.dispatchEvent(new CustomEvent('cozu:icons', { detail: { root: carousel } }));
  }

  const prevBtn = document.getElementById('testimonial-prev-btn');
  const nextBtn = document.getElementById('testimonial-next-btn');

  if (prevBtn) prevBtn.addEventListener('click', () => scrollTestimonials(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollTestimonials(1));
}
