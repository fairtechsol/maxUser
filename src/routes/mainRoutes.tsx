import { lazy } from "react";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
// ==============================|| Main ROUTING ||============================== //
const Home = Loadable(lazy(() => import("../pages/dashboard")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "home",
      element: <Home />,
    },
  ],
};
export default MainRoutes;
