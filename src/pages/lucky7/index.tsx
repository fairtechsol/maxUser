import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lucky7ComponentList from "../../components/lucky7";
import { socket, socketService } from "../../socketManager";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import {
  dragonTigerReset,
  getDragonTigerDetail,
  getDragonTigerDetailHorseRacing,
  update7CardMatchRates,
  updateBalanceOnBetPlaceCards,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../store/actions/cards/cardDetail";
import { selectedBetAction } from "../../store/actions/match/matchListAction";
import {
  getCasinoButtonValue,
  getProfile,
  getProfileInMatchDetail,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { cardGamesType } from "../../utils/constants";

const Lucky7 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(update7CardMatchRates(event?.data));
      if (event?.data?.t1[0]?.mid === "0") {
        dispatch(selectedBetAction(null));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.lucky7) {
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
        socketService.card.getCardRatesOff(cardGamesType.lucky7);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.lucky7,
          handleLiveGameResultTop10
        );
        socketService.card.cardResult(handleCardResult);
      }
      socketService.card.joinMatchRoom(cardGamesType.lucky7);
      socketService.card.getCardRates(
        cardGamesType.lucky7,
        setMatchRatesInRedux
      );
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      dispatch(getCasinoButtonValue());
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.lucky7));
      dispatch(getDragonTigerDetail(cardGamesType.lucky7));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.lucky7);
        socketService.card.getCardRatesOff(cardGamesType.lucky7);
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
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.lucky7));
      } else if (document.visibilityState === "hidden") {
        dispatch(dragonTigerReset());
        socketService.card.leaveMatchRoom(cardGamesType.lucky7);
        socketService.card.getCardRatesOff(cardGamesType.lucky7);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <Lucky7ComponentList />;
};

export default Lucky7;
