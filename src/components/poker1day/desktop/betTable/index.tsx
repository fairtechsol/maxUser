import "./style.scss";
import { AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import isMobile from "../../../../utils/screenDimension";
import { useEffect } from "react";
const DynamicTable = ({ odds, data, playerNum, min, max }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleBet = (item: any, type: any) => {
    if (type === "LAY" && item?.l1 == "0.00") {
      return;
    }
    let team = {
      bettingType: type,
      matchId: data?.id,
      odd: type === "BACK" ? item?.b1 : item?.l1,
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
    // console.log("team", team);
  };

  let player1Key = `playera`;
  let player2Key = `playerb`;
  // console.log('first',odds)

  
  useEffect(() => {
    if (odds?.[0]?.gstatus === "CLOSED" ||odds?.[0]?.b1 === "0.00") {
      dispatch(selectedBetAction(""));
    } 
    
  }, [odds?.[0]?.gstatus,odds?.[0]?.b1]);

  return (
    <div className="card32-table-container">
      <div className="card32-table-row" style={{ lineHeight: 2 }}>
        {isMobile ? (
          <div className="title-12 f600 p-1" style={{ width: "50%" }}>
            Min: {min} Max: {max}
          </div>
        ) : (
          <div className="title-12 f600 p-1" style={{ width: "50%" }}></div>
        )}
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="card32-table-item f12-b back"
            style={{ width: "50%" }}
          >
            BACK
          </div>
          <div className="card32-table-item f12-b lay" style={{ width: "50%" }}>
            LAY
          </div>
        </div>
      </div>
      <div className="card32-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "8px",
            border: "0.1px solid #fff",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            {odds?.[0]?.nation}
          </span>
          <span
            className={`f400 ${
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  ? JSON.parse(
                      data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    )[player1Key] > 0
                    ? "color-green"
                    : JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )[player1Key] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
            style={{zIndex:"111"}}
          >
            {data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                ? JSON.parse(
                    data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  )[player1Key]
                : 0
              : 0}
          </span>
        </div>
        <div
          className={
            odds?.[0]?.gstatus === "SUSPENDED" ||
            odds?.[0]?.gstatus === "CLOSED"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div
            className="card32-table-item back"
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[0]?.gstatus === "SUSPENDED" ||
              odds?.[0]?.gstatus === "CLOSED"
                ? null
                : handleBet(odds?.[0], "BACK")
            }
          >
            <span className="title-14 f600">{odds?.[0]?.b1}</span>
            <span className="title-14 f500">{odds?.[0]?.bs1}</span>
          </div>
          <div
            className="card32-table-item lay"
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[0]?.gstatus === "SUSPENDED" ||
              odds?.[0]?.gstatus === "CLOSED"
                ? null
                : handleBet(odds?.[0], "LAY")
            }
          >
            <span className="title-14 f600">{odds?.[0]?.l1}</span>
            <span className="title-14 f500">{odds?.[0]?.ls1}</span>
          </div>
        </div>
      </div>
      <div className="card32-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "10px",
            border: "0.1px solid #fff",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            {odds?.[1]?.nation}
          </span>
          <span
            className={`f400 ${
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  ? JSON.parse(
                      data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    )[player2Key] > 0
                    ? "color-green"
                    : JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )[player2Key] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                ? JSON.parse(
                    data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  )[player2Key]
                : 0
              : 0}
          </span>
        </div>
        <div
          className={
            odds?.[1]?.gstatus === "SUSPENDED" ||
            odds?.[1]?.gstatus === "CLOSED"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
        >
          <div
            className="card32-table-item back"
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[1]?.gstatus === "SUSPENDED" ||
              odds?.[1]?.gstatus === "CLOSED"
                ? null
                : handleBet(odds?.[1], "BACK")
            }
          >
            <span className="title-14 f600">{odds?.[1]?.b1}</span>
            <span className="title-14 f500">{odds?.[1]?.bs1}</span>
          </div>
          <div
            className="card32-table-item lay"
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[1]?.gstatus === "SUSPENDED" ||
              odds?.[1]?.gstatus === "CLOSED"
                ? null
                : handleBet(odds?.[1], "LAY")
            }
          >
            <span className="title-14 f600">{odds?.[1]?.l1}</span>
            <span className="title-14 f500">{odds?.[1]?.ls1}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
