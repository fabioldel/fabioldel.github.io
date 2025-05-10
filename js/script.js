// Elementos da barra de navegação móvel
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Efeito de digitação na seção hero
const typeEffect = () => {
    const typed = document.querySelector('.typed-text');
    if (!typed) return;
    
    const words = ['Web', 'Mobile', 'Full Stack', 'de Software'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typed.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            // Se estiver digitando...
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Se estiver deletando...
            charIndex--;
            setTimeout(type, 50);
        } else if (charIndex === 0 && isDeleting) {
            // Se terminou de apagar...
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            // Se terminou de escrever...
            isDeleting = true;
            isEnd = true;
            setTimeout(type, 1500);
        }
    }

    setTimeout(type, 1000);
};

// Animação dos números das estatísticas
const animateStats = () => {
    const stats = document.querySelectorAll('.number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const increment = target / 30; // Aumentando em 30 etapas
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                stat.textContent = Math.ceil(count);
                setTimeout(updateCount, 50);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
};

// Filtro de projetos
const filterProjects = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
};

// Navegação suave com ScrollReveal
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-links a, .buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });
};

// Formulário de Contato
const contactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        // Como exemplo, vamos apenas mostrar um alerta
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            alert(`Obrigado pela mensagem, ${name}! Entraremos em contato em breve.`);
            form.reset();
        }
    });
};

// Observador de seções para destacar links de navegação ativos
const navHighlighter = () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
};

// Animação de revelar elementos ao rolar a página
const revealOnScroll = () => {
    window.addEventListener('scroll', () => {
        const reveals = document.querySelectorAll('.skill-item, .project-card, .about-card');
        
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('revealed');
            }
        });
    });
};

// Inicializar todas as funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    typeEffect();
    filterProjects();
    smoothScroll();
    contactForm();
    navHighlighter();
    revealOnScroll();
    
    // Anime os números quando o usuário rolar até a seção "sobre"
    const aboutSection = document.querySelector('#about');
    
    const options = {
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}); 