let signUpPage = document.getElementById("signUp");
let signInPage = document.getElementById("signIn");
let userName = document.getElementById("username-signup-input").value.trim();

const emailInvalid = document.getElementById("email-invalid");
const usernameInvalid = document.getElementById("username-invalid");
const passwordInvalid = document.getElementById("password-invalid");

// displays the signup page
function signUp() {
  signUpPage.style.display = "block";
  signInPage.style.display = "none";
}
// displays the signin page
function signIn() {
  signUpPage.style.display = "none";
  signInPage.style.display = "block";
}

// Validates the signup details 
function validate() {
  let userNameInput = document
    .getElementById("username-signup-input")
    .value.trim();
  let passwordInput = document
    .getElementById("password-signup-input")
    .value.trim();
  let userEmail = document.getElementById("email-input").value.trim();

  // ERROR MESSAGES FOR SIGNUPAGE
  const emailInvalidSnUp = document.getElementById("email-invalid-snUp");
  const usernameInvalidSnUp = document.getElementById("username-invalid-snUp");
  const passwordInvalidSnUp = document.getElementById("password-invalid-snUp");

  // Email validation
  if (
    userEmail == "" ||
    userEmail == null ||
    !userEmail.includes("@") ||
    userEmail.length < 14 ||
    !userEmail.includes(".com")
  ) {
    emailInvalidSnUp.textContent = "Invalid email adress";
    return false;
  } else {emailInvalidSnUp.textContent = "";}

  // username validation
  if (userNameInput == "" || userNameInput == null) {
    usernameInvalidSnUp.textContent = "Please input a valid username";
    return false;
  } else {usernameInvalidSnUp.textContent = "";}

  // Password validation
  if (passwordInput == "" || passwordInput == null) {
    passwordInvalidSnUp.textContent = "Please input a valid Password";
    return false;
  }
  if (passwordInput.length < 8) {
    passwordInvalidSnUp.textContent = "";
    return false;
  } else {passwordInvalidSnUp.textContent = "";}

  return true;
}

// adds inputed data on the signup form to the local storage
function addData() {
  if (validate()) {
    let userNameInput = document
      .getElementById("username-signup-input")
      .value.trim();
    let passwordInput = document
      .getElementById("password-signup-input")
      .value.trim();
    let userEmail = document.getElementById("email-input").value.trim();
    let LastnameInput = document.getElementById("lastname-input").value.trim();
    localStorage.setItem("Username", userNameInput);
    localStorage.setItem("Lastname", LastnameInput);
    localStorage.setItem("Email", userEmail);
    localStorage.setItem("Password", passwordInput);
    // Optionally navigate to the sign-in page after signup
    signIn();
  }
}

// checks if the userdata on the local storage matches with the data inputed in the signIn form
function checkUser() {
  let inputedEmail = document.getElementById("email-input-signIn").value.trim();
  let inputedPassword = document.getElementById("password-input").value.trim();
  let storedEmail = localStorage.getItem("Email");
  let storedPassword = localStorage.getItem("Password");
  let LoginSuccess = document.getElementById("successful");
  let LoginFailure = document.getElementById("unsuccessful");

  if (inputedEmail === storedEmail && inputedPassword === storedPassword) {
    LoginSuccess.style.display = "flex";
    setTimeout(() => {
      window.location.href = "home.html";
    }, 2000);
  } else {
    LoginFailure.style.display = "flex";
    setTimeout(() => {
      LoginFailure.style.display = "none";
    }, 2000);
  }
}
