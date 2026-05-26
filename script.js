document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Interactive Custom Cursor
    // ==========================================================================
    const cursorRing = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    let mouseX = 0, mouseY = 0; // Real mouse coordinates
    let ringX = 0, ringY = 0;   // Interpolated ring coordinates
    let dotX = 0, dotY = 0;     // Interpolated dot coordinates
    let isMoving = false;

    // Detect touch device to disable custom cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursorRing && cursorDot) {
        cursorRing.style.opacity = 1;
        cursorDot.style.opacity = 1;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;
        });

        // Smooth cursor movement animation using linear interpolation (Lerp)
        const updateCursor = () => {
            if (isMoving) {
                // Lerp formula: current = current + (target - current) * ease
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                dotX += (mouseX - dotX) * 0.35;
                dotY += (mouseY - dotY) * 0.35;

                cursorRing.style.left = `${ringX}px`;
                cursorRing.style.top = `${ringY}px`;
                cursorDot.style.left = `${dotX}px`;
                cursorDot.style.top = `${dotY}px`;
            }
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        // Mouse hover effects on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .modal-trigger, .nav-dot, .attraction-item-link, .fest-item-link, .chatbot-icon, input, textarea, .notice-close-btn');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            target.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    } else {
        if (cursorRing) cursorRing.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }

    // ==========================================================================
    // 2. Fullscreen Scroll Snap & Active Chapter Navigation
    // ==========================================================================
    const sections = document.querySelectorAll('.chapter-section');
    const navDots = document.querySelectorAll('.nav-dot');
    const header = document.getElementById('header');

    // Scroll event for Header background (Scrolled effect on Hero section exit)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer to track active chapter and sync navigation dots
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when section occupies 50% of viewport
    };

    const chapterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                // Update navigation dots active state
                navDots.forEach(dot => {
                    const dotTarget = dot.getAttribute('href').replace('#', '');
                    if (dotTarget === activeId) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });

                // Add background overlay scrolled class to header if not on cover (hero)
                if (activeId === 'hero') {
                    header.classList.remove('scrolled');
                } else {
                    header.classList.add('scrolled');
                }
            }
        });
    }, observerOptions);

    sections.forEach(sec => chapterObserver.observe(sec));

    // Smooth navigation dot clicks
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            const targetSec = document.querySelector(targetId);
            if (targetSec) {
                targetSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================================================
    // 3. Dynamic Attractions Hover Media Switcher
    // ==========================================================================
    const attractionLinks = document.querySelectorAll('.attraction-item-link');
    const attractionImages = document.querySelectorAll('#attractions-media-panel .panel-bg-image');

    attractionLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Toggle active state in links
            attractionLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Swap active visual panel background image
            const targetBgId = link.getAttribute('data-target-bg');
            attractionImages.forEach(img => {
                if (img.getAttribute('id') === targetBgId) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
        });
    });

    // ==========================================================================
    // 4. Dynamic Festivals Hover Media Switcher
    // ==========================================================================
    const festivalLinks = document.querySelectorAll('.fest-item-link');
    const festivalImages = document.querySelectorAll('#festivals-media-panel .panel-bg-image');

    festivalLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Toggle active state in links
            festivalLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Swap active visual panel background image
            const targetFestBgId = link.getAttribute('data-target-fest');
            festivalImages.forEach(img => {
                if (img.getAttribute('id') === targetFestBgId) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
        });
    });

    // ==========================================================================
    // 5. Detail Modal Logic
    // ==========================================================================
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
                e.stopPropagation(); // Avoid triggering parent hover
                
                modalTitle.textContent = trigger.getAttribute('data-title');
                modalImage.src = trigger.getAttribute('data-image');
                modalDesc.textContent = trigger.getAttribute('data-desc');

                modal.style.display = 'flex';
                void modal.offsetWidth; // Trigger layout reflow
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

    // ==========================================================================
    // 5.5. Contact Form EmailJS Integration
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 전송 진행 중 상태 표시
            formStatus.textContent = '메시지를 전송하는 중입니다...';
            formStatus.className = 'form-status-msg sending';
            
            // emailjs.sendForm(service_id, template_id, form_element)
            emailjs.sendForm('service_be9gsfv', 'template_1elor8p', this)
                .then(() => {
                    formStatus.textContent = '메시지가 성공적으로 전송되었습니다! 담당자가 곧 확인하겠습니다.';
                    formStatus.className = 'form-status-msg success';
                    contactForm.reset();
                    
                    // 5초 뒤 성공 알림 숨기기
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, (error) => {
                    formStatus.textContent = '메시지 전송에 실패했습니다. 다시 시도해 주세요.';
                    formStatus.className = 'form-status-msg error';
                    console.error('EmailJS Send Error:', error);
        });
    }

    // ==========================================================================
    // 5.8. Notice Modal (Welcome Dialog)
    // ==========================================================================
    const noticeModal = document.getElementById('notice-modal');
    const noticeCloseBtn = document.querySelector('.notice-close-btn');
    const noticeConfirmBtn = document.querySelector('.btn-notice-confirm');

    if (noticeModal) {
        // Show immediately after load with a minor delay to prevent rendering glitch
        setTimeout(() => {
            noticeModal.style.display = 'flex';
            void noticeModal.offsetWidth; // Trigger layout reflow
            noticeModal.classList.add('show');
        }, 100);

        const closeNotice = () => {
            noticeModal.classList.remove('show');
            setTimeout(() => {
                noticeModal.style.display = 'none';
            }, 300);
        };

        if (noticeCloseBtn) noticeCloseBtn.addEventListener('click', closeNotice);
        if (noticeConfirmBtn) noticeConfirmBtn.addEventListener('click', closeNotice);

        window.addEventListener('click', (e) => {
            if (e.target === noticeModal) {
                closeNotice();
            }
        });
        
        // Connect with custom cursor hover effect
        if (noticeConfirmBtn && cursorRing) {
            noticeConfirmBtn.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            noticeConfirmBtn.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        }
        
        if (noticeCloseBtn && cursorRing) {
            noticeCloseBtn.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            noticeCloseBtn.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        }
    }
});

// ==========================================================================
// 6. Chatbot Helper Logic
// ==========================================================================
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbot-window');
    if (chatWindow) {
        chatWindow.classList.toggle('show');
    }
}

// Show Chatbot automatically after 2.5 seconds
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const chatWindow = document.getElementById('chatbot-window');
        if (chatWindow) {
            chatWindow.classList.add('show');
        }
    }, 2500);
});
