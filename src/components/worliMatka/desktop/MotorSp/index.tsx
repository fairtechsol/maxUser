import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useEffect } from "react";
// import CommonCardImg from "../CommonCardImg";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import "../style.scss";

const MotorSp = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleBet = (item: any) => {
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
  // const arCards = cards?.ar?.split(",");
  // const brCards = cards?.br?.split(",");

  useEffect(() => {
    if (data?.worli?.gstatus === "0") {
      dispatch(selectedBetAction(""));
    }
  }, [data?.worli?.gstatus]);

  return (
    <>
    <div className="worli-full">
      <div className="worli-box-title">
        <b>140</b>
      </div>
      <div className="worli-box-row">
        <div className="worli-odd-box back">
          <span className="worli-odd">1</span>
        </div>
        <div className="worli-odd-box back">
          <span className="worli-odd">2</span>
        </div>
        <div className="worli-odd-box back">
          <span className="worli-odd">3</span>
        </div>
        <div className="worli-odd-box back">
          <span className="worli-odd">4</span>
        </div>
        <div className="worli-odd-box back">
          <span className="worli-odd">5</span>
        </div>
      </div>
      <div className="worli-box-row">
        <div className="worli-odd-box back">
          <span className="worli-odd">6</span>
        </div>
        <div className="worli-odd-box back">
          <span className="worli-odd">7</span>
        </div>
        <div className="worli-odd-box back">
          <span className="worli-odd">8</span>
        </div>
        <div className="worli-odd-box back">
          <span className="worli-odd">9</span>
        </div>
        <div className="worli-odd-box back">
          <span className="worli-odd">0</span>
        </div>
      </div>
    </div>

    </>
  );
};

export default MotorSp;
