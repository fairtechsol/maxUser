import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { socket, socketService } from "../../socketManager";
import {
  getDragonTigerDetailHorseRacing,
  updateTeenPattiMatchRates,
} from "../../store/actions/cards/cardDetail";
import Loader from "../../components/commonComponent/loader";
import { getButtonValue } from "../../store/actions/user/userAction";
import { cardGamesType } from "../../utils/constants";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";


import TeentPattiComponentList from "../../components/teenPatti20";

const TeenPatti20 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      
        dispatch(updateTeenPattiMatchRates(event?.data?.data?.data));
     
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.teen20) {
      dispatch(updateBetsPlaced(event?.jobData?.newBet));
    }
  };

  useEffect(() => {
    try {
        dispatch(getButtonValue());
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.teen20));
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
        socketService.card.getCardRatesOff(cardGamesType.teen20);
        socketService.card.userCardBetPlacedOff();
        socketService.card.joinMatchRoom(cardGamesType.teen20);
        socketService.card.getCardRates(
          cardGamesType.teen20,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.teen20);
        socketService.card.getCardRatesOff(cardGamesType.teen20);
        socketService.card.userCardBetPlacedOff();
      };
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> : <TeentPattiComponentList/>;
};

export default TeenPatti20;
