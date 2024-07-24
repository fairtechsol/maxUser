import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CardBox from "./CardsBox";
import CardBox2 from "./CardsBox2";
import OddEven from "./OddEvenBox";
import SBetBox from "./Sbox";
import "./style.scss";
import { abjrules } from "../../../assets/images";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import Abj1Result from "../desktop/abj1Card";

const WorliMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId?.andarBahar1}`
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

  const handlock = (item: any) => {
    if (item?.gstatus === "0") {
      return "suspended";
    } else {
      return "";
    }
  };

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
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Min:{dragonTigerDetail?.videoInfo?.min} Max:
                    {dragonTigerDetail?.videoInfo?.max}
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
                  result={<Abj1Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>

            <div style={{ height: "450px", marginTop: "70px" }}>
              <div >
                <div
                  style={{
                    width: "100%",
                    margin: "px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="d-flex flex-row">
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {dragonTigerDetail?.worli?.gstatus === "0" ? 0 : 9}
                    </div>
                  </div>
                  <div className={handlock(dragonTigerDetail.worli)}>
                    <CardBox
                      odds={"L1"}
                      data={dragonTigerDetail}
                      cards={dragonTigerDetail?.cardInfo}
                    />
                    <CardBox
                      odds={"L2"}
                      data={dragonTigerDetail}
                      cards={dragonTigerDetail?.cardInfo}
                    />
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    9
                  </div>

                  <div className={handlock(dragonTigerDetail.worli)}>
                    <CardBox2 />
                  </div>
                  <div
                    style={{
                      color: "#BD1828",
                      textAlign: "start",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    welcome single
                  </div>
                </div>

                <div style={{ width: "100%"}}>
                  <CardResultBox
                    data={dragonTigerDetail}
                    name={["R", "R", "R"]}
                    type={cardGamesType.worli}
                  />
                </div>
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

export default WorliMobile;
