import { Redirect, Route, RouteProps } from 'react-router-dom';

export const PrivateRoute = (props: RouteProps) => {
  const isLoggedIn = Boolean(localStorage.getItem('user'));
  if (!isLoggedIn) return <Redirect to="/auth" />;
  return <Route {...props} />;
};
