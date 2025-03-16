document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-control.next');
  const prevButton = document.querySelector('.carousel-control.prev');
  const slideWidth = slides[0].getBoundingClientRect().width;

  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  /**
   * Moves the carousel to the target slide.
   * @param {HTMLElement} track - The carousel track element.
   * @param {HTMLElement} targetSlide - The slide element to move to.
   */
  const moveToSlide = (track, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  };

  nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current') || slides[0];
    let nextSlide = currentSlide.nextElementSibling;
    if (!nextSlide) {
      nextSlide = slides[0];
    }
    if (currentSlide) {
      currentSlide.classList.remove('current');
    }
    nextSlide.classList.add('current');
    moveToSlide(track, nextSlide);
  });

  prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current') || slides[0];
    let prevSlide = currentSlide.previousElementSibling;
    if (!prevSlide) {
      prevSlide = slides[slides.length - 1];
    }
    if (currentSlide) {
      currentSlide.classList.remove('current');
    }
    prevSlide.classList.add('current');
    moveToSlide(track, prevSlide);
  });

  slides[0].classList.add('current');

  // Collapsible sections functionality
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const content = document.getElementById(targetId);
      if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
      } else {
        content.classList.add('collapsed');
      }
    });
  });
});
