import { useEffect } from "react";
import HorseRace from "../../components/horseRacing/desktop/betTable";
import HorseRaceTabs from "../../components/horseRacing/mobile/betTable";
import isMobile from "../../utils/screenDimension";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getMatchDetailHorseRacing,
  updateMatchRatesForHorseRacing,
} from "../../store/actions/horseRacing/horseMatchDetailActions";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import { useNavigate, useParams } from "react-router-dom";
import { getButtonValue } from "../../store/actions/user/userAction";
import { getPlacedBets } from "../../store/actions/betPlace/betPlaceActions";

const RaceDetail = () => {
  // const [activeTab, setActiveTab] = useState(raceData[0]?.id || '');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail, success } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );
  useEffect(() => {
    dispatch(getButtonValue());
  }, []);
  useEffect(() => {
    dispatch(getMatchDetailHorseRacing(id));
  }, []);
  useEffect(() => {
    dispatch(getPlacedBets(id));
  }, []);

  
  const setMatchRatesInRedux = (event: any) => {
    try {
      if (id === event?.id) {
        dispatch(updateMatchRatesForHorseRacing(event));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchbetDeleted = (event: any) => {
    try {
      if (id === event?.id) {
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const resultDeclared = (event: any) => {
    try {
      if (id === event?.id) {
        navigate(`/game-list/${event?.gameType}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    try {
      if (success && socket) {
        expertSocketService.match.getMatchRatesOff(id);
        socketService.userBalance.userSessionBetPlacedOff();
        // socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        // socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        // socketService.userBalance.sessionDeleteBetOff();
        // socketService.userBalance.sessionResultOff();
        // socketService.userBalance.sessionNoResultOff();
        // socketService.userBalance.sessionResultUnDeclareOff();
        expertSocketService.match.joinMatchRoom(id, "user");
        expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
        // socketService.userBalance.userSessionBetPlaced(setSessionBetsPlaced);
        // socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.userBalance.matchResultDeclared(resultDeclared);
        // socketService.userBalance.declaredMatchResultAllUser(resultDeclared);
        socketService.userBalance.matchDeleteBet(handleMatchbetDeleted);
        // socketService.userBalance.sessionDeleteBet(handleSessionBetDeleted);
        // socketService.userBalance.sessionResult(handleSessionResultDeclare);
        // socketService.userBalance.sessionNoResult(handleSessionResultDeclare);
        // socketService.userBalance.sessionResultUnDeclare(
        //   handleSessionResultUnDeclare
        // );
      }
    } catch (error) {
      console.log(error);
    }
  }, [success, socket, id]);

  useEffect(() => {
    try {
      return () => {
        expertSocketService.match.leaveMatchRoom(id);
        expertSocketService.match.getMatchRatesOff(id);
        // socketService.userBalance.userSessionBetPlacedOff();
        // socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        // socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        // socketService.userBalance.sessionDeleteBetOff();
        // socketService.userBalance.sessionResultOff();
        // socketService.userBalance.sessionNoResultOff();
        // socketService.userBalance.sessionResultUnDeclareOff();
        // socketService.userBalance.sessionResult(sessionResultDeclared);
        // socketService.userBalance.sessionResultUnDeclare(sessionResultDeclared);
        // socketService.userBalance.matchResultDeclared(handleMatchResult);
        // socketService.userBalance.declaredMatchResultAllUser(handleMatchResult);
        // socketService.userBalance.sessionNoResult(getUserProfile);
        // socketService.userBalance.matchResultUnDeclared(handleMatchResult);
        // socketService.userBalance.unDeclaredMatchResultAllUser(
        //   handleMatchResult
        // );
        // socketService.userBalance.matchDeleteBet(getUserProfile);
        // socketService.userBalance.sessionDeleteBet(getUserProfile);
      };
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  return isMobile ? <HorseRaceTabs /> : <HorseRace data={matchDetail} />;
};

export default RaceDetail;
