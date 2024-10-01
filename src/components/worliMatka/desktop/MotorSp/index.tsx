import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useEffect } from "react";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useState } from "react";
import "../style.scss";

const MotorSp = ({ odds, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [betTeam, setBetTeam] = useState("");
  const [zeros, setZeros] = useState("");

  useEffect(() => {
    if (data?.worli?.gstatus === "0") {
      dispatch(selectedBetAction(""));
    }
  }, [data?.worli?.gstatus]);

  const handleBet = () => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: "140",
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: betTeam,
      name: betTeam + zeros,
      bettingName: "Match odds",
      selectionId: odds?.sid,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  useEffect(() => {
    if (betTeam || zeros) {
      handleBet();
    }
  }, [betTeam, zeros]);

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(""));

      setBetTeam("");
      setZeros("");
    }
  }, [odds?.gstatus, dispatch]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${
        betTeam.includes(value) || zeros.includes(value) ? "selected" : ""
      }`}
      onClick={() => {
        setZeros((p) => {
          if ((betTeam ? betTeam.length : 0) + (p ? p.length : 0) == 9)
            return p;
          if (value == "0") return p + 0;
          return p;
        });

        setBetTeam((p) => {
          if ((p ? p.length : 0) + (zeros ? zeros.length : 0) == 9) return p;
          p = value == "0" ? p : p + value;
          p = p.split("").sort().join("");

          return p;
        });

        //handleBet({ rate: value, nat: value, sid: index }, index);
      }}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <>
      <div className="worli-full">
        <div className="worli-box-title">
          <b>140</b>
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
    </>
  );
};

export default MotorSp;
