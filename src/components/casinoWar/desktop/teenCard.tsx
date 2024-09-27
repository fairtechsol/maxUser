import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";

interface Props {
  data: {
    C1: string;
    C2: string;
    C3: string;
    C4: string;
    C5: string;
    C6: string;
  };
}

const CasinoWarResult: React.FC<Props> = ({ data }:any) => {
  return data?.mid !="0" && (  
    <Container>
      <Row>
        <Col>
          <span style={{ color: "white",fontWeight:"bolder" }}>DEALER</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C7} />
          </div>
        </Col>
      </Row>
      <Row>
      </Row>
    </Container>
  );
};

export default CasinoWarResult;
