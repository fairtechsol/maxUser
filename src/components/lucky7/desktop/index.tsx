import React, { useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import "./style.scss";
import PlacedBet from '../../gameDetails/desktop/placeBet';
import MyBet from '../../gameDetails/desktop/myBet';
const Lucky7Desktop = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [odds, setOdds] = useState({ low: 2.00, high: 2.00 });
  const [min, setMin] = useState(100);
  const [max, setMax] = useState(100000);
  const [cardImage, setCardImage] = useState('https://dzm0kbaskt4pv.cloudfront.net/v17/static/front/img/andar_bahar/7.jpg');
  const [lowCardCount, setLowCardCount] = useState(0);
  const [highCardCount, setHighCardCount] = useState(0);
  return (
    <Container>
      <Row>
        <Col md={8}>
        <div style={{ height: "40vh", margin: "5px" }}>
        <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                 LUCKY 7 A
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
       </div>
       <Container className="card-content lucky-seven-content mt-3">
      <Row>
        <Col xs={5} className="text-center">
          <b>{odds.low.toFixed(2)}</b>
        </Col>
        <Col xs={2}></Col>
        <Col xs={5} className="text-center">
          <b>{odds.high.toFixed(2)}</b>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={5} className="text-center">
          <Button className="text-uppercase btn-theme"><b>LOW Card</b></Button>
          <div className="mt-2" style={{ color: 'black' }}>{lowCardCount}</div>
        </Col>
        <Col xs={2} className="text-center card-seven">
          <img src={cardImage} alt="Card" />
        </Col>
        <Col xs={5} className="text-center">
          <Button className="text-uppercase btn-theme"><b>HIGH Card</b></Button>
          <div className="mt-2" style={{ color: 'black' }}>{highCardCount}</div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-right">
          <span className="mr-3">
            <b>Min:</b> <span>{min}</span>
          </span>
          <span className="mr-3">
            <b>Max:</b> <span>{max}</span>
          </span>
        </Col>
      </Row>
    </Container>
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
    </Container>
  )
}

export default Lucky7Desktop;