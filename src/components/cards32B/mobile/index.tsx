import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { card32rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import CardBox from "./CardsBox";
import OddEven from "./OddEvenBox";
import PlacedBet from "./placeBet";
import "./style.scss";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Dragon20Result from "../desktop/card32B";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import BackLay from "../desktop/BackLay";
import PairBox from "./PairBox";
import MyBet from "./myBet";
import TotalCards from "./totalCards";
import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";

const Card32BMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.card32B}`
  );
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  const { dragonTigerDetail,loading } = useSelector((state: RootState) => state.card);
  const { placedBets } = useSelector((state: RootState) => state.bets);

  const handleClose = () => {
    setShowInactivityModal(false);
  };

  useEffect(() => {
    const resetTimer = () => {
      setLastActivityTime(Date.now());
    };

    const checkInactivity = () => {
      if (Date.now() - lastActivityTime > 5 * 60 * 1000) {
        setShow(true);
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
  }, [lastActivityTime, show]);

  return (
    <>
      <div>
        <div className="dt20header">
          <PlacedBet show={show1} setShow={setShow1} />
          <div className="dt20subheader1">
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
                ? `Round ID:  ${handleRoundId(
                    dragonTigerDetail?.videoInfo?.mid
                  )}`
                : ""}{" "}
            </span>
          </div>
        </div>
        {!activeTab ? (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#000",
              }}
            >
              <div style={{ width: "100%", height: "275px" }}>
                <div className="horseRacingTabHeader-m">
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>
                      {dragonTigerDetail?.name}
                    </span>
                  </div>
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
                      <Dragon20Result data={dragonTigerDetail?.videoInfo} />
                    }
                    id={videoFrameId}
                  />
                </div>
              </div>
            </div>
            {loading ? <InnerLoader /> :<div style={{ height: "860px" }}>
              <div className="" style={{ width: "97%", gap: "10px" }}>
                <div className="w-100">
                  <BackLay
                    matchOddsData={dragonTigerDetail?.matchOdd}
                    data={dragonTigerDetail}
                  />
                </div>
                <div className="w-100">
                  <OddEven
                    odds={dragonTigerDetail?.oddEven}
                    data={dragonTigerDetail}
                  />
                </div>
              </div>
              <div style={{ width: "97%", gap: "8px" }}>
                <PairBox
                  matchOddsData={dragonTigerDetail?.redBlack}
                  data={dragonTigerDetail}
                />
              </div>
              <div style={{ width: "97%", gap: "8px" }}>
                <TotalCards
                  odds={dragonTigerDetail?.cardtotal}
                  data={dragonTigerDetail}
                />
              </div>
              <div style={{ width: "97%", marginLeft: "5px" }}>
                <CardBox
                  odds={dragonTigerDetail?.singleCard}
                  data={dragonTigerDetail}
                />
              </div>
              <div style={{ width: "97%", margin: "5px" }}>
                <CardResultBox data={dragonTigerDetail} name={["8", "9", "10", "11"]} type={cardGamesType.card32B} />
              </div>
            </div>}
          </>
        ) : (
          <>
            <MyBet />
          </>
        )}
      </div>

      <RulesModal show={show} setShow={setShow} rule={card32rules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default Card32BMobile;
