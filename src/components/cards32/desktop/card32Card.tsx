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

const Card32Result: React.FC<Props> = ({ data }: any) => {
  const elements = data?.desc?.split(",");

  let result: string[][] = [[], [], [], []];
  if (elements) {
    elements?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }

  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col>
            <h6 style={{ color: "white" }}>Player 8:{data?.C1}</h6>
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              {result?.[0]?.map((item: any) => {
                return <HandleCards card={item != "1" ? item : ""} />;
              })}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 style={{ color: "white" }}>Player 9:{data?.C2}</h6>
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              {result?.[1]?.map((item: any) => {
                return <HandleCards card={item != "1" ? item : ""} />;
              })}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 style={{ color: "white" }}>Player 10:{data?.C3}</h6>
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              {result?.[2]?.map((item: any) => {
                return <HandleCards card={item != "1" ? item : ""} />;
              })}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 style={{ color: "white" }}>Player 11:{data?.C4}</h6>
            <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
              {result?.[3]?.map((item: any) => {
                return <HandleCards card={item != "1" ? item : ""} />;
              })}
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Card32Result;
