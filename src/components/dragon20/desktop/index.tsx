import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import TiePairBox from "./TiePairBox";
import OddEven from "./OddEvenBox";
import CardBox from "./CardsBox";
import CardResultBox from "../../commonComponent/cardResultBox";
import RulesModal from "../../commonComponent/rulesModal";
import { useRef, useState } from "react";
import { dtrules } from "../../../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PlacedBet from "./placeBet";
import MyBet from "./myBet";
import { Col, Container, Row } from "react-bootstrap";

const DragonTigerDesktop = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky] = useState(false);
  const roundId = (id: any) => {
    const Id = id?.split(".");
    return Id[1];
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "100%", height: "40vh", margin: "5px" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {dragonTigerDetail?.name}
                </span>
                <span
                  style={{ fontSize: "14px", textDecoration: "underline" }}
                  onClick={() => setShow(true)}
                >
                  {" "}
                  RULES
                </span>
              </div>
              <span>
                {dragonTigerDetail?.videoInfo
                  ? `Round ID:  ${roundId(dragonTigerDetail?.videoInfo?.mid)}`
                  : ""}
              </span>
            </div>
            <div
              style={{ width: "100%", height: "92%", backgroundColor: "#000" }}
            ></div>
          </div>

          <div style={{ width: "100%", margin: "5px" }}>
            <TiePairBox
              tiePair={dragonTigerDetail?.tiePair}
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
              odds={dragonTigerDetail?.dragonOdds}
              data={dragonTigerDetail}
            />
            <OddEven
              name={"TIGER"}
              odds={dragonTigerDetail?.tigerOdds}
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
              name={"DRAGON"}
              cardData={dragonTigerDetail?.dragonCards}
              data={dragonTigerDetail}
            />
            <CardBox
              name={"TIGER"}
              cardData={dragonTigerDetail?.tigerCards}
              data={dragonTigerDetail}
            />
          </div>
          <div style={{ width: "100%", margin: "5px" }}>
            <CardResultBox />
          </div>
          <RulesModal show={show} setShow={setShow} rule={dtrules} />
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

export default DragonTigerDesktop;
