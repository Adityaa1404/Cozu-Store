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
              `<svg class="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
          )
          .join('');

        return `
          <article class="carousel-item w-[85%] sm:w-[350px] md:w-[370px] bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-1 mb-3" aria-label="Rating ${ratingCount} dari 5 bintang">
                ${starsHtml}
              </div>
              <p class="text-sm text-stone-700 leading-relaxed mb-5">
                "${escapeHtml(item.text)}"
              </p>
            </div>
            <div class="flex items-center gap-3 pt-4 border-t border-stone-100">
              <div class="w-10 h-10 rounded-full bg-brand-50 text-brand-700 font-display font-bold text-xs flex items-center justify-center shrink-0">
                ${escapeHtml(item.initials)}
              </div>
              <div class="min-w-0">
                <p class="text-sm font-semibold text-stone-900 truncate">${escapeHtml(item.name)}</p>
                <p class="text-xs text-stone-500 flex items-center gap-1 truncate">
                  ${
                    item.verified
                      ? `<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-brand-700 shrink-0" aria-hidden="true"></i>`
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
