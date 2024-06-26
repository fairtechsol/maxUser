import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import "../../horseRacing/mobile/betTable/style.scss";
import DynamicTable from "./betTable";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import Card32Result from "../desktop/card32Card";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import RulesModal from "../../commonComponent/rulesModal";
import { card32rules } from "../../../assets/images";
import { cardGamesId, cardUrl } from "../../../utils/constants";
const Cards32Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId?.card32}`
  );
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
              onClick={() => setShowInactivityModal(true)}
            >
              Rules
            </span>
            <span>
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
            <div style={{ width: "100%", height: "240px" }}>
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
                {" "}
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Card32Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>
            <div style={{ height: "400px" }}>
              <div className="mt-5">
                <DynamicTable
                  back={true}
                  odds={dragonTigerDetail?.set1}
                  data={dragonTigerDetail}
                  playerNum={[8, 9]}
                />

                <DynamicTable
                  back={false}
                  odds={dragonTigerDetail?.set2}
                  data={dragonTigerDetail}
                  playerNum={[10, 11]}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                {" "}
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["8", "9", "10", "11"]}
                  type={"card32"}
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
        rule={card32rules}
      />
    </>
  );
};

export default Cards32Mobile;
