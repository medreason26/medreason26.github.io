document.addEventListener('DOMContentLoaded', () => {
  /* timeline current-period badge */
  const timelineCards = Array.from(document.querySelectorAll('.timeline-card[data-start][data-end]'));
  const current = new Date();
  const today = new Date(current.getFullYear(), current.getMonth(), current.getDate());

  timelineCards.forEach((card) => {
    const start = new Date(card.dataset.start + 'T00:00:00');
    const end = new Date(card.dataset.end + 'T23:59:59');

    if (today >= start && today <= end) {
      card.classList.add('current');

      if (!card.querySelector('.timeline-present')) {
        const badge = document.createElement('div');
        badge.className = 'timeline-present';
        badge.textContent = 'Present Period';
        card.appendChild(badge);
      }
    }
  });

  /* mobile sidebar nav */
  const body = document.body;
  const navToggle = document.querySelector('.nav-toggle');
  const navClose = document.querySelector('.nav-close');
  const navOverlay = document.querySelector('.nav-overlay');
  const mobileSidebar = document.querySelector('.mobile-sidebar');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  function openNav() {
    body.classList.add('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    if (mobileSidebar) mobileSidebar.setAttribute('aria-hidden', 'false');
  }

  function closeNav() {
    body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    if (mobileSidebar) mobileSidebar.setAttribute('aria-hidden', 'true');
  }

  if (navToggle) navToggle.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);
  if (navOverlay) navOverlay.addEventListener('click', closeNav);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('nav-open')) {
      closeNav();
    }
  });

  /* image double-click fullscreen preview */
  const zoomableImages = document.querySelectorAll('.zoomable-image');
  const imageLightbox = document.getElementById('imageLightbox');
  const imageLightboxImg = document.getElementById('imageLightboxImg');
  const imageLightboxClose = document.querySelector('.image-lightbox-close');

  function openImageLightbox(src, alt) {
    if (!imageLightbox || !imageLightboxImg) return;
    imageLightboxImg.src = src;
    imageLightboxImg.alt = alt || 'Expanded preview';
    imageLightbox.classList.add('open');
    imageLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeImageLightbox() {
    if (!imageLightbox || !imageLightboxImg) return;
    imageLightbox.classList.remove('open');
    imageLightbox.setAttribute('aria-hidden', 'true');
    imageLightboxImg.src = '';
    document.body.style.overflow = '';
  }

  zoomableImages.forEach((img) => {
    img.addEventListener('dblclick', () => {
      openImageLightbox(img.src, img.alt);
    });
  });

  if (imageLightboxClose) {
    imageLightboxClose.addEventListener('click', closeImageLightbox);
  }

  if (imageLightbox) {
    imageLightbox.addEventListener('click', (event) => {
      if (event.target === imageLightbox) {
        closeImageLightbox();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeImageLightbox();
    }
  });
});