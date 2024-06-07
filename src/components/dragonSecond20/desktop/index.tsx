import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../commonComponent/cardResultBox";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import RulesModal from "../../commonComponent/rulesModal";
import { dtrules } from "../../../assets/images";

const DragonTigerDesktop = () => {
  const [show, setShow] = useState(false);
 

  return (
    <div className="horseRacingTab">
      <div style={{width:"70%",height:"40vh",margin:"5px"}}>
      <div className="horseRacingTabHeader">
        <div>
          <span style={{fontSize:"16px",fontWeight:"600"}}>20-20 DRAGON TIGER 2</span>
          <a style={{fontSize:"14px",textDecoration:"underline"}} onClick={()=>setShow(true)}>{' '}RULES</a>
        </div>
        <span>Round ID: 240506171245</span>
      </div>
      <div style={{width:"100%",height:"92%",backgroundColor:"red"}}>
        <VideoFrame time={'1'}/>
      </div>
      </div>
      
      <div style={{width:"70%",margin:"5px"}}>
     <TiePairBox/>
      </div>
      <div style={{width:"70%",margin:"5px",display:"flex",flexDirection:"row",gap:"8px"}}>
     <OddEven name={"DRAGON"}/>
     <OddEven name={"TIGER"}/>
      </div>
      <div style={{width:"70%",margin:"5px",display:"flex",flexDirection:"row",gap:"8px"}}>
     <CardBox name={"DRAGON"} rate={12.00}/>
     <CardBox name={"TIGER"} rate={12.00}/>
      </div>
      <div style={{width:"70%",margin:"5px"}}><CardResultBox /></div>
      <RulesModal show={show} setShow={setShow} rule={dtrules}/>
    </div>
  );
};

export default DragonTigerDesktop;
