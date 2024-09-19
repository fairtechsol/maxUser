import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { isMobile } from "../../../utils/screenDimension";

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

const TeenTestResult: React.FC<Props> = ({ data }:any) => {

  return data?.mid !="0" && (  
    <Container>
      <Row>
        <Col>
          <span style={{ color: "white",fontWeight:"bolder" }} className={isMobile ? "title-12" : "title-16"}>TIGER</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C1} />
            <HandleCards card={data?.C2} />
            <HandleCards card={data?.C3} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <span style={{ color: "white",fontWeight:"bolder"  }} className={isMobile ? "title-12" : "title-16"}>LION</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C4} />
            <HandleCards card={data?.C5} />
            <HandleCards card={data?.C6} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <span style={{ color: "white",fontWeight:"bolder"  }} className={isMobile ? "title-12" : "title-16"}>DRAGON</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C7} />
            <HandleCards card={data?.C8} />
            <HandleCards card={data?.C9} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TeenTestResult;
