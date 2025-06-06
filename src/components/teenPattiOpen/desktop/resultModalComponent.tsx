import React from "react";
import { Container } from "react-bootstrap";
import { FaTrophy } from "react-icons/fa";
import { isMobile } from "../../../utils/screenDimension";
import { HandleCards } from "../../commonComponent/cardsComponent";
import ResultBetList from "../../commonComponent/resultBetList";
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

const TeenOpenResultComponent: React.FC<Props> = ({ data }: any) => {
  const resultCards: any = data?.result?.cards?.split(",");

  // Initialize an array for 9 players
  const players: any = Array.from({ length: 9 }, () => []);

  // Distribute cards in a round-robin manner
  resultCards?.forEach((card: any, index: any) => {
    players[index % 9].push(card);
  });

  // Define the layout for rendering
  const layout = [
    { index: 0, label: "Player 1" },
    { index: 8, label: "Dealer" },
    { index: 7, label: "Player 8" },
    { index: 1, label: "Player 2" },
    { index: -1, label: "gap" },
    { index: 6, label: "Player 7" },
    { index: 2, label: "Player 3" },
    { index: 3, label: "Player 4" },
    { index: 4, label: "Player 5" },
    { index: 5, label: "Player 6 " },
  ];

  const renderRow = (row: any) => (
    <div className="row-render">
      {row?.map((position: any, posIndex: any) => (
        <div key={posIndex} className="teen20resultCardContainer2 mx-">
          {position.label !== "gap" && (
            <>
              <div>
                <div className="fs-5" style={{ textAlign: "center" }}>
                  {position.label}
                </div>
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
                <div className=" winner-icon casino-winner-ico ">
                  <FaTrophy size={30} color="#169733" />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );

  const renderColumn = () => (
    <div className="d-flex flex-column align-items-center pl-">
      {layout.map((position: any, posIndex: any) => (
        <div
          key={posIndex}
          className="teen20resultCardContaine mb-3"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {position.label !== "gap" && (
            <div
              style={{
                width: "90%",
                border: "0.5px solid",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <span className="fs-5" style={{ marginLeft: "10px" }}>
                {position.label}
              </span>
              <div className="d-flex flex-row justify-content-center align-items-center mb-2">
                {players[position.index]?.map((card: any, cardIndex: any) => (
                  <div
                    key={cardIndex}
                    style={{
                      border: "1px solid #fdef34",
                      borderRadius: "1px",
                      marginLeft: "5px",
                      position: "relative",
                      marginTop: "10px",
                    }}
                  >
                    <HandleCards card={card} />
                  </div>
                ))}
              </div>

              {data?.result?.sid.includes((position.index + 1).toString()) && (
                <div className="casino-winner-icon">
                  <FaTrophy
                    className="casino-winner-icon"
                    size={30}
                    color="#169733"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingTop: "20px",
      }}
    >
      {isMobile ? (
        renderColumn()
      ) : (
        <div style={{ width: "100%" }}>
          {renderRow(layout.slice(0, 3))} {/* Players 1, Dealer, Player 8 */}
          {renderRow(layout.slice(3, 6))} {/* Player 2, gap, Player 7 */}
          {renderRow(layout.slice(6, 10))} {/* Players 3, 4, 5, 6 */}
        </div>
      )}
      {data?.bets?.count > 0 && (
        <div className="w-100">
          <ResultBetList bets={data?.bets?.rows} total={data?.bets?.count} />
        </div>
      )}
    </Container>
  );
};

export default TeenOpenResultComponent;
