import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dtrules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Dragon20Result from "../desktop/dragonCard";
import OddEven from "./OddEvenBox";
import PlacedBet from "./placeBet";
import "./style.scss";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";

const DragonTigerMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [activeCardTab, setActiveCardTab] = useState("dragon");
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail, loading } = useSelector(
    (state: RootState) => state.card
  );
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.dragonTigerLion}`);
  }, []);

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
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%"}}>
              <div className="horseRacingTabHeader-m">
                <div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      // wordSpacing: "-3px",
                    }}
                  >
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
            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div style={{ marginTop: "-2rem" }}>
                <div className="dt20TabBox">
                  <div className="dtltabheader">
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "6px",
                        width: "100%",
                        textAlign: "center",
                        borderTop:
                          activeCardTab === "dragon"
                            ? "2px solid white"
                            : "none",
                      }}
                      onClick={() => setActiveCardTab("dragon")}
                    >
                      DRAGON
                    </span>
                    <span style={{ fontSize: "18px" }}> | </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "5px",
                        width: "100%",
                        textAlign: "center",
                        borderTop:
                          activeCardTab === "tiger"
                            ? "2px solid white"
                            : "none",
                      }}
                      onClick={() => setActiveCardTab("tiger")}
                    >
                      TIGER
                    </span>
                    <span style={{ fontSize: "18px" }}> | </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "5px",
                        width: "100%",
                        textAlign: "center",
                        borderTop:
                          activeCardTab === "lion" ? "2px solid white" : "none",
                      }}
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
                    type={cardGamesType.dragonTigerLion}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <MobileMyBet />
          </>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={dtrules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};
export default DragonTigerMobile;
