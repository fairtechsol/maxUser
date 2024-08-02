import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket, socketService } from "../../socketManager";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";
import {
  casinoScoreboardMatchRates,
  dragonTigerReset,
  getDragonTigerDetailHorseRacing,
  scoreBoardReset,
  updateBalanceOnBetPlaceCards,
  updateCardSuperoverRates,
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
import SuperoverComponentList from "../../components/superover";

const Superover = () => {
  const dispatch: AppDispatch = useDispatch();
  const [errorCount, setErrorCount] = useState<number>(0);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  // useEffect(() => {
  //   const scoreBoard = () => {
  //     if (dragonTigerDetail?.videoInfo?.mid) {
  //       const Id = dragonTigerDetail.videoInfo?.mid.split(".");
  //       dispatch(
  //         casinoScoreboardMatchRates({
  //           id: Id[1],
  //           type: cardGamesType.superover,
  //         })
  //       );
  //     }
  //   };
  //   const intervalId = setInterval(scoreBoard, 1000);

  //   return () => clearInterval(intervalId);
  // }, [dispatch, dragonTigerDetail]);

  const getScoreBoard = async (marketId: string) => {
    try {
      dispatch(
        casinoScoreboardMatchRates({
          id: marketId,
          type: cardGamesType.superover,
        })
      );
      // const response: any = await service.get(
      //   `https://casinoserviceapi.fairgame.club/api/tunnel/casino/sport-score/${marketId}?gameName=${cardGamesType.cricketv3}`
      //   // `https://scoreboard.fairgame7.com/score/getMatchScore/${marketId}`
      // );
      setErrorCount(0);
      // if (response) {
      //   setLiveScoreBoardData(response);
      // }
    } catch (e: any) {
      console.log("Error:", e?.message);
      setErrorCount((prevCount: number) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (dragonTigerDetail?.videoInfo?.mid) {
      const Id = dragonTigerDetail.videoInfo?.mid.split(".");
      let intervalTime = 1000;
      if (errorCount >= 5 && errorCount < 10) {
        intervalTime = 60000;
      } else if (errorCount >= 10) {
        intervalTime = 600000;
      }
      const interval = setInterval(() => {
        getScoreBoard(Id[1]);
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [dragonTigerDetail?.videoInfo?.mid, errorCount]);

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardSuperoverRates(event?.data?.data?.data));
      if (event?.data?.data?.data?.t1[0]?.mid === "0") {
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

  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
        socketService.card.getCardRatesOff(cardGamesType.superover);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.superover);
        socketService.card.getCardRates(
          cardGamesType.superover,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.superover,
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
      dispatch(getButtonValue());
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.superover));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.superover);
        socketService.card.getCardRatesOff(cardGamesType.superover);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        dispatch(selectedBetAction(null));
        dispatch(dragonTigerReset());
        dispatch(scoreBoardReset());
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        dispatch(selectedBetAction(null));
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
