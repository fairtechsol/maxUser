import { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { crick5rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardData, cardGamesId, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import PlacedBet from "./placeBet";
import "./style.scss";
import MarketComponent from "./betTable";
import ScoreBoard from "../../commonComponent/scoreBoard";
import Crick5Result from "./cric5Card";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";

const Cricket5Desktop = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const { dragonTigerDetail, scoreBoardData, loading } = useSelector(
    (state: RootState) => state.card
  );
  // console.log(dragonTigerDetail, "dtaa")
  // const [showFancy, setShowFancy] = useState(false);
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.cricketv3}`);
  }, []);

  return (
    <>
      <Row>
        <Col md={8} className="five-cricket">
          <div
            style={{
              width: "100%",
              // height: scoreBoardData?.data ? "400px" : "310px",
              margin: "5px",
            }}
          >
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
              {scoreBoardData?.data && (
            <div>
                <ScoreBoard data={scoreBoardData?.data} />
            </div>
              )}
            <div
              style={{ width: "100%", height: "90%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Crick5Result data={dragonTigerDetail?.videoInfo} />}
                id={videoFrameId}
              />
            </div>
          </div>
          {loading ? (
            <LoaderOnRefresh />

          ) : (
            <div>
              <div>
                <MarketComponent
                  odds={dragonTigerDetail?.odds}
                  min={dragonTigerDetail?.videoInfo?.min}
                  max={dragonTigerDetail?.videoInfo?.max}
                  data={dragonTigerDetail}
                />
              </div>
              <div className="mt-2">
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "I", "T"]}
                  type={"cricketv3"}
                />
              </div>
            </div>
          )}
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
                <DesktopMyBet />
              </Col>
              <Col 
              className="no-scrollbar"
                style={{ height: "350px", overflow: "auto" }}
              >
                <div className="casino-title" style={{ position: "relative" }}>
                  <span>Rules</span>
                </div>
                <div className="table-responsive rules-table d-flex">
                  {cardData?.map((teamData, index) => (
                    <Table bordered key={index} className="mb-4">
                      <thead>
                        <tr>
                          <th colSpan={2} className="text-center">
                            {teamData.team}
                          </th>
                        </tr>
                        <tr>
                          <th>Cards</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamData.cards.map((card, cardIndex) => (
                          <tr key={cardIndex}>
                            <td className=" d-flex text-start">
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <img
                                  src={
                                    typeof card.imgSrc === "string"
                                      ? card.imgSrc
                                      : ""
                                  }
                                  alt="s"
                                  className="img-cards"
                                />
                                X 10
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {card.value}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ))}
                </div>
                <RulesModal show={show} setShow={setShow} rule={crick5rules} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default Cricket5Desktop;
