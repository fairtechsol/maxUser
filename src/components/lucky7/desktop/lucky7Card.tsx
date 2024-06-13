import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";

interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Lucky7Result: React.FC<Props> = ({ data }:any) => {
  return data?.mid !="0" && (  
    <Container>
      <Row>
        <Col className="mt-2">
        <h6 style={{ color: "white" }}>CARD</h6>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C1} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Lucky7Result;
