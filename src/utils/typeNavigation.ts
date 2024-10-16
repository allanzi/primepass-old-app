export default (route: string | undefined): boolean => {
  const myRoute = route as string;
  const routeFormatted = myRoute.toLowerCase();
  const DRAWER_ROUTES = [
    'home',
    'profile',
    'settings',
    'services',
    'theaters',
    'login',
  ];

  const isADrawerRoute = DRAWER_ROUTES
    .find((item) => item === routeFormatted);

  return isADrawerRoute === routeFormatted;
};
