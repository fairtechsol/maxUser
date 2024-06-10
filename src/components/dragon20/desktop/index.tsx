import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import { useState } from "react";
import { dtrules } from "../../../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PlacedBet from "./placeBet";
import MyBet from "./myBet";

const DragonTigerDesktop = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  // console.log('dragonTigerDetail',dragonTigerDetail)
  const roundId = (id: any) => {
    const Id = id?.split(".");
    return Id[1];
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1%" }}>
      <div className="horseRacingTab">
        <div style={{ width: "100%", height: "40vh", margin: "5px" }}>
          <div className="horseRacingTabHeader">
            <div>
              <span style={{ fontSize: "16px", fontWeight: "600" }}>
                {dragonTigerDetail?.name}
              </span>
              <span
                style={{ fontSize: "14px", textDecoration: "underline" }}
                onClick={() => setShow(true)}
              >
                {" "}
                RULES
              </span>
            </div>
            <span>
              {dragonTigerDetail?.videoInfo
                ? `Round ID:  ${roundId(dragonTigerDetail?.videoInfo?.mid)}`
                : ""}
            </span>
          </div>
          <div
            style={{ width: "100%", height: "92%", backgroundColor: "#000" }}
          ></div>
        </div>

        <div style={{ width: "100%", margin: "5px" }}>
          <TiePairBox
            tiePair={dragonTigerDetail?.tiePair}
            data={dragonTigerDetail}
          />
        </div>
        <div
          style={{
            width: "100%",
            margin: "5px",
            display: "flex",
            flexDirection: "row",
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
        <div
          style={{
            width: "100%",
            margin: "5px",
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <CardBox
            name={"DRAGON"}
            cardData={dragonTigerDetail?.dragonCards}
            data={dragonTigerDetail}
          />
          <CardBox
            name={"TIGER"}
            cardData={dragonTigerDetail?.tigerCards}
            data={dragonTigerDetail}
          />
        </div>
        <div style={{ width: "100%", margin: "5px" }}>
          <CardResultBox />
        </div>
        <RulesModal show={show} setShow={setShow} rule={dtrules} />
      </div>
      <div style={{ width: "30%", margin: "-3px 5px" }}>
        <PlacedBet />
        <MyBet />
      </div>
    </div>
  );
};

export default DragonTigerDesktop;
