import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getHorseRacingMatchList } from "../../../store/actions/horseRacing/horseMatchListAction";
import { AppDispatch, RootState } from "../../../store/store";
import "./style.scss";

const HorseRacingListTabsMobile = ({ matchType }: any) => {
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
      dispatch(
        getHorseRacingMatchList({
          countryCode: activeTab,
          matchType: matchType,
        })
      );
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
          className="text-left"
          eventKey={code.countryCode}
          title={code.countryCode}
          key={code.countryCode}
        >
          {Object.entries(racingList)?.map(([matchName, item]: any) => (
            <div
              className="bet-table tab-pane fade horse-table active show"
              key={matchName}
            >
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
                    <Col style={{ display: "flex", flexDirection: "row" }}>
                      {item?.map((dates: any) => (
                        <div className="horse-time-detail-m" key={dates?.id}>
                          <NavLink to={`/race/${dates?.id}`}>
                            <span>{moment(dates.startAt).format("hh:mm")}</span>
                          </NavLink>
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

export default HorseRacingListTabsMobile;
