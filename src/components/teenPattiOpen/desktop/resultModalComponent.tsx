import React from "react";
import { Container } from "react-bootstrap";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { FaTrophy } from "react-icons/fa";
import isMobile from "../../../utils/screenDimension";

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

const TeenOpenResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards = data?.result?.cards?.split(",");
  
  
  const players = Array.from({ length: 9 }, () => []);

  
  resultCards?.forEach((card: any, index: any) => {
    players[index % 9].push(card);
  });

  
  const layout = [
    { index: 0, label: "Player1" },
    { index: 8, label: "Dealer" },
    { index: 7, label: "Player8" },
    { index: 1, label: "Player2" },
    { index: -1, label: "gap" },
    { index: 6, label: "Player7" },
    { index: 2, label: "Player3" },
    { index: 3, label: "Player4" },
    { index: 4, label: "Player5" },
    { index: 5, label: "Player6" },
  ];

  const renderRow = (row: any) => (
    <div className="d-flex justify-content-between mb-3">
      {row?.map((position: any, posIndex: any) => (
        <div key={posIndex} className="teen20resultCardContainer mx-">
          {position.label !== "gap" && (
            <>
              <div>
                <span className="fs-5">{position.label}</span>
                <div
                  className={
                    isMobile
                      ? "row-flex-mobile"
                      : "d-sm-flex flex-row justify-content-center align-items-between mb-2"
                  }
                >
                  {players[position.index]?.map((card: any, cardIndex: any) => (
                    <div
                      key={cardIndex}
                      style={{
                        border: "1px solid #fdef34",
                        borderRadius: "1px",
                        marginLeft: "0px",
                        position: "relative",
                      }}
                    >
                      <HandleCards card={card} />
                    </div>
                  ))}
                </div>
              </div>
              {data?.result?.sid.includes((position.index + 1).toString()) && (
                <div
                  className="casino-winner-ico"
                  style={{display:"flex",alignItems:"center",justifyContent:"center" }}
                >
                  <FaTrophy size={30} color="#169733" />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      {renderRow(layout.slice(0, 3))} {/* Players 1, Dealer, Player 8 */}
      {renderRow(layout.slice(3, 6))} {/* Player 2, gap, Player 7 */}
      {renderRow(layout.slice(6, 10))} {/* Players 3, 4, 5, 6 */}
    </Container>
  );
};

export default TeenOpenResultComponent;
