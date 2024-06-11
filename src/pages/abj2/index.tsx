import { useEffect } from "react";
import Abj2ComponentList from "../../components/abj2";
import { socket, socketService } from "../../socketManager";
import { getDragonTigerDetailHorseRacing, updateCardAbjRates, updateCardMatchRates } from "../../store/actions/cards/cardDetail";
import { getButtonValue } from "../../store/actions/user/userAction";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Loader from "../../components/commonComponent/loader";
import { getPlacedBets, updateBetsPlaced } from "../../store/actions/betPlace/betPlaceActions";
import { cardGamesType } from "../../utils/constants";

const Abj2 = () => {

  const dispatch: AppDispatch = useDispatch();
  const {dragonTigerDetail,loading} = useSelector(
    (state: RootState) => state.card
  );
  const setMatchRatesInRedux = (event: any) => {
    try {
      if (cardGamesType.andarBahar2 === event?.data?.data?.data?.t1[0]?.gtype) {
        dispatch(updateCardAbjRates(event?.data?.data?.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      dispatch(getButtonValue());
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.andarBahar2));
      if (dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
      }
    } catch (e) {
      console.error(e);
    }
  }, [dragonTigerDetail?.id]);



  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.andarBahar2) {
      dispatch(updateBetsPlaced(event?.jobData?.newBet));
    }
  };

  
  useEffect(() => {
    try {
      if ( socket && dragonTigerDetail?.id) {
        socketService.card.getCardRatesOff(cardGamesType.andarBahar2);
        socketService.card.userCardBetPlacedOff();
        socketService.card.joinMatchRoom(cardGamesType.andarBahar2);
        socketService.card.getCardRates(cardGamesType.andarBahar2, setMatchRatesInRedux);
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
      }
    } catch (error) {
      console.log(error);
    }
  }, [ socket,dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.andarBahar2);
        socketService.card.getCardRatesOff(cardGamesType.andarBahar2);
        socketService.card.userCardBetPlacedOff();
      };
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> : <Abj2ComponentList/>;
};

export default Abj2;
