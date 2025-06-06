import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HorseRaceDetailDesktop from "../../components/horseRacing/desktop/betTable";
import HorseRaceDetailMobile from "../../components/horseRacing/mobile/betTable";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import {
  getMatchDetailHorseRacing,
  updateBalanceOnHorseBetPlace,
  updateMatchRatesForHorseRacing,
  updateTeamRatesForHorseRacing,
  updateTeamRatesForHorseRacingOnDelete,
} from "../../store/actions/horseRacing/horseMatchDetailActions";
import {
  getButtonValue,
  getProfileInMatchDetail,
  updateBalanceOnBetDelete,
  updateDeleteReasonBet,
  updatePlacedbetsDeleteReason,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { baseUrls } from "../../utils/constants";
import { isMobile } from "../../utils/screenDimension";

const RaceDetail = () => {
  const intervalRef = useRef<number | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { success } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      if (id === event?.id) {
        dispatch(updateMatchRatesForHorseRacing(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setMatchBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        dispatch(updateBetsPlaced(event?.jobData?.newBet));
        dispatch(updateTeamRatesForHorseRacing(event));
        dispatch(updateBalanceOnHorseBetPlace(event?.jobData));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      dispatch(getButtonValue());
      if (id) {
        dispatch(getMatchDetailHorseRacing(id));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.error(e);
    }
  }, [id]);
  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === id) {
        navigate(`/home`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getUserProfile = () => {
    dispatch(getProfileInMatchDetail());
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
        dispatch(updateTeamRatesForHorseRacingOnDelete(event));
        dispatch(updateDeleteReasonBet(event));
      }
    } catch (e) {
      console.log(e);
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
      if (success && socket) {
        // expertSocketService.match.getMatchRatesOff(id);
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        socketService.userBalance.updateDeleteReasonOff();
        expertSocketService.match.joinMatchRoom(id);
        // expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
        socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.userBalance.matchResultDeclared(resultDeclared);
        socketService.userBalance.declaredMatchResultAllUser(resultDeclared);
        socketService.userBalance.matchDeleteBet(handleMatchbetDeleted);
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
        // expertSocketService.match.getMatchRatesOff(id);
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        socketService.userBalance.updateDeleteReasonOff();
        socketService.userBalance.matchResultDeclared(getUserProfile);
        socketService.userBalance.declaredMatchResultAllUser(getUserProfile);
        socketService.userBalance.matchResultUnDeclared(getUserProfile);
        socketService.userBalance.unDeclaredMatchResultAllUser(getUserProfile);
        socketService.userBalance.matchDeleteBet(getUserProfile);
      };
    } catch (e) {
      console.log(e);
    }
  }, [id]);


  const fetchLiveData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrls.matchSocket}/getUserRateDetails/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${sessionStorage.getItem("jwtExpert")}`,
        // },
      });
      setMatchRatesInRedux(response.data);
    } catch (error) {
      console.error("Error fetching live data:", error);
    }
  }, [id]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      if (!intervalRef.current) {
        fetchLiveData(); // Fetch once immediately
        intervalRef.current = window.setInterval(fetchLiveData, 500) as unknown as number;
      }
    } else if (document.visibilityState === "hidden") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [intervalRef, fetchLiveData]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    handleVisibilityChange();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return isMobile ? <HorseRaceDetailMobile /> : <HorseRaceDetailDesktop />;
};

export default RaceDetail;
