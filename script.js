// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    // Set current year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Initialize language
    const currentLang = localStorage.getItem('language') || 'es';
    if (typeof changeLanguage === 'function') {
        changeLanguage(currentLang);
    }

    // Language toggle
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function () {
            const currentLang = localStorage.getItem('language') || 'es';
            const newLang = currentLang === 'es' ? 'en' : 'es';
            if (typeof changeLanguage === 'function') {
                changeLanguage(newLang);
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu functionality - MEJORADO
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    // Crear el botón de cerrar si no existe
    if (mobileMenu && !mobileMenu.querySelector('.mobile-menu-close')) {
        const mobileMenuHeader = document.createElement('div');
        mobileMenuHeader.className = 'mobile-menu-header';

        const menuTitle = document.createElement('h3');
        menuTitle.textContent = 'Menú';
        menuTitle.style.color = 'var(--blue-dark)';
        menuTitle.style.fontSize = '1.2rem';
        menuTitle.style.fontWeight = '600';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-menu-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Cerrar menú');

        mobileMenuHeader.appendChild(menuTitle);
        mobileMenuHeader.appendChild(closeBtn);

        // Reorganizar el contenido del menú móvil
        const existingUl = mobileMenu.querySelector('ul');
        if (existingUl) {
            // Crear estructura de botones separada
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'mobile-menu-buttons';

            const languageDiv = document.createElement('div');
            languageDiv.className = 'mobile-language-controls';
            languageDiv.innerHTML = `
                <h4>Idioma</h4>
                <button id="mobile-language-toggle" class="btn language-btn" style="width: 80px;">ES</button>
            `;

            // Limpiar el UL existente y mantener solo los links de navegación
            const navLinks = Array.from(existingUl.children).filter(li => {
                const link = li.querySelector('a');
                return link && link.getAttribute('href').startsWith('#');
            });

            existingUl.innerHTML = '';
            navLinks.forEach(li => existingUl.appendChild(li));

            // Crear botones para login y registro
            const loginBtn = document.createElement('a');
            loginBtn.href = '#';
            loginBtn.className = 'btn btn-outline mobile-btn';
            loginBtn.setAttribute('data-i18n', 'login');
            loginBtn.textContent = 'Iniciar Sesión';

            const registerBtn = document.createElement('a');
            registerBtn.href = '#';
            registerBtn.className = 'btn btn-primary mobile-btn';
            registerBtn.setAttribute('data-i18n', 'register');
            registerBtn.textContent = 'Registrarse';

            buttonsDiv.appendChild(loginBtn);
            buttonsDiv.appendChild(registerBtn);

            // Insertar todo en el orden correcto
            mobileMenu.insertBefore(mobileMenuHeader, mobileMenu.firstChild);
            mobileMenu.appendChild(buttonsDiv);
            mobileMenu.appendChild(languageDiv);

            // Configurar el toggle de idioma móvil
            const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
            if (mobileLanguageToggle) {
                // Sincronizar con el idioma actual
                mobileLanguageToggle.textContent = currentLang === 'es' ? 'EN' : 'ES';

                mobileLanguageToggle.addEventListener('click', function () {
                    const currentLang = localStorage.getItem('language') || 'es';
                    const newLang = currentLang === 'es' ? 'en' : 'es';
                    if (typeof changeLanguage === 'function') {
                        changeLanguage(newLang);
                        // Actualizar ambos botones
                        this.textContent = newLang === 'es' ? 'EN' : 'ES';
                        if (languageToggle) {
                            languageToggle.textContent = newLang === 'es' ? 'EN' : 'ES';
                        }
                    }
                });
            }
        }
    }

    // Eventos del menú móvil
    if (mobileMenuBtn && mobileMenu) {
        function openMobileMenu() {
            mobileMenu.classList.add('active');
            mobileMenuBtn.classList.add('active');
            body.classList.add('menu-open');
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
        }

        // Toggle del menú
        mobileMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isActive = mobileMenu.classList.contains('active');

            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Botón de cerrar
        const closeBtn = mobileMenu.querySelector('.mobile-menu-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMobileMenu);
        }

        // Cerrar al hacer clic en los enlaces de navegación
        document.querySelectorAll('.mobile-menu a[href^="#"]').forEach(link => {
            link.addEventListener('click', function () {
                closeMobileMenu();
            });
        });

        // Cerrar al hacer clic fuera del menú
        document.addEventListener('click', function (e) {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Smooth scrolling mejorado para navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Video functionality
    const videoPlaceholder = document.getElementById('video-placeholder');
    const teamVideoPlaceholder = document.getElementById('team-video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function () {
            console.log('Demo video clicked');
            // Aquí implementarías la funcionalidad del video
        });
    }

    if (teamVideoPlaceholder) {
        teamVideoPlaceholder.addEventListener('click', function () {
            console.log('Team video clicked');
            // Aquí implementarías la funcionalidad del video del equipo
        });
    }

    const testimonialCards = document.querySelectorAll('.testimonial-card');

    // Intersection Observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añadir delay escalonado para la animación
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);

    // Inicializar estado de los testimonios
    testimonialCards.forEach((card, index) => {
        // Estado inicial para animación de entrada
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Observar para animación de entrada
        testimonialObserver.observe(card);

        // Efectos adicionales de hover
        card.addEventListener('mouseenter', function () {
            // Efecto de brillo en las estrellas
            const stars = this.querySelectorAll('.testimonial-rating i');
            stars.forEach((star, starIndex) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.2) rotate(10deg)';
                    setTimeout(() => {
                        star.style.transform = 'scale(1) rotate(0deg)';
                    }, 150);
                }, starIndex * 50);
            });
        });

        card.addEventListener('mouseleave', function () {
            // Reset de efectos
            const stars = this.querySelectorAll('.testimonial-rating i');
            stars.forEach(star => {
                star.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    });

    // Back to top button mejorado
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        let isVisible = false;

        window.addEventListener('scroll', function () {
            const shouldShow = window.pageYOffset > 300;

            if (shouldShow && !isVisible) {
                backToTopBtn.classList.add('visible');
                isVisible = true;
            } else if (!shouldShow && isVisible) {
                backToTopBtn.classList.remove('visible');
                isVisible = false;
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.step, .problem-card, .feature-box, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // Actualizar el toggle de idioma cuando cambie el idioma
    function updateLanguageToggles(lang) {
        const toggleText = lang === 'es' ? 'EN' : 'ES';

        if (languageToggle) {
            languageToggle.textContent = toggleText;
        }

        const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
        if (mobileLanguageToggle) {
            mobileLanguageToggle.textContent = toggleText;
        }
    }

    // Sobrescribir la función changeLanguage si existe para sincronizar los botones
    if (typeof changeLanguage === 'function') {
        const originalChangeLanguage = changeLanguage;
        window.changeLanguage = function (lang) {
            originalChangeLanguage(lang);
            updateLanguageToggles(lang);
        };
    }

    // Carrusel automático duplicado para la sección de solución
    // Duplicar slides para scroll infinito
    const track = document.querySelector('.solution-carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });
    }

    (function () {
    const cta = document.getElementById('cta-btn');
    let lastScroll = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 300) {
        // bajando
        cta.style.transform = 'translateY(100px)';
        cta.style.opacity = '0';
        } else {
        // subiendo
        cta.style.transform = 'translateY(0)';
        cta.style.opacity = '1';
        }
        lastScroll = currentScroll;
    });
    })();
});