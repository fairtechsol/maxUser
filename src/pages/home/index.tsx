import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MatchList from "../../components/home";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import {
  getMatchList,
  updateMatchOddRates,
} from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import CustomModal from "../../components/commonComponent/modal";
import Desktop from "../../components/rules/desktop";
import { rulesModalShowFalse } from "../../store/actions/authAction";
import isMobile from "../../utils/screenDimension";
import { getHorseRacingCountryWiseList } from "../../store/actions/horseRacing/horseMatchListAction";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { rulesPopShow } = useSelector((state: RootState) => state.auth);
  const [matchType, setMatchType] = useState("cricket");
  const [show, setShow] = useState(false);
  const { matchList, success } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const setMatchOddRatesInRedux = (event: any) => {
    dispatch(updateMatchOddRates(event));
  };

  const getMatchListService = () => {
    try {
      dispatch(
        getMatchList({
          matchType: matchType,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  const getMatchListServiceSocket = (event: any) => {
    try {
      if (event?.gameType === matchType) {
        dispatch(
          getMatchList({
            matchType: event?.gameType,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMatchListServiceOnDeclare = (event: any) => {
    try {
      if (event?.gameType === matchType) {
        if (event?.betType === "quickbookmaker1") {
          setTimeout(() => {
            dispatch(getMatchList({ matchType: matchType }));
          }, 500);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    try {
      if (socket) {
        expertSocketService.match.matchAdded(getMatchListServiceSocket);
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
  }, [socket, matchType]);

  useEffect(() => {
    if (
      matchType &&
      ["cricket", "football", "tennis"].includes(matchType) &&
      ["home", "inPlay", "sports"].includes(location.pathname.split("/")[1])
    ) {
      getMatchListService();
    } else if (
      matchType &&
      ["horseRacing", "greyhoundracing"].includes(matchType) &&
      ["home", "inPlay", "sports"].includes(location.pathname.split("/")[1])
    ) {
      dispatch(getHorseRacingCountryWiseList());
    }
  }, [matchType, location.pathname.split("/")[1]]);

  useEffect(() => {
    rulesPopShow ? setShow(true) : setShow(false);
  }, []);

  const popUpClose = () => {
    setShow(false);
    dispatch(rulesModalShowFalse());
  };

  useEffect(() => {
    if (success && matchList.length > 0 && isMobile) {
      matchList?.forEach((element: any) => {
        expertSocketService.match.joinMatchRoom(element?.id, "user");
      });
      matchList?.forEach((element: any) => {
        expertSocketService.match.getMatchRates(
          element?.id,
          setMatchOddRatesInRedux
        );
      });
    }

    return () => {
      // expertSocketService.match.leaveAllRooms();
      matchList?.forEach((element: any) => {
        expertSocketService.match.leaveMatchRoom(element?.id);
      });
      matchList?.forEach((element: any) => {
        expertSocketService.match.getMatchRatesOff(element?.id);
      });
    };
  }, [matchList.length, success, matchType]);

  return (
    <div>
      <MatchList setMatchType={setMatchType} matchType={matchType} />
      <CustomModal
        customClass="modalFull-90 rule-popup"
        show={show}
        setShow={popUpClose}
        title={"Rules"}
      >
        <Desktop />
      </CustomModal>
    </div>
  );
};

export default Home;
