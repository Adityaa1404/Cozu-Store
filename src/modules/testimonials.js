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
              `<svg class="h-3.5 w-3.5 fill-accent text-accent" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
          )
          .join('');

        return `
          <article data-motion-hover class="carousel-item flex w-[85%] flex-col justify-between rounded-xl border border-line bg-surface p-6 sm:w-[340px]">
            <div>
              <div class="mb-3 flex items-center gap-1" aria-label="Rating ${ratingCount} dari 5 bintang">
                ${starsHtml}
              </div>
              <p class="mb-5 text-sm leading-relaxed text-ink-secondary">
                "${escapeHtml(item.text)}"
              </p>
            </div>
            <div class="flex items-center gap-3 border-t border-line pt-4">
              <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-subtle text-xs font-semibold text-ink">
                ${escapeHtml(item.initials)}
              </div>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-ink">${escapeHtml(item.name)}</p>
                <p class="flex items-center gap-1 truncate text-xs text-ink-faint">
                  ${
                    item.verified
                      ? `<i data-lucide="check-circle-2" class="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true"></i>`
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
