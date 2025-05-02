function protectPages() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    // Normalize path
    let path = window.location.pathname.toLowerCase();
    path = path.replace(/\/+$/, ''); // remove trailing slashes
    if (path === '' || path === '/') path = '/index.html'; // treat root as index.html

    // Routes allowed without login
    const publicRoutes = ['/index.html', '/register.html'];

    // Routes allowed only after login
    const privateRoutes = ['/rento/home.html', '/home.html'];

    const isPublicRoute = publicRoutes.includes(path);
    const isPrivateRoute = privateRoutes.includes(path);

    // 🔒 Redirect logged-in users away from only index.html (login), but allow /register.html
    if (loggedInUser && path === '/index.html') {
        window.location.replace('/rento/home.html');
        return;
    }

    // 🔒 Block non-logged-in users from private pages
    if (!loggedInUser && isPrivateRoute) {
        window.location.replace('/index.html');
        return;
    }

    // 🔒 Block non-logged-in users from unknown (non-listed) pages
    if (!loggedInUser && !isPublicRoute && !isPrivateRoute) {
        window.location.replace('/index.html');
        return;
    }

    // ✅ All good — allow access
}

protectPages();
