// ============================================
// SADED ELECTRONIC SERVICES - MAIN JAVASCRIPT
// ============================================

// Wait for DOM and Font Awesome to load
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // Determine if we're on admin or main page
    const isAdminPage = window.location.pathname.includes('admin.html');
    
    if (isAdminPage) {
        initAdminPanel();
    } else {
        initMainSite();
    }
}

// ============================================
// MAIN SITE INITIALIZATION
// ============================================
function initMainSite() {
    // Initialize components
    initNavigation();
    initLanguageToggle();
    initContactForm();
    initPortfolioDisplay();
    initScrollEffects();
    
    // Load initial language direction
    const savedLang = localStorage.getItem('saded_language') || 'ar';
    applyLanguage(savedLang);
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ============================================
// LANGUAGE TOGGLE SYSTEM
// ============================================
const translations = {
    // Navigation
    brandName: { ar: 'سديد / SADED', en: 'SADED / سديد' },
    langLabel: { ar: 'EN', en: 'AR' },
    navHome: { ar: 'الرئيسية', en: 'Home' },
    navServices: { ar: 'الخدمات', en: 'Services' },
    navPricing: { ar: 'الأسعار', en: 'Pricing' },
    navPortfolio: { ar: 'معرض الأعمال', en: 'Portfolio' },
    navContact: { ar: 'اتصل بنا', en: 'Contact' },
    
    // Hero Section
    heroTitle: {
        ar: 'نبني حلولاً رقمية<br>تدفع أعمالك للمستقبل',
        en: 'We Build Digital Solutions<br>That Drive Your Business Forward'
    },
    heroSubtitle: {
        ar: 'وكالة تقنية متكاملة تقدم خدمات تطوير الويب والتطبيقات والتصميم الإبداعي بأعلى معايير الجودة والاحترافية',
        en: 'A full-service tech agency providing web development, applications, and creative design with the highest quality standards'
    },
    ctaButton: { ar: 'ابدأ مشروعك الآن', en: 'Start Your Project Now' },
    statProjects: { ar: 'مشروع مكتمل', en: 'Completed Projects' },
    statClients: { ar: 'عميل سعيد', en: 'Happy Clients' },
    statSupport: { ar: 'دعم فني', en: 'Tech Support' },
    
    // Services Section
    servicesTitle: { ar: 'خدماتنا المتكاملة', en: 'Our Integrated Services' },
    servicesSubtitle: {
        ar: 'نقدم حلولاً تقنية شاملة تلبي احتياجات عملك المتكاملة',
        en: 'We offer comprehensive technical solutions that meet your integrated business needs'
    },
    
    service1Title: { ar: 'تطوير الويب والتطبيقات', en: 'Web & App Development' },
    service1Desc: {
        ar: 'نبني تطبيقات ويب متكاملة باستخدام أحدث التقنيات مع تركيز على الأداء العالي وتجربة المستخدم المتميزة',
        en: 'We build integrated web applications using the latest technologies with a focus on high performance and excellent user experience'
    },
    service1Feature1: { ar: 'مواقع متجاوبة مع جميع الأجهزة', en: 'Responsive websites for all devices' },
    service1Feature2: { ar: 'تطبيقات Full-Stack احترافية', en: 'Professional Full-Stack applications' },
    service1Feature3: { ar: 'قواعد بيانات آمنة ومتكاملة', en: 'Secure and integrated databases' },
    service1Feature4: { ar: 'بوابات دفع إلكتروني', en: 'Electronic payment gateways' },
    
    service2Title: { ar: 'تصميم الهوية والعلامات التجارية', en: 'Branding & Logo Design' },
    service2Desc: {
        ar: 'نصمم هوية بصرية متكاملة تعكس قيم علامتك التجارية وتجذب جمهورك المستهدف',
        en: 'We design a complete visual identity that reflects your brand values and attracts your target audience'
    },
    service2Feature1: { ar: 'تصميم شعار احترافي', en: 'Professional logo design' },
    service2Feature2: { ar: 'الهوية البصرية الكاملة', en: 'Complete visual identity' },
    service2Feature3: { ar: 'المطبوعات التجارية', en: 'Business stationery' },
    service2Feature4: { ar: 'أدلة استخدام العلامة', en: 'Brand guidelines' },
    
    service3Title: { ar: 'تصميم واجهات وتجربة المستخدم', en: 'UI/UX Interface Design' },
    service3Desc: {
        ar: 'نصمم واجهات مستخدم عصرية وتجارب استخدام سلسة تركز على سهولة التفاعل وجمالية التصميم',
        en: 'We design modern user interfaces and smooth user experiences focusing on ease of interaction and aesthetic design'
    },
    service3Feature1: { ar: 'تصميم واجهات تفاعلية', en: 'Interactive interface design' },
    service3Feature2: { ar: 'تجربة مستخدم محسّنة', en: 'Enhanced user experience' },
    service3Feature3: { ar: 'نماذج أولية تفاعلية', en: 'Interactive prototypes' },
    service3Feature4: { ar: 'اختبارات قابلية الاستخدام', en: 'Usability testing' },
    
    // Pricing Section
    pricingTitle: { ar: 'باقات الأسعار', en: 'Pricing Plans' },
    pricingSubtitle: {
        ar: 'اختر الباقة المناسبة لمشروعك وابدأ رحلة التحول الرقمي',
        en: 'Choose the right package for your project and start your digital transformation journey'
    },
    
    planBasic: { ar: 'الباقة الأساسية', en: 'Basic Plan' },
    planBasicSub: { ar: 'Startup', en: 'Startup' },
    planPro: { ar: 'الباقة الاحترافية', en: 'Professional Plan' },
    planProSub: { ar: 'Business', en: 'Business' },
    planEnterprise: { ar: 'الباقة المتقدمة', en: 'Enterprise Plan' },
    planEnterpriseSub: { ar: 'Advanced', en: 'Advanced' },
    popularBadge: { ar: 'الأكثر طلباً', en: 'Most Popular' },
    customPrice: { ar: 'سعر مخصص', en: 'Custom Price' },
    
    basicFeature1: { ar: 'صفحة هبوط مخصصة', en: 'Custom landing page' },
    basicFeature2: { ar: 'تصميم هوية أساسي', en: 'Basic branding concept' },
    basicFeature3: { ar: 'لغة واحدة', en: '1 language' },
    basicFeature4: { ar: 'دعم فني لمدة شهر', en: '1 month support' },
    
    proFeature1: { ar: 'موقع متعدد الصفحات', en: 'Multi-page website' },
    proFeature2: { ar: 'نظام إدارة محتوى CMS', en: 'CMS layout' },
    proFeature3: { ar: 'دعم لغتين كامل', en: 'Dual-language support' },
    proFeature4: { ar: 'تصميم متجاوب كامل', en: 'Full responsive design' },
    proFeature5: { ar: 'دعم فني 3 أشهر', en: '3 months support' },
    proFeature6: { ar: 'تحسين محركات البحث', en: 'SEO optimization' },
    
    enterpriseFeature1: { ar: 'تطبيقات Full-Stack', en: 'Full-Stack applications' },
    enterpriseFeature2: { ar: 'قواعد بيانات آمنة', en: 'Secure databases' },
    enterpriseFeature3: { ar: 'بوابات دفع متكاملة', en: 'Payment gateway integration' },
    enterpriseFeature4: { ar: 'حلول سحابية متقدمة', en: 'Advanced cloud solutions' },
    enterpriseFeature5: { ar: 'دعم فني 24/7', en: '24/7 support' },
    
    planCTA: { ar: 'ابدأ الآن', en: 'Get Started' },
    
    // Portfolio Section
    portfolioTitle: { ar: 'معرض أعمالنا', en: 'Our Portfolio' },
    portfolioSubtitle: {
        ar: 'نفتخر بمشاريعنا التي تعكس خبرتنا وجودتنا العالية',
        en: 'We are proud of our projects that reflect our expertise and high quality'
    },
    featuredProjectTitle: { ar: 'هوية سديد البصرية', en: 'Saded Visual Identity' },
    featuredProjectDesc: {
        ar: 'تصميم الهوية الكاملة لوكالة سديد للخدمات الإلكترونية، بما في ذلك الشعار، الألوان، والخطوط',
        en: 'Complete identity design for Saded Electronic Services Agency, including logo, colors, and typography'
    },
    
    // Contact Section
    contactTitle: { ar: 'تواصل معنا', en: 'Contact Us' },
    contactSubtitle: {
        ar: 'نحن هنا للإجابة على استفساراتكم وبدء مشروعكم الجديد',
        en: 'We are here to answer your inquiries and start your new project'
    },
    contactInfoTitle: { ar: 'معلومات التواصل', en: 'Contact Information' },
    contactLocation: { ar: 'عمّان، الأردن', en: 'Amman, Jordan' },
    formName: { ar: 'اسم العميل', en: 'Client Name' },
    formNamePlaceholder: { ar: 'أدخل اسمك الكامل', en: 'Enter your full name' },
    formEmail: { ar: 'البريد الإلكتروني', en: 'Email Address' },
    formMessage: { ar: 'تفاصيل المشروع', en: 'Project Details' },
    formMessagePlaceholder: { ar: 'صف مشروعك بالتفصيل...', en: 'Describe your project in detail...' },
    formSubmit: { ar: 'إرسال الطلب', en: 'Send Request' },
    successMessage: {
        ar: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً',
        en: 'Your request has been sent successfully! We will contact you soon'
    },
    
    // Footer
    footerText: {
        ar: 'جميع الحقوق محفوظة © 2024 سديد للخدمات الإلكترونية',
        en: 'All Rights Reserved © 2024 SADED Electronic Services'
    }
};

function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.lang || 'ar';
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        
        // Save preference
        localStorage.setItem('saded_language', newLang);
        
        // Apply language
        applyLanguage(newLang);
        
        // Show feedback
        showToast(newLang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language switched to English', 'success');
    });
}

