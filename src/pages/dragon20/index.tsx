import { useEffect } from "react";
// import isMobile from "../../utils/screenDimension";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {useParams } from "react-router-dom";
import DragonTigerComponentList from "../../components/dragon20";
import { expertSocketService, socket, socketService } from "../../socketManager";
import { getDragonTigerDetailHorseRacing, updateCardMatchRates } from "../../store/actions/cards/cardDetail";
import Loader from "../../components/commonComponent/loader";
import { getButtonValue } from "../../store/actions/user/userAction";

const DragonTiger20 = () => {
  const { id } = useParams();
  const type ="dt20"
  // const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { success ,dragonTigerDetail,loading} = useSelector(
    (state: RootState) => state.card
  );
// console.error('first',success,dragonTigerDetail)
  const setMatchRatesInRedux = (event: any) => {
    try {
      if (type === event?.data?.data?.data?.t1[0]?.gtype) {
        dispatch(updateCardMatchRates(event?.data?.data?.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const setMatchBetsPlaced = (event: any) => {
  //   try {
  //     if (event?.jobData?.matchId === id) {
  //       dispatch(updateBetsPlaced(event?.jobData?.newBet));
  //       dispatch(updateTeamRatesForHorseRacing(event));
  //       dispatch(updateBalance(event?.jobData));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    try {
      dispatch(getButtonValue());
      dispatch(getDragonTigerDetailHorseRacing(type));
    } catch (e) {
      console.error(e);
    }
  }, [id]);
  // const resultDeclared = (event: any) => {
  //   try {
  //     if (event?.matchId === id) {
  //       navigate(`/home`);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const getUserProfile = () => {
  //   dispatch(getProfileInMatchDetail());
  // };
  // const handleMatchbetDeleted = (event: any) => {
  //   try {
  //     dispatch(
  //       updateBalanceOnBetDelete({
  //         exposure: event?.exposure,
  //         currentBalance: event?.currentBalance,
  //       })
  //     );
  //     if (event?.matchId === id) {
  //       dispatch(updateTeamRatesForHorseRacingOnDelete(event));
  //       // dispatch(updateDeleteReasonBet(event));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    try {
      if ( socket) {
        socketService.card.joinMatchRoom(type);
        socketService.card.getCardRates(type, setMatchRatesInRedux);
        // socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        // socketService.userBalance.matchResultDeclared(resultDeclared);
        // socketService.userBalance.declaredMatchResultAllUser(resultDeclared);
        // socketService.userBalance.matchDeleteBet(handleMatchbetDeleted);
      }
    } catch (error) {
      console.log(error);
    }
  }, [ socket]);

  useEffect(() => {
    try {
      return () => {
        expertSocketService.match.leaveMatchRoom(type);
        expertSocketService.match.getMatchRatesOff(type);
        // socketService.userBalance.userMatchBetPlacedOff();
        // socketService.userBalance.matchResultDeclaredOff();
        // socketService.userBalance.declaredMatchResultAllUserOff();
        // socketService.userBalance.matchDeleteBetOff();
        // socketService.userBalance.matchResultDeclared(getUserProfile);
        // socketService.userBalance.declaredMatchResultAllUser(getUserProfile);
        // socketService.userBalance.matchResultUnDeclared(getUserProfile);
        // socketService.userBalance.unDeclaredMatchResultAllUser(getUserProfile);
        // socketService.userBalance.matchDeleteBet(getUserProfile);
      };
    } catch (e) {
      console.log(e);
    }
  }, [type]);

  return loading ? <Loader /> : <DragonTigerComponentList /> ;
};

export default DragonTiger20;
