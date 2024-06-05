import { useEffect } from "react";
import isMobile from "../../utils/screenDimension";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getMatchDetailHorseRacing,
  updateMatchRatesForHorseRacing,
  updateTeamRatesForHorseRacing,
  updateTeamRatesForHorseRacingOnDelete,
} from "../../store/actions/horseRacing/horseMatchDetailActions";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import { useNavigate, useParams } from "react-router-dom";
import {
  getButtonValue,
  getProfileInMatchDetail,
  updateBalance,
  updateBalanceOnBetDelete,
} from "../../store/actions/user/userAction";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import HorseRaceDetailMobile from "../../components/horseRacing/mobile/betTable";
import HorseRaceDetailDesktop from "../../components/horseRacing/desktop/betTable";

const DragonTiger20 = () => {
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
        dispatch(updateBalance(event?.jobData));
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
        // dispatch(updateDeleteReasonBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (success && socket) {
        expertSocketService.match.getMatchRatesOff(id);
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        expertSocketService.match.joinMatchRoom(id, "user");
        expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
        socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.userBalance.matchResultDeclared(resultDeclared);
        socketService.userBalance.declaredMatchResultAllUser(resultDeclared);
        socketService.userBalance.matchDeleteBet(handleMatchbetDeleted);
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
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
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

  return isMobile ? <HorseRaceDetailMobile /> : <HorseRaceDetailDesktop />;
};

export default DragonTiger20;
