document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    console.log('Form submitted'); // Check if this appears in the console

    // Create a FormData object from the form
    const formData = new FormData(e.target);

    // Convert FormData to a plain object
    const user = Object.fromEntries(formData.entries());

    // Check the user object
    console.log(user); // This should print the user object in the console

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username or email already exists
    const userExists = users.some(u => u.username === user.username || u.email === user.email);

    if (userExists) {
        const message = document.getElementById('message');
        message.textContent = "User already exists. Please login or use another email/username.";
        message.className = 'error';
    } else {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        const message = document.getElementById('message');
        message.textContent = "Registration successful! Redirecting to login...";
        message.className = 'success';

        // Clear the form
        e.target.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 500);
    }
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
  
