// Advanced JavaScript for ProjectBot website
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile menu with animations
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Advanced navbar scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
            
            // Hide/show navbar on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Advanced intersection observer for animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay for multiple elements
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, delay);
                
                // Unobserve to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations with better targeting
    const animatedElements = document.querySelectorAll('.feature-card, .command-category, .support-card, .demo-text, .section-header');
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Enhanced video placeholder interaction
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const content = document.createElement('div');
            content.innerHTML = `
                <div style="
                    background: linear-gradient(145deg, #2c2f36, #23272a);
                    padding: 3rem;
                    border-radius: 20px;
                    text-align: center;
                    border: 1px solid rgba(88, 101, 242, 0.3);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                    max-width: 500px;
                    margin: 0 20px;
                ">
                    <h3 style="color: #ffffff; margin-bottom: 1rem; font-size: 1.5rem;">🎬 Démo Interactive</h3>
                    <p style="color: #b9bbbe; margin-bottom: 2rem; line-height: 1.6;">
                        La vidéo de démonstration sera bientôt disponible ! 
                        En attendant, essayez ProjectBot directement sur votre serveur Discord.
                    </p>
                    <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="
                        background: linear-gradient(135deg, #5865F2, #9c88ff);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    ">Fermer</button>
                </div>
            `;
            
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            // Fade in animation
            setTimeout(() => modal.style.opacity = '1', 10);
            
            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    setTimeout(() => modal.remove(), 300);
                }
            });
        });
    }
    
    // Interactive command copying with advanced feedback
    document.querySelectorAll('.command-item code').forEach(code => {
        // Add copy icon
        const copyIcon = document.createElement('span');
        copyIcon.innerHTML = '📋';
        copyIcon.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            cursor: pointer;
            opacity: 0.6;
            transition: all 0.3s ease;
            background: rgba(0, 0, 0, 0.5);
            padding: 6px 8px;
            border-radius: 6px;
            font-size: 0.8rem;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;
        
        code.style.position = 'relative';
        code.appendChild(copyIcon);
        
        // Improve hover effect
        code.addEventListener('mouseenter', () => {
            copyIcon.style.opacity = '1';
            copyIcon.style.transform = 'scale(1.1)';
        });
        
        code.addEventListener('mouseleave', () => {
            copyIcon.style.opacity = '0.6';
            copyIcon.style.transform = 'scale(1)';
        });
        
        const copyFunction = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const text = code.textContent.replace('📋', '').replace('$ ', '').trim();
            
            try {
                await navigator.clipboard.writeText(text);
                
                // Success animation
                const originalIcon = copyIcon.innerHTML;
                copyIcon.innerHTML = '✅';
                copyIcon.style.background = 'linear-gradient(135deg, #57f287, #43b581)';
                copyIcon.style.color = '#1a1d21';
                copyIcon.style.transform = 'scale(1.2)';
                
                code.style.background = 'linear-gradient(145deg, rgba(87, 242, 135, 0.2), rgba(67, 181, 129, 0.2))';
                code.style.borderColor = 'rgba(87, 242, 135, 0.5)';
                code.style.transform = 'scale(1.02)';
                
                // Create floating notification
                const notification = document.createElement('div');
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.2rem;">✨</span>
                        <span>Commande copiée !</span>
                    </div>
                `;
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: -300px;
                    background: linear-gradient(135deg, #57f287, #43b581);
                    color: #1a1d21;
                    padding: 16px 24px;
                    border-radius: 12px;
                    font-weight: 600;
                    z-index: 10000;
                    transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    box-shadow: 0 8px 25px rgba(87, 242, 135, 0.4);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                `;
                
                document.body.appendChild(notification);
                
                // Slide in
                setTimeout(() => {
                    notification.style.right = '20px';
                }, 10);
                
                // Slide out and remove
                setTimeout(() => {
                    notification.style.right = '-300px';
                    setTimeout(() => notification.remove(), 400);
                }, 2000);
                
                // Reset after delay
                setTimeout(() => {
                    copyIcon.innerHTML = originalIcon;
                    copyIcon.style.background = 'rgba(0, 0, 0, 0.5)';
                    copyIcon.style.color = '';
                    copyIcon.style.transform = 'scale(1)';
                    code.style.background = '';
                    code.style.borderColor = '';
                    code.style.transform = '';
                }, 1500);
                
            } catch (err) {
                console.error('Could not copy text: ', err);
                
                // Error feedback
                copyIcon.innerHTML = '❌';
                copyIcon.style.background = 'linear-gradient(135deg, #ed4245, #c23616)';
                copyIcon.style.transform = 'scale(1.2)';
                
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    copyIcon.innerHTML = '✅';
                    copyIcon.style.background = 'linear-gradient(135deg, #57f287, #43b581)';
                } catch (fallbackErr) {
                    console.error('Fallback copy failed: ', fallbackErr);
                }
                document.body.removeChild(textArea);
                
                setTimeout(() => {
                    copyIcon.innerHTML = '📋';
                    copyIcon.style.background = 'rgba(0, 0, 0, 0.5)';
                    copyIcon.style.transform = 'scale(1)';
                }, 1000);
            }
        };
        
        code.addEventListener('click', copyFunction);
        copyIcon.addEventListener('click', copyFunction);
        
        code.title = 'Cliquer pour copier la commande';
    });
    
    // Advanced Discord invite tracking with analytics
    document.querySelectorAll('a[href*="discord.com/oauth2/authorize"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirection vers Discord...';
            this.style.pointerEvents = 'none';
            
            // Track conversion (you can integrate with analytics here)
            console.log('Discord invite clicked from:', window.location.href);
            
            // Reset after delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 3000);
        });
    });
    
    // Optimized parallax effects for enhanced visual experience
    let ticking = false;
    let isDesktop = window.innerWidth > 768;
    
    function updateParallax() {
        if (!isDesktop) return; // Disable on mobile for performance
        
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const discordMockup = document.querySelector('.discord-mockup');
        
        if (hero && scrolled < window.innerHeight) {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            hero.style.transform = `translateY(${yPos}px)`;
        }
        
        if (discordMockup && scrolled < window.innerHeight) {
            const speed = 0.1;
            const yPos = scrolled * speed;
            const rotation = scrolled * 0.05;
            discordMockup.style.transform = `perspective(1000px) rotateY(-10deg) rotateX(5deg) translateY(${yPos}px) rotateZ(${rotation}deg)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking && isDesktop) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Update isDesktop on resize
    window.addEventListener('resize', debounce(() => {
        isDesktop = window.innerWidth > 768;
        if (!isDesktop) {
            // Reset transforms on mobile
            const hero = document.querySelector('.hero');
            const discordMockup = document.querySelector('.discord-mockup');
            if (hero) hero.style.transform = '';
            if (discordMockup) discordMockup.style.transform = '';
        }
    }, 250));
    
    window.addEventListener('scroll', requestParallaxUpdate);
    
    // Enhanced hover effects for cards
    document.querySelectorAll('.feature-card, .support-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: ${y}px;
                left: ${x}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(88, 101, 242, 0.3) 0%, transparent 70%);
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Konami code easter egg with enhanced effects
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            // Epic easter egg activation
            document.body.style.animation = 'rainbow 2s ease-in-out';
            
            // Create celebration particles
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.innerHTML = ['🎉', '✨', '🚀', '🎊', '⭐'][Math.floor(Math.random() * 5)];
                    particle.style.cssText = `
                        position: fixed;
                        top: ${Math.random() * 100}vh;
                        left: ${Math.random() * 100}vw;
                        font-size: 2rem;
                        pointer-events: none;
                        z-index: 10000;
                        animation: float 3s ease-out forwards;
                    `;
                    
                    document.body.appendChild(particle);
                    setTimeout(() => particle.remove(), 3000);
                }, i * 50);
            }
            
            // Reset
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
            
            konamiCode = [];
        }
    });
    
    // Advanced performance optimizations with loading states
    const debouncedScrollHandler = debounce(function() {
        updateScrollProgress();
        updateNavbarVisibility();
    }, 16); // 60fps
    
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
    
    // Enhanced scroll progress indicator
    function updateScrollProgress() {
        const scrollProgress = Math.min(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
            100
        );
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #5865F2, #9c88ff, #00d4ff);
                z-index: 10001;
                transition: width 0.1s ease;
                border-radius: 0 2px 2px 0;
                box-shadow: 0 0 10px rgba(88, 101, 242, 0.5);
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${scrollProgress}%`;
    }
    
    // Better navbar visibility logic
    function updateNavbarVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
            
            // Hide/show navbar on scroll direction with better threshold
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            } else {
                navbar.style.transform = 'translateY(0)';
                navbar.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = Math.max(scrollTop, 0); // For Mobile or negative scrolling
    }
    
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    
    // Initialize scroll progress
    updateScrollProgress();
    
    // Add loading state management
    function showLoadingState(element) {
        if (element) {
            element.classList.add('loading');
        }
    }
    
    function hideLoadingState(element) {
        if (element) {
            element.classList.remove('loading');
        }
    }
    
    // Page load optimization
    window.addEventListener('load', function() {
        // Remove any loading states
        document.querySelectorAll('.loading').forEach(el => {
            hideLoadingState(el);
        });
        
        // Initialize animations after page load
        setTimeout(() => {
            document.body.classList.add('loaded');
            
            // Trigger initial animations
            const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-buttons');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 100);
    });
    
    // Optimized mouse trail effect for desktop only
    if (window.innerWidth > 768 && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        let mouseTrail = [];
        let isMouseMoving = false;
        let mouseTimeout;
        
        document.addEventListener('mousemove', debounce(function(e) {
            if (!isMouseMoving) {
                isMouseMoving = true;
            }
            
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                isMouseMoving = false;
            }, 100);
            
            // Only create trail when mouse is moving and reduce frequency
            if (Math.random() < 0.05 && isMouseMoving) { // Reduced from 0.1 to 0.05
                const trail = document.createElement('div');
                trail.style.cssText = `
                    position: fixed;
                    top: ${e.clientY - 2}px;
                    left: ${e.clientX - 2}px;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, rgba(88, 101, 242, 0.4) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: trailFade 0.8s ease-out forwards;
                `;
                
                document.body.appendChild(trail);
                
                // Clean up after animation
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.remove();
                    }
                }, 800);
            }
        }, 16)); // 60fps limit
    }
});

