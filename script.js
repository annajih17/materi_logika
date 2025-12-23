// Main JavaScript for Logic Informatika Website

document.addEventListener('DOMContentLoaded', function() {
    // ========== ACTIVE NAVIGATION ==========
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
        else if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ========== FIXED MOBILE NAVIGATION ==========
    function initMobileNavigation() {
        if (window.innerWidth > 768) return;
        
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navbar || !navMenu) return;
        
        // Create hamburger button
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger-menu-btn';
        hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
        hamburgerBtn.innerHTML = '<span class="hamburger-icon"></span>';
        
        // Create overlay - place AFTER navbar
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        navbar.parentNode.insertBefore(overlay, navbar.nextSibling);
        
        // Add hamburger to navbar
        const navbarContainer = navbar.querySelector('.container');
        navbarContainer.appendChild(hamburgerBtn);
        
        // Create mobile menu header
        const mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-menu-header';
        mobileHeader.innerHTML = `
            <h3><i class="fas fa-brain"></i> Menu</h3>
            <button class="mobile-menu-close" aria-label="Close menu">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Insert header into menu
        navMenu.insertBefore(mobileHeader, navMenu.firstChild);
        
        // Toggle function
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
        
        // Event listeners with stopPropagation
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Overlay only closes menu
        overlay.addEventListener('click', function() {
            if (navMenu.classList.contains('mobile-active')) {
                toggleMobileMenu();
            }
        });
        
        // Close button
        const closeBtn = navMenu.querySelector('.mobile-menu-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });
        }
        
        // Close menu when clicking links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Prevent clicks inside menu from bubbling to overlay
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Handle resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768) {
                    // Clean up for desktop
                    navMenu.classList.remove('mobile-active');
                    overlay.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                    document.body.classList.remove('mobile-nav-open');
                    
                    const existingHeader = navMenu.querySelector('.mobile-menu-header');
                    if (existingHeader) existingHeader.remove();
                    
                    if (hamburgerBtn.parentNode) hamburgerBtn.remove();
                    if (overlay.parentNode) overlay.remove();
                }
            }, 250);
        });
    }
    
    // Initialize mobile nav
    if (window.innerWidth <= 768) {
        initMobileNavigation();
    }
    
    // ========== EXERCISE ANSWER TOGGLE ==========
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
                answerContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
    
    // ========== CODE BLOCKS ==========
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
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
    
    // ========== COPY TO CLIPBOARD ==========
    function copyToClipboard(codeElement) {
        const code = codeElement.textContent;
        navigator.clipboard.writeText(code).then(() => {
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
                z-index: 2000;
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 2000);
        });
    }
    
    codeBlocks.forEach(block => {
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
                z-index: 100;
            `;
            
            copyBtn.addEventListener('click', () => copyToClipboard(block));
            block.style.position = 'relative';
            block.appendChild(copyBtn);
        }
    });
    
    // ========== BACK TO TOP BUTTON ==========
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
        z-index: 999;
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
    
    // ========== RESIZE LISTENER ==========
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !document.querySelector('.hamburger-menu-btn')) {
            initMobileNavigation();
        }
    });
});
