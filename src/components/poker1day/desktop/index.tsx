import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { p6rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "./style.scss";
import DynamicTable from "./betTable";
import Poker1DayResult from "./poker1DayCard";
import PairBox from "./pairBox";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";
import NewLoader from "../../commonComponent/newLoader";

const Poker1DayDesktop = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [show, setShow] = useState(false);
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

  const bonus1 = [
    { label: "Pair (2-10)", value: "1 To 3" },
    { label: "A/Q or A/J Off Suited", value: "1 TO 5" },
    { label: "Pair (JQK)", value: "1 TO 10" },
    { label: "A/K Off Suited", value: "1 TO 15" },
    { label: "A/Q or A/J Suited", value: "1 TO 20" },
    { label: "A/K Suited", value: "1 TO 25" },
    { label: "A/A", value: "1 TO 30" },
  ];

  const bonus2 = [
    { label: "Three of a Kind", value: "1 To 3" },
    { label: "Straight", value: "1 TO 4" },
    { label: "Flush", value: "1 TO 6" },
    { label: "Full House", value: "1 TO 8" },
    { label: "Four of a Kind", value: "1 TO 30" },
    { label: "Straight Flush", value: "1 TO 50" },
    { label: "Royal Flush", value: "1 TO 100" },
  ];

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
    setVideoFrameId(`${cardUrl}${cardGamesId?.poker1Day}`);
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div style={{ marginBottom: ".30px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    Poker 1 Day
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
                      )}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${
                        dragonTigerDetail?.videoInfo?.max
                      }`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "90%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={
                    <Poker1DayResult data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>
            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div className="poker-table-container mt-1">
                  <div className="d-flex column gap-4">
                    <div style={{ width: "50%" }}>
                      <DynamicTable
                        odds={dragonTigerDetail?.oddsData}
                        data={dragonTigerDetail}
                        playerNum={dragonTigerDetail?.oddsData?.[0]}
                      />
                    </div>
                    <div style={{ width: "50%" }}>
                      <DynamicTable
                        odds={dragonTigerDetail?.oddsData}
                        data={dragonTigerDetail}
                        playerNum={dragonTigerDetail?.oddsData?.[1]}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2" style={{ width: "100%" }}>
                  <PairBox
                    odds={dragonTigerDetail?.playersBonusPair}
                    data={dragonTigerDetail}
                  />
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["A", "B", "T"]}
                    type={cardGamesType.poker1Day}
                  />
                </div>
              </div>
            )}
          </div>
        </Col>
        <Col md={4} className="p-0">
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
              className={` ${isSticky ? "position-fixed top-0" : ""}`}
              style={{
                width: isSticky
                  ? placeBetRef.current?.offsetWidth + "px"
                  : "100%",
                height: "565px",
                overflowY: "scroll",
              }}
            >
              <Col className="p-1 pt-0" md={12}>
                <DesktopPlacedBet />
              </Col>
              <Col className="p-1 pt-0" md={12}>
                <DesktopMyBet />
              </Col>
              <Col
                xs={12}
                className="no-scrollbar p-1 pt-0"
                style={{ height: "493px", overflow: "scroll" }}
              >
                <div
                  className="casino-title mt-"
                  style={{ position: "relative" }}
                >
                  <span>Rules</span>
                </div>
                <div className="table-responsive rules-table lh-1">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th
                          colSpan={2}
                          className="box-10 text-center  title-14"
                          style={{ background: "#f2f2f2" }}
                        >
                          Bonus 1 (2 Cards Bonus)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bonus1.map((item, index) => (
                        <tr key={index} style={{ background: "#f2f2f2" }}>
                          <td
                            className="box-7 title-14"
                            style={{
                              paddingTop: "0.4rem",
                              paddingBottom: "0.5rem",
                              background: "#f2f2f2",
                            }}
                          >
                            {item.label}
                          </td>
                          <td
                            className="box-3 title-14"
                            style={{
                              paddingTop: "0.4rem",
                              paddingBottom: "0.5rem",
                              background: "#f2f2f2",
                            }}
                          >
                            {item.value}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <th
                          colSpan={2}
                          className="box-10 text-center title-14 lh-1"
                          style={{ background: "#f2f2f2" }}
                        >
                          Bonus 2 (7 Cards Bonus)
                        </th>
                      </tr>
                      {bonus2.map((item, index) => (
                        <tr key={index} style={{ background: "#f2f2f2" }}>
                          <td
                            className="box-7 title-14"
                            style={{
                              paddingTop: "0.4rem",
                              paddingBottom: "0.5rem",
                              background: "#f2f2f2",
                            }}
                          >
                            {item.label}
                          </td>
                          <td
                            className="box-3 title-14"
                            style={{
                              paddingTop: "0.4rem",
                              paddingBottom: "0.5rem",
                              background: "#f2f2f2",
                            }}
                          >
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <RulesModal show={show} setShow={setShow} rule={p6rules} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default Poker1DayDesktop;
