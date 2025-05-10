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
    
    const words = ['.NET', 'C#', 'SQL Server', 'Especialista ERP'];
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

// Configuração da cena Three.js
const initThreeJS = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Configuração da cena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Criar estrutura de DNA
    const createDNA = () => {
        const group = new THREE.Group();
        const radius = 2;
        const turns = 4;
        const pointsPerTurn = 30;
        const totalPoints = turns * pointsPerTurn;
        const height = 5;
        
        // Criar pontos para as duas hélices
        for (let i = 0; i < totalPoints; i++) {
            const angle = (i / pointsPerTurn) * Math.PI * 2;
            const y = (i / totalPoints) * height - height / 2;
            
            // Primeira hélice
            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;
            
            // Segunda hélice (oposta)
            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;
            
            // Criar esferas para os pontos
            const sphereGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const sphereMaterial1 = new THREE.MeshPhongMaterial({
                color: 0x6c5ce7,
                transparent: true,
                opacity: 0.8
            });
            const sphereMaterial2 = new THREE.MeshPhongMaterial({
                color: 0x00cec9,
                transparent: true,
                opacity: 0.8
            });
            
            const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial1);
            const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial2);
            
            sphere1.position.set(x1, y, z1);
            sphere2.position.set(x2, y, z2);
            
            group.add(sphere1);
            group.add(sphere2);
            
            // Adicionar linhas conectando os pontos
            if (i < totalPoints - 1) {
                const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(x1, y, z1),
                    new THREE.Vector3(x2, y, z2)
                ]);
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 0x6c5ce7,
                    transparent: true,
                    opacity: 0.3
                });
                const line = new THREE.Line(lineGeometry1, lineMaterial);
                group.add(line);
            }
        }
        
        return group;
    };

    const dna = createDNA();
    scene.add(dna);

    // Adicionar partículas de fundo
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6c5ce7,
        transparent: true,
        opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Adicionar luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6c5ce7, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00cec9, 1);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    camera.position.z = 8;

    // Animação
    const animate = () => {
        requestAnimationFrame(animate);

        dna.rotation.y += 0.005;
        dna.rotation.x += 0.002;
        particlesMesh.rotation.y += 0.0005;

        renderer.render(scene, camera);
    };

    // Responsividade
    const handleResize = () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
};

// Atualizar ano atual no footer
const updateCurrentYear = () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
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
    initThreeJS();
    updateCurrentYear();
}); 