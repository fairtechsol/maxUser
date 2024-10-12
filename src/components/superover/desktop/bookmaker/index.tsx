import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useEffect } from "react";
import { formatNumber } from "../../../../helpers";
import { isMobile } from "../../../../utils/screenDimension";
const Bookmaker = ({ matchOddsData, data, title, min, max }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type === "back" ? "BACK" : "LAY",
      matchId: data?.id,
      odd: type === "back" ? item?.b1 : item?.l1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: (item?.sid).toString(),
      min:data?.videoInfo?.min,
      max:data?.videoInfo?.max
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const handleLock = (status: any, value: any) => {
    console.log(status,'first',value)
    if (status != "ACTIVE" || value === 0) {
      return true;
    } else {
      return false;
    }
  };
  const team1 = matchOddsData?.[0];
  const team2 = matchOddsData?.[1];

  useEffect(() => {
    if (team1?.gstatus !== "ACTIVE" || team1?.b1 === 0) {
      dispatch(selectedBetAction(""));
    }
  }, [team1?.gstatus, team1?.b1]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="marketHeader">
        <span className="f400" style={{ color: "#ffffff" }}>
          {title}
        </span>
      </div>
      <div className="boxContainer" style={{ lineHeight: "2" }}>
        <span
          className="f600"
          style={{ fontSize: "12px", color: "#097c93", lineHeight: "2" }}
        >
          Min: {min} Max: {formatNumber(max)}
        </span>
        <div className={isMobile ? "box-mob" : "blboxes "} style={{ lineHeight: "2" }}>
          <div className="w-50 back-BackGround flex-justify-center">
            <span
              className="f600"
              style={{ fontSize: "16px", color: "#333333", textAlign: "center" }}
            >
              Back
            </span>
          </div>
          <div className="w-50 lay-BackGround flex-justify-center">
            <span
              className="f600"
              style={{ fontSize: "16px", color: "#333333", textAlign: "center" }}
            >
              Lay
            </span>
          </div>
        </div>
      </div>

      <div className={`boxContainer`}>
        <span className="f400" style={{ fontSize: "14px", color: "#000" }}>
          {team1?.nat}
          <div>
            <span
              className={`${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${team1?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${team1?.sid}_card`
                        ]
                      )["eng"] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${team1?.sid}_card`
                          ]
                        )["eng"] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${team1?.sid}_card`]
                  ? JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${team1?.sid}_card`
                      ]
                    )["eng"]
                  : ""
                : ""}
            </span>
          </div>
        </span>
        <div
        className={`
          ${isMobile ? "box-mob" : "blboxes"} 
          ${handleLock(team1?.status, team1?.b1) ? " suspended-row" : ""}
        `}
          data-title={handleLock(team1?.status, team1?.b1) ? "SUSPENDED" : ""}
        >
          <div
            className={`w-50 back-BackGround flex-justify-center cursor-pointer`}
            style={{ height: "42px", flexDirection: "column" }}
            onClick={() =>
              handleLock(team1?.status, team1?.b1)
                ? null
                : handleBet(team1, "back")
            }
          >
            <span className="f600 rateText lh-1">
              {team1?.b1 === 0 ? "-" : team1?.b1}
            </span>{" "}
            <span style={{ fontSize: "11px", fontWeight: "300" }}>
              {team1?.bs1}
            </span>
          </div>
          <div
            className={`w-50 lay-BackGround flex-justify-center cursor-pointer`}
            style={{ height: "42px", flexDirection: "column" }}
            onClick={() =>
              handleLock(team1?.status, team1?.l1)
                ? null
                : handleBet(team1, "lay")
            }
          >
            <span className="f600 rateText lh-1">
              {team1?.l1 === 0 ? "-" : team1?.l1}
            </span>{" "}
            <span style={{ fontSize: "11px", fontWeight: "300" }}>
              {team1?.ls1}
            </span>
          </div>
        </div>
      </div>

      <div className={`boxContainer `}>
        <span className="f400" style={{ fontSize: "14px", color: "#000" }}>
          {team2?.nat}
          <div>
            <span
              className={`${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${team1?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${team1?.sid}_card`
                        ]
                      )["rsa"] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${team1?.sid}_card`
                          ]
                        )["rsa"] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${team1?.sid}_card`]
                  ? JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${team1?.sid}_card`
                      ]
                    )["rsa"]
                  : ""
                : ""}
            </span>
          </div>
        </span>
        <div
       className={`
        ${isMobile ? "box-mob" : "blboxes"} 
        ${handleLock(team2?.status, team2?.b1) ? " suspended-row" : ""}
      `}
          data-title={handleLock(team2?.status, team2?.b1) ? "SUSPENDED" : ""}
        >
          <div
            className={`w-50 back-BackGround flex-justify-center cursor-pointer`}
            style={{ height: "42px", flexDirection: "column" }}
            onClick={() =>
              handleLock(team2?.status, team2?.b1)
                ? null
                : handleBet(team2, "back")
            }
          >
            <span className="f600 rateText">
              {team2?.b1 === 0 ? "-" : team2?.b1}
            </span>{" "}
            <span style={{ fontSize: "11px", fontWeight: "300" }}>
              {team2?.bs1}
            </span>
          </div>
          <div
            className={`w-50 lay-BackGround flex-justify-center cursor-pointer`}
            style={{ height: "42px", flexDirection: "column" }}
            onClick={() =>
              handleLock(team2?.status, team2?.l1)
                ? null
                : handleBet(team2, "lay")
            }
          >
            <span className="f600 rateText">
              {team2?.l1 === 0 ? "-" : team2?.l1}
            </span>{" "}
            <span style={{ fontSize: "11px", fontWeight: "300" }}>
              {team2?.ls1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmaker;
