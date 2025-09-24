class AnimationController {
    constructor() {
        this.animations = new Map();
        this.intersectionObserver = null;
        this.scrollPosition = 0;
        this.ticking = false;

        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.bindScrollEvents();
        this.setupPerformanceOptimizations();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: [0, 0.1, 0.5, 1]
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => this.handleIntersection(entry));
        }, options);

        this.observeElements();
    }

    observeElements() {
        const elementsToObserve = document.querySelectorAll(`
            .hero-section,
            .section-title,
            .project-card,
            .skill-item,
            .about-card,
            .contact-method,
            .animate-on-scroll
        `);

        elementsToObserve.forEach(el => {
            this.intersectionObserver.observe(el);
        });
    }

    handleIntersection(entry) {
        const element = entry.target;
        const animationName = this.getAnimationName(element);

        if (entry.isIntersecting) {
            this.triggerAnimation(element, animationName);
        } else {
            this.resetAnimation(element, animationName);
        }
    }

    getAnimationName(element) {
        if (element.classList.contains('hero-section')) return 'heroEntrance';
        if (element.classList.contains('section-title')) return 'titleReveal';
        if (element.classList.contains('project-card')) return 'cardSlideUp';
        if (element.classList.contains('skill-item')) return 'skillPop';
        if (element.classList.contains('about-card')) return 'cardFadeIn';
        if (element.classList.contains('contact-method')) return 'slideInLeft';
        return 'fadeInUp';
    }

    triggerAnimation(element, animationType) {
        if (this.animations.has(element)) return;

        const animation = this.createAnimation(element, animationType);
        this.animations.set(element, animation);

        requestAnimationFrame(() => {
            element.classList.add('animate-in');
            if (animation) animation.play();
        });
    }

    resetAnimation(element, animationType) {
        const animation = this.animations.get(element);
        if (animation) {
            animation.cancel();
            this.animations.delete(element);
        }
        element.classList.remove('animate-in');
    }

    createAnimation(element, type) {
        const baseOptions = {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        };

        const animations = {
            heroEntrance: [
                { opacity: 0, transform: 'translateY(50px) scale(0.9)' },
                { opacity: 1, transform: 'translateY(0) scale(1)' }
            ],
            titleReveal: [
                { opacity: 0, transform: 'translateY(30px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            cardSlideUp: [
                { opacity: 0, transform: 'translateY(40px) rotateX(10deg)' },
                { opacity: 1, transform: 'translateY(0) rotateX(0deg)' }
            ],
            skillPop: [
                { opacity: 0, transform: 'scale(0.7) rotate(-5deg)' },
                { opacity: 1, transform: 'scale(1) rotate(0deg)' }
            ],
            cardFadeIn: [
                { opacity: 0, transform: 'translateX(-30px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ],
            slideInLeft: [
                { opacity: 0, transform: 'translateX(-50px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ],
            fadeInUp: [
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ]
        };

        if (!animations[type]) return null;

        return element.animate(animations[type], {
            ...baseOptions,
            delay: this.calculateDelay(element)
        });
    }

    calculateDelay(element) {
        const siblings = Array.from(element.parentElement?.children || []);
        const index = siblings.indexOf(element);
        return Math.min(index * 100, 500);
    }

    bindScrollEvents() {
        window.addEventListener('scroll', () => {
            this.scrollPosition = window.pageYOffset;
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
    }

    updateScrollAnimations() {
        this.updateParallax();
        this.updateScrollProgress();
        this.updateShovelRotation();
    }

    updateParallax() {
        const heroShovel = document.querySelector('.hero-shovel');
        const particles = document.querySelector('.dig-particles');

        if (heroShovel) {
            const rate = this.scrollPosition * 0.5;
            heroShovel.style.transform = `translateY(${rate}px) rotate(${this.scrollPosition * 0.1}deg)`;
        }

        if (particles) {
            const rate = this.scrollPosition * 0.3;
            particles.style.transform = `translateX(-50%) translateY(${rate}px)`;
        }
    }

    updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const progress = (this.scrollPosition / documentHeight) * 100;

        document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    }

    updateShovelRotation() {
        const heroShovel = document.querySelector('.hero-shovel');
        if (!heroShovel) return;

        const rotation = (this.scrollPosition / window.innerHeight) * 360;
        const scale = Math.max(0.8, 1 - (this.scrollPosition / window.innerHeight) * 0.2);

        heroShovel.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    }

    setupPerformanceOptimizations() {
        if ('IntersectionObserver' in window) {
            this.setupReducedMotionPreference();
        }

        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    setupReducedMotionPreference() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            this.disableAnimations();
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                this.disableAnimations();
            } else {
                this.enableAnimations();
            }
        });
    }

    disableAnimations() {
        document.documentElement.style.setProperty('--animation-duration', '0.01s');
        this.animations.forEach(animation => animation.cancel());
        this.animations.clear();
    }

    enableAnimations() {
        document.documentElement.style.setProperty('--animation-duration', '0.8s');
        this.observeElements();
    }

    cleanup() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        this.animations.forEach(animation => animation.cancel());
        this.animations.clear();
    }
}

class TextAnimations {
    static typewriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };

        type();
    }

    static glitchEffect(element, duration = 500) {
        const originalText = element.textContent;
        const chars = '!@#$%^&*()_+-={}[]|:";\'<>?,.`~';
        let iterations = 0;

        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(interval);
                element.textContent = originalText;
            }

            iterations += 1 / 3;
        }, 30);

        setTimeout(() => {
            clearInterval(interval);
            element.textContent = originalText;
        }, duration);
    }

    static countUp(element, start, end, duration = 2000) {
        let startTime = null;

        const animate = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const current = Math.floor(start + (end - start) * this.easeOutQuart(progress));
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    static easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
}

