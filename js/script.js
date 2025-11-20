document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isHidden = menu.classList.contains('hidden');
      
      if (isHidden) {
        // OUVERTURE
        menu.classList.remove('hidden');
        // Petit délai pour permettre au navigateur de calculer le layout avant la transition
        setTimeout(() => {
          menu.classList.remove('opacity-0', 'scale-y-95');
          menu.classList.add('opacity-100', 'scale-y-100');
        }, 10);
      } else {
        // FERMETURE
        menu.classList.remove('opacity-100', 'scale-y-100');
        menu.classList.add('opacity-0', 'scale-y-95');
        
        // Attendre la fin de la transition CSS (300ms) avant de cacher
        setTimeout(() => {
          menu.classList.add('hidden');
        }, 300);
      }
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
        
        // Close mobile menu properly if open
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.remove('opacity-100', 'scale-y-100');
            menu.classList.add('opacity-0', 'scale-y-95');
            setTimeout(() => {
                menu.classList.add('hidden');
            }, 300);
        }
        
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Initialize AOS (Animation On Scroll) if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 50,
      duration: 800,
      easing: 'ease-out-cubic',
    });
  }
});
