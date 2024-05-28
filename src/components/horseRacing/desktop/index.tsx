import { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { getHorseRacingMatchList } from "../../../store/actions/horseRacing/horseMatchListAction";
import moment from "moment";

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
      <div className="coupon-card coupon-card-first" key={gameDetail?.id}>
        <div className="card-content">
          <table className="table coupon-table table-bordered">
            <tbody>
              <tr>
                <td style={{ width: "30%" }}>
                  <a className="text-dark">{matchName}</a>
                </td>
                <td>
                  <div className="horse-time-detail">
                    {item?.map((race: any) => (
                      <a href={race.link} key={race?.id}>
                        <span>{moment(race.startAt).format("hh:mm")}</span>
                      </a>
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
    <>
      <Tab.Container defaultActiveKey={countryWiseList[0]?.countryCode}>
        <Nav variant="tabs" className="navi-tabs mt-2">
          {countryWiseList?.map((item: any) => (
            <Nav.Item key={item?.countryCode} className="navi-item">
              <Nav.Link eventKey={item?.countryCode} className="navi-link">
                {item?.countryCode}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {Object.entries(racingList)?.map(([matchName, item]: any) => {
            console.log(matchName, item);
            return (
              <Tab.Pane
                eventKey={item[0]?.countryCode}
                key={item?.id}
                onSelect={handleSelect}
              >
                <RaceDetails matchName={matchName} item={item} />
              </Tab.Pane>
            );
          })}
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default HorseRacingTabsDesktop;
