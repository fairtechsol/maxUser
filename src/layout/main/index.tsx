// import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { socketService } from "../../socketManager";
// import { getMatchList } from "../../store/actions/match/matchListAction";
import {
  getProfile,
  marqueeNotification,
  updateBalanceFromSocket,
  updateBalanceOnSessionResult,
} from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import {isMobile} from "../../utils/screenDimension";
import "../layout.scss";
import Header from "./header";
import Sidebar from "./sidebar";
import TopBar from "./topbar";
import ScrollToTop from "../../components/commonComponent/ScrollToTop";
import { selectedBetAction } from "../../store/actions/match/matchListAction";
import Footer from "./footer";
import FooterBottom from "./footerBottom";
import FooterMain from "./footerMain";
import CasinoNav from "./casinoNav";
import { casinoItems } from "../../utils/constants";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (!sessionStorage.getItem("jwtMaxUser")) {
      navigate("/");
    } else if (
      sessionStorage.getItem("jwtMaxUser") &&
      sessionStorage.getItem("forceChangePassword") &&
      !["login", "change-password"].includes(location.pathname)
    ) {
      navigate("/change-password");
    }
  }, [location.pathname]);

  const updateLoggedUserBalance = (event: any) => {
    dispatch(updateBalanceFromSocket(event));
  };

  const sessionResultDeclared = (event: any) => {
    try {
      dispatch(updateBalanceOnSessionResult(event?.userBalanceData));
    } catch (e) {
      console.log(e);
    }
  };

  const handleMatchResult = () => {
    dispatch(getProfile());
  };

  const getUserProfile = () => {
    dispatch(getProfile());
  };

  useEffect(() => {
    if (!sessionStorage.getItem("jwtMaxUser")) {
      navigate("/login");
      sessionStorage.clear();
    } else {
      dispatch(getProfile());
      dispatch(marqueeNotification());
    }
  }, [sessionStorage.getItem("jwtMaxUser")]);

  useEffect(() => {
    if (sessionStorage.getItem("jwtMaxUser")) {
      socketService.connect();
      socketService.auth.logout();
      socketService.userBalance.updateUserBalance(updateLoggedUserBalance);
      socketService.userBalance.sessionResult(sessionResultDeclared);
      socketService.userBalance.sessionResultUnDeclare(sessionResultDeclared);
      socketService.userBalance.matchResultDeclared(handleMatchResult);
      socketService.userBalance.declaredMatchResultAllUser(handleMatchResult);
      socketService.userBalance.sessionNoResult(getUserProfile);
      socketService.userBalance.matchResultUnDeclared(handleMatchResult);
      socketService.userBalance.unDeclaredMatchResultAllUser(handleMatchResult);
      socketService.userBalance.matchDeleteBet(getUserProfile);
      socketService.userBalance.sessionDeleteBet(getUserProfile);
      socketService.userBalance.sessionDeleteBet(getUserProfile);
      socketService.card.cardResult(handleMatchResult);
    } else {
      socketService.disconnect();
    }
    return () => {
      socketService.disconnect();
    };
  }, [sessionStorage.getItem("jwtMaxUser")]);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
      window.location.reload();
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(selectedBetAction(null));
  }, [location]);

  return (
    <div>
      <ScrollToTop />
      {!isOnline && (
        <div
          style={{
            height: "32px",
            display: "flex",
            background: !isOnline && "red",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h6
            style={{
              color: "#fff",
              fontSize: "13px",
              fontWeight: "bold",
              textAlign: "center",
              margin: "0",
            }}
          >
            You are currently offline
          </h6>
        </div>
      )}
      <Header />
      <TopBar />
      <div className="d-flex">
        {!isMobile && (
          <div className={`sidebar sidebarActive mt-2`}>
            <Sidebar />
            
          </div>
            
        )}
      {/* <div><CasinoNav items={casinoItems} defaultActiveId={2} /></div> */}
        <main className="w-100 overflow-hidden">
          <Outlet />
        </main>
      </div>
      <div
        className="contents-wrapper"
        style={{ width: "100%" }}
      >
        <div className="footer-container">
          <FooterMain />
          <FooterBottom />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
