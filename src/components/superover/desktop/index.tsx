import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { supoerrules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "./style.scss";
import { cardGamesId, cardUrl, rulesData } from "../../../utils/constants";
import Bookmaker from "./bookmaker";
import ScoreBoard from "../../commonComponent/scoreBoard";
import SuperoverResult from "./superOver";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import Iframe from "../../iframe/iframe";

const SuperoverDesktop = () => {
  const [show, setShow] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail, scoreBoardData, loading } = useSelector(
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.superover}`);
  }, []);

  console.log("scorebb",scoreBoardData)
  return (
    <div>
      <Row>
        <Col md={8}>
          <div
            style={{
              width: "100%",
              // height: scoreBoardData?.data ? "400px" : "310px",
              margin: "5px 0px 0px 3px",
            }}
          >
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
                  ? `Round ID:  ${dragonTigerDetail?.videoInfo?.mid}`
                  : ""}
              </span>
            </div>
            {scoreBoardData?.balls?.length>0 && (
              <div style={{ marginBottom: "2px" }}>
                <Iframe data={scoreBoardData} />
              </div>
            )}
            
            <div
              style={{ width: "100%", height: "92%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<SuperoverResult data={dragonTigerDetail?.videoInfo} />}
                id={videoFrameId}
              />
            </div>
          </div>
          {loading ? (
            <LoaderOnRefresh />
          ) : (
            <>
              <div
                className="d-sm-flex flex-row justify-content-around align-items-center"
                style={{ margin: "5px 0px 0px 5px" }}
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
              <div style={{ margin: "5px 0px 0px 6px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["E", "R", "T"]}
                  type={"superover"}
                />
              </div>
            </>
          )}

          <RulesModal show={show} setShow={setShow} rule={supoerrules} />
        </Col>
        <Col md={4}>
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
              className={` ${isSticky ? "position-fixed top-0" : ""}`}
              style={{
                width: isSticky
                  ? placeBetRef.current?.offsetWidth + "px"
                  : "100%",
                  overflowY: "auto", maxHeight: "600px" 
              }}
            >
              <Col md={12}>
                <DesktopPlacedBet />
              </Col>
              <Col md={12} style={{ overflowY: "auto", maxHeight: "500px" }}>
                <DesktopMyBet />
              </Col>
              <Col>
                <div className="sidebar-box place-bet-container super-over-rule mt-2">
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
