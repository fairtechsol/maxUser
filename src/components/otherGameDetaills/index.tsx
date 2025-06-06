import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  expertSocketService,
  matchService,
  socket,
  socketService,
} from "../../socketManager";
import {
  betPlacedReset,
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import {
  matchDetailAction,
  matchDetailReset,
  // getMatchList,
  selectedBetAction,
  updateMatchRates,
} from "../../store/actions/match/matchListAction";
import { updateTeamRatesOnPlaceBet } from "../../store/actions/otherMatchActions";
import {
  getButtonValue,
  getProfileInMatchDetail,
  updateBalance,
  updateBalanceOnBetDelete,
  updateBalanceOnSessionResult,
  updateDeleteReasonBet,
  updateMatchRatesOnMarketUndeclare,
  updatePlacedbetsDeleteReason,
  updateTeamRatesOnDeleteMatchOther,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { isMobile } from "../../utils/screenDimension";
import FootballDesktopGameDetail from "./desktop";
import FootballMobileGameDetail from "./mobile";

const FootballGameDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const { success, matchDetails } = useSelector((state: RootState) => state.match.matchList);
  const navigate = useNavigate();
  const { id, type } = useParams();

  useEffect(() => {
    if (id) {
      matchService.connect([id]);
    }
    return () => {
      matchService.disconnect();
    };
  }, [id]);

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
      dispatch(updateBalance(event?.jobData));
      if (event?.jobData?.matchId === id) {
        dispatch(updateBetsPlaced(event?.jobData?.newBet));
        dispatch(updateTeamRatesOnPlaceBet(event?.jobData));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sessionResultDeclared = (event: any) => {
    try {
      dispatch(updateBalanceOnSessionResult(event?.userBalanceData));
    } catch (e) {
      console.log(e);
    }
  };

  const handleMatchResult = () => {
    // dispatch(getMatchList({}));
    dispatch(getProfileInMatchDetail());
  };
  const getUserProfile = () => {
    dispatch(getProfileInMatchDetail());
  };

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(getProfileInMatchDetail());
        if (event?.betType === "quickbookmaker1" || event.isMatchDeclare) {
          navigate(
            "/home"
            // `${
            //   isMobile
            //     ? `/sports`
            //     : `/game-list/${event?.gameType || "cricket"}`
            // }`
          );
        } else {
          dispatch(getPlacedBets(id));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMatchbetDeleted = (event: any) => {
    try {
      dispatch(
        updateBalanceOnBetDelete({
          exposure: event?.exposure,
          currentBalance: event?.currentBalance,
        })
      );
      if (event?.matchId === id) {
        dispatch(updateTeamRatesOnDeleteMatchOther(event));
        dispatch(updateDeleteReasonBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMatchMarketResult = (event: any) => {
    try {
      if (event?.matchId === id) {
        if (event?.betType !== "quickbookmaker1") {
          dispatch(getPlacedBets(id));
          dispatch(updateMatchRatesOnMarketUndeclare(event));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReasonUpdate = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(updatePlacedbetsDeleteReason(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (id) {
        dispatch(selectedBetAction(null));
        dispatch(matchDetailAction(id));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    if (matchDetails && matchDetails?.stopAt) {
      toast.error("Match has been over.");
      navigate(`/game-list/${type}`);
    }
  }, [matchDetails]);

  useEffect(() => {
    try {
      if (success && socket) {
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        socketService.userBalance.matchResultUnDeclaredOff();
        socketService.userBalance.updateDeleteReasonOff();
        expertSocketService.match.joinMatchRoom(id);
        expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
        socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.userBalance.declaredMatchResultAllUser(resultDeclared);
        socketService.userBalance.matchResultDeclared(resultDeclared);
        socketService.userBalance.matchDeleteBet(handleMatchbetDeleted);
        socketService.userBalance.matchResultUnDeclared(
          handleMatchMarketResult
        );
        socketService.userBalance.updateDeleteReason(handleDeleteReasonUpdate);
      }
    } catch (error) {
      console.log(error);
    }
  }, [success, socket, id]);

  useEffect(() => {
    try {
      return () => {
        // expertSocketService.match.leaveMatchRoom(id);
        expertSocketService.match.getMatchRatesOff(id);
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.matchDeleteBetOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchResultUnDeclaredOff();
        socketService.userBalance.updateDeleteReasonOff();
        socketService.userBalance.sessionResult(sessionResultDeclared);
        socketService.userBalance.sessionResultUnDeclare(sessionResultDeclared);
        socketService.userBalance.matchResultDeclared(handleMatchResult);
        socketService.userBalance.sessionNoResult(getUserProfile);
        socketService.userBalance.matchResultUnDeclared(handleMatchResult);
        socketService.userBalance.matchDeleteBet(getUserProfile);
        socketService.userBalance.sessionDeleteBet(getUserProfile);
        dispatch(matchDetailReset());
        dispatch(betPlacedReset());
      };
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // if (!socket.connected) {
        //   socketService.connect();
        // }
        if (id) {
          dispatch(selectedBetAction(null));
          // dispatch(otherMatchDetailAction({ matchId: id, matchType: type }));
          dispatch(getPlacedBets(id));
          expertSocketService.match.joinMatchRoom(id);
          expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
        }
      } else if (document.visibilityState === "hidden") {
        // expertSocketService.match.leaveMatchRoom(id);
        expertSocketService.match.getMatchRatesOff(id);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [id]);

  return isMobile ? (
    <FootballMobileGameDetail />
  ) : (
    <FootballDesktopGameDetail />
  );
};

export default FootballGameDetails;
