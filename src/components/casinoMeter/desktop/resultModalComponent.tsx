import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import { isMobile } from "../../../utils/screenDimension";
import "./style.scss";
import ResultBetList from "../../commonComponent/resultBetList";

interface Props {
  data: {
    result: {
      mid: string;
      sid: string;
      win: string;
      desc: string;
      cards: string;
    };
  };
}

const CasinoMeterResultComponent: React.FC<Props> = ({ data }) => {
  const resultCards = data?.result?.cards?.split(",");
  const playerIds = data?.result?.sid?.split(",");

  // Create a mapping of player IDs to their respective cards
  const players = resultCards?.map((card, index) => ({
    card,
    id: playerIds[index], // Distribute player IDs cyclically
  }));

  const renderColumn = () => (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: "100%" }}
    >
      {players?.map((player, index) => (
        <div
          key={index}
          className="teen20resultCardContainer mb-3"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {index !== 6 && (
            // <div
            //   style={{
            //     width: "90%",
            //     border: "0.5px solid",
            //     display: "flex",
            //     justifyContent: "start",
            //     flexDirection: "row",
            //     alignItems: "center",

            //     gap: "20px",
            //   }}
            // >
            //   <span className="fs-6" style={{ marginLeft: "10px" }}>
            //     Player {index + 1}
            //   </span>
            //   <div className="d-flex flex-row align-items-center mb-2" style={{marginTop:"15px",marginLeft:"100px",justifyContent:"space-between"}}>
            //     <div
            //       style={{
            //         border: "1px solid #fdef34",
            //         borderRadius: "1px",
            //         marginLeft: "15px",
            //         position: "relative",
            //         display: "flex",
            //         justifyContent: "space-between",
            //         gap: "5px",

            //       }}
            //     >
            //       <HandleCards card={player.card} />
            //     </div>
            //     {data?.result?.sid.includes(`${index+1}` ) && (
            //       <div
            //         className="casino-winner-icon"
            //         style={{ marginLeft: "5px" }}
            //       >
            //         <FaTrophy size={30} color="#169733" />
            //       </div>
            //     )}
            //   </div>
            // </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                padding: "10px",
                border: "0.5px solid",
                borderRadius: "1px",
              }}
            >
              <div style={{ width: "50%", textAlign: "start" }}>
                <span className="fs-6" style={{ marginLeft: "10px" }}>
                  Player {index + 1}
                </span>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <HandleCards card={player.card} />
                {data?.result?.sid.includes(`${index + 1}`) && (
                  <div
                    className="casino-winner-icon"
                    style={{ marginLeft: "5px" }}
                  >
                    <FaTrophy size={30} color="#169733" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderRow = () => (
    <div
      className="flex-row justify-content-around"
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {players?.map((player, index) => {
        if (index !== 6) {
          return (
            <div
              key={index}
              className="teen20resultCardContainer mb-3"
              style={{ marginLeft: "5px" }}
            >
              <span className="fs-6">Player {index + 1}</span>
              <div className="d-sm-flex flex-row justify-content-center align-items-center mb-2">
                <div
                  style={{
                    border: "1px solid #fdef34",
                    borderRadius: "1px",
                    marginLeft: "5px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "5px",
                  }}
                >
                  <HandleCards card={player.card} />
                </div>
                {data?.result?.sid.includes(`${index + 1}`) && (
                  <div
                    className="casino-winner-icon"
                    style={{ marginLeft: "5px" }}
                  >
                    <FaTrophy size={30} color="#169733" />
                  </div>
                )}
              </div>
            </div>
          );
        } else {
          return <></>;
        }
      })}
      {data?.result?.win === "0" && (
        <div className="d-sm-flex flex-row justify-content-center align-items-center"></div>
      )}
    </div>
  );
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isMobile ? (
        <div
          style={{
            width: "100%",
            border: "0.5px solid",
            display: "flex",
            justifyContent: "start",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
            marginBottom: "15px",
          }}
        >
          {players && (
            // <div
            //   className="d-flex flex-row justify-content-between align-items-center mb-2 "
            //   style={{ width: "50%" }}
            // >
            //   <span className="fs-6" style={{ marginLeft: "10px" }}>
            //     Dealer
            //   </span>
            //   <div className="d-flex flex-row justify-content-center align-items-center mb-2" style={{

            //   }}>
            //     <div
            //       style={{
            //         border: "1px solid #fdef34",
            //         borderRadius: "1px",
            //         marginLeft: "5px",
            //         marginTop:"15px",
            //         display: "flex",
            //         justifyContent: "center",
            //         alignItems: "center",
            //         gap: "5px",
            //       }}
            //     >
            //       <HandleCards card={players[6]?.card} />
            //     </div>
            //     {data?.result?.sid.includes(players[6]?.id) && (
            //       <div
            //         className="casino-winner-icon"
            //         style={{ marginLeft: "5px" }}
            //       >
            //         <FaTrophy size={30} color="#169733" />
            //       </div>
            //     )}
            //   </div>
            // </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                padding: "10px",
                border: "0.5px solid",
                borderRadius: "1px",
              }}
            >
              <div style={{ width: "50%", textAlign: "start" }}>
                <span className="fs-6" style={{ marginLeft: "10px" }}>
                  Dealer
                </span>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <HandleCards card={players[6]?.card} />
                {data?.result?.sid.includes(players[6]?.id) && (
                  <div
                    className="casino-winner-icon"
                    style={{ marginLeft: "5px" }}
                  >
                    <FaTrophy size={30} color="#169733" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #fdef34",
            borderRadius: "1px",
            marginLeft: "5px",
            position: "relative",
          }}
        ></div>
      )}

      {players && !isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span className="fs-6">Dealer</span>
          <HandleCards card={players[6]?.card} />
        </div>
      )}

      {isMobile ? renderColumn() : renderRow()}
      {/* {
        data?.bets?.count > 0 && 
        <div className="w-100">
        <ResultBetList bets={data?.bets?.rows ?? 12} total={data?.bets?.count}/>
      </div>
      } */}
    </Container>
  );
};

export default CasinoMeterResultComponent;
