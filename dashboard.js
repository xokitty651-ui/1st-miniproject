// Dashboard Page - User Dashboard Management

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

let userProfile = {};
let userOrders = [];
let userListings = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    loadUserProfile();
    setupTabNavigation();
    setupEventListeners();
});

function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
    }
}

function setupTabNavigation() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active', 'text-primary-green', 'border-b-2', 'border-primary-green', 'font-bold');
                b.classList.add('text-neutral-dark', 'font-semibold');
            });

            // Add active class to clicked button
            e.currentTarget.classList.remove('text-neutral-dark', 'font-semibold');
            e.currentTarget.classList.add('active', 'text-primary-green', 'border-b-2', 'border-primary-green', 'font-bold');

            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.add('hidden');
            });

            // Show selected tab
            const tabName = e.currentTarget.dataset.tab;
            document.getElementById(`${tabName}-tab`).classList.remove('hidden');

            // Load tab-specific data
            if (tabName === 'orders') {
                loadUserOrders();
            } else if (tabName === 'listings') {
                loadUserListings();
            } else if (tabName === 'profile') {
                populateProfileForm();
            }
        });
    });
}

function setupEventListeners() {
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('profile-form').addEventListener('submit', updateProfile);
    
    const addListingBtn = document.getElementById('add-listing-btn');
    if (addListingBtn) {
        addListingBtn.addEventListener('click', () => {
            // TODO: Open modal for adding new listing
            showToast('Add listing feature coming soon!', 'info');
        });
    }
}

async function loadUserProfile() {
    try {
        const response = await fetchAPI('/auth/profile');
        userProfile = response.user || response;

        document.getElementById('user-name').textContent = `Welcome, ${userProfile.firstName}!`;
        
        // Load dashboard stats
        loadDashboardStats();
    } catch (error) {
        console.error('Error loading profile:', error);
        // Use fallback user data
        userProfile = {
            firstName: 'User',
            lastName: 'Profile',
            email: 'user@example.com',
            phone: '',
            city: '',
            state: '',
            address: '',
            role: 'buyer'
        };
        document.getElementById('user-name').textContent = `Welcome, ${userProfile.firstName}!`;
        loadDashboardStats();
        showToast('Using local profile', 'info');
    }
}

function loadDashboardStats() {
    // Sample stats (would come from API)
    document.getElementById('total-orders').textContent = '12';
    document.getElementById('total-spent').textContent = '$4,250';
    document.getElementById('completed-orders').textContent = '10';
    document.getElementById('pending-orders').textContent = '2';

    // Load recent orders
    loadRecentOrders();
}

function loadRecentOrders() {
    // Sample recent orders
    const recentOrders = [
        { _id: '1', orderNumber: 'ORD-001', total: 450, status: 'Delivered', date: '2024-01-20' },
        { _id: '2', orderNumber: 'ORD-002', total: 320, status: 'In Transit', date: '2024-01-18' },
        { _id: '3', orderNumber: 'ORD-003', total: 280, status: 'Processing', date: '2024-01-15' },
    ];

    const container = document.getElementById('recent-orders');
    container.innerHTML = recentOrders.map(order => `
        <div class="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-light-green transition">
            <div>
                <h4 class="font-bold text-neutral-dark">${order.orderNumber}</h4>
                <p class="text-sm text-gray-600">${order.date}</p>
            </div>
            <div class="text-right">
                <p class="font-bold text-primary-green">$${order.total}</p>
                <span class="inline-block px-3 py-1 bg-light-green text-primary-green rounded-full text-xs font-semibold">
                    ${order.status}
                </span>
            </div>
        </div>
    `).join('');
}

async function loadUserOrders() {
    try {
        const response = await fetchAPI('/orders');
        userOrders = response.orders || response;

        const allOrders = userOrders.length > 0 ? userOrders : [
            { _id: '1', orderNumber: 'ORD-001', total: 450, status: 'Delivered', date: '2024-01-20', items: 5 },
            { _id: '2', orderNumber: 'ORD-002', total: 320, status: 'In Transit', date: '2024-01-18', items: 3 },
            { _id: '3', orderNumber: 'ORD-003', total: 280, status: 'Processing', date: '2024-01-15', items: 4 },
            { _id: '4', orderNumber: 'ORD-004', total: 650, status: 'Completed', date: '2024-01-10', items: 8 },
        ];

        const container = document.getElementById('orders-list');
        container.innerHTML = allOrders.map(order => `
            <div class="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-green transition">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-neutral-dark">${order.orderNumber}</h3>
                        <p class="text-sm text-gray-600">Placed on ${order.date}</p>
                    </div>
                    <span class="px-4 py-2 bg-primary-green text-white rounded-full text-sm font-bold">
                        ${order.status}
                    </span>
                </div>
                <div class="flex justify-between">
                    <p class="text-gray-600">${order.items} items</p>
                    <p class="text-2xl font-bold text-primary-green">$${order.total}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading orders:', error);
        showToast('Error loading orders', 'error');
    }
}

async function loadUserListings() {
    try {
        const response = await fetchAPI('/crops');
        userListings = response.crops || response;

        const listings = userListings.length > 0 ? userListings : [
            { _id: '1', name: 'Tomatoes', price: 150, quantity: 50, sold: 30, rating: 4.8 },
            { _id: '2', name: 'Carrots', price: 80, quantity: 100, sold: 45, rating: 4.6 },
        ];

        const container = document.getElementById('listings-container');
        container.innerHTML = listings.map(listing => `
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold text-neutral-dark mb-2">${listing.name}</h3>
                <div class="mb-4">
                    <p class="text-sm text-gray-600">Price: <span class="font-bold text-primary-green">$${listing.price}</span></p>
                    <p class="text-sm text-gray-600">Available: ${listing.quantity}</p>
                    <p class="text-sm text-gray-600">Sold: ${listing.sold}</p>
                    <p class="text-sm text-gray-600">Rating: <span class="text-warning-yellow">★${listing.rating}</span></p>
                </div>
                <div class="flex gap-2">
                    <button class="flex-1 px-4 py-2 bg-primary-green text-white rounded hover:bg-secondary-green transition">Edit</button>
                    <button class="flex-1 px-4 py-2 border-2 border-error-red text-error-red rounded hover:bg-red-50 transition">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading listings:', error);
        showToast('Error loading listings', 'error');
    }
}

function populateProfileForm() {
    document.getElementById('profile-first-name').value = userProfile.firstName || '';
    document.getElementById('profile-last-name').value = userProfile.lastName || '';
    document.getElementById('profile-email').value = userProfile.email || '';
    document.getElementById('profile-phone').value = userProfile.phone || '';
    document.getElementById('profile-city').value = userProfile.city || '';
    document.getElementById('profile-state').value = userProfile.state || '';
    document.getElementById('profile-address').value = userProfile.address || '';
}

async function updateProfile(e) {
    e.preventDefault();

    const updatedProfile = {
        firstName: document.getElementById('profile-first-name').value,
        lastName: document.getElementById('profile-last-name').value,
        phone: document.getElementById('profile-phone').value,
        city: document.getElementById('profile-city').value,
        state: document.getElementById('profile-state').value,
        address: document.getElementById('profile-address').value,
    };

    try {
        const response = await fetchAPI('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(updatedProfile)
        });

        userProfile = { ...userProfile, ...updatedProfile };
        showToast('Profile updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating profile:', error);
        showToast('Error updating profile', 'error');
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
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
