import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { expertSocketService } from "../../../../socketManager";
import { AppDispatch, RootState } from "../../../../store/store";
// import { onTabSwitch } from "../../../../utils/tabSwitch";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
  const dispatch: AppDispatch = useDispatch();
  const { matchList, success } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const eventsData = [
    {
      id: 1,
      iconId: 40,
      eventId: 715926745,
      name: "USA - Presidential Election 2024",
    },
    {
      id: 2,
      iconId: 4,
      eventId: 780263321,
      name: "Caribbean Premier League - Winner",
    },
    { id: 3, iconId: 2, eventId: 505412737, name: "E Ruse v P Badosa" },
    { id: 4, iconId: 2, eventId: 707383007, name: "Svitolina v Gauff" },
    { id: 5, iconId: 1, eventId: 718966835, name: "Venezia v Torino" },
  ];
  const setMatchOddRatesInRedux = (event: any) => {
    dispatch(updateMatchOddRates(event));
  };

  useEffect(() => {
    try {
      if (
        success &&
        matchList.length > 0 &&
        ["cricket", "football", "tennis"].includes(matchType || type)
      ) {
        matchList?.forEach((element: any) => {
          expertSocketService.match.joinMatchRoom(element?.id, "user");
        });
        matchList?.forEach((element: any) => {
          expertSocketService.match.getMatchRates(
            element?.id,
            setMatchOddRatesInRedux
          );
        });
        return () => {
          matchList?.forEach((element: any) => {
            expertSocketService.match.leaveMatchRoom(element?.id);
            expertSocketService.match.getMatchRatesOff(element?.id);
          });
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [matchList.length, success, type, matchType]);

  useEffect(() => {
    if (type) {
      setMatchType(type);
    }
  }, [type]);
  const [activeTab, setActiveTab] = useState(type ?? matchTypeGameList);

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    setMatchType(selectedTab);
  };
  return (
    <div className="m-1 p-0 w-100">
      <TrendsFilters events={eventsData} />{" "}
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
                tabClassName="match-list-tabs title-15 text-nowrap"
                title={item?.name}
              ></Tab>
            );
          })}
      </CommonTabs>
      <OneVOneGameTable id={type ?? matchType} />
    </div>
  );
};

export default DesktopMatchList;
