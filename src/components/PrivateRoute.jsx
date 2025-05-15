
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ user }) => {
  // If the user is not authenticated, redirect to home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, allow access to the route
  return <Outlet />;
};

export default PrivateRoute;
