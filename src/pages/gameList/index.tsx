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
import {
  getMatchList,
  getTabList,
  updateMatchRatesFromApiOnList,
} from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import { isMobile } from "../../utils/screenDimension";
import axios from "axios";
import { marketApiConst } from "../../utils/constants";

const GameList = () => {
  const { loading } = useSelector((state: RootState) => state.match.matchList);

  const { type } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const getMatchListMarket = async (matchType: string) => {
    try {
      const resp: any = await axios.get(marketApiConst[matchType], {
        timeout: 2000,
      });
      if (resp?.status) {
        dispatch(updateMatchRatesFromApiOnList(resp?.data));
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
        if (event?.betType === "quickbookmaker1") {
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
      // setTimeout(() => {
      dispatch(getMatchList({ matchType: type }));
      // }, 500);
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
    getMatchListMarket(type);
    const intervalId = setInterval(() => {
      getMatchListMarket(type);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [type]);

  return (
    <>
      {loading && <Loader />}
      {isMobile ? (
        <SportsFilters type={type} />
      ) : (
        <DesktopMatchList matchTypeGameList={type} setMatchType={() => {}} />
      )}
    </>
  );
};

export default GameList;
