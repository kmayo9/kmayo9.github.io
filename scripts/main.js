document.addEventListener('DOMContentLoaded', () => {
  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ✨ Scroll-triggered fade-ins
  const faders = document.querySelectorAll('.fade-in-up');
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const appearOptions = { threshold: 0.2 };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));
  } else {
    faders.forEach(el => el.classList.add('visible'));
  }

  // 🌙 Dark Mode (persisted)
  const darkModeBtn = document.getElementById('toggleDarkMode');
  const applyTheme = theme => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    if (darkModeBtn) {
      darkModeBtn.setAttribute('aria-pressed', String(isDark));
      darkModeBtn.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
    }
  };
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) applyTheme(savedTheme);
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
      const next = document.body.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  // 🧠 Animate metrics strip when in view (simple reveal)
  const metricsStrip = document.querySelector('.metrics-strip');
  if (metricsStrip) {
    const reveal = () => {
      const triggerPoint = window.innerHeight * 0.9;
      if (metricsStrip.getBoundingClientRect().top < triggerPoint) {
        metricsStrip.classList.add('visible');
        window.removeEventListener('scroll', reveal);
      }
    };
    window.addEventListener('scroll', reveal);
    reveal();
  }

  // 🎮 Trivia modal logic
  const triviaForm = document.getElementById('triviaForm');
  const triviaModal = document.getElementById('triviaModal');
  const triviaResult = document.getElementById('triviaResult');
  window.openTriviaModal = () => { if (triviaModal) triviaModal.style.display = 'block'; };
  window.closeTriviaModal = () => {
    if (triviaModal) triviaModal.style.display = 'none';
    if (triviaResult) triviaResult.innerHTML = '';
  };
  if (triviaForm) {
    triviaForm.addEventListener('submit', event => {
      event.preventDefault();
      const selected = document.querySelector('input[name="answer"]:checked');
      if (!selected || !triviaResult) return;
      if (selected.value === 'Barbie') {
        triviaResult.innerHTML = '<strong>✅ Correct!</strong> Barbie leads the 2023 domestic box office.';
      } else {
        triviaResult.innerHTML = '<strong>❌ Not quite.</strong> The correct answer is Barbie!';
      }
    });
  }

  // 🛈 Info modal logic (shared for dashboards + projects)
  const infoModal = document.getElementById('infoModal');
  const infoTitle = document.getElementById('infoTitle');
  const infoBody = document.getElementById('infoBody');
  const infoLink = document.getElementById('infoLink');
  function openInfoModal({ title, body, link }) {
    if (!infoModal || !infoTitle || !infoBody || !infoLink) return;
    infoTitle.textContent = title || '';
    infoBody.textContent = body || '';
    infoLink.href = link || '#';
    infoModal.style.display = 'block';
  }
  window.closeInfoModal = () => { if (infoModal) infoModal.style.display = 'none'; };
  document.querySelectorAll('.info-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const body = btn.getAttribute('data-body');
      const link = btn.getAttribute('data-link');
      openInfoModal({ title, body, link });
    });
  });

  // 📷 Image Modal Viewer
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  window.expandImage = img => {
    if (!imageModal || !modalImg) return;
    modalImg.src = img.getAttribute('src');
    imageModal.style.display = 'flex';
  };
  window.closeImageModal = () => {
    if (imageModal) imageModal.style.display = 'none';
    if (modalImg) modalImg.src = '';
  };

  // Quick view buttons (open image modal with specified src) — used in dashboards only
  document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const src = btn.getAttribute('data-img');
      if (!src) return;
      if (modalImg && imageModal) {
        modalImg.src = src;
        imageModal.style.display = 'flex';
      }
    });
  });

  // Close modals with ESC or backdrop click
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeImageModal();
      closeInfoModal();
      closeTriviaModal();
    }
  });
  [imageModal, infoModal, triviaModal].forEach(m => {
    if (!m) return;
    m.addEventListener('click', e => {
      // Close if clicking backdrop (not the content)
      if (e.target === m) {
        if (m === imageModal) closeImageModal();
        if (m === infoModal) closeInfoModal();
        if (m === triviaModal) closeTriviaModal();
      }
    });
  });

  // Touch/keyboard-friendly overlay toggle for dashboard cards
  document.querySelectorAll('.dashboard').forEach(card => {
    card.addEventListener('click', e => {
      // Avoid toggling when clicking an interactive child
      if (e.target.closest('a') || e.target.closest('button') || e.target.tagName === 'IMG') return;
      card.classList.toggle('active');
    });
    // Keyboard accessibility: Enter/Space toggles overlay
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('active');
      }
    });
  });
});