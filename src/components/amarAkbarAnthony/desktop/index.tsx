import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { aaarules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import CardBox from "./CardsBox";
import OddEven from "./OddEvenBox";
import TiePairBox from "./TiePairBox";
import Lucky7Result from "./lucky7Card";
// import "./style.scss";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import NewLoader from "../../commonComponent/newLoader";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import "../../commonStyle.scss";

const AmarAkbarAnthonyDesktop = () => {
  const [show, setShow] = useState(false);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );

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
    setVideoFrameId(`${cardUrl}${cardGamesId?.aaa}`);
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <div className="horseRacingTab">
            <div style={{ width: "100%", margin: "5px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    {dragonTigerDetail?.name}
                  </span>
                  <a
                    style={{
                      fontSize: "14px",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setShow(true)}
                  >
                    {" "}
                    RULES
                  </a>
                </div>
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                      dragonTigerDetail?.videoInfo?.mid
                    )}`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "92%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Lucky7Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div style={{ width: "100%", margin: "5px" }}>
                  <TiePairBox
                    lowHigh={dragonTigerDetail?.players}
                    data={dragonTigerDetail}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    margin: "5px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  <OddEven
                    name={"DRAGON"}
                    odds={dragonTigerDetail?.luckOdds}
                    data={dragonTigerDetail}
                    card={false}
                  />

                  <OddEven
                    name={"TIGER"}
                    odds={dragonTigerDetail?.redBlack}
                    card={true}
                    data={dragonTigerDetail}
                  />

                  <OddEven
                    name={"DRAGON"}
                    odds={dragonTigerDetail?.seven}
                    data={dragonTigerDetail}
                    card={false}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    margin: "5px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                  }}
                >
                  <CardBox
                    cardData={dragonTigerDetail?.luckyCards}
                    data={dragonTigerDetail}
                    rate={dragonTigerDetail?.luckyCards?.rate}
                  />
                </div>
                <div style={{ width: "100%", margin: "5px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "B", "C"]}
                    type={cardGamesType.amarAkbarAnthony}
                  />
                </div>
              </div>
            )}

            <RulesModal show={show} setShow={setShow} rule={aaarules} gameType="aaa" type="imageWithContent" />
          </div>
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
    </>
  );
};

export default AmarAkbarAnthonyDesktop;
