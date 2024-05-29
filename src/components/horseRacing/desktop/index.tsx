import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHorseRacingMatchList } from "../../../store/actions/horseRacing/horseMatchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import CommonTabs from "../../commonComponent/tabs";
import "./style.scss";
import { NavLink } from "react-router-dom";

const HorseRacingTabsDesktop = () => {
  const { countryWiseList, racingList } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );
  const [activeTab, setActiveTab] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const handleSelect = (key: any) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (countryWiseList && countryWiseList?.length > 0 && activeTab === "") {
      setActiveTab(countryWiseList[0]?.countryCode);
    }
    if (activeTab !== "") {
      dispatch(getHorseRacingMatchList({ countryCode: activeTab }));
    }
  }, [activeTab, countryWiseList]);

  const RaceDetails = ({ matchName, item }: any) => {
    return item?.map((gameDetail: any) => (
      <div className="coupon-card coupon-card-first p-0" key={gameDetail?.id}>
        <div className="card-content">
          <table className="table coupon-table table-bordered ">
            <tbody>
              <tr>
                <td style={{ width: "30%" }}>
                  <a className="text-dark">{matchName}</a>
                </td>
                <td>
                  <div className="horse-time-detail">
                    {item?.map((race: any) => (
                      <NavLink to={`/race/${race?.id}`} key={race?.id}>
                        <span className="active">{moment(race.startAt).format("HH:mm")}</span>
                      </NavLink>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ));
  };
  return (
    <div className="horseRacingTab">
      <CommonTabs
        callback={handleSelect}
        defaultActive={activeTab}
        id={activeTab}
      >
        {countryWiseList?.map((item: any) => (
          <Tab
            key={item?.countryCode}
            eventKey={item?.countryCode}
            tabClassName="match-tabs title-12"
            title={item?.countryCode}
            style={{padding: "0px"}}
          >
            {Object.entries(racingList)?.map(([matchName, item]: any) => (
              <RaceDetails matchName={matchName} item={item} />
            ))}
          </Tab>
        ))}
      </CommonTabs>
    </div>
  );
};

export default HorseRacingTabsDesktop;
