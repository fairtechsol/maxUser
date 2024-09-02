import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Card32BResultComponent: React.FC<Props> = ({ data }: any) => {
  const descParts = data?.result?.desc?.split("|");
  const winner = descParts?.[0];
  const oddEven = descParts?.[1]
    ?.split(",")
    ?.map((item: any) => item?.replace(":", " : "))
    ?.join(" | ");
  const blackRed = descParts?.[2]?.includes("Black:Yes") ? "Black" : "Red";
  const single = descParts?.[3];
  const total = descParts?.[4];

  const resultCards = data?.result?.cards?.split(",");
  let result: string[][] = [[], [], [], []];
  if (resultCards) {
    resultCards?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }
  // const max = Math.max(...numbers);
  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="card32resultModal d-flex flex-column flex-md-row align-items-center">
        {["Player 8", "Player 9", "Player 10", "Player 11"].map(
          (player, index) => (
            <div className="card32resultCardContainer mb-3 " key={player}>
              <span style={{ fontSize: isMobile ? "14px" : "20px" }}>
                {player}
              </span>
              <div className="d-flex  flex-row justify-content-center align-items-center">
                {result?.[index]?.map(
                  (item: any) =>
                    item !== "1" && (
                      <div
                        key={item}
                        style={{
                          borderRadius: "1px",
                          marginLeft: "5px",
                          marginBottom: isMobile ? "5px" : "0", // Adds space between cards in column layout
                        }}
                      >
                        <HandleCards card={item} />
                      </div>
                    )
                )}
                {data?.result?.win === (index + 1).toString() && (
                  <div className="casino-winner-icon">
                    <FaTrophy size={30} color="#169733" />
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>

      <div
        style={{
          width: "50%",
          textAlign: "center",
          boxShadow: "0 0 4px -1px",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <strong style={{ opacity: "0.6" }}>Winner: </strong> {winner}
        </div>
        <div>
          <strong style={{ opacity: "0.6" }}>Odd/Even:</strong> {oddEven}
        </div>
        <div>
          <strong style={{ opacity: "0.6" }}>Black/Red:</strong> {blackRed}
        </div>
        <div>
          <strong style={{ opacity: "0.6" }}>Single:</strong> {single}
        </div>
        <div>
          <strong style={{ opacity: "0.6" }}>Total:</strong> {total}
        </div>
      </div>
    </Container>
  );
};

export default Card32BResultComponent;
