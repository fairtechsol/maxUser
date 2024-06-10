import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import SBetBox from "./Sbox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../commonComponent/cardResultBox";
import { useState } from "react";
import RulesModal from "../../commonComponent/rulesModal";
import { abjrules } from "../../../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Abj2Desktop = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  // console.log('dragonTigerDetail',dragonTigerDetail)
  const roundId = (id: any) => {
    const Id = id?.split(".");
    return Id[1];
  };
  return (
    <div className="horseRacingTab">
      <div style={{width:"70%",height:"38vh",margin:"5px"}}>
      <div className="horseRacingTabHeader">
        <div>
          <span style={{fontSize:"16px",fontWeight:"600"}}>{dragonTigerDetail?.name}</span>
          <a style={{fontSize:"14px",textDecoration:"underline"}} onClick={()=>setShow(true)}>{' '}RULES</a>
        </div>
        <span>{dragonTigerDetail?.videoInfo
                  ? `Round ID:  ${roundId(dragonTigerDetail?.videoInfo?.mid)}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${dragonTigerDetail?.videoInfo?.max}`
                  : ""}</span>
      </div>
      <div style={{width:"100%",height:"92%",backgroundColor:"#000"}}></div>
      </div>
      
      <div className="row-flex" style={{width:"70%",margin:"5px"}}>
     <SBetBox type={"A"} odds={dragonTigerDetail?.abjSa} data={dragonTigerDetail}/>
     <SBetBox type={"B"} odds={dragonTigerDetail?.abjSb} data={dragonTigerDetail}/>
      </div>
      <div style={{width:"70%",margin:"5px",display:"flex",flexDirection:"row",gap:"8px"}}>
     <OddEven card={true} odds={dragonTigerDetail?.oddEven} data={dragonTigerDetail}/>
     <OddEven card={false} odds={dragonTigerDetail?.abjCards} data={dragonTigerDetail}/>
      </div>
      <div style={{width:"70%",margin:"5px",display:"flex",flexDirection:"row",gap:"8px"}}>
     <CardBox  rate={12} cards={dragonTigerDetail?.cards} data={dragonTigerDetail}/>
      </div>
      <div style={{width:"70%",margin:"5px"}}><CardResultBox /></div>
      <RulesModal show={show} setShow={setShow} rule={abjrules}/>
    </div>
  );
};

export default Abj2Desktop;
