// Script para corrigir o comportamento do menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Corrige um potencial problema onde o menu já começa como ativo
    if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        
        // Garante que o menu inicialmente está invisível
        navLinks.style.pointerEvents = 'none';
    }
    
    // Altera o comportamento do botão de menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Previne propagação do evento
            
            // Alterna a classe active
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Força visibilidade ao abrir, garantindo que ele permaneça visível e clicável
            if (navLinks.classList.contains('active')) {
                navLinks.style.opacity = '1';
                navLinks.style.transform = 'translateX(0)';
                navLinks.style.display = 'flex';
                navLinks.style.pointerEvents = 'auto'; // Habilita cliques
                
                // Garante que cada item do menu seja visível
                navItems.forEach((item, index) => {
                    item.style.opacity = '1';
                    item.style.pointerEvents = 'auto'; // Habilita cliques nos itens
                    item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                });
            } else {
                // Reseta ao fechar
                navLinks.style.transform = 'translateX(100%)';
                navLinks.style.pointerEvents = 'none'; // Desabilita cliques
                
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            }
        });
    }
    
    // Garante que o menu permanece visível quando rolada a página
    window.addEventListener('scroll', function() {
        if (navLinks.classList.contains('active') && window.innerWidth <= 768) {
            navLinks.style.opacity = '1';
            navLinks.style.transform = 'translateX(0)';
            navLinks.style.display = 'flex';
            navLinks.style.pointerEvents = 'auto'; // Mantém clicável durante rolagem
            
            // Reforça a visibilidade dos itens
            navItems.forEach(item => {
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto'; // Mantém itens clicáveis
            });
        }
    });
    
    // Fecha o menu ao clicar em qualquer parte da tela
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) && 
            e.target !== menuToggle && 
            !menuToggle.contains(e.target)) {
            
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            navLinks.style.pointerEvents = 'none'; // Desabilita cliques quando fechado
            
            navItems.forEach(item => {
                item.style.animation = '';
            });
        }
    });
    
    // Previne a propagação do clique dentro do menu
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Garante que os links são clicáveis
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.style.pointerEvents = 'auto';
            
            // Reforça o comportamento de clique nos links
            link.addEventListener('click', function(e) {
                // Mantém o comportamento normal do link
                if (window.innerWidth <= 768) {
                    // Fecha o menu após o clique
                    setTimeout(() => {
                        navLinks.classList.remove('active');
                        menuToggle.classList.remove('active');
                        navLinks.style.transform = 'translateX(100%)';
                        navLinks.style.pointerEvents = 'none';
                    }, 300);
                }
            });
        }
    });
}); 