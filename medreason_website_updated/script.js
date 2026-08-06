document.addEventListener('DOMContentLoaded', () => {
  /* current-period badge for homepage schedule */
  const datedScheduleItems = Array.from(
    document.querySelectorAll('.timeline-card[data-start][data-end], #schedule .challenge-step-item[data-start][data-end]')
  );

  const current = new Date();
  const today = new Date(current.getFullYear(), current.getMonth(), current.getDate());

  datedScheduleItems.forEach((item) => {
    const start = new Date(item.dataset.start + 'T00:00:00');
    const end = new Date(item.dataset.end + 'T23:59:59');

    if (today >= start && today <= end) {
      item.classList.add('current');

      if (!item.querySelector('.timeline-present')) {
        const badge = document.createElement('span');
        badge.className = 'timeline-present';
        badge.textContent = 'Present Period';
        const title = item.querySelector('h3');
        if (title) {
          title.appendChild(badge);
        } else {
          item.appendChild(badge);
        }
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

  /* in-page anchor active link */
  const inPageLinkGroups = [
    {
      selector: '.home-sidebar-link',
      activeClass: 'active'
    },
    {
      selector: '.section-anchor-nav .anchor-pill[href^="#"]',
      activeClass: 'active-anchor'
    }
  ];

  inPageLinkGroups.forEach(({ selector, activeClass }) => {
    const links = Array.from(document.querySelectorAll(selector));

    if (links.length === 0) return;

    const sectionTargets = links
      .map((link) => {
        const sectionId = link.getAttribute('href');
        if (!sectionId || !sectionId.startsWith('#')) return null;
        const section = document.querySelector(sectionId);
        if (!section) return null;
        return { link, section };
      })
      .filter(Boolean);

    if (sectionTargets.length === 0) return;

    function updateActiveLink() {
      const activationLine = window.scrollY + 150;
      let activeItem = sectionTargets[0];

      sectionTargets.forEach((item) => {
        if (item.section.offsetTop <= activationLine) {
          activeItem = item;
        }
      });

      const atBottom = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 2);
      if (atBottom) {
        activeItem = sectionTargets[sectionTargets.length - 1];
      }

      links.forEach((link) => link.classList.remove(activeClass));
      activeItem.link.classList.add(activeClass);
    }

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink);
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

  const touchLikePointer = window.matchMedia('(pointer: coarse)').matches;

  zoomableImages.forEach((img) => {
    const openPreview = () => openImageLightbox(img.src, img.alt);
    img.addEventListener('dblclick', openPreview);
    if (touchLikePointer) {
      img.addEventListener('click', openPreview);
    }
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