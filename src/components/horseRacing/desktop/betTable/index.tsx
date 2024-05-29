import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import PlacedBet from "../../../gameDetails/desktop/placeBet";
import MyBet from "../../../gameDetails/desktop/myBet";
import moment from "moment";
import { AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const HorseRace = ({ data }: any) => {
  // console.log("data", data);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      if (placeBetRef?.current && placeBetRef?.current?.offsetTop) {
        const sticky = placeBetRef?.current.offsetTop;
        setIsSticky(window.scrollY > sticky);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const remainingTime = (time: any) => {
    const endTime = moment(time);
    const currentTime = moment();
    const duration = moment.duration(endTime.diff(currentTime));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    if (hours <= 0) {
      if (minutes === 0) {
        return "";
      }
      return `${minutes} Minutes Remaining`;
    }

    return `${hours} Hours and ${minutes} Minutes Remaining`;
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
      <div className="featured-box horse-detail">
        <Row className="row5">
          <Col md={8} className="coupon-card featured-box-detail">
            <div className="horse-banner">
              <div className="time-detail">
                <h5 className="mb-0">
                  {data?.countryCode}
                  {" > "}
                  {data?.venue}
                </h5>
                <div>
                  <span>
                    {moment(data?.startAt).format("YYYY-MM-DD HH:mm")}
                  </span>{" "}
                  <span>| {data?.title}</span>{" "}
                  <span className="horse-timer">
                    <span>|</span> {remainingTime(data?.startAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="game-market market-12">
              <div className="market-title mt-1">
                {"MATCH ODDS"}
                <span className="float-right">
                  Max : {data?.matchOdd?.maxBet}
                </span>
              </div>
              <div className="market-header">
                <div className="market-nation-detail"></div>
                <div className="market-odd-box no-border d-none d-md-flex"></div>
                <div className="market-odd-box no-border d-none d-md-flex"></div>
                <div className="market-odd-box back">
                  <b>Back</b>
                </div>
                <div className="market-odd-box lay">
                  <b>Lay</b>
                </div>
                <div className="market-odd-box d-none d-md-flex"></div>
                <div className="market-odd-box no-border d-none d-md-flex"></div>
              </div>
              <div className="market-body">
                {data?.matchOdd?.runners.map((race: any) => (
                  <div className="market-row" key={race.id}>
                    <div className="market-nation-detail">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id={race.id}
                          name={race.id}
                          className="form-check-input"
                        />
                        <label htmlFor={race.id} className="form-check-label">
                          <div>
                            {race?.metadata?.CLOTH_NUMBER}
                            <br />({race?.metadata?.AGE})
                          </div>
                          <div>
                            {/* <img src={race.imageUrl} alt={race.name} /> */}
                          </div>
                          <div>
                            <span className="market-nation-name">
                              {race.sortPriority}. {race.runnerName}
                            </span>
                            <span
                              className="market-book float-right"
                              style={{ color: "black" }}
                            >
                              0
                            </span>
                            <div className="jockey-detail d-none d-md-flex">
                              <span className="jockey-detail-box">
                                <b>Jockey:-</b>{" "}
                                <span>{race?.metadata?.JOCKEY_NAME}</span>
                              </span>
                              <span className="jockey-detail-box">
                                <b>Trainer:-</b>{" "}
                                <span>{race?.metadata?.TRAINER_NAME}</span>
                              </span>
                              <span className="jockey-detail-box">
                                <b>Age:-</b> <span>{race?.metadata?.AGE}</span>
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="market-odd-box back2">
                      <span className="market-odd">
                        {race?.ex?.availableToBack[2]?.price}
                      </span>
                      <span className="market-volume">
                        {race?.ex?.availableToBack[2]?.size}
                      </span>
                    </div>
                    <div className="market-odd-box back1">
                      <span className="market-odd">
                        {race?.ex?.availableToBack[1]?.price}
                      </span>
                      <span className="market-volume">
                        {race?.ex?.availableToBack[1]?.size}
                      </span>
                    </div>
                    <div
                      className="market-odd-box back"
                      onClick={() => {
                        const rate = parseFloat(
                          race?.ex?.availableToBack[0]?.price
                        );
                        if(rate>0){
                          handleClick(
                            {
                              betOnTeam: race.runnerName,
                              rate: rate,
                              type: "back",
                              stake: 0,
                              betId: data?.matchOdd?.id,
                              eventType: data?.matchType,
                              matchId: data?.id,
                              matchBetType: data?.matchOdd?.type,
                              bettingName: "Match Odd",
                              placeIndex: 0,
                              selectionId:JSON.stringify(race?.selectionId),
                              runnerId:race?.id,
                            },
                            data?.matchOdd
                          );
                        }
                      }}
                    >
                      <span className="market-odd">
                        {race?.ex?.availableToBack[0]?.price}
                      </span>
                      <span className="market-volume">
                        {race?.ex?.availableToBack[0]?.size}
                      </span>
                    </div>
                    <div
                      className="market-odd-box lay"
                      onClick={() => {
                        const rate = parseFloat(
                          race?.ex?.availableToLay[0]?.price
                        );
                        if(rate > 0){
                          handleClick(
                            {
                              betOnTeam: race.runnerName,
                              rate: rate,
                              type: "lay",
                              stake: 0,
                              betId: data?.matchOdd?.id,
                              eventType: data?.matchType,
                              matchId: data?.id,
                              matchBetType: data?.matchOdd?.type,
                              bettingName: "Match Odd",
                              placeIndex: 0,
                              selectionId:JSON.stringify(race?.selectionId),
                              runnerId:race?.id,
                            },
                            data?.matchOdd
                          );
                        }
                        
                      }}
                    >
                      <span className="market-odd">
                        {race?.ex?.availableToLay[0]?.price}
                      </span>
                      <span className="market-volume">
                        {race?.ex?.availableToLay[0]?.size}
                      </span>
                    </div>
                    <div className="market-odd-box lay1">
                      <span className="market-odd">
                        {race?.ex?.availableToLay[1]?.price}
                      </span>
                      <span className="market-volume">
                        {race?.ex?.availableToLay[1]?.size}
                      </span>
                    </div>
                    <div className="market-odd-box lay2">
                      <span className="market-odd">
                        {race?.ex?.availableToLay[2]?.price}
                      </span>
                      <span className="market-volume">
                        {race?.ex?.availableToLay[2]?.size}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col md={3} className="ps-0">
            <Container className="p-0" fluid ref={placeBetRef}>
              <Row
                className={` ${isSticky ? "position-fixed top-0" : ""}`}
                style={{
                  width: isSticky
                    ? placeBetRef.current?.offsetWidth + "px"
                    : "100%",
                }}
              >
                <Col md={12}>
                  <PlacedBet />
                </Col>
                <Col md={12}>
                  <MyBet />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HorseRace;
