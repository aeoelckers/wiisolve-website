document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay-2');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if(elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check for elements in view
    revealOnScroll();

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevent scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Handle form submission (simulation)
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = '¡Mensaje Enviado!';
                btn.style.backgroundColor = '#10b981'; // Green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = 'var(--primary)';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});

// Chatbot Logic
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBody = document.getElementById('chat-body');

let chatStep = 0;
const userData = { name: '', company: '', need: '', contact: '' };

chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

const addMessage = (text, type) => {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
};

const handleChat = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    setTimeout(() => {
        if (chatStep === 0) {
            userData.name = text;
            addMessage(`Un gusto, ${text}. ¿De qué empresa nos contactas?`, 'bot');
            chatStep++;
        } else if (chatStep === 1) {
            userData.company = text;
            addMessage('Excelente. ¿En qué solución o asesoría estás interesado?', 'bot');
            chatStep++;
        } else if (chatStep === 2) {
            userData.need = text;
            addMessage('Perfecto. Por último, déjanos tu correo o teléfono para contactarte.', 'bot');
            chatStep++;
        } else if (chatStep === 3) {
            userData.contact = text;
            addMessage('¡Gracias! Un consultor experto de WiiSolve se pondrá en contacto contigo a la brevedad.', 'bot');
            chatStep++;
            console.log('Lead Collected:', userData);
            // Here you could send this data to an API or email
        }
    }, 1000);
};

chatSend.addEventListener('click', handleChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});
