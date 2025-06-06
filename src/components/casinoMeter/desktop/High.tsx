import { useEffect, useState } from "react";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { dragonTigerCards } from "../../../utils/constants";
import { HandleCards } from "../../commonComponent/cardsComponent";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const HighCards = ({ odds, data, placedHigh }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const [cardShow, setCardShow] = useState(false);

  useEffect(() => {
    if (selectedBet?.team?.betOnTeam === "Low") {
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
      min:item?.min,
      max:item?.max
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
      onClick={() =>
        odds?.gstatus === "1" && placedHigh ? handleBet(odds) : null
      }
      style={{ border: "1px solid #c7c8ca" }}
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
          <span style={{ color: "#097c93" }}>High</span>
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
              ></span>
            </div>
          ))}
        </div>
        <span
          style={{
            fontSize: "12px",
            display: "flex",
            justifyContent: "center",
            zIndex: "999",
          }}
          className={`${
            data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_2_card`]
                ? data?.profitLoss[`${data?.videoInfo?.mid}_2_card`] > 0
                  ? "color-green"
                  : data?.profitLoss[`${data?.videoInfo?.mid}_2_card`] < 0
                  ? "color-red"
                  : ""
                : ""
              : ""
          }`}
        >
          {data?.profitLoss ? (
            data?.profitLoss[`${data?.videoInfo?.mid}_2_card`] ? (
              data?.profitLoss[`${data?.videoInfo?.mid}_2_card`]
            ) : (
              <br></br>
            )
          ) : (
            0
          )}
        </span>
      </div>
    </div>
  );
};
export default HighCards;
