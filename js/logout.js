document.querySelectorAll('.logoutLink').forEach(function(logoutLink) {
    logoutLink.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior

        // Just remove the logged-in user from localStorage
        localStorage.removeItem('loggedInUser');

        // Redirect to the login page
        window.location.href = './index.html';
    });
});
