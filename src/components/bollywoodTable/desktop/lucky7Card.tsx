import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";

interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Lucky7Result: React.FC<Props> = ({ data }: any) => {
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col className="mt-2" style={{ backgroundColor: "rgb(0 0 0 / 8%)" }}>
            <div>
              <HandleCards card={data?.C1} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Lucky7Result;
