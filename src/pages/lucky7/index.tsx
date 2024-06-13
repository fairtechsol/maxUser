import Lucky7ComponentList from "../../components/lucky7";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDragonTigerDetailHorseRacing, update7CardMatchRates, updateLiveGameResultTop10 } from "../../store/actions/cards/cardDetail";
import { useEffect } from "react";
import { getButtonValue, getProfileInMatchDetail } from "../../store/actions/user/userAction";
import { socket, socketService } from "../../socketManager";
import Loader from "../../components/commonComponent/loader";
import { cardGamesType } from "../../utils/constants";
import { getPlacedBets, updateBetsPlaced } from "../../store/actions/betPlace/betPlaceActions";

const Lucky7 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      if (
        cardGamesType.lucky7 === event?.data?.data?.data?.t1[0]?.gtype
      ) {
        dispatch(update7CardMatchRates(event?.data?.data?.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.lucky7) {
      dispatch(updateBetsPlaced(event?.jobData?.newBet));
    }
  };
  const handleLiveGameResultTop10 = (event: any) => {
    dispatch(updateLiveGameResultTop10(event?.data));
  };
  const handleCardResult = (event: any) => {
    if (event?.matchId === dragonTigerDetail?.id) {
      dispatch(getPlacedBets(dragonTigerDetail?.id));
      dispatch(getProfileInMatchDetail())
    }
  };

  useEffect(() => {
    try {
        dispatch(getButtonValue());
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.lucky7));
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
        socketService.card.getCardRatesOff(cardGamesType.lucky7);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.lucky7);
        socketService.card.getCardRates(
          cardGamesType.lucky7,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.lucky7,
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
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.lucky7);
        socketService.card.getCardRatesOff(cardGamesType.lucky7);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
      };
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> : <Lucky7ComponentList/>;
};

export default Lucky7;
