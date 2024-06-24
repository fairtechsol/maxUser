import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { socket, socketService } from "../../socketManager";
import {
  getDragonTigerDetailHorseRacing,
  updateBalanceOnBetPlaceCards,
  updateCardMatchRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../store/actions/cards/cardDetail";
import Loader from "../../components/commonComponent/loader";
import {
  getButtonValue,
  getProfileInMatchDetail,
} from "../../store/actions/user/userAction";
import { cardGamesType } from "../../utils/constants";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import { selectedBetAction } from "../../store/actions/match/matchListAction";
import DragonTigerSecondComponentList from "../../components/dragonSecond20";

const DragonTiger202 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardMatchRates(event?.data?.data?.data));
      if (event?.data?.data?.data?.t1[0]?.mid === "0") {
        dispatch(selectedBetAction(null));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.dragonTiger202) {
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
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.dragonTiger202));
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
        socketService.card.getCardRatesOff(cardGamesType.dragonTiger202);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.dragonTiger202);
        socketService.card.getCardRates(
          cardGamesType.dragonTiger202,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.dragonTiger202,
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
          socketService.card.leaveMatchRoom(cardGamesType.dragonTiger202);
          socketService.card.getCardRatesOff(cardGamesType.dragonTiger202);
          socketService.card.userCardBetPlacedOff();
          socketService.card.cardResultOff();
          dispatch(selectedBetAction(null));
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> : <DragonTigerSecondComponentList />;
};

export default DragonTiger202;
