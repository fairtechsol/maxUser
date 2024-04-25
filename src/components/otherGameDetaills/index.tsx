import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import FootballDesktopGameDetail from "./desktop";
import FootballMobileGameDetail from "./mobile";
import { useSelector } from "react-redux";
import {
  // useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";
import {
  getButtonValue,
  getProfileInMatchDetail,
  updateBalanceOnSessionResult,
  // updateBalance,
} from "../../store/actions/user/userAction";
import {
  getMatchList,
  selectedBetAction,
} from "../../store/actions/match/matchListAction";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import { expertSocketService, socket, socketService } from "../../socketManager";
import {
  otherMatchDetailAction,
  updateMatchRates,
  updateTeamRatesOnPlaceBet,
  updateUserBalanceOnPlaceBet,
} from "../../store/actions/otherMatchActions";

const FootballGameDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const { success } = useSelector(
    (state: RootState) => state.otherGames.matchDetail
  );
  // const navigate = useNavigate();
  const { id, type } = useParams();
  useEffect(() => {
    dispatch(getButtonValue());
  }, [dispatch]);

  const setMatchRatesInRedux = (event: any) => {
    try {
      if (id === event?.id) {
        dispatch(updateMatchRates(event));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const setMatchBetsPlaced = (event: any) => {
    try {
      dispatch(updateUserBalanceOnPlaceBet(event?.jobData));
      if (event?.jobData?.matchId === id) {
        dispatch(updateBetsPlaced(event?.jobData?.newBet));
        dispatch(updateTeamRatesOnPlaceBet(event?.jobData));
      }
    } catch (e) {
      console.log(e);
    }
  };
  // const betDeleted = (event: any) => {
  //   try {
  //     dispatch(updateUserBalanceOnPlaceBet(event));
  //     if (event?.matchId === id) {
  //       dispatch(
  //         otherMatchDetailAction({ matchId: id, matchType: "football" })
  //       );
  //       dispatch(getPlacedBets(id));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const resultDeclared = (event: any) => {
  //   try {
  //     if (event?.matchId === id) {
  //       navigate("/game-list/football");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const sessionResultDeclared = (event: any) => {
    try {
      dispatch(updateBalanceOnSessionResult(event?.userBalanceData));
    } catch (e) {
      console.log(e);
    }
  };

  const handleMatchResult = () => {
    dispatch(getMatchList({}));
    dispatch(getProfileInMatchDetail());
  };
  const getUserProfile = () => {
    dispatch(getProfileInMatchDetail());
  };

  useEffect(() => {
    try {
      if (id && getProfile?.roleName) {
        dispatch(selectedBetAction(null));
        dispatch(
          otherMatchDetailAction({ matchId: id, matchType: type })
        );
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id, getProfile?.roleName]);

  useEffect(() => {
    try {
      if (success && socket) {
        expertSocketService.match.joinMatchRoom(id, getProfile?.roleName);
        expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
        socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        // socketService.userBalance.matchResultDeclared(resultDeclared);
        // socketService.userBalance.matchDeleteBet(betDeleted);
      }
    } catch (error) {
      console.log(error);
    }
  }, [success, socket]);

  useEffect(() => {
    try {
      return () => {
        expertSocketService.match.leaveMatchRoom(id);
        expertSocketService.match.getMatchRatesOff(id);
        socketService.userBalance.userMatchBetPlacedOff();
        // socketService.userBalance.matchResultDeclaredOff();
        // socketService.userBalance.matchDeleteBetOff();
        socketService.userBalance.sessionResult(sessionResultDeclared);
        socketService.userBalance.sessionResultUnDeclare(sessionResultDeclared);
        socketService.userBalance.matchResultDeclared(handleMatchResult);
        socketService.userBalance.sessionNoResult(getUserProfile);
        socketService.userBalance.matchResultUnDeclared(handleMatchResult);
        socketService.userBalance.matchDeleteBet(getUserProfile);
        socketService.userBalance.sessionDeleteBet(getUserProfile);
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (id) {
          dispatch(selectedBetAction(null));
          dispatch(
            otherMatchDetailAction({ matchId: id, matchType: type })
          );
          dispatch(getPlacedBets(id));
          dispatch(getPlacedBets(id));
        }
      } else if (document.visibilityState === "hidden") {
        expertSocketService.match.leaveMatchRoom(id);
        expertSocketService.match.getMatchRatesOff(id);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isMobile ? (
    <FootballMobileGameDetail />
  ) : (
    <FootballDesktopGameDetail />
  );
};

export default FootballGameDetails;
