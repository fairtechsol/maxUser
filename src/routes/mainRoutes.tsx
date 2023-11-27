import { lazy } from "react";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
// ==============================|| Main ROUTING ||============================== //
const Home = Loadable(lazy(() => import("../pages/home")));
const GameDetail = Loadable(lazy(() => import("../pages/gameDetails")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "game-detail/:id",
      element: <GameDetail/>,
    },
  ],
};
export default MainRoutes;