function applyLanguage(lang) {
    // Set document direction and language
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all translatable elements
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[key] && translations[key][lang]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Update placeholder
                const placeholderKey = element.getAttribute('data-lang-key-placeholder');
                if (placeholderKey && translations[placeholderKey]) {
                    element.placeholder = translations[placeholderKey][lang];
                }
            } else {
                element.innerHTML = translations[key][lang];
            }
        }
    });
    
    // Update language toggle button text
    const langLabel = document.querySelector('[data-lang-key="langLabel"]');
    if (langLabel) {
        langLabel.textContent = lang === 'ar' ? 'EN' : 'AR';
    }
    
    // Update Font Awesome arrow direction in CTA
    const ctaButton = document.querySelector('.cta-button i');
    if (ctaButton) {
        ctaButton.className = lang === 'ar' ? 'fas fa-arrow-left' : 'fas fa-arrow-right';
    }
    
    // Update mobile menu direction
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.style.textAlign = lang === 'ar' ? 'right' : 'left';
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactSubmit();
    });
}

function handleContactSubmit() {
    const clientName = document.getElementById('clientName').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const projectDetails = document.getElementById('projectDetails').value.trim();
    
    // Validation
    if (!clientName || !clientEmail || !projectDetails) {
        showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    if (!isValidEmail(clientEmail)) {
        showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    // Create message object
    const message = {
        id: Date.now().toString(),
        clientName: clientName,
        clientEmail: clientEmail,
        projectDetails: projectDetails,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('ar-JO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('saded_messages') || '[]');
    messages.push(message);
    localStorage.setItem('saded_messages', JSON.stringify(messages));
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Show toast
    showToast('تم إرسال طلبك بنجاح! سنتواصل معك قريباً', 'success');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// PORTFOLIO DISPLAY
// ============================================
function initPortfolioDisplay() {
    renderPortfolioProjects();
    
    // Listen for storage changes from admin panel
    window.addEventListener('storage', function(e) {
        if (e.key === 'saded_projects') {
            renderPortfolioProjects();
        }
    });
}

function renderPortfolioProjects() {
    const dynamicPortfolio = document.getElementById('dynamicPortfolio');
    if (!dynamicPortfolio) return;
    
    const projects = JSON.parse(localStorage.getItem('saded_projects') || '[]');
    const currentLang = document.documentElement.lang || 'ar';
    
    dynamicPortfolio.innerHTML = '';
    
    if (projects.length === 0) {
        dynamicPortfolio.innerHTML = `
            <div class="portfolio-item" style="opacity: 0.6;">
                <div class="portfolio-image">
                    <div class="portfolio-image-placeholder">
                        <i class="fas fa-folder-open"></i>
                    </div>
                </div>
                <div class="portfolio-info">
                    <h3 class="portfolio-title">${currentLang === 'ar' ? 'مشاريع قادمة' : 'Upcoming Projects'}</h3>
                    <p class="portfolio-description">${currentLang === 'ar' ? 'سيتم إضافة المشاريع الجديدة هنا' : 'New projects will be added here'}</p>
                </div>
            </div>
        `;
        return;
    }
    
    projects.forEach(project => {
        const title = currentLang === 'ar' && project.titleAR ? project.titleAR : project.titleEN;
        const description = currentLang === 'ar' && project.descriptionAR ? project.descriptionAR : project.descriptionEN;
        
        const projectCard = document.createElement('div');
        projectCard.className = 'portfolio-item';
        projectCard.innerHTML = `
            <div class="portfolio-image">
                <div class="portfolio-image-placeholder">
                    <i class="fas fa-project-diagram"></i>
                </div>
            </div>
            <div class="portfolio-info">
                <h3 class="portfolio-title">${title || 'Untitled Project'}</h3>
                <p class="portfolio-description">${description || 'No description available'}</p>
            </div>
        `;
        
        dynamicPortfolio.appendChild(projectCard);
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    // Add scroll-based animations if needed
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const navbar = document.getElementById('navbar');
        
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// ============================================
// ADMIN PANEL INITIALIZATION
// ============================================
function initAdminPanel() {
    const loginOverlay = document.getElementById('loginOverlay');
    const dashboardContainer = document.getElementById('dashboardContainer');
    
    // Check if already logged in
    const isLoggedIn = sessionStorage.getItem('saded_admin_logged_in') === 'true';
    
    if (isLoggedIn) {
        showDashboard();
    }
    
    // Login button handler
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    // Enter key handler for login
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && loginOverlay && !loginOverlay.classList.contains('hidden')) {
            handleLogin();
        }
    });
}

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginError = document.getElementById('loginError');
    
    // Mock credentials check
    if (username === 'qusay' && password === 'saded2026') {
        // Successful login
        sessionStorage.setItem('saded_admin_logged_in', 'true');
        loginError.classList.remove('show');
        showDashboard();
        showToast('تم تسجيل الدخول بنجاح! مرحباً بك في لوحة التحكم', 'success');
    } else {
        // Failed login
        loginError.classList.add('show');
        showToast('بيانات الدخول غير صحيحة', 'error');
        
        // Shake animation
        const loginModal = document.querySelector('.login-modal');
        if (loginModal) {
            loginModal.style.animation = 'none';
            loginModal.offsetHeight; // Trigger reflow
            loginModal.style.animation = 'shake 0.5s ease-in-out';
        }
    }
}

function showDashboard() {
    const loginOverlay = document.getElementById('loginOverlay');
    const dashboardContainer = document.getElementById('dashboardContainer');
    
    if (loginOverlay) {
        loginOverlay.classList.add('hidden');
    }
    
    if (dashboardContainer) {
        dashboardContainer.classList.add('active');
    }
    
    // Initialize dashboard components
    loadInboxMessages();
    loadAdminProjects();
    updateStatistics();
}

function handleLogout() {
    sessionStorage.removeItem('saded_admin_logged_in');
    
    const loginOverlay = document.getElementById('loginOverlay');
    const dashboardContainer = document.getElementById('dashboardContainer');
    
    if (loginOverlay) {
        loginOverlay.classList.remove('hidden');
    }
    
    if (dashboardContainer) {
        dashboardContainer.classList.remove('active');
    }
    
    // Clear input fields
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    showToast('تم تسجيل الخروج بنجاح', 'success');
}

// ============================================
// INBOX MESSAGES MANAGEMENT
// ============================================
function loadInboxMessages() {
    const inboxTableBody = document.getElementById('inboxTableBody');
    const emptyInbox = document.getElementById('emptyInbox');
    const inboxTable = document.getElementById('inboxTable');
    
    if (!inboxTableBody) return;
    
    const messages = JSON.parse(localStorage.getItem('saded_messages') || '[]');
    
    // Update statistics
    document.getElementById('totalMessages').textContent = messages.length;
    
    if (messages.length === 0) {
        inboxTableBody.innerHTML = '';
        if (emptyInbox) emptyInbox.style.display = 'block';
        if (inboxTable) inboxTable.style.display = 'none';
        return;
    }
    
    if (emptyInbox) emptyInbox.style.display = 'none';
    if (inboxTable) inboxTable.style.display = 'table';
    
    // Sort by timestamp (newest first)
    messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    inboxTableBody.innerHTML = messages.map(msg => `
        <tr>
            <td><strong>${escapeHtml(msg.clientName)}</strong></td>
            <td>${escapeHtml(msg.clientEmail)}</td>
            <td>
                <span class="message-preview" onclick="viewFullMessage('${msg.id}')" title="اضغط لعرض التفاصيل الكاملة">
                    ${escapeHtml(msg.projectDetails.substring(0, 50))}${msg.projectDetails.length > 50 ? '...' : ''}
                </span>
            </td>
            <td>
                <button class="delete-btn" onclick="deleteMessage('${msg.id}')" title="حذف الرسالة">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function deleteMessage(id) {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    
    const messages = JSON.parse(localStorage.getItem('saded_messages') || '[]');
    const updatedMessages = messages.filter(msg => msg.id !== id);
    
    localStorage.setItem('saded_messages', JSON.stringify(updatedMessages));
    loadInboxMessages();
    updateStatistics();
    
    showToast('تم حذف الرسالة بنجاح', 'success');
}

function viewFullMessage(id) {
    const messages = JSON.parse(localStorage.getItem('saded_messages') || '[]');
    const message = messages.find(msg => msg.id === id);
    
    if (message) {
        alert(`
            العميل: ${message.clientName}
            البريد: ${message.clientEmail}
            التاريخ: ${message.date}
            
            تفاصيل المشروع:
            ${message.projectDetails}
        `);
    }
}

// ============================================
// PORTFOLIO PUBLISHER
// ============================================
function publishProject() {
    const titleAR = document.getElementById('projectTitleAR').value.trim();
    const titleEN = document.getElementById('projectTitleEN').value.trim();
    const descAR = document.getElementById('projectDescAR').value.trim();
    const descEN = document.getElementById('projectDescEN').value.trim();
    
    // Validation
    if (!titleAR || !titleEN || !descAR || !descEN) {
        showToast('يرجى ملء جميع الحقول باللغتين العربية والإنجليزية', 'error');
        return;
    }
    
    // Create project object
    const project = {
        id: Date.now().toString(),
        titleAR: titleAR,
        titleEN: titleEN,
        descriptionAR: descAR,
        descriptionEN: descEN,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const projects = JSON.parse(localStorage.getItem('saded_projects') || '[]');
    projects.push(project);
    localStorage.setItem('saded_projects', JSON.stringify(projects));
    
    // Clear form
    document.getElementById('projectTitleAR').value = '';
    document.getElementById('projectTitleEN').value = '';
    document.getElementById('projectDescAR').value = '';
    document.getElementById('projectDescEN').value = '';
    
    // Reload displays
    loadAdminProjects();
    updateStatistics();
    
    showToast('تم نشر المشروع بنجاح! سيظهر في معرض الأعمال', 'success');
}

function loadAdminProjects() {
    const projectsList = document.getElementById('projectsList');
    const emptyProjects = document.getElementById('emptyProjects');
    
    if (!projectsList) return;
    
    const projects = JSON.parse(localStorage.getItem('saded_projects') || '[]');
    
    // Update statistics
    document.getElementById('activeProjects').textContent = projects.length;
    
    if (projects.length === 0) {
        projectsList.innerHTML = '';
        if (emptyProjects) emptyProjects.style.display = 'block';
        return;
    }
    
    if (emptyProjects) emptyProjects.style.display = 'none';
    
    // Sort by newest first
    projects.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    projectsList.innerHTML = projects.map(project => `
        <div class="project-item">
            <div class="project-info">
                <h4>${escapeHtml(project.titleAR)} | ${escapeHtml(project.titleEN)}</h4>
                <p>${escapeHtml(project.descriptionAR.substring(0, 50))}...</p>
            </div>
            <button class="project-delete" onclick="deleteProject('${project.id}')">
                <i class="fas fa-trash"></i> حذف
            </button>
        </div>
    `).join('');
}

function deleteProject(id) {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟ سيتم إزالته من معرض الأعمال أيضاً')) return;
    
    const projects = JSON.parse(localStorage.getItem('saded_projects') || '[]');
    const updatedProjects = projects.filter(project => project.id !== id);
    
    localStorage.setItem('saded_projects', JSON.stringify(updatedProjects));
    loadAdminProjects();
    updateStatistics();
    
    showToast('تم حذف المشروع بنجاح', 'success');
}

// ============================================
// STATISTICS UPDATE
// ============================================
function updateStatistics() {
    const totalMessagesEl = document.getElementById('totalMessages');
    const activeProjectsEl = document.getElementById('activeProjects');
    
    if (totalMessagesEl) {
        const messages = JSON.parse(localStorage.getItem('saded_messages') || '[]');
        totalMessagesEl.textContent = messages.length;
    }
    
    if (activeProjectsEl) {
        const projects = JSON.parse(localStorage.getItem('saded_projects') || '[]');
        activeProjectsEl.textContent = projects.length;
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease-out forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// GLOBAL FUNCTIONS FOR HTML ONCLICK
// ============================================
window.deleteMessage = deleteMessage;
window.deleteProject = deleteProject;
window.viewFullMessage = viewFullMessage;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.publishProject = publishProject;

// ============================================
// PERIODIC REFRESH FOR REAL-TIME UPDATES
// ============================================
setInterval(() => {
    const isAdminPage = window.location.pathname.includes('admin.html');
    const isLoggedIn = sessionStorage.getItem('saded_admin_logged_in') === 'true';
    
    if (isAdminPage && isLoggedIn) {
        updateStatistics();
    }
}, 30000); // Refresh stats every 30 seconds

// Console welcome message
console.log(`
    ╔══════════════════════════════════════════╗
    ║   سديد للخدمات الإلكترونية               ║
    ║   SADED Electronic Services              ║
    ║   System v1.0.0 - Ready                  ║
    ╚══════════════════════════════════════════╝
`);