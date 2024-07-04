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

const Crick5Result: React.FC<Props> = ({ data }: any) => {
  const elements = data?.desc?.split(",");

  let result: string[][] = [[], [], [], []];
  if (elements) {
    elements?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }
  // console.log(result,"sjhn")
  const allKeys = Object.keys(data ? data : 0);
  const cArray = allKeys?.filter((key) => /^C\d+$/.test(key));
  const numbers = cArray.map((key) => Number(data[key]));
  const max = Math.max(...numbers);
  return (
    data?.mid != "0" && (
      <Container>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <HandleCards card={data?.C1} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px"  }}>
              <HandleCards card={data?.C2} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px"  }}>
              <HandleCards card={data?.C3} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px"  }}>
              <HandleCards card={data?.C4} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px"  }}>
              <HandleCards card={data?.C5} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <HandleCards card={data?.C6} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Crick5Result;
