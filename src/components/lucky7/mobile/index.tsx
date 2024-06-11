import { useState } from "react";
import "./style.scss";
import {  RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import { luckyrules } from "../../../assets/images";
import PlacedBet from "./placeBet";
import MyBet from "./myBet";

const Lucky7Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  // const [activeCardTab, setActiveCardTab] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const { placedBets } = useSelector((state: RootState) => state.bets);
  const roundId = (id: any) => {
    const Id = id?.split(".");
    return Id[1];
  };

  return (
    <>
      <div>
        <div className="dt20header">
          <div className="dt20subheader1">
            <PlacedBet show={show1} setShow={setShow1} />
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
                ? `Round ID:  ${roundId(dragonTigerDetail?.videoInfo?.mid)}`
                : ""}{" "}
            </span>
          </div>
        </div>
        {!activeTab ? (
          <div className="horseRacingTab">
            <div style={{ width: "100%", height: "25vh" }}>
              <div className="horseRacingTabHeader">
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
              ></div>
            </div>

            <div style={{ width: "100%", marginTop: "15px" }}>
              <TiePairBox
                lowHigh={dragonTigerDetail?.lowHigh}
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
                odds={dragonTigerDetail?.redBlack}
                data={dragonTigerDetail}
                name={"DRAGON"}
                card={true}
              />
              <OddEven
                name={"TIGER"}
                odds={dragonTigerDetail?.luckOdds}
                card={false}
                data={dragonTigerDetail}
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
              <CardResultBox />
            </div>
          </div>
        ) : (
          <><MyBet/></>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={luckyrules} />
    </>
  );
};

export default Lucky7Mobile;
