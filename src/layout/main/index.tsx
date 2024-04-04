// import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { socketService } from "../../socketManager";
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
import { getMatchList } from "../../store/actions/match/matchListAction";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!sessionStorage.getItem("userToken")) {
      navigate("/");
    }
  }, [navigate]);

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
    dispatch(getMatchList({}));
    dispatch(getProfile());
  };

  const getUserProfile = () => {
    dispatch(getProfile());
  };

  useEffect(() => {
    if (!sessionStorage.getItem("userToken")) {
      navigate("/login");
      sessionStorage.clear();
    } else {
      dispatch(getProfile());
      dispatch(marqueeNotification());
    }
  }, [sessionStorage.getItem("userToken")]);

  useEffect(() => {
    if (sessionStorage.getItem("userToken")) {
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
  }, [sessionStorage.getItem("userToken")]);

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
