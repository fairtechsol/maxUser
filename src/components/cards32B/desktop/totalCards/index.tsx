import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import SmoothDropdownModal from "../minMaxModal";
import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";

const TotalCards = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
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
  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE" || value === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item: any, index: number) => (
    <div
      key={index}
      className={`card32bsubTitle back-BackGround ${
        handleLock(item?.gstatus, item?.b1) ? "suspended" : ""
      }`}
      onClick={() => !handleLock(item?.gstatus, item?.b1) && handleBet(item)}
      style={{cursor:"pointer"}}
    >
      {item?.b1}
    </div>
  );
  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          marginTop: "5%",
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
              <span className="minmaxi">
                <IoInformationCircle
                  color="#ffc742"
                  onClick={() => setModelOpen(!modelOpen)}
                />
                <SmoothDropdownModal
                  min={odds?.[0]?.max}
                  max={odds?.[0]?.min}
                  show={modelOpen}
                  setShow={() => setModelOpen(false)}
                />
              </span>
            </div>
          </div>
          <div className="card32bsubTitle back-BackGround">
            <span style={{ fontSize: "14px" }}>Back</span>
          </div>
        </div>
        <div className="w-100 d-sm-flex flex-row">
          <span className="card32bTitle" style={{lineHeight:"1.7"}}>
            <div className="profitLoss-Text">
              <span>8 & 9 Total</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(odds?.[0], 0)}
        </div>
        <div className="w-100 d-sm-flex flex-row">
          <span className="card32bTitle" style={{lineHeight:"1.7"}}>
            <div className="profitLoss-Text">
              <span>10 & 11 Total</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(odds?.[1], 1)}
        </div>
      </div>
    </div>
  );
};

export default TotalCards;
