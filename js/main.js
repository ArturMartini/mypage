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

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { email, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Add scroll-based animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Mobile navigation toggle
const createMobileNav = () => {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '☰';
    
    // Add button to nav
    nav.insertBefore(mobileMenuBtn, navLinks);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
};

// Initialize mobile navigation if screen width is small
if (window.innerWidth <= 768) {
    createMobileNav();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            createMobileNav();
        }
    }
});

function calculateYears() {
    const yearElements = document.querySelectorAll('.years');
    const now = new Date();

    yearElements.forEach(element => {
        const startDate = new Date(element.dataset.start);
        const endDate = element.dataset.end ? new Date(element.dataset.end) : now;
        
        const diffTime = Math.abs(endDate - startDate);
        const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
        
        // Format the years with one decimal place
        const formattedYears = diffYears.toFixed(1);
        
        // Remove trailing .0 if it's a whole number
        const displayYears = formattedYears.endsWith('.0') 
            ? formattedYears.slice(0, -2) 
            : formattedYears;
            
        element.textContent = `${displayYears} years`;
    });
}

// Calculate years when the page loads
document.addEventListener('DOMContentLoaded', calculateYears); 