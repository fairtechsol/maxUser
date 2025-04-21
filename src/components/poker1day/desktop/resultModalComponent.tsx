import React from "react";
import { Container } from "react-bootstrap";
import { FaTrophy } from "react-icons/fa";
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

const Poker1DayResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const lastCards = resultCards?.slice(4, 9);
  //  console.log(data,'first',resultCards)
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
          flexDirection: isMobile ? "column" : "row",
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
            <div
              className="casino-winner-icon mt-3 p-2"
              style={{
                position: "absolute",
                // left: "100",
                transform: "translateX(-100%)",
              }}
            >
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
            <div
              className="casino-winner-icon mt-3 p-2"
              style={{
                position: "absolute",
                // left: "100",
                transform: "translateX(-100%)",
              }}
            >
              <FaTrophy size={isMobile ? 20 : 40} color="#169733" />
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span className="title-18 f500">Board</span>
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            {lastCards?.map((item: any, index: number) => {
              return <HandleCards card={item} key={index} />;
            })}
          </div>
        </div>
      </div>
      <div></div>
      {data?.bets?.count > 0 && (
        <div className="w-100">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default Poker1DayResultComponent;
