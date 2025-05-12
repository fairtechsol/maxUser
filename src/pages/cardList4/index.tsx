import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InnerLoader from "../../components/commonComponent/customLoader/InnerLoader";
import DesktopMatchList from "../../components/home/matchList/desktop";
import SportsFilters from "../../components/home/sportsFilters";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import { isMobile } from "../../utils/screenDimension";

const CardList4 = () => {
  const { loading } = useSelector((state: RootState) => state.match.matchList);

  const { type } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const getMatchListService = (event: any) => {
    try {
      if (event?.gameType === type) {
        setTimeout(() => {
          dispatch(getMatchList({ matchType: type }));
        }, 500);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getMatchListServiceOnDeclare = (event: any) => {
    try {
      if (event?.gameType === type) {
        if (event?.betType === "quickbookmaker1") {
          setTimeout(() => {
            dispatch(getMatchList({ matchType: type }));
          }, 500);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (type) {
      dispatch(getMatchList({ matchType: type }));
    }
  }, [type]);

  useEffect(() => {
    try {
      if (socket) {
        expertSocketService.match.matchAdded(getMatchListService);
        socketService.userBalance.matchResultDeclared(
          getMatchListServiceOnDeclare
        );
        socketService.userBalance.matchResultUnDeclared(getMatchListService);
        socketService.userBalance.declaredMatchResultAllUser(
          getMatchListServiceOnDeclare
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
      {loading && <InnerLoader />}
      {isMobile ? (
        <SportsFilters type={type} />
      ) : (
        <DesktopMatchList matchTypeGameList={type} setMatchType={() => {}} />
      )}
    </>
  );
};

export default CardList4;
