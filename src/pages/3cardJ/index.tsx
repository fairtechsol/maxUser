import { useEffect } from "react";
import { socket, socketService } from "../../socketManager";
import {
  getDragonTigerDetailHorseRacing,
  updateBalanceOnBetPlaceCards,
  update3CardJRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
  dragonTigerReset,
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
import CardJComponentList from "../../components/3CardJ";
import InnerLoader from "../../components/commonComponent/customLoader/InnerLoader";

const CardJ = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(update3CardJRates(event?.data));

      if (event?.data?.t1[0]?.mid === "0") {
        dispatch(selectedBetAction(null));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
      }
    } catch (e) {
      console.error(e);
    }
  }, [dragonTigerDetail?.id]);

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.cardj) {
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
        socketService.card.getCardRatesOff(cardGamesType.cardj);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.cardj);
        socketService.card.getCardRates(
          cardGamesType.cardj,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.cardj,
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
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.cardj));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.cardj);
        socketService.card.getCardRatesOff(cardGamesType.cardj);
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
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.cardj));
      } else if (document.visibilityState === "hidden") {
        dispatch(dragonTigerReset());
        socketService.card.leaveMatchRoom(cardGamesType.cardj);
        socketService.card.getCardRatesOff(cardGamesType.cardj);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return loading ? <InnerLoader /> : <CardJComponentList />;
};

export default CardJ;
