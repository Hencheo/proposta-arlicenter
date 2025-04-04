// Inicialização das animações AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização da biblioteca AOS com configurações mais intensas
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom',
        disable: 'mobile'
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

    // Efeito de parallax para background com movimento mais intenso
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Parallax para elementos decorativos
        document.querySelectorAll('.section-light::before, .section-dark::after').forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });

        // Efeito parallax para imagens
        document.querySelectorAll('.mockup-image, .flow-image, .flow-3d-image, .api-config-image').forEach(image => {
            const rect = image.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollPosition = window.innerHeight - rect.top;
                const parallaxValue = scrollPosition * 0.015; // Reduzindo o efeito pela metade
                image.style.transform = `translateY(${-parallaxValue}px) scale(${1 + parallaxValue * 0.005})`; // Reduzindo o efeito de escala também
            }
        });
    });

    // Smooth scroll para links internos com efeito mais suave
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

    // Adicionar efeito hover 3D aos cards com movimento mais intenso
    const cards = document.querySelectorAll('.tech-card, .benefit-card, .feature, .card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15; // Aumentando o efeito
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
            
            // Adicionar efeito de luz seguindo o mouse
            const glowElement = this.querySelector('.card-glow') || createGlowElement(this);
            glowElement.style.left = `${x}px`;
            glowElement.style.top = `${y}px`;
            glowElement.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            
            // Remover efeito de luz
            const glowElement = this.querySelector('.card-glow');
            if (glowElement) {
                glowElement.style.opacity = '0';
            }
        });
    });
    
    // Função para criar elemento de brilho nos cards
    function createGlowElement(parent) {
        const glow = document.createElement('div');
        glow.classList.add('card-glow');
        glow.style.position = 'absolute';
        glow.style.width = '100px';
        glow.style.height = '100px';
        glow.style.borderRadius = '50%';
        glow.style.background = 'radial-gradient(circle, rgba(96, 205, 160, 0.6) 0%, rgba(96, 205, 160, 0) 70%)';
        glow.style.pointerEvents = 'none';
        glow.style.opacity = '0';
        glow.style.transform = 'translate(-50%, -50%)';
        glow.style.transition = 'opacity 0.3s ease';
        glow.style.filter = 'blur(15px)';
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        parent.appendChild(glow);
        return glow;
    }

    // Highlight na seção atual durante scroll com efeito de glow
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
                // Adicionar efeito de pulsação
                item.style.animation = 'glow 1.5s infinite';
            } else {
                item.style.animation = 'none';
            }
        });
    });

    // Contador animado para o preço com efeito mais dramático
    const priceElement = document.querySelector('.price');
    if (priceElement) {
        const initialPrice = 11000;  // Preço inicial alto
        const targetPrice = 5000;    // Preço final baixo
        let currentPrice = initialPrice;
        const duration = 4500; // 2.5 segundos
        const frameRate = 120;
        const frameDuration = 1000 / frameRate;
        const totalFrames = duration / frameDuration;
        
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
        
        // Iniciar contador quando estiver visível com efeito mais dramático
        let priceAnimated = false;
        window.addEventListener('scroll', () => {
            if (!priceAnimated && isInViewport(priceElement)) {
                priceAnimated = true;
                
                // Adicionar efeito de luz ao preço
                priceElement.style.textShadow = '0 0 20px rgba(96, 205, 160, 0.8)';
                
                let frame = 0;
                const animate = () => {
                    if (frame < totalFrames) {
                        // Efeito de easing para começar rápido e terminar devagar
                        const progress = frame / totalFrames;
                        const easedProgress = progress < 0.5 
                            ? 4 * progress * progress * progress 
                            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                        
                        // Calcular o preço atual - diminuindo do inicial até o alvo
                        currentPrice = initialPrice - (initialPrice - targetPrice) * easedProgress;
                        priceElement.textContent = `R$ ${Math.floor(currentPrice).toLocaleString('pt-BR')}`;
                        frame++;
                        requestAnimationFrame(animate);
                    } else {
                        priceElement.textContent = `R$ ${targetPrice.toLocaleString('pt-BR')}`;
                        
                        // Adicionar efeito de pulsação ao finalizar
                        priceElement.style.animation = 'glow 2s infinite';
                    }
                };
                animate();
            }
        });
    }

    // Adicionar efeito de partículas futuristas em todas as seções
    const allSections = document.querySelectorAll('section');
    if (allSections.length > 0) {
        allSections.forEach(section => {
            createParticles(section);
        });
    }
    
    // Adicionar partículas extras para a seção hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        createExtraHeroParticles(heroSection);
    }
    
    // Função para criar partículas extras na hero
    function createExtraHeroParticles(container) {
        // Para evitar duplicação em chamadas subsequentes
        if (container.querySelector('.hero-particles-container')) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('hero-particles-container');
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.overflow = 'hidden';
        particlesContainer.style.zIndex = '0';
        container.style.position = 'relative';
        container.prepend(particlesContainer);
        
        // Criar muitas partículas para a hero
        const particleCount = 150;
        
        // Criar partículas
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            
            // Estilo base para partículas
            particle.style.position = 'absolute';
            
            // Varia o tamanho para criar efeito de profundidade
            const size = Math.random() * 7 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Varia a opacidade conforme o tamanho
            const opacity = size < 3 ? 0.3 : size < 5 ? 0.5 : 0.7;
            particle.style.background = `rgba(96, 205, 160, ${opacity})`;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 ${size * 2}px rgba(96, 205, 160, ${opacity + 0.1})`;
            
            // Posição inicial aleatória
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Duração da animação aleatória - reduzida para aumentar velocidade
            const duration = Math.random() * 5 + 8;
            particle.style.animation = `floatHeroParticle ${duration}s linear infinite`;
            
            // Atraso de início aleatório
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            // Adicionar ao container
            particlesContainer.appendChild(particle);
        }
        
        // Adicionar keyframes para a animação de float
        if (!document.querySelector('#hero-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'hero-particle-animation';
            style.textContent = `
                @keyframes floatHeroParticle {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 0;
                    }
                    5% {
                        opacity: 1;
                    }
                    50% {
                        transform: translate(${Math.random() * 80}px, ${Math.random() * 80}px) rotate(180deg);
                    }
                    95% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 200 + 150}px, ${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 200 + 150}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Função para criar partículas
    function createParticles(container) {
        // Para evitar duplicação em chamadas subsequentes
        if (container.querySelector('.particles-container')) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles-container');
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.overflow = 'hidden';
        particlesContainer.style.zIndex = '0';
        container.style.position = 'relative';
        container.prepend(particlesContainer);
        
        // Criar menos partículas para não sobrecarregar a página
        const particleCount = container.classList.contains('hero') ? 50 : 20;
        
        // Criar partículas
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Estilo base para partículas
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 5 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(96, 205, 160, 0.4)';
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 10px rgba(96, 205, 160, 0.6)';
            
            // Posição inicial aleatória
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Duração da animação aleatória (reduzida para aumentar velocidade)
            const duration = Math.random() * 4 + 6;
            particle.style.animation = `floatParticle ${duration}s linear infinite`;
            
            // Atraso de início aleatório
            particle.style.animationDelay = `${Math.random() * 3}s`;
            
            // Adicionar ao container
            particlesContainer.appendChild(particle);
        }
        
        // Adicionar keyframes para a animação de float
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes floatParticle {
                    0% {
                        transform: translate(0, 0);
                        opacity: 0;
                    }
                    5% {
                        opacity: 1;
                    }
                    95% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 150 + 80}px, ${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 150 + 80}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Efeito de typing para o título principal
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeEffect = setInterval(() => {
                if (i < originalText.length) {
                    mainTitle.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeEffect);
                    // Adicionar cursor piscante após completar
                    const cursor = document.createElement('span');
                    cursor.textContent = '|';
                    cursor.style.animation = 'blink 1s infinite';
                    cursor.style.opacity = '0.7';
                    mainTitle.appendChild(cursor);
                    
                    // Adicionar keyframes para animação de cursor
                    if (!document.querySelector('#cursor-animation')) {
                        const style = document.createElement('style');
                        style.id = 'cursor-animation';
                        style.textContent = `
                            @keyframes blink {
                                0%, 100% { opacity: 0; }
                                50% { opacity: 1; }
                            }
                        `;
                        document.head.appendChild(style);
                    }
                }
            }, 80);
        }, 500);
    }
}); 