import { Navigate, Outlet } from "react-router-dom";
import { tokenManager } from "../util/tokenManager";

const PrivateRoute = () => {
  const token = tokenManager.getToken();
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

const PublicRoute = () => {
  const token = tokenManager.getToken();

  return !token ? <Outlet /> : <Navigate to="/todo" />;
};

export { PrivateRoute, PublicRoute };
