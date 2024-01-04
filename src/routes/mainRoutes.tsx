import { lazy } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
// ==============================|| Main ROUTING ||============================== //
const Home = Loadable(lazy(() => import("../pages/home")));
const GameDetail = Loadable(lazy(() => import("../pages/gameDetails")));
const AccountStatement = Loadable(
  lazy(() => import("../pages/accountStatement"))
);
const ProfitLoss = Loadable(lazy(() => import("../pages/profitLoss")));
const BetHistory = Loadable(lazy(() => import("../pages/betHistory")));
const UnsettledBet = Loadable(lazy(() => import("../pages/unsettledBet")));
const ChangeBtnValue = Loadable(
  lazy(() => import("../pages/changeButtonValues"))
);

const SecureAuthVerification = Loadable(
  lazy(() => import("../pages/auth/secureAuthVerification"))
);
const ChangePassword = Loadable(
  lazy(() => import("../pages/auth/changePassword"))
);

const GameList = Loadable(lazy(() => import("../pages/gameList/index")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "account-statement",
      element: <AccountStatement />,
    },
    { path: "profit-loss", element: <ProfitLoss /> },
    { path: "bet-history", element: <BetHistory /> },
    { path: "unsettled-bet", element: <UnsettledBet /> },
    { path: "change-btn-value", element: <ChangeBtnValue /> },

    { path: "secure-auth", element: <SecureAuthVerification /> },
    { path: "change-password", element: <ChangePassword /> },
    {
      path: "game-detail/:id",
      element: <GameDetail />,
    },
    {
      path: "game-list/:id",
      element: <GameList />,
    },
    {
      path: "*",
      element: <Navigate to={"/home"} replace />,
    },
  ],
};
export default MainRoutes;
