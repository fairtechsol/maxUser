import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import {isMobile} from "../../../utils/screenDimension";

interface Props {
  data: {
    C1: string;
    C2: string;
    C3: string;
    C4: string;
    C5: string;
    C6: string;
    C7: string;
    C8: string;
    C9: string;
  };
}

const Poker1DayResult: React.FC<Props> = ({ data }:any) => {
  return data?.mid !="0" && (  
    <Container>
      <Row>
        <Col>
          <span style={{ color: "white",fontWeight:"bolder",fontSize: isMobile ? "12px" : "" }}>PLAYER A</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C1} />
            <HandleCards card={data?.C2} />
          </div>
        </Col>
        <Col>
          <span style={{ color: "white",fontWeight:"bolder",fontSize: isMobile ? "12px" : ""   }}>PLAYER B</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C3} />
            <HandleCards card={data?.C4} />
          </div>
        </Col>
      </Row>
      <Row>
      <Col>
          <span style={{ color: "white",fontWeight:"bolder",fontSize: isMobile ? "12px" : ""   }}>BOARD</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <HandleCards card={data?.C5} />
            <HandleCards card={data?.C6} />
            <HandleCards card={data?.C7} />
            <HandleCards card={data?.C8} />
            <HandleCards card={data?.C9} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Poker1DayResult;
