document.addEventListener('DOMContentLoaded', () => {
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
