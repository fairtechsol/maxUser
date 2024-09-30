import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "../style.scss";

const CommonSp = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  const handleBet = (item: any, index: number) => {
    setSelectedBox(index);
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.rate,
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

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(""));
      setSelectedBox(null);
    }
  }, [odds?.gstatus, dispatch]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${selectedBox === index ? 'selected' : ''}`}
      onClick={() => handleBet({ rate: value, nat: value, sid: index }, index)}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div className={`${
      odds?.gstatus == 0 ? "suspended-box" : ""
    } worli-full`}>
      <div className="worli-box-title">
        <b>140</b>
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

export default CommonSp;
