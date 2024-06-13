import { useState } from "react";
import "./style.scss";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import SBetBox from "./Sbox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
// import CardResultBox from "../../commonComponent/cardResultBox";
// import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import { abjrules } from "../../../assets/images";
import CardResultBox from "../../commonComponent/cardResultBox";
import PlacedBet from "./placeBet";
import MyBet from "./myBet";

const Abj2Mobile = () => {
  const [activeTab, setActiveTab] = useState(false);
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
            <span style={{ textDecoration: "underline" }} onClick={()=>setShow(true)}>Rules</span>
            <span> {dragonTigerDetail?.videoInfo
                ? `Round ID:  ${roundId(dragonTigerDetail?.videoInfo?.mid)}`
                : ""} </span>
          </div>
        </div>
        {!activeTab ? (
          <div className="horseRacingTab">
          <div style={{width:"100%",height:"25vh"}}>
          <div className="horseRacingTabHeader-m">
            <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:"14px",fontWeight:"600"}}>{dragonTigerDetail?.name}</span>
              <span style={{fontSize:"14px",fontWeight:"600"}}>Min:{dragonTigerDetail?.videoInfo?.min} Max:{dragonTigerDetail?.videoInfo?.max}</span>
            </div>
           
          </div>
          <div style={{width:"100%",height:"92%",backgroundColor:"#000"}}></div>
          </div>
          
          <div style={{width:"100%",marginTop:"10px"}}>
          <SBetBox type={"A"} odds={dragonTigerDetail?.abjSa} data={dragonTigerDetail}/>
          <SBetBox type={"B"} odds={dragonTigerDetail?.abjSb} data={dragonTigerDetail}/>
          </div>
          <div style={{width:"100%",padding:"5px 0px",display:"flex",flexDirection:"column",gap:"8px"}}>
          <OddEven card={true} odds={dragonTigerDetail?.oddEven} data={dragonTigerDetail}/>
          <OddEven card={false} odds={dragonTigerDetail?.abjCards} data={dragonTigerDetail}/>
          </div>
          <div style={{width:"100%",display:"flex",flexDirection:"row",gap:"8px"}}>
          <CardBox  rate={12} cards={dragonTigerDetail?.cards} data={dragonTigerDetail}/>
          </div>
          <div style={{width:"100%",marginTop:"10px"}}><CardResultBox /></div>
        </div>
        ) : (
          <><MyBet/></>
        )}
      </div>
      <RulesModal show={show} setShow={setShow} rule={abjrules}/>
    </>
  );
};

export default Abj2Mobile;
