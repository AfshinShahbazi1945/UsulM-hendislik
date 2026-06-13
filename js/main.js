/* ================================================
   USUL MÜHENDİSLİK — Ana JavaScript
   ================================================ */

// ── NAV SCROLL ────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── MOBİL MENÜ ────────────────────────────────────
const burger   = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    const isOpen = mobileNav.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
}

// ── SAYAÇ ANİMASYONU ──────────────────────────────
function animateCounter(el, target, duration = 2000) {
  let start = null;
  const isYear = target === 2025;
  const startVal = isYear ? 2020 : 0;

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(startVal + (target - startVal) * ease);
    el.textContent = value.toLocaleString('tr-TR');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('tr-TR');
  }
  requestAnimationFrame(step);
}

// ── INTERSECTION OBSERVER ─────────────────────────
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
};

// Sayaç observer
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.stats__item');
      items.forEach((item, i) => {
        const target = parseInt(item.dataset.target);
        const numEl  = item.querySelector('.stats__num');
        if (numEl) setTimeout(() => animateCounter(numEl, target), i * 150);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// Reveal observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Tüm kartlara ve bölümlere reveal uygula
document.querySelectorAll(
  '.service-card, .why__feature, .process__step, .gallery__item, .footer__col'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  revealObserver.observe(el);
});

// Section başlıkları
document.querySelectorAll('.section-header, .why__left').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── VIDEO FALLBACK ────────────────────────────────
const video = document.querySelector('.hero__video');
if (video) {
  video.addEventListener('error', () => {
    video.style.display = 'none';
    const poster = document.querySelector('.hero__media');
    if (poster) {
      poster.style.background = 'url("images/hero-poster.jpg") center/cover no-repeat';
    }
  });
}

// ── SMOOTH SCROLL ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── VIDEO YÖNETİMİ ────────────────────────────────
const bgVideo = document.getElementById('heroBgVideo');
const fallback = document.getElementById('heroFallback');

if (bgVideo) {
  // Video oynarsa fallback'i gizle
  bgVideo.addEventListener('playing', () => {
    bgVideo.dataset.loaded = 'true';
    if (fallback) fallback.style.opacity = '0';
  });

  // Video yüklenemezse fallback göster
  bgVideo.addEventListener('error', () => {
    bgVideo.style.display = 'none';
    if (fallback) {
      fallback.style.zIndex = '1';
      fallback.style.opacity = '1';
    }
  });

  // 3 saniye içinde başlamazsa fallback
  setTimeout(() => {
    if (bgVideo.paused && !bgVideo.dataset.loaded) {
      bgVideo.style.display = 'none';
      if (fallback) {
        fallback.style.zIndex = '1';
        fallback.style.opacity = '1';
      }
    }
  }, 3000);
}
