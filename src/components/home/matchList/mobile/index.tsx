import { Tab } from "react-bootstrap";
import CommonTabs from "../../../commonComponent/tabs";
import OneVOneGameTable from "../games/1v1GameTable";
import MatchListJson from "../matchList.json";
import "./style.scss";

const MobileMatchList = ({ type, setMatchType, matchType }: any) => {
  return (
    <div className="m-0 p-0 w-100">
      {![
        "/casino-slot",
        "/other",
        "/live-casinom",
        "/virtual",
        "/slot",
        "/fantasy",
      ].includes(location.pathname) && (
        <CommonTabs
          callback={setMatchType}
          customClass="overflow-x-auto overflow-y-hidden no-wrap"
          defaultActive={type}
          fill={true}
          justify={true}
        >
          {MatchListJson()?.map((item) => {
            return (
              <Tab
                key={item?.id}
                eventKey={item?.id}
                tabClassName="m-match-list-tabs"
                title={
                  <div className="title-12 text-uppercase f500 px-2 lh-sm">
                    {item?.img ? (
                      <img
                        src={item?.img}
                        alt={item?.name}
                        className="tab-img"
                      />
                    ) : (
                      <div className="text-white tab-icon">{item?.icon}</div>
                    )}
                    <span className="navtab-name text-white">{item?.name}</span>
                  </div>
                }
              />
            );
          })}
        </CommonTabs>
      )}
      <OneVOneGameTable id={type || matchType} />
    </div>
  );
};

export default MobileMatchList;
