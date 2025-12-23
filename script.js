// Fungsi untuk set navigation active berdasarkan halaman saat ini
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        // Untuk halaman utama
        if ((currentPage === '' || currentPage === 'index.html' || currentPage === '../index.html') && 
            (linkPage === 'index.html' || linkPage === '' || linkPage === '../index.html')) {
            link.classList.add('active');
        }
        // Untuk halaman lain
        else if (currentPage === linkPage || 
                 (currentPage === '' && linkPage === 'index.html') ||
                 (currentPage === 'pages/' && linkPage.includes('pengenalan.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Exercise page functionality - toggle jawaban
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
                
                // Scroll ke jawaban jika perlu
                answerContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
    
    // Highlight code blocks
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        // Tambahkan line numbers jika belum ada
        if (!block.classList.contains('numbered')) {
            const code = block.textContent;
            const lines = code.split('\n');
            const numberedCode = lines.map((line, index) => {
                return `<span class="line-number">${index + 1}</span><span class="code-line">${line}</span>`;
            }).join('\n');
            
            block.innerHTML = numberedCode;
            block.classList.add('numbered');
        }
    });
});

// Fungsi untuk copy code ke clipboard
function copyToClipboard(codeElement) {
    const code = codeElement.textContent;
    navigator.clipboard.writeText(code).then(() => {
        // Tampilkan notifikasi
        const notification = document.createElement('div');
        notification.textContent = 'Kode disalin!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c3e50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);
    });
}

// Tambahkan event listener untuk semua tombol copy
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        // Tambahkan tombol copy jika belum ada
        if (!block.querySelector('.copy-btn')) {
            const copyBtn = document.createElement('button');
            copyBtn.textContent = '📋 Copy';
            copyBtn.className = 'copy-btn';
            copyBtn.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                background: #3498db;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 3px;
                cursor: pointer;
                font-size: 0.8rem;
            `;
            
            copyBtn.addEventListener('click', () => copyToClipboard(block));
            block.style.position = 'relative';
            block.appendChild(copyBtn);
        }
    });
});

// Back to top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.id = 'backToTop';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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
