import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../commonComponent/cardResultBox";
import { useState } from "react";
import RulesModal from "../../commonComponent/rulesModal";
import { luckyrules } from "../../../assets/images";

const Lucky7Desktop = () => {
  const [show, setShow] = useState(false);
 

  return (
    <div className="horseRacingTab">
      <div style={{width:"70%",height:"40vh",margin:"5px"}}>
      <div className="horseRacingTabHeader">
        <div>
          <span style={{fontSize:"16px",fontWeight:"600"}}>LUCKY 7 - A</span>
          <a style={{fontSize:"14px",textDecoration:"underline"}} onClick={()=>setShow(true)}>{' '}RULES</a>
        </div>
        <span>Round ID: 240506171245</span>
      </div>
      <div style={{width:"100%",height:"92%",backgroundColor:"#000"}}></div>
      </div>
      
      <div style={{width:"70%",margin:"5px"}}>
     <TiePairBox/>
      </div>
      <div style={{width:"70%",margin:"5px",display:"flex",flexDirection:"row",gap:"8px"}}>
     <OddEven name={"DRAGON"} card={true}/>
     <OddEven name={"TIGER"} card={false}/>
      </div>
      <div style={{width:"70%",margin:"5px",display:"flex",flexDirection:"row",gap:"8px"}}>
     <CardBox name={"DRAGON"} rate={12.00}/>
      </div>
      <div style={{width:"70%",margin:"5px"}}><CardResultBox /></div>
      <RulesModal show={show} setShow={setShow} rule={luckyrules}/>
    </div>
  );
};

export default Lucky7Desktop;
