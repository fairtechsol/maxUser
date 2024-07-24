import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { card32rules, p6rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import DynamicTable from "./betTable";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import Poker20Result from "./poker20";
import InnerLoader from "../../commonComponent/customLoader/InnerLoader";

const Poker20Desktop = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId?.poker20}`
  );
  const { dragonTigerDetail,loading } = useSelector((state: RootState) => state.card);

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
// console.log('first',dragonTigerDetail)
  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ height: "400px", margin: "5px" }}>
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
                    )}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${
                      dragonTigerDetail?.videoInfo?.max
                    }`
                  : ""}
              </span>
            </div>
            <div
              style={{ width: "100%", height: "90%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Poker20Result data={dragonTigerDetail?.videoInfo} />}
                id={videoFrameId}
              />
            </div>
            {/* <Row md={4}> */}

            {/* </Row> */}
          </div>
          {loading ? <InnerLoader /> :<div style={{ height: "350px" }}>
            <div className="d-flex px-2 mt-5">
              <DynamicTable
                odds={dragonTigerDetail?.odds}
                data={dragonTigerDetail}
                playerNum={[0, 10]}
              />
              <div style={{ width: "10px" }}></div>
              <DynamicTable
                odds={dragonTigerDetail?.odds}
                data={dragonTigerDetail}
                playerNum={[10, 18]}
              />
            </div>
            <div className="mt-2">
              <CardResultBox
                data={dragonTigerDetail}
                name={["A", "B", "T"]}
                type={ cardGamesType.poker20}
              />
            </div>
          </div>}

          <RulesModal show={show} setShow={setShow} rule={p6rules} />
        </Col>
        <Col md={4}>
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
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default Poker20Desktop;
