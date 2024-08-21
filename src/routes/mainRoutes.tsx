// import { } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/main";
import Loadable from "../utils/loadable";
import Cards32 from "../pages/cards32";
import Lucky7B from "../pages/lucky7B";
import CasinoWar from "../pages/casinoWar";
import Poker1day from "../pages/poker1day";
import Poker20 from "../pages/poker20";
import Cricket5 from "../pages/cricket5";

// ==============================|| Main ROUTING ||============================== //
const Home = Loadable(() => import("../pages/home"));
const GameDetail = Loadable(() => import("../pages/gameDetails"));
const FootballGameDetail = Loadable(() => import("../pages/otherGameDetails"));

const AccountStatement = Loadable(() => import("../pages/accountStatement"));
const ProfitLoss = Loadable(() => import("../pages/profitLoss"));
const BetHistory = Loadable(() => import("../pages/betHistory"));
const UnsettledBet = Loadable(() => import("../pages/unsettledBet"));
const CasinoReports = Loadable(() => import("../pages/reports/casinoReport"));
const Mobile = Loadable(() => import("../components/rules/mobile"));
const RaceDetail = Loadable(() => import("../pages/horseRacingDetails"));
const TeenPatti20 = Loadable(() => import("../pages/teenPatti20"));
const TeenPatti1D = Loadable(() => import("../pages/teenPatti1D"));
const TeenPattiTest = Loadable(() => import("../pages/teenPattiTest"));
const TeenPattiOpen = Loadable(() => import("../pages/teenPattiOpen"));
const Lucky7 = Loadable(() => import("../pages/lucky7"));
const AmarAkbarAnthony = Loadable(() => import("../pages/amarAkbarAnthony"));
const BollywoodTable = Loadable(() => import("../pages/bollywoodTable"));
const Superover = Loadable(() => import("../pages/superover"));
const DragonTiger20 = Loadable(() => import("../pages/dragon20"));
const DragonTigerSecond20 = Loadable(() => import("../pages/dragonSecond20"));
const DragonTigerLion = Loadable(() => import("../pages/dragonTigerLion"));
const DragonTigerOneDay = Loadable(() => import("../pages/dragonTigerOneDay"));
const CardList3 = Loadable(() => import("../pages/cardList3"));
const CardList4 = Loadable(() => import("../pages/cardList4"));
const Poker6 = Loadable(() => import("../pages/poker"));
const Abj2 = Loadable(() => import("../pages/abj2"));
const Abj1 = Loadable(() => import("../pages/abj"));
const Worli = Loadable(() => import("../pages/worli"));
const Cards32B = Loadable(() => import("../pages/cards32B"));
const Race20 = Loadable(() => import("../pages/race20"));
const Baccarat1 = Loadable(() => import("../pages/baccarat1"));
const Baccarat2 = Loadable(() => import("../pages/baccarat2"));
const CasinoMeter = Loadable(() => import("../pages/casinoMeter"));
const CardJ = Loadable(() => import("../pages/3cardJ"));

const CricketMatch20 = Loadable(() => import("../pages/cricketMatch_20"));
const Queen = Loadable(() => import("../pages/queen"));
const ChangeButtonValue = Loadable(() => import("../pages/changeButtonValues"));

const SecureAuthVerification = Loadable(
  () => import("../pages/auth/secureAuthVerification")
);
const ChangePassword = Loadable(() => import("../pages/auth/changePassword"));
const ContactAdmin = Loadable(
  () => import("../components/commonComponent/contactAdmin")
);
const GameList = Loadable(() => import("../pages/gameList/index"));

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
      path: "teenPatti20",
      element: <TeenPatti20 />, //
    },

    {
      path: "teen",
      element: <TeenPatti1D />, //
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
      element: <CasinoWar />,
    },

    {
      path: "lucky7-A",
      element: <Lucky7 />, //
    },
    {
      path: "lucky7eu",
      element: <Lucky7B />, //
    },
    {
      path: "32cards-A",
      element: <Cards32 />, //
    },
    {
      path: "abj2",
      element: <Abj2 />, //
    },
    {
      path: "dt20",
      element: <DragonTiger20 />, //
    },
    {
      path: "dt202",
      element: <DragonTigerSecond20 />, //
    },
    {
      path: "dtl20",
      element: <DragonTigerLion />, //
    },
    {
      path: "dt6",
      element: <DragonTigerOneDay />, //
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
      path: "baccarat",
      element: <Baccarat1 />,
    },
    {
      path: "baccarat2",
      element: <Baccarat2 />,
    },
    {
      path: "aaa",
      element: <AmarAkbarAnthony />,
    },
    {
      path: "btable",
      element: <BollywoodTable />,
    },

    {
      path: "worli2",
      element: <Worli />,
    },
    {
      path: "3cardj",
      element: <CardJ />,
    },
    {
      path: "cmatch20",
      element: <CricketMatch20 />,
    },
    {
      path: "cmeter",
      element: <CasinoMeter />,
    },
    { path: "queen", element: <Queen /> },

    {
      path: "*",
      element: <Navigate to={"/home"} replace />,
    },
  ],
};
export default MainRoutes;
