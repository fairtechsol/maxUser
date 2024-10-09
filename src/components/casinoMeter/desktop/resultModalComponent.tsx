import React from "react";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { Container } from "react-bootstrap";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";

const CasinoMeterResultComponent: React.FC<any> = ({ data }) => {
  const lowCards: string[] = [];
  const highCards: string[] = [];
  let spadeCard = "";

  let lowCardSum = 0;
  let highCardSum = 0;

  const cards = data?.result?.cards?.split(",");

  cards?.forEach((card: any) => {
    if (card?.length < 3) return;
    if (card == "9HH" || card == "10HH") {
      spadeCard = spadeCard + card + ",";
      return;
    }
    const firstChar = card[0];

    if (
      firstChar === "1" ||
      firstChar === "J" ||
      firstChar === "Q" ||
      firstChar === "K"
    ) {
      highCards.push(card);
      highCardSum =
        highCardSum +
        (firstChar == "1"
          ? 10
          : firstChar == "J"
          ? 11
          : firstChar == "Q"
          ? 12
          : firstChar == "K"
          ? 13
          : 0);
    } else {
      lowCards.push(card);
      lowCardSum = lowCardSum + (firstChar == "A" ? 1 : Number(firstChar));
    }
  });

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "90%" }}>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",

              alignItems: "center",
              width: "100%",
            }}
          >
            <span style={{ width: "15%" }}>Low Cards</span>
            <div
              style={{
                width: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {lowCards?.map((card, index) => (
                <span key={index} style={{ margin: "5px" }}>
                  {isMobile ? (
                    <HandleCards card={card} />
                  ) : (
                    <HandleCards card={card} />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",

              alignItems: "center",
              width: "100%",
            }}
          >
            <span style={{ width: "15%" }}>High Cards</span>
            <div
              style={{
                width: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {highCards.map((card, index) => (
                <span key={index} style={{ margin: "5px" }}>
                  {isMobile ? (
                    <HandleCards card={card} />
                  ) : (
                    <HandleCards card={card} />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          {/* <HandleCards card="9HH" /> */}
          {spadeCard?.split(",")?.map((crd) => {
            return <HandleCards card={crd} />;
          })}
        </div>
      </div>

      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "5px",
          marginTop: "5px",
          boxShadow: "0 0 4px -1px",
        }}
      >
        <span style={{ color: "#000000", opacity: "0.6", marginRight: "5px" }}>
          Winner{" "}
        </span>
        {lowCardSum > highCardSum ? " Low" : " High"}
      </div>
    </Container>
  );
};

export default CasinoMeterResultComponent;
