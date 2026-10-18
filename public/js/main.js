document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
      }
    });

    // Close menu on nav item click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }



  // Scroll Reveal Animations with IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // Contact Form Interactivity
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        contactForm.reset();

        if (formFeedback) {
          formFeedback.innerHTML = `
            <div class="form-success-alert">
              Thank you! Your message has been sent successfully. Dominic Wagner will get back to you shortly.
            </div>
          `;
          setTimeout(() => {
            formFeedback.innerHTML = '';
          }, 6000);
        }
      }, 1000);
    });
  }

  // Step-by-Step Process Interactive Rows (Screenshot Behavior)
  const processRows = document.querySelectorAll('.process-row');
  if (processRows.length > 0) {
    processRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        processRows.forEach(r => r.classList.remove('active'));
        row.classList.add('active');
      });
    });
  }

  // 3D Carousel Non-Stop Continuous Rotation & Drag Interaction
  const fanViewport = document.getElementById('fan3dViewport');
  const fanTrack = document.getElementById('fan3dTrack');
  if (fanViewport && fanTrack) {
    let currentDeg = 45; // Initial angle matches the reference screenshot
    const speed = 0.18;  // Cinematic smooth rotation speed (~11 deg/sec)
    let isDown = false;
    let startX = 0;
    let startDeg = 45;

    function animateCarousel() {
      if (!isDown) {
        currentDeg = (currentDeg + speed) % 360;
      }
      fanTrack.style.transform = `rotateX(4deg) rotateY(${currentDeg}deg)`;
      requestAnimationFrame(animateCarousel);
    }
    requestAnimationFrame(animateCarousel);

    const onPointerDown = (clientX) => {
      isDown = true;
      startX = clientX;
      startDeg = currentDeg;
    };

    const onPointerMove = (clientX) => {
      if (!isDown) return;
      const diff = clientX - startX;
      currentDeg = startDeg - diff * 0.25;
    };

    const onPointerUp = () => {
      if (!isDown) return;
      isDown = false;
    };

    fanViewport.addEventListener('mousedown', (e) => onPointerDown(e.clientX));
    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX));
    window.addEventListener('mouseup', onPointerUp);

    fanViewport.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        onPointerDown(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        onPointerMove(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', onPointerUp);
  }
});
