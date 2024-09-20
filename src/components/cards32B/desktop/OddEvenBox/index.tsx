import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import SmoothDropdownModal from "../minMaxModal";
import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";

const OddEven = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nation,
      name: item?.nation,
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

  const player8 = odds?.slice(0, 2);
  const player9 = odds?.slice(2, 4);
  const player10 = odds?.slice(4, 6);
  const player11 = odds?.slice(6, 8);
  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE" || value === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item: any, index: number) => (
    <div
      className={`dtlsubTitle back-BackGround ${
        handleLock(item?.gstatus, item?.b1) ? "lock" : ""
      }`}
      onClick={() => !handleLock(item?.gstatus, item?.b1) && handleBet(item)}
    >
      {item?.b1}
      <span
        className={`title-14 f500 ${
          data?.profitLoss
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
              ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`] >
                0
                ? "color-green"
                : data?.profitLoss[
                    `${data?.videoInfo?.mid}_${item?.sid}_card`
                  ] < 0
                ? "color-red"
                : ""
              : ""
            : ""
        }`}
        style={{ zIndex: "999" }}
      >
        {data?.profitLoss
          ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
            : ""
          : <br></br>}
      </span>
    </div>
  );
console.log(odds)
  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          border: "0.3px solid #c7c8ca",
          marginLeft: "5px",
        }}
      >
        <div className="w-100 d-sm-flex flex-row" style={{ height: "30px" }}>
          <div className="dtlTitle">
            {" "}
            <div style={{ width: "40%", textAlign: "start" }}>
              {/* <span className="minmaxi">
                <IoInformationCircle
                  color="#ffc742"
                  onClick={() => setModelOpen(!modelOpen)}
                />
                <SmoothDropdownModal
                  min={player8?.[0]?.min}
                  max={player8?.[0]?.max}
                  show={modelOpen}
                  setShow={() => setModelOpen(false)}
                />
              </span> */}
            </div>
          </div>
          <div className="dtlsubTitle back-BackGround">
            <span style={{ fontSize: "14px" }}>Odd</span>
          </div>
          <div className="dtlsubTitle back-BackGround">
            <span style={{ fontSize: "14px" }}>Even</span>
          </div>
        </div>
        <div className="w-100 d-sm-flex flex-row">
          <span className="dtlTitleo ">
            <div className="profitLoss-Text">
              <span>Player 8</span>
            </div>
          </span>
          {renderItem(player8?.[0], 1)}
          {renderItem(player8?.[1], 0)}
        </div>
        <div className="w-100 d-sm-flex flex-row">
          <span className="dtlTitleo ">
            <div className="profitLoss-Text">
              <span>Player 9</span>
            </div>
          </span>
          {renderItem(player9?.[0], 3)}
          {renderItem(player9?.[1], 2)}
        </div>
        <div className="w-100 d-sm-flex flex-row">
          <span className="dtlTitleo ">
            <div className="profitLoss-Text">
              <span>Player 10</span>
            </div>
          </span>
          {renderItem(player10?.[0], 5)}
          {renderItem(player10?.[1], 4)}
        </div>
        <div className="w-100 d-sm-flex flex-row">
          <span className="dtlTitleo ">
            <div className="profitLoss-Text">
              <span>Player 11</span>
            </div>
          </span>
          {renderItem(player11?.[0], 7)}
          {renderItem(player11?.[1], 6)}
        </div>
      </div>
    </div>
  );
};

export default OddEven;
