

import { useDispatch } from "react-redux";
import Cards32ComponentList from "../../components/cards32";
import Loader from "../../components/commonComponent/loader";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { cardGamesType } from "../../utils/constants";
import {  getPlacedBets, updateBetsPlaced } from "../../store/actions/betPlace/betPlaceActions";
import { useEffect } from "react";
import { getButtonValue } from "../../store/actions/user/userAction";
import { getDragonTigerDetailHorseRacing, updateCard32MatchRates } from "../../store/actions/cards/cardDetail";
import { socket, socketService } from "../../socketManager";

const Cards32 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCard32MatchRates(event?.data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.card32) {
      dispatch(updateBetsPlaced(event?.jobData?.newBet));
    }
  };

  useEffect(() => {
    try {
        dispatch(getButtonValue());
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.card32));
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
        socketService.card.getCardRatesOff(cardGamesType.card32);
        socketService.card.userCardBetPlacedOff();
        socketService.card.joinMatchRoom(cardGamesType.card32);
        socketService.card.getCardRates(
          cardGamesType.card32,
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
        socketService.card.leaveMatchRoom(cardGamesType.card32);
        socketService.card.getCardRatesOff(cardGamesType.card32);
        socketService.card.userCardBetPlacedOff();
      };
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> :<Cards32ComponentList/>;
};

export default Cards32;