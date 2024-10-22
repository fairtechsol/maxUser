import { Tab } from "react-bootstrap";
import CommonTabs from "../../../commonComponent/tabs";
import OneVOneGameTable from "../games/1v1GameTable";
import MatchListJson from "../matchList.json";
import "./style.scss";
import { AppDispatch, RootState } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateMatchOddRates } from "../../../../store/actions/match/matchListAction";
import { useEffect } from "react";
import { expertSocketService } from "../../../../socketManager";

const MobileMatchList = ({ type, setMatchType, matchType }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { matchList, success } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const setMatchOddRatesInRedux = (event: any) => {
    dispatch(updateMatchOddRates(event));
  };

  useEffect(() => {
    try {
      if (
        success &&
        matchList.length > 0 &&
        ["cricket", "football", "tennis", "politics"].includes(
          type || matchType
        )
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

  return (
    <div className="m-0 p-0 w-100">
      {" "}
      {location.pathname !== "/casino-slot" &&
        location.pathname !== "/other" && (
          <CommonTabs
            callback={setMatchType}
            customClass="overflow-x-auto overflow-y-hidden no-wrap"
            defaultActive={type}
            fill={true}
            justify={true}
          >
            {MatchListJson()
              // ?.filter((item) => item?.id == type || !type)
              ?.map((item) => {
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
                          <div className="text-white tab-icon">
                            {item?.icon}
                          </div>
                        )}
                        <span className="navtab-name text-white">
                          {item?.name}
                        </span>
                      </div>
                    }
                  ></Tab>
                );
              })}
          </CommonTabs>
        )}
      <OneVOneGameTable id={type || matchType} />
    </div>
  );
};

export default MobileMatchList;
