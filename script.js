document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    
    // Scroll event for Header background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const fadeElements = document.querySelectorAll('.fade-in, .feature-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        if (el.classList.contains('feature-item')) {
            el.classList.add('fade-in'); 
        }
        observer.observe(el);
    });

    // Modal logic
    const modal = document.getElementById('attraction-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDesc = document.getElementById('modal-desc');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    if (modalTriggers && modal) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modalTitle.textContent = trigger.getAttribute('data-title');
                modalImage.src = trigger.getAttribute('data-image');
                modalDesc.textContent = trigger.getAttribute('data-desc');

                modal.style.display = 'flex';
                void modal.offsetWidth; // Trigger reflow
                modal.classList.add('show');
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Chatbot Logic
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbot-window');
    if (chatWindow) {
        chatWindow.classList.toggle('show');
    }
}

// Show Chatbot automatically after 2 seconds
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const chatWindow = document.getElementById('chatbot-window');
        if (chatWindow) {
            chatWindow.classList.add('show');
        }
    }, 2000);
});
