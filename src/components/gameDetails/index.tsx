import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { expertSocketService, socketService } from "../../socketManager";
import {
  matchDetailAction,
  selectedBetAction,
  updateMatchRates,
} from "../../store/actions/match/matchListAction";
import {
  betDataFromSocket,
  getButtonValue,
  updateBalance,
  updateMaxLossForBet,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import DesktopGameDetail from "./desktop";
import MobileGameDetail from "./mobile";
import {
  getPlacedBets,
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
        // dispatch(updateBalance(event));
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
  const betDeleted = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(matchDetailAction(id));
        dispatch(getPlacedBets(id));
        dispatch(updateBalance(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
        navigate("/game-list/cricket");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (id && getProfile?.roleName) {
        dispatch(selectedBetAction(null));
        dispatch(matchDetailAction(id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id, getProfile?.roleName]);

  useEffect(() => {
    if (success) {
      expertSocketService.match.joinMatchRoom(id, getProfile?.roleName);
      expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
      socketService.userBalance.userSessionBetPlaced(setSessionBetsPlaced);
      socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
      socketService.userBalance.matchResultDeclared(resultDeclared);
      socketService.userBalance.matchDeleteBet(betDeleted);
      socketService.userBalance.sessionDeleteBet(betDeleted);
    }
    return () => {
      expertSocketService.match.leaveMatchRoom(id);
      expertSocketService.match.getMatchRatesOff(id, setMatchRatesInRedux);
    };
  }, [success]);

  useEffect(() => {
    try {
      if (id) {
        dispatch(getPlacedBets(id));
      }
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
        expertSocketService.match.getMatchRatesOff(id, setMatchRatesInRedux);
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
