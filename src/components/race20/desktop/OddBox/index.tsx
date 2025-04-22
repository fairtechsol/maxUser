import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { HandleRaceCards } from "../card";
import { useEffect } from "react";
const OddBox = ({ odds, data }: any) => {
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
      min: parseFloat(item?.min),
      max: parseFloat(item?.max),
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const handleCardRender = (card: string) => {
    if (card?.includes("spade")) {
      return "KHH";
    } else if (card?.includes("heart")) {
      return "KDD";
    } else if (card?.includes("club")) {
      return "KCC";
    } else {
      return "KSS";
    }
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

  const hanleProfitLossForK = (name: any) => {
    if (name.includes("spade")) {
      return "kofspade";
    } else if (name.includes("heart")) {
      return "kofheart";
    } else if (name.includes("diamond")) {
      return "kofdiamond";
    } else {
      return "kofclub";
    }
  };

  useEffect(() => {
    if (odds?.[0]?.gstatus !== "ACTIVE" || odds?.[0]?.b1 === "0.00") {
      dispatch(selectedBetAction(""));
    }
  }, [odds?.[0]?.gstatus, odds?.[0]?.b1]);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#eee",
        }}
      >
        <div className="oddBoxContainer" style={{ gap: "5px" }}>
          {odds?.map((item: any, index: number) => {
            return (
              <div
                style={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
                key={index}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <HandleRaceCards card={handleCardRender(item?.nat)} />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "5px",
                    lineHeight: 1,
                  }}
                >
                  <div
                    className={`back-BackGround cursor-pointer py-1 ${
                      handleLock(item, "back") ? "suspended py-1" : ""
                    }`}
                    style={{
                      minHeight: "30px",
                      width: "45%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      // paddingTop: "7px",
                    }}
                    onClick={() =>
                      handleLock(item, "back")
                        ? null
                        : handleBet(odds?.[index], "back")
                    }
                  >
                    <span className="rate-box">{item?.b1 || 0}</span>
                    <span className="casino-volume f400">{item?.bs1 || 0}</span>
                  </div>
                  <div
                    className={`lay-BackGround cursor-pointer py-1 ${
                      handleLock(item, "lay") ? "suspended py-1" : ""
                    }`}
                    style={{
                      minHeight: "30px",
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      // paddingTop: "7px",
                    }}
                    onClick={() =>
                      handleLock(item, "lay")
                        ? null
                        : handleBet(odds?.[index], "lay")
                    }
                  >
                    <span className="rate-box">{item?.l1 || 0}</span>
                    <span className="casino-volume f400">{item?.ls1 || 0}</span>
                  </div>
                </div>
                <span
                  className={`oddsBoxProfitLoss ${
                    data?.profitLoss
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                        ]
                        ? JSON.parse(
                            data?.profitLoss[
                              `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                            ]
                          )[hanleProfitLossForK(item?.nat)] > 0
                          ? "color-green"
                          : JSON.parse(
                              data?.profitLoss[
                                `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                              ]
                            )[hanleProfitLossForK(item?.nat)] < 0
                          ? "color-red"
                          : ""
                        : ""
                      : ""
                  }`}
                >
                  {data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                      ]
                      ? JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${data?.cards?.[0]?.sid}_card`
                          ]
                        )[hanleProfitLossForK(item?.nat)]
                      : "\u00A0"
                    : "\u00A0"}
                </span>
              </div>
            );
          })}
        </div>
        {/* <div style={{ width: "100%", textAlign: "end", padding: "5px" }}>
          <span style={{ fontWeight: "bolder" }}>Min:</span>
          <span>{min}</span>
          <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>Max:</span>
          <span>{max}</span>
        </div> */}
      </div>
    </>
  );
};

export default OddBox;
