document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initScrollAnimations();
    initNavigationToggle();
    initSmoothScrolling();
    initScrollIndicator();
    initEasterEggs();
    initFormHandling();
    initParallaxEffects();
});

function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorTrail = document.getElementById('cursor-trail');

    if (!cursor || !cursorTrail) return;

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;

        cursorTrail.style.left = trailX - 4 + 'px';
        cursorTrail.style.top = trailY - 4 + 'px';

        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '0.7';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    });

    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .about-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover-effect');
            if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                cursor.classList.add('cursor-hover-button');
            } else if (element.classList.contains('project-card')) {
                cursor.classList.add('cursor-hover-image');
            } else {
                cursor.classList.add('cursor-hover-text');
            }
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover-effect', 'cursor-hover-button', 'cursor-hover-text', 'cursor-hover-image');
        });
    });

    const shovel = document.querySelector('.hero-shovel');
    if (shovel) {
        shovel.addEventListener('mouseenter', () => {
            cursor.classList.add('interactive-cursor-shovel');
        });

        shovel.addEventListener('mouseleave', () => {
            cursor.classList.remove('interactive-cursor-shovel');
        });

        shovel.addEventListener('click', () => {
            cursor.classList.add('cursor-digging');
            shovel.classList.add('digging');

            setTimeout(() => {
                cursor.classList.remove('cursor-digging');
                shovel.classList.remove('digging');
            }, 1000);
        });
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                if (entry.target.classList.contains('staggered-animation')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionElements = section.querySelectorAll('.project-card, .skill-item, .about-card, .contact-method');
        sectionElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
        });

        observer.observe(section);
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.project-card, .skill-item, .about-card, .contact-method');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                        el.classList.add('animate-in');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

function initNavigationToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.nav-container').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = document.querySelector('.nav-container').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!scrollIndicator) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero-section').offsetHeight;

        if (scrolled > heroHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });

    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const headerHeight = document.querySelector('.nav-container').offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

function initEasterEggs() {
    const navBrand = document.querySelector('.nav-brand');
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konami[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konami.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    if (navBrand) {
        let clickCount = 0;
        navBrand.addEventListener('click', (e) => {
            e.preventDefault();
            clickCount++;
            navBrand.classList.add('easter-egg');

            setTimeout(() => {
                navBrand.classList.remove('easter-egg');
            }, 500);

            if (clickCount >= 5) {
                triggerEasterEgg();
                clickCount = 0;
            }

            setTimeout(() => {
                clickCount = 0;
            }, 2000);
        });
    }

    function triggerEasterEgg() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('sparkle-effect');
                setTimeout(() => {
                    item.classList.remove('sparkle-effect');
                }, 2000);
            }, index * 100);
        });

        const heroShovel = document.querySelector('.hero-shovel');
        if (heroShovel) {
            heroShovel.classList.add('dig-animation');
            setTimeout(() => {
                heroShovel.classList.remove('dig-animation');
            }, 2000);
        }

        console.log('🎉 Easter egg activated! Thanks for exploring the code!');
    }
}

function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const formButton = contactForm.querySelector('button[type="submit"]');
        const originalText = formButton.textContent;

        formButton.textContent = 'Sending...';
        formButton.disabled = true;
        formButton.classList.add('loading-dots');

        setTimeout(() => {
            formButton.textContent = 'Message Sent! ✨';
            formButton.classList.remove('loading-dots');
            formButton.style.background = 'var(--accent-color)';

            setTimeout(() => {
                formButton.textContent = originalText;
                formButton.disabled = false;
                formButton.style.background = '';
                contactForm.reset();
            }, 3000);
        }, 2000);

        console.log('Form submitted:', Object.fromEntries(formData));
    });

    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element, .hero-shovel');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        parallaxElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;

            if (elementBottom >= scrolled && elementTop <= scrolled + windowHeight) {
                const rate = (scrolled - elementTop) / windowHeight;
                const yPos = Math.round(rate * 50);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });

        updateNavigationBackground(scrolled);
    });
}

function updateNavigationBackground(scrolled) {
    const nav = document.querySelector('.nav-container');
    if (!nav) return;

    if (scrolled > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = 'var(--shadow-medium)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('loaded');
    }

    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

window.addEventListener('resize', debounce(() => {
    const isMobile = window.innerWidth <= 768;
    const cursor = document.getElementById('custom-cursor');
    const cursorTrail = document.getElementById('cursor-trail');

    if (isMobile && cursor && cursorTrail) {
        cursor.style.display = 'none';
        cursorTrail.style.display = 'none';
        document.body.style.cursor = 'auto';
    } else if (cursor && cursorTrail) {
        cursor.style.display = 'block';
        cursorTrail.style.display = 'block';
        document.body.style.cursor = 'none';
    }
}, 250));

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