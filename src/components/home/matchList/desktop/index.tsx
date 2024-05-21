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
import { useParams } from "react-router-dom";

const DesktopMatchList = ({ type, setMatchType, matchType }: any) => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { matchList, success } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const setMatchOddRatesInRedux = (event: any) => {
    dispatch(updateMatchOddRates(event));
  };

  useEffect(() => {
    try {
      if (success && matchList.length > 0) {
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
          // expertSocketService.match.leaveAllRooms();
          matchList?.forEach((element: any) => {
            expertSocketService.match.leaveMatchRoom(element?.id);
            expertSocketService.match.getMatchRatesOff(element?.id);
          });
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [matchList.length, success, id, matchType]);

  useEffect(() => {
    try {
    } catch (error) {
      console.log(error);
    }
  }, [id, matchType]);

  useEffect(() => {
    if (id) {
      setMatchType(id);
    }
  }, [id]);

  return (
    <div className="m-1 p-0 w-100">
      {" "}
      <CommonTabs callback={setMatchType} defaultActive={id ?? type} id={id}>
        {MatchListJson()
          ?.filter((item) => item?.id == type || !type)
          ?.map((item) => {
            return (
              <Tab
                key={id ?? item?.id}
                eventKey={id ?? item?.id}
                tabClassName="match-list-tabs title-12"
                title={item?.name}
              >
                {item?.type === GAME_TYPE.ONE_V_ONE ? (
                  <OneVOneGameTable id={id ?? item?.id} />
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
