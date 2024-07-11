import { lazy } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
import Cards32 from "../pages/cards32";
import Lucky7B from "../pages/lucky7B";
import CasinoWar from "../pages/casinoWar";
import Poker1day from "../pages/poker1day";
import Poker20 from "../pages/poker20";
import Cricket5 from "../pages/cricket5";
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
const CasinoReports = Loadable(
  lazy(() => import("../pages/reports/casinoReport"))
);
const Mobile = Loadable(lazy(() => import("../components/rules/mobile")));
const RaceDetail = Loadable(lazy(() => import("../pages/horseRacingDetails")));
const TeenPatti20 = Loadable(lazy(() => import("../pages/teenPatti20")));
const TeenPatti1D = Loadable(lazy(() => import("../pages/teenPatti1D")));
const TeenPattiTest = Loadable(lazy(() => import("../pages/teenPattiTest")));
const TeenPattiOpen = Loadable(lazy(() => import("../pages/teenPattiOpen")));
const Lucky7 = Loadable(lazy(() => import("../pages/lucky7")));
const AmarAkbarAnthony = Loadable(lazy(() => import("../pages/amarAkbarAnthony")));
const BollywoodTable = Loadable(lazy(() => import("../pages/bollywoodTable")));
const Superover = Loadable(lazy(() => import("../pages/superover")));
const DragonTiger20 = Loadable(lazy(() => import("../pages/dragon20")));
const DragonTigerSecond20 = Loadable(
  lazy(() => import("../pages/dragonSecond20"))
);
const DragonTigerLion = Loadable(
  lazy(() => import("../pages/dragonTigerLion"))
);
const DragonTigerOneDay = Loadable(
  lazy(() => import("../pages/dragonTigerOneDay"))
);
const CardList3 = Loadable(lazy(() => import("../pages/cardList3")));
const CardList4 = Loadable(lazy(() => import("../pages/cardList4")));
const Poker6 = Loadable(lazy(() => import("../pages/poker")));
const Abj2 = Loadable(lazy(() => import("../pages/abj2")));
const Abj1 = Loadable(lazy(() => import("../pages/abj")));
const Cards32B = Loadable(lazy(() => import("../pages/cards32B")));
const Race20 = Loadable(lazy(() => import("../pages/race20")));
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
      path: "casino-slot",
      element: <Home />,
    },
    {
      path: "other",
      element: <Home />,
    },
    {
      path: "account-statement",
      element: <AccountStatement />,
    },
    { path: "profit-loss", element: <ProfitLoss /> },
    { path: "bet-history", element: <BetHistory /> },
    { path: "unsettled-bet", element: <UnsettledBet /> },
    { path: "casino-report", element: <CasinoReports /> },
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
      path: "teen",
      element: <TeenPatti1D />,
    },
    
    {
      path: "teen8",
      element: <TeenPattiOpen />,
    },

    {
      path: "teen9",
      element: <TeenPattiTest />,
    },
    
    {
      path: "war",
      element: <CasinoWar/>,
    },

    {
      path: "lucky7-A",
      element: <Lucky7 />,
    },
    {
      path: "lucky7eu",
      element: <Lucky7B />,
    },
    {
      path: "32cards-A",
      element: <Cards32 />,
    },
    {
      path: "abj2",
      element: <Abj2 />,
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
      path: "dtl20",
      element: <DragonTigerLion />,
    },
    {
      path: "dt6",
      element: <DragonTigerOneDay />,
    },
    {
      path: "game-list/:type",
      element: <GameList />,
    },
    {
      path: "card3-list/:type",
      element: <CardList3 />,
    },
    {
      path: "card4-list/:type",
      element: <CardList4 />,
    },
    {
      path: "contact-admin",
      element: <ContactAdmin />,
    },
    {
      path: "32cards-B",
      element: <Cards32B />,
    },
    {
      path: "ab20",
      element: <Abj1 />,
    },
    {
      path: "race20",
      element: <Race20 />,
    },
    {
      path: "superover",
      element: <Superover />,
    },
    {
      path: "poker6",
      element: <Poker6 />,
    },
    {
      path: "poker",
      element: <Poker1day />,
    },
    {
      path: "poker20",
      element: <Poker20 />,
    },
    {
      path: "cricketv3",
      element: <Cricket5 />,
    },
    {
      path: "*",
      element: <Navigate to={"/home"} replace />,
    },
    {
      path: "aaa",
      element: <AmarAkbarAnthony/>,
    },
    {
      path: "btable",
      element: <BollywoodTable/>,
    },
  ],
};
export default MainRoutes;
