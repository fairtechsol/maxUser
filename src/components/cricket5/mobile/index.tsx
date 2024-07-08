import { useEffect, useState } from "react";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Crick5Result from "../desktop/cric5Card";
import MarketComponent from "./betTable";
import ScoreBoard from "../../commonComponent/scoreBoard";

const Cricket5Mobile = ({bookmakerData,fancyData}: any) => {

  const [activeTab, setActiveTab] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  // const [videoFrameId, setVideoFrameId] = useState(
  //   `${cardUrl}${cardGamesId?.card32}`
  // );
  const { dragonTigerDetail,scoreBoardData } = useSelector((state: RootState) => state.card);
  const { placedBets } = useSelector((state: RootState) => state.bets);
  const [showFancy, setShowFancy] = useState(false);
  useEffect(() => {
    const resetTimer = () => {
      setLastActivityTime(Date.now());
    };

    const checkInactivity = () => {
      if (Date.now() - lastActivityTime > 5 * 60 * 1000) {
        setShowInactivityModal(true);
        // setVideoFrameId("");
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

  const scorecardData = {
    teams: [
      { name: 'AUS', score: '86-2 (5.0)' },
      { name: 'IND', score: '63-1 (3.2)', crr: '18.90', rr: '14.40' }
    ],
    status: 'IND Needed 24 runs from 10 balls',
    ballByBall: ['4', '0', '6', '1', '3', '6']
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
            <div>{scoreBoardData?.data && (<ScoreBoard data={scoreBoardData?.data}/>)}</div>
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
                result={<Crick5Result data={dragonTigerDetail?.videoInfo} />}
                // id={videoFrameId}
              />
            </div>
          </div>
          <div style={{ height: "600px" }}>
            <div style={{marginTop: "10rem"}}>
            <MarketComponent 
             bookmakerData={bookmakerData}
              fancyData={fancyData} 
              showFancy={showFancy}
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
      // rule={card32rules}
    />
  </>
);
};

export default Cricket5Mobile;
