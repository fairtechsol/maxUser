import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragonTigerOneDayComponentList from "../../components/dragonTigerOneDay";
import { socket, socketService } from "../../socketManager";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import {
  dragonTigerReset,
  getDragonTigerDetail,
  getDragonTigerDetailHorseRacing,
  updateBalanceOnBetPlaceCards,
  updateDragonTigerOneDayRates,
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

const DragonTigerOneDay = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateDragonTigerOneDayRates(event?.data));
      if (event?.data?.t1[0]?.mid === "0") {
        dispatch(selectedBetAction(null));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.dragonTigerOneDay) {
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
        socketService.card.getCardRatesOff(cardGamesType.dragonTigerOneDay);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.getLiveGameResultTop10(
          cardGamesType.dragonTigerOneDay,
          handleLiveGameResultTop10
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.cardResult(handleCardResult);
      }
      socketService.card.joinMatchRoom(cardGamesType.dragonTigerOneDay);
      socketService.card.getCardRates(
        cardGamesType.dragonTigerOneDay,
        setMatchRatesInRedux
      );
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      dispatch(getCasinoButtonValue());
      dispatch(getDragonTigerDetail(cardGamesType.dragonTigerOneDay));
      dispatch(
        getDragonTigerDetailHorseRacing(cardGamesType.dragonTigerOneDay)
      );
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.dragonTigerOneDay);
        socketService.card.getCardRatesOff(cardGamesType.dragonTigerOneDay);
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
        dispatch(getDragonTigerDetail(cardGamesType.dragonTigerOneDay));
        dispatch(
          getDragonTigerDetailHorseRacing(cardGamesType.dragonTigerOneDay)
        );
      } else if (document.visibilityState === "hidden") {
        dispatch(dragonTigerReset());
        socketService.card.leaveMatchRoom(cardGamesType.dragonTigerOneDay);
        socketService.card.getCardRatesOff(cardGamesType.dragonTigerOneDay);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <DragonTigerOneDayComponentList />;
};

export default DragonTigerOneDay;
