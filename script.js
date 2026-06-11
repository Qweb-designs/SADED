// Add to your existing script.js file

// Pricing Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.getElementById('billingToggle');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            updatePricingDisplay();
            updateToggleLabels();
        });
        
        // Initial display
        updatePricingDisplay();
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

function updatePricingDisplay() {
    const isProjectBilling = document.getElementById('billingToggle').checked;
    const amounts = document.querySelectorAll('.amount');
    const periods = document.querySelectorAll('.period');
    
    amounts.forEach(amount => {
        const monthlyPrice = amount.getAttribute('data-monthly');
        const projectPrice = amount.getAttribute('data-project');
        amount.textContent = isProjectBilling ? projectPrice : monthlyPrice;
    });
    
    periods.forEach(period => {
        const monthlyPeriod = period.getAttribute('data-monthly');
        const projectPeriod = period.getAttribute('data-project');
        period.textContent = isProjectBilling ? projectPeriod : monthlyPeriod;
    });
}

function updateToggleLabels() {
    const labels = document.querySelectorAll('.toggle-label');
    const isProjectBilling = document.getElementById('billingToggle').checked;
    
    labels.forEach(label => {
        if ((label.textContent === 'Monthly' && !isProjectBilling) || 
            (label.textContent === 'Per Project' && isProjectBilling)) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact Form Submit Handler
function handleContactSubmit(e) {
