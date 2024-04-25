import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/commonComponent/loader";
import DesktopMatchList from "../../components/home/matchList/desktop";
import SportsFilters from "../../components/home/sportsFilters";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";

const GameList = () => {
  const { loading } = useSelector((state: RootState) => state.match.matchList);

  const { id } = useParams();
  const [_, setMatchType] = useState("");

  const getMatchListService = () => {
    try {
      dispatch(getMatchList({ matchType: id }));
    } catch (e) {
      console.log(e);
    }
  };

  const dispatch: AppDispatch = useDispatch();
  useEffect(getMatchListService, [id]);

  useEffect(() => {
    try {
      if (socket) {
        expertSocketService.match.matchAdded(getMatchListService);
        socketService.userBalance.matchResultDeclared(getMatchListService);
        socketService.userBalance.matchResultUnDeclared(getMatchListService);
        socketService.userBalance.declaredMatchResultAllUser(
          getMatchListService
        );
        socketService.userBalance.unDeclaredMatchResultAllUser(
          getMatchListService
        );
        return () => {
          expertSocketService.match.matchAddedOff();
          socketService.userBalance.matchResultDeclaredOff();
          socketService.userBalance.matchResultUnDeclaredOff();
          socketService.userBalance.declaredMatchResultAllUserOff();
          socketService.userBalance.unDeclaredMatchResultAllUserOff();
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [socket]);

  return (
    <>
      {loading && <Loader />}
      {isMobile ? (
        <SportsFilters type={id} />
      ) : (
        <DesktopMatchList type={id} setMatchType={setMatchType} />
      )}
    </>
  );
};

export default GameList;
