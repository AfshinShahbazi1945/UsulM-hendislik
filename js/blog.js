// ── NEWSLETTER FORMU ──────────────────────────────
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');
    const originalText = button.textContent;

    button.textContent = 'Teşekkürler!';
    button.style.opacity = '0.7';
    input.value = '';

    setTimeout(() => {
      button.textContent = originalText;
      button.style.opacity = '1';
    }, 2500);
  });
}

// ── BLOG FİLTRELEME ───────────────────────────────
const blogFilterBtns = document.querySelectorAll('.blog-filter__btn');
const blogCards = document.querySelectorAll('.blog-card');

blogFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    blogFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    blogCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
