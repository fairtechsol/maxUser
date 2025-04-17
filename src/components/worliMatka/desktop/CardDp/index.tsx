import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import "../style.scss";

const CardDp = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [clicked, setClicked] = useState<string>("");
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const handleBet = (betTeam: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: "240",
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: betTeam,
      name: betTeam,
      bettingName: "Match odds",
      selectionId: odds?.sid,
      min: data?.videoInfo?.min,
      max: data?.videoInfo?.max,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(""));
      setClicked("");
    }
  }, [odds?.gstatus, dispatch]);

  useEffect(() => {
    if (selectedBet == null) {
      setClicked("");
    }
  }, [selectedBet]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${clicked == value ? "selected" : ""}`}
      onClick={() => {
        value == "0" ? "" : setClicked(value);
        return value == "0"
          ? ""
          : value == "DP - ALL"
          ? handleBet(value)
          : handleBet(value + " DP");
      }}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div className={`${odds?.gstatus == 0 ? "suspended-box" : ""} worlibox sp`}>
      <div className="worli-box-title">
        <b>240</b>
      </div>
      <div className="worli-left">
        <div className="worli-box-row">
          {["1", "2", "3", "4", "5"].map((value, index) =>
            renderBox(value, index)
          )}
        </div>
        <div className="worli-box-row">
          {["6", "7", "8", "9", "0"].map((value, index) =>
            renderBox(value, index + 5)
          )}
        </div>
      </div>
      <div className="worli-right">
        <div className="worli-box-row">
          <div className="worli-odd-box back">
            <span className="worli-odd">{renderBox("DP - ALL", 10)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDp;
