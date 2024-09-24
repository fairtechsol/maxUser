import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import ResultBetList from "../../commonComponent/resultBetList";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Dragon20ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  const desc = data?.result?.desc?.split("*");
  const resultData = desc?.[0]?.split("|");
  const dragonData = desc?.[1]?.split("|");
  const tigerData = desc?.[2]?.split("|");
  const dragonCard = dragonData?.[2];
  const tigerCard = tigerData?.[2];

  function splitCard(cardString: string) {
    const parts = cardString?.split("Card");
    return parts.length > 1 ? parts[1].trim() : cardString;
  }

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="dt20resultModal" style={{display:"flex",flexDirection:isMobile?"column":"row" ,justifyContent:"center" ,alignItems:"center"}}>
        <div className="dt20resultCardContainer">
          <span className="fs-5">Dragon</span>
          <div
            className={
              isMobile
                ? "row-flex-mobile"
                : "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
            {data?.result?.win === "1" && (
              <div className="casino-winner-icon">
                <FaTrophy size={isMobile ? 20 : 30} color="#169733" />
              </div>
            )}
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[0]} />
            </div>
          </div>
        </div>
        <div className="dt20resultCardContainer">
          <span className="fs-5">Tiger</span>
          <div
            className={
              isMobile
                ? "row-flex-mobile"
                : "d-sm-flex flex-row justify-content-center align-items-center"
            }
          >
            <div
              style={{
                border: "1px solid #fdef34",
                borderRadius: "1px",
                marginLeft: "5px",
              }}
            >
              <HandleCards card={resultCards?.[1]} />
            </div>
            {data?.result?.win === "2" && (
              <div className="casino-winner-icon">
                <FaTrophy size={isMobile ? 20 : 30} color="#169733" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-100 d-sm-flex justify-content-center align-items-center mt-2">
        <div
          className={
            isMobile
              ? "w-100 d-flex flex-column justify-content-center align-items-center p-4 mb-2"
              : "w-50 d-sm-flex flex-sm-column justify-content-center align-items-center p-4 mb-2"
          }
          style={{ boxShadow: "0 0 4px -1px" }}
        >
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonText">Winner</span>
            <span className="dt20CommonText-2">{resultData?.[0]}</span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonText">Pair</span>
            <span className="dt20CommonText-2">{resultData?.[1]}</span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonText">Odd/Even</span>
            <span className="dt20CommonText-2">
              D : {dragonData?.[1]} | T : {tigerData?.[1]}
            </span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonText">Color</span>
            <span className="dt20CommonText-2">
              D : {dragonData?.[0]} | T : {tigerData?.[0]}
            </span>
          </div>
          <div className="d-sm-flex flex-sm-row">
            <span className="dt20CommonText">Card</span>
            <span className="dt20CommonText-2">
              D : {dragonCard && splitCard(dragonCard)} | T :{" "}
              {tigerCard && splitCard(tigerCard)}
            </span>
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

export default Dragon20ResultComponent;
