import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./style.scss";
// import CardResultBox from "../../commonComponent/cardResultBox";
// import CardResultBox from "../../commonComponent/cardResultBox";
import { abjrules } from "../../../assets/images";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Abj2Result from "../desktop/abj2Card";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import OddBox from "./OddBox";
import TotalsBox from "./TotalBox";
import WinBox from "./win";

const Race20Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId?.andarBahar2}`
  );
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const { placedBets } = useSelector((state: RootState) => state.bets);

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
              onClick={() => setShowInactivityModal(true)}
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
          <div className="horseRacingTab">
            <div style={{ width: "100%", height: "210px" }}>
              <div className="horseRacingTabHeader-m">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {dragonTigerDetail?.name}
                  </span>
                 
                </div>
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
                  result={<Abj2Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>

            <div style={{ height: "800px" }}>
              <div style={{ width: "100%", marginTop: "20%" }}>
              <OddBox
                  odds={dragonTigerDetail?.cards}
                  data={dragonTigerDetail}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  padding: "5px 0px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <TotalsBox
                  odds={dragonTigerDetail?.total}
                  data={dragonTigerDetail}
                />
              </div>
              <div
                style={{
                  width: "100%",
                }}
              >
                 <WinBox
                  odds={dragonTigerDetail?.win}
                  data={dragonTigerDetail}
                />
              </div>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "B"]}
                  type={cardGamesType.andarBahar2}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <MyBet />
          </>
        )}
      </div>
      <RulesModal
        show={showInactivityModal}
        setShow={setShowInactivityModal}
        rule={abjrules}
      />
    </>
  );
};

export default Race20Mobile;
