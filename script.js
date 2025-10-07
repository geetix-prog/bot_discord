// Enhanced ProjectBot Website JavaScript - Performance Optimized
class ProjectBotApp {
    constructor() {
        this.isLoaded = false;
        this.observers = new Map();
        this.initializeApp();
    }

    initializeApp() {
        // Set loading state
        document.body.classList.add('loading');
        
        // Initialize components when DOM is ready
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupAccessibility();
        
        // Remove loading state after everything is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                this.triggerInitialAnimations();
                this.isLoaded = true;
            }, 300);
        });
    }

    setupEventListeners() {
        this.setupMobileMenu();
        this.setupNavbarScroll();
        this.setupCommandCopying();
        this.setupMouseTrail();
        this.setupScrollProgress();
        this.setupResizeHandler();
        this.setupKeyboardNavigation();
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        if (!hamburger || !navMenu) return;

        // Toggle menu
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = hamburger.classList.contains('active');
            
            if (isOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (hamburger.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburger.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu li');
        
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'menu-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 998;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(backdrop);
        
        // Animate backdrop
        requestAnimationFrame(() => {
            backdrop.style.opacity = '1';
        });
        
        // Staggered animation for menu items
        navLinks.forEach((link, index) => {
            link.style.animation = `slideInFromRight 0.5s ease forwards ${index * 0.1}s`;
        });
        
        // Focus management
        const firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const backdrop = document.querySelector('.menu-backdrop');
        
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove backdrop
        if (backdrop) {
            backdrop.style.opacity = '0';
            setTimeout(() => backdrop.remove(), 300);
        }
        
        // Return focus to hamburger button
        hamburger.focus();
    }

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateNavbar = () => {
            const scrollY = window.scrollY;
            const scrolled = scrollY > 50;
            const scrollingDown = scrollY > lastScrollY;
            
            navbar.classList.toggle('scrolled', scrolled);
            
            // Hide navbar when scrolling down, show when scrolling up
            if (scrollY > 200) {
                navbar.classList.toggle('hidden', scrollingDown);
            } else {
                navbar.classList.remove('hidden');
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });
    }

    setupCommandCopying() {
        const commandItems = document.querySelectorAll('.command-item');
        
        commandItems.forEach(item => {
            const button = document.createElement('button');
            button.className = 'copy-btn';
            button.innerHTML = '<i class="fas fa-copy" aria-hidden="true"></i>';
            button.setAttribute('aria-label', 'Copier la commande');
            button.setAttribute('title', 'Copier');
            button.type = 'button';
            
            item.appendChild(button);
            
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const codeElement = item.querySelector('code');
                if (!codeElement) return;
                
                const command = codeElement.textContent.trim();
                
                try {
                    await navigator.clipboard.writeText(command);
                    this.showCopyFeedback(button, 'Copié !', 'success');
                    this.announceToScreenReader('Commande copiée dans le presse-papiers');
                } catch (err) {
                    // Fallback for older browsers
                    this.fallbackCopyText(command);
                    this.showCopyFeedback(button, 'Copié !', 'success');
                    this.announceToScreenReader('Commande copiée dans le presse-papiers');
                }
            });
        });
    }

    fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        textArea.setAttribute('aria-hidden', 'true');
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (!successful) {
                throw new Error('Fallback copy failed');
            }
        } catch (err) {
            console.error('Copy operation failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    showCopyFeedback(button, message, type) {
        const originalHTML = button.innerHTML;
        const originalClass = button.className;
        
        button.innerHTML = type === 'success' ? 
            '<i class="fas fa-check" aria-hidden="true"></i>' : 
            '<i class="fas fa-times" aria-hidden="true"></i>';
        button.classList.add(`copy-${type}`);
        button.setAttribute('title', message);
        
        // Create floating notification
        const notification = document.createElement('div');
        notification.className = `copy-notification ${type}`;
        notification.textContent = message;
        notification.setAttribute('aria-hidden', 'true');
        button.appendChild(notification);
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.className = originalClass;
            button.setAttribute('title', 'Copier');
            if (notification.parentNode) {
                notification.remove();
            }
        }, 2000);
    }

    setupMouseTrail() {
        // Only enable on desktop and if user allows motion
        if (window.innerWidth < 768 || 
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            'ontouchstart' in window) {
            return;
        }

        const trail = [];
        const trailLength = 6;
        let mouseX = 0, mouseY = 0;
        let animationId;

        // Create trail elements
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'mouse-trail';
            dot.setAttribute('aria-hidden', 'true');
            dot.style.cssText = `
                position: fixed;
                width: ${4 - i * 0.3}px;
                height: ${4 - i * 0.3}px;
                background: rgba(88, 101, 242, ${0.6 - i * 0.1});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(dot);
            trail.push({ element: dot, x: 0, y: 0 });
        }

        // Throttled mouse move handler
        let lastTime = 0;
        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastTime < 16) return; // ~60fps limit
            
            mouseX = e.clientX;
            mouseY = e.clientY;
            lastTime = now;
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Animation loop
        const animate = () => {
            // Update trail positions
            for (let i = trail.length - 1; i > 0; i--) {
                trail[i].x += (trail[i - 1].x - trail[i].x) * 0.3;
                trail[i].y += (trail[i - 1].y - trail[i].y) * 0.3;
            }
            
            trail[0].x += (mouseX - trail[0].x) * 0.7;
            trail[0].y += (mouseY - trail[0].y) * 0.7;
            
            // Apply positions to elements
            trail.forEach(dot => {
                dot.element.style.left = dot.x + 'px';
                dot.element.style.top = dot.y + 'px';
            });
            
            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(animationId);
            document.removeEventListener('mousemove', handleMouseMove);
            trail.forEach(dot => dot.element.remove());
        });
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        let ticking = false;
        
        const updateProgress = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = Math.min((winScroll / height) * 100, 100);
            
            progressBar.style.width = scrolled + '%';
            progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation for performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with staggered delays
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });

        this.observers.set('animation', observer);
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without triggering scroll
                    history.pushState(null, null, `#${targetId}`);
                    
                    // Focus management for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                    
                    // Remove tabindex after focus
                    setTimeout(() => {
                        target.removeAttribute('tabindex');
                    }, 1000);
                }
            });
        });
    }

    setupAccessibility() {
        // Add ARIA live region for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Handle escape key globally
            if (e.key === 'Escape') {
                // Close any open overlays
                const activeMenu = document.querySelector('.hamburger.active');
                if (activeMenu) {
                    this.closeMobileMenu();
                }
            }
        });

        // Improve focus visibility
        let mouseUser = false;
        
        document.addEventListener('mousedown', () => {
            mouseUser = true;
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                mouseUser = false;
            }
        });
        
        document.addEventListener('focusin', (e) => {
            if (!mouseUser) {
                e.target.classList.add('keyboard-focused');
            }
        });

        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('keyboard-focused');
        });
    }

    setupResizeHandler() {
        let resizeTimer;
        
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 150);
        };
        
        window.addEventListener('resize', handleResize);
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for interactive elements
        const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = Array.from(document.querySelectorAll(focusableSelector))
                    .filter(el => el.offsetParent !== null); // Only visible elements
                
                const firstFocusable = focusable[0];
                const lastFocusable = focusable[focusable.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }

    handleResize() {
        // Handle responsive layout changes
        const mobileBreakpoint = 768;
        const isMobile = window.innerWidth < mobileBreakpoint;
        
        // Close mobile menu on resize to desktop
        if (!isMobile && document.querySelector('.hamburger.active')) {
            this.closeMobileMenu();
        }
        
        // Reinitialize mouse trail if needed
        const existingTrail = document.querySelectorAll('.mouse-trail');
        if (existingTrail.length > 0 && (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
            existingTrail.forEach(dot => dot.remove());
        } else if (existingTrail.length === 0 && !isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.setupMouseTrail();
        }
    }

    triggerInitialAnimations() {
        // Trigger hero section animations
        const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-buttons');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Public method to announce messages to screen readers
    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Cleanup method
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        // Remove event listeners and elements
        const trailElements = document.querySelectorAll('.mouse-trail');
        trailElements.forEach(el => el.remove());
        
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) liveRegion.remove();
        
        const backdrop = document.querySelector('.menu-backdrop');
        if (backdrop) backdrop.remove();
    }
}

