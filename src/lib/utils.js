import { useEffect } from 'react';

// useLazyLoadImages: a small reusable hook that sets up an IntersectionObserver
// to swap `data-src` into `src` when image elements intersect the viewport.
// Pass dependencies (e.g. currentPage, selectedAlbum) as the second arg
// so the observer re-attaches when relevant state changes.
export function useLazyLoadImages(deps = []) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset && img.dataset.src) {
              img.src = img.dataset.src;
              observer.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Future helper exports (e.g. fetchImageList) can be added here.
