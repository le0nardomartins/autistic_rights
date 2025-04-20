document.addEventListener('DOMContentLoaded', function() {
    // Inicializar comportamento do menu e cabeçalho
    initMenuBehavior();
    
    // Observador para animar a seção de direitos
    observarElementosDireitos();
    
    // Rolagem suave para links âncora
    initSmoothScroll();
    
    // Efeito parallax para seções
    initParallaxEffect();
    
    // Pré-carregar imagens de fundo
    preloadBackgroundImages();
});

// Inicializa o comportamento do menu
function initMenuBehavior() {
    const header = document.querySelector('.header-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Controla a aparência do cabeçalho com base na posição de rolagem
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Trigger inicial para aplicar o estado correto
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Menu mobile toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Anima os itens do menu
            navItems.forEach((item, index) => {
                if (item.style.animation) {
                    item.style.animation = '';
                } else {
                    item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
    
    // Fecha o menu ao clicar em um link de navegação (mobile)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            }
        });
    });
}

// Observador de interseção para animar a seção de direitos
function observarElementosDireitos() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aparecer');
                // Opcionalmente desconectar o observador após a animação
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px'
    });
    
    // Observa o container de texto da seção de direitos
    const elementosAnimar = document.querySelector('#direitos .texto-container');
    if (elementosAnimar) {
        observer.observe(elementosAnimar);
    }
}

// Rolagem suave para links âncora
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efeito parallax suave para seções com fundo
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Somente aplica o efeito se a seção estiver visível
            if (elementTop < windowHeight && elementTop > -elementHeight) {
                const scrollPosition = window.scrollY;
                const speed = 0.5; // Velocidade do efeito parallax
                
                // Calcula a posição de fundo com base na posição de rolagem
                const yPos = -(elementTop * speed);
                element.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
}

// Pré-carrega imagens de fundo para melhor desempenho
function preloadBackgroundImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Animação de entrada para cartões quando visíveis
function initCardAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('aparecer');
                }, index * 100); // Efeito cascata
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
} 