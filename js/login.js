class User {
  constructor(id, username, password, usernumber) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.accountnumber = usernumber;
  }
}

class Swiftly {
  constructor() {
    this.wrapper = document.querySelector(".wrapper");
    this.registerLink = document.querySelector(".register-link");
    this.loginLink = document.querySelector(".login-link");
    this.transitionText = document.getElementById("transition-text");

    this.loginUsername = document.getElementById("login-username");
    this.loginPassword = document.getElementById("login-password");

    this.signupUsername = document.getElementById("signup-username");
    this.signupPassword = document.getElementById("signup-password");
    this.signupEmail = document.querySelector("#signUpForm input[type='email']");

    this.messageDisplay = document.querySelector("#current-username");
    this.messageDisplay2 = document.querySelector("#profile-username");
    this.accountnmDisplay = document.querySelector("#profile-user-number");
    this.msgBox = document.querySelector(".msg");
    this.mainPage = document.querySelector(".swiftly");

    this.users = this.getUsersFromLocalStorage();
    this.init();
  }

  init() {
    this.registerLink.onclick = (e) => this.showRegisterForm(e);
    this.loginLink.onclick = (e) => this.showLoginForm(e);
    document.getElementById("signUpForm").onsubmit = (e) =>
      this.handleSignUp(e);
    document.getElementById("loginForm").onsubmit = (e) => this.handleLogin(e);
    document.getElementById("toggle").onclick = () =>
      this.togglePasswordVisibility();
    const profileBtn = document.getElementById("profile-btn");
    if (profileBtn) {
      profileBtn.onclick = () => this.toggleProfileDropdown();
    }
  }

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

  generateUserNumber() {
    return `AC${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  }

  generateUniqueId() {
    return Date.now().toString();
  }

  showMessage(text, backgroundColor) {
    this.msgBox.textContent = text;
    this.msgBox.style.backgroundColor = backgroundColor;
    this.msgBox.style.color = "#fff";
    this.msgBox.style.padding = "10px 15px";
    this.msgBox.style.borderRadius = "5px";
    this.msgBox.style.fontWeight = "bold";
    this.msgBox.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
    this.msgBox.style.marginTop = "20px";
    this.msgBox.style.transition = "all 0.3s ease";
    this.msgBox.style.animation = backgroundColor === "green" ? "animateSuccessful 0.5s" : "animateUnsucessful 0.5s";

    this.msgBox.classList.add("show");

    if (this.msgTimeout) clearTimeout(this.msgTimeout);
    this.msgTimeout = setTimeout(() => {
      this.msgBox.textContent = "";
      this.msgBox.style.backgroundColor = "";
      this.msgBox.classList.remove("show");
    }, 2000);
  }

  handleSignUp(e) {
    e.preventDefault();
    const username = this.signupUsername.value.trim();
    const email = this.signupEmail.value.trim();
    const password = this.signupPassword.value.trim();

    // Check if username or email already exists
    const userExists = this.users.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      this.showMessage("Username or email already exists.", "#e74c3c");
      return;
    }

    // Create new user
    const newUser = new User(
      this.generateUniqueId(),
      username,
      password,
      this.generateUserNumber()
    );
    newUser.email = email; // Add email to user object
    this.users.push(newUser);
    this.saveUsersToLocalStorage();

    this.showMessage("Sign-up successful! Please log in.", "green");

    // Reset form and switch to login
    this.signupUsername.value = "";
    this.signupEmail.value = "";
    this.signupPassword.value = "";
    setTimeout(() => {
      this.wrapper.classList.remove("active");
    }, 2000);
  }

  handleLogin(e) {
    e.preventDefault();
    const enteredUsername = this.loginUsername.value.trim();
    const enteredPassword = this.loginPassword.value.trim();

    const foundUser = this.users.find(
      (user) =>
        user.username.toLowerCase() === enteredUsername.toLowerCase() &&
        user.password === enteredPassword
    );

    if (foundUser) {
      this.msgBox.textContent = "";
      this.messageDisplay2.textContent = foundUser.username;
      this.accountnmDisplay.textContent = foundUser.accountnumber;
      this.messageDisplay.textContent = `Welcome, ${foundUser.username}!`;

      $("#authentication").hide();
      $("#warning").hide();
      $(".swiftly").show();
      console.log("Login successful, showing welcome message for", foundUser.username);
      setTimeout(() => {
        console.log("Attempting redirect to index.html");
        this.messageDisplay.style.display = "none";
        this.mainPage.style.display = "block";
        try {
          window.location.href = "index.html";
        } catch (error) {
          console.error("Redirect failed:", error);
          this.showMessage("Error redirecting to dashboard. Please try again.", "#e74c3c");
        }
      }, 2000);

      localStorage.setItem("loggedInUser", foundUser.username);
    } else {
      this.showMessage("Invalid username or password.", "#e74c3c");
    }
  }

  togglePasswordVisibility() {
    const passwordField = document.getElementById("signup-password");
    const toggleIcon = document.getElementById("toggle");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      toggleIcon.classList.replace("bx-show", "bx-hide");
    } else {
      passwordField.type = "password";
      toggleIcon.classList.replace("bx-hide", "bx-show");
    }
  }

  toggleProfileDropdown() {
    const dropdown = document.getElementById("profile-dropdown");
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  }

  getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  saveUsersToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }
}

$(document).ready(function () {
  const swiftlyApp = new Swiftly();
});