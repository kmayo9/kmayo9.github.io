document.addEventListener('DOMContentLoaded', () => {
  // 🧘 Respect reduced motion
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

  // 📊 Animate metrics strip when in view
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

  // 🎬 Trivia modal logic
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
      if (selected.value === 'correct') {
        triviaResult.innerHTML = '<span class="correct">✅ Correct!</span>';
      } else {
        triviaResult.innerHTML = '<span class="incorrect">❌ Try again.</span>';
      }
    });
  }

  // 📘 Info modal logic
  const infoButtons = document.querySelectorAll('.info-button');
  const infoModal = document.getElementById('infoModal');
  const infoContent = document.getElementById('infoContent');
  window.closeInfoModal = () => {
    if (infoModal) infoModal.style.display = 'none';
    if (infoContent) infoContent.innerHTML = '';
  };
  infoButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.getAttribute('data-info');
      if (infoContent) infoContent.innerHTML = content;
      if (infoModal) infoModal.style.display = 'block';
    });
  });

  // 🖼️ Image modal viewer
  const imageModal = document.getElementById('imageModal');
  const imageModalImg = document.getElementById('imageModalImg');
  const imageModalCaption = document.getElementById('imageModalCaption');
  const imageTriggers = document.querySelectorAll('.image-trigger');
  window.closeImageModal = () => {
    if (imageModal) imageModal.style.display = 'none';
    if (imageModalImg) imageModalImg.src = '';
    if (imageModalCaption) imageModalCaption.textContent = '';
  };
  imageTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-img');
      const caption = trigger.getAttribute('data-caption');
      if (imageModalImg) imageModalImg.src = src;
      if (imageModalCaption) imageModalCaption.textContent = caption;
      if (imageModal) imageModal.style.display = 'block';
    });
  });

  // 📂 Dashboard overlay toggles
  const dashboardToggles = document.querySelectorAll('.dashboard-toggle');
  dashboardToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if (target) target.classList.toggle('visible');
    });
  });

  // 🧩 Project modal logic
  const projectButtons = document.querySelectorAll('.project-button');
  const projectModal = document.getElementById('projectModal');
  const projectContent = document.getElementById('projectContent');
  window.closeProjectModal = () => {
    if (projectModal) projectModal.style.display = 'none';
    if (projectContent) projectContent.innerHTML = '';
  };
  projectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.getAttribute('data-project');
      if (projectContent) projectContent.innerHTML = content;
      if (projectModal) projectModal.style.display = 'block';
    });
  });

  // ⌨️ ESC key closes modals
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeTriviaModal();
      closeInfoModal();
      closeImageModal();
      closeProjectModal();
    }
  });

  // 🏷️ Label override for info buttons
  infoButtons.forEach(btn => {
    btn.setAttribute('aria-label', 'Full Overview');
  });
});
