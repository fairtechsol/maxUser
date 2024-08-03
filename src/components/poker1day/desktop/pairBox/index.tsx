import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useDispatch } from "react-redux";
import isMobile from "../../../../utils/screenDimension";

const PairBox = ({ odds, data, min, max }: any) => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const dispatch: AppDispatch = useDispatch();

  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: dragonTigerDetail?.id,
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
        dragonTigerDetail,
      })
    );
    // console.log('team',team)
  };
  return (
    <>
      <div className="poker-table-row">
        {isMobile ? (
          <div
            className="title-12 f600 p-1"
            style={{ width: "50%", border: "0.1px solid #fff" }}
          >
            {" "}
            Min: {min} Max: {max}
          </div>
        ) : (
          <div style={{ width: "50%", border: "0.1px solid #fff" }}></div>
        )}
        <div
          style={{
            width: "50%",
            backgroundColor: "#a7d8fd",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="poker-table-item f12-b" style={{ width: "50%" }}>
            BACK
          </div>
          <div className="poker-table-item f12-b" style={{ width: "50%" }}>
            BACK
          </div>
        </div>
      </div>
      <div className="poker-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "16px",
            border: "0.1px solid #fff",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            Player A
          </span>
        </div>
        <div
          className={
            odds?.[0]?.gstatus === "SUSPENDED" ||
            odds?.[0]?.gstatus === "CLOSED" ||
            odds?.[0]?.b1 === "0.00"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            backgroundColor: "#a7d8fd",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="poker-table-item"
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[0]?.gstatus === "SUSPENDED" ||
              odds?.[0]?.gstatus === "CLOSED" ||
              odds?.[0]?.b1 === "0.00"
                ? null
                : handleBet(odds?.[0])
            }
          >
            <span className="f12-b">{odds?.[0]?.nat}</span>
            <span
              className={`f10-b f400 ${
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
              style={{zIndex:"111"}}
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
          <div
            className={`poker-table-item`}
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[1]?.gstatus === "SUSPENDED" ||
              odds?.[1]?.gstatus === "CLOSED" ||
              odds?.[1]?.b1 === "0.00"
                ? null
                : handleBet(odds?.[1])
            }
          >
            <span className="f12-b">{odds?.[1]?.nat}</span>
            <span
              className={`f10-b f400 ${
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
              style={{zIndex:"111"}}
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
        </div>
      </div>
      <div className="poker-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "50%",
            padding: "18px",
            border: "0.1px solid #fff",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
            Player B
          </span>
        </div>
        <div
          className={
            odds?.[2]?.gstatus === "SUSPENDED" ||
            odds?.[2]?.gstatus === "CLOSED" ||
            odds?.[2]?.b1 === "0.00"
              ? "suspended"
              : ""
          }
          style={{
            width: "50%",
            backgroundColor: "#a7d8fd",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="poker-table-item"
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[2]?.gstatus === "SUSPENDED" ||
              odds?.[2]?.gstatus === "CLOSED" ||
              odds?.[2]?.b1 === "0.00"
                ? null
                : handleBet(odds?.[2])
            }
          >
            <span className="f12-b">{odds?.[2]?.nat}</span>
            <span
              className={`f10-b f400 ${
                data?.profitLoss
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
              style={{zIndex:"111"}}
            >
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                    ]
                  : 0
                : 0}
            </span>
          </div>
          <div
            className={`poker-table-item `}
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[3]?.gstatus === "SUSPENDED" ||
              odds?.[3]?.gstatus === "CLOSED" ||
              odds?.[3]?.b1 === "0.00"
                ? null
                : handleBet(odds?.[3])
            }
          >
            <span className="f12-b">{odds?.[3]?.nat}</span>
            <span
              className={`f10-b f400 ${
                data?.profitLoss
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
              style={{zIndex:"111"}}
            >
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                    ]
                  : 0
                : 0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PairBox;
