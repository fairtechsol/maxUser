import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import {
  // getMatchList,
  matchDetailAction,
  selectedBetAction,
  updateMatchRates,
} from "../../store/actions/match/matchListAction";
import {
  betDataFromSocket,
  getButtonValue,
  getProfileInMatchDetail,
  updateBalance,
  updateBalanceOnBetDelete,
  updateBalanceOnSessionBet,
  updateBalanceOnSessionResult,
  updateBetDataOnDeclare,
  updateBetDataOnUndeclare,
  updateDeleteReasonBet,
  updateMaxLossForBet,
  updateProfitLossOnDeleteSession,
  updateRunAmountOnDeleteBet,
  updateTeamRatesOnDeleteMatch,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import DesktopGameDetail from "./desktop";
import MobileGameDetail from "./mobile";
import {
  getPlacedBets,
  resetRunAmount,
  resetRunAmountModal,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";

const GameDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const { success } = useSelector((state: RootState) => state.match.matchList);
  const navigate = useNavigate();
  const { id } = useParams();

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

  const setSessionBetsPlaced = (event: any) => {
    try {
      if (event?.betPlaced?.placedBet?.matchId === id) {
        dispatch(updateBetsPlaced(event?.betPlaced?.placedBet));
        dispatch(updateBalanceOnSessionBet(event));
        dispatch(betDataFromSocket(event));
        dispatch(updateMaxLossForBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setMatchBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        dispatch(updateBetsPlaced(event?.jobData?.newBet));
        dispatch(updateBalance(event?.jobData));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
        if (
          event?.gameType === "cricket" ||
          event?.betType === "quickbookmaker1"
        ) {
          navigate(`/game-list/${event?.gameType}`);
        } else {
          dispatch(getPlacedBets(id));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionResultDeclare = (event: any) => {
    try {
      dispatch(updateBalanceOnSessionResult(event?.userBalanceData));
      if (event?.matchId === id) {
        dispatch(
          updateBetDataOnDeclare({
            betId: event?.betId,
            matchId: event?.matchId,
          })
        );
        dispatch(getPlacedBets(id));
        dispatch(resetRunAmountModal({ showModal: false, id: event?.betId }));
        dispatch(resetRunAmount({ id: event?.betId }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionResultUnDeclare = (event: any) => {
    try {
      dispatch(updateBalanceOnSessionResult(event?.userBalanceData));
      if (event?.matchId === id) {
        dispatch(
          updateBetDataOnUndeclare({
            betId: event?.betId,
            profitLoss: event?.profitLossData,
            matchId: event?.matchId,
          })
        );
        setTimeout(() => {
          dispatch(getPlacedBets(id));
        }, 300);
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
        dispatch(updateTeamRatesOnDeleteMatch(event));
        dispatch(updateDeleteReasonBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionBetDeleted = (event: any) => {
    try {
      dispatch(
        updateBalanceOnBetDelete({
          exposure: event?.exposure,
          currentBalance: event?.currentBalance,
        })
      );
      if (event?.matchId === id) {
        dispatch(
          updateProfitLossOnDeleteSession({
            betId: event?.betId,
            profitLoss: event?.profitLoss,
            matchId: event?.matchId,
          })
        );
        dispatch(
          updateRunAmountOnDeleteBet({
            betId: event?.bets[0].betId,
            profitLoss: event?.profitLoss,
          })
        );
        dispatch(updateDeleteReasonBet(event));
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

  useEffect(() => {
    try {
      if (id && getProfile?.roleName) {
        dispatch(selectedBetAction(null));
        dispatch(matchDetailAction(id));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id, getProfile?.roleName]);

  useEffect(() => {
    try {
      if (success && socket) {
        expertSocketService.match.getMatchRatesOff(id);
        socketService.userBalance.userSessionBetPlacedOff();
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        socketService.userBalance.sessionDeleteBetOff();
        socketService.userBalance.sessionResultOff();
        socketService.userBalance.sessionNoResultOff();
        socketService.userBalance.sessionResultUnDeclareOff();
        expertSocketService.match.joinMatchRoom(id, getProfile?.roleName);
        expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
        socketService.userBalance.userSessionBetPlaced(setSessionBetsPlaced);
        socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.userBalance.matchResultDeclared(resultDeclared);
        socketService.userBalance.declaredMatchResultAllUser(resultDeclared);
        socketService.userBalance.matchDeleteBet(handleMatchbetDeleted);
        socketService.userBalance.sessionDeleteBet(handleSessionBetDeleted);
        socketService.userBalance.sessionResult(handleSessionResultDeclare);
        socketService.userBalance.sessionNoResult(handleSessionResultDeclare);
        socketService.userBalance.sessionResultUnDeclare(
          handleSessionResultUnDeclare
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [success, socket, id]);

  useEffect(() => {
    try {
      return () => {
        expertSocketService.match.leaveMatchRoom(id);
        expertSocketService.match.getMatchRatesOff(id);
        socketService.userBalance.userSessionBetPlacedOff();
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        socketService.userBalance.sessionDeleteBetOff();
        socketService.userBalance.sessionResultOff();
        socketService.userBalance.sessionNoResultOff();
        socketService.userBalance.sessionResultUnDeclareOff();
        socketService.userBalance.sessionResult(sessionResultDeclared);
        socketService.userBalance.sessionResultUnDeclare(sessionResultDeclared);
        socketService.userBalance.matchResultDeclared(handleMatchResult);
        socketService.userBalance.declaredMatchResultAllUser(handleMatchResult);
        socketService.userBalance.sessionNoResult(getUserProfile);
        socketService.userBalance.matchResultUnDeclared(handleMatchResult);
        socketService.userBalance.unDeclaredMatchResultAllUser(
          handleMatchResult
        );
        socketService.userBalance.matchDeleteBet(getUserProfile);
        socketService.userBalance.sessionDeleteBet(getUserProfile);
      };
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (id) {
          dispatch(selectedBetAction(null));
          dispatch(matchDetailAction(id));
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

  return isMobile ? <MobileGameDetail /> : <DesktopGameDetail />;
};

export default GameDetails;
