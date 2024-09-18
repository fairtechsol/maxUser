import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { dtrules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import BackLay from "./BackLay";
import OddEven from "./OddEvenBox";
import PairBox from "./PairBox";
import CardBox from "./cardBox";
import Dragon20Result from "./dragonCard";
import "./style.scss";
import DesktopMyBet from "../../commonComponent/mybet/desktop/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import DesktopPlacedBet from "../../commonComponent/placebet/desktop/placebet";

const DragonTigerDesktop = () => {
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.dragonTigerOneDay}`);
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
                    fontSize: "14px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setShow(true)}
                >
                  {" "}
                  Rules
                </span>
              </div>
              <div style={{fontSize:"12px",paddingTop:"6px"}}>
                {dragonTigerDetail?.videoInfo
                  ? `Round ID:  ${handleRoundId(
                      dragonTigerDetail?.videoInfo?.mid
                    )}`
                  : ""}
              </div>
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
          {loading ? (
            <LoaderOnRefresh />
          ) : (
            <div>
              <div
                className="d-sm-flex flex-row justify-content-around align-items-center"
                style={{ width: "100%",gap: "10px" }}
              >
                <div className="w-50">
                  <BackLay
                    matchOddsData={dragonTigerDetail?.matchOddsData}
                    data={dragonTigerDetail}
                  />
                </div>
                <div className="w-50">
                  <PairBox
                    odds={dragonTigerDetail?.pair}
                    data={dragonTigerDetail}
                  />
                </div>
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
                  title1={"even"}
                  title2={"odd"}
                  dragonData={dragonTigerDetail?.dragonData}
                  tigerData={dragonTigerDetail?.tigerData}
                  data={dragonTigerDetail}
                />
                <OddEven
                  title1={"red"}
                  title2={"black"}
                  dragonData={dragonTigerDetail?.dragonData}
                  tigerData={dragonTigerDetail?.tigerData}
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
                  dragonData={dragonTigerDetail?.dragonData}
                  tigerData={dragonTigerDetail?.tigerData}
                  data={dragonTigerDetail}
                />
              </div>
              <div style={{ width: "100%", margin: "5px 0px 0px 10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["D", "T"]}
                  type={cardGamesType.dragonTigerOneDay}
                />
              </div>
            </div>
          )}

          <RulesModal show={show} setShow={setShow} rule={dtrules} />
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

export default DragonTigerDesktop;
