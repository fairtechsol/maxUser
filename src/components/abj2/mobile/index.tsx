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
import { abjrules } from "../../../assets/images";

const Abj2Mobile = () => {
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
          <div className="horseRacingTab">
          <div style={{width:"100%",height:"25vh"}}>
          <div className="horseRacingTabHeader">
            <div>
              <span style={{fontSize:"14px",fontWeight:"600"}}>Lucky 7 - A</span>
            </div>
           
          </div>
          <div style={{width:"100%",height:"92%",backgroundColor:"#000"}}></div>
          </div>
          
          <div style={{width:"100%",marginTop:"15px"}}>
         <TiePairBox/>
          </div>
          <div style={{width:"100%",padding:"10px 5px",display:"flex",flexDirection:"row",gap:"8px"}}>
         <OddEven name={"DRAGON"} card={true}/>
         <OddEven name={"TIGER"} card={false}/>
          </div>
          <div style={{width:"100%",display:"flex",flexDirection:"row",gap:"8px"}}>
         <CardBox name={"DRAGON"} rate={12.00}/>
          </div>
          <div style={{width:"100%",marginTop:"10px"}}><CardResultBox /></div>
        </div>
        ) : (
          <></>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={abjrules}/>
    </>
  );
};

export default Abj2Mobile;
