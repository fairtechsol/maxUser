import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragonTigerOneDayComponentList from "../../components/dragonTigerOneDay";
import { socket, socketService } from "../../socketManager";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import {
  getDragonTigerDetailHorseRacing,
  updateBalanceOnBetPlaceCards,
  updateDragonTigerOneDayRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../store/actions/cards/cardDetail";
import { selectedBetAction } from "../../store/actions/match/matchListAction";
import {
  getButtonValue,
  getProfileInMatchDetail,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { cardGamesType } from "../../utils/constants";
import InnerLoader from "../../components/commonComponent/customLoader/InnerLoader";

const DragonTigerOneDay = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateDragonTigerOneDayRates(event?.data?.data?.data));
      if (event?.data?.data?.data?.t1[0]?.mid === "0") {
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

  useEffect(() => {
    try {
      dispatch(getButtonValue());
      dispatch(
        getDragonTigerDetailHorseRacing(cardGamesType.dragonTigerOneDay)
      );
      if (dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
      }
    } catch (e) {
      console.error(e);
    }
  }, [dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        socketService.card.getCardRatesOff(cardGamesType.dragonTigerOneDay);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.dragonTigerOneDay);
        socketService.card.getCardRates(
          cardGamesType.dragonTigerOneDay,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.dragonTigerOneDay,
          handleLiveGameResultTop10
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.cardResult(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        return () => {
          socketService.card.leaveMatchRoom(cardGamesType.dragonTigerOneDay);
          socketService.card.getCardRatesOff(cardGamesType.dragonTigerOneDay);
          socketService.card.userCardBetPlacedOff();
          socketService.card.cardResultOff();
          dispatch(selectedBetAction(null));
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id]);

  return loading ? <InnerLoader /> : <DragonTigerOneDayComponentList />;
};

export default DragonTigerOneDay;
