import { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { RootState } from "../../../../store/store";
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

  const isGameRoute = location.pathname.includes("game-list");
  const { tabList } = useSelector((state: RootState) => state.match.matchList);

  useEffect(() => {
    if (type) {
      setMatchType(type);
    }
  }, [type]);

  return (
    <div className="m-1 p-0 w-100">
      {!isGameRoute && (
        <>
          <TrendsFilters events={tabList} />
          <CommonTabs
            callback={setMatchType}
            defaultActive={type ?? matchTypeGameList}
            id={type}
            customClass="overflow-x-auto overflow-y-hidden no-wrap"
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
                  />
                );
              })}
          </CommonTabs>
        </>
      )}
      <OneVOneGameTable id={type ?? matchType} />
    </div>
  );
};

export default DesktopMatchList;