// Enhanced CSS animations and styles
const enhancedStyles = `
    /* Enhanced animations */
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes copyFeedback {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
    
    /* Copy notification */
    .copy-notification {
        position: absolute;
        top: -35px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--discord-green, #00d26a);
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        z-index: 1000;
        animation: copyFeedback 2s ease forwards;
        pointer-events: none;
    }
    
    .copy-notification.error {
        background: #ed4245;
    }
    
    /* Enhanced copy button states */
    .copy-btn.copy-success {
        background: var(--discord-green, #00d26a) !important;
        color: white !important;
    }
    
    .copy-btn.copy-error {
        background: #ed4245 !important;
        color: white !important;
    }
    
    /* Screen reader only content */
    .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    }
    
    /* Enhanced focus styles */
    .keyboard-focused {
        outline: 3px solid var(--discord-primary) !important;
        outline-offset: 2px !important;
        border-radius: 4px !important;
    }
    
    /* Improved navbar transitions */
    .navbar {
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                    background-color 0.3s ease,
                    backdrop-filter 0.3s ease !important;
    }
    
    .navbar.hidden {
        transform: translateY(-100%) !important;
    }
    
    /* Loading state improvements */
    body.loading .hero-title,
    body.loading .hero-description,
    body.loading .hero-buttons {
        opacity: 0;
        transform: translateY(30px);
    }
    
    body.loaded .hero-title,
    body.loaded .hero-description,
    body.loaded .hero-buttons {
        transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                   transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Mobile menu backdrop */
    .menu-backdrop {
        transition: opacity 0.3s ease !important;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .mouse-trail {
            display: none !important;
        }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .copy-notification {
            border: 2px solid white;
        }
        
        .keyboard-focused {
            outline-width: 4px !important;
        }
    }
`;

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Inject enhanced styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = enhancedStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize the app
    window.projectBotApp = new ProjectBotApp();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.projectBotApp) {
        window.projectBotApp.destroy();
    }
});