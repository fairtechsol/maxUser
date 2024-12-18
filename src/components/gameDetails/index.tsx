import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  expertSocket,
  expertSocketService,
  matchSocket,
  socket,
  socketService,
} from "../../socketManager";
import {
  // getMatchList,
  matchDetailAction,
  matchDetailReset,
  resetMarketId,
  selectedBetAction,
  updateMatchDetailFromMatchList,
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
  updatePlacedbetsDeleteReason,
  updateProfitLossOnDeleteSession,
  updateRunAmountOnDeleteBet,
  updateTeamRatesOnDeleteMatch,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
// import { isMobile } from "../../utils/screenDimension";
import DesktopGameDetail from "./desktop";
import MobileGameDetail from "./mobile";
import {
  betPlacedReset,
  getPlacedBets,
  resetRunAmount,
  resetRunAmountModal,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";

const GameDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1199);
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };

    // Add event listener to update isMobile on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
        dispatch(getProfileInMatchDetail());
        if (
          event?.gameType === "cricket" ||
          event?.betType === "quickbookmaker1"
        ) {
          navigate(`/home`);
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
        }, 500);
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
        const findMatchInList = matchList?.filter(
          (item: any) => item?.id === id
        );
        if (findMatchInList) {
          dispatch(updateMatchDetailFromMatchList(findMatchInList));
        }
        dispatch(selectedBetAction(null));
        dispatch(matchDetailAction(id));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    try {
      if (socket) {
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
        socketService.userBalance.updateDeleteReasonOff();
        expertSocketService.match.joinMatchRoom(id, "user");
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
        socketService.userBalance.updateDeleteReason(handleDeleteReasonUpdate);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, id]);

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
        socketService.userBalance.updateDeleteReasonOff();
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
        dispatch(resetMarketId());
        dispatch(matchDetailReset());
        dispatch(betPlacedReset());
      };
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  console.log(socket, matchSocket, expertSocket, "ert");

  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log("running");
      if (document.visibilityState === "visible") {
        if (!socket.connected) {
          socketService.connect();
        }
        if (id) {
          dispatch(selectedBetAction(null));
          // dispatch(matchDetailAction(id));
          dispatch(getPlacedBets(id));
          console.log("inititated");

          setTimeout(() => {
            console.log(socket, matchSocket, expertSocket, "abc");
            expertSocketService.match.joinMatchRoom(id, "user");
            expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
          }, 500);
        }
      } else if (document.visibilityState === "hidden") {
        expertSocketService.match.leaveMatchRoom(id);
        expertSocketService.match.getMatchRatesOff(id);
        socketService.disconnect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket, id]);

  return isMobile ? <MobileGameDetail /> : <DesktopGameDetail />;
};

export default GameDetails;
