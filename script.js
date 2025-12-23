// Set active navigation based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '' && linkPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Exercise page functionality
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answerId = this.getAttribute('data-answer');
            const answerContent = document.getElementById(answerId);
            
            if (answerContent.style.display === 'block') {
                answerContent.style.display = 'none';
                this.textContent = 'Tampilkan Jawaban';
            } else {
                answerContent.style.display = 'block';
                this.textContent = 'Sembunyikan Jawaban';
            }
        });
    });
});

// ========== HAMBURGER MENU - NO HTML CHANGES ==========

function initMobileNavigation() {
    // Cek jika sudah di mobile
    if (window.innerWidth > 768) return;
    
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar || !navMenu) return;
    
    // 1. Buat hamburger button
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'hamburger-menu-btn';
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
    hamburgerBtn.innerHTML = '<span class="hamburger-icon"></span>';
    
    // 2. Buat overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    
    // 3. Tambahkan ke DOM
    navbar.querySelector('.container').appendChild(hamburgerBtn);
    document.body.appendChild(overlay);
    
    // 4. Buat header untuk mobile menu
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-menu-header';
    mobileHeader.innerHTML = `
        <h3><i class="fas fa-brain"></i> Menu</h3>
        <button class="mobile-menu-close" aria-label="Close menu">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 5. Sisipkan header ke menu
    navMenu.insertBefore(mobileHeader, navMenu.firstChild);
    
    // 6. Fungsi toggle menu
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('mobile-active');
        
        if (isActive) {
            // Close menu
            navMenu.classList.remove('mobile-active');
            overlay.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            document.body.classList.remove('mobile-nav-open');
        } else {
            // Open menu
            navMenu.classList.add('mobile-active');
            overlay.classList.add('active');
            hamburgerBtn.classList.add('active');
            document.body.classList.add('mobile-nav-open');
        }
    }
    
    // 7. Event listeners
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);
    
    // Close button in mobile menu
    const closeBtn = navMenu.querySelector('.mobile-menu-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on a link (on mobile)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });
    
    // 8. Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                // Reset to desktop mode
                navMenu.classList.remove('mobile-active');
                overlay.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                document.body.classList.remove('mobile-nav-open');
                
                // Remove mobile header if exists
                const existingHeader = navMenu.querySelector('.mobile-menu-header');
                if (existingHeader) {
                    existingHeader.remove();
                }
                
                // Remove hamburger button and overlay
                hamburgerBtn.remove();
                overlay.remove();
            } else {
                // Re-initialize for mobile
                if (!document.querySelector('.hamburger-menu-btn')) {
                    initMobileNavigation();
                }
            }
        }, 250);
    });
}

// Initialize mobile navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Initialize mobile navigation if on mobile
    if (window.innerWidth <= 768) {
        initMobileNavigation();
    } else {
        // Add resize listener to handle mobile mode later
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768 && !document.querySelector('.hamburger-menu-btn')) {
                initMobileNavigation();
            }
        });
    }
    
    // Existing code...
});
