import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DesktopMatchList from "../../components/home/matchList/desktop";
import SportsFilters from "../../components/home/sportsFilters";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import {
  getMatchList,
  getTabList,
  resetMatchListSuccess,
  updateMatchRatesFromApiOnList,
} from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import { marketApiConst } from "../../utils/constants";
import { isMobile } from "../../utils/screenDimension";

const GameList = () => {
  const { matchListSuccess } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const { type } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const getMatchListMarket = async (matchType: string) => {
    try {
      const resp: any = await axios.get(marketApiConst[matchType], {
        timeout: 2000,
      });
      if (resp?.status) {
        dispatch(
          updateMatchRatesFromApiOnList({
            data: resp?.data,
            matchType: matchType,
          })
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getMatchListService = (event: any) => {
    try {
      if (event?.gameType === type) {
        setTimeout(() => {
          dispatch(getMatchList({ matchType: type }));
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getMatchListServiceOnDeclare = (event: any) => {
    try {
      if (event?.gameType === type) {
        if (event?.isMatchDeclare) {
          setTimeout(() => {
            dispatch(getMatchList({ matchType: type }));
          }, 1000);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getTabList({}));
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMatchListMarket(type);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [type]);

  useEffect(() => {
    if (matchListSuccess) {
      getMatchListMarket(type);
      dispatch(resetMatchListSuccess());
    }
  }, [matchListSuccess, type]);

  return (
    <>
      {/* {loading && <Loader />} */}
      {isMobile ? (
        <SportsFilters type={type} />
      ) : (
        <DesktopMatchList matchTypeGameList={type} setMatchType={() => {}} />
      )}
    </>
  );
};

export default GameList;
