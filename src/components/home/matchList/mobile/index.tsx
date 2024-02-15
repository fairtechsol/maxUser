import { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { expertSocketService } from "../../../../socketManager";
import { AppDispatch, RootState } from "../../../../store/store";
import { GAME_TYPE } from "../../../../utils/enum";
// import { onTabSwitch } from "../../../../utils/tabSwitch";
import CommonTabs from "../../../commonComponent/tabs";
import OneVOneGameTable from "../games/1v1GameTable";
import MatchListJson from "../matchList.json";
import "./style.scss";
import { updateMatchOddRates } from "../../../../store/actions/match/matchListAction";
import { useDispatch } from "react-redux";

const MobileMatchList = () => {
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
      });
    };
  }, [matchList, getProfile?.roleName]);

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
              {item?.type === GAME_TYPE.ONE_V_ONE ? <OneVOneGameTable /> : ""}
            </Tab>
          );
        })}
      </CommonTabs>
    </div>
  );
};

export default MobileMatchList;
