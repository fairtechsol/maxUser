import { Navigate } from "react-router-dom";
import AuthLayout from "../layout/auth";
import Loadable from "../utils/loadable";
// import Login from "../pages/auth/login/login";
// ==============================|| Auth ROUTING ||============================== //
const Login = Loadable(() => import("../pages/auth/login/login"));
const SecurityAuth = Loadable(() => import("../pages/security"));

const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to={"/login"} replace /> },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "verify",
      element: <SecurityAuth />,
    },
    {
      path: "*",
      element: <Navigate to={"/login"} replace />,
    },
  ],
};
export default AuthRoutes;
