

import { useParams } from "react-router-dom";
import Lucky7ComponentList from "../../components/lucky7";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDragonTigerDetailHorseRacing, update7CardMatchRates } from "../../store/actions/cards/cardDetail";
import { useEffect } from "react";
import { getButtonValue } from "../../store/actions/user/userAction";
import { expertSocketService, socket, socketService } from "../../socketManager";
import Loader from "../../components/commonComponent/loader";

const Lucky7 = () => {
  const { id } = useParams();
  const type ="lucky7"
  // const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { success ,dragonTigerDetail,loading} = useSelector(
    (state: RootState) => state.card
  );
// console.error('first',success,dragonTigerDetail)
  const setMatchRatesInRedux = (event: any) => {
    try {
      if (type === event?.data?.data?.data?.t1[0]?.gtype) {
        dispatch(update7CardMatchRates(event?.data?.data?.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      dispatch(getButtonValue());
      dispatch(getDragonTigerDetailHorseRacing(type));
    } catch (e) {
      console.error(e);
    }
  }, [id]);


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


  return loading ? <Loader /> : <Lucky7ComponentList/>;
};

export default Lucky7;
