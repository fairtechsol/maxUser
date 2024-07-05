import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const TeenPattiTableRow = ({ player, pairPlus, handleBet }: any) => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  return (
    <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
      <div
        style={{ width: "40%", padding: "10px", border: "0.1px solid #fff" }}
      >
        <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
          {player.nat}
        </span>
      </div>
      <div
        className={player.gstatus === "0" ? "suspended" : ""}
        style={{
          width: "60%",
          backgroundColor: "#72bbef",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          className="teenPatti-table-item"
          style={{ width: "50%" }}
          onClick={() => (player.gstatus === "0" ? null : handleBet(player))}
        >
          <span className="f12-b">{player.rate}</span>
          <span
            className={`f10-b ${"profit-loss-class"} ${
              dragonTigerDetail?.profitLoss
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                  ]
                  ? dragonTigerDetail?.profitLoss[
                      `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : dragonTigerDetail?.profitLoss[
                        `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {" "}
            {dragonTigerDetail?.profitLoss
              ? dragonTigerDetail?.profitLoss[
                  `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                ]
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${player?.sid}_card`
                  ]
                : 0
              : 0}
          </span>
        </div>
        <div
          className={`teenPatti-table-item ${
            // pairPlus.gstatus !== "0" ? "suspended" :
            ""
          }`}
          style={{ width: "50%" }}
          onClick={() =>
            pairPlus.gstatus === "0" ? null : handleBet(pairPlus)
          }
        >
          <span className="f12-b">{pairPlus.nat}</span>
          <span
            className={`f10-b ${"profit-loss-class"} ${
              dragonTigerDetail?.profitLoss
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                  ]
                  ? dragonTigerDetail?.profitLoss[
                      `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : dragonTigerDetail?.profitLoss[
                        `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {" "}
            {dragonTigerDetail?.profitLoss
              ? dragonTigerDetail?.profitLoss[
                  `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                ]
                ? dragonTigerDetail?.profitLoss[
                    `${dragonTigerDetail?.videoInfo?.mid}_${pairPlus?.sid}_card`
                  ]
                : 0
              : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeenPattiTableRow;
