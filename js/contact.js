// ── İLETİŞİM FORMU ────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Form verilerini al
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // mailto linki oluştur - kullanıcının kendi mail istemcisi açılır
    const subjectText = `Web Sitesi İletişim Formu - ${subject || 'Genel'}`;
    const bodyText = `Ad Soyad: ${name}\nTelefon: ${phone || 'Belirtilmedi'}\nE-posta: ${email}\n\nMesaj:\n${message}`;

    const mailtoLink = `mailto:iletisim@usulmuhendislik.com.tr?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    // Mail istemcisini aç
    window.location.href = mailtoLink;

    // Başarı mesajını göster
    contactForm.classList.add('hide');
    formSuccess.classList.add('show');

    // 4 saniye sonra formu tekrar göster
    setTimeout(() => {
      contactForm.reset();
      contactForm.classList.remove('hide');
      formSuccess.classList.remove('show');
    }, 5000);
  });
}
