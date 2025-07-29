document.addEventListener('DOMContentLoaded', () => {
  // ✨ Animate all .fade-in-up elements on scroll
  const faders = document.querySelectorAll('.fade-in-up');
  const appearOptions = {
    threshold: 0.2
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // 🧠 Animate metrics strip separately
  const metricsStrip = document.querySelector('.metrics-strip');
  window.addEventListener('scroll', () => {
    const triggerPoint = window.innerHeight * 0.9;
    const stripTop = metricsStrip.getBoundingClientRect().top;
    if (stripTop < triggerPoint) {
      metricsStrip.classList.add('visible');
    }
  });

  // 🎮 Trivia Modal Logic
  const triviaForm = document.getElementById("triviaForm");
  const triviaModal = document.getElementById("triviaModal");
  const triviaResult = document.getElementById("triviaResult");

  window.openTriviaModal = () => {
    triviaModal.style.display = "block";
  };

  window.closeModal = () => {
    triviaModal.style.display = "none";
    triviaResult.innerHTML = "";
  };

  triviaForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;

    if (selected.value === "Barbie") {
      triviaResult.innerHTML = "<strong>✅ Correct!</strong> Barbie leads the 2023 domestic box office.";
    } else {
      triviaResult.innerHTML = "<strong>❌ Not quite.</strong> The correct answer is Barbie!";
    }
  });
});
