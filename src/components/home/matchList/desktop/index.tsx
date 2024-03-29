import { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { expertSocketService } from "../../../../socketManager";
import { AppDispatch, RootState } from "../../../../store/store";
import { GAME_TYPE } from "../../../../utils/enum";
// import { onTabSwitch } from "../../../../utils/tabSwitch";
import { useDispatch } from "react-redux";
import { updateMatchOddRates } from "../../../../store/actions/match/matchListAction";
import CommonTabs from "../../../commonComponent/tabs";
import OneVOneGameTable from "../games/1v1GameTable";
import MatchListJson from "../matchList.json";
import "./style.scss";

const DesktopMatchList = ({ type, setMatchType }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { matchList } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const setMatchOddRatesInRedux = (event: any) => {
    dispatch(updateMatchOddRates(event));
  };

  useEffect(() => {
    if (matchList && getProfile?.roleName) {
      matchList?.forEach((element: any) => {
        expertSocketService.match.joinMatchRoom(
          element?.id,
          getProfile?.roleName
        );
      });
      matchList?.forEach((element: any) => {
        expertSocketService.match.getMatchRates(
          element?.id,
          setMatchOddRatesInRedux
        );
      });
    }
    return () => {
      expertSocketService.match.leaveAllRooms();
      matchList?.forEach((element: any) => {
        expertSocketService.match.leaveMatchRoom(element?.id);
        expertSocketService.match.getMatchRatesOff(element?.id);
      });
    };
  }, [matchList?.length, getProfile?.roleName]);

  return (
    <div className="m-1 p-0 w-100">
      {" "}
      <CommonTabs callback={setMatchType} defaultActive={type}>
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
                {item?.type === GAME_TYPE.ONE_V_ONE ? (
                  <OneVOneGameTable id={item?.id} />
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
