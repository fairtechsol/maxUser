import { useEffect, useState } from "react";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { dragonTigerCards } from "../../../utils/constants";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const HighCards = ({ odds, data,placedHigh }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const [cardShow, setCardShow] = useState(false);

  useEffect(() => {
    if (selectedBet?.team?.betOnTeam ==="Low") {
      setCardShow(true);
    } else {
      setCardShow(false);
    }
  }, [selectedBet]);

  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: item?.sid,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  return (
    <div
      className={`LowCommonCardImgContainer ${
        odds?.gstatus === "0" ? "suspended" : ""
      }`}
      onClick={() => (odds?.gstatus === "1" && placedHigh ? handleBet(odds) : null)}
    >
      <div className="lowCardContainer">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>High</span>
          {cardShow && <HandleCards card="9HH" />}
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {dragonTigerCards.slice(9, 13).map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <div key={item?.code}>
                <img src={item?.imgSrc} width={"30px"} />
              </div>
              <span
                style={{
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                0
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HighCards;
