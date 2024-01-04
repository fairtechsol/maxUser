import { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { expertSocketService } from "../../../../socketManaget";
import { RootState } from "../../../../store/store";
import { GAME_TYPE } from "../../../../utils/enum";
import { onTabSwitch } from "../../../../utils/tabSwitch";
import CommonTabs from "../../../commonComponent/tabs";
import OneVOneGameTable from "../games/1v1GameTable";
import MatchListJson from "../matchList.json";
import "./style.scss";

const DesktopMatchList = ({ type, setMatchType }: any) => {
  const { getMatchList } = useSelector(
    (state: RootState) => state.match.matchList
  );

  useEffect(() => {
    if (getMatchList) {
      getMatchList?.forEach((element: any) => {
        expertSocketService.match.joinMatchRoom(element?.id);
      });
      document.addEventListener("visibilitychange", () => {
        onTabSwitch(getMatchList);
      });
    }

    return () => {
      expertSocketService.match.leaveAllRooms();
      document.removeEventListener("visibilitychange", onTabSwitch);
    };
  }, [getMatchList]);

  return (
    <div className="m-1 p-0 w-100">
      {" "}
      <CommonTabs callback={setMatchType} defaultActive="cricket">
        {MatchListJson()
          ?.filter((item) => item?.id == type || !type)
          ?.map((item) => {
            return (
              <Tab
                key={item?.id}
                eventKey={item?.id}
                tabClassName="match-list-tabs title-14"
                title={item?.name}
              >
                {item?.type === GAME_TYPE.ONE_V_ONE ? <OneVOneGameTable /> : ""}
              </Tab>
            );
          })}
      </CommonTabs>
    </div>
  );
};

export default DesktopMatchList;
