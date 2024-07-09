import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  ball0,
  ball1,
  ball2,
  ball3,
  ball4,
  ball6,
  ballW,
  card32rules,
  img10,
  img2,
  img3,
  img4,
  img6,
  imgA,
  imgK,
} from "../../../assets/images";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Dragon20Result from "./dragonCard";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import { cardGamesId, cardUrl, rulesData } from "../../../utils/constants";
import Bookmaker from "./bookmaker";
import ScoreBoard from "../../commonComponent/scoreBoard";

const SuperoverDesktop = () => {
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.superover}`
  );
  const { dragonTigerDetail, scoreBoardData } = useSelector(
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

  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "100%", height: "400px", margin: "5px" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {dragonTigerDetail?.name}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setShow(true)}
                >
                  {" "}
                  RULES
                </span>
              </div>
              <span>
                {dragonTigerDetail?.videoInfo
                  ? `Round ID:  ${handleRoundId(
                      dragonTigerDetail?.videoInfo?.mid
                    )}`
                  : ""}
              </span>
            </div>
            <div>
              {scoreBoardData?.data && (
                <ScoreBoard data={scoreBoardData?.data} />
              )}
            </div>
            <div
              style={{ width: "100%", height: "92%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Dragon20Result data={dragonTigerDetail?.videoInfo} />}
                id={videoFrameId}
              />
            </div>
          </div>
          <div style={{ height: "760px", marginLeft: "5px" }}>
            <div
              className="d-sm-flex flex-row justify-content-around align-items-center"
              style={{ width: "100%", marginTop: "7rem", gap: "10px" }}
            >
              <div className="w-100">
                <Bookmaker
                  title={"Bookmaker"}
                  min={dragonTigerDetail?.videoInfo?.min}
                  max={dragonTigerDetail?.videoInfo?.max}
                  matchOddsData={dragonTigerDetail?.bookmaker}
                  data={dragonTigerDetail}
                />
              </div>
            </div>

            <div style={{ width: "100%", margin: "5px" }}>
              <CardResultBox
                data={dragonTigerDetail}
                name={["8", "9", "10", "11"]}
                type={"card32eu"}
              />
            </div>
          </div>

          <RulesModal show={show} setShow={setShow} rule={card32rules} />
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
              <Col>
                <div className="sidebar-box place-bet-container super-over-rule">
                  <div className="marketHeader">
                    ENGLAND vs RSA Inning's Card Rules
                  </div>
                  <div className="table-responsive">
                    <Table className="table-over">
                      <thead>
                        <tr>
                          <th>Cards</th>
                          <th className="text-center">Count</th>
                          <th className="text-end">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rulesData?.map((rule, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={rule.cardImage}
                                alt="Card"
                                className="ms-2"
                              />
                              <span className="ms-2">X</span>
                            </td>
                            <td className="text-center">{rule.count}</td>
                            <td className="text-end">
                              {rule.valueText ? (
                                <span>
                                  {rule.valueText}
                                  <img src={rule.valueImage} alt="Value" />
                                </span>
                              ) : (
                                <img src={rule.valueImage} alt="Value" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </div>
  );
};

export default SuperoverDesktop;
