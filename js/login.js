class User {
  constructor(id, username, password, usernumber) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.accountnumber = usernumber;
  }
}

class swiftly {
  constructor() {
    this.wrapper = document.querySelector(".wrapper");
    this.registerLink = document.querySelector(".register-link");
    this.loginLink = document.querySelector(".login-link");
    this.transitionText = document.getElementById("transition-text");

    this.loginUsername = document.getElementById("login-username");
    this.loginPassword = document.getElementById("login-password");

    this.signupUsername = document.getElementById("signup-username");
    this.signupPassword = document.getElementById("signup-password");

    this.messageDisplay = document.querySelector("#current-username");
    this.messageDisplay2 = document.querySelector("#profile-username");
    this.accountnmDisplay = document.querySelector("#profile-user-number");

    this.msgBox = document.querySelector(".msg");

    this.users = this.getUsersFromLocalStorage();
    this.init();
  }

  init() {
    this.registerLink.onclick = (e) => this.showRegisterForm(e);
    this.loginLink.onclick = (e) => this.showLoginForm(e);
    document.getElementById("signUpForm").onsubmit = (e) => this.handleSignUp(e);
    document.getElementById("loginForm").onsubmit = (e) => this.handleLogin(e);
    document.getElementById("toggle").onclick = () => this.togglePasswordVisibility();
    document.getElementById("profile-btn").onclick = () => this.toggleProfileDropdown();
    this.displayStoredUsername();
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

  handleSignUp(e) {
    e.preventDefault();
    const username = this.signupUsername.value.trim();
    const password = this.signupPassword.value.trim();

    if (username && password) {
      if (this.users.some((user) => user.username === username)) {
        this.msgBox.textContent = "Username already exists.";
        this.msgBox.style.color = "red";
        return;
      }

      const userId = this.generateUniqueId();
      const accountnumber = this.generateUserNumber();
      const newUser = new User(userId, username, password, accountnumber);
      this.users.push(newUser);
      this.saveUsersToLocalStorage();

      this.msgBox.textContent = "Sign Up Successful! Please login.";
      this.msgBox.style.color = "green";
      this.showLoginForm(e);
    } else {
      this.msgBox.textContent = "Please fill in both fields.";
      this.msgBox.style.color = "red";
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const enteredUsername = this.loginUsername.value.trim();
    const enteredPassword = this.loginPassword.value.trim();

    const foundUser = this.users.find(
      (user) => user.username === enteredUsername && user.password === enteredPassword
    );

    if (foundUser) {
      this.msgBox.textContent = "";
      this.messageDisplay.textContent = `${enteredUsername}!`;
      this.messageDisplay2.textContent = enteredUsername;
      this.accountnmDisplay.textContent = foundUser.accountnumber;

      $("#authentication").hide();
      $(".swiftly").show();

      localStorage.setItem("loggedInUser", enteredUsername);
    } else {
      this.msgBox.textContent = "Invalid username or password.";
      this.msgBox.style.color = "red";
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
    const dropdown = document.getElementById("#profile-dropdown");
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
  }

  getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  saveUsersToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  displayStoredUsername() {
    if (this.users.length > 0) {
      const lastUser = this.users[this.users.length - 1];
      this.loginUsername.value = lastUser.username;
    }setInterval(5000, displayStoredUsername())
  }
}

$(document).ready(function () {
  const Swiftly = new swiftly();
});