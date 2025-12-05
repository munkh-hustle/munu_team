export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Serve login page
    if (url.pathname === '/login') {
      return new Response(LOGIN_PAGE, {
        headers: { 
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
    
    // Default to signup page
    return new Response(SIGNUP_PAGE, {
      headers: { 
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
}

// CSS styles
const STYLES = `
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #ff4757;
    --primary-dark: #e84118;
    --secondary: #3742fa;
    --dark: #2f3542;
    --light: #f1f2f6;
    --gray: #747d8c;
    --success: #2ed573;
    --error: #ff3838;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: var(--light);
    min-height: 100vh;
}

/* Auth Container */
.auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.auth-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 3rem;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.auth-header {
    text-align: center;
    margin-bottom: 2rem;
}

.auth-header h2 {
    font-size: 2rem;
    margin: 1rem 0 0.5rem;
}

.auth-header p {
    color: var(--gray);
}

/* Form Styles */
.auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    position: relative;
}

.form-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group label i {
    color: var(--primary);
}

.form-group input {
    width: 100%;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: white;
    font-size: 1rem;
    transition: all 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.08);
}

.password-toggle {
    position: absolute;
    right: 1rem;
    top: 2.8rem;
    cursor: pointer;
    color: var(--gray);
}

.password-hint {
    font-size: 0.875rem;
    color: var(--gray);
    margin-top: 0.25rem;
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.checkbox input {
    width: auto;
}

.forgot-link {
    color: var(--primary);
    text-decoration: none;
    font-size: 0.9rem;
}

.forgot-link:hover {
    text-decoration: underline;
}

/* Button Styles */
.btn-primary, .btn-secondary {
    padding: 1rem 2rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
}

.btn-secondary {
    background: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);
}

.btn-secondary:hover {
    background: rgba(255, 71, 87, 0.1);
}

.btn-block {
    width: 100%;
}

.btn-social {
    width: 100%;
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.btn-social:hover {
    background: rgba(255, 255, 255, 0.1);
}

.btn-google:hover {
    background: #DB4437;
    border-color: #DB4437;
}

.btn-github:hover {
    background: #333;
    border-color: #333;
}

/* Divider */
.auth-divider {
    text-align: center;
    position: relative;
    margin: 1rem 0;
}

.auth-divider span {
    background: rgba(255, 255, 255, 0.05);
    padding: 0 1rem;
    color: var(--gray);
    font-size: 0.9rem;
}

.auth-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    z-index: -1;
}

/* Auth Footer */
.auth-footer {
    text-align: center;
    color: var(--gray);
    margin-top: 1rem;
}

.auth-footer a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
}

.auth-footer a:hover {
    text-decoration: underline;
}

/* Message Box */
.message {
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    display: none;
}

.message.success {
    background: rgba(46, 213, 115, 0.1);
    border: 1px solid var(--success);
    color: var(--success);
    display: block;
}

.message.error {
    background: rgba(255, 56, 56, 0.1);
    border: 1px solid var(--error);
    color: var(--error);
    display: block;
}

/* Responsive Design */
@media (max-width: 768px) {
    .auth-card {
        padding: 2rem;
    }
    
    .form-options {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
}
`;

// Signup Page HTML
const SIGNUP_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - Manga Reader</title>
    <style>${STYLES}</style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <a href="/" class="logo">
                    <i class="fas fa-book-open"></i>
                    MangaReader
                </a>
                <h2>Join MangaReader</h2>
                <p>Create your free account</p>
            </div>

            <form id="signupForm" class="auth-form">
                <div class="form-group">
                    <label for="username">
                        <i class="fas fa-user"></i> Username
                    </label>
                    <input type="text" id="username" name="username" required 
                           placeholder="Choose a username">
                </div>

                <div class="form-group">
                    <label for="email">
                        <i class="fas fa-envelope"></i> Email
                    </label>
                    <input type="email" id="email" name="email" required 
                           placeholder="your@email.com">
                </div>

                <div class="form-group">
                    <label for="password">
                        <i class="fas fa-lock"></i> Password
                    </label>
                    <input type="password" id="password" name="password" required 
                           placeholder="••••••••" minlength="8">
                    <div class="password-toggle">
                        <i class="fas fa-eye" id="togglePassword"></i>
                    </div>
                    <div class="password-hint">
                        Must be at least 8 characters
                    </div>
                </div>

                <div class="form-group">
                    <label for="confirmPassword">
                        <i class="fas fa-lock"></i> Confirm Password
                    </label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required 
                           placeholder="••••••••">
                </div>

                <div class="form-group">
                    <label class="checkbox">
                        <input type="checkbox" name="terms" required>
                        <span>I agree to the 
                            <a href="#terms">Terms of Service</a> and 
                            <a href="#privacy">Privacy Policy</a>
                        </span>
                    </label>
                </div>

                <button type="submit" class="btn-primary btn-block">
                    <i class="fas fa-user-plus"></i> Create Account
                </button>

                <div class="auth-divider">
                    <span>or sign up with</span>
                </div>

                <button type="button" class="btn-social btn-google">
                    <i class="fab fa-google"></i> Google
                </button>
                <button type="button" class="btn-social btn-github">
                    <i class="fab fa-github"></i> GitHub
                </button>

                <div class="auth-footer">
                    Already have an account? 
                    <a href="/login">Login here</a>
                </div>
            </form>

            <div id="message" class="message"></div>
        </div>
    </div>
    
    <script>
        // Toggle password visibility
        document.addEventListener('DOMContentLoaded', function() {
            const togglePassword = document.querySelector('#togglePassword');
            const passwordInput = document.querySelector('#password');
            
            if (togglePassword && passwordInput) {
                togglePassword.addEventListener('click', function() {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                });
            }
            
            // Form submission
            const form = document.querySelector('#signupForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const password = document.querySelector('#password').value;
                    const confirmPassword = document.querySelector('#confirmPassword').value;
                    
                    if (password !== confirmPassword) {
                        alert('Passwords do not match!');
                        return;
                    }
                    
                    // Show success message
                    const messageDiv = document.querySelector('#message');
                    messageDiv.textContent = 'Account created successfully!';
                    messageDiv.className = 'message success';
                    messageDiv.style.display = 'block';
                    
                    // Simulate redirect after 2 seconds
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2000);
                });
            }
        });
    </script>
</body>
</html>`;

// Login Page HTML
const LOGIN_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Manga Reader</title>
    <style>${STYLES}</style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <a href="/" class="logo">
                    <i class="fas fa-book-open"></i>
                    MangaReader
                </a>
                <h2>Welcome Back</h2>
                <p>Login to continue reading</p>
            </div>

            <form id="loginForm" class="auth-form">
                <div class="form-group">
                    <label for="email">
                        <i class="fas fa-envelope"></i> Email
                    </label>
                    <input type="email" id="email" name="email" required 
                           placeholder="your@email.com">
                </div>

                <div class="form-group">
                    <label for="password">
                        <i class="fas fa-lock"></i> Password
                    </label>
                    <input type="password" id="password" name="password" required 
                           placeholder="••••••••">
                    <div class="password-toggle">
                        <i class="fas fa-eye" id="togglePassword"></i>
                    </div>
                </div>

                <div class="form-options">
                    <label class="checkbox">
                        <input type="checkbox" name="remember">
                        <span>Remember me</span>
                    </label>
                    <a href="#forgot" class="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" class="btn-primary btn-block">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>

                <div class="auth-divider">
                    <span>or continue with</span>
                </div>

                <button type="button" class="btn-social btn-google">
                    <i class="fab fa-google"></i> Google
                </button>
                <button type="button" class="btn-social btn-github">
                    <i class="fab fa-github"></i> GitHub
                </button>

                <div class="auth-footer">
                    Don't have an account? 
                    <a href="/">Sign up here</a>
                </div>
            </form>

            <div id="message" class="message"></div>
        </div>
    </div>
    
    <script>
        // Toggle password visibility
        document.addEventListener('DOMContentLoaded', function() {
            const togglePassword = document.querySelector('#togglePassword');
            const passwordInput = document.querySelector('#password');
            
            if (togglePassword && passwordInput) {
                togglePassword.addEventListener('click', function() {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                });
            }
            
            // Form submission
            const form = document.querySelector('#loginForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Show success message
                    const messageDiv = document.querySelector('#message');
                    messageDiv.textContent = 'Login successful!';
                    messageDiv.className = 'message success';
                    messageDiv.style.display = 'block';
                    
                    // Simulate redirect after 2 seconds
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                });
            }
        });
    </script>
</body>
</html>`;