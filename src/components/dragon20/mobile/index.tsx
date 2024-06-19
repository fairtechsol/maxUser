import { useState } from "react";
import { useSelector } from "react-redux";
import { dtrules } from "../../../assets/images";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import CardBox from "./CardsBox";
import OddEven from "./OddEvenBox";
import TiePairBox from "./TiePairBox";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Dragon20Result from "../desktop/dragonCard";
import { cardGamesId } from "../../../utils/constants";

const DragonTigerMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [activeCardTab, setActiveCardTab] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const { placedBets } = useSelector((state: RootState) => state.bets);
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
            <div style={{ width: "100%", height: "28vh" }}>
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
                  id={cardGamesId?.dragonTiger20}
                />
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <TiePairBox
                tiePair={dragonTigerDetail?.tiePair}
                data={dragonTigerDetail}
              />
            </div>
            <div className="dt20TabBox">
              <div className="dt20tabheader">
                <span
                  style={{ fontSize: "12px", fontWeight: "bold" }}
                  onClick={() => setActiveCardTab(false)}
                >
                  DRAGON
                </span>
                <span style={{ fontSize: "18px" }}> | </span>
                <span
                  style={{ fontSize: "12px", fontWeight: "bold" }}
                  onClick={() => setActiveCardTab(true)}
                >
                  TIGER
                </span>
              </div>
            </div>
            {activeCardTab ? (
              <div>
                <OddEven
                  name={"DRAGON"}
                  odds={dragonTigerDetail?.dragonOdds}
                  data={dragonTigerDetail}
                />
                <CardBox
                  name={"DRAGON"}
                  cardData={dragonTigerDetail?.dragonCards}
                  data={dragonTigerDetail}
                />
              </div>
            ) : (
              <div>
                <OddEven
                  name={"TIGER"}
                  odds={dragonTigerDetail?.tigerOdds}
                  data={dragonTigerDetail}
                />
                <CardBox
                  name={"TIGER"}
                  cardData={dragonTigerDetail?.tigerCards}
                  data={dragonTigerDetail}
                />
              </div>
            )}
            <div style={{ width: "100%", marginTop: "15px" }}>
              <CardResultBox data={dragonTigerDetail} name={["D", "T"]} />
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
