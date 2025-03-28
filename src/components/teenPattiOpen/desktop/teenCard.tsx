import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { isMobile } from "../../../utils/screenDimension";
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

const TeenOpenResult: React.FC<Props> = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col>
            <span
              style={{ color: "white", fontWeight: "bolder" }}
              className={isMobile ? "title-12" : "title-16"}
            >
              DEALER
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <HandleCards card={data?.[8] !== "1" ? data?.[8] : ""} />
              <HandleCards card={data?.[17] !== "1" ? data?.[17] : ""} />
              <HandleCards card={data?.[26] !== "1" ? data?.[26] : ""} />
            </div>
          </Col>
        </Row>
        <Row />
      </Container>
    )
  );
};

export default TeenOpenResult;
