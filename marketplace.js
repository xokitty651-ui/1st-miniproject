// Marketplace Page - Product Display and Filtering

const API_BASE_URL = 'http://localhost:5000/api';

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
                localStorage.removeItem('authToken');
                window.location.href = 'login.html';
            }
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Sample crop data (will be replaced with API calls)
const sampleCrops = [
    { _id: '1', name: 'Tomatoes', category: 'vegetables', price: 150, farmer: 'John Farm', rating: 4.8, quantity: 50, description: 'Fresh red tomatoes' },
    { _id: '2', name: 'Carrots', category: 'vegetables', price: 80, farmer: 'Green Valley', rating: 4.6, quantity: 100, description: 'Organic carrots' },
    { _id: '3', name: 'Apples', category: 'fruits', price: 200, farmer: 'Orchard Fresh', rating: 4.9, quantity: 75, description: 'Crisp red apples' },
    { _id: '4', name: 'Wheat', category: 'grains', price: 5000, farmer: 'Harvest Farms', rating: 4.7, quantity: 10, description: 'Premium wheat grain' },
    { _id: '5', name: 'Milk', category: 'dairy', price: 60, farmer: 'Dairy Lane', rating: 4.5, quantity: 200, description: 'Fresh milk' },
    { _id: '6', name: 'Potatoes', category: 'vegetables', price: 120, farmer: 'Root Crops Co', rating: 4.4, quantity: 150, description: 'High-quality potatoes' },
    { _id: '7', name: 'Bananas', category: 'fruits', price: 100, farmer: 'Tropical Farms', rating: 4.8, quantity: 120, description: 'Fresh bananas' },
    { _id: '8', name: 'Rice', category: 'grains', price: 8000, farmer: 'Rice Valley', rating: 4.6, quantity: 8, description: 'Premium jasmine rice' },
];

let allCrops = [...sampleCrops];
let filteredCrops = [...sampleCrops];
let currentPage = 1;
const itemsPerPage = 8;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCrops();
    setupEventListeners();
    loadCart();
});

function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('price-filter').addEventListener('change', applyFilters);
    document.getElementById('sort-filter').addEventListener('change', applyFilters);
}

async function loadCrops() {
    try {
        const response = await fetchAPI('/crops');
        if (response && response.crops) {
            allCrops = response.crops;
        } else {
            allCrops = [...sampleCrops];
        }
        
        filteredCrops = [...allCrops];
        displayCrops();
    } catch (error) {
        console.error('Error loading crops:', error);
        // Fallback to sample data
        allCrops = [...sampleCrops];
        filteredCrops = [...sampleCrops];
        displayCrops();
        showToast('Loading sample products (API unavailable)', 'info');
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    const sortBy = document.getElementById('sort-filter').value;

    // Filter crops
    filteredCrops = allCrops.filter(crop => {
        const matchesSearch = crop.name.toLowerCase().includes(searchTerm) || 
                              crop.farmer.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || crop.category === category;
        const matchesPrice = !priceRange || checkPriceRange(crop.price, priceRange);
        
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort crops
    if (sortBy === 'price-low') {
        filteredCrops.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredCrops.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredCrops.sort((a, b) => b.rating - a.rating);
    } else {
        filteredCrops.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    currentPage = 1;
    displayCrops();
}

function checkPriceRange(price, range) {
    const [min, max] = range.split('-');
    if (!max) return price >= parseInt(min);
    return price >= parseInt(min) && price <= parseInt(max);
}

function displayCrops() {
    const container = document.getElementById('products-container');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCrops = filteredCrops.slice(start, end);

    if (paginatedCrops.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-600 text-lg">No products found matching your criteria.</p>
            </div>
        `;
    } else {
        container.innerHTML = paginatedCrops.map(crop => createProductCard(crop)).join('');
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });
    }

    displayPagination();
}

function createProductCard(crop) {
    const stars = '★'.repeat(Math.floor(crop.rating)) + '☆'.repeat(5 - Math.floor(crop.rating));
    const cropId = crop._id || crop.id;
    return `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image" style="background: linear-gradient(135deg, var(--light-green), #e8f5e9); display: flex; align-items: center; justify-content: center;">
                <i class='bx bxs-leaf text-4xl text-primary-green opacity-50'></i>
            </div>
            <div class="product-info">
                <h3 class="product-name">${crop.name}</h3>
                <p class="product-farmer">by ${crop.farmer}</p>
                <div class="product-rating">${stars} ${crop.rating}</div>
                <p class="text-sm text-gray-600 mb-3">${crop.description || 'Fresh product from verified farmer'}</p>
                <div class="product-footer">
                    <span class="product-price">$${crop.price}</span>
                    <button class="add-to-cart-btn btn btn-primary" data-crop-id="${cropId}" data-crop-name="${crop.name}" data-crop-price="${crop.price}">
                        <i class='bx bx-cart-add'></i> Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

function addToCart(e) {
    const btn = e.currentTarget;
    const cropId = btn.dataset.cropId;
    const cropName = btn.dataset.cropName;
    const cropPrice = parseFloat(btn.dataset.cropPrice);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === cropId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: cropId, name: cropName, price: cropPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${cropName} added to cart!`, 'success');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function loadCart() {
    updateCartCount();
}

function displayPagination() {
    const totalPages = Math.ceil(filteredCrops.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let html = '';
    
    if (currentPage > 1) {
        html += `<button class="px-4 py-2 border border-gray-300 rounded hover:bg-light-green" onclick="goToPage(${currentPage - 1})">← Previous</button>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<button class="px-4 py-2 bg-primary-green text-white rounded">${i}</button>`;
        } else {
            html += `<button class="px-4 py-2 border border-gray-300 rounded hover:bg-light-green" onclick="goToPage(${i})">${i}</button>`;
        }
    }

    if (currentPage < totalPages) {
        html += `<button class="px-4 py-2 border border-gray-300 rounded hover:bg-light-green" onclick="goToPage(${currentPage + 1})">Next →</button>`;
    }

    paginationContainer.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    displayCrops();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const bgColor = type === 'success' ? 'bg-success-green' : type === 'error' ? 'bg-error-red' : 'bg-primary-green';
    
    toast.className = `${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-bounce`;
    toast.innerHTML = `
        <i class='bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-x-circle' : 'bx-info-circle'}'></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
