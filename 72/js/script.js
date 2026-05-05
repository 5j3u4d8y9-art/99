document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scroll and Navbar Effects
    const nav = document.querySelector('.navbar');
    const heroBg = document.querySelector('.hero-bg img');
    
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Parallax effect for hero background
        if (heroBg && currentScrollY < window.innerHeight) {
            heroBg.style.transform = `scale(1.1) translateY(${currentScrollY * 0.4}px)`;
        }
        
        // Navbar styling on scroll
        if (currentScrollY > 100) {
            nav.style.padding = '1.2rem 2rem';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            nav.style.padding = '2.5rem';
            nav.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.9), transparent)';
            nav.style.boxShadow = 'none';
        }

        // Auto-hide navbar on scroll down, show on scroll up
        if (currentScrollY > 500) {
            if (currentScrollY > lastScrollY) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // Initial trigger for hero content with delay
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('appear');
            }, index * 200);
        });
    }, 500);

    // Subtle floating animation for side cocktails (random delays)
    const cocktails = document.querySelectorAll('.cocktail-float');
    cocktails.forEach((el, index) => {
        el.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`;
        el.style.animationDelay = `${index * 0.5}s`;
    });
});

// Add keyframe for float animation via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-15px); }
    }
`;
document.head.appendChild(style);
