import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { luckyrules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { cardGamesId, cardGamesType, cardUrl } from "../../../utils/constants";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Lucky7Result from "../desktop/lucky7Card";
import CardBox from "./CardsBox";
import OddEven from "./OddEvenBox";
import TiePairBox from "./TiePairBox";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";

const BollywoodTableMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  // const [activeCardTab, setActiveCardTab] = useState(false);
  const [show, setShow] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [videoFrameId, setVideoFrameId] = useState(
    `${cardUrl}${cardGamesId.lucky7}`
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
          <div className="dt20subheader1">
            <PlacedBet show={show1} setShow={setShow1} />
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
          <div className="horseRacingTab">
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
                  height: "92%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<Lucky7Result data={dragonTigerDetail?.videoInfo} />}
                  id={videoFrameId}
                />
              </div>
            </div>

            <div style={{}}>
              <div style={{ width: "100%", marginTop: "30px" }}>
                <TiePairBox
                  lowHigh={dragonTigerDetail?.players}
                  data={dragonTigerDetail}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  padding: "10px 5px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                <OddEven
                  name={"DRAGON"}
                  odds={dragonTigerDetail?.luckOdds}
                  data={dragonTigerDetail}
                  card={true}
                />

                <OddEven
                  name={"TIGER"}
                  odds={dragonTigerDetail?.redBlack}
                  card={false}
                  data={dragonTigerDetail}
                />

                <OddEven
                  name={"DRAGON"}
                  odds={dragonTigerDetail?.seven}
                  data={dragonTigerDetail}
                  card={true}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                <CardBox
                  name={"DRAGON"}
                  cardData={dragonTigerDetail?.luckyCards}
                  data={dragonTigerDetail}
                  rate={dragonTigerDetail?.luckyCards?.rate}
                />
              </div>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["A", "B", "C"]}
                  type={cardGamesType.amarAkbarAnthony}
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
      <RulesModal show={show} setShow={setShow} rule={luckyrules} />
    </>
  );
};

export default BollywoodTableMobile;
