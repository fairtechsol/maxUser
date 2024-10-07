import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "../style.scss";

const CardBox = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  const matchIds = (dta: any) => {
    if (typeof dta !== "string") return undefined;
    const parts = dta.split(".");
    return parts.length > 1 ? parts[1] : undefined;
  };
  const handleBet = (item: any, index: number) => {
    setSelectedBox(index);
    let team = {
      bettingType: "BACK",
      matchId: data?.videoInfo?.mid,
      odd: "9.5",
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
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
    }
  }, [odds?.gstatus]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${
        selectedBox === index ? "selected" : ""
      }`}
      onClick={() =>
        handleBet({ rate: value, nat: value + " Single", sid: index }, index)
      }
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div className={`${odds?.gstatus == 0 ? "suspended-box" : ""} worlibox`}>
      <div className="worli-left">
        <div className="worli-box-title">
          <b>9.5</b>
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

      <div className="worli-right">
        <div className="worli-box-title">
          <b>9.5</b>
        </div>
        <div className="worli-box-row">
          <div
            className={`worli-odd-box back ${
              selectedBox === 10 ? "selected" : ""
            }`}
            onClick={() =>
              handleBet({ rate: "Line 1", nat: "Line 1 Single", sid: 10 }, 10)
            }
          >
            <span className="worli-odd">Line 1</span>
            <span className="d-block">1|2|3|4|5</span>
          </div>
          <div
            className={`worli-odd-box back ${
              selectedBox === 11 ? "selected" : ""
            }`}
            onClick={() =>
              handleBet({ rate: "ODD", nat: "ODD Single", sid: 11 }, 11)
            }
          >
            <span className="worli-odd">ODD</span>
            <span className="d-block">1|3|5|7|9</span>
          </div>
        </div>
        <div className="worli-box-row">
          <div
            className={`worli-odd-box back ${
              selectedBox === 12 ? "selected" : ""
            }`}
            onClick={() =>
              handleBet({ rate: "Line 2", nat: "Line 2 Single", sid: 12 }, 12)
            }
          >
            <span className="worli-odd">Line 2</span>
            <span className="d-block">6|7|8|9|0</span>
          </div>
          <div
            className={`worli-odd-box back ${
              selectedBox === 13 ? "selected" : ""
            }`}
            onClick={() =>
              handleBet({ rate: "EVEN", nat: "EVEN Single", sid: 13 }, 13)
            }
          >
            <span className="worli-odd">EVEN</span>
            <span className="d-block">2|4|6|8|0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBox;
