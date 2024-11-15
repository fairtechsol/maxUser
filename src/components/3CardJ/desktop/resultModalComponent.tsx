import React from "react";
import { Container } from "react-bootstrap";
import { isMobile } from "../../../utils/screenDimension";
import { HandleCards } from "../../commonComponent/cardsComponent";
import ResultBetList from "../../commonComponent/resultBetList";
import "./style.scss";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const CardJResultComponent: React.FC<Props> = ({ data }: any) => {
  const result = data?.result?.cards?.split("*");
  const elementsAndar = result?.[0]?.split(",");

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="abjresultModal mb-2">
        <div className="w-100 abjresultCardContainer2">
          <div
            style={{
              width: isMobile ? "100%" : "90%",
              margin: "8px 9px 10px 11px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {elementsAndar?.map((item: any, index: any) => (
                    <HandleCards key={index} card={item} />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "6px",
                    boxShadow: "0 0 4px -1px rgba(0, 0, 0, 0.5)",
                    marginTop: "10px",
                    color: "#9e9e9e",
                    paddingRight: "30px",
                    paddingLeft: "30px",
                    width: isMobile ? "100%" : "40%",
                  }}
                >
                  {" "}
                  Result
                  {elementsAndar?.map((item: any) => (
                    <div style={{ color: "#000" }}>
                      {item[0] == "1" ? "10" : item[0]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data?.bets?.count > 0 && (
        <div className="w-100">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default CardJResultComponent;