// Add CSS animations
const additionalStyles = `
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes fadeOut {
    to { opacity: 0; transform: translateY(-20px); }
}

@keyframes trailFade {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.3); }
}

@keyframes ripple {
    to { width: 200px; height: 200px; opacity: 0; }
}

@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

@keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(88, 101, 242, 0.3); }
    50% { box-shadow: 0 0 40px rgba(88, 101, 242, 0.6); }
}

.animate-on-scroll {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Improve focus states for better accessibility */
*:focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 2px;
    border-radius: 4px;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    .discord-mockup {
        transform: none !important;
    }
    
    .hero::before,
    .features::before,
    .commands::before {
        animation: none !important;
    }
}

/* Better loading states */
.loading {
    pointer-events: none;
    opacity: 0.7;
    position: relative;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 2px solid var(--text-secondary);
    border-top: 2px solid var(--discord-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Improved button states */
.btn:active {
    transform: translateY(1px) scale(0.98);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
}

/* Better mobile touch feedback */
@media (max-width: 768px) {
    .btn:active,
    .nav-menu a:active,
    .command-item:active {
        background-color: rgba(88, 101, 242, 0.1);
        transform: scale(0.98);
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Console branding
console.log(`
%c🚀 ProjectBot Website
%cDeveloped with ❤️ for the Discord community
%c
• Built with modern web technologies
• Optimized for performance and accessibility  
• Designed for an exceptional user experience
%c
Want to contribute? Check out our GitHub!
`, 
'color: #5865F2; font-size: 20px; font-weight: bold;',
'color: #9c88ff; font-size: 14px;',
'color: #b9bbbe; font-size: 12px;',
'color: #00d4ff; font-size: 12px; font-style: italic;'
);

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('❌ ServiceWorker registration failed');
            });
    });
}