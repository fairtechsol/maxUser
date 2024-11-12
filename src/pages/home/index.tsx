import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MatchList from "../../components/home";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import { rulesModalShowFalse } from "../../store/actions/authAction";
import { getHorseRacingCountryWiseList } from "../../store/actions/horseRacing/horseMatchListAction";
import {
  getMatchList,
  getTabList,
  updateMatchRatesFromApiOnList,
} from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import { isMobile } from "../../utils/screenDimension";
import ImageModal from "../../components/commonComponent/loginModal";
import { getBannerImage } from "../../store/actions/user/userAction";
import { marketApiConst } from "../../utils/constants";
import axios from "axios";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { rulesPopShow } = useSelector((state: RootState) => state.auth);
  const { bannerImage } = useSelector((state: RootState) => state.user.profile);
  const [matchType, setMatchType] = useState("cricket");
  const [show, setShow] = useState(false);

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

  const getMatchListServiceSocket = (event: any) => {
    try {
      if (event?.gameType === matchType) {
        if (["cricket", "football", "tennis"].includes(matchType)) {
          dispatch(
            getMatchList({
              matchType: event?.gameType,
            })
          );
        } else if (["horseRacing", "greyHound"].includes(matchType)) {
          dispatch(getHorseRacingCountryWiseList(matchType));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMatchListServiceOnDeclare = (event: any) => {
    try {
      if (event?.gameType === matchType) {
        if (["cricket", "football", "tennis"].includes(matchType)) {
          if (event?.isMatchDeclare) {
            setTimeout(() => {
              dispatch(getMatchList({ matchType: matchType }));
            }, 1000);
          }
        } else if (["horseRacing", "greyHound"].includes(matchType)) {
          setTimeout(() => {
            dispatch(getHorseRacingCountryWiseList(matchType));
          }, 1000);
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
    dispatch(getTabList({}));
    if (
      matchType &&
      ["cricket", "football", "tennis", "politics"].includes(matchType) &&
      ["home", "inPlay", "sports"].includes(location.pathname.split("/")[1])
    ) {
      getMatchListService();
    } else if (
      matchType &&
      ["horseRacing", "greyHound"].includes(matchType) &&
      ["home", "inPlay", "sports"].includes(location.pathname.split("/")[1])
    ) {
      dispatch(getHorseRacingCountryWiseList(matchType));
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
    if (rulesPopShow) {
      dispatch(getBannerImage(isMobile ? "mobile" : "desktop"));
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMatchListMarket(matchType);
    }, 500);

    return () => clearInterval(intervalId);
  }, [matchType]);

  return (
    <div>
      <MatchList setMatchType={setMatchType} matchType={matchType} />
      <ImageModal
        customClass={isMobile ? "" : "modalFull-56 rule-popup"}
        show={show && bannerImage}
        setShow={popUpClose}
      />
    </div>
  );
};

export default Home;
