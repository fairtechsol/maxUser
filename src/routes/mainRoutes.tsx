// import { } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";

// ==============================|| Main ROUTING ||============================== //
const Home = Loadable(() => import("../pages/home"));
const GameDetail = Loadable(() => import("../pages/gameDetails"));

const AccountStatement = Loadable(() => import("../pages/accountStatement"));
const ProfitLoss = Loadable(() => import("../pages/profitLoss"));
const BetHistory = Loadable(() => import("../pages/betHistory"));
const UnsettledBet = Loadable(() => import("../pages/unsettledBet"));
const LiveCasinoBets = Loadable(
  () => import("../pages/reports/liveCasinoBets")
);
const Mobile = Loadable(() => import("../components/rules/mobile"));
const RaceDetail = Loadable(() => import("../pages/horseRacingDetails"));

const ChangeButtonValue = Loadable(() => import("../pages/changeButtonValues"));

const SecureAuthVerification = Loadable(
  () => import("../pages/auth/secureAuthVerification")
);
const ChangePassword = Loadable(() => import("../pages/auth/changePassword"));
const ContactAdmin = Loadable(
  () => import("../components/commonComponent/contactAdmin")
);
const GameList = Loadable(() => import("../pages/gameList/index"));
const LiveCasino = Loadable(() => import("../pages/casinoSubTab"));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "sports",
      element: <Home />,
    },
    {
      path: "inPlay",
      element: <Home />,
    },
    {
      path: "casino-slot",
      element: <Home />,
    },
    {
      path: "live-casino",
      element: <LiveCasino />,
    },
    {
      path: "casino",
      element: <LiveCasino />,
    },
    {
      path: "live-casinom",
      element: <Home />,
    },
    {
      path: "other",
      element: <Home />,
    },
    {
      path: "virtual",
      element: <Home />,
    },
    {
      path: "slot",
      element: <Home />,
    },
    {
      path: "fantasy",
      element: <Home />,
    },
    {
      path: "account-statement",
      element: <AccountStatement />,
    },
    { path: "profit-loss", element: <ProfitLoss /> },
    { path: "bet-history", element: <BetHistory /> },
    { path: "unsettled-bet", element: <UnsettledBet /> },
    { path: "live-casino-bets", element: <LiveCasinoBets /> },
    { path: "change-btn-value", element: <ChangeButtonValue /> },

    { path: "secure-auth", element: <SecureAuthVerification /> },
    { path: "change-password", element: <ChangePassword /> },
    {
      path: "game-detail/:type/:id",
      element: <GameDetail />,
    },
    {
      path: "race/:id",
      element: <RaceDetail />,
    },
    {
      path: "rules",
      element: <Mobile />,
    },
    {
      path: "game-list/:type",
      element: <GameList />,
    },

    {
      path: "contact-admin/:type",
      element: <ContactAdmin />,
    },
    {
      path: "*",
      element: <Navigate to={"/home"} replace />,
    },
  ],
};
export default MainRoutes;
