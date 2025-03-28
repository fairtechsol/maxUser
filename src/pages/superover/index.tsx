import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuperoverComponentList from "../../components/superover";
import { socket, socketService } from "../../socketManager";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import {
  casinoScoreboardMatchRates,
  dragonTigerReset,
  getDragonTigerDetail,
  getDragonTigerDetailHorseRacing,
  scoreBoardReset,
  updateBalanceOnBetPlaceCards,
  updateCardSuperoverRates,
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

const Superover = () => {
  const dispatch: AppDispatch = useDispatch();
  const [errorCount, setErrorCount] = useState<number>(0);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const getScoreBoard = async (marketId: string) => {
    try {
      dispatch(
        casinoScoreboardMatchRates({
          id: marketId,
          type: cardGamesType.cricketv3,
        })
      );
      setErrorCount(0);
    } catch (e: any) {
      console.log("Error:", e?.message);
      setErrorCount((prevCount: number) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (dragonTigerDetail?.videoInfo?.mid) {
      let intervalTime = 1000;
      if (errorCount >= 5 && errorCount < 10) {
        intervalTime = 60000;
      } else if (errorCount >= 10) {
        intervalTime = 600000;
      }
      const interval = setInterval(() => {
        getScoreBoard(dragonTigerDetail.videoInfo?.mid);
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [dragonTigerDetail?.videoInfo?.mid, errorCount]);

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardSuperoverRates(event?.data));
      if (event?.data?.t1[0]?.mid === "0") {
        dispatch(selectedBetAction(null));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.superover) {
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
        socketService.card.getCardRatesOff(cardGamesType.superover);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.getLiveGameResultTop10(
          cardGamesType.superover,
          handleLiveGameResultTop10
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.cardResult(handleCardResult);
      }
      socketService.card.joinMatchRoom(cardGamesType.superover);
      socketService.card.getCardRates(
        cardGamesType.superover,
        setMatchRatesInRedux
      );
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      dispatch(getCasinoButtonValue());
      dispatch(getDragonTigerDetail(cardGamesType.superover));
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.superover));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.superover);
        socketService.card.getCardRatesOff(cardGamesType.superover);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        dispatch(selectedBetAction(null));
        dispatch(dragonTigerReset());
        dispatch(scoreBoardReset());
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
        dispatch(getDragonTigerDetail(cardGamesType.superover));
        dispatch(getDragonTigerDetailHorseRacing(cardGamesType.superover));
      } else if (document.visibilityState === "hidden") {
        dispatch(dragonTigerReset());
        socketService.card.leaveMatchRoom(cardGamesType.superover);
        socketService.card.getCardRatesOff(cardGamesType.superover);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <SuperoverComponentList />;
};

export default Superover;
