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
            {/* <HandleCards card={data?.C2} />
            <HandleCards card={data?.C3} /> */}
          </div>
        </Col>
      </Row>
      <Row>
        {/* <Col>
          <span style={{ color: "white",fontWeight:"bolder"  }}>PLAYER B</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C4} />
            <HandleCards card={data?.C5} />
            <HandleCards card={data?.C6} />
          </div>
        </Col> */}
      </Row>
    </Container>
  );
};

export default CasinoWarResult;
