// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load user state
    loadUserState();
    
    // Initialize Google Sign-In
    initializeGoogleSignIn();
    // Simulate loading process
    console.log('DOM fully loaded. Starting loading animation...');
    
    // Show loading screen for 2 seconds, then show main content
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
            console.log('Loading screen hidden');
        }
        
        if (mainContent) {
            mainContent.style.display = 'block';
            console.log('Main content displayed');
        }
        
        // Initialize any interactive features after content is shown
        initializeComicCards();
        initializeButtons();
    }, 2000);
});

// Initialize Google Sign-In
function initializeGoogleSignIn() {
    // Check if Google Identity Services is loaded
    if (typeof google === 'undefined') {
        console.error('Google Identity Services not loaded');
        return;
    }
    
    // Initialize Google Identity Services
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: true,
        context: 'signin',
        ux_mode: 'popup',
        use_fedcm_for_prompt: true
    });
    
    // Check if user is already signed in
    google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Continue with your sign-in flow
        }
    });
    
    // Update UI based on authentication state
    updateAuthUI();
}

// Handle Google Sign-In response
async function handleGoogleSignIn(response) {
    try {
        console.log('Google sign-in response received');
        
        // Show loading state
        showLoading(true);
        
        // Send the token to your backend for verification
        const result = await fetch(`${API_BASE_URL}/api/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: response.credential }),
            credentials: 'include' // Important for cookies
        });
        
        const data = await result.json();
        
        if (data.success) {
            console.log('Login successful:', data.user);
            
            // Store user data in localStorage for frontend use
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('isAuthenticated', 'true');
            
            // Update UI
            updateAuthUI(data.user);
            
            // Show success message
            showMessage('Login successful! Welcome, ' + data.user.name, 'success');
            
        } else {
            throw new Error('Authentication failed');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Login failed. Please try again.', 'error');
        
        // Sign out from Google
        google.accounts.id.disableAutoSelect();
        
    } finally {
        showLoading(false);
    }
}

// Update authentication UI
function updateAuthUI(user = null) {
    const authButtons = document.querySelector('.auth-buttons');
    if (!authButtons) return;
    
    if (user) {
        // User is logged in
        authButtons.innerHTML = `
            <div class="user-profile">
                <img src="${user.picture}" alt="${user.name}" class="user-avatar">
                <span class="user-name">${user.name}</span>
                <button class="btn btn-outline" id="logoutBtn">Logout</button>
            </div>
        `;
        
        // Add logout event listener
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        
    } else {
        // User is not logged in
        authButtons.innerHTML = `
            <div id="googleSignInBtn" class="btn btn-outline">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style="width: 18px; height: 18px; margin-right: 8px;">
                Sign in with Google
            </div>
            <button class="btn btn-primary" id="signUpBtn">Sign Up</button>
        `;
        
        // Add Google Sign-In button render
        setTimeout(() => {
            const googleBtn = document.getElementById('googleSignInBtn');
            if (googleBtn && typeof google !== 'undefined') {
                google.accounts.id.renderButton(googleBtn, {
                    type: 'standard',
                    theme: 'outline',
                    size: 'medium',
                    text: 'signin_with',
                    shape: 'rectangular',
                    logo_alignment: 'left',
                });
            }
            
            // Add event listener for custom sign-up button
            const signUpBtn = document.getElementById('signUpBtn');
            if (signUpBtn) {
                signUpBtn.addEventListener('click', () => {
                    // You can implement alternative sign-up here
                    console.log('Custom sign-up clicked');
                });
            }
        }, 100);
    }
}

// Handle logout
async function handleLogout() {
    try {
        showLoading(true);
        
        // Call backend logout
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        
        // Clear local storage
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        
        // Clear Google session
        if (typeof google !== 'undefined') {
            google.accounts.id.disableAutoSelect();
            google.accounts.id.revoke(localStorage.getItem('userEmail'), () => {
                console.log('Google session revoked');
            });
        }
        
        // Update UI
        updateAuthUI();
        
        showMessage('Logged out successfully', 'success');
        
    } catch (error) {
        console.error('Logout error:', error);
        showMessage('Logout failed', 'error');
    } finally {
        showLoading(false);
    }
}

// Load user state from backend
async function loadUserState() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            
            if (data.authenticated) {
                // Store user data
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('isAuthenticated', 'true');
                
                // Update UI
                updateAuthUI(data.user);
            }
        }
    } catch (error) {
        console.log('Not authenticated or server error:', error);
        // Keep UI in logged out state
    }
}

// Utility function to show messages
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMsg = document.querySelector('.message-container');
    if (existingMsg) existingMsg.remove();
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-container ${type}`;
    messageDiv.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close button functionality
    const closeBtn = messageDiv.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, 5000);
    
    // Add animation keyframes
    if (!document.querySelector('#message-animations')) {
        const style = document.createElement('style');
        style.id = 'message-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
}

// Show/hide loading state
function showLoading(isLoading) {
    let loader = document.getElementById('globalLoader');
    
    if (isLoading) {
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'globalLoader';
            loader.innerHTML = '<div class="loader"></div>';
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            `;
            document.body.appendChild(loader);
        }
    } else {
        if (loader) {
            loader.remove();
        }
    }
}

// Function to initialize comic card interactions
function initializeComicCards() {
    const comicCards = document.querySelectorAll('.comic-card');
    
    comicCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.comic-title').textContent;
            console.log(`Comic clicked: ${title}`);
            // Add your click handling logic here
            // For example: window.location.href = `/comic/${title.toLowerCase().replace(/\s+/g, '-')}`;
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    console.log(`${comicCards.length} comic cards initialized`);
}

// Function to initialize button interactions
function initializeButtons() {
    // Primary button in hero section
    const startReadingBtn = document.querySelector('.hero .btn-primary');
    if (startReadingBtn) {
        startReadingBtn.addEventListener('click', function() {
            console.log('Start Reading button clicked');
            // Add your logic here, e.g., scroll to comics section
            document.querySelector('.comics-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
    
    // Auth buttons
    const signInBtn = document.querySelector('.btn-outline');
    const signUpBtn = document.querySelector('.btn-primary:not(.hero .btn-primary)');
    
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            console.log('Sign In button clicked');
            // Add your sign in logic here
            // window.location.href = '/login';
        });
    }
    
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function() {
            console.log('Sign Up button clicked');
            // Add your sign up logic here
            // window.location.href = '/signup';
        });
    }
    
    // Add hover effects for all buttons
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Optional: Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Optional: Add scroll-to-top functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollThreshold = 300;
    
    // You could add a scroll-to-top button here
    if (scrollTop > scrollThreshold) {
        // Show scroll-to-top button
    } else {
        // Hide scroll-to-top button
    }
});