import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import PieChart from "../../../baccarat2/desktop/chart";
import { HandleGameCards } from "../../desktop/card";
export const options = {
  is3D: true,
  backgroundColor: "none",
  chartArea: { left: 0, top: 0, width: "180", height: "200" },
};
const BaccaratStatistics = ({ odds, graphsData, cardData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const dataa = [
    graphsData ? graphsData?.P : 45,
    graphsData ? graphsData?.B : 45,
    graphsData ? graphsData?.T : 10,
  ];
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
      min: item?.min,
      max: item?.max,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  useEffect(() => {
    if (odds?.[0]?.gstatus === "0" || odds?.[0]?.b1 === "0.00") {
      dispatch(selectedBetAction(""));
    }
  }, [odds?.[0]?.gstatus, odds?.[0]?.b1]);

  return (
    <div className="baccarateContainer-m">
      <div className="baccarateChartContainer-m">
        <h4>Statistics</h4>
        <PieChart data={dataa} options={options} />
      </div>
      <div className="baccarateRateContainer-m">
        <div className="baccarateRateContainer1">
          <div
            className={`perfectpairBox ${odds?.[5]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            onClick={() =>
              odds?.[5]?.gstatus != "0" ? handleBet(odds?.[5]) : null
            }
          >
            <span>Score 1-4</span>
            <span>{parseFloat(odds?.[5]?.b1)}:1</span>
          </div>
          <div
            className={`perfectpairBox ${odds?.[6]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            onClick={() =>
              odds?.[6]?.gstatus != "0" ? handleBet(odds?.[6]) : null
            }
          >
            <span>Score 5-6</span>
            <span>{parseFloat(odds?.[6]?.b1)}:1</span>
          </div>
          <div
            className={`perfectpairBox ${odds?.[7]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            onClick={() =>
              odds?.[7]?.gstatus != "0" ? handleBet(odds?.[7]) : null
            }
          >
            <span>Score 7</span>
            <span>{parseFloat(odds?.[7]?.b1)}:1</span>
          </div>
          <div
            className={`perfectpairBox ${odds?.[8]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            onClick={() =>
              odds?.[8]?.gstatus != "0" ? handleBet(odds?.[8]) : null
            }
          >
            <span>Score 8</span>
            <span>{parseFloat(odds?.[8]?.b1)}:1</span>
          </div>
          <div
            className={`perfectpairBox ${odds?.[9]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            onClick={() =>
              odds?.[9]?.gstatus != "0" ? handleBet(odds?.[9]) : null
            }
          >
            <span>Score 9</span>
            <span>{parseFloat(odds?.[9]?.b1)}:1</span>
          </div>
        </div>
        <div className="baccarateRateContainer1">
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
                ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`
                ]
                  ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`
                  ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`
                    ] < 0
                      ? "color-red"
                      : ""
                  : ""
                : ""
              }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
              `${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`
              ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
                ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`
                ]
                  ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`
                  ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`
                    ] < 0
                      ? "color-red"
                      : ""
                  : ""
                : ""
              }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
              `${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`
              ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
                ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`
                ]
                  ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`
                  ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`
                    ] < 0
                      ? "color-red"
                      : ""
                  : ""
                : ""
              }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
              `${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`
              ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
                ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[8]?.sid}_card`
                ]
                  ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[8]?.sid}_card`
                  ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[8]?.sid}_card`
                    ] < 0
                      ? "color-red"
                      : ""
                  : ""
                : ""
              }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
              `${data?.videoInfo?.mid}_${odds?.[8]?.sid}_card`
              ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
                ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[9]?.sid}_card`
                ]
                  ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[9]?.sid}_card`
                  ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[9]?.sid}_card`
                    ] < 0
                      ? "color-red"
                      : ""
                  : ""
                : ""
              }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
              `${data?.videoInfo?.mid}_${odds?.[9]?.sid}_card`
              ]
              : ""}
          </div>
        </div>
        <div className="baccarateRateContainer1">
          <div
            className={`baccaratePlayerBox ps-3 ${odds?.[3]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            onClick={() =>
              odds?.[3]?.gstatus != "0" ? handleBet(odds?.[3]) : null
            }
          >
            <span>Player Pair</span>
            <span>{parseFloat(odds?.[3]?.b1)}:1</span>
          </div>
          <div className="baccarateTieBox">
            <div
              className={`baccarateTieBox1 ${odds?.[0]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              onClick={() =>
                odds?.[0]?.gstatus != "0" ? handleBet(odds?.[0]) : null
              }
            >
              <span>Player</span>
              <span>{parseFloat(odds?.[0]?.b1)}:1</span>
              <div
                className="bacarrateCards mt-2"
                style={{ width: cardData?.C5 != "1" ? "55px" : "35px" }}
              >
                {cardData?.C5 != "1" && (
                  <div style={{ transform: "rotate(270deg)", zIndex: "999" }}>
                    <HandleGameCards card={cardData?.C5} />
                  </div>
                )}
                <HandleGameCards card={cardData?.C1} />
                <HandleGameCards card={cardData?.C3} />
              </div>
            </div>
            <div
              className={`baccarateTieBox2 ${odds?.[2]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              onClick={() =>
                odds?.[2]?.gstatus != "0" ? handleBet(odds?.[2]) : null
              }
            >
              <span>Tie</span>
              <span>{parseFloat(odds?.[2]?.b1)}:1</span>
            </div>
            <div
              className={`baccarateTieBox3 ${odds?.[1]?.gstatus == "0" ? "suspended-box" : ""
                }`}
              onClick={() =>
                odds?.[1]?.gstatus != "0" ? handleBet(odds?.[1]) : null
              }
            >
              <span>Banker</span>
              <span>{parseFloat(odds?.[1]?.b1)}:1</span>
              <div
                className="bacarrateCards mt-2"
                style={{ width: cardData?.C6 != "1" ? "55px" : "35px" }}
              >
                <HandleGameCards card={cardData?.C2} />
                <HandleGameCards card={cardData?.C4} />
                {cardData?.C6 != "1" && (
                  <div style={{ transform: "rotate(90deg)", zIndex: "999" }}>
                    <HandleGameCards card={cardData?.C6} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`baccarateBankerBox ps-2 ${odds?.[4]?.gstatus == "0" ? "suspended-box" : ""
              }`}
            onClick={() =>
              odds?.[4]?.gstatus != "0" ? handleBet(odds?.[4]) : null
            }
          >
            <span>Banker Pair</span>
            <span>{parseFloat(odds?.[4]?.b1)}:1</span>
          </div>
        </div>
        <div className="baccarateRateContainer1">
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
                ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                ]
                  ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                  ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                    ] < 0
                      ? "color-red"
                      : ""
                  : ""
                : ""
              }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
              `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
              ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
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
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
                ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                ]
                  ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                  ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                    ] < 0
                      ? "color-red"
                      : ""
                  : ""
                : ""
              }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
              `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
              ]
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
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
              : ""}
          </div>
          <div
            className={`perfectpairBoxpl ${data?.profitLoss
                ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`
                ]
                  ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`
                  ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`
                    ] < 0
                      ? "color-red"
                      : ""
                  : ""
                : ""
              }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
              `${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`
              ]
              : ""}
          </div>
        </div>
        {/* <div className="baccarateMinMax">
          <span className="f600">Min:</span>
          {odds?.[0]?.min} <span className="f600">Max:</span>
          {odds?.[0]?.max}
        </div> */}
      </div>
    </div>
  );
};

export default BaccaratStatistics;
