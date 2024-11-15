import { isMobile } from "../../../utils/screenDimension";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { HandleCards3 } from "../mobile/cardComponent2";
function Meter({ data, runPosition }: { data: string; runPosition: string }) {
  const cards = data?.split(",");

  const lowCards: string[] = [];
  const highCards: string[] = [];

  let lowCardSum = 0;
  let highCardSum = 0;

  cards?.forEach((card) => {
    if (card?.length < 3) return;
    const firstChar = card[0];

    if (
      firstChar === "1" ||
      firstChar === "J" ||
      firstChar === "Q" ||
      firstChar === "K"
    ) {
      highCards.push(card);
      highCardSum =
        highCardSum +
        (firstChar == "1"
          ? 10
          : firstChar == "J"
          ? 11
          : firstChar == "Q"
          ? 12
          : firstChar == "K"
          ? 13
          : 0);
    } else {
      lowCards.push(card);
      lowCardSum = lowCardSum + (firstChar == "A" ? 1 : Number(firstChar));
    }
  });

  return (
    <div style={{ background: "#ffc742d9", marginTop: "5px", padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <strong style={{ textAlign: "center", color: "#17ec17", width: "10%" }}>
          {lowCardSum}
        </strong>
        <div style={{ display: "flex", alignItems: "center",flexWrap:"wrap" }}>
          {lowCards?.map((card, index) => (
            <span key={index} style={{ margin: "5px", }}>
              {isMobile?<HandleCards3 card={card}/>:<HandleCards card={card} />}
            </span>
          ))}
          {runPosition == "Low" && (
            <span style={{ color: "#FFFFFF", marginLeft: "5px" }}>
              Run Position:
              <span
                style={{
                  color: lowCardSum > highCardSum ? "#FFFFFF" : "#FF2238",
                }}
              >
                {lowCardSum - highCardSum}
              </span>
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <strong style={{ textAlign: "center", color: "#17ec17", width: "10%" }}>
          {highCardSum}
        </strong>
        <div style={{ display: "flex", alignItems: "center",flexWrap:"wrap" }}>
          {highCards.map((card, index) => (
            <span key={index} style={{ margin: "5px" }}>
              {isMobile?<HandleCards3 card={card}/>:<HandleCards card={card} />}
            </span>
          ))}
          {runPosition == "High" && (
            <span style={{ color: "#FFFFFF", marginLeft: "5px" }}>
              Run Position:
              <span
                style={{
                  color: highCardSum > lowCardSum ? "#FFFFFF" : "#FF2238",
                }}
              >
                {highCardSum - lowCardSum}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Meter;
