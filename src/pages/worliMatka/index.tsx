import { useEffect } from "react";
import { socket, socketService } from "../../socketManager";
import {
  dragonTigerReset,
  getDragonTigerDetail,
  getDragonTigerDetailHorseRacing,
  updateBalanceOnBetPlaceCards,
  updateLiveGameResultTop10,
  updateProfitLossCards,
  updateWorliMatkaRates,
} from "../../store/actions/cards/cardDetail";
import {
  getButtonValue,
  getProfile,
  getProfileInMatchDetail,
} from "../../store/actions/user/userAction";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import { cardGamesType } from "../../utils/constants";
import { selectedBetAction } from "../../store/actions/match/matchListAction";
import WorliMatkaComponentList from "../../components/worliMatka";

const WorliMatka = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateWorliMatkaRates(event?.data));

      if (event?.data?.t1[0]?.mid === "0") {
        dispatch(selectedBetAction(null));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.worli1) {
      dispatch(updateBetsPlaced(event?.jobData?.newBet));
      dispatch(updateBalanceOnBetPlaceCards(event?.jobData));
      dispatch(updateProfitLossCards(event?.userRedisObj));
    }
  };
  const handleLiveGameResultTop10 = (event: any) => {
    dispatch(updateLiveGameResultTop10(event?.data));
  };
  const handleCardResult = (event: any) => {
    if (event?.matchId === dragonTigerDetail?.id) {
      dispatch(getPlacedBets(dragonTigerDetail?.id));
      dispatch(getProfileInMatchDetail());
    }
  };
  const handleMatchResult = () => {
    dispatch(getProfile());
  };
  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
        socketService.card.getCardRatesOff(cardGamesType.worli1);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.worli1);
        socketService.card.getCardRates(
          cardGamesType.worli1,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.worli1,
          handleLiveGameResultTop10
        );
        socketService.card.cardResult(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      dispatch(getButtonValue());
      dispatch(getDragonTigerDetail(cardGamesType.worli1));
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.worli1));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.worli1);
        socketService.card.getCardRatesOff(cardGamesType.worli1);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        dispatch(selectedBetAction(null));
        dispatch(dragonTigerReset());
        socketService.card.cardResult(handleMatchResult);
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        dispatch(selectedBetAction(null));
        dispatch(getDragonTigerDetail(cardGamesType.worli1));
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.worli1));
      } else if (document.visibilityState === "hidden") {
        dispatch(dragonTigerReset());
        socketService.card.leaveMatchRoom(cardGamesType.worli1);
        socketService.card.getCardRatesOff(cardGamesType.worli1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <WorliMatkaComponentList />;
};

export default WorliMatka;
