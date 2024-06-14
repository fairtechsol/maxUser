import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
import CardResultBox from "../../commonComponent/cardResultBox";
import "../../horseRacing/mobile/betTable/style.scss";
import DynamicTable from "./betTable";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";
import "./style.scss";
const Cards32Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [show1, setShow1] = useState(false);
  const [activeCardTab, setActiveCardTab] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const handleSelect = (key: any) => {
    setActiveTab(key);
  };
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
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
              PLACED BET(2)
            </span>
          </div>
          <div className="dt20subheader2">
            <span style={{ textDecoration: "underline" }}>Rules</span>
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
              ></div>
            </div>
            <div>
              <DynamicTable
                back={true}
                odds={dragonTigerDetail?.set1}
                data={dragonTigerDetail}
              />

              <DynamicTable
                back={false}
                odds={dragonTigerDetail?.set2}
                data={dragonTigerDetail}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              {" "}
              <CardResultBox  name={["8","9","10","11"]} type={"card32"}/>
            </div>
          </div>
        ) : (
          <>
            <MyBet />
          </>
        )}
      </div>
    </>
  );
};

export default Cards32Mobile;
