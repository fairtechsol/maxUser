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
import "./style.scss";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import CasinoHead from "../../commonComponent/casinoGameHeader";

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
          <MobilePlacedBet show={show1} setShow={setShow1} />         
           <CasinoHead activeTab={activeTab} setActiveTab={setActiveTab} setShow={setShow} />

        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%"}}>
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
