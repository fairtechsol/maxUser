import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import "../../horseRacing/mobile/betTable/style.scss";
import "./style.scss"
import CardsCompnentMobile from "./betTable";
import CardResultBox from "../../commonComponent/cardResultBox";
const Cards32Mobile = () => {
    const [activeTab, setActiveTab] = useState(false);
    const [activeCardTab, setActiveCardTab] = useState(false);
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
            <span style={{ textDecoration: "underline" }}>Rules</span>
            <span> Round ID:4353455 </span>
          </div>
        </div>
        {!activeTab ? (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ width: "100%", height: "28vh" }}>
              <div className="horseRacingTabHeaderMob">
                <div>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    20-20 DRAGON TIGER
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
              <CardsCompnentMobile/>
            </div>
        <div style={{marginTop: "10px"}}>  <CardResultBox/></div>
         
         
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default Cards32Mobile