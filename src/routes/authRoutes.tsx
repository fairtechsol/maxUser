import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../layout/auth";
import Loadable from "../utils/loadable";
import VideoPage from "../pages/public/VideoPage";
import ScoreBoardPage from "../pages/public/ScoreBoardPage";
// import Login from "../pages/auth/login/login";
// ==============================|| Auth ROUTING ||============================== //
const Login = Loadable(() => import("../pages/auth/login/login"));

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
      path: "videoPage/:vidId",
      element: <VideoPage />,
    },
    {
      path: "scoreBoardPage/:vidId",
      element: <ScoreBoardPage />,
    },
    {
      path: "*",
      element: <Navigate to={"/login"} replace />,
    },
  ],
};
export default AuthRoutes;
