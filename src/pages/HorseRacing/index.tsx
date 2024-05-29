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
  updateTeamRatesForHorseRacing,
} from "../../store/actions/horseRacing/horseMatchDetailActions";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import { useNavigate, useParams } from "react-router-dom";
import { getButtonValue } from "../../store/actions/user/userAction";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../store/actions/betPlace/betPlaceActions";

const RaceDetail = () => {
  // const [activeTab, setActiveTab] = useState(raceData[0]?.id || '');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail, success } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );
 
  
  const setMatchRatesInRedux = (event: any) => {
    try {
      if (id === event?.id) {
        dispatch(updateMatchRatesForHorseRacing(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setMatchBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        dispatch(updateBetsPlaced(event?.jobData?.newBet));
        dispatch(updateTeamRatesForHorseRacing(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      dispatch(getButtonValue());
      if (id) {
        dispatch(getMatchDetailHorseRacing(id));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  const resultDeclared = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        navigate(`/home`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (success && socket) {
        expertSocketService.match.getMatchRatesOff(id);
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        expertSocketService.match.joinMatchRoom(id, "user");
        expertSocketService.match.getMatchRates(id, setMatchRatesInRedux);
        socketService.userBalance.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.userBalance.matchResultDeclared(resultDeclared);
        socketService.userBalance.declaredMatchResultAllUser(resultDeclared);
        // socketService.userBalance.matchDeleteBet(handleMatchbetDeleted);
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
        socketService.userBalance.userMatchBetPlacedOff();
        socketService.userBalance.matchResultDeclaredOff();
        socketService.userBalance.declaredMatchResultAllUserOff();
        socketService.userBalance.matchDeleteBetOff();
        // socketService.userBalance.matchResultDeclared(handleMatchResult);
        // socketService.userBalance.declaredMatchResultAllUser(handleMatchResult);
        // socketService.userBalance.matchResultUnDeclared(handleMatchResult);
        // socketService.userBalance.unDeclaredMatchResultAllUser(
        //   handleMatchResult
        // );
        // socketService.userBalance.matchDeleteBet(getUserProfile);
      };
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  return isMobile ? <HorseRaceTabs /> : <HorseRace data={matchDetail} />;
};

export default RaceDetail;
