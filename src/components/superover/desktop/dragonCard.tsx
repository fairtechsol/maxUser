import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";

interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Dragon20Result: React.FC<Props> = ({ data }:any) => {
  return data?.mid !="0" && (  
    <Container>
      <Row>
        <Col className="mt-2">
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C1} />
            <HandleCards card={data?.C2} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dragon20Result;
