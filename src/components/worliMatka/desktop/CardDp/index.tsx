import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectedBetAction } from '../../../../store/actions/match/matchListAction';
import { AppDispatch } from '../../../../store/store';
import "../style.scss";

const CardDp = ({ data, odds }: any) => {
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
    <div      className={`${
      odds?.gstatus == 0 ? "suspended-box" : ""
    } worlibox sp`}>
      <div className="worli-box-title">
        <b>240</b>
      </div>
      <div className="worli-left">
        <div className="worli-box-row">
          {['1', '2', '3', '4', '5'].map((value, index) => renderBox(value, index))}
        </div>
        <div className="worli-box-row">
          {['6', '7', '8', '9', '0'].map((value, index) => renderBox(value, index + 5))}
        </div>
      </div>
      <div className="worli-right">
        <div className="worli-box-row">
          <div className="worli-odd-box back">
            <span className="worli-odd">{renderBox("D P ALL", 10)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDp;
