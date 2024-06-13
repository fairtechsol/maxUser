import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";
import DynamicTable from "./betTable";
import CardResultBox from "../../commonComponent/cardResultBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PlacedBet from "./placeBet";
import MyBet from "./myBet";
import Card32Result from "./card32Card";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";

const Cards32Desktop = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  // console.log(dragonTigerDetail,"efdsjkn");
  const roundId = (id: any) => {
    const Id = id?.split(".");
    return Id[1];
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ height: "40vh", margin: "5px" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                {dragonTigerDetail?.name}
                </span>
                <a style={{ fontSize: "14px", textDecoration: "underline" }}>
                  {" "}
                  RULES
                </a>
              </div>
              <span>{dragonTigerDetail?.videoInfo
                  ? `Round ID:  ${roundId(dragonTigerDetail?.videoInfo?.mid)}|Min: ${dragonTigerDetail?.videoInfo?.min}|Max: ${dragonTigerDetail?.videoInfo?.max}`
                  : ""}</span>
            </div>
            <div
              style={{ width: "100%", height: "90%", backgroundColor: "#000" }}
            ><VideoFrame time={dragonTigerDetail?.videoInfo?.autotime} result={<Card32Result data={dragonTigerDetail?.videoInfo} />}/></div>
            {/* <Row md={4}> */}

            {/* </Row> */}
          </div>
          <div className="d-flex px-2">
          <DynamicTable  odds={dragonTigerDetail?.set1} data={dragonTigerDetail} />
          <div style={{width:"10px"}}></div>
          <DynamicTable   odds={dragonTigerDetail?.set2} data={dragonTigerDetail} />
        </div>
          {/* <Row>
            <Col>
              {" "}
              <CardsCompnentMobile />
            </Col>
            <Col>
              {" "}
              <CardsCompnentMobile />
            </Col>
          </Row> */}
          <div className="mt-2">
          <CardResultBox/>
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

export default Cards32Desktop;
