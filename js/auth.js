function protectPages() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const currentPath = window.location.pathname.toLowerCase();

<<<<<<< HEAD
    // Auto-redirect /team-alpha/ to /team-alpha/index.html
    if (currentPath.endsWith('team-alpha/') && !currentPath.endsWith('index.html')) {
        window.location.replace(currentPath + 'index.html');
=======
    // Redirect logged-out users away from protected pages
    const isProtectedPage = currentPath === '/' || currentPath.endsWith('home.html');
    if (isProtectedPage && !loggedInUser) {
        window.location.href = 'login.html';
>>>>>>> fbd0b8d (auth correction)
        return;
    }

    // Redirect logged-out users from protected pages
    const isProtectedPage = currentPath.endsWith('team-alpha/index.html') || currentPath.endsWith('index.html');
    if (isProtectedPage && !loggedInUser) {
        window.location.replace('login.html');
        return;
    }

    // Redirect logged-in users away from login/register pages
    const isAuthPage = currentPath.includes('login') || currentPath.includes('register');
    if (isAuthPage && loggedInUser) {
<<<<<<< HEAD
        window.location.replace('index.html');
=======
        window.location.href = 'home.html';
>>>>>>> fbd0b8d (auth correction)
    }
}
