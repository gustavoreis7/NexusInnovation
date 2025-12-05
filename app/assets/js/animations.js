// CORREÇÃO NO INÍCIO DO animations.js
document.addEventListener('DOMContentLoaded', function () {
  // GARANTIR QUE TEXTO NÃO DESAPAREÇA
  setTimeout(() => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      // Remover qualquer estilo que esconda
      if (el.style.opacity === '0') el.style.opacity = '1';
      if (el.style.visibility === 'hidden') el.style.visibility = 'visible';
      if (el.style.display === 'none') el.style.display = '';
    });
  }, 100);


  // 1. ANIMAÇÃO DE PARTICULAS NO HERO
  function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Criar container de partículas
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    `;
    hero.appendChild(particlesContainer);

    // Criar partículas
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Propriedades aleatórias
      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const animationDuration = Math.random() * 20 + 20;
      const animationDelay = Math.random() * 5;
      const opacity = Math.random() * 0.4 + 0.1;
      const color = i % 2 === 0 ? '#3A36E0' : '#6C69FF';

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        opacity: ${opacity};
        animation: floatParticle ${animationDuration}s linear infinite ${animationDelay}s;
        box-shadow: 0 0 10px ${color};
      `;

      particlesContainer.appendChild(particle);
    }

    // Adicionar keyframes CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatParticle {
        0% {
          transform: translate(0, 0) rotate(0deg);
          opacity: ${Math.random() * 0.4 + 0.1};
        }
        25% {
          transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(90deg);
        }
        50% {
          transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(180deg);
          opacity: ${Math.random() * 0.6 + 0.2};
        }
        75% {
          transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(270deg);
        }
        100% {
          transform: translate(0, 0) rotate(360deg);
          opacity: ${Math.random() * 0.4 + 0.1};
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 2. ANIMAÇÃO DE DIGITAÇÃO PARA TÍTULOS
  function initTypewriterAnimations() {
    const elements = document.querySelectorAll('[data-typewriter]');

    elements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid var(--primary)';

      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        } else {
          // Piscar cursor no final
          element.style.animation = 'blinkCursor 1s infinite';
        }
      };

      // Iniciar quando elemento estiver visível
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          typeWriter();
          observer.unobserve(element);
        }
      });

      observer.observe(element);
    });

    // Adicionar keyframe para piscar cursor
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blinkCursor {
        0%, 100% { border-color: transparent; }
        50% { border-color: var(--primary); }
      }
    `;
    document.head.appendChild(style);
  }

  // 3. ANIMAÇÃO DE REVEAL EM ELEMENTOS COM SCROLL
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // Animações específicas por tipo
          if (entry.target.classList.contains('reveal-left')) {
            entry.target.style.animation = 'slideFromLeft 0.8s ease forwards';
          } else if (entry.target.classList.contains('reveal-right')) {
            entry.target.style.animation = 'slideFromRight 0.8s ease forwards';
          } else if (entry.target.classList.contains('reveal-up')) {
            entry.target.style.animation = 'slideFromBottom 0.8s ease forwards';
          } else if (entry.target.classList.contains('reveal-scale')) {
            entry.target.style.animation = 'scaleUp 0.8s ease forwards';
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Adicionar keyframes CSS
    const style = document.createElement('style');
    style.textContent = `
      .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
      
      .reveal-left { transform: translateX(-50px); }
      .reveal-right { transform: translateX(50px); }
      .reveal-up { transform: translateY(50px); }
      .reveal-scale { transform: scale(0.8); }
      
      .revealed {
        opacity: 1;
        transform: translate(0) scale(1);
      }
      
      @keyframes slideFromLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideFromRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideFromBottom {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes scaleUp {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 4. ANIMAÇÃO DE HOVER PARA CARDS
  function initCardHoverEffects() {
    const cards = document.querySelectorAll('.servico-card, .case-card');

    cards.forEach(card => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';

        // Efeito de brilho
        const glow = document.createElement('div');
        glow.className = 'card-glow';
        glow.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(58, 54, 224, 0.1) 0%, transparent 70%);
          border-radius: inherit;
          z-index: -1;
          pointer-events: none;
        `;
        this.appendChild(glow);
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';

        const glow = this.querySelector('.card-glow');
        if (glow) {
          glow.remove();
        }
      });
    });
  }

  // 5. ANIMAÇÃO DE ÍCONES FLUTUANTES
  function initFloatingIcons() {
    const icons = document.querySelectorAll('.tech-icons i, .servico-icon i');

    icons.forEach(icon => {
      // Adicionar animação aleatória
      const animationName = `floatIcon${Math.floor(Math.random() * 1000)}`;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes ${animationName} {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-5deg);
          }
        }
      `;
      document.head.appendChild(style);

      icon.style.animation = `${animationName} ${duration}s ease-in-out infinite ${delay}s`;
    });
  }

  // 6. ANIMAÇÃO DE PROGRESSO EM SCROLL
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      z-index: 1001;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // 7. ANIMAÇÃO DE CONTADOR AVANÇADA
  function initAdvancedCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          const duration = 2000; // 2 segundos
          const increment = target / (duration / 16); // 60fps
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = prefix + Math.floor(current) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = prefix + target + suffix;

              // Efeito de pulso ao completar
              counter.style.transform = 'scale(1.1)';
              setTimeout(() => {
                counter.style.transform = 'scale(1)';
                counter.style.transition = 'transform 0.3s ease';
              }, 300);
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // 8. ANIMAÇÃO DE BACKGROUND GRADIENT
  function initAnimatedBackground() {
    const ctaSection = document.querySelector('.cta');
    if (!ctaSection) return;

    // Criar gradiente animado
    ctaSection.style.background = `
      linear-gradient(
        135deg,
        var(--primary) 0%,
        var(--primary-dark) 50%,
        var(--primary-light) 100%
      )
    `;

    // Adicionar keyframes para animação sutil
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `;
    document.head.appendChild(style);

    ctaSection.style.backgroundSize = '200% 200%';
    ctaSection.style.animation = 'gradientShift 10s ease infinite';
  }

  // 9. ANIMAÇÃO DE BOTÕES
  function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(button => {
      button.addEventListener('click', function (e) {
        // Criar efeito de ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
        `;

        this.appendChild(ripple);

        // Remover ripple após animação
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });

      // Adicionar keyframes para ripple
      const style = document.createElement('style');
      style.textContent = `
        .btn {
          position: relative;
          overflow: hidden;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    });
  }

  // 10. ANIMAÇÃO DE FORMULÁRIO
  function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

    formInputs.forEach(input => {
      // Animar label flutuante (se houver)
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        input.addEventListener('focus', function () {
          label.style.transform = 'translateY(-20px)';
          label.style.fontSize = '0.85rem';
          label.style.color = 'var(--primary)';
        });

        input.addEventListener('blur', function () {
          if (!this.value) {
            label.style.transform = 'translateY(0)';
            label.style.fontSize = '1rem';
            label.style.color = 'inherit';
          }
        });
      }

      // Animar borda ao focar
      input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateY(-2px)';
      });

      input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateY(0)';
      });
    });
  }

  // 11. ANIMAÇÃO DE MENU RESPONSIVO
  function initMenuAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      link.addEventListener('mouseenter', function () {
        // Linha animada sob o link
        const line = document.createElement('div');
        line.className = 'nav-line';
        line.style.cssText = `
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
        `;

        this.appendChild(line);

        // Animar linha
        setTimeout(() => {
          line.style.width = '100%';
        }, 10);
      });

      link.addEventListener('mouseleave', function () {
        const line = this.querySelector('.nav-line');
        if (line) {
          line.style.width = '0';
          setTimeout(() => line.remove(), 300);
        }
      });
    });
  }

  // 12. ANIMAÇÃO DE CARREGAMENTO INICIAL
  function initLoadingAnimation() {
    // Criar tela de loading
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--dark);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    // Logo animada
    const logo = document.createElement('div');
    logo.innerHTML = '<i class="fas fa-bolt" style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;"></i>';
    logo.style.animation = 'pulse 2s infinite';

    // Spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.cssText = `
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;

    // Texto
    const text = document.createElement('p');
    text.textContent = 'Nexus Innovation';
    text.style.cssText = `
      color: var(--white);
      margin-top: 20px;
      font-family: 'Poppins', sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      opacity: 0;
      animation: fadeIn 1s ease 0.5s forwards;
    `;

    loadingScreen.appendChild(logo);
    loadingScreen.appendChild(spinner);
    loadingScreen.appendChild(text);
    document.body.appendChild(loadingScreen);

    // Adicionar keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
      
      @keyframes fadeIn {
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    // Remover loading após carregamento
    window.addEventListener('load', function () {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';

        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 1000);
    });
  }

  // 13. ANIMAÇÃO DE PARALLAX
  function initParallaxEffect() {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;

      // Elementos para efeito parallax
      const parallaxElements = document.querySelectorAll('[data-parallax]');

      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax-speed') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      // Animar elementos ao rolar
      const animateOnScroll = document.querySelectorAll('[data-animate-on-scroll]');

      animateOnScroll.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.8) {
          element.classList.add('animated');

          // Delay baseado na posição
          const delay = element.getAttribute('data-animate-delay') || 0;
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, delay);
        }
      });
    });
  }

  // 14. ANIMAÇÃO DE TOOLTIPS
  function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', function () {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
          position: absolute;
          background: var(--dark);
          color: var(--white);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          white-space: nowrap;
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        `;

        this.appendChild(tooltip);

        // Posicionar tooltip
        const rect = this.getBoundingClientRect();
        tooltip.style.left = '50%';
        tooltip.style.bottom = '100%';
        tooltip.style.transform = 'translateX(-50%) translateY(10px)';

        // Animar entrada
        setTimeout(() => {
          tooltip.style.opacity = '1';
          tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
        }, 10);
      });

      element.addEventListener('mouseleave', function () {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
          tooltip.style.opacity = '0';
          tooltip.style.transform = 'translateX(-50%) translateY(10px)';

          setTimeout(() => {
            tooltip.remove();
          }, 300);
        }
      });
    });
  }

  // 15. ANIMAÇÃO DE TIMELINE (para seção de processo)
  function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Animar linha do tempo
          const line = entry.target.querySelector('.timeline-line');
          if (line) {
            line.style.height = '100%';
            line.style.transition = 'height 1s ease';
          }
        }
      });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => timelineObserver.observe(item));
  }

  // INICIALIZAR TODAS AS ANIMAÇÕES
  function initAllAnimations() {
    // Animações que rodam sempre
    createParticles();
    initCardHoverEffects();
    initFloatingIcons();
    initButtonAnimations();
    initFormAnimations();
    initMenuAnimations();
    initTooltips();

    // Animações opcionais (descomente as que quiser usar)
    // initLoadingAnimation(); // Tela de loading inicial
    initScrollProgress(); // Barra de progresso no scroll
    initScrollReveal(); // Revelar elementos no scroll
    initAdvancedCounters(); // Contadores animados
    initAnimatedBackground(); // Background animado
    initParallaxEffect(); // Efeito parallax
    // initTimelineAnimation(); // Para seção de timeline

    // Adicionar atributos para animações específicas
    setTimeout(() => {
      const titles = document.querySelectorAll('.section-title, .hero-title');
      titles.forEach((title, index) => {
        title.classList.add('reveal', 'reveal-up');
        title.style.animationDelay = `${index * 0.1}s`;
      });

      // Adicionar tooltip aos ícones sociais
      const socialIcons = document.querySelectorAll('.social-links a');
      socialIcons.forEach(icon => {
        const platform = icon.querySelector('i').className.split(' ')[1].replace('fa-', '');
        icon.setAttribute('data-tooltip', platform.charAt(0).toUpperCase() + platform.slice(1));
      });
    }, 100);
  }

  // Inicializar quando DOM estiver pronto
  initAllAnimations();

  // Recarregar animações ao redimensionar janela
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Recriar partículas (se necessário)
      const particlesContainer = document.querySelector('.particles-container');
      if (particlesContainer) {
        particlesContainer.remove();
        createParticles();
      }
    }, 250);
  });

  // Debug: Log para verificar se animations.js carregou
  console.log('✅ Animations.js carregado com sucesso!');
});
// Adicione este script para as animações da seção sobre
document.addEventListener('DOMContentLoaded', function () {
  // Animar contadores quando a seção estiver visível
  const sobreSection = document.querySelector('#sobre');
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar contadores
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'));
          const current = parseInt(stat.textContent);

          if (current < target) {
            let count = current;
            const increment = target / 100;
            const timer = setInterval(() => {
              count += increment;
              if (count >= target) {
                stat.textContent = target;
                clearInterval(timer);
              } else {
                stat.textContent = Math.floor(count);
              }
            }, 20);
          }

          stat.classList.add('animated');
        });

        // Mostrar elementos com delay
        const cards = document.querySelectorAll('.sobre-card, .diferencial-item, .sobre-stats');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 150);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (sobreSection) {
    observer.observe(sobreSection);
  }
});

// Exportar funções para uso em outros arquivos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createParticles,
    initTypewriterAnimations,
    initScrollReveal,
    initCardHoverEffects,
    initFloatingIcons,
    initScrollProgress,
    initAdvancedCounters,
    initAnimatedBackground,
    initButtonAnimations,
    initFormAnimations,
    initMenuAnimations,
    initLoadingAnimation,
    initParallaxEffect,
    initTooltips,
    initTimelineAnimation,
    initAllAnimations
  };
}