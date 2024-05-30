import { useState } from "react";
import { Tab, Card, Row } from "react-bootstrap";
import "./style.scss";
import HorseModal from "../infoModal";
// import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import moment from "moment";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useDispatch } from "react-redux";
import PlacedBet from "../../../gameDetails/mobile/placeBet";
import CommonTabs from "../../../commonComponent/tabs";
import MyBet from "../../../gameDetails/desktop/myBet";

const HorseRaceDetailMobile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );
  const { placedBets } = useSelector((state: RootState) => state.bets);
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentHorse, setCurrentHorse] = useState({});
  const [_, setModalStyle] = useState({});

  const handleShowModal = (event: any, horse: any) => {
    const rect = event.target.getBoundingClientRect();
    setCurrentHorse(horse);
    setModalStyle({
      position: "absolute",
      top: `${rect.bottom}px`,
      left: `${rect.left}px`,
      transform: "translateY(10px)", // Slight adjustment to position the modal below the click target
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const remainingTime = (time: any) => {
    const endTime = moment(time);
    const currentTime = moment();
    const duration = moment.duration(endTime.diff(currentTime));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    if (hours === 0 && minutes === 0) {
      return "";
    } else if (hours === 0) {
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
                          <div className="match-title">
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
                          <div className="market-title mt-1">
                            MATCH_ODDS
                            <span className="float-right">
                              Max: {matchDetail?.matchOdd?.maxBet}
                            </span>
                          </div>
                          <div className="main-market">
                            <div className="table-header">
                              <div className="float-left country-name box-4 min-max"></div>
                              <div className="back box-1 float-left text-center">
                                <b>Back</b>
                              </div>
                              <div className="lay box-1 float-left text-center">
                                <b>Lay</b>
                              </div>
                            </div>
                            <div className="table-body">
                              {matchDetail?.matchOdd?.runners?.map(
                                (runner: any) => (
                                  <div
                                    data-title="ACTIVE"
                                    className="table-row"
                                    key={runner?.id}
                                  >
                                    <div className="float-left country-name box-4">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id={runner?.id}
                                          name={runner?.runnerName}
                                          className="custom-control-input"
                                          value={runner?.runnerName}
                                        />

                                        <label
                                          htmlFor={runner.id}
                                          className="custom-control-label"
                                        >
                                          <span className="horse-mobile-arrow">
                                            <i
                                              data-toggle="collapse"
                                              data-target={`#detail-${runner.id}`}
                                              className="fas fa-angle-down"
                                              onClick={(event) =>
                                                handleShowModal(event, runner)
                                              }
                                            ></i>
                                          </span>
                                          <div>
                                            {runner?.number}
                                            <br />({runner?.position})
                                          </div>
                                          <div>
                                            <img
                                              src={runner?.image}
                                              alt={runner?.name}
                                            />
                                          </div>
                                          <div>
                                            <span>{runner.runnerName}</span>
                                            <div
                                              className="w-100"
                                              style={{ color: "black" }}
                                            >
                                              {runner.metadata?.AGE}
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                    <div
                                      className="box-1 back  back lock text-center back"
                                      onClick={() => {
                                        const rate = parseFloat(
                                          runner?.ex?.availableToBack[0]?.price
                                        );
                                        if (rate > 0) {
                                          handleClick(
                                            {
                                              betOnTeam: runner?.runnerName,
                                              rate: rate,
                                              type: "back",
                                              stake: 0,
                                              betId: matchDetail?.matchOdd?.id,
                                              eventType: matchDetail?.matchType,
                                              matchId: matchDetail?.id,
                                              matchBetType:
                                                matchDetail?.matchOdd?.type,
                                              bettingName: "Match Odd",
                                              placeIndex: 0,
                                              selectionId: JSON.stringify(
                                                runner?.selectionId
                                              ),
                                              runnerId: runner?.id,
                                            },
                                            matchDetail?.matchOdd
                                          );
                                        }
                                      }}
                                    >
                                      <span className="odd d-block">
                                        {runner?.ex?.availableToBack[0]?.price}
                                      </span>
                                      <span className="d-block">
                                        {runner?.ex?.availableToBack[0]?.size}
                                      </span>
                                    </div>
                                    <div
                                      className="box-1 lay  text-center lay"
                                      onClick={() => {
                                        const rate = parseFloat(
                                          runner?.ex?.availableToLay[0]?.price
                                        );
                                        if (rate > 0) {
                                          handleClick(
                                            {
                                              betOnTeam: runner?.runnerName,
                                              rate: rate,
                                              type: "lay",
                                              stake: 0,
                                              betId: matchDetail?.matchOdd?.id,
                                              eventType: matchDetail?.matchType,
                                              matchId: matchDetail?.id,
                                              matchBetType:
                                                matchDetail?.matchOdd?.type,
                                              bettingName: "Match Odd",
                                              placeIndex: 0,
                                              selectionId: JSON.stringify(
                                                runner?.selectionId
                                              ),
                                              runnerId: runner?.id,
                                            },
                                            matchDetail?.matchOdd
                                          );
                                        }
                                      }}
                                    >
                                      <span className="odd d-block">
                                        {runner?.ex?.availableToLay[0]?.price}
                                      </span>
                                      <span className="d-block">
                                        {" "}
                                        {runner?.ex?.availableToLay[0]?.size}
                                      </span>
                                    </div>
                                    <div
                                      id={`detail-${runner?.id}`}
                                      className="collapse box-10 jockey-detail"
                                    >
                                      <span>
                                        <b>Jockey:</b>{" "}
                                        {runner.metadata?.JOCKEY_NAME}
                                      </span>
                                      <span>
                                        <b>Trainer:</b>{" "}
                                        {runner.metadata?.TRAINER_NAME}
                                      </span>
                                      <span>
                                        <b>Age:</b> {runner.metadata?.AGE}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
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
        <HorseModal
          show={showModal}
          handleClose={handleCloseModal}
          horseData={currentHorse}
        />
      </div>
    </>
  );
};

export default HorseRaceDetailMobile;
