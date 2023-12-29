import { Tab } from "react-bootstrap";
import { GAME_TYPE } from "../../../../utils/enum";
import CommonTabs from "../../../commonComponent/tabs";
import OneVOneGameTable from "../games/1v1GameTable";
import MatchListJson from "../matchList.json";
import "./style.scss";

const MobileMatchList = () => {
  return (
    <div className="m-0 p-0 w-100">
      {" "}
      <CommonTabs
        customClass="overflow-x-auto overflow-y-hidden no-wrap"
        defaultActive="cricket"
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
                <div className="title-12 text-uppercase f600">
                  <div className="text-white tab-icon">{item?.icon}</div>
                  <span>{item?.name}</span>
                </div>
              }
            >
              {item?.type === GAME_TYPE.ONE_V_ONE ? (
                <OneVOneGameTable/>
              ) : (
                ""
              )}
            </Tab>
          );
        })}
      </CommonTabs>
    </div>
  );
};

export default MobileMatchList;
