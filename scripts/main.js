document.addEventListener('DOMContentLoaded', () => {
  // ✨ Scroll-triggered fade-ins
  const faders = document.querySelectorAll('.fade-in-up');
  const appearOptions = { threshold: 0.2 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // 🧠 Animate metrics strip when in view
  const metricsStrip = document.querySelector('.metrics-strip');
  window.addEventListener('scroll', () => {
    const triggerPoint = window.innerHeight * 0.9;
    if (metricsStrip.getBoundingClientRect().top < triggerPoint) {
      metricsStrip.classList.add('visible');
    }
  });

  // 🎮 Trivia modal logic
  const triviaForm = document.getElementById('triviaForm');
  const triviaModal = document.getElementById('triviaModal');
  const triviaResult = document.getElementById('triviaResult');

  window.openTriviaModal = () => {
    triviaModal.style.display = 'block';
  };

  window.closeModal = () => {
    triviaModal.style.display = 'none';
    triviaResult.innerHTML = '';
  };

  triviaForm.addEventListener('submit', event => {
    event.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;
    if (selected.value === 'Barbie') {
      triviaResult.innerHTML = '<strong>✅ Correct!</strong> Barbie leads the 2023 domestic box office.';
    } else {
      triviaResult.innerHTML = '<strong>❌ Not quite.</strong> The correct answer is Barbie!';
    }
  });

  // 🌙 Dark Mode Toggle
  const darkModeBtn = document.getElementById('toggleDarkMode');
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});

// 📷 Image Modal Viewer
function expandImage(img) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  modalImg.src = img.src;
  modal.style.display = 'flex';
}
