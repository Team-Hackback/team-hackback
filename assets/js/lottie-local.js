 document.addEventListener('DOMContentLoaded', async function() {
  const animations = {}; // Object to store Lottie animations

  // Function to fetch and initialize Lottie animations
  async function fetchAndInitializeLottieAnimation(animationId, jsonUrl) {
    const response = await fetch(jsonUrl);
    const animationData = await response.json();
    return lottie.loadAnimation({
      container: document.querySelector(`[data-animation-id="${animationId}"]`),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animationData,
    });
  }

  // Initialize Lottie animations
  animations['lottie-coffee'] = await fetchAndInitializeLottieAnimation('lottie-coffee', '/assets/json/lottie_coffee.json');
  animations['lottie-box'] = await fetchAndInitializeLottieAnimation('lottie-box', '/assets/json/lottie_box.json');
  animations['lottie-atsign'] = await fetchAndInitializeLottieAnimation('lottie-atsign', '/assets/json/lottie_atsign.json');

  // Function to control animation playback
  function toggleAnimation(animationId, play) {
    const animation = animations[animationId];
    if (animation) {
      play ? animation.play() : animation.stop();
    }
  }

  // Add event listeners to navbar links to control animation playback
  document.querySelectorAll('.sidenav_link').forEach(link => {
    const animationId = link.querySelector('.nav-link-icon').dataset.animationId;
    link.addEventListener('mouseover', () => toggleAnimation(animationId, true));
    link.addEventListener('mouseout', () => toggleAnimation(animationId, false));
  });
});