class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.isRunning = false;
    }

    createParticle(x, y, type = 'default') {
        const particle = document.createElement('div');
        particle.className = `particle particle-${type}`;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        this.container.appendChild(particle);

        const velocity = {
            x: (Math.random() - 0.5) * 4,
            y: -Math.random() * 3 - 1
        };

        const particleData = {
            element: particle,
            x: x,
            y: y,
            velocity: velocity,
            life: 1,
            decay: Math.random() * 0.02 + 0.01
        };

        this.particles.push(particleData);

        setTimeout(() => {
            this.removeParticle(particleData);
        }, 3000);
    }

    removeParticle(particleData) {
        const index = this.particles.indexOf(particleData);
        if (index > -1) {
            this.particles.splice(index, 1);
            if (particleData.element.parentNode) {
                particleData.element.parentNode.removeChild(particleData.element);
            }
        }
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.velocity.y += 0.1;
            particle.life -= particle.decay;

            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.life;

            if (particle.life <= 0) {
                this.removeParticle(particle);
            }
        });

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.update());
        } else {
            this.isRunning = false;
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.update();
        }
    }
}

class ShovelDigAnimation {
    constructor(shovelElement) {
        this.shovel = shovelElement;
        this.isDigging = false;
        this.particleSystem = new ParticleSystem(document.body);
    }

    startDigging() {
        if (this.isDigging) return;

        this.isDigging = true;
        this.shovel.classList.add('digging');

        const shovelRect = this.shovel.getBoundingClientRect();
        const centerX = shovelRect.left + shovelRect.width / 2;
        const centerY = shovelRect.bottom;

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.particleSystem.createParticle(
                    centerX + (Math.random() - 0.5) * 30,
                    centerY - 10,
                    'dirt'
                );
            }, i * 50);
        }

        this.particleSystem.start();

        setTimeout(() => {
            this.stopDigging();
        }, 1500);
    }

    stopDigging() {
        this.isDigging = false;
        this.shovel.classList.remove('digging');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();

    const heroShovel = document.querySelector('.hero-shovel');
    if (heroShovel) {
        const shovelAnimation = new ShovelDigAnimation(heroShovel);

        heroShovel.addEventListener('click', () => {
            shovelAnimation.startDigging();
        });
    }

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        TextAnimations.glitchEffect(entry.target, 800);
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(title);
    });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('animated')) {
                item.classList.add('animated');
                item.style.animation = 'skillPop 0.4s ease';
            }
        });
    });
});

const CSS_ANIMATIONS = `
.particle {
    position: fixed;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
}

.particle-dirt {
    background: #8B4513;
    box-shadow: 0 0 2px rgba(139, 69, 19, 0.5);
}

.particle-default {
    background: var(--secondary-color);
    box-shadow: 0 0 2px rgba(231, 76, 60, 0.5);
}

@keyframes skillPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.1) rotate(5deg); }
    100% { transform: scale(1); }
}

.digging {
    animation: digMotion 1.5s ease-in-out;
}

@keyframes digMotion {
    0% { transform: rotate(0deg) translateY(0); }
    25% { transform: rotate(15deg) translateY(10px); }
    50% { transform: rotate(30deg) translateY(20px); }
    75% { transform: rotate(15deg) translateY(10px); }
    100% { transform: rotate(0deg) translateY(0); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = CSS_ANIMATIONS;
document.head.appendChild(styleSheet);