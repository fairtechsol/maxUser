import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { expertSocketService } from "../../socketManaget";
import {
  matchDetailAction,
  updateMatchRates,
} from "../../store/actions/match/matchListAction";
import { getButtonValue } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import DesktopGameDetail from "./desktop";
import MobileGameDetail from "./mobile";

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

  useEffect(() => {
    if (id && getProfile?.roleName) {
      dispatch(matchDetailAction(id));
      expertSocketService.match.joinMatchRoom(id, getProfile?.roleName);
      expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
    }
    return () => {
      expertSocketService.match.leaveAllRooms();
      expertSocketService.match.leaveMatchRoom(id);
    };
  }, [id, getProfile?.roleName]);

  return isMobile ? <MobileGameDetail /> : <DesktopGameDetail />;
};

export default GameDetails;
