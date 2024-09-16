import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const TotalsBox = ({ odds, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any, type: string) => {
    let team = {
      bettingType: type === "back" ? "BACK" : "LAY",
      matchId: data?.id,
      odd: type === "back" ? item?.b1 : item?.l1,
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
  const handleLock = (item: any, type: string) => {
    if (type == "back") {
      if (item?.gstatus != "ACTIVE" || item?.b1 === "0.00") {
        return true;
      } else {
        return false;
      }
    } else {
      if (item?.gstatus != "ACTIVE" || item?.l1 === "0.00") {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <>
      <div className="totalContainer">
        <div className="total-mainRateBox">
          <div style={{ width: "30%" }}>
            <span></span>
          </div>
          <div className="total-rateBox">
            <span className="f600">No</span>
          </div>
          <div className="total-rateBox">
            <span className="f600">Yes</span>
          </div>
        </div>
        <div className="total-mainRateBox">
          <div className="total-rateBox">
            <span className="f600">Total points</span>
          </div>
          <div
            className={`total-rateBox lay-BackGround cursor-pointer flex-column ${
              handleLock(odds?.[0], "lay") ? "suspended" : ""
            }`}
            onClick={() =>
              handleLock(odds?.[0], "lay") ? null : handleBet(odds?.[0], "lay")
            }
          >
            <span className="rate-box">{odds?.[0]?.l1}</span>{" "}
            <span className="casino-volume f400">{odds?.[0]?.ls1}</span>
          </div>
          <div
            className={`total-rateBox back-BackGround cursor-pointer flex-column ${
              handleLock(odds?.[0], "back") ? "suspended" : ""
            }`}
            onClick={() =>
              handleLock(odds?.[0], "back")
                ? null
                : handleBet(odds?.[0], "back")
            }
          >
            <span className="rate-box">{odds?.[0]?.b1}</span>{" "}
            <span className="casino-volume f400">{odds?.[0]?.bs1}</span>
          </div>
        </div>

        <div className="total-mainRateBox">
          <div style={{ width: "33%" }}>
            <span></span>
          </div>
          <div
            className="justify-content-center align-items-center"
            style={{ width: "65%", display: "flex" }}
          >
            <span
              className={`${
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
                  : ""
                : 0}
            </span>
          </div>
        </div>
{/* 
        <div style={{ width: "100%", textAlign: "end", padding: "5px" }}>
          <span style={{ fontWeight: "bolder" }}>Min:</span>
          <span>{odds?.[0]?.min}</span>
          <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
          <span>{odds?.[0]?.max}</span>
        </div> */}

        <div className="total-mainRateBox">
          <div style={{ width: "30%" }}>
            <span></span>
          </div>
          <div className="total-rateBox">
            <span className="f600">No</span>
          </div>
          <div className="total-rateBox">
            <span className="f600">Yes</span>
          </div>
        </div>
        <div className="total-mainRateBox">
          <div className="total-rateBox">
            <span className="f600">Total cards</span>
          </div>
          <div
            className={`total-rateBox lay-BackGround cursor-pointer flex-column ${
              handleLock(odds?.[1], "lay") ? "suspended" : ""
            }`}
            onClick={() =>
              handleLock(odds?.[1], "lay") ? null : handleBet(odds?.[1], "lay")
            }
          >
            <span className="rate-box">{odds?.[1]?.l1}</span>{" "}
            <span className="casino-volume f400">{odds?.[1]?.ls1}</span>
          </div>
          <div
            className={`total-rateBox back-BackGround cursor-pointer flex-column ${
              handleLock(odds?.[1], "back") ? "suspended" : ""
            }`}
            onClick={() =>
              handleLock(odds?.[1], "back")
                ? null
                : handleBet(odds?.[1], "back")
            }
          >
            <span className="rate-box">{odds?.[1]?.b1}</span>{" "}
            <span className="casino-volume f400">{odds?.[1]?.bs1}</span>
          </div>
        </div>
        <div className="total-mainRateBox">
          <div style={{ width: "33%" }}>
            <span></span>
          </div>
          <div
            className="justify-content-center align-items-center"
            style={{ width: "65%", display: "flex" }}
          >
            <span
              className={`${
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
                  : ""
                : 0}
            </span>
          </div>
        </div>
        {/* <div style={{ width: "100%", textAlign: "end", padding: "5px" }}>
          <span style={{ fontWeight: "bolder" }}>Min:</span>
          <span>{odds?.[1]?.min}</span>
          <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
          <span>{odds?.[1]?.max}</span>
        </div> */}
      </div>
    </>
  );
};

export default TotalsBox;
