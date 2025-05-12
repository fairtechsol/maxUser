import React from "react";
import { Container } from "react-bootstrap";
import { FaTrophy } from "react-icons/fa";
import { isMobile } from "../../../utils/screenDimension";
import { HandleCards } from "../../commonComponent/cardsComponent";
import ResultBetList from "../../commonComponent/resultBetList";
import "../../commonStyle.scss";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Teen1DResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const playerA = resultCards?.filter(
    (_: any, index: number) => index % 2 === 0
  );
  const playerB = resultCards?.filter(
    (_: any, index: number) => index % 2 !== 0
  );

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="teen20resultModal d-flex flex-column flex-md-row "
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <div
          className="teen20resultCardContainer w-100 w-md-50 border-all border-md-right d-flex flex-row flex-md-column p-2 "
          style={{ borderRight: "1px solid #bfbfbf" }}
        >
          <span className="fs-5">Player A</span>
          <div
            className={
              isMobile
                ? "row-flex-mobile"
                : "d-sm-flex flex-row justify-content-center align-items-center mb-2 gap-2"
            }
          >
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
            {data?.result?.win === "1" && (
              <div
                className="casino-winner-icon ml-5"
                style={{ marginLeft: "5px" }}
              >
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
          </div>
        </div>

        <div className="teen20resultCardContainer w-100 w-md-50 border-all border-md-none mt-2 mt-md-0 d-flex flex-row flex-md-column p-2 ">
          <span className="fs-5">Player B</span>
          <div
            className={
              isMobile
                ? "row-flex-mobile"
                : "d-sm-flex flex-row justify-content-center gap-2 align-items-center mb-2"
            }
          >
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
            {data?.result?.win === "2" && (
              <div
                className="casino-winner-icon ml-2 ml-md-5"
                style={{ marginLeft: "5px" }}
              >
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
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

export default Teen1DResultComponent;
