function protectPages() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    // Normalize path
    let path = window.location.pathname.toLowerCase();
    path = path.replace(/\/+$/, ''); // remove trailing slashes
    if (path === '' || path === '/') path = '/index.html'; // treat '/' as '/index.html'

    // Routes that are allowed without login
    const publicRoutes = ['/index.html', '/register.html'];

    // Routes only allowed after login
    const privateRoutes = ['/rento/home.html', '/home.html'];

    const isPublicRoute = publicRoutes.includes(path);
    const isPrivateRoute = privateRoutes.includes(path);

    // 🔒 Logged-in users shouldn't access login or register pages
    if (loggedInUser && isPublicRoute) {
        window.location.replace('/rento/home.html');
        return;
    }

    // 🔒 Not logged-in users can't access private pages
    if (!loggedInUser && isPrivateRoute) {
        window.location.replace('/index.html');
        return;
    }

    // 🔒 Not logged-in users can't access unknown pages
    if (!loggedInUser && !isPublicRoute && !isPrivateRoute) {
        window.location.replace('/index.html');
        return;
    }

    // ✅ All checks passed — allow access
}

protectPages();
