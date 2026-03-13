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

    // Hover interactions
    const hoverables = document.querySelectorAll('button, .gallery-item, .logo');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            outline.style.width = '70px';
            outline.style.height = '70px';
            outline.style.backgroundColor = 'rgba(255, 154, 158, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
            outline.style.width = '35px';
            outline.style.height = '35px';
            outline.style.backgroundColor = 'transparent';
        });
    });

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Love Button & Modal
    const loveBtn = document.getElementById('love-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    loveBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        createExplosion('❤️');
        startStardust();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        stopStardust();
    });

    // Particle Systems
    let stardustInterval;

    function createParticle(symbol, className = '') {
        const p = document.createElement('div');
        p.innerHTML = symbol;
        p.className = `heart-particle ${className}`;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = Math.random() * 20 + 10 + 'px';
        p.style.position = 'fixed';
        p.style.bottom = '-50px';
        p.style.zIndex = '10002';
        document.body.appendChild(p);

        const duration = Math.random() * 4 + 4;
        p.animate([
            { transform: 'translateY(0) scale(1)', opacity: 0.8 },
            { transform: `translateY(-110vh) translateX(${(Math.random()-0.5)*300}px) rotate(${Math.random()*720}deg) scale(0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.1, 0, 0.3, 1)'
        });
        setTimeout(() => p.remove(), duration * 1000);
    }

    function createExplosion(symbol) {
        for(let i=0; i<60; i++) {
            setTimeout(() => createParticle(symbol, 'exp'), i * 15);
        }
    }

    function startStardust() {
        stardustInterval = setInterval(() => createParticle('✨'), 200);
    }

    function stopStardust() {
        clearInterval(stardustInterval);
    }

    // Modal Close on backdrop
    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            stopStardust();
        }
    };

    // Loader
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loader').style.opacity = '0';
            setTimeout(() => document.getElementById('loader').remove(), 600);
        }, 800);
    });
});
