import React from "react";
import { Container} from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const Card32ResultComponent: React.FC<Props> = ({ data }: any) => {
console.log("data",data)
const resultCards = data?.result?.cards?.split(',')
const desc = data?.result?.desc?.split('*')
const resultData = desc?.[0]?.split('|')
const dragonData = desc?.[1]?.split('|')
const tigerData = desc?.[2]?.split('|')
const dragonCard = dragonData?.[2]
const tigerCard  = tigerData?.[2]

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div className="card32resultModal">
        <div className="card32resultCardContainer">
          <span className="fs-5">Player 8</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
            {data?.result?.win === "1" && (
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
              <HandleCards card={resultCards?.[0]} />
            </div>
          </div>
        </div>
        <div className="card32resultCardContainer">
          <span className="fs-5">Player 9</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
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
              <HandleCards card={resultCards?.[1]} />
            </div>
          </div>
        </div>
        <div className="card32resultCardContainer">
          <span className="fs-5">Player 10</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
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
              <HandleCards card={resultCards?.[1]} />
            </div>
          </div>
        </div>
        <div className="card32resultCardContainer">
          <span className="fs-5">Player 11</span>
          <div className="d-sm-flex flex-row justify-content-center align-items-center">
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
              <HandleCards card={resultCards?.[1]} />
            </div>
          </div>
        </div>
      </div>
     
    </Container>
  );
};

export default Card32ResultComponent;
