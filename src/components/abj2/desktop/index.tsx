import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import SBetBox from "./Sbox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../commonComponent/cardResultBox";
import { useRef, useState } from "react";
import RulesModal from "../../commonComponent/rulesModal";
import { abjrules } from "../../../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Col, Container, Row } from "react-bootstrap";
import MyBet from "./myBet";
import PlacedBet from "./placeBet";

const Abj2Desktop = () => {
  const [show, setShow] = useState(false);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const roundId = (id: any) => {
    const Id = id?.split(".");
    return Id[1];
  };
  return (
    <div>
      <Row>
        <Col md={8}>
    <div className="horseRacingTab">
      <div style={{width:"100%",height:"38vh",margin:"5px"}}>
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
      
      <div className="row-flex" style={{width:"100%",margin:"5px"}}>
     <SBetBox type={"A"} odds={dragonTigerDetail?.abjSa} data={dragonTigerDetail}/>
     <SBetBox type={"B"} odds={dragonTigerDetail?.abjSb} data={dragonTigerDetail}/>
      </div>
      <div style={{width:"100%",margin:"5px",display:"flex",flexDirection:"row",gap:"8px"}}>
     <OddEven card={true} odds={dragonTigerDetail?.oddEven} data={dragonTigerDetail}/>
     <OddEven card={false} odds={dragonTigerDetail?.abjCards} data={dragonTigerDetail}/>
      </div>
      <div style={{width:"100%",margin:"5px",display:"flex",flexDirection:"row",gap:"8px"}}>
     <CardBox  rate={12} cards={dragonTigerDetail?.cards} data={dragonTigerDetail}/>
      </div>
      <div style={{width:"100%",margin:"5px"}}><CardResultBox /></div>
      <RulesModal show={show} setShow={setShow} rule={abjrules}/>
    </div>
    </Col>
    <Col md={4}>
          <Container className="p-0" fluid ref={placeBetRef}>
            <Row
              className={` ${isSticky ? "position-fixed top-0" : ""}`}
              style={{
                width: isSticky
                  ? placeBetRef.current?.offsetWidth + "px"
                  : "100%",
              }}
            >
              <Col md={12}>
                <PlacedBet />
              </Col>
              <Col md={12}>
                <MyBet />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Abj2Desktop;
