  function protectPages() {
      const loggedInUser = localStorage.getItem('loggedInUser');

      let path = window.location.pathname.toLowerCase();
      path = path.replace(/\/+$/, '');
      if (path === '' || path === '/') path = '/index.html';

      const publicRoutes = ['/index.html', '/register.html'];
      const privateRoutes = ['/rento/home.html', '/home.html'];

      const isPublicRoute = publicRoutes.includes(path);
      const isPrivateRoute = privateRoutes.includes(path);

      if (loggedInUser) {
          if (path === '/register.html' || path === '/index.html') {
              window.location.replace('/rento/home.html');
              return;
          }
      } else {
          if (!isPublicRoute) {
              window.location.replace('/index.html');
              return;
          }
      }
  }

  protectPages();
