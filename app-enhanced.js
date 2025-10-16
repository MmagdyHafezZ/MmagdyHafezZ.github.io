// Enhanced App.js with Performance Optimizations and Modern Features

(function () {
  // Preload critical animations
  const initializeAnimations = () => {
    // Initialize AOS with optimized settings
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
      });
    }
  };

  // Navigation functionality with smooth transitions
  const setupNavigation = () => {
    const controls = document.querySelectorAll(".control");
    const sections = document.querySelectorAll(".container");

    controls.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active classes
        document.querySelector(".active-btn")?.classList.remove("active-btn");
        document.querySelector(".active")?.classList.remove("active");

        // Add active classes with smooth transition
        this.classList.add("active-btn");
        const targetSection = document.getElementById(button.dataset.id);
        if (targetSection) {
          targetSection.classList.add("active");
        }

        // Add ripple effect
        createRippleEffect(this, e);
      });
    });
  };

  // Create ripple effect for buttons
  const createRippleEffect = (element, event) => {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      pointer-events: none;
      animation: ripple 0.6s ease-out;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  };

  // Enhanced theme toggle with system preference
  const setupThemeToggle = () => {
    const themeBtn = document.querySelector(".theme-btn");
    const body = document.body;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const currentTheme = savedTheme || systemPreference;

    if (currentTheme === 'light') {
      body.classList.add('light-mode');
    }

    themeBtn?.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      const isLight = body.classList.contains("light-mode");
      localStorage.setItem('theme', isLight ? 'light' : 'dark');

      // Add theme transition effect
      body.style.transition = 'all 0.3s ease';
      setTimeout(() => body.style.transition = '', 300);
    });
  };

  // Portfolio links functionality
  const setupPortfolioLinks = () => {
    const portfolioLinks = document.querySelectorAll('a[href="#portfolio"]');
    portfolioLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector('.control[data-id="portfolio"]')?.click();
      });
    });
  };

  // Intersection Observer for performance optimization
  const setupIntersectionObserver = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
  };

  // Smooth scrolling for anchor links
  const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  };

  // Preload images for better performance
  const preloadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // Form enhancement
  const setupFormEnhancement = () => {
    const form = document.getElementById('myForm');
    const inputs = form?.querySelectorAll('input, textarea');

    inputs?.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });

      // Real-time validation
      input.addEventListener('input', () => {
        validateField(input);
      });
    });
  };

  const validateField = (field) => {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;

    if (type === 'email') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (field.required) {
      isValid = value.length > 0;
    }

    field.classList.toggle('valid', isValid);
    field.classList.toggle('invalid', !isValid);
  };

  // Performance monitoring
  const setupPerformanceMonitoring = () => {
    // Log performance metrics
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    });
  };

  // Keyboard navigation
  const setupKeyboardNavigation = () => {
    document.addEventListener('keydown', (e) => {
      const controls = document.querySelectorAll('.control');
      const activeIndex = Array.from(controls).findIndex(control =>
        control.classList.contains('active-btn')
      );

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (activeIndex + 1) % controls.length;
        controls[nextIndex].click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (activeIndex - 1 + controls.length) % controls.length;
        controls[prevIndex].click();
      }
    });
  };

  // Add CSS keyframes for ripple effect
  const addRippleStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  };

  // Initialize everything when DOM is ready
  const init = () => {
    setupNavigation();
    setupThemeToggle();
    setupPortfolioLinks();
    setupSmoothScrolling();
    setupFormEnhancement();
    setupKeyboardNavigation();
    addRippleStyles();

    // Initialize after a brief delay for better performance
    setTimeout(() => {
      initializeAnimations();
      setupIntersectionObserver();
      preloadImages();
      setupPerformanceMonitoring();
    }, 100);
  };

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Handle page visibility changes for performance
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Resume animations when page becomes visible
      document.querySelectorAll('[data-aos]').forEach(el => {
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      });
    }
  });
})();