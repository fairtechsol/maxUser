import { useEffect, useState } from "react";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import "./style.scss";
import { getHorseRacingMatchList } from "../../../store/actions/horseRacing/horseMatchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";

const HorseRacingTabsMobile = () => {
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

  return (
    <Tabs
      id="horse-racing-tabs"
      activeKey={activeTab}
      onSelect={handleSelect}
      className="tabs-nav nav-links"
    >
      {countryWiseList?.map((code: any) => (
        <Tab
          eventKey={code.countryCode}
          title={code.countryCode}
          key={code.countryCode}
        >
          {Object.entries(racingList)?.map(([matchName, item]: any) => (
            <div className="bet-table tab-pane fade horse-table active show">
              <div className="game-listing-container">
                <div className="game-list pt-1 pb-1">
                  <Row className="row5">
                    <Col xs={12}>
                      <p className="mb-0 game-name">
                        <span className="game-icon">
                          <i className="fas fa-tv"></i>
                        </span>
                        <strong>{matchName}</strong>
                      </p>
                    </Col>
                  </Row>
                  <Row className="row5">
                    <Col xs={12}>
                      {item?.map((dates: any) => (
                        <div className="horse-time-detail-m">
                          <a href={dates.link} key={dates?.id}>
                            <span>{moment(dates.startAt).format("hh:mm")}</span>
                          </a>
                        </div>
                      ))}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          ))}
        </Tab>
      ))}
    </Tabs>
  );
};

export default HorseRacingTabsMobile;
