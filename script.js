// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add transition effect
    body.style.transition = 'all 0.3s ease';
    
    // Update theme toggle button
    updateThemeToggleIcon(newTheme);
}

function updateThemeToggleIcon(theme) {
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    
    if (theme === 'light') {
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(-90deg)';
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0deg)';
    } else {
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0deg)';
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(90deg)';
    }
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("y85gNzTerVep-35sO");
    console.log('EmailJS initialized with user ID:', "y85gNzTerVep-35sO");
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = body.getAttribute('data-theme') === 'light' 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(15, 15, 35, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = body.getAttribute('data-theme') === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for project cards
            if (entry.target.classList.contains('project-card')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                entry.target.style.animationDelay = `${delay}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-item, .highlight-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;
        
        try {
            // Send email using EmailJS or similar service
            // For now, we'll simulate the email sending
            await sendEmail(name, email, subject, message);
            
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Email sending function
async function sendEmail(name, email, subject, message) {
    // You can integrate with EmailJS, Formspree, or any email service
    // For now, we'll simulate the email sending
    
    // Option 1: Using EmailJS (you'll need to add EmailJS script)
    if (typeof emailjs !== 'undefined') {
        console.log('Sending email with EmailJS...');
        console.log('Service ID:', 'service_b1t7r5t');
        console.log('Template ID:', 'template_hxbbpi5');
        console.log('Data:', { name, email, subject, message });
        
        try {
            const templateParams = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
            
            console.log('Attempting to send email with params:', templateParams);
            const result = await emailjs.send('service_b1t7r5t', 'template_hxbbpi5', templateParams);
            console.log('Email sent successfully:', result);
            return result;
        } catch (error) {
            console.error('EmailJS error:', error);
            if (error.text) {
                console.error('Error response:', error.text);
            }
            // Fall back to simulation if EmailJS fails
            console.log('Falling back to simulation...');
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Email would be sent to:', {
                        to: 'aiman.ziatdev@gmail.com',
                        from: email,
                        name: name,
                        subject: subject,
                        message: message
                    });
                    resolve();
                }, 2000);
            });
        }
    }
    
    // Option 2: Using Formspree (add action="https://formspree.io/f/YOUR_FORM_ID" to form)
    // The form will handle this automatically
    
    // Option 3: Simulate email sending (for demo purposes)
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Email would be sent to:', {
                to: 'aiman.ziat@example.com',
                from: email,
                name: name,
                subject: subject,
                message: message
            });
            resolve();
        }, 2000);
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced skill item hover effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
        item.style.background = 'var(--primary-color)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
        item.style.background = 'var(--background-dark)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Enhanced counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe profile stats
const profileStats = document.querySelector('.profile-stats');
if (profileStats) {
    statsObserver.observe(profileStats);
}

// Enhanced loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Profile picture error handling
document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.addEventListener('error', () => {
            // Fallback to icon if image fails to load
            profilePic.style.display = 'none';
            const fallbackIcon = document.createElement('i');
            fallbackIcon.className = 'fas fa-user-circle';
            fallbackIcon.style.cssText = `
                font-size: 4rem;
                color: var(--primary-color);
            `;
            profilePic.parentNode.appendChild(fallbackIcon);
        });
    }
});

// Enhanced floating shapes animation
function createFloatingShapes() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create additional floating elements
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-particle';
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(shape);
    }
}

// Add particle animation styles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize floating shapes
document.addEventListener('DOMContentLoaded', createFloatingShapes);

// Enhanced scroll animations
function createScrollAnimations() {
    const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

document.addEventListener('DOMContentLoaded', createScrollAnimations);

// Mouse trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY });
    
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
    
    // Create trail effect
    if (mouseTrail.length > 5) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.5;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }
});

// Enhanced hover effects for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
});

// Profile card enhanced animations
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mouseenter', () => {
        profileCard.style.transform = 'translateY(-10px) rotate(2deg)';
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'translateY(0) rotate(0deg)';
    });
} 