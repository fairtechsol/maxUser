import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "../style.scss";

const Trio = ({ odds,data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  const handleBet = (betTeam: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: "700",
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
    setSelectedBox(null)
      
    }
  }, [odds?.gstatus, dispatch]);

  const handleBoxClick = (index: number) => {
    setSelectedBox(index);
    handleBet("ALL Trio")
  };

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back w-100 ${selectedBox === index ? 'selected' : ''}`}
      onClick={() => handleBoxClick(index)}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div  className={`${
      odds?.gstatus == 0 ? "suspended-box" : ""
    } worli-full`}>
      <div className="worli-box-title">
        <b>700</b>
      </div>
      <div className="worli-box-row">
        {renderBox("ALL TRIO", 0)}
      </div>
    </div>
  );
};

export default Trio;
