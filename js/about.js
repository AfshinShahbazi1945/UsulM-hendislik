// ── YETKİNLİK ÇUBUKLARI ──────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.comp__bar-fill').forEach((fill, i) => {
        setTimeout(() => fill.classList.add('animated'), i * 120);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const compGrid = document.querySelector('.comp__grid');
if (compGrid) barObserver.observe(compGrid);

// ── MİSYON KARTI REVEAL ──────────────────────────
document.querySelectorAll('.mission__card, .story__img, .comp__item').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  obs.observe(el);
});
