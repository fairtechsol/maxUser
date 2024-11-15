import { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { expertSocketService } from "../../../../socketManager";
import { AppDispatch, RootState } from "../../../../store/store";
// import { onTabSwitch } from "../../../../utils/tabSwitch";
import { useDispatch } from "react-redux";
import { useParams,useLocation } from "react-router-dom";
import { updateMatchOddRates } from "../../../../store/actions/match/matchListAction";
import CommonTabs from "../../../commonComponent/tabs";
import OneVOneGameTable from "../games/1v1GameTable";
import MatchListJson from "../matchList.json";
import TrendsFilters from "./../../latestEvents/index";
import "./style.scss";

const DesktopMatchList = ({
  matchTypeGameList,
  setMatchType,
  matchType,
}: any) => {
  const { type } = useParams();
  const location = useLocation();

  const isGameRoute = location.pathname.includes('game-list');
  // const dispatch: AppDispatch = useDispatch();
  const { tabList } = useSelector((state: RootState) => state.match.matchList);
  // const setMatchOddRatesInRedux = (event: any) => {
  //   dispatch(updateMatchOddRates(event));
  // };

  // useEffect(() => {
  //   try {
  //     if (
  //       success &&
  //       matchList.length > 0 &&
  //       ["cricket", "football", "tennis", "politics"].includes(
  //         matchType || type || matchTypeGameList
  //       )
  //     ) {
  //       matchList?.forEach((element: any) => {
  //         expertSocketService.match.joinMatchRoom(element?.id, "user");
  //       });
  //       matchList?.forEach((element: any) => {
  //         expertSocketService.match.getMatchRates(
  //           element?.id,
  //           setMatchOddRatesInReduxj
  //         );
  //       });
  //       return () => {
  //         matchList?.forEach((element: any) => {
  //           expertSocketService.match.leaveMatchRoom(element?.id);
  //           expertSocketService.match.getMatchRatesOff(element?.id);
  //         });
  //       };
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [matchList.length, success, type, matchType, matchTypeGameList]);

  useEffect(() => {
    if (type) {
      setMatchType(type);
    }
  }, [type]);

  return (
    <div className="m-1 p-0 w-100">
      {!isGameRoute && (<><TrendsFilters events={tabList} />
      <CommonTabs
        callback={setMatchType}
        defaultActive={type ?? matchTypeGameList}
        id={type}
      >
        {MatchListJson()
          ?.filter(
            (item) => item?.id == matchTypeGameList || !matchTypeGameList
          )
          ?.map((item) => {
            return (
              <Tab
                key={item?.id}
                eventKey={type ?? item?.id}
                tabClassName="match-list-tabs text-nowrap"
                title={item?.name}
              ></Tab>
            );
          })}
      </CommonTabs></>)}
      <OneVOneGameTable id={type ?? matchType} />
    </div>
  );
};

export default DesktopMatchList;
