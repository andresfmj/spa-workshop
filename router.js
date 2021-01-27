class Router {
  
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoutes();
  }

  _loadInitialRoutes() {
    const pathName = location.pathname.split('/');
    const pathSegment = pathName.length > 1 ? pathName.slice(1) : '';

    this.loadRoutes(...pathSegment);
  }

  _mathUrlToRoute(urlSegment) {
    const matchedRoute = this.routes.find(route => {
      const routePathSegment = route.path.split('/').slice(1);
      if (routePathSegment.length !== urlSegment.length)
        return false;
      
      return routePathSegment
        .every((routePathSeg, i) => routePathSeg === urlSegment[i])
    })
    return matchedRoute;
  }

  loadRoutes(...urlSegments) {
    const matchedRoute = this._mathUrlToRoute(urlSegments);
    const url = `/${urlSegments.join('/')}`;
    history.pushState({}, 'this works', url);

    const routerOutElm = document.querySelectorAll('[data-router]')[0];
    routerOutElm.innerHTML = matchedRoute.template;
  }

}
