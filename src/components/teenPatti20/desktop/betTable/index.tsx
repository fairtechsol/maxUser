import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import PlacedBet from "../../../gameDetails/desktop/placeBet";
import MyBet from "../../../gameDetails/desktop/myBet";
import moment from "moment";
import MatchOddComponent from "../MatchOddComponent";
// import CombinedComponent from "../combinedComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const HorseRaceDetailDesktop = () => {
  const { matchDetail } = useSelector(
    (state: RootState) => state.horseRacing.matchDetail
  );
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
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

    if (hours <= 0 && minutes <= 0) {
      return "";
    } else if (hours <= 0) {
      return `| ${minutes} Minutes Remaining`;
    } else {
      return `| ${hours} Hours and ${minutes} Minutes Remaining`;
    }
  };
  return (
    <>
      <div className="featured-box horse-detail">
        <Row className="row5">
          <Col className="coupon-card featured-box-detail">
            <div className="horse-banner">
              <div className="time-detail px-2">
                <h5 className="mb-0">
                  {matchDetail?.countryCode}
                  {" > "}
                  {matchDetail?.venue}
                </h5>

                <div>
                  <span>
                    {moment(matchDetail?.startAt).format("YYYY-MM-DD HH:mm")}
                  </span>{" "}
                  <span>| {matchDetail?.title}</span>{" "}
                  <span className="horse-timer">
                    {remainingTime(matchDetail?.startAt)}
                  </span>
                </div>
              </div>
              {new Date().getTime() >
                new Date(
                  new Date(matchDetail?.startAt).setMinutes(
                    new Date(matchDetail?.startAt).getMinutes() -
                      parseInt(matchDetail?.betPlaceStartBefore)
                  )
                ).getTime() && (
                <div className="text-success horse-status"> open </div>
              )}
            </div>
            {/* <CombinedComponent /> */}
            <MatchOddComponent data={matchDetail} />
          </Col>

          <Col className="ps-0">
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

export default HorseRaceDetailDesktop;
