// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const SHIPPING_COST = 10.00;
const TAX_RATE = 0.10;
const PAYPAL_CLIENT_ID = 'demo_client_id'; // Get from .env in production

// Utility: Fetch with Authorization
async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/frontend/pages/login.html';
            return null;
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Show Toast Notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const bgColor = {
        success: 'bg-success-green',
        error: 'bg-error-red',
        info: 'bg-primary-green'
    }[type] || 'bg-primary-green';

    toast.className = `${bgColor} text-white px-6 py-4 rounded-lg shadow-lg animate-pulse`;
    toast.innerHTML = `
        <div class="flex items-center space-x-2">
            ${type === 'success' ? '<i class="bx bx-check-circle"></i>' : ''}
            ${type === 'error' ? '<i class="bx bx-x-circle"></i>' : ''}
            ${type === 'info' ? '<i class="bx bx-info-circle"></i>' : ''}
            <span>${message}</span>
        </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Get Cart from LocalStorage
function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart;
}

// Calculate Totals
function calculateTotals(subtotal) {
    const tax = subtotal * TAX_RATE;
    const total = subtotal + SHIPPING_COST + tax;
    return { subtotal, tax, total };
}

// Load Cart Items
async function loadCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-12">
                <p class="text-gray-600 text-lg mb-4">Your cart is empty</p>
                <a href="marketplace.html" class="text-primary-green font-semibold hover:underline">
                    Continue Shopping →
                </a>
            </div>
        `;
        return;
    }

    let subtotal = 0;
    let html = '';

    for (const item of cart) {
        const price = item.price || 0;
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;

        html += `
            <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div class="flex-1">
                    <h4 class="font-bold text-neutral-dark">${item.name}</h4>
                    <p class="text-sm text-gray-600">Quantity: ${item.quantity}</p>
                    <p class="text-sm text-gray-600">Unit: ${item.unit || 'kg'}</p>
                </div>
                <div class="text-right">
                    <p class="text-lg font-bold text-primary-green">$${itemTotal.toFixed(2)}</p>
                    <p class="text-sm text-gray-600">$${price.toFixed(2)} each</p>
                </div>
            </div>
        `;
    }

    cartContainer.innerHTML = html;

    // Update Totals
    const { tax, total } = calculateTotals(subtotal);
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;

    // Store totals for payment
    document.getElementById('billing-form').dataset.subtotal = subtotal.toFixed(2);
    document.getElementById('billing-form').dataset.total = total.toFixed(2);
}

// Initialize PayPal Button
function initializePayPalButton() {
    const paypalButton = document.getElementById('paypal-button');
    
    paypalButton.addEventListener('click', async () => {
        const form = document.getElementById('billing-form');
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            showToast('Please fill in all billing information', 'error');
            return;
        }

        const cart = getCart();
        if (cart.length === 0) {
            showToast('Your cart is empty', 'error');
            return;
        }

        // Disable button and show loading
        paypalButton.disabled = true;
        paypalButton.innerHTML = '<i class="bx bx-loader-alt animate-spin"></i> Processing...';

        try {
            // Create payment order
            const paymentData = {
                items: cart,
                total: parseFloat(document.getElementById('billing-form').dataset.total),
                shippingAddress: {
                    firstName: document.getElementById('first-name').value,
                    lastName: document.getElementById('last-name').value,
                    email: document.getElementById('email').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zip: document.getElementById('zip').value,
                }
            };

            // Call backend to create PayPal order
            const response = await fetchAPI('/payments/create', {
                method: 'POST',
                body: JSON.stringify(paymentData)
            });

            if (!response || !response.approvalUrl) {
                throw new Error('Failed to create payment order');
            }

            // Redirect to PayPal for approval
            window.location.href = response.approvalUrl;

        } catch (error) {
            console.error('Payment error:', error);
            showToast(`Payment error: ${error.message}`, 'error');
            paypalButton.disabled = false;
            paypalButton.innerHTML = '<i class="bx bxl-paypal"></i> Pay with PayPal';
        }
    });

    // Check if returning from PayPal
    const urlParams = new URLSearchParams(window.location.search);
    const paypalOrderId = urlParams.get('token');

    if (paypalOrderId) {
        handlePayPalReturn(paypalOrderId);
    }
}

// Handle PayPal Return
async function handlePayPalReturn(paypalOrderId) {
    const paypalButton = document.getElementById('paypal-button');
    paypalButton.disabled = true;
    paypalButton.innerHTML = '<i class="bx bx-loader-alt animate-spin"></i> Capturing Payment...';

    try {
        // Execute payment capture
        const response = await fetchAPI('/payments/execute', {
            method: 'POST',
            body: JSON.stringify({
                paypalOrderId: paypalOrderId
            })
        });

        if (!response || !response.orderId) {
            throw new Error('Failed to capture payment');
        }

        // Success!
        showToast('Payment successful! Order confirmed.', 'success');
        
        // Clear cart
        localStorage.removeItem('cart');

        // Show confirmation
        const confirmationDiv = document.getElementById('order-confirmation');
        confirmationDiv.classList.remove('hidden');
        document.getElementById('order-number').textContent = response.orderId;

        // Disable payment button and form
        document.getElementById('billing-form').style.opacity = '0.6';
        document.getElementById('billing-form').style.pointerEvents = 'none';

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 3000);

    } catch (error) {
        console.error('Payment capture error:', error);
        showToast(`Payment capture failed: ${error.message}`, 'error');
        paypalButton.disabled = false;
        paypalButton.innerHTML = '<i class="bx bxl-paypal"></i> Pay with PayPal';

        // Optionally allow retry
        const retryBtn = document.createElement('button');
        retryBtn.className = 'w-full px-6 py-4 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition mt-2';
        retryBtn.innerHTML = 'Try Again';
        retryBtn.onclick = () => {
            window.location.href = 'checkout.html';
        };
        paypalButton.parentElement.appendChild(retryBtn);
    }
}

// Page Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Load cart items and initialize PayPal
    loadCartItems();
    initializePayPalButton();
});
