import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { p6rules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import TiePairBox from "./TiePairBox";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import Poker6Result from "../desktop/poker6Card";
import InnerLoader from "../../commonComponent/customLoader/InnerLoader";

const Poker6Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [activeCardTab, setActiveCardTab] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.poker}`
  );
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail,loading } = useSelector((state: RootState) => state.card);
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
                    <Poker6Result data={dragonTigerDetail?.videoInfo} />
                  }
                  id={videoFrameId}
                />
              </div>
            </div>

            {loading ? <InnerLoader /> :<div style={{ height: "820px" }}>
              <div className="dt20TabBox mt-2">
                <div className="dt20tabheaderp mt-4 ">
                  <div
                    style={{
                      height: "100%",
                      borderTop: !activeCardTab ? "2px solid white" : "none",
                      padding: "5px",
                      width: "100%"
                    }}
                  >
                    <span
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                      onClick={() => setActiveCardTab(false)}
                    >
                      HANDS
                    </span>
                  </div>
                  <span
                    style={{ fontSize: "18px", padding: "5px 0px 0px 0px" }}
                  >
                    {" "}
                    |{" "}
                  </span>
                  <div
                    style={{
                      height: "100%",
                      borderTop: activeCardTab ? "2px solid white" : "none",
                      padding: "5px",
                      width: "100%"
                    }}
                  >
                    <span
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                      onClick={() => setActiveCardTab(true)}
                    >
                      PATTERN
                    </span>
                  </div>
                </div>
              </div>
              {activeCardTab ? (
                <div>
                  <TiePairBox
                    handsData={dragonTigerDetail?.patternData}
                    data={dragonTigerDetail}
                    width={"30%"}
                    title={"pattern"}
                  />
                </div>
              ) : (
                <div>
                  <TiePairBox
                    handsData={dragonTigerDetail?.handsData}
                    data={dragonTigerDetail}
                    width={"49%"}
                    title={"hand"}
                    cards={dragonTigerDetail?.videoInfo}
                  />
                </div>
              )}
              <div style={{ width: "100%", marginTop: "15px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["T", "1"]}
                  type={cardGamesType.poker6}
                />
              </div>
            </div>}
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
        rule={p6rules}
      />
    </>
  );
};

export default Poker6Mobile;
