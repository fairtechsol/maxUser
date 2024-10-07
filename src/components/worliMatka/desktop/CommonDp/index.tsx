import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "../style.scss";

const CommonDp = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState<string>("");

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
      setSelectedBox(null);
      setClicked("");
    }
  }, [odds?.gstatus, dispatch]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${clicked == value ? "selected" : ""}`}
      onClick={() => {
        value == "0" ? "" : setClicked(value);
        return value == "0" ? "" : handleBet("Common DP - " + value);
      }}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );


  return (
    <div className={`${
      odds?.gstatus == 0 ? "suspended-box" : ""
    } worli-full`}>
      <div className="worli-box-title">
        <b>240</b>
      </div>
      <div className="worli-box-row">
        {['1', '2', '3', '4', '5'].map((value, index) => renderBox(value, index))}
      </div>
      <div className="worli-box-row">
        {['6', '7', '8', '9', '0'].map((value, index) => renderBox(value, index + 5))}
      </div>
    </div>
  );
};

export default CommonDp;
