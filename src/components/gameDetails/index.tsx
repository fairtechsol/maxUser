import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { expertSocketService, socketService } from "../../socketManager";
import {
  matchDetailAction,
  updateMatchRates,
} from "../../store/actions/match/matchListAction";
import {
  getButtonValue,
  updateBalance,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import DesktopGameDetail from "./desktop";
import MobileGameDetail from "./mobile";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";

const GameDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getButtonValue());
  }, [dispatch]);

  const setMatchRatesInRedux = (event: any) => {
    dispatch(updateMatchRates(event));
  };

  const setBetsPlaced = (event: any) => {
    if (event?.betPlaced?.placedBet?.matchId === id) {
      dispatch(updateBetsPlaced(event?.betPlaced?.placedBet));
      dispatch(updateBalance(event));
    }
  };

  useEffect(() => {
    if (id && getProfile?.roleName) {
      dispatch(matchDetailAction(id));
      expertSocketService.match.joinMatchRoom(id, getProfile?.roleName);
      expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
      socketService.userBalance.userSessionBetPlaced(setBetsPlaced);
    }
    return () => {
      expertSocketService.match.leaveAllRooms();
      expertSocketService.match.leaveMatchRoom(id);
    };
  }, [id, getProfile?.roleName]);

  useEffect(() => {
    dispatch(getPlacedBets(id));
  }, []);

  return isMobile ? <MobileGameDetail /> : <DesktopGameDetail />;
};

export default GameDetails;
