import { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { expertSocketService } from "../../../../socketManager";
import { RootState } from "../../../../store/store";
import { GAME_TYPE } from "../../../../utils/enum";
// import { onTabSwitch } from "../../../../utils/tabSwitch";
import CommonTabs from "../../../commonComponent/tabs";
import OneVOneGameTable from "../games/1v1GameTable";
import MatchListJson from "../matchList.json";
import "./style.scss";

const DesktopMatchList = ({ type, setMatchType }: any) => {
  const { getMatchList } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    if (getMatchList && getProfile?.roleName) {
      getMatchList?.forEach((element: any) => {
        expertSocketService.match.joinMatchRoom(
          element?.id,
          getProfile?.roleName
        );
      });
    }
 
    return () => {
      expertSocketService.match.leaveAllRooms();
      getMatchList?.forEach((element: any) => {
        expertSocketService.match.leaveMatchRoom(element?.id);
      });
    };
  }, [getMatchList, getProfile?.roleName]);

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
