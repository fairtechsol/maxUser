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

const QueenCard: React.FC<Props> = ({ data }: any) => {
  const elements = data?.desc?.split(",");

  let result: string[][] = [[], [], [], []];
  if (elements) {
    elements?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }

  const allKeys = Object.keys(data ? data : 0);
  const cArray = allKeys?.filter((key) => /^C\d+$/.test(key));
  const numbers = cArray.map((key) => Number(data[key]));
  const max = Math.max(...numbers);

  const handleCount = (cards: any, count: any) => {
    const getCardValue = (card: any) => {
      const value = card.slice(0, -2);
      switch (value) {
        case "J":
          return 11;
        case "Q":
          return 12;
        case "K":
          return 13;
        case "A":
          return 1;
        default:
          return parseInt(value, 10);
      }
    };

    const sum = cards.reduce((accumulator: any, card: any) => {
      if (card === "1") return accumulator;
      return accumulator + getCardValue(card);
    }, count);
    return sum;
  };

  const total0 = handleCount(result?.[0], 0);
  const total1 = handleCount(result?.[1], 1);
  const total2 = handleCount(result?.[2], 2);
  const total3 = handleCount(result?.[3], 3);


  const maxSum = Math.max(total0, total1, total2, total3);

  return (
    data?.mid != "0" && (
      <Container style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} className={isMobile ? "title-12" : "title-16"}>
        {result?.[0]?.[0] !== "1" && (
          <Row>
            <Col>
              <span
                style={{
                  color:
                  total0 === maxSum && maxSum != 0 ? "#086f3f" : "#fff",
                  fontWeight: "600",
                 
                }}
                
              >
                {total0 > 0 ? (
                  <>
                    Total 0:{" "}
                    <span style={{ color: "#FFC107" }}>
                      {total0}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {result?.[0]?.map((item: any) => {
                  return <HandleCards card={item != "1" ? item : ""} />;
                })}
              </div>
            </Col>
          </Row>
        )}
        {result?.[1]?.[0] !== "1" && (
          <Row>
            <Col>
              <span
                style={{
                  color:
                  total1 === maxSum && maxSum != 0 ? "#086f3f" : "#fff",
                  fontWeight: "600",
                 
                }}
              >
                {total1 > 0 ? (
                  <>
                    Total 1:{" "}
                    <span style={{ color: "#FFC107" }}>
                      {total1}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {result?.[1]?.map((item: any) => {
                  return <HandleCards card={item != "1" ? item : ""} />;
                })}
              </div>
            </Col>
          </Row>
        )}
        {result?.[2]?.[0] !== "1" && (
          <Row>
            <Col>
              <span
                style={{
                  color:
                  total2 === maxSum && maxSum != 0 ? "#086f3f" : "#fff",
                  fontWeight: "600",
                 
                }}
              >
                {total2 > 0 ? (
                  <>
                    Total 2:{" "}
                    <span style={{ color: "#FFC107" }}>
                      {total2}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {result?.[2]?.map((item: any) => {
                  return <HandleCards card={item != "1" ? item : ""} />;
                })}
              </div>
            </Col>
          </Row>
        )}
        {result?.[3]?.[0] !== "1" && (
          <Row>
            <Col>
              <span
                style={{
                  color:
                  total3 === maxSum && maxSum != 0 ? "#086f3f" : "#fff",
                  fontWeight: "600",
                 
                }}
              >
                {total2 > 0 ? (
                  <>
                    Total 3:{" "}
                    <span style={{ color: "#FFC107" }}>
                      {total3}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {result?.[3]?.map((item: any) => {
                  return <HandleCards card={item != "1" ? item : ""} />;
                })}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    )
  );
};

export default QueenCard;
