import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { isMobile } from "../../../../utils/screenDimension";
import WorliClearBox from "../../mobile/WorliClearBox";
import "../style.scss";

const CardBox2 = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [betTeam, setBetTeam] = useState("");
  const [zeros, setZeros] = useState("");
  const [mobileBox, setMobileBox] = useState(false);

  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const bettingOdds = (num: any) => {
    const hash = new Array(10);
    let count = 0;
    for (let i = 0; i < num.length; i++) {
      if (hash[Number(num.charAt(i))] != 1) {
        count++;
        hash[Number(num.charAt(i))] = 1;
      }
    }

    return count == 1 ? 140 : count == 2 ? 240 : 700;
  };

  const handleBet = () => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: bettingOdds(betTeam + zeros),
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: betTeam,
      name: betTeam + zeros + " Pana",
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
    if ((betTeam || zeros) && !isMobile) {
      handleBet();
    } else if ((betTeam || zeros) && isMobile && mobileBox) {
      handleBet();
    }
  }, [betTeam, zeros, mobileBox]);

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(""));
      setBetTeam("");
      setZeros("");
      setMobileBox(false);
    }
  }, [odds?.gstatus, dispatch]);

  useEffect(() => {
    if (selectedBet == null) {
      setBetTeam("");
      setZeros("");
      setMobileBox(false);
    }
  }, [selectedBet]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${betTeam.includes(value) || zeros.includes(value) ? "selected" : ""
        }`}
      onClick={() => {
        setZeros((p) => {
          if ((betTeam ? betTeam.length : 0) + (p ? p.length : 0) == 3)
            return p;
          if (value == "0") return p + 0;
          return p;
        });

        setBetTeam((p) => {
          if ((p ? p.length : 0) + (zeros ? zeros.length : 0) == 3) return p;
          p = value == "0" ? p : p + value;
          p = p.split("").sort().join("");

          return p;
        });
      }}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  const handleClear = () => {
    setZeros("");
    setBetTeam("");
    setMobileBox(false);
  };

  return (
    <div className={`${odds?.gstatus == 0 ? "suspended-box" : ""} worli-full`}>
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
      {isMobile && (zeros?.length > 0 || betTeam?.length > 0) && (
        <WorliClearBox
          game="Pana"
          team={betTeam}
          zeros={zeros}
          setBox={setMobileBox}
          handleClear={handleClear}
          disabled={betTeam?.length + zeros?.length < 3}
        />
      )}
    </div>
  );
};

export default CardBox2;
