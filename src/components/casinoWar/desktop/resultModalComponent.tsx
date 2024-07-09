import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";

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

const CasinoWarResultComponent: React.FC<Props> = ({ data }) => {
  const resultCards = data?.result?.cards?.split(",");
  const playerIds = data?.result?.sid?.split(",");

  // Create a mapping of player IDs to their respective cards
  const players = resultCards?.map((card, index) => ({
    card,
    id: playerIds[index], // Distribute player IDs cyclically
  }));

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          border: "1px solid #fdef34",
          borderRadius: "1px",
          marginLeft: "5px",
          position: "relative",
        }}
      ></div>

      {players && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems:"center"
          }}
        >
          <span className="fs-6">Dealer</span>
          <HandleCards card={players[6]?.card} />
        </div>
      )}

      <div
        className="flex-row justify-content-around"
        style={{ display: "flex" }}
      >
        {players?.map((player, index) => {
          if(index !== 6){

          
          return(
          <div
            key={index}
            className="teen20resultCardContainer mb-3 "
            style={{ marginLeft: "5px" }}
          >
            <span className="fs-6">Player {player.id}</span>
            <div
              className={
                isMobile
                  ? "row-flex-mobile"
                  : "d-sm-flex flex-row justify-content-center align-items-center mb-2"
              }
            >
              <div
                style={{
                  border: "1px solid #fdef34",
                  borderRadius: "1px",
                  marginLeft: "5px",
                  position: "relative",
                  display:"flex",
                  justifyContent:"space-between",
                  gap:"5px"
                }}
              >
                <HandleCards card={player.card} />
               
              </div>
              {data?.result?.sid.includes(player.id) && (
                  <div
                    className="casino-winner-icon"
                    style={{marginLeft:"5px"}}
                  >
                    <FaTrophy size={30} color="#169733" />
                  </div>
                )}
            </div>
          </div>
        )}else return<></>
      }
        
        )}
        {data?.result?.win === "0" && (
          <div className="d-sm-flex flex-row justify-content-center align-items-center"></div>
        )}
      </div>
    </Container>
  );
};

export default CasinoWarResultComponent;
