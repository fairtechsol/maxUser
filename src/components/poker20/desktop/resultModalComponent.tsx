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

const Poker20ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const lastCards = resultCards?.slice(4, 9);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data?.result?.win === "11" && (
            <div className="casino-winner-icon mt-3 p-2">
              <FaTrophy size={isMobile ? 20 : 40} color="#169733" />
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="title-18 f500">Player A</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <HandleCards card={resultCards?.[0]} />
              <HandleCards card={resultCards?.[1]} />
            </div>
          </div>
        </div>
        {data?.result?.win === "0" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="title-18 f500">Tie</span>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="title-18 f500">Player B</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <HandleCards card={resultCards?.[2]} />
              <HandleCards card={resultCards?.[3]} />
            </div>
          </div>
          {data?.result?.win === "21" && (
            <div className="casino-winner-icon mt-3 p-2">
              <FaTrophy size={isMobile ? 20 : 40} color="#169733" />
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="title-18 f500">Board</span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            marginBottom: "10px",
          }}
        >
          {lastCards?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <HandleCards card={item} />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Poker20ResultComponent;
