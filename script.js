document.addEventListener('DOMContentLoaded', () => {
    // 1. LÓGICA DE LAS VENTANAS EMERGENTES (MODALES)
    const modal = document.getElementById("contactModal");
    const btnOpenModal = document.getElementById("openModalBtn");
    const btnCloseModal = document.getElementById("closeModal");

    const mapModal = document.getElementById("mapModal");
    const btnOpenMap = document.getElementById("openMapBtn");
    const btnCloseMap = document.getElementById("closeMapModal");

    // Modal de Contacto
    btnOpenModal.addEventListener("click", (e) => {
        e.preventDefault(); 
        modal.style.display = "flex";
    });
    btnCloseModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Modal de Mapa
    btnOpenMap.addEventListener("click", (e) => {
        e.preventDefault();
        mapModal.style.display = "flex";
    });
    btnCloseMap.addEventListener("click", () => {
        mapModal.style.display = "none";
    });

    // Cerrar los modales al dar clic fuera del cuadro principal
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
        if (e.target === mapModal) {
            mapModal.style.display = "none";
        }
    });
    
    // 2. MÁQUINA DE ESCRIBIR
    const words = ["Ingeniero en Sistemas Computacionales", "Especialista en Ciencia de Datos", "Desarrollador Full-Stack", "Administrador de Sistemas Linux", "Especialista en Diagnóstico de Hardware"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const typewriterElement = document.getElementById('typewriterText');

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }
        setTimeout(type, typeSpeed);
    }
    type();

    // 3. TEMA OSCURO / CLARO
    const themeBtn = document.getElementById('themeBtn');
    const htmlElement = document.documentElement;
    let savedTheme = 'dark';

    try {
        savedTheme = localStorage.getItem('theme') || 'dark';
    } catch (error) {
        console.warn("Ejecución local detectada: localStorage desactivado.");
    }
    
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);

        try {
            localStorage.setItem('theme', newTheme);
        } catch (error) {}
    });

    function updateThemeIcon(theme) {
        const icon = themeBtn.querySelector('i');
        if (theme === 'dark') { 
            icon.className = 'bx bx-sun'; 
        } else { 
            icon.className = 'bx bx-moon'; 
        }
    }

    // 4. ANIMACIÓN AL HACER SCROLL (REVEAL)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(element => revealObserver.observe(element));
});