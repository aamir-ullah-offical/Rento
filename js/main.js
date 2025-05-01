// Hide loader when content is fully loaded
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  loader.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
  const userToggle = document.getElementById("userToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const userNameSpan = document.getElementById("user-name");
  const caretIcon = document.getElementById("caretIcon");

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  userNameSpan.textContent = loggedInUser?.username || "Guest";

  // Dropdown toggle
  userToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
    caretIcon.classList.toggle("rotate");
  });

  // Click outside to close dropdown
  window.addEventListener("click", (e) => {
    if (!document.getElementById("userDropdown").contains(e.target)) {
      dropdownMenu.classList.remove("active");
      caretIcon.classList.remove("rotate");
    }
  });

  // Mobile nav toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("active");
  });
});



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// Show/hide password functionality

// =================== DOM Ready ===================
document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const profileLinks = document.querySelectorAll(".profileLink");
  const popup = document.getElementById("profilePopup");
  const closeBtn = document.getElementById("closePopup");
  const passwordForm = document.getElementById("changePasswordFormInner");
  const passwordMessage = document.getElementById("passwordMessage");

  // Show popup with user data
  profileLinks.forEach(function (profileLink) {
    profileLink.addEventListener("click", function (e) {
      e.preventDefault();

      if (loggedInUser) {
        document.getElementById("popupUsername").textContent = loggedInUser.username || "N/A";
        document.getElementById("popupEmail").textContent = loggedInUser.email || "N/A";
      }

      popup.classList.remove("hidden");

      const dropdownMenu = document.getElementById("dropdownMenu");
      if (dropdownMenu) {
        dropdownMenu.classList.remove("active");
      }
    });
  });

  // Close popup
  closeBtn.addEventListener("click", function () {
    popup.classList.add("hidden");
  });

  window.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  });

  // Handle Change Password
  passwordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;

    if (!loggedInUser) {
      passwordMessage.textContent = "❌ No logged in user found.";
      passwordMessage.className = "error";
      return;
    }

    if (newPassword !== confirmNewPassword) {
      passwordMessage.textContent = "❌ New passwords do not match.";
      passwordMessage.className = "error";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(user => user.email === loggedInUser.email);

    if (userIndex === -1) {
      passwordMessage.textContent = "❌ User not found in database.";
      passwordMessage.className = "error";
      return;
    }

    if (users[userIndex].password !== currentPassword) {
      passwordMessage.textContent = "❌ Current password is incorrect.";
      passwordMessage.className = "error";
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    const updatedUser = { ...loggedInUser, password: newPassword };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    passwordMessage.textContent = "✅ Password changed successfully.";
    passwordMessage.className = "success";
    e.target.reset();
  });
});

// =================== Toggle Section ===================
function toggleSection(sectionName) {
  const sections = {
    changePassword: "changePasswordForm",
    forgotPassword: "forgotPasswordForm",
    generatePassword: "generatePassword",
  };

  Object.keys(sections).forEach(key => {
    const el = document.getElementById(sections[key]);
    if (el) el.style.display = key === sectionName ? "block" : "none";
  });
}

// =================== Forgot Password ===================
function verifyForgotPassword() {
  const username = document.getElementById("forgotUsername").value.trim();
  const email = document.getElementById("forgotEmail").value.trim();
  const actualUsername = document.getElementById("popupUsername").innerText.trim();
  const actualEmail = document.getElementById("popupEmail").innerText.trim();
  const msg = document.getElementById("forgotMessage");

  if (username === actualUsername && email === actualEmail) {
    const newPassword = generateStrongPassword();
    msg.style.color = "#0f0";
    msg.innerHTML = `✅ Verified! Your temporary password is: <strong>${newPassword}</strong>`;

    // Update the user's password in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
    }
  } else {
    msg.style.color = "red";
    msg.textContent = "❌ Username or Email does not match.";
  }
}

// =================== Password Generator ===================
function generateStrongPassword() {
  const length = parseInt(document.getElementById("passwordLength")?.value || 12);
  const upper = document.getElementById("includeUppercase")?.checked;
  const lower = document.getElementById("includeLowercase")?.checked;
  const nums = document.getElementById("includeNumbers")?.checked;
  const symb = document.getElementById("includeSymbols")?.checked;

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let allChars = "";
  if (upper) allChars += upperChars;
  if (lower) allChars += lowerChars;
  if (nums) allChars += numberChars;
  if (symb) allChars += symbolChars;

  if (!allChars) return "Please select at least one option.";

  let password = "";
  for (let i = 0; i < length; i++) {
    const char = allChars[Math.floor(Math.random() * allChars.length)];
    password += char;
  }

  const output = document.getElementById("generatedPassword");
  if (output) output.value = password;

  return password;
}

function copyPassword(id = "generatedPassword", iconId = "copyIcon") {
  const input = document.getElementById(id);
  const icon = document.getElementById(iconId);
  if (!input) return;

  input.select();
  input.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(input.value).then(() => {
    if (icon) {
      icon.classList.remove("fa-copy");
      icon.classList.add("fa-check");
      setTimeout(() => {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-copy");
      }, 2000);
    }
  });
}

function updatePasswordLengthValue(value) {
  document.getElementById('passwordLengthValue').textContent = value;
}