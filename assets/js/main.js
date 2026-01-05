// Lógica de Toggle do Menu Lateral (Off-Canvas / Push)
        function toggleMenu() {
            // Alterna a classe no body que dispara todas as transformações CSS
            document.body.classList.toggle('menu-open');
        }

        // Fechar menu ao clicar em links e rolar suavemente
        document.querySelectorAll('.menu-close-trigger').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Fecha o menu removendo a classe do body
                document.body.classList.remove('menu-open');

                if (targetSection) {
                    setTimeout(() => {
                        const headerOffset = 80;
                        const elementPosition = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }, 400); // Timeout levemente maior para permitir que a animação de fechar comece
                }
            });
        });

        // Lógica do Acordeão de Serviços
        function toggleService(button) {
            const content = button.nextElementSibling;
            const isOpen = button.classList.contains('active');
            const icon = button.querySelector('.icon');

            // 1. Fecha TODOS os outros serviços
            document.querySelectorAll('.accordion-btn').forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove('active');
                    const otherContent = btn.nextElementSibling;
                    const otherIcon = btn.querySelector('.icon');
                    
                    otherContent.style.maxHeight = null;
                    otherContent.classList.remove('open');
                    otherIcon.style.transform = 'rotate(0deg)';
                    otherIcon.textContent = '+';
                }
            });

            // 2. Alterna o serviço clicado
            if (!isOpen) {
                button.classList.add('active');
                content.classList.add('open');
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(45deg)'; 
            } else {
                button.classList.remove('active');
                content.classList.remove('open');
                content.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            }
        }

        // Observer para animações de scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

        // Lógica do Popup NR-1
        window.addEventListener('load', () => {
            setTimeout(() => {
                const popup = document.getElementById('nr1-popup');
                if(popup) {
                    popup.classList.remove('hidden');
                    // Pequeno delay para garantir que o display:block foi aplicado antes da transição de opacidade
                    setTimeout(() => {
                        popup.classList.remove('translate-y-10', 'opacity-0');
                    }, 50);
                }
            }, 4000); // Aparece após 4 segundos
        });

        function closePopup() {
            const popup = document.getElementById('nr1-popup');
            if(popup) {
                popup.classList.add('translate-y-10', 'opacity-0');
                setTimeout(() => {
                    popup.classList.add('hidden');
                }, 700); // Espera a transição terminar antes de esconder
            }
        }

/* Melhorias de UX
   - Fecha o menu com ESC
   - Fecha o menu ao clicar fora (quando aberto)
*/
(function () {
  const menu = document.getElementById('side-menu');

  function isMenuOpen() {
    return document.body.classList.contains('menu-open');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      document.body.classList.remove('menu-open');
    }
  });

  document.addEventListener('click', (e) => {
    if (!isMenuOpen()) return;
    const clickedInsideMenu = menu && menu.contains(e.target);
    const clickedMenuButton = !!e.target.closest('[onclick="toggleMenu()"]');
    if (!clickedInsideMenu && !clickedMenuButton) {
      document.body.classList.remove('menu-open');
    }
  }, { capture: true });
})();
