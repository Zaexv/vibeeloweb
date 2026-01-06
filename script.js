// Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    // Throttle function for performance
    function throttle(func, wait) {
        let timeout;
        let lastCall = 0;
        return function executedFunction(...args) {
            const now = Date.now();
            const timeSinceLastCall = now - lastCall;
            
            if (timeSinceLastCall >= wait) {
                lastCall = now;
                func(...args);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    lastCall = Date.now();
                    func(...args);
                }, wait - timeSinceLastCall);
            }
        };
    }

    // Parallax scroll effect for background elements
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Handle parallax backgrounds (hero, about image)
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        parallaxBgs.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementBottom = elementTop + rect.height;
            
            // Only apply parallax if element is in or near viewport
            if (elementBottom >= scrolled - windowHeight && elementTop <= scrolled + windowHeight * 2) {
                const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                element.style.willChange = 'transform';
            }
        });

        // Handle parallax image section
        const parallaxImage = document.querySelector('.parallax-image');
        if (parallaxImage) {
            const rect = parallaxImage.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementBottom = elementTop + rect.height;
            
            if (elementBottom >= scrolled - windowHeight && elementTop <= scrolled + windowHeight * 2) {
                const speed = parseFloat(parallaxImage.getAttribute('data-speed')) || 0.6;
                const yPos = -(scrolled * speed);
                parallaxImage.style.transform = `translate3d(0, ${yPos}px, 0)`;
                parallaxImage.style.willChange = 'transform';
            }
        }
    }

    // Apply parallax on scroll with requestAnimationFrame for smoothness
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });

    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, 10));

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                // Only apply translateY to non-parallax elements
                if (!entry.target.classList.contains('parallax-item')) {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation (excluding gallery items with parallax)
    const animateElements = document.querySelectorAll('.feature-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Separate observer for gallery items (only opacity, no transform)
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease';
        galleryObserver.observe(el);
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && message) {
                // Here you would typically send the data to a server
                alert('¡Gracias por tu mensaje! Te responderemos pronto.');
                this.reset();
            } else {
                alert('Por favor completa todos los campos.');
            }
        });
    }

    // Button click handlers
    const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
    const learnMoreBtn = document.querySelector('.hero-buttons .btn-secondary');

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Parallax effect for gallery items (subtle movement)
    function updateGalleryParallax() {
        const galleryItems = document.querySelectorAll('.gallery-item.parallax-item');
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        galleryItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementBottom = elementTop + rect.height;
            
            // Only apply parallax if element is visible in viewport
            if (elementBottom >= scrolled && elementTop <= scrolled + windowHeight) {
                const speed = parseFloat(item.getAttribute('data-speed')) || 0.3;
                const elementCenter = elementTop + rect.height / 2;
                const viewportCenter = scrolled + windowHeight / 2;
                const distance = viewportCenter - elementCenter;
                const yPos = distance * speed * 0.15;
                
                const galleryImage = item.querySelector('.gallery-image');
                if (galleryImage) {
                    galleryImage.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    galleryImage.style.willChange = 'transform';
                }
            }
        });
    }

    // Combine gallery parallax with main parallax
    let galleryTicking = false;
    function onScrollGallery() {
        if (!galleryTicking) {
            window.requestAnimationFrame(() => {
                updateGalleryParallax();
                galleryTicking = false;
            });
            galleryTicking = true;
        }
    }
    
    window.addEventListener('scroll', onScrollGallery, { passive: true });

    // Initialize parallax on load
    updateParallax();
    updateGalleryParallax();
});

