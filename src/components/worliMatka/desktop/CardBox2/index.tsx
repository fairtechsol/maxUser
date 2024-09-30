import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "../style.scss";

const CardBox2 = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [betTeam, setBetTeam] = useState("");

  // const handleBet = (item: any, index: number) => {
  //   setSelectedBox(index);
  //   let team = {
  //     bettingType: "BACK",
  //     matchId: data?.id,
  //     odd: item?.rate,
  //     stake: 0,
  //     matchBetType: "matchOdd",
  //     betOnTeam: betTeam,
  //     name: betTeam,
  //     bettingName: "Match odds",
  //     selectionId: item?.sid,
  //   };
  //   dispatch(
  //     selectedBetAction({
  //       team,
  //       data,
  //     })
  //   );
  // };

  const handleBet = () => {
    //setSelectedBox(index);
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: "fixed",
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: betTeam,
      name: betTeam,
      bettingName: "Match odds",
      selectionId: "pending",
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  useEffect(() => {
    if (betTeam) {
      handleBet();
    }
  }, [betTeam]);

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(""));
      setSelectedBox(null);
      setBetTeam("");
    }
  }, [odds?.gstatus, dispatch]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${
        selectedBox === index ? "selected" : ""
      }`}
      onClick={() => {
        setBetTeam((p) => {
          if (p && p.length === 3) return p;
          p = p + value;
          return p.split("").sort().join("");
        });

        //handleBet({ rate: value, nat: value, sid: index }, index);
      }}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div className={`${odds?.gstatus == 0 ? "suspended-bo" : ""} worli-full`}>
      <div className="worli-box-title">
        <b>SP:140 | DP:240 | TP:700</b>
      </div>
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
  );
};

export default CardBox2;
