/**
 * Farming Animations & Decorations
 * Adds animated crops and farming elements to pages
 */

// SVG Crop Array
const cropElements = ['🌾', '🌱', '🥕', '🍅', '🌻', '🍎', '🥬', '🌽'];
const farmIcons = ['🚜', '💧', '🐄', '🌤️', '🌿'];

/**
 * Add floating crop decorations to hero section
 */
function addHeroCropDecorations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const positions = [
        { class: 'crop-top-left', emoji: '🌾' },
        { class: 'crop-top-right', emoji: '🌽' },
        { class: 'crop-bottom-left', emoji: '🥕' },
        { class: 'crop-bottom-right', emoji: '🌻' }
    ];

    positions.forEach(pos => {
        const element = document.createElement('div');
        element.className = `hero-crop-decoration ${pos.class}`;
        element.textContent = pos.emoji;
        element.style.fontSize = '3rem';
        element.style.userSelect = 'none';
        hero.appendChild(element);
    });
}

/**
 * Add animated background crop pattern
 */
function addBackgroundCropPattern() {
    const container = document.body;
    
    // Create background crops container
    const bgCrops = document.createElement('div');
    bgCrops.className = 'background-crops';
    container.insertBefore(bgCrops, container.firstChild);

    // Add scattered crops in background
    for (let i = 0; i < 12; i++) {
        const row = document.createElement('div');
        row.className = 'crop-row';
        row.textContent = cropElements[Math.floor(Math.random() * cropElements.length)];
        row.style.left = Math.random() * 100 + '%';
        row.style.top = Math.random() * 100 + '%';
        row.style.animationDelay = (i * 0.2) + 's';
        bgCrops.appendChild(row);
    }
}

/**
 * Add animated feature cards with farming theme
 */
function enhanceFeatureCards() {
    const cards = document.querySelectorAll('.card, .feature-card, [class*="feature"]');
    
    cards.forEach((card, index) => {
        // Add grow animation
        card.style.animation = `grow 0.6s ease-out ${index * 0.1}s backwards`;
        
        // Add hover pulse effect
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse-green 0.6s ease-out';
        });
    });
}

/**
 * Create floating crop animation on page elements
 */
function addFloatingCrops() {
    const elements = document.querySelectorAll('[data-farming-animate]');
    
    elements.forEach(el => {
        el.classList.add('floating-crop');
        
        // Randomly assign animation speed
        const speeds = ['slow', 'normal', 'fast'];
        el.classList.add(speeds[Math.floor(Math.random() * speeds.length)]);
    });
}

/**
 * Add water drop animation to action buttons
 */
function animateActionButtons() {
    const buttons = document.querySelectorAll('button[class*="primary"], a[class*="primary"]');
    
    buttons.forEach((btn, index) => {
        // Add bounce animation to CTAs
        if (btn.textContent.toLowerCase().includes('explore') || 
            btn.textContent.toLowerCase().includes('get started') ||
            btn.textContent.toLowerCase().includes('shop')) {
            btn.classList.add('bounce-cta');
        }
    });
}

/**
 * Add leaf sway animation to navigation
 */
function animateNavigation() {
    const navBrand = document.querySelector('.navbar span');
    if (navBrand) {
        navBrand.style.animation = 'sway 2s ease-in-out infinite';
    }
}

/**
 * Create interactive crop tooltip
 */
function createCropTooltip() {
    const elements = document.querySelectorAll('[title]');
    
    elements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const title = this.getAttribute('title');
            const emoji = cropElements[Math.floor(Math.random() * cropElements.length)];
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.textContent = `${emoji} ${title}`;
            tooltip.style.cssText = `
                position: absolute;
                background: linear-gradient(135deg, #1B4D2A, #3FA854);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 0.85rem;
                z-index: 1000;
                white-space: nowrap;
                pointer-events: none;
                animation: slideUp 0.3s ease-out;
                box-shadow: 0 4px 12px rgba(27, 77, 42, 0.3);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = (rect.top - 40) + 'px';
            
            // Remove on mouse leave
            this.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    });
}

/**
 * Add leaf wave animation to specific elements
 */
function addLeafWaveAnimations() {
    const leafElements = document.querySelectorAll('[data-leaf-wave]');
    leafElements.forEach(el => {
        el.classList.add('leaf-wave');
    });
}

/**
 * Dynamically add farming emoji accents to headings
 */
function decorateHeadings() {
    const headings = document.querySelectorAll('h2, h3');
    
    headings.forEach(heading => {
        // Skip if already decorated
        if (heading.textContent.includes('🌾')) return;
        
        // Add farming emoji at start
        const emoji = cropElements[Math.floor(Math.random() * cropElements.length)];
        heading.textContent = `${emoji} ${heading.textContent}`;
    });
}

/**
 * Create growing plant animation on scroll
 */
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('grow-animation');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .product-card, [class*="feature"]').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Add harvest season glow to important elements
 */
function addHarvestGlow() {
    const importantElements = document.querySelectorAll('[class*="featured"], [class*="highlight"], [class*="premium"]');
    importantElements.forEach(el => {
        el.classList.add('harvest-glow');
    });
}

/**
 * Initialize all farming animations
 */
function initFarmingAnimations() {
    // Add CSS if not already loaded
    if (!document.querySelector('link[href*="farming-animations"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        // Determine correct path based on current location
        const currentPath = window.location.pathname;
        const cssPath = currentPath.includes('/pages/') ? '../css/farming-animations.css' : '/css/farming-animations.css';
        link.href = cssPath;
        document.head.appendChild(link);
    }

    // Execute all animation functions
    addHeroCropDecorations();
    addBackgroundCropPattern();
    enhanceFeatureCards();
    addFloatingCrops();
    animateActionButtons();
    animateNavigation();
    addLeafWaveAnimations();
    decorateHeadings();
    addScrollAnimations();
    addHarvestGlow();
    createCropTooltip();

    console.log('🌾 Farming animations initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFarmingAnimations);
} else {
    initFarmingAnimations();
}

// Re-initialize on page navigation (for single-page apps)
window.addEventListener('hashchange', () => {
    setTimeout(initFarmingAnimations, 100);
});
