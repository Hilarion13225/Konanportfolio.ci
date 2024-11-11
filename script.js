// Curseur personnalisé
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Animation de typing
const typingText = "Développeur Full Stack | Designer UI/UX | Freelance";
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = typingText.substring(0, charIndex);
    document.querySelector('.typing').textContent = currentText;

    if (!isDeleting && charIndex < typingText.length) {
        charIndex++;
        setTimeout(type, typingDelay);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, erasingDelay);
    } else {
        isDeleting = !isDeleting;
        setTimeout(type, newTextDelay);
    }
}

// Démarrer l'animation de typing
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, newTextDelay);
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.target.classList.contains('stat-number')) {
                animateNumber(entry.target);
            }
        }
    });
}, observerOptions);

// Observer les éléments
document.querySelectorAll('.fade-in, .slide-in, .stat-number').forEach(el => {
    observer.observe(el);
});

// Animation des nombres
function animateNumber(element) {
    const final = parseInt(element.getAttribute('data-final'));
    const duration = 2000;
    const step = final / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= final) {
            element.textContent = final;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Parallax effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    document.querySelectorAll('.parallax').forEach(element => {
        const speed = element.getAttribute('data-speed');
        element.style.transform = `translateX(${moveX * speed}px) translateY(${moveY * speed}px)`;
    });
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Démarrer l'animation après le chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// Effet de parallaxe sur la section accueil
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const title = document.querySelector('.accueil-content h1');
    const subtitle = document.querySelector('.accueil-content h2');
    
    if (title && subtitle) {
        title.style.transform = `translate(${moveX}px, ${moveY}px)`;
        subtitle.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    }
});

// Gestion du chargement progressif des images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(img => {
        img.classList.add('lazy-load');
        
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Navigation fluide
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne tous les liens de navigation
    const navLinks = document.querySelectorAll('nav a, .hero-buttons a, .footer-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Vérifie si le lien pointe vers une ancre
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Ajoute une classe pour l'animation de sortie
                    document.querySelectorAll('section').forEach(section => {
                        section.classList.remove('section-active');
                    });
                    
                    // Ajoute une classe pour l'animation d'entrée
                    targetSection.classList.add('section-active');
                    
                    // Défilement fluide
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Met à jour l'URL sans recharger la page
                    history.pushState(null, null, targetId);

                    // Met à jour le lien actif dans la navigation
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Détecte la section visible lors du défilement
    const observerOptions = {
        root: null,
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Met à jour le lien actif dans la navigation
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    // Observe toutes les sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Indicateur de progression du scroll
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    progressBar.style.transform = `scaleX(${scrolled / 100})`;
});