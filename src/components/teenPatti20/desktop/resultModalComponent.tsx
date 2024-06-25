import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import isMobile from "../../../utils/screenDimension";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Teen20ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const playerA = resultCards?.filter(
    (_: any, index: number) => index % 2 === 0
  );
  const playerB = resultCards?.filter(
    (_: any, index: number) => index % 2 !== 0
  );

 
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="teen20resultModal">
        <div className="teen20resultCardContainer">
          <span className="fs-5">Player A</span>
          <div className={isMobile ? 'row-flex-mobile' : "d-sm-flex flex-row justify-content-center align-items-center mb-2"}>
          {data?.result?.win === "2" && (
              <div className="casino-winner-icon">
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={playerA?.[0]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={playerA?.[1]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={playerA?.[2]} />
            </div>
          </div>
        </div>
        <div className="teen20resultCardContainer">
          <span className="fs-5">Player B</span>
          <div className={isMobile ? 'row-flex-mobile' : "d-sm-flex flex-row justify-content-center align-items-center mb-2"}>
            {data?.result?.win === "3" && (
              <div className="casino-winner-icon">
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={playerB?.[0]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={playerB?.[1]} />
            </div>
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={playerB?.[2]} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Teen20ResultComponent;
