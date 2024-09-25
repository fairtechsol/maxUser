import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { card32rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import OddEven from "./OddEvenBox";
import BackLay from "./BackLay";
import "./style.scss";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import PairBox from "./PairBox";
import CardBox from "./cardBox";
import TotalCards from "./totalCards";
import Card32BResult from "./card32B";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import NewLoader from "../../commonComponent/newLoader";

const Card32BDesktop = () => {
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleClose = () => {
    setShowInactivityModal(false);
  };

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

  useEffect(() => {
    const resetTimer = () => {
      setLastActivityTime(Date.now());
    };

    const checkInactivity = () => {
      if (Date.now() - lastActivityTime > 5 * 60 * 1000) {
        setShowInactivityModal(true);
        setVideoFrameId("");
      }
    };

    const activityEvents = ["mousemove", "keydown", "scroll", "click"];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    const intervalId = setInterval(checkInactivity, 1000);

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(intervalId);
    };
  }, [lastActivityTime, showInactivityModal]);

  useEffect(() => {
    setVideoFrameId(`${cardUrl}${cardGamesId?.card32B}`);
  }, []);

  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "100%", margin: "5px" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {dragonTigerDetail?.name}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setShow(true)}
                >
                  {" "}
                  Rules
                </span>
              </div>
              <span className="title-12 mt-1">
                {dragonTigerDetail?.videoInfo
                  ? `Round ID:  ${handleRoundId(
                      dragonTigerDetail?.videoInfo?.mid
                    )}`
                  : ""}
              </span>
            </div>
            <div
              style={{ width: "100%", height: "92%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Card32BResult data={dragonTigerDetail?.videoInfo} />}
                id={videoFrameId}
              />
            </div>
          </div>
          {loading ? (
            <NewLoader />
          ) : (
            <div>
              <div
                className="d-sm-flex flex-row justify-content-around align-items-center"
                style={{ width: "100%", gap: "10px" }}
              >
                <div className="w-50">
                  <BackLay
                    matchOddsData={dragonTigerDetail?.matchOdd}
                    data={dragonTigerDetail}
                  />
                </div>
                <div className="w-50">
                  <OddEven
                    odds={dragonTigerDetail?.oddEven}
                    data={dragonTigerDetail}
                  />
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  margin: "px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <PairBox
                  matchOddsData={dragonTigerDetail?.redBlack}
                  data={dragonTigerDetail}
                />
                <TotalCards
                  odds={dragonTigerDetail?.cardtotal}
                  data={dragonTigerDetail}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  marginLeft: "5px",
                }}
              >
                <CardBox
                  odds={dragonTigerDetail?.singleCard}
                  data={dragonTigerDetail}
                />
              </div>
              <div style={{ width: "100%", margin: "5px 0px 0px 10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["8", "9", "10", "11"]}
                  type={cardGamesType.card32B}
                />
              </div>
            </div>
          )}

          <RulesModal show={show} setShow={setShow} rule={card32rules} />
        </Col>
        <Col className="p-0 pt-1" md={4}>
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
                <DesktopPlacedBet />
              </Col>
              <Col md={12}>
                <DesktopMyBet />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </div>
  );
};

export default Card32BDesktop;
