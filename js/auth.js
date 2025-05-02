function protectPages() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    // Normalize current path
    let path = window.location.pathname.toLowerCase();
    path = path.replace(/\/+$/, ''); // Remove trailing slashes
    if (path === '' || path === '/') path = '/index.html';

    // Routes that don't require login
    const publicRoutes = [
        '/index.html',
        '/register.html',
        '/'
    ];

    // Routes only accessible when logged in
    const privateRoutes = [
        '/home.html',
        '/rento/home.html'
    ];

    const isPublicRoute = publicRoutes.includes(path);
    const isPrivateRoute = privateRoutes.includes(path);

    // ✅ User is logged in
    if (loggedInUser) {
        // Prevent access to login/register
        if (path === '/' || path === '/register.html' || path === '/index.html') {
            window.location.replace('/home.html');
            return;
        }
    } else {
        // ✅ User is NOT logged in
        if (!isPublicRoute) {
            // Block access to private or unknown pages
            window.location.replace('/index.html');
            return;
        }
    }

    // ✅ All checks passed, allow access
}
