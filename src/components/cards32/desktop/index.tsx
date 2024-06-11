import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";
import PlacedBet from "../../gameDetails/desktop/placeBet";
import MyBet from "../../gameDetails/desktop/myBet";
import DynamicTable from "./betTable";
import CardResultBox from "../../commonComponent/cardResultBox";
const runners = [
  {
    name: 'Player 8',
    profitLoss: 0,
    backPrice: '12.20',
    backSize: '1000000',
    layPrice: '13.70',
    laySize: '1000000'
  },
  {
    name: 'Player 9',
    profitLoss: 0,
    backPrice: '5.95',
    backSize: '1000000',
    layPrice: '6.45',
    laySize: '1000000'
  },
];
const Lucky7Desktop = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const halfIndex = Math.ceil(runners.length / 2);
  const firstHalf = runners.slice(0, halfIndex);
  const secondHalf = runners.slice(halfIndex);
  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ height: "40vh", margin: "5px" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  CARDS 32-A
                </span>
                <a style={{ fontSize: "14px", textDecoration: "underline" }}>
                  {" "}
                  RULES
                </a>
              </div>
              <span>Round ID: 240506171245</span>
            </div>
            <div
              style={{ width: "100%", height: "90%", backgroundColor: "#000" }}
            ></div>
            {/* <Row md={4}> */}

            {/* </Row> */}
          </div>
          <div className="bet-table-container">
          <DynamicTable  />
          <DynamicTable  />
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

export default Lucky7Desktop;
