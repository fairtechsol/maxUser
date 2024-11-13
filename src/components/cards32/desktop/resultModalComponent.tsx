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

const Card32ResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  let result: string[][] = [[], [], [], []];
  if (resultCards) {
    resultCards?.forEach((item: any, index: any) => {
      const targetArray = index % 4;
      result[targetArray].push(item);
    });
  }

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className={isMobile ? "card32resultModalm" : "card32resultModald"}>
        <div className="card32resultCardContainer mb-3">
          <span style={{ fontSize: isMobile ? "14px" : "20px" }}>Player 8</span>
          <div
            className={
              "d-flex flex-row justify-content-center align-items-center"
            }
          >
            {result?.[0]?.map((item: any) => {
              return (
                item != "1" && (
                  <div
                    style={{
                      border: "1px solid #fdef34",
                      borderRadius: "1px",
                      marginLeft: "5px",
                    }}
                  >
                    <HandleCards card={item} />
                  </div>
                )
              );
            })}
            {data?.result?.win === "1" && (
              <div className="casino-winner-icon ms-1">
                <FaTrophy size={30} color="#169733 " />
              </div>
            )}
          </div>
        </div>
        <div className="card32resultCardContainer mb-3">
          <span style={{ fontSize: isMobile ? "14px" : "20px" }}>Player 9</span>
          <div className="d-flex flex-row justify-content-center align-items-center">
            {result?.[1]?.map((item: any) => {
              return (
                item != "1" && (
                  <div
                    style={{
                      border: "1px solid #fdef34",
                      borderRadius: "1px",
                      marginLeft: "5px",
                    }}
                  >
                    <HandleCards card={item} />
                  </div>
                )
              );
            })}
            {data?.result?.win === "2" && (
              <div className="casino-winner-icon ms-1">
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
          </div>
        </div>
        <div className="card32resultCardContainer mb-3">
          <span style={{ fontSize: isMobile ? "14px" : "20px" }}>
            Player 10
          </span>
          <div className="d-flex flex-row justify-content-center align-items-center">
            {result?.[2]?.map((item: any) => {
              return (
                item != "1" && (
                  <div
                    style={{
                      border: "1px solid #fdef34",
                      borderRadius: "1px",
                      marginLeft: "5px",
                    }}
                  >
                    <HandleCards card={item} />
                  </div>
                )
              );
            })}
            {data?.result?.win === "3" && (
              <div className="casino-winner-icon ms-1">
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
          </div>
        </div>
        <div className="card32resultCardContainer mb-3">
          <span style={{ fontSize: isMobile ? "14px" : "20px" }}>
            Player 11
          </span>
          <div className="d-flex flex-row justify-content-center align-items-center">
            {result?.[3]?.map((item: any) => {
              return (
                item != "1" && (
                  <div
                    style={{
                      border: "1px solid #fdef34",
                      borderRadius: "1px",
                      marginLeft: "5px",
                    }}
                  >
                    <HandleCards card={item} />
                  </div>
                )
              );
            })}
            {data?.result?.win === "4" && (
              <div className="casino-winner-icon ms-1">
                <FaTrophy size={30} color="#169733" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          width: isMobile ? "100%" : "50%",
          textAlign: "center",
          boxShadow: "0 0 4px -1px",
          marginBottom: "10px",
        }}
      >
        <span style={{ opacity: "0.6" }}>Winner</span> Player{" "}
        {7 + Number(data?.result?.win)}
      </div>
      {data?.bets?.count > 0 && (
        <div className="w-100">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default Card32ResultComponent;
