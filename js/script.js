document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('shadow-md', 'bg-white/95');
        navbar.classList.remove('bg-white/90');
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/95');
        navbar.classList.add('bg-white/90');
      }
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        // Close mobile menu if open
        if (menu && !menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
        }
        
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.add('animate-fade-in-up'); // Add keyframe animation class
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select elements to animate
  const animatedElements = document.querySelectorAll('.card, .reason, .section-header, .hero-content > *, .about-grid > *');
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0'; // Hide initially
    // Add staggered delay classes based on index or random
    // This is a simple way to add some variety, for more complex staggering use CSS nth-child
    if(index % 2 === 0) el.classList.add('delay-100');
    if(index % 3 === 0) el.classList.add('delay-200');
    
    observer.observe(el);
  });
  
  // Specific Observer for Image Reveals
  const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if(entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
          }
      })
  }, { threshold: 0.2 });

  document.querySelectorAll('img').forEach(img => {
      img.classList.add('image-reveal');
      imageObserver.observe(img);
  });

});
