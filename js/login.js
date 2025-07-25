class User {
  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

class Swiftly {
  constructor() {
    // Form elements
    this.wrapper = document.querySelector(".wrapper");
    this.registerLink = document.querySelector(".register-link");
    this.loginLink = document.querySelector(".login-link");
    this.transitionText = document.getElementById("transition-text");

    // Login fields
    this.loginUsername = document.getElementById("login-username");
    this.loginPassword = document.getElementById("login-password");

    // Signup fields
    this.signupUsername = document.getElementById("signup-username");
    this.signupPassword = document.getElementById("signup-password");
    this.signupEmail = document.getElementById("signup-email");

    // Message displays
    this.msgBox = document.querySelector(".msg");
    this.messageDisplay = document.querySelector("#current-username");
    this.mainPage = document.querySelector(".swiftly");
    
    this.users = this.getUsersFromLocalStorage();
    this.init();
  }

  init() {
    // Event listeners
    this.registerLink.onclick = (e) => this.showRegisterForm(e);
    this.loginLink.onclick = (e) => this.showLoginForm(e);
    document.getElementById("signUpForm").onsubmit = (e) => this.handleSignUp(e);
    document.getElementById("loginForm").onsubmit = (e) => this.handleLogin(e);
    document.getElementById("toggle").onclick = () => this.togglePasswordVisibility();
    
    this.setupPasswordStrengthMeter();
  }

  // Password strength meter functionality
  setupPasswordStrengthMeter() {
    const passwordInput = this.signupPassword;
    const inputBox = passwordInput.parentElement;
    
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      const strength = this.calculatePasswordStrength(password);
      
      inputBox.classList.remove('weak', 'moderate', 'strong');
      
      if (password.length === 0) {
        inputBox.querySelector('.strengthText').textContent = '';
      } else if (strength <= 2) {
        inputBox.classList.add('weak');
        inputBox.querySelector('.strengthText').textContent = 'Weak';
      } else if (strength <= 4) {
        inputBox.classList.add('moderate');
        inputBox.querySelector('.strengthText').textContent = 'Moderate';
      } else {
        inputBox.classList.add('strong');
        inputBox.querySelector('.strengthText').textContent = 'Strong';
      }
    });
  }

  calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length > 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }

  // Form handling
  showTransitionText() {
    this.transitionText.classList.add("show-transition-text");
    setTimeout(() => {
      this.transitionText.classList.remove("show-transition-text");
    }, 2000);
  }

  showRegisterForm(e) {
    e.preventDefault();
    this.showTransitionText();
    setTimeout(() => {
      this.wrapper.classList.add("active");
    }, 50);
  }

  showLoginForm(e) {
    e.preventDefault();
    this.showTransitionText();
    setTimeout(() => {
      this.wrapper.classList.remove("active");
    }, 50);
  }

  generateUniqueId() {
    return Date.now().toString();
  }

  showMessage(text, backgroundColor) {
    this.msgBox.textContent = text;
    this.msgBox.style.backgroundColor = backgroundColor;
    this.msgBox.classList.add("show");
    setTimeout(() => this.msgBox.classList.remove("show"), 2000);
  }

  handleSignUp(e) {
    e.preventDefault();
    const username = this.signupUsername.value.trim();
    const email = this.signupEmail.value.trim();
    const password = this.signupPassword.value.trim();

    if (this.users.some(user => user.username === username || user.email === email)) {
      this.showMessage("Username or email already exists.", "#e74c3c");
      return;
    }

    this.users.push(new User(this.generateUniqueId(), username, password, email));
    this.saveUsersToLocalStorage();
    this.showMessage("Sign-up successful! Please log in.", "green");

    // Reset form
    this.signupUsername.value = "";
    this.signupEmail.value = "";
    this.signupPassword.value = "";
    setTimeout(() => this.wrapper.classList.remove("active"), 2000);
  }

  handleLogin(e) {
    e.preventDefault();
    const user = this.users.find(u => 
      u.username.toLowerCase() === this.loginUsername.value.trim().toLowerCase() && 
      u.password === this.loginPassword.value.trim()
    );

    if (user) {
      this.messageDisplay.textContent = `Welcome, ${user.username}!`;
      $("#authentication").hide();
      $(".swiftly").show();
      localStorage.setItem("currentUserId", user.id);
      setTimeout(() => window.location.href = "index.html", 2000);
    } else {
      this.showMessage("Invalid username or password.", "#e74c3c");
    }
  }

  togglePasswordVisibility() {
    const passwordField = this.signupPassword;
    const toggleIcon = document.getElementById("toggle");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      toggleIcon.classList.replace("bx-show", "bx-hide");
    } else {
      passwordField.type = "password";
      toggleIcon.classList.replace("bx-hide", "bx-show");
    }
  }

  // Local storage helpers
  getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  saveUsersToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }
}

$(document).ready(() => new Swiftly());