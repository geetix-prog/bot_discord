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
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animationFillMode = 'both';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .command-category, .support-card').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.1}s`;
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
            transition: opacity 0.3s ease;
            background: rgba(0, 0, 0, 0.3);
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
        `;
        
        code.style.position = 'relative';
        code.appendChild(copyIcon);
        
        const copyFunction = async () => {
            const text = code.textContent.replace('📋', '').replace('$ ', '').trim();
            
            try {
                await navigator.clipboard.writeText(text);
                
                // Success animation
                copyIcon.innerHTML = '✅';
                code.style.background = 'linear-gradient(145deg, #57f287, #43b581)';
                code.style.color = '#1a1d21';
                code.style.transform = 'scale(1.02)';
                
                // Create floating notification
                const notification = document.createElement('div');
                notification.innerHTML = `✨ Commande copiée !`;
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #57f287, #43b581);
                    color: #1a1d21;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2s forwards;
                    box-shadow: 0 5px 15px rgba(87, 242, 135, 0.3);
                `;
                
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 2500);
                
                // Reset after delay
                setTimeout(() => {
                    copyIcon.innerHTML = '📋';
                    code.style.background = '';
                    code.style.color = '';
                    code.style.transform = '';
                }, 1500);
                
            } catch (err) {
                console.error('Could not copy text: ', err);
                copyIcon.innerHTML = '❌';
                setTimeout(() => copyIcon.innerHTML = '📋', 1000);
            }
        };
        
        code.addEventListener('click', copyFunction);
        copyIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            copyFunction();
        });
        
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
    
    // Parallax effects for enhanced visual experience
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .discord-mockup');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
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
    
    // Advanced performance optimizations
    const debouncedScrollHandler = debounce(function() {
        // Additional optimized scroll handlers
        updateScrollProgress();
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
    
    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update progress bar if it exists
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
                z-index: 10000;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${scrollProgress}%`;
    }
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Initialize scroll progress
    updateScrollProgress();
    
    // Mouse trail effect (optional, can be performance intensive)
    if (window.innerWidth > 768) { // Only on desktop
        let mouseTrail = [];
        
        document.addEventListener('mousemove', function(e) {
            mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            // Limit trail length
            if (mouseTrail.length > 10) {
                mouseTrail.shift();
            }
            
            // Create trail effect
            if (Math.random() < 0.1) { // Reduce frequency for performance
                const trail = document.createElement('div');
                trail.style.cssText = `
                    position: fixed;
                    top: ${e.clientY}px;
                    left: ${e.clientX}px;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, rgba(88, 101, 242, 0.6) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: fadeOut 1s ease-out forwards;
                `;
                
                document.body.appendChild(trail);
                setTimeout(() => trail.remove(), 1000);
            }
        });
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

@keyframes ripple {
    to { width: 200px; height: 200px; opacity: 0; }
}

@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
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