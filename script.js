// WebCafé Cuba - Demo Premium Interactiva
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 WebCafé Cuba - Demo Premium cargada');
    
    // Configuración
    const CONFIG = {
        whatsapp: '5356168991',
        themes: {
            gold: { primary: '#D4A574', secondary: '#0A0A0A' },
            espresso: { primary: '#3C2F2F', secondary: '#D4A574' },
            olive: { primary: '#8A9A5B', secondary: '#2C2C2C' },
            burgundy: { primary: '#722F37', secondary: '#F5F5F5' }
        }
    };
    
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.pointerEvents = 'none';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initAnimations();
                }, 500);
            }, 1500);
        });
    }
    
    // 2. Navegación móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scrolled');
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            navbar.classList.toggle('scrolled', currentScroll > 50);
            lastScroll = currentScroll;
        });
    }
    
    // 4. Sistema de personalización de demo
    const colorTheme = document.getElementById('colorTheme');
    const layoutStyle = document.getElementById('layoutStyle');
    const fontStyle = document.getElementById('fontStyle');
    const demoContainer = document.getElementById('liveDemo');
    
    function updateDemoTheme() {
        const theme = colorTheme.value;
        const layout = layoutStyle.value;
        const font = fontStyle.value;
        
        // Actualizar colores
        const themeColors = CONFIG.themes[theme];
        if (themeColors) {
            document.documentElement.style.setProperty('--primary-gold', themeColors.primary);
            document.documentElement.style.setProperty('--espresso', themeColors.secondary);
        }
        
        // Actualizar layout
        demoContainer.className = 'demo-container';
        demoContainer.classList.add(layout);
        
        // Actualizar tipografía
        const body = document.body;
        body.classList.remove('font-elegant', 'font-clean', 'font-bold');
        body.classList.add(`font-${font}`);
        
        // Animación de cambio
        demoContainer.style.opacity = '0.5';
        setTimeout(() => {
            demoContainer.style.opacity = '1';
        }, 300);
    }
    
    if (colorTheme) colorTheme.addEventListener('change', updateDemoTheme);
    if (layoutStyle) layoutStyle.addEventListener('change', updateDemoTheme);
    if (fontStyle) fontStyle.addEventListener('change', updateDemoTheme);
    
    // 5. Filtros del menú interactivo
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar categorías
            const filter = this.getAttribute('data-filter');
            
            menuCategories.forEach(category => {
                if (filter === 'all' || category.getAttribute('data-category') === filter) {
                    category.style.display = 'block';
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 6. Botones de ordenar
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            
            // Feedback visual
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = 'var(--success)';
            this.style.borderColor = 'var(--success)';
            this.style.color = 'white';
            
            // Reset después de 2 segundos
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i>';
                this.style.background = '';
                this.style.borderColor = '';
                this.style.color = '';
            }, 2000);
            
            // Mostrar notificación
            showNotification(`"${itemName}" añadido al pedido`);
        });
    });
    
    // 7. Formulario de contacto premium
    const contactForm = document.getElementById('premiumContactForm');
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación
            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const businessType = document.getElementById('businessType').value;
            
            if (!name || !phone || !businessType) {
                showNotification('Por favor, completa los campos requeridos', 'error');
                return;
            }
            
            // Crear mensaje para WhatsApp
            let message = `*Nueva Consulta - WebCafé Cuba*\n\n`;
            message += `👤 *Nombre:* ${name}\n`;
            message += `📞 *Teléfono:* ${phone}\n`;
            message += `🏪 *Tipo de negocio:* ${businessType}\n`;
            
            const goals = document.getElementById('projectGoals').value;
            if (goals) message += `🎯 *Objetivos:* ${goals}\n`;
            
            const time = document.getElementById('preferredTime').value;
            if (time) {
                const times = {
                    morning: 'Mañana (9AM - 12PM)',
                    afternoon: 'Tarde (2PM - 5PM)',
                    evening: 'Noche (6PM - 9PM)'
                };
                message += `🕐 *Mejor horario:* ${times[time] || time}\n`;
            }
            
            message += `\n_Consulta enviada desde la demo premium_`;
            
            // Codificar y abrir WhatsApp
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${CONFIG.whatsapp}?text=${encodedMessage}`;
            
            // Abrir WhatsApp en nueva pestaña
            window.open(whatsappURL, '_blank');
            
            // Mostrar modal de éxito
            if (successModal) {
                successModal.classList.add('active');
                contactForm.reset();
            }
        });
    }
    
    // Cerrar modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }
    
    // Cerrar modal al hacer clic fuera
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
    
    // 8. Botón de scroll to top
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
                scrollTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
                scrollTopBtn.style.transform = 'translateY(10px)';
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 9. Compartir demo
    const shareBtn = document.getElementById('shareDemo');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const url = window.location.href;
            const text = 'Mira esta demo premium de páginas web para negocios gastronómicos en Cuba';
            
            if (navigator.share) {
                navigator.share({
                    title: 'WebCafé Cuba - Demo Premium',
                    text: text,
                    url: url
                });
            } else {
                navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                    showNotification('Enlace copiado al portapapeles');
                });
            }
        });
    }
    
    // 10. Portfolio y brochure (placeholders)
    const portfolioBtn = document.getElementById('viewPortfolio');
    const brochureBtn = document.getElementById('downloadBrochure');
    
    if (portfolioBtn) {
        portfolioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Portfolio disponible próximamente', 'info');
        });
    }
    
    if (brochureBtn) {
        brochureBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Brochure disponible próximamente', 'info');
        });
    }
    
    // 11. Animaciones de entrada
    function initAnimations() {
        const animateElements = document.querySelectorAll('.animate-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // 12. Estado del negocio en tiempo real
    function updateBusinessStatus() {
        const statusBadge = document.querySelector('.status-badge');
        if (!statusBadge) return;
        
        const now = new Date();
        const hour = now.getHours();
        const isOpen = hour >= 7 && hour < 22;
        
        if (isOpen) {
            statusBadge.innerHTML = '<i class="fas fa-circle"></i> Abierto ahora';
            statusBadge.className = 'status-badge open';
        } else {
            statusBadge.innerHTML = '<i class="fas fa-circle"></i> Cerrado';
            statusBadge.className = 'status-badge closed';
            statusBadge.style.background = 'rgba(220, 53, 69, 0.1)';
            statusBadge.style.color = '#DC3545';
        }
    }
    
    updateBusinessStatus();
    setInterval(updateBusinessStatus, 60000); // Actualizar cada minuto
    
    // 13. Efecto de escritura en el título
    function typeWriterEffect() {
        const titleLines = document.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 50 + Math.random() * 50);
                }
            };
            
            setTimeout(type, index * 500);
        });
    }
    
    setTimeout(typeWriterEffect, 2000);
    
    // 14. Contador de estadísticas
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const update = () => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
            } else {
                element.textContent = Math.floor(start);
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }
    
    // Animar contadores cuando sean visibles
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    const target = statNumber.textContent;
                    if (target === '48h') return; // No animar texto
                    
                    if (target === '100%') {
                        statNumber.classList.add('animated');
                        return;
                    }
                    
                    statNumber.classList.add('animated');
                    animateCounter(statNumber, parseInt(target));
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat').forEach(stat => {
        statObserver.observe(stat);
    });
    
    // 15. Efecto parallax en el hero
    function initParallax() {
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        }
    }
    
    initParallax();
    
    // 16. Validación de formulario en tiempo real
    const phoneInput = document.getElementById('clientPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (!value.startsWith('53')) {
                    value = '53' + value;
                }
                
                let formatted = '+53 ';
                
                if (value.length > 2) {
                    formatted += value.substring(2, 3) + ' ';
                }
                
                if (value.length > 3) {
                    formatted += value.substring(3, 6) + ' ';
                }
                
                if (value.length > 6) {
                    formatted += value.substring(6, 9);
                }
                
                if (value.length > 9) {
                    formatted += ' ' + value.substring(9, 12);
                }
                
                this.value = formatted.trim();
            }
        });
    }
    
    // 17. Sistema de notificaciones
    function showNotification(message, type = 'success') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#DC3545' : '#2E8B57'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(100%);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Botón de cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // 18. Efecto de partículas en el hero (opcional)
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(212, 165, 116, ${Math.random() * 0.3});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 1;
            `;
            
            hero.appendChild(particle);
            
            // Animación
            animateParticle(particle);
        }
    }
    
    function animateParticle(particle) {
        const duration = Math.random() * 20 + 10;
        const xDirection = Math.random() > 0.5 ? 1 : -1;
        const yDirection = Math.random() > 0.5 ? 1 : -1;
        
        particle.animate([
            { transform: 'translate(0, 0)', opacity: 0.1 },
            { 
                transform: `translate(${xDirection * Math.random() * 100}px, ${yDirection * Math.random() * 100}px)`,
                opacity: 0.8
            },
            { transform: 'translate(0, 0)', opacity: 0.1 }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }
    
    // Crear partículas después de cargar
    setTimeout(createParticles, 3000);
});

// Función para iniciar chat directo
function startChat(message = '') {
    const defaultMessage = 'Hola, me interesa una consulta sobre páginas web para mi negocio';
    const finalMessage = message || defaultMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    
    window.open(`https://wa.me/5356168991?text=${encodedMessage}`, '_blank');
}

// Función para vista previa rápida
function quickPreview(style = 'gold') {
    const themes = {
        gold: { primary: '#D4A574', secondary: '#0A0A0A' },
        espresso: { primary: '#3C2F2F', secondary: '#D4A574' }
    };
    
    const theme = themes[style];
    if (theme) {
        document.documentElement.style.setProperty('--primary-gold', theme.primary);
        document.documentElement.style.setProperty('--espresso', theme.secondary);
    }
    
    // Scroll a la demo
    document.querySelector('#demo').scrollIntoView({ behavior: 'smooth' });
}