import { lazy } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
// import Home from "../pages/home";
// import GameDetail from "../pages/gameDetails";
// import FootballGameDetail from "../pages/otherGameDetails";
// import AccountStatement from "../pages/accountStatement";
// import ProfitLoss from "../pages/profitLoss";
// import BetHistory from "../pages/betHistory";
// import UnsettledBet from "../pages/unsettledBet";
// import Mobile from "../components/rules/mobile";
// import ChangeButtonValue from "../pages/changeButtonValues";
// import SecureAuthVerification from "../pages/auth/secureAuthVerification";
// import ChangePassword from "../pages/auth/changePassword";
// import ContactAdmin from "../components/commonComponent/contactAdmin";
// import GameList from "../pages/gameList";

// ==============================|| Main ROUTING ||============================== //
const Home = Loadable(lazy(() => import("../pages/home")));
const GameDetail = Loadable(lazy(() => import("../pages/gameDetails")));
const FootballGameDetail = Loadable(
  lazy(() => import("../pages/otherGameDetails"))
);

const AccountStatement = Loadable(
  lazy(() => import("../pages/accountStatement"))
);
const ProfitLoss = Loadable(lazy(() => import("../pages/profitLoss")));
const BetHistory = Loadable(lazy(() => import("../pages/betHistory")));
const UnsettledBet = Loadable(lazy(() => import("../pages/unsettledBet")));
const Mobile = Loadable(lazy(() => import("../components/rules/mobile")));
const RaceDetail = Loadable(lazy(() => import("../pages/horseRacingDetails")));
const TeenPatti20 = Loadable(lazy(() => import("../pages/teenPatti20")));
const DragonTiger20 = Loadable(lazy(() => import("../pages/dragon20")));
const DragonTigerSecond20 = Loadable(lazy(() => import("../pages/dragonSecond20")));
const CardList3 = Loadable(lazy(() => import("../pages/cardList3")));
const CardList4 = Loadable(lazy(() => import("../pages/cardList4")));
const ChangeButtonValue = Loadable(
  lazy(() => import("../pages/changeButtonValues"))
);

const SecureAuthVerification = Loadable(
  lazy(() => import("../pages/auth/secureAuthVerification"))
);
const ChangePassword = Loadable(
  lazy(() => import("../pages/auth/changePassword"))
);
const ContactAdmin = Loadable(
  lazy(() => import("../components/commonComponent/contactAdmin"))
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
      path: "sports",
      element: <Home />,
    },
    {
      path: "inPlay",
      element: <Home />,
    },
    {
      path: "account-statement",
      element: <AccountStatement />,
    },
    { path: "profit-loss", element: <ProfitLoss /> },
    { path: "bet-history", element: <BetHistory /> },
    { path: "unsettled-bet", element: <UnsettledBet /> },
    { path: "change-btn-value", element: <ChangeButtonValue /> },

    { path: "secure-auth", element: <SecureAuthVerification /> },
    { path: "change-password", element: <ChangePassword /> },
    {
      path: "game-detail/:type/:id",
      element: <GameDetail />,
    },
    {
      path: "other-game-detail/:type/:id",
      element: <FootballGameDetail />,
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
      path: "teenPatti20",
      element: <TeenPatti20 />,
    },
    {
      path: "dt20",
      element: <DragonTiger20 />,
    },
    {
      path: "dt202",
      element: <DragonTigerSecond20 />,
    },
    {
      path: "game-list/:type",
      element: <GameList />,
    },{
      path: "card3-list/:type",
      element: <CardList3 />,
    },{
      path: "card4-list/:type",
      element: <CardList4 />,
    },
    {
      path: "contact-admin",
      element: <ContactAdmin />,
    },
    {
      path: "*",
      element: <Navigate to={"/home"} replace />,
    },
  ],
};
export default MainRoutes;
