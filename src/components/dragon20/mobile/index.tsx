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
import CardBox from "./CardsBox";
import OddEven from "./OddEvenBox";
import TiePairBox from "./TiePairBox";
import "./style.scss";
// import InnerLoader from "../../commonComponent/customLoader/InnerLoader";
import InactivityModal from "../../commonComponent/cards/userInactivityModal";
import MobileMyBet from "../../commonComponent/mybet/mobile/myBet";
import { LoaderOnRefresh } from "../../commonComponent/loader";
import MobilePlacedBet from "../../commonComponent/placebet/mobile/myBet";

const DragonTigerMobile = () => {
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
    setVideoFrameId(`${cardUrl}${cardGamesId?.dragonTiger20}`);
  }, []);

  return (
    <>
      <div>
        <div className="dt20header">
          <MobilePlacedBet show={show1} setShow={setShow1} />
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
            <div style={{ width: "100%" }}>
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

            {loading ? (
              <LoaderOnRefresh />
            ) : (
              <div>
                <div style={{ width: "100%", marginTop: "-3rem" }}>
                  <TiePairBox
                    tiePair={dragonTigerDetail?.tiePair}
                    data={dragonTigerDetail}
                  />
                </div>

                {/* <div className="dt20TabBox">
                  <div className="dt20tabheader">
                    <div
                      style={{
                        height: "100%",
                        borderTop: !activeCardTab ? "2px solid white" : "none",
                        padding: "5px",
                      }}
                    >
                      <span
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        onClick={() => setActiveCardTab(false)}
                      >
                        DRAGON
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
                      }}
                    >
                      <span
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        onClick={() => setActiveCardTab(true)}
                      >
                        TIGER
                      </span>
                    </div>
                  </div>
                </div> */}

                <div
                  style={{
                    width: "100%",
                    margin: "px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <OddEven
                    name={"DRAGON"}
                    odds={dragonTigerDetail?.dragonOdds}
                    data={dragonTigerDetail}
                  />
                  <OddEven
                    name={"TIGER"}
                    odds={dragonTigerDetail?.tigerOdds}
                    data={dragonTigerDetail}
                  />
                </div>

                <div>
                  <CardBox
                    name={"DRAGON"}
                    cardData={dragonTigerDetail?.dragonCards}
                    data={dragonTigerDetail}
                  />
                </div>

                <div>
                  <CardBox
                    name={"TIGER"}
                    cardData={dragonTigerDetail?.tigerCards}
                    data={dragonTigerDetail}
                  />
                </div>

               

                <div style={{ width: "100%", marginTop: "15px" }}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["D", "T"]}
                    type={cardGamesType.dragonTiger20}
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
