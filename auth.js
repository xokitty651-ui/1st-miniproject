/* Authentication Module */

// API Configuration
const API_BASE_URL = window.API_URL || 'http://localhost:5500/api';
const AUTH_TOKEN_KEY = 'agrimarket_token';
const USER_KEY = 'agrimarket_user';

async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

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
            // Extract JSON error message safely
            let errorMessage = response.statusText;

            try {
                const data = await response.json();
                if (data?.message) errorMessage = data.message;
            } catch {}

            if (response.status === 401) {
                logout();
                if (!window.location.pathname.includes("login")) {
                    window.location.href = '/pages/login.html';
                }
            }

            throw new Error(errorMessage);
        }

        // Handle empty response (204 No Content)
        if (response.status === 204) return null;

        return await response.json();

    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function login(email, password) {
    try {
        const response = await fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (response.token) {
            localStorage.setItem(AUTH_TOKEN_KEY, response.token);
            localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        }

        return response;
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
}

async function register(userData) {
    try {
        const response = await fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });

        if (response.token) {
            localStorage.setItem(AUTH_TOKEN_KEY, response.token);
            localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        }

        return response;
    } catch (error) {
        throw new Error('Registration failed: ' + error.message);
    }
}

function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

function getCurrentUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

// Optional Node.js export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchAPI,
        login,
        register,
        logout,
        getCurrentUser,
        isLoggedIn
    };
}
