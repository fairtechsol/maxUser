import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dtrules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import OddEven from "./OddEvenBox";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Dragon20Result from "../desktop/dragonCard";
import { cardGamesId, cardUrl } from "../../../utils/constants";
const DragonTigerMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [activeCardTab, setActiveCardTab] = useState("dragon");
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.dragonTiger20}`
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
            <span
              style={{ fontSize: "12px", fontWeight: "bold" }}
              onClick={() => setActiveTab(false)}
            >
              GAME
            </span>
            <span style={{ fontSize: "18px" }}> | </span>
            <span
              style={{ fontSize: "12px", fontWeight: "bold" }}
              onClick={() => setActiveTab(true)}
            >
              PLACED BET({placedBets?.length || 0})
            </span>
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
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%", height: "250px" }}>
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
            <div style={{ height: "820px" }}>
              <div className="dt20TabBox">
                <div className="dtltabheader">
                  <span
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                    onClick={() => setActiveCardTab("dragon")}
                  >
                    DRAGON
                  </span>
                  <span style={{ fontSize: "18px" }}> | </span>
                  <span
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                    onClick={() => setActiveCardTab("tiger")}
                  >
                    TIGER
                  </span>
                  <span style={{ fontSize: "18px" }}> | </span>
                  <span
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                    onClick={() => setActiveCardTab("lion")}
                  >
                    LION
                  </span>
                </div>
              </div>
              {activeCardTab === "dragon" ? (
                <div>
                  <OddEven
                    name={"DRAGON"}
                    odds={dragonTigerDetail?.dragonData}
                    data={dragonTigerDetail}
                  />
                </div>
              ) : activeCardTab === "tiger" ? (
                <div>
                  <OddEven
                    name={"TIGER"}
                    odds={dragonTigerDetail?.tigerData}
                    data={dragonTigerDetail}
                  />
                </div>
              ) : (
                <div>
                  <OddEven
                    name={"LION"}
                    odds={dragonTigerDetail?.lionData}
                    data={dragonTigerDetail}
                  />
                </div>
              )}
              <div style={{ width: "100%", marginTop: "15px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["D", "T", "L"]}
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
      <RulesModal show={show} setShow={setShow} rule={dtrules} />
    </>
  );
};
export default DragonTigerMobile;
