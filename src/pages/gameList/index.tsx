import { useEffect } from "react";
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
  const dispatch: AppDispatch = useDispatch();

  const getMatchListService = (event: any) => {
    try {
      if (event?.gameType === id) {
        setTimeout(() => {
          dispatch(getMatchList({ matchType: id }));
        }, 500);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getMatchListServiceOnDeclare = (event: any) => {
    try {
      if (event?.gameType === id) {
        if (event?.betType === "quickbookmaker1") {
          setTimeout(() => {
            dispatch(getMatchList({ matchType: id }));
          }, 500);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getMatchList({ matchType: id }));
    }
  }, [id]);

  useEffect(() => {
    try {
      if (socket) {
        expertSocketService.match.matchAdded(getMatchListService);
        socketService.userBalance.matchResultDeclared(
          getMatchListServiceOnDeclare
        );
        socketService.userBalance.matchResultUnDeclared(
          getMatchListServiceOnDeclare
        );
        socketService.userBalance.declaredMatchResultAllUser(
          getMatchListServiceOnDeclare
        );
        socketService.userBalance.unDeclaredMatchResultAllUser(
          getMatchListServiceOnDeclare
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
        <DesktopMatchList type={id} setMatchType={() => {}} />
      )}
    </>
  );
};

export default GameList;
