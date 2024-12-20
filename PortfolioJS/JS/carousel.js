let currentIndex = 0;


// Function for image indicator
function moveSlide(step) {
  const images = document.querySelectorAll('.carousel img');
  const dots = document.querySelectorAll('.dot');
  const totalImages = images.length;

  currentIndex += step;

  if (currentIndex < 0) {
    currentIndex = totalImages - 1;
  } else if (currentIndex >= totalImages) {
    currentIndex = 0;
  }

  const carousel = document.querySelector('.carousel');
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update dot indicators
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentIndex) {
      dot.classList.add('active');
    }
  });
}

// Make the current dot function
document.addEventListener('DOMContentLoaded', () => {
  const dots = document.querySelectorAll('.dot');
  dots[currentIndex].classList.add('active');
});
