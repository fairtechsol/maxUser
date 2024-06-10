// import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect } from "react";
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
import isMobile from "../../utils/screenDimension";
import "../layout.scss";
import Header from "./header";
import Sidebar from "./sidebar";
import TopBar from "./topbar";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

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
    } else {
      socketService.disconnect();
    }
    return () => {
      socketService.disconnect();
    };
  }, [sessionStorage.getItem("jwtMaxUser")]);

  return (
    <>
      <Header />
      <TopBar />
      <div className="d-flex">
        {!isMobile && (
          <div className={`sidebar sidebarActive`}>
            <Sidebar />
          </div>
        )}
        <main className="w-100 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
