import { Tab } from "react-bootstrap";
import { GAME_TYPE } from "../../../../utils/enum";
import CommonTabs from "../../../commonComponent/tabs";
import OneVOneGameTable from "../games/1v1GameTable";
import MatchListJson from "../matchList.json";
import "./style.scss";

const DesktopMatchList = ({ data }: any) => {
  return (
    <div className="m-1 p-0 w-100">
      {" "}
      <CommonTabs defaultActive="cricket">
        {MatchListJson()?.map((item) => {
          return (
            <Tab
              key={item?.id}
              eventKey={item?.id}
              tabClassName="match-list-tabs title-14"
              title={item?.name}
            >
              {item?.type === GAME_TYPE.ONE_V_ONE ? (
                <OneVOneGameTable data={data} />
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

export default DesktopMatchList;
