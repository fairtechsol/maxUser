import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { abjrules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import CardBox from "./CardsBox";
import "./style.scss";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import Abj1Result from "./abj1Card";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import NewLoader from "../../commonComponent/newLoader";

const Abj1Desktop = () => {
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.andarBahar1}`);
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
                      fontSize: "12px",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setShow(true)}
                  >
                    {" "}
                    Rules
                  </a>
                </div>
                <span className="title-12 mt-1">
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${
                        dragonTigerDetail?.videoInfo?.max
                      }`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  // flex: '1 0 auto',
                  width: "100%",
                  // height: "92%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Abj1Result data={dragonTigerDetail?.cardInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
           <NewLoader />
            ) : (
              <div>
                <div
                  style={{
                    width: "100%",
                    margin: "5px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardBox
                    title={"ANDAR"}
                    bgColor={"#ffa07a"}
                    odds={dragonTigerDetail?.ander}
                    data={dragonTigerDetail}
                    cards={dragonTigerDetail?.cardInfo}
                  />
                  <CardBox
                    title={"BAHAR"}
                    bgColor={"#90ee90"}
                    odds={dragonTigerDetail?.bahar}
                    data={dragonTigerDetail}
                    cards={dragonTigerDetail?.cardInfo}
                  />

                  <div className="ticker-container">
                    <div className="ticker-wrap">
                      <div
                        className="ticker-move"
                        style={{
                          color: "#097c93",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        {dragonTigerDetail?.videoInfo?.remark}
                      </div>
                    </div>
                  </div>

                </div>

                <div style={{ width: "100%", margin: "5px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
                    type={cardGamesType.andarBahar1}
                  />
                </div>
              </div>
            )}
            <RulesModal show={show} setShow={setShow} rule={abjrules} type="No Record Found."/>
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

export default Abj1Desktop;
