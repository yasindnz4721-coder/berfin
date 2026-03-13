document.addEventListener('DOMContentLoaded', () => {
    // Premium Custom Cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        
        dot.style.transform = `translate(${x}px, ${y}px)`;
        
        outline.animate({
            transform: `translate(${x}px, ${y}px)`
        }, { duration: 600, fill: 'forwards' });
    });

    // Hover effect on interactive elements
    const hoverables = document.querySelectorAll('button, .gallery-item, .logo');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            outline.style.width = '60px';
            outline.style.height = '60px';
            outline.style.borderColor = 'rgba(230, 184, 162, 0.5)';
            outline.style.backgroundColor = 'rgba(230, 184, 162, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
            outline.style.width = '30px';
            outline.style.height = '30px';
            outline.style.borderColor = 'var(--accent-color)';
            outline.style.backgroundColor = 'transparent';
        });
    });

    // Reveal Animations on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Reconcile Button & Modal Logic
    const btn = document.getElementById('reconcile-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        createHeartExplosion();
        startFloatingHearts();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        stopFloatingHearts();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            stopFloatingHearts();
        }
    });

    // Advanced Heart Particle System
    let floatingInterval;

    function createHeart(extraClass = '') {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = `heart-particle ${extraClass}`;
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.opacity = Math.random();
        heart.style.position = 'fixed';
        heart.style.bottom = '-50px';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);

        const duration = Math.random() * 3 + 3;
        const xOffset = (Math.random() - 0.5) * 200;

        heart.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(-110vh) translateX(${xOffset}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });

        setTimeout(() => heart.remove(), duration * 1000);
    }

    function createHeartExplosion() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createHeart('explosion'), i * 20);
        }
    }

    function startFloatingHearts() {
        floatingInterval = setInterval(() => createHeart(), 300);
    }

    function stopFloatingHearts() {
        clearInterval(floatingInterval);
    }

    // Loader logic
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });
});
