/* Main JavaScript for AgriMarket */

const API_BASE_URL = 'http://localhost:5000/api';

// Sample crop data for demonstration (fallback)
const sampleCrops = [
    {
        _id: 1,
        name: 'Organic Tomatoes',
        farmer: 'John Farmer',
        price: 50,
        rating: 4.8,
        reviews: 234,
        image: 'https://via.placeholder.com/300x200?text=Organic+Tomatoes',
        quantity: 100,
        unit: 'kg'
    },
    {
        _id: 2,
        name: 'Fresh Milk',
        farmer: 'Jane Smith',
        price: 30,
        rating: 4.9,
        reviews: 567,
        image: 'https://via.placeholder.com/300x200?text=Fresh+Milk',
        quantity: 50,
        unit: 'liter'
    },
    {
        _id: 3,
        name: 'Organic Rice',
        farmer: 'Bob Johnson',
        price: 40,
        rating: 4.7,
        reviews: 345,
        image: 'https://via.placeholder.com/300x200?text=Organic+Rice',
        quantity: 200,
        unit: 'kg'
    },
    {
        _id: 4,
        name: 'Fresh Eggs',
        farmer: 'Alice Williams',
        price: 60,
        rating: 4.9,
        reviews: 789,
        image: 'https://via.placeholder.com/300x200?text=Fresh+Eggs',
        quantity: 150,
        unit: 'dozen'
    },
    {
        _id: 5,
        name: 'Green Vegetables',
        farmer: 'Charlie Brown',
        price: 35,
        rating: 4.6,
        reviews: 234,
        image: 'https://via.placeholder.com/300x200?text=Green+Vegetables',
        quantity: 120,
        unit: 'kg'
    },
    {
        _id: 6,
        name: 'Whole Wheat Flour',
        farmer: 'Diana Prince',
        price: 25,
        rating: 4.8,
        reviews: 456,
        image: 'https://via.placeholder.com/300x200?text=Whole+Wheat+Flour',
        quantity: 300,
        unit: 'kg'
    }
];

let trendingCrops = [...sampleCrops];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadTrendingCrops();
    setupEventListeners();
});

function initializePage() {
    updateNavbar();
    setupSmoothScroll();
}

// Update Navbar based on login status
function updateNavbar() {
    const isLoggedIn = localStorage.getItem('authToken');
    const loginBtn = document.querySelector('a[href="pages/login.html"]');
    const user = localStorage.getItem('agrimarket_user');
    
    if (isLoggedIn && loginBtn && user) {
        try {
            const userData = JSON.parse(user);
            loginBtn.innerHTML = `<span class="flex items-center space-x-2"><i class='bx bx-user'></i><span>${userData.firstName || 'Dashboard'}</span></span>`;
            loginBtn.href = 'pages/dashboard.html';
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }
}

// Fetch Helper with Authentication
async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.href = '/pages/login.html';
            }
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Load Trending Crops from API
async function loadTrendingCrops() {
    const container = document.getElementById('trending-crops');
    if (!container) return;
    
    try {
        // Try to load from backend API
        const response = await fetchAPI('/crops?limit=6');
        if (response && response.crops && response.crops.length > 0) {
            trendingCrops = response.crops;
        } else {
            trendingCrops = [...sampleCrops];
        }
    } catch (error) {
        console.warn('Failed to load from API, using sample data:', error);
        trendingCrops = [...sampleCrops];
    }
    
    container.innerHTML = trendingCrops.map(crop => createProductCard(crop)).join('');
    updateCartCount();
}

// Create Product Card HTML
function createProductCard(crop) {
    const cropId = crop._id || crop.id;
    return `
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group">
            <div class="relative overflow-hidden bg-light-green h-48">
                <img src="${crop.image || 'https://via.placeholder.com/300x200?text=' + crop.name}" alt="${crop.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-300">
                <div class="absolute top-2 right-2 bg-accent-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${crop.quantity}${crop.unit ? crop.unit.charAt(0).toUpperCase() : 'x'}
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-bold text-lg text-neutral-dark">${crop.name}</h3>
                <p class="text-gray-600 text-sm mb-2">by ${crop.farmer}</p>
                <div class="flex items-center mb-3">
                    <div class="text-warning-yellow text-sm">
                        ${'⭐'.repeat(Math.floor(crop.rating || 4))} 
                        <span class="text-gray-600">(${crop.reviews || 0})</span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-primary-green">$${crop.price}${crop.unit ? '/' + crop.unit : ''}</span>
                    <button class="bg-primary-green text-white p-2 rounded-lg hover:bg-secondary-green transition" 
                        onclick="addToCart('${cropId}', '${crop.name}', ${crop.price})">
                        <i class='bx bx-cart-add text-xl'></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Add to Cart
function addToCart(cropId, cropName, cropPrice) {
    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already in cart
    const existingItem = cart.find(item => item.id === cropId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: cropId,
            name: cropName,
            price: cropPrice,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${cropName} added to cart!`, 'success');
}

// Update Cart Count in Navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartBadge = document.querySelector('.navbar .relative span');
    if (cartBadge) {
        cartBadge.textContent = totalCount;
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold shadow-lg animate-bounce z-50
        ${type === 'success' ? 'bg-success-green' : type === 'error' ? 'bg-error-red' : 'bg-primary-green'}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class='bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-x-circle' : 'bx-info-circle'}'></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 500));
    }
    
    // Initialize lazy loading
    lazyLoadImages();
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search Handler
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const results = trendingCrops.filter(crop => 
        crop.name.toLowerCase().includes(query) || 
        crop.farmer.toLowerCase().includes(query)
    );
    
    // Update displayed crops
    const container = document.getElementById('trending-crops');
    if (container && query) {
        container.innerHTML = results.length > 0 
            ? results.map(crop => createProductCard(crop)).join('')
            : '<div class="col-span-4 text-center py-8 text-gray-600">No crops found</div>';
    } else if (container && !query) {
        container.innerHTML = trendingCrops.map(crop => createProductCard(crop)).join('');
    }
}

// Initialize cart count on page load
updateCartCount();

