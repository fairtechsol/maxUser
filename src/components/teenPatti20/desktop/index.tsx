import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import CardResultBox from "../../commonComponent/cardResultBox";
import PlacedBet from "../../gameDetails/desktop/placeBet";
import MyBet from "../../gameDetails/desktop/myBet";
import { useRef, useState } from "react";

const TeenPattiDesktop = () => {
  const placeBetRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const dummyData = [
    {
      player: "Player A",
      odds: "1.98",
      pairPlus: "Pair plus A",
      isSuspended: true,
    },
    {
      player: "Player B",
      odds: "1.98",
      pairPlus: "Pair plus B",
      isSuspended: true,
    },
  ];
  const dummyData2 = [
    { label: "Pair (Double)", value: "1 To 1" },
    { label: "Flush (Color)", value: "1 To 4" },
    { label: "Straight (Rown)", value: "1 To 6" },
    { label: "Trio (Teen)", value: "1 To 35" },
    { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  ];
  return (
    <Container>
      <Row>
        <Col md={8}>
          <div style={{ height: "40vh", margin: "5px" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  20-20 TEENPATTI
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
            <div className="table-responsive coupon-table">
              <Table bordered className="tablebg">
                <thead>
                  <tr>
                    <th className="box-5"></th>
                    <th className="box-2 back-color text-center">BACK</th>
                    <th className="box-3 back-color"></th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((row, index) => (
                    <tr
                      key={index}
                      className={`bet-info ${
                        row.isSuspended ? "suspended" : ""
                      }`}
                      data-title={row.isSuspended ? "SUSPENDED" : ""}
                    >
                      <td className="box-5">
                        <b>{row.player}</b>
                      </td>
                      <td className="text-center box-2 back">
                        <Button variant="link" className="back">
                          <span className="d-block text-bold odd">
                            <b className="fontb">{row.odds}</b>
                          </span>
                          <span
                            className="d-block fontb"
                            style={{ color: "black" }}
                          >
                            0
                          </span>
                        </Button>
                      </td>
                      <td className="text-center box-3 back">
                        <Button variant="link" className="back">
                          <span className="d-block text-bold odd">
                            <b className="fontb">{row.pairPlus}</b>
                          </span>
                          <span
                            className="d-block fontb"
                            style={{ color: "black" }}
                          >
                            0
                          </span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <CardResultBox />
          </div>
        </Col>
        <Col md={4} className="ps-0">
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
              <Col>
                <div className="casino-title" style={{ position: "relative" }}>
                  <span>Rules</span>
                </div>
                <div className="table-responsive rules-table">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th colSpan={2} className="box-10 text-center">
                          Pair Plus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyData2.map((item, index) => (
                        <tr key={index}>
                          <td className="box-7">{item.label}</td>
                          <td className="box-3">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default TeenPattiDesktop;
