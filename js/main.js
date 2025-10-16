// Modern Portfolio JavaScript
// Enhanced functionality with smooth animations and interactions

(function() {
    'use strict';

    // DOM Elements
    const loadingScreen = document.getElementById('loading-screen');
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('contact-form');
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    // State
    let isLoading = true;
    let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Initialize
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // Hide loading screen after a delay
        setTimeout(() => {
            hideLoadingScreen();
        }, 1500);

        // Setup event listeners
        setupNavigation();
        setupThemeToggle();
        setupScrollEffects();
        setupAnimations();
        setupFormHandling();
        setupScrollSpy();
        setupParallaxEffects();

        // Apply saved theme
        applyTheme(currentTheme);

        // Setup intersection observer for animations
        setupIntersectionObserver();

        // Setup mobile-specific optimizations
        setupMobileOptimizations();
    }

    // Loading Screen
    function hideLoadingScreen() {
        loadingScreen.classList.add('hidden');
        isLoading = false;

        // Trigger initial animations
        setTimeout(() => {
            animateHeroElements();
        }, 500);
    }

    // Navigation
    function setupNavigation() {
        // Mobile menu toggle
        navToggle?.addEventListener('click', toggleMobileMenu);

        // Nav link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu?.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    smoothScrollTo(targetElement);
                    closeMobileMenu();
                }
            });
        });
    }

    function toggleMobileMenu() {
        navMenu?.classList.toggle('active');
        navToggle?.classList.toggle('active');
    }

    function closeMobileMenu() {
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
    }

    function handleNavClick(e) {
        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
    }

    function smoothScrollTo(element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Theme Toggle
    function setupThemeToggle() {
        themeToggle?.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }

        // Add transition class for smooth theme change
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Scroll Effects
    function setupScrollEffects() {
        let lastScrollY = window.scrollY;
        let isScrolling = false;

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        function handleScroll() {
            const currentScrollY = window.scrollY;

            // Navbar effects
            if (currentScrollY > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar?.style.setProperty('transform', 'translateY(-100%)');
            } else {
                navbar?.style.setProperty('transform', 'translateY(0)');
            }

            lastScrollY = currentScrollY;

            // Parallax effect for hero section
            const hero = document.querySelector('.hero');
            if (hero) {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                hero.style.transform = `translateY(${parallax}px)`;
            }
        }
    }

    // Scroll Spy
    function setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateActiveNavLink(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Animations
    function setupAnimations() {
        // Add animation classes to elements as they come into view
        const animateElements = document.querySelectorAll(
            '.hero-text, .hero-visual, .about-text, .about-highlights, ' +
            '.timeline-item, .project-card, .skill-category, .contact-info, .contact-form-container'
        );

        animateElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    function animateHeroElements() {
        const heroText = document.querySelector('.hero-text');
        const heroVisual = document.querySelector('.hero-visual');

        if (heroText) {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }

        setTimeout(() => {
            if (heroVisual) {
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateY(0)';
            }
        }, 300);
    }

    // Intersection Observer for animations
    function setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateElement(entry.target);

                    // Special handling for skill bars
                    if (entry.target.classList.contains('skill-category')) {
                        animateSkillBars(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll(
            '.about-text, .about-highlights, .timeline-item, .project-card, ' +
            '.skill-category, .contact-info, .contact-form-container'
        );

        elementsToAnimate.forEach(element => observer.observe(element));
    }

    function animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    function animateSkillBars(skillCategory) {
        const progressBars = skillCategory.querySelectorAll('.skill-progress');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    }

    // Parallax Effects
    function setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-particles');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Form Handling
    function setupFormHandling() {
        contactForm?.addEventListener('submit', handleFormSubmit);

        // Enhanced form interactions
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
            input.addEventListener('input', handleInputChange);
        });
    }

    function handleInputFocus(e) {
        const formGroup = e.target.closest('.form-group');
        formGroup?.classList.add('focused');
    }

    function handleInputBlur(e) {
        const formGroup = e.target.closest('.form-group');
        if (!e.target.value) {
            formGroup?.classList.remove('focused');
        }
    }

    function handleInputChange(e) {
        const input = e.target;
        validateInput(input);
    }

    function validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;

        if (type === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (input.required) {
            isValid = value.length > 0;
        }

        input.classList.toggle('valid', isValid && value.length > 0);
        input.classList.toggle('invalid', !isValid && value.length > 0);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success state
            submitButton.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            submitButton.style.background = 'var(--success-color)';

            // Reset form
            contactForm.reset();

            // Show success message
            showNotification('Message sent successfully!', 'success');

            // Reset button after delay
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);

        } catch (error) {
            // Error state
            submitButton.innerHTML = '<span>Failed to Send</span><i class="fas fa-times"></i>';
            submitButton.style.background = 'var(--error-color)';

            showNotification('Failed to send message. Please try again.', 'error');

            // Reset button after delay
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }
    }

    // Notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '500',
            zIndex: 'var(--z-tooltip)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            minWidth: '300px',
            boxShadow: 'var(--shadow-xl)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: 'var(--success-color)',
            error: 'var(--error-color)',
            warning: 'var(--warning-color)',
            info: 'var(--primary-color)'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '1.25rem';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.padding = '0';
        closeBtn.style.width = '20px';
        closeBtn.style.height = '20px';

        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Utility Functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Performance optimizations
    const debouncedResize = debounce(() => {
        // Handle resize events
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);

    window.addEventListener('resize', debouncedResize);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }

        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Preload critical resources
    function preloadResources() {
        const criticalImages = [
            'https://res.cloudinary.com/dqg3prhwt/image/upload/v1685271519/ef837739-d962-464b-80c6-27d05b6b2fc2_g3kyyh.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Initialize preloading
    preloadResources();

    // Mobile Optimizations
    function setupMobileOptimizations() {
        // Add mobile-specific class to body
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
        }

        // Enhanced touch feedback
        const touchElements = document.querySelectorAll('.btn, .project-link, .social-link, .nav-link, .skill-item');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.transition = '';
                }, 150);
            });
        });

        // Improve scroll performance on mobile
        let ticking = false;
        function updateScrollEffects() {
            // Reduce animation frequency on mobile for better performance
            if (!ticking && window.innerWidth <= 768) {
                requestAnimationFrame(() => {
                    // Simplified mobile scroll effects
                    const scrolled = window.pageYOffset;
                    const navbar = document.querySelector('.navbar');

                    if (scrolled > 50) {
                        navbar?.classList.add('scrolled');
                    } else {
                        navbar?.classList.remove('scrolled');
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }

        // Optimize mobile scroll events
        if (window.innerWidth <= 768) {
            window.addEventListener('scroll', updateScrollEffects, { passive: true });
        }

        // Prevent zoom on double tap for better UX
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Add visual feedback for form interactions
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.2s ease';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = '';
            });
        });

        // Optimize animation performance for mobile
        const animatedElements = document.querySelectorAll('[style*="transition"], .skill-item, .project-card');
        if (window.innerWidth <= 768) {
            animatedElements.forEach(element => {
                element.style.willChange = 'transform, opacity';
            });
        }
    }

    // Add CSS for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }

        .notification {
            animation: slideInRight 0.3s ease;
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }

        .form-group.focused label {
            color: var(--primary-color);
        }

        .form-group input.valid,
        .form-group textarea.valid {
            border-color: var(--success-color);
        }

        .form-group input.invalid,
        .form-group textarea.invalid {
            border-color: var(--error-color);
        }
    `;
    document.head.appendChild(style);

    // Export for debugging (development only)
    if (typeof window !== 'undefined') {
        window.portfolioApp = {
            toggleTheme,
            showNotification,
            smoothScrollTo,
            currentTheme: () => currentTheme,
            isLoading: () => isLoading
        };
    }

})();