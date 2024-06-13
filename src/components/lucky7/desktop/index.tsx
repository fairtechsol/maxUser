import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../commonComponent/cardResultBox";
import { useRef, useState } from "react";
import RulesModal from "../../commonComponent/rulesModal";
import { luckyrules } from "../../../assets/images";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PlacedBet from "./placeBet";
import MyBet from "../../abj2/desktop/myBet";
import VideoFrame from "../../commonComponent/videoFrame/VideoFrame";
import Lucky7Result from "./lucky7Card";

const Lucky7Desktop = () => {
  const [show, setShow] = useState(false);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
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
            <div style={{ width: "100%", height: "40vh", margin: "5px" }}>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    {dragonTigerDetail?.name}
                  </span>
                  <a
                    style={{ fontSize: "14px", textDecoration: "underline" }}
                    onClick={() => setShow(true)}
                  >
                    {" "}
                    RULES
                  </a>
                </div>
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${roundId(dragonTigerDetail?.videoInfo?.mid)}`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "92%",
                  backgroundColor: "#000",
                }}
              ><VideoFrame time={dragonTigerDetail?.videoInfo?.autotime} result={<Lucky7Result data={dragonTigerDetail?.videoInfo} />}/></div>
            </div>

            <div style={{ width: "100%", margin: "5px" }}>
              <TiePairBox
                lowHigh={dragonTigerDetail?.lowHigh}
                data={dragonTigerDetail}
              />
            </div>
            <div
              style={{
                width: "100%",
                margin: "5px",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <OddEven
                name={"DRAGON"}
                odds={dragonTigerDetail?.redBlack}
                data={dragonTigerDetail}
                card={true}
              />

              <OddEven
                name={"TIGER"}
                odds={dragonTigerDetail?.luckOdds}
                card={false}
                data={dragonTigerDetail}
              />
            </div>
            <div
              style={{
                width: "100%",
                margin: "5px",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <CardBox
                cardData={dragonTigerDetail?.luckyCards}
                data={dragonTigerDetail}
                rate={dragonTigerDetail?.luckyCards?.rate}
              />
            </div>
            <div style={{ width: "100%", margin: "5px" }}>
              <CardResultBox />
            </div>
            <RulesModal show={show} setShow={setShow} rule={luckyrules} />
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

export default Lucky7Desktop;
