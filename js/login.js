// ==================== Generate Strong Password ====================
function generateStrongPassword(length = 10) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
  
  // ==================== Toggle to Forgot Password ====================
  function toggleForgotPassword() {
    const emailLabel = document.getElementById("emailLabel");
    const passwordLabel = document.getElementById("passwordLabel");
    const loginButton = document.getElementById("loginButton");
    const formHeading = document.getElementById("formHeading");
    const passwordInput = document.getElementById("password");
    const toggleLink = document.querySelector('.remember-forgot a');
    const loginForm = document.getElementById("loginForm");
  
    // Unbind login and bind forgot
    loginForm.removeEventListener('submit', handleLogin);
    loginForm.onsubmit = verifyForgotPassword;
  
    // Update UI for Forgot Password
    emailLabel.textContent = "Username";
    passwordLabel.textContent = "Email";
    formHeading.textContent = "Forgot Password";
    loginButton.textContent = "Submit";
    passwordInput.type = "email";
    toggleLink.textContent = "Back to Login";
    toggleLink.onclick = toggleLogin;
  
    document.getElementById("email").setAttribute("name", "username");
    document.getElementById("password").setAttribute("name", "email");
  
    loginForm.reset();
    document.getElementById("message").textContent = "";
  }
  
  // ==================== Toggle back to Login ====================
  function toggleLogin() {
    const emailLabel = document.getElementById("emailLabel");
    const passwordLabel = document.getElementById("passwordLabel");
    const loginButton = document.getElementById("loginButton");
    const formHeading = document.getElementById("formHeading");
    const passwordInput = document.getElementById("password");
    const toggleLink = document.querySelector('.remember-forgot a');
    const loginForm = document.getElementById("loginForm");
  
    // Update UI back to Login
    emailLabel.textContent = "Email";
    passwordLabel.textContent = "Password";
    formHeading.textContent = "Login";
    loginButton.textContent = "Login";
    passwordInput.type = "password";
    toggleLink.textContent = "Forgot password?";
    toggleLink.onclick = toggleForgotPassword;
  
    document.getElementById("email").setAttribute("name", "email");
    document.getElementById("password").setAttribute("name", "password");
  
    loginForm.onsubmit = handleLogin;
    loginForm.reset();
    document.getElementById("message").textContent = "";
  }
  
  // ==================== Forgot Password Verification ====================
  function verifyForgotPassword(event) {
    event.preventDefault();
  
    const username = document.getElementById("email").value.trim();
    const email = document.getElementById("password").value.trim();
    const msg = document.getElementById("message");
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(
      user => user.username === username && user.email === email
    );
  
    if (userIndex !== -1) {
      const tempPassword = generateStrongPassword();
      users[userIndex].password = tempPassword;
      localStorage.setItem("users", JSON.stringify(users));
  
      msg.style.color = "#0f0";
      msg.innerHTML = `✅ Verified! Your new temporary password is: <strong>${tempPassword}</strong><br>Please use it to <strong>login manually</strong>.`;
    } else {
      msg.style.color = "red";
      msg.textContent = "❌ Username or Email does not match.";
    }
  }
  
  // ==================== Login Form Logic ====================
  function handleLogin(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    const messageDiv = document.getElementById('message');
    const submitBtn = event.target.querySelector('button[type="submit"]');
  
    let users = [];
    try {
      const usersData = localStorage.getItem('users');
      if (usersData) {
        users = JSON.parse(usersData) || [];
      }
    } catch (error) {
      console.error('Error parsing users from localStorage', error);
      localStorage.removeItem('users');
      users = [];
    }
  
    const matchedUser = users.find(u =>
      u.email.toLowerCase() === userData.email.toLowerCase() &&
      u.password === userData.password
    );
  
    if (matchedUser) {
      try {
        const { password, ...safeUser } = matchedUser;
        localStorage.setItem('loggedInUser', JSON.stringify(safeUser));
  
        messageDiv.textContent = "✅ Login successful! Redirecting...";
        messageDiv.className = 'success';
        submitBtn.disabled = true;
  
        setTimeout(() => {
          window.location.href = "home.html"; // update route if needed
        }, 1000);
      } catch (error) {
        console.error('Login processing error:', error);
        messageDiv.textContent = "❌ Something went wrong.";
        messageDiv.className = 'error';
      }
    } else {
      messageDiv.textContent = "❌ Invalid credentials.";
      messageDiv.className = 'error';
    }
  }
  
  // ==================== Init ====================
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').onsubmit = handleLogin;
  });

  document.addEventListener('DOMContentLoaded', () => {
    const toggleIcon = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    toggleIcon.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleIcon.className = isPassword ? 'bx bx-hide' : 'bx bx-show';
    });
  });
  