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