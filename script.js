document.addEventListener('DOMContentLoaded', function() {
  // Load dynamic content from JSON file
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      loadExperiences(data.experiences);
      loadCertifications(data.certifications);
      loadProjects(data.projects);
      loadEducation(data.education);
      initCarousel();
    })
    .catch(error => console.error('Error loading JSON:', error));

  /**
   * Initialize carousel functionality.
   */
  function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    if (slides.length === 0) return;
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
  }

  /**
   * Load experiences data and populate the experiences section.
   * @param {Array} experiences - Array of experience objects.
   */
  function loadExperiences(experiences) {
    const currentContainer = document.getElementById('experiences-current');
    const moreContainer = document.getElementById('experiences-more');
    if (experiences.length > 0) {
      const currentExp = experiences[0];
      const item = document.createElement('div');
      item.className = 'experience-item';
      item.innerHTML = '<div class="experience-date">' + currentExp.date + '</div>' +
        '<h3>' + currentExp.title + '</h3>' +
        '<p>' + currentExp.company + '</p>';
      currentContainer.appendChild(item);
    }
    for (let i = 1; i < experiences.length; i++) {
      const exp = experiences[i];
      const item = document.createElement('div');
      item.className = 'experience-item';
      item.innerHTML = '<div class="experience-date">' + exp.date + '</div>' +
        '<h3>' + exp.title + '</h3>' +
        '<p>' + exp.company + '</p>';
      moreContainer.appendChild(item);
    }
  }

  /**
   * Load certifications data and populate the certifications section.
   * @param {Object} certifications - Object with primary and more certifications arrays.
   */
  function loadCertifications(certifications) {
    const container = document.getElementById('certifications-grid');
    const allCerts = certifications.primary.concat(certifications.more);
    allCerts.forEach(cert => {
      const item = document.createElement('div');
      item.className = 'project-item';
      item.innerHTML = '<h3>' + cert.title + '</h3>' +
        '<p>Company: ' + cert.company + '</p>' +
        '<p>Issued: ' + cert.issued + '</p>';
      container.appendChild(item);
    });
    updateCertificationsDisplay(false);
  }

  let certificationsExpanded = false;
  /**
   * Updates the display of certification items based on expanded state.
   * @param {boolean} expanded - Whether to show all certification items.
   */
  function updateCertificationsDisplay(expanded) {
    const container = document.getElementById('certifications-grid');
    const items = container.children;
    for (let i = 0; i < items.length; i++) {
      if (!expanded && i >= 8) {
        items[i].style.display = 'none';
      } else {
        items[i].style.display = 'block';
      }
    }
  }

  document.getElementById('certifications-toggle').addEventListener('click', function() {
    certificationsExpanded = !certificationsExpanded;
    updateCertificationsDisplay(certificationsExpanded);
    this.innerHTML = certificationsExpanded ? '&#x25B2;' : '&#x25BC;';
  });

  /**
   * Load projects data and populate the carousel track.
   * @param {Array} projects - Array of project objects.
   */
  function loadProjects(projects) {
    const track = document.querySelector('.carousel-track');
    projects.forEach(proj => {
      const li = document.createElement('li');
      li.className = 'carousel-slide';
      const a = document.createElement('a');
      a.href = proj.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'project-item';
      a.innerHTML = '<h3>' + proj.title + '</h3>' +
        '<p class="project-description">' + proj.description + '</p>' +
        '<p>' + proj.technologies + '</p>';
      li.appendChild(a);
      track.appendChild(li);
    });
  }

  /**
   * Load education data and populate the education section.
   * @param {Array} education - Array of education objects.
   */
  function loadEducation(education) {
    const container = document.getElementById('education-content');
    education.forEach(edu => {
      const item = document.createElement('div');
      item.className = 'education-item';
      item.innerHTML = '<div class="education-date">' + edu.date + '</div>' +
        '<h3>' + edu.title + '</h3>' +
        '<p>' + edu.institution + '</p>';
      container.appendChild(item);
    });
  }

  // Toggle sections (Experiences, etc.) except certifications
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  toggleButtons.forEach(button => {
    if (button.id !== 'certifications-toggle') {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const content = document.getElementById(targetId);
        if (content.classList.contains('collapsed')) {
          content.classList.remove('collapsed');
          button.innerHTML = '&#x25B2;';
        } else {
          content.classList.add('collapsed');
          button.innerHTML = '&#x25BC;';
        }
      });
    }
  });
});
