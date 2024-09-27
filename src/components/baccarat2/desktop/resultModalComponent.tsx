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

const Bacarrate2ResultComponent: React.FC<Props> = ({ data }: any) => {
  const elements = data?.result?.cards?.split(",");
  
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="bacarrate-result d-flex flex-column flex-md-row">
        <div className="bacarrate-player-result">
          <span className="title-18 f500 mb-2">Player</span>
          <div className="bacarrate-player-card">
            {data?.result?.win === "1" && (
              <div className="casino-winner-icon">
                <FaTrophy size={isMobile ? 18 : 26} color="#169733" />
              </div>
            )}
            {elements?.[4] != "1" && (
              <div style={{ transform: "rotate(270deg)" }}>
                <HandleCards card={elements?.[4]} />
              </div>
            )}
            <HandleCards card={elements?.[2]} />
            <HandleCards card={elements?.[0]} />
          </div>
        </div>

        {data?.result?.win === "3" && (
          <div className="bacarrate-player-result">
            <span className="title-18 f500">Tie</span>
          </div>
        )}

        <div className="bacarrate-player-result">
          <span className="title-18 f500 mb-2">Banker</span>
          <div className="bacarrate-player-card">
            <HandleCards card={elements?.[1]} />
            <HandleCards card={elements?.[3]} />
            {elements?.[5] != "1" && (
              <div style={{ transform: "rotate(90deg)" }}>
                <HandleCards card={elements?.[5]} />
              </div>
            )}
            {(data?.result?.win === "2" || data?.result?.win === "4") && (
              <div className="casino-winner-icon">
                <FaTrophy size={isMobile ? 18 : 26} color="#169733" />
              </div>
            )}
          </div>
        </div>
      </div>
      {
        data?.bets?.count > 0 && 
        <div className="w-100">
        <ResultBetList bets={data?.bets?.rows ?? 12} total={data?.bets?.count}/>
      </div>
      }
    </Container>
  );
};

export default Bacarrate2ResultComponent;
