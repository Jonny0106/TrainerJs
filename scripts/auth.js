// Enhanced authentication system with signup functionality
class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('trainerjs_user');
        if (savedUser) {
            this.isAuthenticated = true;
            this.currentUser = JSON.parse(savedUser);
            this.redirectToTimer();
        }

        // Set up tab switching
        this.setupTabs();
        
        // Set up forms
        this.setupForms();
        
        // Set up logout button if it exists
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Display current user if on timer page
        this.displayCurrentUser();
    }

    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const authForms = document.querySelectorAll('.auth-form');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active form
                authForms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === `${targetTab}Form`) {
                        form.classList.add('active');
                    }
                });
                
                // Clear any existing messages
                this.clearMessages();
            });
        });
    }

    setupForms() {
        // Login form
        const loginForm = document.getElementById('loginFormElement');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Signup form
        const signupForm = document.getElementById('signupFormElement');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }
    }

    handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Clear previous messages
        this.clearMessages();

        // Validate inputs
        if (!username || !password) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        // Check if user exists and password matches
        if (this.authenticateUser(username, password)) {
            this.isAuthenticated = true;
            this.currentUser = { username, name: username };
            
            // Save to localStorage
            localStorage.setItem('trainerjs_user', JSON.stringify(this.currentUser));
            
            // Show success message and redirect
            this.showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                this.redirectToTimer();
            }, 1000);
        } else {
            this.showMessage('Invalid credentials. Please try again.', 'error');
        }
    }

    handleSignup(e) {
        e.preventDefault();
        
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        // Clear previous messages
        this.clearMessages();

        // Validate inputs
        if (!username || !email || !password || !confirmPassword) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showMessage('Password must be at least 6 characters long', 'error');
            return;
        }

        if (username.length < 3) {
            this.showMessage('Username must be at least 3 characters long', 'error');
            return;
        }

        // Check if username already exists
        if (this.userExists(username)) {
            this.showMessage('Username already exists. Please choose another one.', 'error');
            return;
        }

        // Create new user
        if (this.createUser(username, email, password)) {
            this.showMessage('Account created successfully! You can now sign in.', 'success');
            
            // Clear form
            document.getElementById('signupFormElement').reset();
            
            // Switch to login tab
            setTimeout(() => {
                document.querySelector('[data-tab="login"]').click();
            }, 2000);
        } else {
            this.showMessage('Error creating account. Please try again.', 'error');
        }
    }

    authenticateUser(username, password) {
        // Check demo credentials
        if (username === 'demo' && password === 'demo123') {
            return true;
        }

        // Check registered users
        const users = this.getUsers();
        const user = users.find(u => u.username === username);
        
        if (user && user.password === password) {
            return true;
        }

        return false;
    }

    userExists(username) {
        // Demo user always exists
        if (username === 'demo') {
            return true;
        }

        const users = this.getUsers();
        return users.some(u => u.username === username);
    }

    createUser(username, email, password) {
        try {
            const users = this.getUsers();
            const newUser = {
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('trainerjs_users', JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Error creating user:', error);
            return false;
        }
    }

    getUsers() {
        try {
            const users = localStorage.getItem('trainerjs_users');
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error getting users:', error);
            return [];
        }
    }

    handleLogout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('trainerjs_user');
        
        // Redirect to landing page
        window.location.href = 'index.html';
    }

    redirectToTimer() {
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
            window.location.href = 'timer.html';
        }
    }

    displayCurrentUser() {
        const currentUserElement = document.getElementById('currentUser');
        if (currentUserElement && this.currentUser) {
            currentUserElement.textContent = `Welcome, ${this.currentUser.name}!`;
        }
    }

    // Check if user is authenticated (for protecting pages)
    requireAuth() {
        if (!this.isAuthenticated) {
            window.location.href = 'index.html';
        }
    }

    showMessage(message, type) {
        this.clearMessages();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        const activeForm = document.querySelector('.auth-form.active');
        if (activeForm) {
            activeForm.insertBefore(messageDiv, activeForm.firstChild);
        }
    }

    clearMessages() {
        const messages = document.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());
    }
}

// Initialize authentication
const auth = new Auth();

// If we're on the timer page, require authentication
if (window.location.pathname.includes('timer.html')) {
    auth.requireAuth();
}
