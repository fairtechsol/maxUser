import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";

interface Props {
  data: {
    C1: string;
    C2: string;
    C3: string;
    C4: string;
  };
}


const Card32Result: React.FC<Props> = ({ data }:any) => {
    // console.log(data?.C1, "asd")
  return data?.mid !="0" && (  
    <Container>
      <Row>
        <Col>
          <h6 style={{ color: "white" }}>Player 8</h6>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C1} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 style={{ color: "white" }}>Player 9</h6>
          <div style={{ display: "flex", gap: "10px" }}>
          <HandleCards card={data?.C2} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 style={{ color: "white" }}>Player 10</h6>
          <div style={{ display: "flex", gap: "10px" }}>
          <HandleCards card={data?.C3} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 style={{ color: "white" }}>Player 11</h6>
          <div style={{ display: "flex", gap: "10px" }}>
          <HandleCards card={data?.C4} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Card32Result;
