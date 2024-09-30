import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useDispatch } from "react-redux";
import {isMobile} from "../../../../utils/screenDimension";
import { useEffect } from "react";
const PairBox = ({ odds, data }: any) => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const dispatch: AppDispatch = useDispatch();

  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: dragonTigerDetail?.id,
      odd: item?.b1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nation,
      name: item?.nation,
      bettingName: "Match odds",
      selectionId: item?.sid,
      min:data?.videoInfo?.min,
      max:data?.videoInfo?.max
    };
    dispatch(
      selectedBetAction({
        team,
        dragonTigerDetail,
      })
    );
    // console.log('team',team)
  };

  useEffect(() => {
    if (odds?.[0]?.gstatus === "CLOSED" ||odds?.[0]?.b1 === "0.00") {
      dispatch(selectedBetAction(""));
    } 
    
  }, [odds?.[0]?.gstatus,odds?.[0]?.b1]);

  // console.log(odds, "odds")
  return (
    <div style={{display: "flex",padding: "0px 0px", flexWrap: "wrap", justifyContent: "space-between"}}>
     
      <div className="" style={{width: isMobile ? "100%" : "49%" }}>
       {isMobile ? <div className="title-15 f700 px-2 text-black">Player A</div> : ""}
        <div
          style={{
            backgroundColor: "#a7d8fd",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className={
              odds?.[0]?.gstatus === "SUSPENDED" ||
              odds?.[0]?.gstatus === "CLOSED" ||
              odds?.[0]?.b1 === "0.00"
                ? "poker-table-item suspended"
                : "poker-table-item"}
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[0]?.gstatus === "SUSPENDED" ||
              odds?.[0]?.gstatus === "CLOSED" ||
              odds?.[0]?.b1 === "0.00"
                ? null
                : handleBet(odds?.[0])
            }
          >
            <span className="f12-b">{odds?.[0]?.nation}</span>
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
                  : "\u00A0"
                : "\u00A0"}
            </span>
          </div>
          <div
            className={
              odds?.[1]?.gstatus === "SUSPENDED" ||
              odds?.[1]?.gstatus === "CLOSED" ||
              odds?.[1]?.b1 === "0.00"
                ? "poker-table-item suspended"
                : "poker-table-item"}
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[1]?.gstatus === "SUSPENDED" ||
              odds?.[1]?.gstatus === "CLOSED" ||
              odds?.[1]?.b1 === "0.00"
                ? null
                : handleBet(odds?.[1])
            }
          >
            <span className="f12-b">{odds?.[1]?.nation}</span>
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
                  : "\u00A0"
                : "\u00A0"}
            </span>
          </div>
        </div>
      </div>
     {!isMobile &&  <div className="casino-table-box-divider"></div>}

      <div className="" style={{ width: isMobile ? "100%" : "49%"}}>
      {isMobile ? <div className="title-15 f700 px-2 text-black">Player B</div> : ""}

        <div
          style={{
            backgroundColor: "#a7d8fd",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
             className={
              odds?.[2]?.gstatus === "SUSPENDED" ||
              odds?.[2]?.gstatus === "CLOSED" ||
              odds?.[2]?.b1 === "0.00"
                ? "poker-table-item suspended"
                : "poker-table-item"}
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[2]?.gstatus === "SUSPENDED" ||
              odds?.[2]?.gstatus === "CLOSED" ||
              odds?.[2]?.b1 === "0.00"
                ? null
                : handleBet(odds?.[2])
            }
          >
            <span className="f12-b">{odds?.[2]?.nation}</span>
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
                  : "\u00A0"
                : "\u00A0"}
            </span>
          </div>
          <div
             className={
              odds?.[3]?.gstatus === "SUSPENDED" ||
              odds?.[3]?.gstatus === "CLOSED" ||
              odds?.[3]?.b1 === "0.00"
                ? "poker-table-item suspended"
                : "poker-table-item"}
            style={{ width: "50%" }}
            onClick={() =>
              odds?.[3]?.gstatus === "SUSPENDED" ||
              odds?.[3]?.gstatus === "CLOSED" ||
              odds?.[3]?.b1 === "0.00"
                ? null
                : handleBet(odds?.[3])
            }
          >
            <span className="f12-b">{odds?.[3]?.nation}</span>
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
                  : "\u00A0"
                : "\u00A0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PairBox;
