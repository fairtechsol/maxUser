import { useEffect, useState } from "react";
import "./style.scss";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { NavLink } from "react-router-dom";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import { dtrules } from "../../../assets/images";

const DragonTigerMobile = () => {
  const [activeTab, setActiveTab] = useState(false);
  const [activeCardTab, setActiveCardTab] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const handleSelect = (key: any) => {
    setActiveTab(key);
  };

  return (
    <>
      <div>
        <div className="dt20header">
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
            <span style={{ textDecoration: "underline" }} onClick={()=>setShow(true)}>Rules</span>
            <span> Round ID:4353455 </span>
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
                    20-20 DRAGON TIGER 2
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
            <div style={{ width: "100%" }}>
              <TiePairBox />
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
              <OddEven name={"DRAGON"} />
              <CardBox name={"DRAGON"} rate={12.00}/>
              </div>
            ) : (
              <div>
              <OddEven name={"TIGER"} />
              <CardBox name={"TIGER"} rate={10.00}/>
              </div>
            )}
            <div style={{width:"100%",marginTop:"15px"}}><CardResultBox /></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={dtrules}/>
    </>
  );
};

export default DragonTigerMobile;
