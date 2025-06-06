import moment from "moment";
import { useState } from "react";
import { Card, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import CommonTabs from "../../../commonComponent/tabs";
import MyBet from "../../../gameDetails/desktop/myBet";
import PlacedBet from "../../../gameDetails/mobile/placeBet";
import MatchOddCompnentMobile from "../matchOddComponent";
import "./style.scss";

const HorseRaceDetailMobile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );
  const { placedBets } = useSelector((state: RootState) => state.bets);
  const [show, setShow] = useState(true);

  const remainingTime = (time: any) => {
    const endTime = moment(time);
    const currentTime = moment();
    const duration = moment.duration(endTime.diff(currentTime));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    if (hours <= 0 && minutes <= 0) {
      return "";
    } else if (hours <= 0) {
      return `${minutes} Minutes Remaining`;
    } else {
      return `${hours} Hours and ${minutes} Minutes Remaining`;
    }
  };
  const handleClick = (team: any, data: any) => {
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  return (
    <>
      <div>
        <PlacedBet show={show} setShow={setShow} />
        <CommonTabs defaultActive="odds" className="color">
          {[
            {
              id: "odds",
              name: "ODDS",
            },
            {
              id: "matchedBet",
              name: `MATCHED BET(${Array.from(new Set(placedBets))?.length})`,
            },
          ]?.map((item, index) => {
            return (
              <Tab
                key={item?.id}
                eventKey={item?.id}
                tabClassName="m-tab"
                title={<div className="font p-1 px-2">{item?.name}</div>}
              >
                {index == 0 ? (
                  <Row>
                    <Tab.Pane className="show no-padding-margin">
                      <Card>
                        <Card.Body className="car-body">
                          <div className="match-title px-2 py-1">
                            <span className="match-name">
                              {matchDetail?.venue}
                            </span>
                            <span className="float-right">
                              {moment(matchDetail?.startAt).format(
                                "YYYY-MM-DD HH:mm A"
                              )}
                            </span>
                          </div>
                          <div className="horse-banner">
                            <div className="time-detail">
                              <h5 className="mb-0">
                                {matchDetail?.countryCode} &gt;{" "}
                                {matchDetail?.venue}
                              </h5>
                              <div>
                                <span>
                                  {moment(matchDetail?.startAt).format(
                                    "YYYY-MM--DD HH:mm"
                                  )}
                                </span>
                                <span>| {matchDetail?.title}</span>
                                <div className="horse-timer">
                                  {remainingTime(matchDetail?.startAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <MatchOddCompnentMobile handleClick={handleClick} />
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                  </Row>
                ) : (
                  <MyBet />
                )}
              </Tab>
            );
          })}
        </CommonTabs>
      </div>
    </>
  );
};

export default HorseRaceDetailMobile;
