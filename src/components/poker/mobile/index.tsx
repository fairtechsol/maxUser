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
import "./style.scss";
import Poker6Result from "../desktop/poker6Card";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";
import CasinoHead from "../../commonComponent/casinoGameHeader";
import NewLoader from "../../commonComponent/newLoader";

const Poker6Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [activeCardTab, setActiveCardTab] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState("");
  const [show, setShow] = useState(false);
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.poker}`);
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
                  result={<Poker6Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>

            {loading ? (
              <NewLoader />
            ) : (
              <div>
                <div className="dt20TabBox-poker">
                  <div className="dt20tabheaderp">
                    <div
                    onClick={() => setActiveCardTab(false)}
                      style={{
                        height: "100%",
                        borderTop: !activeCardTab ? "1px solid white" : "none",
                        padding: "3px",
                        width: "100%",
                        backgroundColor: !activeCardTab ? "#ffc742d9" : "",
                        color: !activeCardTab ? "#ffffff" : "#000000",
                      }}
                    >
                      <span
                        style={{ fontSize: "14px", fontWeight: "normal" }}
                        
                      >
                        HANDS
                      </span>
                    </div>
                    <span
                      style={{ fontSize: "18px", padding: "5px 0px 0px 0px" }}
                    >
                      {/* {" "}
                      |{" "} */}
                    </span>
                    <div
                     onClick={() => setActiveCardTab(true)}
                      style={{
                        height: "100%",
                        borderTop: activeCardTab ? "1px solid white" : "none",
                        padding: "3px",
                        width: "100%",
                        backgroundColor: activeCardTab ? "#ffc742d9" : "",
                        color: activeCardTab ? "#ffffff" : "#000000",
                      }}
                    >
                      <span
                        style={{ fontSize: "14px", fontWeight: "normal" }}
                       
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
                      width={"50%"}
                      title={"pattern"}
                    />
                  </div>
                ) : (
                  <div>
                    <TiePairBox
                      handsData={dragonTigerDetail?.handsData}
                      data={dragonTigerDetail}
                      width={"100%"}
                      title={"hand"}
                      cards={dragonTigerDetail?.videoInfo}
                    />
                  </div>
                )}
                <div style={{ width: "100%"}}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["T", "1"]}
                    type={cardGamesType.poker6}
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
      <RulesModal show={show} setShow={setShow} rule={p6rules} />
      <InactivityModal show={showInactivityModal} handleClose={handleClose} />
    </>
  );
};

export default Poker6Mobile;
