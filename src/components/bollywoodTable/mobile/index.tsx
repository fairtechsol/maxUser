import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { luckyrules } from "../../../assets/images";
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
import Lucky7Result from "../desktop/lucky7Card";
import "./style.scss";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import TiePairBox2 from "./TiePairBox2";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";

const BollywoodTableDesktop = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [show, setShow] = useState(false);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [_, setIsSticky] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.btable}`
  );
  const { placedBets } = useSelector((state: RootState) => state.bets);

  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
  const [show1, setShow1] = useState(false);

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
    <>
      <div className="dt20header">
        <div className="dt20subheader1">
          <MobilePlacedBet show={show1} setShow={setShow1} />
          <div
            style={{
              height: "100%",
              borderTop: !activeTab ? "2px solid white" : "none",
              padding: "5px",
            }}
          >
            <span
              style={{ fontSize: "12px", fontWeight: "bold" }}
              onClick={() => setActiveTab(false)}
            >
              GAME
            </span>
          </div>
          <span style={{ fontSize: "18px" }}> | </span>
          <div
            style={{
              height: "100%",
              borderTop: activeTab ? "2px solid white" : "none",
              padding: "5px",
            }}
          >
            <span
              style={{ fontSize: "12px", fontWeight: "bold" }}
              onClick={() => setActiveTab(true)}
            >
              PLACED BET({placedBets?.length || 0})
            </span>
          </div>
        </div>
        <div className="dt20subheader2">
          <span
            style={{ textDecoration: "underline" }}
            onClick={() => setShow(true)}
          >
            Rules
          </span>
          <span>
            {" "}
            {dragonTigerDetail?.videoInfo
              ? `Round ID:  ${handleRoundId(dragonTigerDetail?.videoInfo?.mid)}`
              : ""}{" "}
          </span>
        </div>
      </div>
      {!activeTab ? (
        <Row>
          <Col md={8}>
            <div className="horseRacingTab">
              <div style={{ width: "100%", margin: "" }}>
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
                    result={
                      <Lucky7Result data={dragonTigerDetail?.videoInfo} />
                    }
                    id={videoFrameId}
                  />
                </div>
              </div>
              {loading ? (
                <LoaderOnRefresh />
              ) : (
                <div>
                  <div style={{ width: "100%", margin: "" }}>
                    <TiePairBox
                      lowHigh={dragonTigerDetail?.players}
                      data={dragonTigerDetail}
                    />
                    <div
                      style={{
                        width: "100%",
                        marginTop: "20px",
                        borderTop: "1px solid #aaa",
                      }}
                    >
                      <TiePairBox2
                        lowHigh={[dragonTigerDetail?.luckOdds]}
                        data={dragonTigerDetail}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      background: "#EEEEEE",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      marginTop: "10px",
                    }}
                  >
                    <OddEven
                      name={"DRAGON"}
                      odds={dragonTigerDetail?.seven}
                      data={dragonTigerDetail}
                      card={true}
                    />
                  </div>

                  <div
                    style={{
                      width: "100%",
                      background: "#EEEEEE",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      marginTop: "10px",
                    }}
                  >
                    <OddEven
                      name={"TIGER"}
                      odds={dragonTigerDetail?.redBlack}
                      card={false}
                      data={dragonTigerDetail}
                    />
                  </div>

                  <div
                    style={{
                      width: "100%",
                      background: "#EEEEEE",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      marginTop: "10px",
                    }}
                  >
                    <CardBox
                      cardData={dragonTigerDetail?.luckyCards}
                      data={dragonTigerDetail}
                      rate={dragonTigerDetail?.luckyCards?.rate}
                    />
                  </div>

                  <div style={{ width: "100%", margin: "" }}>
                    <CardResultBox
                      data={dragonTigerDetail}
                      name={["A", "B", "C", "D", "E", "F"]}
                      type={cardGamesType.btable}
                    />
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      ) : (
        <MobileMyBet />
      )}
      <RulesModal show={show} setShow={setShow} rule={luckyrules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default BollywoodTableDesktop;
