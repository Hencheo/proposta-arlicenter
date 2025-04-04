// Inicialização das animações AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização da biblioteca AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });

    // Adiciona classes com atraso para criar efeito cascata
    const elements = document.querySelectorAll('.tech-card, .feature, .benefit-card, .timeline-item');
    let delay = 0;
    elements.forEach((element, index) => {
        element.setAttribute('data-aos-delay', delay);
        delay += 100; // Aumenta o atraso para cada elemento
        if (index % 3 === 0) {
            delay = 0; // Reseta o atraso após cada terceiro elemento
        }
    });

    // Efeito de parallax para background
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Parallax para elementos decorativos
        document.querySelectorAll('.section-light::before, .section-dark::after').forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Criando animação de scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar efeito hover 3D aos cards
    const cards = document.querySelectorAll('.tech-card, .benefit-card, .feature');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Highlight na seção atual durante scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.indice-item');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Contador animado para o preço
    const priceElement = document.querySelector('.price');
    if (priceElement) {
        const targetPrice = 5000;
        let currentPrice = 0;
        const duration = 2000; // 2 segundos
        const frameRate = 60;
        const frameDuration = 1000 / frameRate;
        const totalFrames = duration / frameDuration;
        const increment = targetPrice / totalFrames;
        
        // Função para verificar se o elemento está visível
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        
        // Iniciar contador quando estiver visível
        let priceAnimated = false;
        window.addEventListener('scroll', () => {
            if (!priceAnimated && isInViewport(priceElement)) {
                priceAnimated = true;
                let frame = 0;
                const animate = () => {
                    if (frame < totalFrames) {
                        currentPrice += increment;
                        priceElement.textContent = `R$ ${Math.floor(currentPrice).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                        frame++;
                        requestAnimationFrame(animate);
                    } else {
                        priceElement.textContent = `R$ ${targetPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                    }
                };
                animate();
            }
        });
    }

    // Adicionar classe 'active' ao item de índice correspondente à seção atual
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.indice-item');
        
        let currentId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentId = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentId}`) {
                item.classList.add('active');
            }
        });
    });
}); 