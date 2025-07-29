// 🎬 Animate metrics strip when scrolled into view
const metricsStrip = document.querySelector('.metrics-strip');

window.addEventListener('scroll', () => {
  const triggerPoint = window.innerHeight * 0.9;
  const stripTop = metricsStrip.getBoundingClientRect().top;

  if (stripTop < triggerPoint) {
    metricsStrip.classList.add('visible');
  }
});
