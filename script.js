// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Pointer Trail
    const trail = document.querySelector('.pointer-trail');
    let trailX = 0, trailY = 0;

    document.addEventListener('pointermove', (e) => {
        const { clientX, clientY } = e;
        trailX = clientX;
        trailY = clientY;

        trail.animate({
            left: `${trailX}px`,
            top: `${trailY}px`,
            transform: 'translate(-50%, -50%)'
        }, { duration: 800, fill: 'forwards', easing: 'ease-out' });
    });

    // Nav Toggle
    const burger = document.querySelector('.nav-burger');
    const navItems = document.querySelector('.nav-items');

    burger.addEventListener('click', () => {
        navItems.classList.toggle('active');
        const lines = burger.querySelectorAll('.burger-line');
        lines.forEach((line, i) => {
            line.animate({
                transform: i === 0 ? 'rotate(45deg) translateY(8px)' :
                            i === 1 ? 'opacity(0)' :
                            'rotate(-45deg) translateY(-8px)'
            }, { duration: 300, fill: 'forwards' });
        });
    });

    // Smooth Scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
            navItems.classList.remove('active');
        });
    });

    // Button Animations
    const buttons = document.querySelectorAll('[data-action]');
    buttons.forEach(btn => {
        btn.addEventListener('pointerenter', () => {
            if (btn.dataset.action === 'pulse') {
                btn.animate({
                    scale: [1, 1.05, 1],
                }, { duration: 600, iterations: Infinity });
            } else if (btn.dataset.action === 'glow') {
                btn.animate({
                    boxShadow: ['0 0 10px var(--primary)', '0 0 20px var(--primary)', '0 0 10px var(--primary)']
                }, { duration: 1000, iterations: Infinity });
            }
        });

        btn.addEventListener('pointerleave', () => {
            btn.getAnimations().forEach(anim => anim.cancel());
        });
    });

    // Course Module Scroll Animation
    const modules = document.querySelectorAll('.course-module');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate({
                    opacity: [0, 1],
                    translate: ['0 50px', '0 0']
                }, { duration: 600, fill: 'forwards', easing: 'ease-out' });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    modules.forEach(module => observer.observe(module));

    // Form Submission
    const contactForm = document.querySelector('.contact-grid');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fields = contactForm.querySelectorAll('.input-field');
        fields.forEach(field => {
            field.animate({
                scale: [1, 0.95, 1],
            }, { duration: 300 });
        });

        setTimeout(() => {
            alert('Transmission complete!');
            contactForm.reset();
        }, 400);
    });

    // Parallax Backdrop
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelector('.hero-backdrop').style.transform = `translateY(${scrollY * 0.2}px)`;
    });
});