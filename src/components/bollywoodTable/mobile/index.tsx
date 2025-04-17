import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { brules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import CardResultBox from "../../commonComponent/cardResultBox";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import NewLoader from "../../commonComponent/newLoader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import "../../commonStyle.scss";
import Lucky7Result from "../desktop/lucky7Card";
import CardBox from "./CardsBox";
import OddEven from "./OddEvenBox";
import TiePairBox from "./TiePairBox";
import TiePairBox2 from "./TiePairBox2";

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
      <MobilePlacedBet show={show1} setShow={setShow1} />
      <CasinoHead activeTab={activeTab} setActiveTab={setActiveTab} setShow={setShow} />

      {!activeTab ? (
        <Row>
          <Col md={8}>
            <div className="horseRacingTab">
              <div style={{ width: "100%" }}>
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
                <NewLoader />
              ) : (
                <div>
                  <div style={{ width: "100%" }}>
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
                      borderRight: "1px solid #c7c8ca",
                      borderTop: "1px solid #c7c8ca",
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
                      borderRight: "1px solid #c7c8ca",
                      borderTop: "1px solid #c7c8ca",
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
      <RulesModal show={show} setShow={setShow} rule={brules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default BollywoodTableDesktop;
